import { Fragment } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

export default function TentangKami() {
  return (
    <Fragment>
      <Breadcrumb title="Tentang Kami" />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 className="mb-4 fw-bold text-primary">Tentang tempatSewa.Com</h1>
              <p className="fs-5 lh-lg text-secondary">
                <strong>tempatSewa.Com</strong> adalah platform tepercaya yang memudahkanmu
                menemukan tempat tinggal impian — mulai dari <strong>kontrakan</strong>, <strong>kost</strong>, 
                hingga <strong>properti sewa lainnya</strong>.
              </p>
              <p className="fs-5 lh-lg text-secondary">
                Kami hadir untuk menghadirkan <strong>pengalaman pencarian hunian yang cepat, mudah, dan aman</strong>.
                Dengan sistem yang terus dikembangkan, kamu bisa mencari properti sesuai kebutuhan hanya dalam beberapa klik.
              </p>
              <p className="fs-5 lh-lg text-secondary">
                Bagi <strong>pemilik properti</strong>, tempatSewa.Com menyediakan solusi yang efisien dan praktis 
                untuk <strong>memasarkan dan mengelola properti</strong> dalam satu platform terpadu — mulai dari unggah data, 
                mengatur harga, hingga menghubungkan langsung dengan penyewa potensial.
              </p>
              <p className="fs-5 lh-lg text-secondary">
                Dengan komitmen pada <strong>kemudahan, keamanan, dan transparansi</strong>, 
                tempatSewa.Com menjadi pilihan utama bagi para pencari dan pemilik hunian sewa di Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
