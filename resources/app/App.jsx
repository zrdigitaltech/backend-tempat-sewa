// src/app/App.jsx

import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {
  UseHeads,
  UseHeader,
  UseCTA,
  UseFooter,
  UseRouteLoading,
  UseScrollToTop
} from '@/app/components';

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  UseScrollToTop();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container-fluid px-0">
      <UseHeads />
      <UseHeader />

      {/* Hanya Outlet yang nunggu loading */}
      <Suspense fallback={<UseRouteLoading />}>
        <Outlet />
      </Suspense>

      <UseCTA />
      <UseFooter />
    </div>
  );
}

export default App;
