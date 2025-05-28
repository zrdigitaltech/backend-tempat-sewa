import React, { Fragment } from 'react';

const PemilikSlugPage = props => {
  const { pemilikProfile } = props;

  return (
    <Fragment>
      <div className="my-4">
        <h4 className="fs-5 fw-bold mb-3 text-dark">Area Spesialis</h4>
        <div className="d-flex flex-wrap gap-3">
          {pemilikProfile?.area_spesialis?.map((area, i) => (
            <span key={i} className="bg-white rounded border shadow-sm px-3 py-2 h-100">
              {area}
            </span>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PemilikSlugPage;
