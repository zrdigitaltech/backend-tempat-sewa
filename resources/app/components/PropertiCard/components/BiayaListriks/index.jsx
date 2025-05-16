import React from 'react';

export default function Index(props) {
  const { biaya_listrik } = props;
  return (
    <small className="align-content-center text-secondary text-capitalize">
      <i className="fa-solid fa-bolt me-1"></i>
      {biaya_listrik} Listrik
    </small>
  );
}
