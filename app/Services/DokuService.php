<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DokuService
{
    protected $config;

    public function __construct()
    {
        $this->config = config('doku');
    }

    public function formatAmount($amount): string
    {
        return number_format((float)$amount, 2, '.', '');
    }

    public function createApiPayment(string $orderId, $amount)
    {
        $clientId = $this->config['client_id'] ?? null;
        $secretKey = $this->config['secret_key'] ?? null;
        $apiKey = $this->config['api_key'] ?? null;
        $isProd = filter_var($this->config['is_production'] ?? false, FILTER_VALIDATE_BOOLEAN);

        if (! $clientId || ! $secretKey || ! $apiKey) {
            return null;
        }

        $apiBase = $isProd ? ($this->config['endpoints']['api_production'] ?? '') : ($this->config['endpoints']['api_sandbox'] ?? '');

        $amountStr = $this->formatAmount($amount);

        $payload = [
            'clientId' => $clientId,
            'merchantOrderId' => $orderId,
            'amount' => $amountStr,
            'currency' => 'IDR',
            'description' => "Payment for {$orderId}",
        ];

        $signature = hash_hmac('sha256', $clientId . $orderId . $amountStr, $secretKey);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'X-Doku-Signature' => $signature,
                'Accept' => 'application/json',
            ])->post(rtrim($apiBase, '/') . '/v1/payments', $payload);

            return $response->successful() ? $response->json() : null;
        } catch (\Throwable $e) {
            Log::error('DokuService:createApiPayment exception: ' . $e->getMessage());
            return null;
        }
    }

    public function buildWebcheckoutPayload(string $mallId, string $transIdMerchant, $amount, string $chain = ''): array
    {
        $amountStr = $this->formatAmount($amount);

        $payload = [
            'MALL_ID' => $mallId,
            'CHAIN' => $chain,
            'TRANSIDMERCHANT' => $transIdMerchant,
            'AMOUNT' => $amountStr,
            'CURRENCY' => 'IDR',
            'PURCHASEAMOUNT' => $amountStr,
        ];

        $shared = $this->config['shared_key'] ?? '';
        $payload['WORDS'] = sha1($mallId . $transIdMerchant . $amountStr . $shared);

        return $payload;
    }

    public function verifyApiSignature(string $clientId, string $transIdMerchant, $amount, string $received, string $secretKey): bool
    {
        $expected = hash_hmac('sha256', $clientId . $transIdMerchant . $this->formatAmount($amount), $secretKey);
        return hash_equals($expected, $received);
    }

    public function verifyWebcheckoutWords(string $mallId, string $transIdMerchant, $amount, string $words, string $sharedKey): bool
    {
        $expected = sha1($mallId . $transIdMerchant . $this->formatAmount($amount) . $sharedKey);
        return hash_equals($expected, $words);
    }
}
