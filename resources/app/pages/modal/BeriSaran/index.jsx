import React, { Fragment, useState } from 'react';
import Modals from '@/app/components/Modals';
import PermintaanBerhasilModal from '@/app/pages/modal/BeriSaran/PermintaanBerhasil';
import { useDispatch } from 'react-redux';
import { submitBeriSaran } from '@/app/redux/action/beriSaran/creator';

const Index = props => {
  const { show, onClose } = props;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    feedback: '',
    phone: '',
    userType: '' // string, single choice
  });

  const [errors, setErrors] = useState({});
  const [showPermintaanBerhasil, setShowPermintaanBerhasil] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Masukan feedback Anda tidak boleh kosong';
    } else if (formData.feedback.trim().length < 5) {
      newErrors.feedback = 'Feedback minimal 5 karakter';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor tidak boleh kosong';
    } else if (formData.phone.length < 9) {
      newErrors.phone = 'Nomor tidak boleh kurang dari 9 digit';
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Nomor tidak boleh lebih dari 15 digit';
    }

    if (!formData.userType) {
      newErrors.userType = 'Pilih salah satu pernyataan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      feedback: '',
      phone: '',
      userType: ''
    });
    setErrors({});
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Data yang dikirim ke server
        const bodyFormData = {
          feedback: formData.feedback.trim(),
          phone: formData.phone.trim(),
          userType: formData.userType
        };

        console.log('Data submit:', bodyFormData);

        // Contoh fetch POST
        const result = await dispatch(submitBeriSaran(bodyFormData));
        if (result.success) {
          setShowPermintaanBerhasil(true);
          onClose();
          clearForm();
        } else {
          console.error('Gagal submit form:', result.error);
          // Kamu bisa set error di UI jika perlu
          setErrorMessage('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
        }
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
        title="Beri Saran"
        show={show}
        onClose={() => {
          onClose();
          clearForm();
        }}
        position="center"
        modalBody={
          <Fragment>
            <div className="mb-3">
              <label className="form-label">
                Apa yang dapat kami lakukan untuk membuat pengalaman Anda menjadi lebih baik dengan{' '}
                <small>tempat</small>Sewa.Com ? <small className="text-danger">*</small>
              </label>
              <textarea
                name="feedback"
                className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                value={formData.feedback}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Tulis masukan atau saran Anda..."
              />
              {errors.feedback && <small className="invalid-feedback">{errors.feedback}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Masukkan nomor WhatsApp Anda untuk membantu kami bertanya lebih jelas terkait
                masukan Anda <small className="text-danger">*</small>
              </label>
              <div className="input-group ">
                <span className="bg-primary input-group-text text-white">+62</span>
                <input
                  type="text"
                  name="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Masukkan Nomor"
                  onKeyPress={e => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={15}
                />
                {errors.phone && <small className="invalid-feedback">{errors.phone}</small>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Mana pernyataan yang sesuai dengan Anda? <small className="text-danger">*</small>
              </label>
              <div>
                <div className="form-check">
                  <input
                    id="pemilik"
                    name="userType"
                    type="radio"
                    value="pemilik"
                    checked={formData.userType === 'pemilik'}
                    onChange={handleChange}
                    className={`form-check-input ${errors.userType ? 'is-invalid' : ''}`}
                  />
                  <label htmlFor="pemilik" className="form-check-label">
                    Saya adalah Pemilik Properti
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="pencari"
                    name="userType"
                    type="radio"
                    value="pencari"
                    checked={formData.userType === 'pencari'}
                    onChange={handleChange}
                    className={`form-check-input ${errors.userType ? 'is-invalid' : ''}`}
                  />
                  <label htmlFor="pencari" className="form-check-label">
                    Saya adalah Pencari Properti
                  </label>
                </div>
                {errors.userType && (
                  <small className="invalid-feedback d-block">{errors.userType}</small>
                )}
              </div>
            </div>
          </Fragment>
        }
        modalFooter={
          <Fragment>
            {errorMessage && (
              <div className="alert alert-danger mb-2 w-100 p-2" role="alert">
                {errorMessage}
              </div>
            )}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memproses...' : 'Kirim Masukan'}
            </button>
          </Fragment>
        }
      />
      <PermintaanBerhasilModal
        show={showPermintaanBerhasil}
        onClose={() => setShowPermintaanBerhasil(false)}
      />
    </Fragment>
  );
};

export default Index;
