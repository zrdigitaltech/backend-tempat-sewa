export default function Reason() {
  const reasons = [
    [
      'Mudah & Praktis',
      'Proses pasang iklan dilakukan dengan cepat dan tanpa hambatan, cukup dalam beberapa langkah sederhana.',
      'fa-bolt'
    ],
    [
      'Jangkauan Luas',
      'Iklan Anda ditampilkan kepada ribuan calon penyewa setiap harinya, meningkatkan peluang properti cepat tersewa.',
      'fa-globe'
    ],
    [
      'Fitur Terpadu',
      'TempatSewa.Com menyediakan sistem pencarian, pemasaran, dan pengelolaan properti dalam satu platform yang efisien.',
      'fa-layer-group'
    ]
  ];

  return (
    <div className="text-center mb-5">
      <h2 className="fw-bold mb-4">
        Kenapa Memilih <strong className="text-primary">tempatSewa.Com</strong>
      </h2>
      <div className="row g-4">
        {reasons.map(([title, desc, icon], i) => (
          <div className="col-md-4" key={i}>
            <div className="p-4 rounded-3 shadow-sm h-100 bg-white border">
              <div className="mb-3 text-primary">
                <i className={`fa ${icon} fa-2x`}></i>
              </div>
              <h5 className="fw-semibold mb-2">{title}</h5>
              <p className="text-muted small mb-0">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
