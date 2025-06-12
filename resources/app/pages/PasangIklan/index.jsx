import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Hero, TipsIklan, Member, Faq } from '@/app/pages/PasangIklan/components';

export default function Index() {
  return (
    <Fragment>
      <section>
        {/* Hero Section - Full Width */}
        <Hero />

        {/* Tips Iklan */}
        <TipsIklan />

        {/* CTA Section - Full Width */}
        <Member />

        {/* FAQ Section */}
        <Faq />
      </section>
    </Fragment>
  );
}
