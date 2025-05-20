import React from 'react';

const KebijakanPrivasi = () => {
  return (
    <div className="container py-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Kebijakan Privasi</h1>

      <p className="mb-4">
        Selamat datang di <strong>tempatSewa.Com</strong>. Kami menghargai privasi Anda dan
        berkomitmen untuk melindungi informasi pribadi yang Anda bagikan saat menggunakan platform
        kami.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">1. Tentang tempatSewa.Com</h3>
      <p className="mb-4">
        tempatSewa.Com adalah platform tepercaya yang memudahkan Anda menemukan tempat tinggal
        impian — mulai dari kontrakan, kost, hingga properti sewa lainnya. Kami menghadirkan
        pengalaman pencarian hunian yang cepat, aman, dan nyaman.
      </p>
      <p className="mb-4">
        Bagi pemilik properti, tempatSewa.Com juga menyediakan solusi praktis untuk memasarkan dan
        mengelola properti dalam satu platform yang efisien.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">2. Informasi yang Kami Kumpulkan</h3>
      <p className="mb-4">
        Kami dapat mengumpulkan informasi seperti nama, alamat email, nomor telepon, lokasi, dan
        informasi properti yang Anda unggah. Informasi ini digunakan untuk memproses pencarian,
        mengelola akun, serta meningkatkan layanan kami.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">3. Penggunaan Informasi</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Meningkatkan layanan dan fitur platform</li>
        <li>Memproses transaksi atau permintaan pengguna</li>
        <li>Memberikan dukungan pelanggan</li>
        <li>Mengirim notifikasi terkait akun dan properti</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">4. Perlindungan Data</h3>
      <p className="mb-4">
        Kami menggunakan langkah-langkah teknis dan organisasi yang sesuai untuk menjaga keamanan
        data Anda dari akses tidak sah, penggunaan, atau pengungkapan yang tidak sah.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">5. Pembagian Informasi</h3>
      <p className="mb-4">
        tempatSewa.Com tidak akan menjual, menyewakan, atau membagikan informasi pribadi Anda kepada
        pihak ketiga tanpa izin, kecuali jika diwajibkan oleh hukum atau diperlukan untuk penyediaan
        layanan.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">6. Perubahan Kebijakan</h3>
      <p className="mb-4">
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan
        diinformasikan melalui halaman ini atau notifikasi di aplikasi/website.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">7. Hubungi Kami</h3>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui
        email di{' '}
        <a href="mailto:bantuan@tempatsewa.com" className="text-blue-600 text-decoration-none">
          bantuan@tempatsewa.com
        </a>
        .
      </p>
    </div>
  );
};

export default KebijakanPrivasi;
