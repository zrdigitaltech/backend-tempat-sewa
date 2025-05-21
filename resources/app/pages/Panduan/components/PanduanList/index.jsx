import React from 'react';
import { PanduanCard } from '@/app/pages/Panduan/components';

const Index = props => {
  const { guides } = props;
  if (guides.length === 0) {
    return <p className="text-muted">Tidak ada panduan ditemukan.</p>;
  }

  return (
    <div className="row">
      {guides.map((item, idx) => (
        <PanduanCard key={item?.id || idx} guide={item} />
      ))}
    </div>
  );
};

export default Index;
