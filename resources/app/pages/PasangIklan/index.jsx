import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function SubmitAd() {
  return (
    <Fragment>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Pasang Iklan Properti Mudah di TempatSewa.Com
            </h1>
            <p className="text-lg md:text-xl mb-4">
              Rata-rata <span className="text-yellow-300 font-bold text-3xl">99.000</span> orang
              mencari properti setiap harinya.
            </p>
            <Link
              to="/auth/register"
              className="inline-block bg-white text-blue-700 px-6 py-3 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Pasang Iklan Sekarang
            </Link>
          </div>
          <div className="md:w-1/2 text-center">
            <img
              src="/assets/images/hero-iklan.png"
              alt="Pasang Iklan"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Alasan Memilih */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Kenapa Pilih TempatSewa.Com?</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 text-left">
            {[
              {
                title: 'Mudah & Praktis',
                desc: 'Hanya butuh beberapa langkah untuk pasang iklan.'
              },
              {
                title: 'Jangkauan Luas',
                desc: 'Ribuan calon penyewa dari seluruh Indonesia.'
              },
              {
                title: 'Fitur Lengkap',
                desc: 'Simulasi harga, manajemen properti, dan lainnya.'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 border rounded-xl shadow hover:shadow-md transition">
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            to="/auth/register"
            className="inline-block mt-12 bg-blue-700 text-white px-6 py-3 font-semibold rounded-lg shadow hover:bg-blue-800 transition"
          >
            Daftar dan Pasang Iklan Sekarang
          </Link>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Tips Pasang Iklan Properti</h2>
          <ul className="grid md:grid-cols-2 gap-5 text-sm text-gray-700 max-w-4xl mx-auto">
            {[
              'Gunakan foto asli dan berkualitas.',
              'Cantumkan informasi lokasi yang jelas.',
              'Deskripsikan properti secara detail.',
              'Hindari penggunaan watermark berlebihan.',
              'Unggah semua sudut properti.',
              'Gunakan judul yang menarik & jujur.',
              'Pastikan ukuran foto tidak terlalu besar.',
              'Sertakan kontak yang aktif & responsif.'
            ].map((tip, i) => (
              <li key={i} className="bg-white px-4 py-3 rounded-lg shadow-sm">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kategori Properti */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Pasang Iklan untuk:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-xl mx-auto">
            {['Rumah', 'Kost', 'Tanah', 'Ruko'].map((item, i) => (
              <Link
                key={i}
                to={`/submit/${item.toLowerCase()}`}
                className="block py-3 px-4 border border-blue-500 rounded-lg font-medium text-blue-700 hover:bg-blue-50 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">
            FAQ: Pertanyaan Seputar Pasang Iklan
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-sm">
            {[
              'Bagaimana cara pasang iklan cepat?',
              'Apa saja properti yang bisa saya iklankan?',
              'Apakah gratis atau berbayar?',
              'Bagaimana iklan saya muncul di hasil pencarian?',
              'Apakah saya bisa mengedit iklan setelah dipasang?'
            ].map((q, i) => (
              <details key={i} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                <summary className="font-medium">{q}</summary>
                <p className="mt-2 text-gray-600">Jawaban informatif akan disediakan di sini.</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
