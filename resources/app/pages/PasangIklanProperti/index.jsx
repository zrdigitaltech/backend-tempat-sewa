import { Fragment } from 'react';
// Components
import { UseHeads } from '@/app/components';
import { Hero, TipsIklan, Member, Faq, Booster } from '@/app/pages/PasangIklanProperti/components';

export default function Index() {
  return (
    <Fragment>
      <UseHeads
        title="Pasang Iklan Properti Sewa | tempatSewa.Com"
        deskripsi="Pasang iklan properti sewa Anda dengan mudah, cepat, dan gratis di TempatSewa.Com. Jangkau ribuan calon penyewa setiap hari dan tingkatkan peluang properti Anda tersewa!"
        image="https://tempatsewa.com/images/seo/pasang-iklan.jpg"
      />
      <section>
        {/* Hero Section - Full Width */}
        <Hero />

        {/* TipsIklan Section */}
        <TipsIklan />

        {/* CTA Section - Full Width */}
        <Member />

        {/* FAQ Section */}
        <Faq />

        {/* Booster Section */}
        <Booster />
      </section>
    </Fragment>
  );
}
