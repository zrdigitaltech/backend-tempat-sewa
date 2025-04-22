import FormSearch from '@/app/components/FormSearch';
import { useNavigate } from 'react-router-dom';
export default function Index() {
  const navigate = useNavigate();
  return (
    <section
      className="text-white d-flex align-items-center text-center text-md-start"
      style={{
        minHeight: '80vh',
        backgroundImage: "url('https://placehold.co/800x600')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '3rem 0'
      }}
    >
      {/* Overlay hitam */}
      <div
        className="position-absolute w-100 h-100"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', top: 0, left: 0 }}
      />

      <div className="container position-relative px-3 px-md-5">
        <h1 className="display-6 fw-bold mb-3">Temukan Tempat Tinggal Impianmu dengan Mudah</h1>
        <p className="lead mb-4">
          Jelajahi kost dan kontrakan dengan cepat, aman, dan terpercaya.
          <br />
          <strong>Atau pasarkan properti milikmu dan kelola semuanya dalam satu platform.</strong>
        </p>

        {/* Form */}
        <FormSearch handleSearch={() => navigate('/search')} homePage={true} />
      </div>
    </section>
  );
}
