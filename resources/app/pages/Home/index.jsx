import React, { Fragment } from 'react';

import Kontrakan from '@/pages/Home/components/Kontrakan';

import Heads from '@/components/Heads';
import Header from '@/components/Header';

export default function Index() {
  return (
    <Fragment>
      <Heads />
      <Header />
      <Kontrakan />
    </Fragment>
  );
}
