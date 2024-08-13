import React, { lazy, Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import RouteLoading from '@/components/RouteLoading';
import Error404 from '@/pages/404';

const Home = lazy(() => import('@/pages/Home'));
const Slug = lazy(() => import('@/pages/Home/Slug'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          <Suspense fallback={<RouteLoading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/:slug"
        element={
          <Suspense fallback={<RouteLoading />}>
            <Slug />
          </Suspense>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

export default router;
