import { Fragment } from 'react';

export default function Index() {
  return (
    <Fragment>
      {/* Tips Iklan */}
      <div className="container py-5">
        {/* Alasan Pasang Iklan */}
        <div className="text-center mb-5">
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
        <div className="">
          <p>
            TempatSewa.Com adalah platform tepercaya yang memudahkan Anda menemukan tempat tinggal
            impian—mulai dari kontrakan, kost, hingga berbagai jenis properti sewa lainnya. Nikmati
            pengalaman pencarian hunian yang cepat, aman, dan nyaman melalui fitur-fitur yang
            dirancang untuk memudahkan proses pencarian Anda.
          </p>
          <p>
            Bagi pemilik properti, TempatSewa.Com menyediakan solusi terpadu untuk memasarkan dan
            mengelola properti secara efisien. Setiap harinya, ratusan iklan properti baru dipasang,
            memberikan peluang besar untuk menjangkau ribuan calon penyewa. Pastikan iklan Anda
            menarik perhatian dengan informasi lengkap dan foto berkualitas tinggi.
          </p>

          {/* Tips */}
          <div class="mt-5 mb-4">
            <div class="d-flex align-items-center mb-2">
              <i class="bi bi-lightbulb-fill text-primary"></i>
              <h5 class="fw-bold mb-0">Tips Pasang Iklan di TempatSewa.Com</h5>
            </div>
            <p class="text-muted mb-4">
              Berikut beberapa tips memasang iklan di TempatSewa.Com untuk pemilik properti agar
              lebih cepat tersewa:
            </p>
          </div>

          <div class="row g-4">
            {[
              [
                'Gunakan Foto Properti Asli',
                'Pastikan foto properti yang Anda gunakan adalah foto asli. Jangan gunakan foto properti lain yang tidak sesuai.'
              ],
              [
                'Foto Berkualitas Baik',
                'Gunakan foto dengan resolusi tinggi, fokus, dan tidak gelap agar menarik lebih banyak peminat.'
              ],
              [
                'Gunakan Foto Ukuran Sesuai',
                'Gunakan ukuran foto di bawah 4 MB agar lebih cepat dimuat.'
              ],
              [
                'Sertakan Foto Berbagai Sudut',
                'Ambil foto dari berbagai sudut: depan rumah, garasi, ruang tamu, kamar tidur, dapur, hingga halaman belakang.'
              ],
              [
                'Foto Boleh Memuat Informasi',
                'Selama tidak menutupi gambar properti, Anda boleh menyisipkan informasi seperti harga, kontak, atau logo.'
              ],
              [
                'Foto 3D untuk Primary',
                'Boleh menambahkan foto 3D atau maket pada iklan properti utama.'
              ],
              [
                'Jangan Gunakan Brosur sebagai Foto Utama',
                'Brosur boleh diunggah sebagai foto tambahan, namun bukan sebagai foto utama.'
              ],
              [
                'Gunakan Satu Foto per Bingkai',
                'Hindari kolase. Gunakan satu foto untuk satu tampilan agar lebih jelas.'
              ],
              [
                'Foto Site Plan sebagai Pelengkap',
                'Jangan hanya mengunggah site plan tanpa tambahan foto properti kecuali iklan tanah.'
              ],
              [
                'Isi Keterangan dengan Benar',
                'Pastikan properti sesuai dengan kategorinya, seperti rumah, kost, apartemen, atau tanah.'
              ],
              [
                'Lengkapi Informasi Properti',
                'Isi deskripsi lengkap agar pembeli atau penyewa lebih mudah memahami kondisi properti.'
              ],
              [
                'Harga Properti Sesuai',
                'Tentukan harga sewa yang sesuai. Harga yang janggal dapat menyebabkan iklan diturunkan.'
              ]
            ].map(([title, desc], i) => (
              <div class="col-md-6 col-lg-4">
                <div class="p-3 border rounded-3 h-100 bg-white shadow-sm">
                  <div class="d-flex align-items-start">
                    <div class="me-3">
                      <span class="badge bg-primary px-3 py-2">{i + 1}</span>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">{title}</h6>
                      <p class="small text-muted mb-0">{desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
