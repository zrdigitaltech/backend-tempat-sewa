import React from 'react';

const PanduanCoverImage = ({ coverImage }) => {
  if (!coverImage) return null;

  return (
    <div
      className="w-100"
      style={{
        height: '630px',
        backgroundImage: `url(${coverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
};

export default PanduanCoverImage;
