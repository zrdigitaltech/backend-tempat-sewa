// src/app/router/router.jsx

import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import routesData from '@/app/router/routesData';
import componentMap from '@/app/router/routeComponents';

// Fungsi rekursif untuk membuat <Route> dari struktur JSON
function createRouteElements(routes) {
  return routes.map((route, i) => {
    const { path, element, breadcrumb, children, index, to } = route;
    const ElementComponent = componentMap[element];

    if (!ElementComponent) {
      throw new Error(`Component for "${element}" not found in componentMap`);
    }

    // Route redirect (Navigate)
    if (element === 'Navigate') {
      return (
        <Route key={i} path={path} index={index} element={<ElementComponent to={to} replace />} />
      );
    }

    // Route Outlet (biasanya root layout)
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

    // Default route page
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
  });
}

const index = createBrowserRouter(createRoutesFromElements(createRouteElements(routesData)));

export default index;
