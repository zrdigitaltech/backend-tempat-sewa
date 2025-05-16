import React, { Fragment } from 'react';

import { formatTipeKamar } from '@/app/helpers';

export default function Index(props) {
  const { tipe_kamar } = props;
  return (
    <small className="align-content-center text-secondary text-capitalize">
      <i className="fa-solid fa-bed me-1"></i>
      {formatTipeKamar(tipe_kamar) === 'S'
        ? 'Studio'
        : formatTipeKamar(tipe_kamar) === 'L'
          ? '>3 Kamar Tidur'
          : formatTipeKamar(tipe_kamar) + ' Kamar Tidur'}
    </small>
  );
}
