import React, { Fragment, useState } from 'react';
import UlasanModal from './modals/Ulasan';

export default function Index(props) {
  const { refs } = props;
  const [showUlasan, setShowUlasan] = useState(false);

  return (
    <Fragment>
      <section ref={refs.ulasanRef} className="container py-5">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-md-8 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <b>Ulasan Pengguna</b>
              </h2>
              <p className="mb-3">
                <strong>tempatSewa.Com</strong> baru saja hadir untuk membantumu menemukan hunian
                sewa terbaik — mulai dari kontrakan, kost, hingga properti usaha.
              </p>
              <p className="mb-3">
                Kami masih dalam tahap awal, namun kami berkomitmen untuk memberikan pengalaman
                pencarian properti yang cepat, aman, dan terpercaya.
              </p>
              <p className="mb-3">
                Kami percaya, perjalanan ini akan semakin kuat dengan masukan dan pengalaman dari
                para pengguna pertama kami — termasuk kamu.
              </p>

              {/* Call to Action */}
              <div className="mt-4">
                <h4 className="text-xl font-semibold mb-2">Jadilah yang Pertama!</h4>
                <p className="mb-3">
                  Gunakan tempatSewa.Com dan bantu kami menjadi lebih baik. Bagikan pengalamanmu dan
                  bantu pengguna lain merasa lebih percaya untuk menggunakan platform ini.
                </p>
                <a
                  // href="mailto:ulasan@tempatsewa.com"
                  className="btn btn-outline-primary px-4 py-2"
                  onClick={() => setShowUlasan(true)}
                >
                  Kirim Ulasan Pertamamu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UlasanModal show={showUlasan} onClose={() => setShowUlasan(false)} />
    </Fragment>
  );
}
