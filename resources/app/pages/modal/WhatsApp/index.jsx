import React, { Fragment, useEffect } from 'react';
import Modals from '@/app/components/Modals';

const Index = props => {
  const { show, onClose, data } = props;

  return (
    <Modals
      title="Hubungi pengiklan Properti"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={<Fragment>WhatsApp</Fragment>}
      modalFooter={false}
    />
  );
};

export default Index;
