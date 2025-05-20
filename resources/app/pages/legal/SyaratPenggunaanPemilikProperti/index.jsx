import { Fragment } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

export default function Index() {
  return (
    <Fragment>
      <section className="mt-3">
        <Breadcrumb title="Syarat Penggunaan Pemilik Properti" />
      </section>
      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">Syarat Penggunaan Pemilik Properti</h1>

          <p className="mb-4">
            Halaman ini menjelaskan syarat dan ketentuan penggunaan platform{' '}
            <strong>tempatSewa.Com</strong> oleh para pemilik properti. Dengan menggunakan layanan
            ini, Anda menyetujui seluruh ketentuan yang berlaku.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">1. Pendaftaran Akun</h3>
          <p className="mb-4">
            Pemilik properti wajib mendaftarkan akun yang valid dan akurat untuk dapat menggunakan
            fitur unggah dan manajemen properti. Identitas pengguna wajib dapat diverifikasi.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">2. Keabsahan Data Properti</h3>
          <p className="mb-4">
            Semua informasi yang diunggah, termasuk deskripsi, gambar, dan harga properti harus
            akurat, mutakhir, dan tidak menyesatkan. tempatSewa.Com berhak menghapus atau
            menangguhkan listing yang tidak sesuai.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">3. Tanggung Jawab Pemilik</h3>
          <p className="mb-4">
            Pemilik properti bertanggung jawab penuh atas semua transaksi, komunikasi, dan
            perjanjian sewa yang dilakukan dengan penyewa melalui platform ini.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">4. Larangan Aktivitas</h3>
          <p className="mb-4">
            Dilarang keras mengunggah konten yang bersifat ilegal, diskriminatif, atau melanggar
            hukum yang berlaku di Indonesia. Pelanggaran dapat mengakibatkan penutupan akun secara
            permanen.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">5. Perubahan dan Pembaruan</h3>
          <p className="mb-4">
            tempatSewa.Com berhak melakukan pembaruan syarat penggunaan sewaktu-waktu. Pemilik
            disarankan untuk secara berkala meninjau halaman ini agar tetap memahami hak dan
            kewajiban terbaru.
          </p>

          <p className="mt-5 text-muted small">
            Terakhir diperbarui:{' '}
            {new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </section>
    </Fragment>
  );
}
