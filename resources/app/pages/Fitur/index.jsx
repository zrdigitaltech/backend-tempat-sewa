import { Fragment, useEffect } from 'react';
import { UseHeads } from '@/app/components';
import { Hero } from '@/app/pages/Fitur/components';

export default function Index() {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // 1. Scroll ke atas dulu
      window.scrollTo({ top: 0, behavior: 'auto' });

      // 2. Setelah delay, scroll ke target id
      const timeout = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // kasih jeda agar pengguna lihat transisi dari atas dulu

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <Fragment>
      <UseHeads title="" deskripsi="" image="" />
      <Hero />

      <section id="ProdukBooster" className="py-5" style={{ scrollMarginTop: '70px' }}>
        <div className="container">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, ...
          </p>
        </div>
      </section>
    </Fragment>
  );
}
