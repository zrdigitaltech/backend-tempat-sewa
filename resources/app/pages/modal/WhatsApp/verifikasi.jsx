import React, { Fragment, useEffect } from 'react';
import Modals from '@/app/components/Modals';

const Verifikasi = props => {
  const { show, onClose, data } = props;

  return (
    <Modals
      title="Hubungi pengiklan Properti"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={<Fragment>Verifikasi</Fragment>}
      modalFooter={false}
    />
  );
};

export default Verifikasi;
