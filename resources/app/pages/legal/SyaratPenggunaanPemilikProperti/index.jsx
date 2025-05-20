import { Fragment } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

export default function Index() {
  return (
    <Fragment>
      <Breadcrumb title="Syarat Penggunaan Pemilik Properti" />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 className="mb-4 fw-bold text-primary">Syarat Penggunaan Pemilik Properti</h1>

              <p className="fs-5 lh-lg text-secondary">
                Halaman ini menjelaskan syarat dan ketentuan penggunaan platform <strong>tempatSewa.Com</strong> oleh para pemilik properti. Dengan menggunakan layanan ini, Anda menyetujui seluruh ketentuan yang berlaku.
              </p>

              <h5 className="mt-4 fw-bold">1. Pendaftaran Akun</h5>
              <p className="text-secondary">
                Pemilik properti wajib mendaftarkan akun yang valid dan akurat untuk dapat menggunakan fitur unggah dan manajemen properti. Identitas pengguna wajib dapat diverifikasi.
              </p>

              <h5 className="mt-4 fw-bold">2. Keabsahan Data Properti</h5>
              <p className="text-secondary">
                Semua informasi yang diunggah, termasuk deskripsi, gambar, dan harga properti harus akurat, mutakhir, dan tidak menyesatkan. tempatSewa.Com berhak menghapus atau menangguhkan listing yang tidak sesuai.
              </p>

              <h5 className="mt-4 fw-bold">3. Tanggung Jawab Pemilik</h5>
              <p className="text-secondary">
                Pemilik properti bertanggung jawab penuh atas semua transaksi, komunikasi, dan perjanjian sewa yang dilakukan dengan penyewa melalui platform ini.
              </p>

              <h5 className="mt-4 fw-bold">4. Larangan Aktivitas</h5>
              <p className="text-secondary">
                Dilarang keras mengunggah konten yang bersifat ilegal, diskriminatif, atau melanggar hukum yang berlaku di Indonesia. Pelanggaran dapat mengakibatkan penutupan akun secara permanen.
              </p>

              <h5 className="mt-4 fw-bold">5. Perubahan dan Pembaruan</h5>
              <p className="text-secondary">
                tempatSewa.Com berhak melakukan pembaruan syarat penggunaan sewaktu-waktu. Pemilik disarankan untuk secara berkala meninjau halaman ini agar tetap memahami hak dan kewajiban terbaru.
              </p>

              <p className="mt-5 text-muted small">
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
