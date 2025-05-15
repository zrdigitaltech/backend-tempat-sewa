export default function Index() {
  return (
    <footer className="bg-primary text-light py-5">
      <div className="container">
        <div className="row mb-4">
          {/* Deskripsi */}
          <div className="col-md-6">
            <h5>Tentang tempatSewa.Com</h5>
            <p>
              <small>tempat</small>Sewa.Com adalah Platform tepercaya yang memudahkanmu menemukan
              tempat tinggal impian — mulai dari kontrakan, kost, hingga properti sewa lainnya.
              Nikmati pengalaman pencarian hunian yang cepat dan aman. Bagi pemilik properti,{' '}
              <small>tempat</small>Sewa.Com juga menyediakan solusi praktis untuk memasarkan dan
              mengelola properti dalam satu platform yang efisien.
            </p>
          </div>

          {/* Hubungi Kami */}
          <div className="col-md-6">
            <h5>Hubungi Kami</h5>
            <p className="mb-1">
              Email:{' '}
              <a
                href="mailto:bantuan@tempatSewa.Com"
                className="text-white text-decoration-none"
                rel="noopener noreferrer"
              >
                bantuan@tempatSewa.Com
              </a>
            </p>
            <p className="mb-1">Telepon: +62 8122 888 3616</p>
            {/* <p className="mb-0">Kantor: EightyEight @Kasablanka, Jl. Casablanca Kav.88, Jakarta Selatan, Jakarta 12870</p> */}
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
          <div className="col-6 text-end mt-2 mt-0">
            <p className="mb-0">
              Dikembangkan oleh{' '}
              <a
                href="https://zrdevelopers.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fw-semibold text-decoration-none"
              >
                ZRDevelopers
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
