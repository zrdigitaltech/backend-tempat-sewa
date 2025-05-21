import React, { Fragment } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';

const Index = () => {
  return (
    <Fragment>
      <section className="mt-3">
        <Breadcrumb title="Kebijakan Privasi" />
      </section>
      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="fs-3 fw-bold mb-3 text-dark">Kebijakan Privasi</h1>

          <p className="text-muted mb-4">
            Selamat datang di <strong>tempatSewa.Com</strong>. Kami menghargai privasi Anda dan
            berkomitmen untuk melindungi informasi pribadi yang Anda bagikan saat menggunakan
            platform kami.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">1. Tentang tempatSewa.Com</h4>
          <p className="text-muted mb-4">
            tempatSewa.Com adalah platform tepercaya yang memudahkan Anda menemukan tempat tinggal
            impian — mulai dari kontrakan, kost, hingga properti sewa lainnya. Kami menghadirkan
            pengalaman pencarian hunian yang cepat, aman, dan nyaman.
          </p>
          <p className="text-muted mb-4">
            Bagi pemilik properti, tempatSewa.Com juga menyediakan solusi praktis untuk memasarkan
            dan mengelola properti dalam satu platform yang efisien.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">2. Informasi yang Kami Kumpulkan</h4>
          <p className="text-muted mb-4">
            Kami dapat mengumpulkan informasi seperti nama, alamat email, nomor telepon, lokasi, dan
            informasi properti yang Anda unggah. Informasi ini digunakan untuk memproses pencarian,
            mengelola akun, serta meningkatkan layanan kami.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">3. Penggunaan Informasi</h4>
          <ul className="list-disc ml-6 mb-4 text-muted ">
            <li>Meningkatkan layanan dan fitur platform</li>
            <li>Memproses transaksi atau permintaan pengguna</li>
            <li>Memberikan dukungan pelanggan</li>
            <li>Mengirim notifikasi terkait akun dan properti</li>
          </ul>

          <h4 className="text-xl fw-bold mt-6 mb-2">4. Perlindungan Data</h4>
          <p className="text-muted mb-4">
            Kami menggunakan langkah-langkah teknis dan organisasi yang sesuai untuk menjaga
            keamanan data Anda dari akses tidak sah, penggunaan, atau pengungkapan yang tidak sah.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">5. Pembagian Informasi</h4>
          <p className="text-muted mb-4">
            tempatSewa.Com tidak akan menjual, menyewakan, atau membagikan informasi pribadi Anda
            kepada pihak ketiga tanpa izin, kecuali jika diwajibkan oleh hukum atau diperlukan untuk
            penyediaan layanan.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">6. Perubahan Kebijakan</h4>
          <p className="text-muted mb-4">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan
            diinformasikan melalui halaman ini atau notifikasi di aplikasi/website.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">7. Hubungi Kami</h4>
          <p className="text-muted mb-4">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami
            melalui email di{' '}
            <a href="mailto:bantuan@tempatsewa.com" className="text-blue-600 ">
              bantuan@tempatsewa.com
            </a>
            .
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Index;
