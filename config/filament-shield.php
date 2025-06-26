<?php

return [

    'shield_resource' => [
        'should_register_navigation' => true,
        'slug' => 'pengaturan-akses',
        'navigation_sort' => 3,
        'navigation_badge' => true,
        'navigation_group' => 'Pengaturan Akses', // jangan true, harus string jika aktif
        'is_globally_searchable' => false,
        'show_model_path' => true,
        'is_scoped_to_tenant' => false, // ubah jika tidak pakai tenancy
        'cluster' => null,
    ],

    'tenant_model' => null, // pakai tenancy? isi dengan model tenant

    'auth_provider_model' => [
        'fqcn' => App\Models\User::class,
    ],

    // ✅ Definisikan role-role di sini:
    'super_admin' => [
        'enabled' => true,
        'name' => 'super_admin',
        'define_via_gate' => true,
        'intercept_gate' => 'before',
    ],
    'admin' => [
        'enabled' => true,
        'name' => 'admin',
        'define_via_gate' => true,
        'intercept_gate' => 'before',
    ],
    'manajer' => [
        'enabled' => true,
        'name' => 'manajer',
        'define_via_gate' => false,
    ],
    'penulis' => [
        'enabled' => true,
        'name' => 'penulis',
        'define_via_gate' => false,
    ],
    'pemilik' => [
        'enabled' => true,
        'name' => 'pemilik',
        'define_via_gate' => false,
    ],
    'penyewa' => [
        'enabled' => true,
        'name' => 'penyewa',
        'define_via_gate' => false,
    ],
    '_user' => [
        'enabled' => true,
        'name' => 'panel_user',
    ],

    'permission_prefixes' => [
        'resource' => [
            'view',
            'view_any',
            'create',
            'update',
            'restore',
            'restore_any',
            'replicate',
            'reorder',
            'delete',
            'delete_any',
            'force_delete',
            'force_delete_any',
        ],
        'page' => 'page',
        'widget' => 'widget',
    ],

    'entities' => [
        'pages' => true,
        'widgets' => true,
        'resources' => true,
        'custom_permissions' => false,
    ],

    'generator' => [
        'option' => 'policies_and_permissions', // atau 'permissions_only'
        'policy_directory' => 'Policies',
        'policy_namespace' => 'Policies',
    ],

    'exclude' => [
        'enabled' => true,
        'pages' => ['Dashboard'], // tidak buat permission untuk Dashboard
        'widgets' => ['AccountWidget', 'FilamentInfoWidget'],
        'resources' => [], // tambahkan resource jika ingin dikecualikan
    ],

    'discovery' => [
        'discover_all_resources' => true,
        'discover_all_widgets' => true,
        'discover_all_pages' => true,
    ],

    'register_role_policy' => [
        'enabled' => true, // jika true, akan generate policy untuk model Role
    ],
];
