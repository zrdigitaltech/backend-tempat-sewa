import FormRegister from './FormRegister';

export default function HeroSection() {
  return (
    <div className="bg-primary text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="d-flex flex-column align-items-start">
              <h1 className="fw-bold display-5">Pasang Iklan Properti dengan Mudah</h1>
              <p className="lead mt-3">
                Hanya di <strong>tempatSewa.Com</strong> — solusi lengkap untuk{' '}
                <strong>memasarkan</strong> dan <strong>mengelola properti sewa</strong> Anda dalam
                satu platform. Jangkau lebih dari{' '}
                <span className="fw-bold fs-2 text-warning">99.000+</span> pencarian properti setiap
                hari.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="col-lg-4">
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}
