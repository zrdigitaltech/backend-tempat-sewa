import React, { Fragment, useState, useEffect } from 'react';
import Modals from '@/app/components/Modals';
import classNames from 'classnames';
import { KonsultasiModal } from '@/app/pages/modal';

const Index = props => {
  const { show, onClose } = props;

  const [showKonsultasi, setShowKonsultasi] = useState(false);

  return (
    <Fragment>
      <Modals
        title={`Bantuan`}
        show={show}
        onClose={onClose}
        position="center"
        modalBody={<Fragment>Bantuan</Fragment>}
        modalFooter={''}
      />
      <KonsultasiModal show={showKonsultasi} onClose={() => setShowKonsultasi(false)} />
    </Fragment>
  );
};

export default Index;
