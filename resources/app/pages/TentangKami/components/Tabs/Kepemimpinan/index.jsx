import React, { Fragment } from 'react';

export default function Index(props) {
  const { refs } = props;

  const leaders = [
    {
      name: 'Zikri Ramdani',
      title: 'CEO & Co-Founder',
      img: 'https://zrdigitaltech.github.io/assets/images/about-img.webp', // Ganti dengan path gambar yang sesuai
      desc: 'Memimpin visi strategis dan pertumbuhan platform tempatSewa.Com dengan pendekatan berbasis teknologi.'
    }
  ];

  return (
    <Fragment>
      <section ref={refs.kepemimpinanRef} className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold mb-3">
            <b>Kepemimpinan</b>
          </h2>
          <p className="mb-3">
            Di balik <strong>tempatSewa.Com</strong> terdapat tim kepemimpinan yang berdedikasi
            dalam membangun platform sewa properti yang aman, cepat, dan terpercaya.
          </p>
          <p>
            Kepemimpinan kami berlandaskan pada inovasi, kolaborasi, dan fokus pada kebutuhan
            pengguna — baik pencari hunian maupun pemilik properti.
          </p>
        </div>

        <div className="row justify-content-center">
          {leaders.map((leader, index) => (
            <div key={index} className="col-12 col-sm-4 mb-4 text-center">
              <img
                src={leader.img}
                alt={leader.name}
                className="rounded-circle mb-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <h5 className="mb-1">{leader.name}</h5>
              <p className="text-muted mb-2">{leader.title}</p>
              <p className="small">{leader.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
