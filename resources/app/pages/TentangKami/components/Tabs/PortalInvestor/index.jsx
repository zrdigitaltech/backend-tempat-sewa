import React, { Fragment, useState } from 'react';
import InvestorModal from './modals/Investor';

export default function Index(props) {
  const { refs } = props;
  const [showInvestor, setShowInvestor] = useState(false);

  return (
    <Fragment>
      <section ref={refs.investorRef} className="container py-5">
        <div className="d-flex justify-content-center row">
          <div className="col-12 col-sm-8 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <b>Portal & Investor</b>
              </h2>
              <p className="mb-3">
                <strong>tempatSewa.Com</strong> hadir sebagai platform digital tepercaya yang
                memudahkan masyarakat Indonesia menemukan tempat tinggal impian — mulai dari{' '}
                <strong>kontrakan</strong>, <strong>kost</strong>, hingga{' '}
                <strong>properti sewa lainnya</strong>.
              </p>
              <p className="mb-3">
                Dengan teknologi yang kami kembangkan secara berkelanjutan, pengguna dapat menikmati
                pengalaman pencarian hunian yang <strong>cepat, aman, dan efisien</strong>. Di sisi
                lain, pemilik properti mendapatkan kemudahan dalam memasarkan dan mengelola properti
                mereka secara terpadu melalui satu platform yang modern.
              </p>
              <p className="mb-3">
                Seiring dengan pertumbuhan kami yang pesat,{' '}
                <strong>kemitraan strategis dengan investor dan mitra bisnis</strong> menjadi elemen
                penting dalam perjalanan kami. Kami percaya bahwa kolaborasi yang solid dapat
                memperkuat infrastruktur kami dan memperluas jangkauan layanan ke seluruh penjuru
                negeri.
              </p>
              <p className="mb-3">
                Portal investor kami menyediakan informasi transparan dan komprehensif tentang{' '}
                <strong>perkembangan bisnis, performa operasional, dan strategi masa depan</strong>.
                Melalui pendekatan terbuka ini, kami mengundang investor yang memiliki visi serupa
                untuk bersama-sama membangun ekosistem sewa properti yang inklusif dan
                berkelanjutan.
              </p>
              <p className="mb-3">
                Kami terus melakukan inovasi dan pengembangan produk guna menciptakan nilai jangka
                panjang bagi semua pemangku kepentingan — pengguna, pemilik properti, mitra bisnis,
                dan tentu saja para investor.
              </p>

              {/* Call to Action */}
              <div className="mt-5">
                <h4 className="text-xl font-semibold mb-3">
                  Ingin Berinvestasi atau Bermitra dengan Kami?
                </h4>
                <p className="mb-4">
                  Mari bersama membentuk masa depan dunia properti digital di Indonesia. Hubungi
                  kami dan jadilah bagian dari perjalanan pertumbuhan kami.
                </p>
                <a
                  // href="mailto:investor@tempatsewa.com"
                  className="btn btn-primary px-4 py-2 text-white"
                  onClick={() => setShowInvestor(true)}
                >
                  Hubungi Kami Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InvestorModal show={showInvestor} onClose={() => setShowInvestor(false)} />
    </Fragment>
  );
}
