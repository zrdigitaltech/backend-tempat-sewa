import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitRegister } from '@/app/redux/action/register/creator';
import UseToasts from '@/app/components/Toasts';
import { Link } from 'react-router-dom';

export default function FormRegister() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nama tidak boleh kosong';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Nama tidak boleh lebih dari 50 karakter';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor tidak boleh kosong';
    } else if (formData.phone.length < 9) {
      newErrors.phone = 'Nomor tidak boleh kurang dari 9 digit';
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Nomor tidak boleh lebih dari 15 digit';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong.';
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(formData.password)) {
      newErrors.password =
        'Min. 8 karakter, mengandung huruf dan angka, serta tidak mengandung simbol.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      password: ''
    });
    setErrors({});
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Kirim ke server
        const result = await dispatch(submitRegister(formData));
        if (result.success) {
          onClose();
          clearForm();
        } else {
          console.error('Gagal submit form:', result.error);
          // Kamu bisa set error di UI jika perlu
          showError('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
        }
        setIsSubmitting(false);
      } catch (error) {
        console.error('Unexpected submit error:', error);
        showError('Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const showError = msg => {
    if (errorMessage !== msg) {
      setErrorMessage(msg);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

      errorTimeoutRef.current = setTimeout(() => {
        setErrorMessage('');
        errorTimeoutRef.current = null;
      }, 5000);
    }
  };

  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">
        <h5 className="card-title text-center fw-bold">Daftar</h5>
        <p className="card-title text-center mb-4">
          Sudah punya akun?{' '}
          <a href="/user/login" rel="noreferrer">
            Masuk
          </a>{' '}
          sekarang
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Masukkan Nama Lengkap"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Nomor Telepon</label>
            <div className="input-group">
              <span className="bg-primary input-group-text text-white">+62</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Masukkan Nomor"
                onChange={e => {
                  const value = e.target.value;
                  // Hanya angka dan tidak boleh diawali dengan 0
                  if (/^[1-9][0-9]*$/.test(value) || value === '') {
                    handleChange(e);
                  }
                }}
                onKeyPress={e => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={15}
              />
            </div>
            {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Masukkan Alamat Email"
              maxLength={100}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div class="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Masukkan Password"
              />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={() => setShowPassword(prev => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
              </button>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
          </div>

          {errorMessage && (
            <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
          )}
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}
