// src/app/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Tunggu sebentar agar semua konten dan layout siap
    const timeout = setTimeout(() => {
      // Pastikan hanya scroll jika posisi belum di atas
      if (window.scrollY > 0) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100); // Delay kecil untuk menghindari scroll sebelum DOM stabil

    // Cleanup jika komponen di-unmount
    return () => clearTimeout(timeout);
  }, [location]);
}
