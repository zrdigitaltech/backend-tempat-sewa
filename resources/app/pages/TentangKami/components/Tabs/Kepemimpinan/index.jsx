import React, { Fragment } from 'react';

export default function Index(props) {
  const { refs } = props;

  return (
    <Fragment>
      <section ref={refs.kepemimpinanRef} className="container py-5">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-sm-6 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <b>Kepemimpinan</b>
              </h2>
              <p>Konten Kepemimpinan di sini...</p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
