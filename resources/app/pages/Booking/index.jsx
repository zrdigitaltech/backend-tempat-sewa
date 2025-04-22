import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Static data listing
const listing = {
  id: 1,
  title: 'Kost Putri Dekat Kampus',
  location: 'Rawamangun, Jakarta Timur',
  price: 900000,
  duration: 'bulanan',
  status: 'Tersedia',
  description: 'Kost putri nyaman, dekat dengan kampus dan fasilitas umum.'
};

const Book = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState('');
  const [paymentOption, setPaymentOption] = useState('full');
  const [formMessage, setFormMessage] = useState('');

  const totalHarga = listing.price * (duration ? parseInt(duration) : 0);

  const handleBooking = e => {
    e.preventDefault();
    if (!name || !email || !phone || !bookingDate || !duration) {
      setFormMessage('Harap lengkapi semua field.');
    } else {
      setFormMessage('Booking berhasil! Anda akan menerima email konfirmasi.');
      // Kirim data booking ke backend
      console.log({
        name,
        phone,
        email,
        bookingDate,
        duration,
        paymentOption
      });
    }
  };

  return (
    <div className="container mb-5 mt-3">
      <h3 className="mb-4">Booking: {listing.title}</h3>

      {formMessage && <div className="alert alert-info">{formMessage}</div>}

      <form onSubmit={handleBooking}>
        <div className="row g-4">
          {/* Left Form Section */}
          <div className="col-md-8">
            {/* Tanggal & Durasi */}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="tanggalMulai" className="form-label">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  id="tanggalMulai"
                  className="form-control"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="durasi" className="form-label">
                  Durasi (bulan)
                </label>
                <input
                  type="number"
                  id="durasi"
                  className="form-control"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  min={1}
                />
              </div>
            </div>

            {/* Data Penyewa */}
            <div className="mb-3">
              <label className="form-label">Data Penyewa</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nama"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Telepon"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* Opsi Pembayaran */}
            <div className="mb-3">
              <label className="form-label">Opsi Pembayaran</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="full"
                  name="paymentOption"
                  value="full"
                  className="form-check-input"
                  checked={paymentOption === 'full'}
                  onChange={() => setPaymentOption('full')}
                />
                <label htmlFor="full" className="form-check-label">
                  Bayar Penuh
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="dp"
                  name="paymentOption"
                  value="dp"
                  className="form-check-input"
                  checked={paymentOption === 'dp'}
                  onChange={() => setPaymentOption('dp')}
                />
                <label htmlFor="dp" className="form-check-label">
                  Bayar DP
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Section */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4 position-sticky" style={{ top: '100px' }}>
              <h6 className="fw-bold">Ringkasan Harga</h6>
              <p>
                Harga per bulan: <strong>Rp {listing.price.toLocaleString('id-ID')}</strong>
              </p>
              <p>
                Durasi sewa: <strong>{duration || 0} bulan</strong>
              </p>
              <p>
                Total: <strong>Rp {totalHarga.toLocaleString('id-ID')}</strong>
              </p>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                {paymentOption === 'dp' ? 'Kirim Permintaan' : 'Lanjut Bayar'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Book;
