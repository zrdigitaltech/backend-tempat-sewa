import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PanduanCoverImage = props => {
  const { coverImage, isLoading } = props;
  if (isLoading) {
    return <Skeleton height={630} width="100%" />;
  }

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
