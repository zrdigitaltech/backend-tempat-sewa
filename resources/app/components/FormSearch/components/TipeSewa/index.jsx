import React, { Fragment } from 'react';

export default function Index(props) {
  const { tipeSewa, handleChange } = props;
  return (
    <Fragment>
      <select
        className="form-select rounded-3"
        name="tipeSewa"
        value={tipeSewa || ''}
        onChange={handleChange}
      >
        <option>Tipe Sewa</option>
        <option value="harian">Harian</option>
        <option value="mingguan">Mingguan</option>
        <option value="bulanan">Bulanan</option>
        <option value="tahunan">Tahunan</option>
      </select>
    </Fragment>
  );
}
