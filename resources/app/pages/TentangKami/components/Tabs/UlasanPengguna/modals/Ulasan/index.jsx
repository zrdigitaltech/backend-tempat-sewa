import React, { Fragment, useState } from 'react';
import Modals from '@/app/components/Modals';
import classNames from 'classnames';
import UlasanBerhasil from './UlasanBerhasil';

const IndexUlasan = props => {
  const { show, onClose } = props;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    komentar: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRating = rating => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    else if (formData.name.trim().length < 3) newErrors.name = 'Nama minimal 3 karakter';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email tidak valid';
    if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = 'Pilih rating antara 1 sampai 5';
    if (!formData.komentar.trim()) newErrors.komentar = 'Komentar tidak boleh kosong';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      rating: 0,
      komentar: ''
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Contoh payload
        const bodyFormData = {
          ...formData
        };

        console.log('Submit ulasan:', bodyFormData);

        // TODO: submit ke server

        setShowSuccess(true);
        clearForm();
        onClose();
      } catch (error) {
        console.error('Submit error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Fragment>
      <Modals
        title="Berikan Ulasan Anda"
        show={show}
        onClose={() => (onClose(), clearForm())}
        position="center"
        modalBody={
          <Fragment>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
              />
              {errors.name && <small className="invalid-feedback">{errors.name}</small>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email (opsional)"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.email && <small className="invalid-feedback">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map(star => (
                  <i
                    key={star}
                    className={classNames('fas fa-star me-1', {
                      'text-warning': formData.rating >= star,
                      'text-secondary': formData.rating < star,
                      'cursor-pointer': true
                    })}
                    onClick={() => handleRating(star)}
                  ></i>
                ))}
              </div>
              {errors.rating && <small className="text-danger">{errors.rating}</small>}
            </div>

            <div className="mb-3">
              <textarea
                className={`form-control ${errors.komentar ? 'is-invalid' : ''}`}
                placeholder="Tulis komentar Anda"
                name="komentar"
                value={formData.komentar}
                onChange={handleChange}
                rows={4}
                maxLength={500}
              ></textarea>
              {errors.komentar && <small className="invalid-feedback">{errors.komentar}</small>}
            </div>
          </Fragment>
        }
        modalFooter={
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
          </button>
        }
      />
      {showSuccess && <UlasanBerhasil show={showSuccess} onClose={() => setShowSuccess(false)} />}
    </Fragment>
  );
};

export default IndexUlasan;
