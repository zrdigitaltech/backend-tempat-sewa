import React from 'react';
import Modals from '@/app/components/Modals';
import { Fragment } from 'react';

const Index = props => {
  const { show, onClose, preview } = props;

  return (
    <Modals
      title="Preview"
      show={show}
      onClose={onClose}
      position="center"
      modalDialog="modal-fullscreen"
      modalBody={
        <Fragment>
          <img src={`https://placehold.co/600x200?text=Image+${preview}`} className="w-100" />
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Index;
