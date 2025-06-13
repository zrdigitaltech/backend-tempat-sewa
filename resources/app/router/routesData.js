const routesData = [
  {
    path: '/',
    element: 'App',
    children: [
      {
        path: '',
        element: 'Home',
        index: true // route index untuk "/"
      },
      {
        path: 'properti',
        element: 'Outlet',
        breadcrumb: 'Properti',
        children: [
          { index: true, element: 'Navigate', to: '/404' },
          {
            path: ':slug',
            element: 'PropertiSlug',
            breadcrumb: ({ slug }) => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          },
          {
            path: ':slug/booking',
            element: 'Booking',
            breadcrumb: ({ slug }) => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          }
        ]
      },
      {
        path: 'pemilik',
        element: 'Outlet',
        breadcrumb: 'Pemilik',
        children: [
          { index: true, element: 'Navigate', to: '/404' },
          {
            path: ':slug',
            element: 'PemilikSlug',
            breadcrumb: ({ slug }) => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          }
        ]
      },
      {
        path: 'search',
        element: 'Search',
        breadcrumb: 'Search'
      },
      {
        path: 'pasang-iklan-properti',
        element: 'PasangIklanProperti',
        breadcrumb: 'Pasang Iklan Properti'
      },
      {
        path: 'panduan',
        element: 'Outlet',
        breadcrumb: 'Panduan',
        children: [
          {
            path: '',
            element: 'Panduan',
            breadcrumb: '',
            index: true
          },
          {
            path: ':slug',
            element: 'PanduanSlug',
            breadcrumb: ({ slug }) => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          },
          {
            path: 'author',
            element: 'Outlet',
            breadcrumb: 'Author',
            children: [
              { index: true, element: 'Navigate', to: '/404' },
              {
                path: ':slug',
                element: 'AuthorSlug',
                breadcrumb: ({ slug }) =>
                  slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
              }
            ]
          }
        ]
      },
      {
        path: 'tentang-kami',
        element: 'TentangKami',
        breadcrumb: 'Tentang Kami'
      },
      {
        path: 'syarat-penggunaan-pemilik-properti',
        element: 'SyaratPenggunaanPemilikProperti',
        breadcrumb: 'Syarat Penggunaan Pemilik Properti'
      },
      {
        path: 'syarat-dan-ketentuan',
        element: 'SyaratDanKetentuan',
        breadcrumb: 'Syarat dan Ketentuan'
      },
      {
        path: 'kebijakan-privasi',
        element: 'KebijakanPrivasi',
        breadcrumb: 'Kebijakan Privasi'
      },
      {
        path: '404',
        element: 'Error404',
        breadcrumb: 'Tidak ditemukan'
      },
      {
        path: '*',
        element: 'Navigate',
        to: '/404'
      },
      {
        path: 'fitur',
        element: 'Fitur',
        breadcrumb: 'Fitur'
      }
    ]
  }
];

export default routesData;
