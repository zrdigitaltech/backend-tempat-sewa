<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Transaksi;
use Illuminate\Support\Facades\Http;
use App\Models\PaketKeanggotaan;
use App\Services\DokuService;

class DokuController extends Controller
{
    protected $doku;

    public function __construct(DokuService $doku)
    {
        $this->doku = $doku;
    }

    public function checkout(Request $request)
    {
        // Load available membership packages to present to user
        $packages = PaketKeanggotaan::orderBy('harga', 'asc')->get();

        // If a specific package requested, try to select it
        $selected = null;
        $packageQuery = $request->query('package');
        if ($packageQuery) {
            if (is_numeric($packageQuery)) {
                $selected = $packages->firstWhere('id', (int) $packageQuery);
            } else {
                // match by name (case-insensitive)
                $selected = $packages->first(function ($p) use ($packageQuery) {
                    return strcasecmp($p->nama, $packageQuery) === 0;
                });
            }
        }

        // Default amount/order when no package selected
        $orderId = 'DOKU-'.time();
        $amount = 10000;

        if ($selected) {
            $amount = (int) $selected->harga;
            $orderId = 'DOKU-PKG'.$selected->id.'-'.time();
        }

        return view('doku_checkout', compact('orderId', 'amount', 'packages', 'selected'));
    }

    public function createPayment(Request $request)
    {
        $orderId = $request->input('order_id');
        $amount = (int) $request->input('amount');
        $userId = $request->input('user_id');

        // Try API flow first
        $apiResp = $this->doku->createApiPayment($orderId, $amount);
        if (is_array($apiResp)) {
            // ensure transaksi saved
            $this->ensureTransaksiForOrder($orderId, $amount, $apiResp, $userId);

            if (!empty($apiResp['redirect_url'])) {
                return redirect()->to($apiResp['redirect_url']);
            }

            return response()->json($apiResp);
        }

        // Fallback to webcheckout
        $mallId = config('doku.mall_id');
        $chain = config('doku.chain');
        $sharedKey = config('doku.shared_key');
        $isProd = filter_var(config('doku.is_production'), FILTER_VALIDATE_BOOLEAN);

        // Ensure transaksi record exists (pass user if provided)
        $this->ensureTransaksiForOrder($orderId, $amount, null, $userId);

        $endpoint = $isProd ? config('doku.endpoints.webcheckout_production') : config('doku.endpoints.webcheckout_sandbox');
        $payload = $this->doku->buildWebcheckoutPayload($mallId, $orderId, $amount, $chain);

        return view('doku_redirect', ['endpoint' => $endpoint, 'payload' => $payload]);
    }

    private function ensureTransaksiForOrder(string $orderId, $amount, array $apiResponse = null, $userId = null)
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
            $catatan = $orderId;
            if ($userId) {
                $catatan .= '|user:' . (int)$userId;
            }

            $transaksi = Transaksi::create([
                'catatan' => $catatan,
                'external_id' => $orderId,
                'jumlah_pemasukan' => (int)$amount,
                'status_pembayaran' => 'tertunda',
                'tanggal' => now(),
                'jenis_transaksi' => 'pemasukan',
            ]);
            Log::info("Created Transaksi id={$transaksi->id} for order={$orderId}");
        } else {
            $transaksi->external_id = $orderId;
            // Preserve existing catatan but ensure user info present
            $catatan = $transaksi->catatan ?? $orderId;
            if ($userId && strpos($catatan, 'user:') === false) {
                $catatan .= '|user:' . (int)$userId;
            }
            $transaksi->catatan = $catatan;
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
        $data = $request->all();
        Log::info('Doku notification received: ' . json_encode($data));

        $clientId = config('doku.client_id');
        $secretKey = config('doku.secret_key');

        // API-style notification
        $transIdMerchant = $request->input('merchantOrderId') ?? $request->input('merchant_order_id');
        $amount = $request->input('amount') ?? $request->input('AMOUNT');
        $receivedSignature = $request->header('X-Doku-Signature') ?? $request->input('signature') ?? $request->input('WORDS');

        if ($clientId && $secretKey && $transIdMerchant && $amount && $receivedSignature) {
            if (! $this->doku->verifyApiSignature($clientId, $transIdMerchant, $amount, $receivedSignature, $secretKey)) {
                Log::warning("Doku API notification signature invalid for order={$transIdMerchant}");
                return response('Invalid signature', 400);
            }

            $incomingStatus = $request->input('status') ?? $request->input('STATUS') ?? $request->input('result') ?? $request->input('RESULT') ?? 'unknown';
            $mapped = $this->mapStatus($incomingStatus);

            $this->updateTransaksiStatus($transIdMerchant, $mapped, $data);

            return response('OK', 200);
        }

        // Legacy webcheckout fallback
        $transIdMerchant = $request->input('TRANSIDMERCHANT');
        $amount = $request->input('AMOUNT');
        $words = $request->input('WORDS');

        $mallId = config('doku.mall_id');
        $sharedKey = config('doku.shared_key');

        if (! ($transIdMerchant && $amount && $words && $mallId && $sharedKey)) {
            Log::warning('Doku notification missing required fields');
            return response('Bad request', 400);
        }

        if (! $this->doku->verifyWebcheckoutWords($mallId, $transIdMerchant, $amount, $words, $sharedKey)) {
            Log::warning("Doku notification signature invalid for order={$transIdMerchant}");
            return response('Invalid signature', 400);
        }

        $incomingStatus = $request->input('STATUS') ?? $request->input('status') ?? $request->input('RESULT') ?? $request->input('result') ?? 'unknown';
        $mapped = $this->mapStatus($incomingStatus);

        $this->updateTransaksiStatus($transIdMerchant, $mapped, $data);

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

        // If payment completed, attempt to create/activate Keanggotaan
        if ($status === 'dibayar') {
            // Try extract paket id from transIdMerchant e.g. DOKU-PKG{paketId}-timestamp
            $paketId = null;
            if (preg_match('/DOKU-PKG(\d+)-/', $transIdMerchant, $m)) {
                $paketId = (int) $m[1];
            }

            // Try find user id from payload or transaksi.catatan
            $userId = null;
            if (!empty($payload['user_id'])) {
                $userId = (int) $payload['user_id'];
            } elseif (!empty($transaksi->catatan) && preg_match('/user:(\d+)/', $transaksi->catatan, $mu)) {
                $userId = (int) $mu[1];
            }

            if ($paketId && $userId) {
                $paket = \App\Models\PaketKeanggotaan::find($paketId);
                $user = \App\Models\User::find($userId);
                if ($paket && $user) {
                    // Create or extend keanggotaan
                    $keang = \App\Models\Keanggotaan::where('id_user', $userId)->first();
                    $mulai = now();
                    $berakhir = $mulai->copy()->addMonths($paket->durasi_bulan ?? 1);

                    if ($keang) {
                        $keang->id_paket_keanggotaan = $paket->id;
                        $keang->tanggal_mulai = $mulai;
                        $keang->tanggal_berakhir = $berakhir;
                        $keang->aktif = true;
                        $keang->save();
                        // Notify user about update
                        try {
                            $user->notify(new \App\Notifications\KeanggotaanAktifNotification($paket->nama, $mulai, $berakhir));
                        } catch (\Throwable $e) {
                            Log::error('Notify keanggotaan update failed: ' . $e->getMessage());
                        }
                    } else {
                        \App\Models\Keanggotaan::create([
                            'id_user' => $userId,
                            'id_paket_keanggotaan' => $paket->id,
                            'tanggal_mulai' => $mulai,
                            'tanggal_berakhir' => $berakhir,
                            'aktif' => true,
                            'created_by' => auth()->id() ?? $userId,
                        ]);
                        // Notify user about new membership
                        try {
                            $user->notify(new \App\Notifications\KeanggotaanAktifNotification($paket->nama, $mulai, $berakhir));
                        } catch (\Throwable $e) {
                            Log::error('Notify keanggotaan create failed: ' . $e->getMessage());
                        }
                    }
                }
            }
        }

        return true;
    }

    // private function computeWords(...) { }
}
