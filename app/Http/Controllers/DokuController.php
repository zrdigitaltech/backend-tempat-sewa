<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Transaksi;
use Illuminate\Support\Facades\Http;

class DokuController extends Controller
{
    public function checkout()
    {
        $orderId = 'DOKU-'.time();
        $amount = 10000;

        return view('doku_checkout', compact('orderId', 'amount'));
    }

    public function createPayment(Request $request)
    {
        $orderId = $request->input('order_id');
        $amount = (int) $request->input('amount');
        $mallId = config('doku.mall_id');
        $sharedKey = config('doku.shared_key');
        $chain = config('doku.chain');
        $clientId = config('doku.client_id');
        $secretKey = config('doku.secret_key');
        $apiKey = config('doku.api_key');
        $isProd = filter_var(config('doku.is_production'), FILTER_VALIDATE_BOOLEAN);

        // Ensure amount is formatted as required (two decimals, no thousand separators)
        $amountStr = number_format($amount, 2, '.', '');

        // If newer API credentials provided (client_id + secret_key + api_key), use API flow
        if ($clientId && $secretKey && $apiKey) {
            $apiBase = $isProd ? config('doku.endpoints.api_production') : config('doku.endpoints.api_sandbox');

            // Build payload according to Doku API (adjust fields per Doku docs)
            $payloadApi = [
                'clientId' => $clientId,
                'merchantOrderId' => $orderId,
                'amount' => $amountStr,
                'currency' => 'IDR',
                'description' => "Payment for {$orderId}",
            ];

            // Compute signature: HMAC-SHA256 of clientId + merchantOrderId + amount using secret_key
            $signature = hash_hmac('sha256', $clientId . $orderId . $amountStr, $secretKey);

            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey,
                    'X-Doku-Signature' => $signature,
                    'Accept' => 'application/json',
                ])->post(rtrim($apiBase, '/') . '/v1/payments', $payloadApi);

                if ($response->successful()) {
                    $body = $response->json();
                    // Save or update Transaksi record with external_id for matching notifications
                    $this->ensureTransaksiForOrder($orderId, $amount, $body);
                    // If API returns a redirect URL for checkout, redirect user
                    if (!empty($body['redirect_url'])) {
                        return redirect()->to($body['redirect_url']);
                    }

                    return response()->json($body);
                }

                Log::error('Doku API error: ' . $response->body());
                return response('Payment creation failed', 500);
            } catch (\Throwable $e) {
                Log::error('Doku API exception: ' . $e->getMessage());
                return response('Payment creation error', 500);
            }
        }

        // Before legacy webcheckout, ensure Transaksi record exists and external_id saved
        $this->ensureTransaksiForOrder($orderId, $amount);

        // Fallback to legacy webcheckout (MALL_ID + SHARED_KEY)
        $endpoint = $isProd ? config('doku.endpoints.webcheckout_production') : config('doku.endpoints.webcheckout_sandbox');

        // Build payload required by Doku webcheckout
        $payload = [
            'MALL_ID' => $mallId,
            'CHAIN' => $chain,
            'TRANSIDMERCHANT' => $orderId,
            'AMOUNT' => $amountStr,
            'CURRENCY' => 'IDR',
            'PURCHASEAMOUNT' => $amountStr,
        ];

        // Doku WORDS signature: sha1(MALLID + TRANSIDMERCHANT + AMOUNT + SHARED_KEY)
        $payload['WORDS'] = $this->computeWords($mallId, $orderId, $amountStr, $sharedKey);

        // Return a view that auto-posts to the Doku webcheckout endpoint with hidden inputs
        return view('doku_redirect', ['endpoint' => $endpoint, 'payload' => $payload]);
    }

    private function ensureTransaksiForOrder(string $orderId, $amount, array $apiResponse = null)
    {
        // Try to associate to an existing Transaksi by numeric id embedded in orderId
        $transaksi = null;
        if (preg_match('/(\d+)$/', $orderId, $m)) {
            $id = (int) $m[1];
            $transaksi = Transaksi::find($id);
        }

        if (! $transaksi) {
            // Try find by external_id or catatan
            $transaksi = Transaksi::where('external_id', $orderId)->orWhere('catatan', $orderId)->first();
        }

        if (! $transaksi) {
            // Create minimal transaksi record
            $transaksi = Transaksi::create([
                'catatan' => $orderId,
                'external_id' => $orderId,
                'jumlah_pemasukan' => (int)$amount,
                'status_pembayaran' => 'tertunda',
                'tanggal' => now(),
                'jenis_transaksi' => 'pemasukan',
            ]);
            Log::info("Created Transaksi id={$transaksi->id} for order={$orderId}");
        } else {
            $transaksi->external_id = $orderId;
            $transaksi->catatan = $orderId;
            $transaksi->jumlah_pemasukan = (int)$amount;
            $transaksi->status_pembayaran = 'tertunda';
            $transaksi->save();
            Log::info("Linked existing Transaksi id={$transaksi->id} to order={$orderId}");
        }

        // Optionally: extract useful fields from API response and persist
        if ($apiResponse && is_array($apiResponse)) {
            // transaction id / settlement id
            $txKeys = ['transaction_id', 'transactionId', 'transaction_id', 'settlement_id', 'settlementId', 'settlement'];
            foreach ($txKeys as $k) {
                if (!empty($apiResponse[$k])) {
                    $transaksi->id_settlement = (string) $apiResponse[$k];
                    break;
                }
            }

            // fee
            $feeKeys = ['fee', 'merchant_fee', 'charge_fee', 'merchantFee'];
            foreach ($feeKeys as $k) {
                if (isset($apiResponse[$k]) && is_numeric($apiResponse[$k])) {
                    $transaksi->fee = (float) $apiResponse[$k];
                    break;
                }
            }

            // external id mapping: some APIs return external id or order id
            if (!empty($apiResponse['merchantOrderId'])) {
                $transaksi->external_id = (string) $apiResponse['merchantOrderId'];
            } elseif (!empty($apiResponse['order_id'])) {
                $transaksi->external_id = (string) $apiResponse['order_id'];
            }

            $transaksi->save();
        }

        return $transaksi;
    }

    public function notification(Request $request)
    {
        // Handle Doku notification/callback
        $data = $request->all();
        Log::info('Doku notification received: ' . json_encode($data));
        // If notification comes from API flow, verify HMAC signature header or payload
        $clientId = config('doku.client_id');
        $secretKey = config('doku.secret_key');

        // Try API-style verification first
        if ($clientId && $secretKey) {
            $transIdMerchant = $request->input('merchantOrderId') ?? $request->input('merchant_order_id');
            $amount = $request->input('amount') ?? $request->input('AMOUNT');

            $receivedSignature = $request->header('X-Doku-Signature') ?? $request->input('signature') ?? $request->input('WORDS');

            if ($transIdMerchant && $amount && $receivedSignature) {
                $expected = hash_hmac('sha256', $clientId . $transIdMerchant . number_format((float)$amount, 2, '.', ''), $secretKey);
                if (!hash_equals($expected, $receivedSignature)) {
                    Log::warning("Doku API notification signature invalid for order={$transIdMerchant}");
                    return response('Invalid signature', 400);
                }
            } else {
                Log::warning('Doku API notification missing fields');
                return response('Bad request', 400);
            }

            // Map incoming status to local `status_pembayaran`
            $incomingStatus = $request->input('status') ?? $request->input('STATUS') ?? $request->input('result') ?? $request->input('RESULT') ?? 'unknown';
            $mapped = $this->mapStatus($incomingStatus);

            // Attempt to find matching Transaksi and update, passing full payload
            $this->updateTransaksiStatus($transIdMerchant, $mapped, $data);

            return response('OK', 200);
        }

        // Fallback: legacy webcheckout verification (MALL_ID + SHARED_KEY + WORDS)
        $transIdMerchant = $request->input('TRANSIDMERCHANT');
        $amount = $request->input('AMOUNT');
        $words = $request->input('WORDS');

        $mallId = config('doku.mall_id');
        $sharedKey = config('doku.shared_key');

        $valid = false;
        if ($transIdMerchant && $amount && $words) {
            $expected = $this->computeWords($mallId, $transIdMerchant, $amount, $sharedKey);
            $valid = hash_equals($expected, $words);
        }

        if (! $valid) {
            Log::warning("Doku notification signature invalid for order={$transIdMerchant}");
            return response('Invalid signature', 400);
        }

        // Map incoming status to local `status_pembayaran`
        $incomingStatus = $request->input('STATUS') ?? $request->input('status') ?? $request->input('RESULT') ?? $request->input('result') ?? 'unknown';
        $mapped = $this->mapStatus($incomingStatus);

        // Attempt to find matching Transaksi and update, passing full payload
        $this->updateTransaksiStatus($transIdMerchant, $mapped, $request->all());

        return response('OK', 200);
    }

    private function computeWords(string $mallId, string $transIdMerchant, string $amount, string $sharedKey): string
    {
        // Normalize amount to two-decimal string
        $amountStr = number_format((float)$amount, 2, '.', '');

        return sha1($mallId . $transIdMerchant . $amountStr . $sharedKey);
    }

    private function mapStatus(string $incoming): string
    {
        $s = strtolower((string) $incoming);

        if (in_array($s, ['success', '00', '0', 'settlement', 'capture', 'paid'])) {
            return 'dibayar';
        }

        if (in_array($s, ['pending', 'wait', 'pending_payment'])) {
            return 'tertunda';
        }

        if (in_array($s, ['failed', 'error', 'deny', 'cancel'])) {
            return 'gagal';
        }

        if (in_array($s, ['refund', 'refunded', 'dikembalikan'])) {
            return 'dikembalikan';
        }

        return 'tertunda';
    }

    private function updateTransaksiStatus(?string $transIdMerchant, string $status, array $payload = [])
    {
        if (! $transIdMerchant) {
            Log::warning('updateTransaksiStatus: missing transIdMerchant');
            return false;
        }

        // Try find by exact external_id first
        $transaksi = Transaksi::where('external_id', $transIdMerchant)->first();

        // If not found, try numeric id extracted from transIdMerchant (e.g. DOKU-123 -> 123)
        if (! $transaksi) {
            if (preg_match('/(\d+)$/', $transIdMerchant, $m)) {
                $id = (int) $m[1];
                $transaksi = Transaksi::find($id);
            }
        }

        // If still not found, try exact catatan match then where catatan contains the id
        if (! $transaksi) {
            $transaksi = Transaksi::where('catatan', $transIdMerchant)->first();
        }

        if (! $transaksi) {
            $transaksi = Transaksi::where('catatan', 'like', "%{$transIdMerchant}%")->first();
        }

        if (! $transaksi) {
            Log::warning("Transaksi not found for transIdMerchant={$transIdMerchant}");
            return false;
        }


        // Persist status
        $transaksi->status_pembayaran = $status;

        // Persist fee if provided in payload (common keys: fee, merchant_fee, charge_fee)
        $feeKeys = ['fee', 'merchant_fee', 'charge_fee', 'merchantFee'];
        foreach ($feeKeys as $k) {
            if (isset($payload[$k]) && is_numeric($payload[$k])) {
                $transaksi->fee = (float) $payload[$k];
                break;
            }
        }

        // Persist settlement id if present (common keys)
        $settleKeys = ['id_settlement', 'settlement_id', 'settlementId', 'transaction_id', 'transactionId', 'invoice', 'settlement'];
        foreach ($settleKeys as $k) {
            if (!empty($payload[$k])) {
                $transaksi->id_settlement = (string) $payload[$k];
                break;
            }
        }

        $transaksi->save();

        Log::info("Updated Transaksi id={$transaksi->id} status_pembayaran={$status} fee={$transaksi->fee} id_settlement={$transaksi->id_settlement}");

        return true;
    }

    // private function computeWords(...) { }
}
