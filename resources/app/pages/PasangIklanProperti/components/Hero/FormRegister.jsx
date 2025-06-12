export default function FormRegister() {
  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">
        <h5 className="card-title text-center mb-4 fw-bold">Daftar</h5>
        <form>
          <div className="mb-3">
            <label className="form-label">Nama Lengkap</label>
            <input type="text" className="form-control" placeholder="Nama Lengkap" />
          </div>
          <div className="mb-3">
            <label className="form-label">Nomor Telepon</label>
            <input type="tel" className="form-control" placeholder="0812xxxxxxx" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="email@example.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
