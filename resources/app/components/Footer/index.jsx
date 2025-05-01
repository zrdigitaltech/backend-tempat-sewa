export default function Index() {
  return (
    <footer className="bg-primary text-light py-5">
      <div className="container">
        <div className="row mb-4">
          {/* Deskripsi */}
          <div className="col-md-6">
            <h5>Tentang TempatSewa.Com</h5>
            <p>
              <small>Tempat</small>Sewa.Com adalah platform yang dirancang untuk memudahkan Anda dalam mencari dan
              memesan kontrakan, kost, maupun properti sewa lainnya secara cepat dan praktis. Tak
              hanya untuk pencari hunian — Anda juga dapat memasarkan properti dan mengelolanya
              dengan lebih efisien, semua dalam satu tempat: <small>Tempat</small>Sewa.Com.
            </p>
          </div>

          {/* Hubungi Kami */}
          <div className="col-md-6">
            <h5>Hubungi Kami</h5>
            <p className="mb-1">
              Email:{' '}
              <a href="mailto:bantuan@99.co" className="text-white text-decoration-none">
                bantuan@TempatSewa.Com
              </a>
            </p>
            <p className="mb-1">
              Telepon:{' '}
              <a href="tel:+6287722000203" className="text-white text-decoration-none">
                +62 8122 888 3616
              </a>
            </p>
            {/* <p className="mb-0">Kantor: EightyEight @Kasablanka, Jl. Casablanca Kav.88, Jakarta Selatan, Jakarta 12870</p> */}
          </div>
        </div>

        <div className="row border-top pt-3">
          <div className="col-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} <strong><small>Tempat</small>Sewa.Com</strong>
            </p>
          </div>
          <div className="col-6 text-end mt-2 mt-0">
            <p className="mb-0">
              Didukung oleh{' '}
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
