import React, { Fragment } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

const Index = () => {
  return (
    <Fragment>
      <section className="mt-3">
        <Breadcrumb title="Jelajah" />
      </section>
      <section className="pt-3 pb-5">
        <div className="container"></div>
      </section>
    </Fragment>
  );
};

export default Index;
