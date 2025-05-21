import React, { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import RouteLoading from '@/app/components/RouteLoading';

const componentMap = {
  App: lazy(() => import('@/app/App')),
  Home: lazy(() => import('@/app/pages/Home')),
  Search: lazy(() => import('@/app/pages/Search')),
  Booking: lazy(() => import('@/app/pages/Booking')),
  PropertiSlug: lazy(() => import('@/app/pages/Properti/Slug')),
  PemilikSlug: lazy(() => import('@/app/pages/Pemilik/Slug')),
  PasangIklan: lazy(() => import('@/app/pages/PasangIklan')),
  Error404: lazy(() => import('@/app/pages/404')),

  // Tambahan halaman lain
  Panduan: lazy(() => import('@/app/pages/Panduan')),
  PanduanSlug: lazy(() => import('@/app/pages/Panduan/Slug')),
  AuthorSlug: lazy(() => import('@/app/pages/Panduan/Author/Slug')),
  Jelajah: lazy(() => import('@/app/pages/Jelajah')),
  JelajahSlug: lazy(() => import('@/app/pages/Jelajah/Slug')),
  TentangKami: lazy(() => import('@/app/pages/TentangKami')),
  SyaratPenggunaanPemilikProperti: lazy(
    () => import('@/app/pages/legal/SyaratPenggunaanPemilikProperti')
  ),
  SyaratDanKetentuan: lazy(() => import('@/app/pages/legal/SyaratDanKetentuan')),
  KebijakanPrivasi: lazy(() => import('@/app/pages/legal/KebijakanPrivasi')),

  RouteLoading,
  Navigate,
  Outlet
};

export default componentMap;
