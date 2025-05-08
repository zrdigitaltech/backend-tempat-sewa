import React, { Fragment } from 'react';

export default function Index() {
  return (
    <Fragment>
      <select className="form-select rounded-3">
        <option>Tipe Properti</option>
        <option value="harian">Harian</option>
        <option value="mingguan">Mingguan</option>
        <option value="bulanan">Bulanan</option>
        <option value="tahunan">Tahunan</option>
      </select>
    </Fragment>
  );
}
