import React, { Fragment } from 'react';

import Kontrakan from '@/app/pages/Home/components/Kontrakan';

import Heads from '@/app/components/Heads';
import Header from '@/app/components/Header';

export default function Index() {
  return (
    <Fragment>
      <Heads />
      <Header />
      <Kontrakan />
    </Fragment>
  );
}
