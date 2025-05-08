import React, { Fragment } from 'react';

export default function Index() {
  return (
    <Fragment>
      <select className="form-select rounded-3">
        <option value="">Tipe Kost</option>
        <option value="semua">Semua</option>
        <option value="putra">Putra</option>
        <option value="putri">Putri</option>
        <option value="campur">Campur</option>
      </select>
    </Fragment>
  );
}
