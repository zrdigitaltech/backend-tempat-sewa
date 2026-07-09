<?php

return [
    // Legacy Webcheckout (MALL_ID / SHARED_KEY)
    'mall_id' => env('DOKU_MALL_ID', env('DOKU_MALL_ID_LEGACY', '')),
    'shared_key' => env('DOKU_SHARED_KEY', env('DOKU_SHARED_KEY_LEGACY', '')),
    'chain' => env('DOKU_CHAIN', ''),

    // Newer API credentials (BRN / Client ID / Secret Key)
    'client_id' => env('DOKU_CLIENT_ID', ''),
    'secret_key' => env('DOKU_SECRET_KEY', ''),
    'api_key' => env('DOKU_API_KEY', ''),

    'is_production' => env('DOKU_IS_PRODUCTION', false),

    // Endpoint URLs
    'endpoints' => [
        'webcheckout_sandbox' => 'https://webcheckout.doku.com/checkout',
        'webcheckout_production' => 'https://webcheckout.doku.com/checkout',
        // Example API endpoints for newer Doku integrations — adjust per your integration
        'api_sandbox' => 'https://api-sandbox.doku.com/',
        'api_production' => 'https://api.doku.com/',
    ],
];
