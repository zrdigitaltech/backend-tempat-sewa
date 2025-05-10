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
const AgentSlug = lazy(() => import('@/app/pages/Agent/Slug'));
const PasangIklan = lazy(() => import('@/app/pages/PasangIklan'));

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
        handle={{ breadcrumb: 'Home' }}
      />
      <Route path="properti" handle={{ breadcrumb: 'Properti' }} element={<Outlet />}>
        <Route index element={<Navigate to="/404" />} />
        <Route
          index
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
      <Route path="agent" handle={{ breadcrumb: 'Agent' }} element={<Outlet />}>
        <Route index element={<Navigate to="/404" />} />
        <Route
          path=":slug"
          element={
            <Suspense fallback={<RouteLoading />}>
              <AgentSlug />
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
