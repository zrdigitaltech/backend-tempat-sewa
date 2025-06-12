import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <Fragment>
      <section>
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
                    <span className="fw-bold fs-2 text-warning">99.000+</span> pencarian properti
                    per hari.
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

        {/* Konten di dalam container */}
        <div className="container">
          {/* Alasan Pasang Iklan */}
          <div className="text-center my-5">
            <h2 className="fw-bold mb-4">Kenapa Memilih TempatSewa.Com?</h2>
            <div className="row g-4">
              {[
                [
                  'Mudah & Praktis',
                  'Proses pasang iklan dilakukan dengan cepat dan tanpa hambatan, cukup dalam beberapa langkah sederhana.'
                ],
                [
                  'Jangkauan Luas',
                  'Iklan Anda ditampilkan kepada ribuan calon penyewa setiap harinya, meningkatkan peluang properti cepat tersewa.'
                ],
                [
                  'Fitur Terpadu',
                  'TempatSewa.Com menyediakan sistem pencarian, pemasaran, dan pengelolaan properti dalam satu platform yang efisien.'
                ]
              ].map(([title, desc], i) => (
                <div className="col-md-4" key={i}>
                  <div className="p-4 rounded-3 shadow-sm h-100 bg-white border">
                    <h5 className="fw-semibold mb-2">{title}</h5>
                    <p className="text-muted small mb-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Penjelasan tambahan */}
          <div className="mb-5">
            <p>
              TempatSewa.Com adalah platform tepercaya yang memudahkan Anda menemukan tempat tinggal
              impian—mulai dari kontrakan, kost, hingga berbagai jenis properti sewa lainnya.
              Nikmati pengalaman pencarian hunian yang cepat, aman, dan nyaman melalui fitur-fitur
              yang dirancang untuk memudahkan proses pencarian Anda.
            </p>
            <p>
              Bagi pemilik properti, TempatSewa.Com menyediakan solusi terpadu untuk memasarkan dan
              mengelola properti secara efisien. Setiap harinya, ratusan iklan properti baru
              dipasang, memberikan peluang besar untuk menjangkau ribuan calon penyewa. Pastikan
              iklan Anda menarik perhatian dengan informasi lengkap dan foto berkualitas tinggi.
            </p>

            {/* Tips */}
            <h5 className="fw-bold mt-4 mb-3">Tips Pasang Iklan di TempatSewa.Com</h5>
            <ul>
              <li>Gunakan judul yang menarik dan informatif.</li>
              <li>Lengkapi informasi detail seperti harga, lokasi, dan luas bangunan.</li>
              <li>Unggah foto berkualitas tinggi dari berbagai sudut properti.</li>
              <li>Pilih paket iklan yang sesuai dengan kebutuhan Anda.</li>
            </ul>
          </div>
        </div>

        {/* CTA Section - Full Width */}
        <div className="bg-light py-5">
          <div className="container text-center">
            <div className="d-flex justify-content-center">
              <Link to="/paket" className="d-block w-100" style={{ maxWidth: '500px' }}>
                <img
                  src="https://www.99.co/id/99id/submit-quick/kv-package-desktop.png"
                  alt="Paket Iklan TempatSewa.Com"
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container py-5">
          <div className="mb-5">
            <h2 className="fw-bold text-center mb-4">Pertanyaan Seputar Pasang Iklan</h2>
            <div className="accordion" id="faqAccordion">
              {[
                'Bagaimana cara pasang iklan cepat?',
                'Apa saja properti yang bisa saya iklankan?',
                'Apakah gratis atau berbayar?',
                'Bagaimana agar iklan muncul di pencarian?',
                'Bisakah mengedit iklan setelah posting?'
              ].map((question, idx) => (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header" id={`heading${idx}`}>
                    <button
                      className={`accordion-button shadow-none ${idx > 0 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${idx}`}
                      aria-expanded={idx === 0}
                      aria-controls={`collapse${idx}`}
                    >
                      {question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${idx}`}
                    className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted small">
                      Jawaban informatif seputar pertanyaan ini akan ditampilkan di sini.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
