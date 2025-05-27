import React, { Fragment } from 'react';

export default function Index(props) {
  const { handleChange, formData } = props;

  return (
    <Fragment>
      <select
        name="sort"
        className="form-select rounded-3"
        value={formData || ''}
        onChange={handleChange}
      >
        <option value="">Diutamakan</option>
        <option value="terbaru">Terbaru</option>
        <option value="harga_tertinggi">Harga Tertinggi</option>
        <option value="harga_terendah">Harga Terendah</option>
      </select>
    </Fragment>
  );
}
