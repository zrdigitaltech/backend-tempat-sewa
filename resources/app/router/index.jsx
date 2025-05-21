// router.jsx
import React, { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import routesData from '@/app/router/routesData';
import componentMap from '@/app/router/routeComponents';

// Fungsi rekursif buat Route dari JSON
function createRouteElements(routes) {
  return routes.map((route, i) => {
    const { path, element, breadcrumb, children, index, to } = route;
    const ElementComponent = componentMap[element];

    if (!ElementComponent) {
      throw new Error(`Component for "${element}" not found in componentMap`);
    }

    if (element === 'Navigate') {
      return (
        <Route key={i} path={path} index={index} element={<ElementComponent to={to} replace />} />
      );
    }

    if (element === 'Outlet') {
      return (
        <Route
          key={i}
          path={path}
          index={index}
          element={<ElementComponent />}
          handle={breadcrumb ? { breadcrumb } : undefined}
        >
          {children && createRouteElements(children)}
        </Route>
      );
    }

    // Jika ada index dan path kosong '' , index route harus path undefined atau kosong
    return (
      <Route
        key={i}
        path={path}
        index={index}
        element={
          <Suspense fallback={<componentMap.RouteLoading />}>
            <ElementComponent />
          </Suspense>
        }
        handle={breadcrumb ? { breadcrumb } : undefined}
      >
        {children && createRouteElements(children)}
      </Route>
    );
  });
}

const index = createBrowserRouter(createRoutesFromElements(createRouteElements(routesData)));

export default index;
