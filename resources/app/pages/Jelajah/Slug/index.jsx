import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/app/components/Breadcrumb';

const Index = () => {
  return (
    <div className="pb-5">
      <section className="mt-3">
        <Breadcrumb title="Slug" />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="fs-3 fw-bold mb-3 text-dark">Slug</h1>
        </div>
      </section>
    </div>
  );
};

export default Index;
