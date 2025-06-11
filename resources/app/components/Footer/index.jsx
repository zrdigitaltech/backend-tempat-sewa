import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <footer className="bg-primary text-light py-5">
      <div className="container">
        <div className="row mb-4">
          {/* Deskripsi */}
          <div className="col-md-8">
            <div>
              <h5 className="fw-bold">Selamat datang di tempatSewa.Com</h5>
              <p>
                <small>tempat</small>Sewa.Com adalah Platform tepercaya yang memudahkanmu menemukan
                tempat tinggal impian — mulai dari kontrakan, kost, hingga properti sewa lainnya.
                Nikmati pengalaman pencarian hunian yang cepat dan aman. Bagi pemilik properti,{' '}
                <small>tempat</small>Sewa.Com juga menyediakan solusi praktis untuk memasarkan dan
                mengelola properti dalam satu platform yang efisien.
              </p>
            </div>
            <div className="mb-3 mb-sm-0">
              <h5 className="fw-bold">Hubungi Kami</h5>
              <p className="mb-1">
                Email:{' '}
                <Link
                  to="mailto:bantuan@tempatSewa.Com"
                  className="text-white "
                  rel="noopener noreferrer"
                >
                  bantuan@tempatSewa.Com
                </Link>
              </p>
              <p className="mb-1">Telepon: +62 8122 888 3616</p>
              {/* <p className="mb-0">Kantor: EightyEight @Kasablanka, Jl. Casablanca Kav.88, Jakarta Selatan, Jakarta 12870</p> */}
            </div>
          </div>

          {/* Hubungi Kami */}
          <div className="col-md-4">
            <div>
              <h5 className="fw-bold">Profil</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/tentang-kami" className="text-white ">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link to="/kebijakan-privasi" className="text-white ">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link to="/syarat-dan-ketentuan" className="text-white ">
                    Syarat dan Ketentuan
                  </Link>
                </li>
                <li>
                  <Link to="/syarat-penggunaan-pemilik-properti" className="text-white ">
                    Syarat Penggunaan Pemilik Properti
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row border-top pt-3">
          <div className="col-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()}{' '}
              <strong>
                <small>tempat</small>Sewa.Com
              </strong>
            </p>
          </div>
          <div className="col-6 text-end">
            <p className="mb-0">
              Dikembangkan oleh{' '}
              <Link
                to="https://zrdevelopers.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fw-semibold "
              >
                ZRDevelopers
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
