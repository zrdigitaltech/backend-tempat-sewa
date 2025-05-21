// router.jsx
import React, { lazy, Suspense } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet
} from 'react-router-dom';
import App from './App';
import RouteLoading from '@/app/components/RouteLoading';
import Error404 from '@/app/pages/404';

const Home = lazy(() => import('@/app/pages/Home'));

const Search = lazy(() => import('@/app/pages/Search'));
const Booking = lazy(() => import('@/app/pages/Booking'));
const PropertiSlug = lazy(() => import('@/app/pages/Properti/Slug'));
const PemilikSlug = lazy(() => import('@/app/pages/Pemilik/Slug'));
const PasangIklan = lazy(() => import('@/app/pages/PasangIklan'));

const SyaratDanKetentuan = lazy(() => import('@/app/pages/legal/SyaratDanKetentuan'));
const KebijakanPrivasi = lazy(() => import('@/app/pages/legal/KebijakanPrivasi'));
const SyaratPenggunaanPemilikProperti = lazy(
  () => import('@/app/pages/legal/SyaratPenggunaanPemilikProperti')
);

const Panduan = lazy(() => import('@/app/pages/Panduan'));
const PanduanSlug = lazy(() => import('@/app/pages/Panduan/Slug'));
const AuthorSlug = lazy(() => import('@/app/pages/Panduan/Author/Slug'));

const Jelajah = lazy(() => import('@/app/pages/Jelajah'));
const JelajahSlug = lazy(() => import('@/app/pages/Jelajah/Slug'));

const TentangKami = lazy(() => import('@/app/pages/TentangKami'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Suspense fallback={<RouteLoading />}>
            <Home />
          </Suspense>
        }
        handle={{ breadcrumb: 'Beranda' }}
      />
      <Route path="properti" handle={{ breadcrumb: 'Properti' }} element={<Outlet />}>
        <Route index element={<Navigate to="/404" />} />
        <Route
          path=":slug"
          element={
            <Suspense fallback={<RouteLoading />}>
              <PropertiSlug />
            </Suspense>
          }
          handle={{
            breadcrumb: ({ slug }) =>
              slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
          }}
        />
        <Route
          path=":slug/booking"
          element={
            <Suspense fallback={<RouteLoading />}>
              <Booking />
            </Suspense>
          }
          handle={{
            breadcrumb: ({ slug }) =>
              slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
          }}
        />
      </Route>
      <Route path="pemilik" handle={{ breadcrumb: 'Pemilik' }} element={<Outlet />}>
        <Route index element={<Navigate to="/404" />} />
        <Route
          path=":slug"
          element={
            <Suspense fallback={<RouteLoading />}>
              <PemilikSlug />
            </Suspense>
          }
          handle={{
            breadcrumb: ({ slug }) =>
              slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
          }}
        />
      </Route>
      <Route
        path="/search"
        handle={{ breadcrumb: 'Search' }}
        element={
          <Suspense fallback={<RouteLoading />}>
            <Search />
          </Suspense>
        }
      />
      <Route
        path="/pasang-iklan"
        handle={{ breadcrumb: 'Pasang Iklan' }}
        element={
          <Suspense fallback={<RouteLoading />}>
            <PasangIklan />
          </Suspense>
        }
      />
      <Route path="panduan" handle={{ breadcrumb: 'Panduan' }} element={<Outlet />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteLoading />}>
              <Panduan />
            </Suspense>
          }
        />
        <Route
          path=":slug"
          element={
            <Suspense fallback={<RouteLoading />}>
              <PanduanSlug />
            </Suspense>
          }
          handle={{
            breadcrumb: ({ slug }) =>
              slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
          }}
        />
        <Route path="author" handle={{ breadcrumb: 'Author' }} element={<Outlet />}>
          <Route index element={<Navigate to="/404" />} />
          <Route
            path=":slug"
            element={
              <Suspense fallback={<RouteLoading />}>
                <AuthorSlug />
              </Suspense>
            }
            handle={{
              breadcrumb: ({ slug }) =>
                slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
            }}
          />
        </Route>
      </Route>

      <Route path="jelajah" handle={{ breadcrumb: 'Jelajah' }} element={<Outlet />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteLoading />}>
              <Jelajah />
            </Suspense>
          }
        />
        <Route
          path=":slug"
          element={
            <Suspense fallback={<RouteLoading />}>
              <JelajahSlug />
            </Suspense>
          }
          handle={{
            breadcrumb: ({ slug }) =>
              slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
          }}
        />
      </Route>
      <Route
        path="/tentang-kami"
        handle={{ breadcrumb: 'Tentang Kami' }}
        element={
          <Suspense fallback={<RouteLoading />}>
            <TentangKami />
          </Suspense>
        }
      />
      <Route
        path="/syarat-penggunaan-pemilik-properti"
        handle={{ breadcrumb: 'Syarat Penggunaan Pemilik Properti' }}
        element={
          <Suspense fallback={<RouteLoading />}>
            <SyaratPenggunaanPemilikProperti />
          </Suspense>
        }
      />
      <Route
        path="/syarat-dan-ketentuan"
        handle={{ breadcrumb: 'Syarat dan Ketentuan' }}
        element={
          <Suspense fallback={<RouteLoading />}>
            <SyaratDanKetentuan />
          </Suspense>
        }
      />
      <Route
        path="/kebijakan-privasi"
        handle={{ breadcrumb: 'Kebijakkan Privasi ' }}
        element={
          <Suspense fallback={<RouteLoading />}>
            <KebijakanPrivasi />
          </Suspense>
        }
      />
      <Route
        path="/404"
        element={
          <Suspense fallback={<RouteLoading />}>
            <Error404 />
          </Suspense>
        }
        handle={{ breadcrumb: 'Tidak ditemukan' }}
      />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
);

export default router;
