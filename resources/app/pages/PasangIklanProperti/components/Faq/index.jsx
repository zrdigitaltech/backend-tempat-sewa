export default function Faq() {
  const faqs = [
    {
      question:
        'Bagaimana cara menyewakan properti dengan cepat di <b class="text-primary ms-1"> tempatSewa.Com</b>?',
      answer:
        'Pastikan kamu mengisi informasi properti secara lengkap, menggunakan foto asli yang jelas, dan memilih kategori yang tepat. Semakin detail dan menarik iklanmu, semakin cepat menarik perhatian penyewa.'
    },
    {
      question: 'Bagaimana menentukan harga sewa yang sesuai?',
      answer:
        'Sesuaikan harga sewa dengan kondisi properti, lokasi, dan fasilitas yang ditawarkan. Bandingkan juga dengan properti serupa di area sekitar agar harga tetap kompetitif dan realistis.'
    },
    {
      question: 'Apa tips membuat iklan properti yang menarik?',
      answer:
        'Gunakan foto berkualitas tinggi, judul yang jelas, serta deskripsi lengkap yang mencantumkan keunggulan properti seperti akses lokasi, fasilitas, dan kondisi unit. Semakin informatif, semakin tinggi peluang tersewa.'
    },
    {
      question:
        'Apakah <b class="text-primary mx-1"> tempatSewa.Com</b> menyediakan pasang iklan gratis?',
      answer:
        'Ya, <b class="text-primary"> tempatSewa.Com</b> menyediakan opsi pasang iklan secara gratis. Untuk visibilitas lebih tinggi, tersedia juga paket promosi berbayar yang bisa membantu menjangkau lebih banyak calon penyewa.'
    },
    {
      question: 'Apa keuntungan menyewakan properti secara online?',
      answer:
        'Menyewakan properti secara online memungkinkan kamu menjangkau lebih banyak calon penyewa tanpa harus repot. Prosesnya lebih cepat, efisien, dan bisa dilakukan kapan saja di mana saja.'
    },
    {
      question: 'Kenapa harus beriklan di <b class="text-primary ms-1"> tempatSewa.Com</b>?',
      answer:
        'Karena <b class="text-primary ms-1"> tempatSewa.Com</b> adalah platform tepercaya yang dirancang khusus untuk sewa properti. Dengan sistem yang mudah digunakan, fitur lengkap, dan jangkauan luas, iklanmu punya peluang lebih besar untuk segera ditemukan.'
    }
  ];

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h2 className="fw-bold text-center mb-4">Pertanyaan Seputar Pasang Iklan Properti</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map(({ question, answer }, idx) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`heading${idx}`}>
                <button
                  className={`accordion-button shadow-none ${idx > 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${idx}`}
                  aria-expanded={idx === 0}
                  aria-controls={`collapse${idx}`}
                  dangerouslySetInnerHTML={{ __html: question }}
                ></button>
              </h2>
              <div
                id={`collapse${idx}`}
                className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                data-bs-parent="#faqAccordion"
              >
                <div
                  className="accordion-body text-muted small"
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
