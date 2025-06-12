import { Fragment } from 'react';

export default function Index() {
  return (
    <Fragment>
      {/* Hero Section - Full Width */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="d-flex flex-column align-items-start">
                <h1 className="fw-bold display-5">Pasang Iklan Properti dengan Mudah</h1>
                <p className="lead mt-3">
                  Hanya di <strong>TempatSewa.Com</strong>, platform terpercaya untuk memasarkan
                  properti sewa Anda. Dapatkan jangkauan luas dengan rata-rata{' '}
                  <span className="fw-bold fs-2 text-warning">99.000+</span> pencarian properti per
                  hari.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="col-lg-4">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <h5 className="card-title text-center mb-4 fw-bold">Daftar</h5>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nama Lengkap</label>
                      <input type="text" className="form-control" placeholder="Nama Lengkap" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nomor Telepon</label>
                      <input type="tel" className="form-control" placeholder="0812xxxxxxx" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Daftar Sekarang
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
