import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <Fragment>
      {/* CTA Section - Full Width */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <div className="d-flex justify-content-center">
            <Link to="/paket" className="d-block w-100" style={{ maxWidth: '500px' }}>
              <img
                src="https://placehold.co/824x250?text=Member+Mulai+99"
                alt="Paket Iklan TempatSewa.Com"
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
