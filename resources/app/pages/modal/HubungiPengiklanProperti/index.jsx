import React, { Fragment, useEffect, useState } from 'react';
import Modals from '@/app/components/Modals';
import BelumLogin from '@/app/pages/modal/HubungiPengiklanProperti/components/BelumLogin';
import SudahLogin from '@/app/pages/modal/HubungiPengiklanProperti/components/SudahLogin';
import { Link } from 'react-router-dom';
import VerifikasiModal from '@/app/pages/modal/HubungiPengiklanProperti/verifikasi';
import { useDispatch } from 'react-redux';
import { submitHubungiPengiklanProperti } from '@/app/redux/action/hubungiPengiklanProperti/creator';

const Index = props => {
  const {
    show,
    onClose,
    setShowWhatsApp,
    isPageVerified,
    setIsPageVerified,
    handleGoWhatsApp,
    dataItem,
    setDataItem
  } = props;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    verifikasi: 'whatsapp'
  });

  const [errors, setErrors] = useState({});
  const [showVerifikasi, setShowVerifikasi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verified = localStorage.getItem('isVerified') === 'true';
    setIsPageVerified(verified);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus error untuk field yang sedang diedit
    if (errors[name]) {
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
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
    if (!formData.verifikasi.trim()) {
      newErrors.verifikasi = 'Verifikasi tidak boleh kosong';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        console.log('Form data valid:', formData);

        // Kirim ke server
        const result = await dispatch(submitHubungiPengiklanProperti(formData));
        if (result.success) {
          onClose();
          setShowVerifikasi(true);
          clearForm();
        } else {
          console.error('Gagal submit form:', result.error);
          // Kamu bisa set error di UI jika perlu
          setErrorMessage('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
        }

        onClose();
        setShowVerifikasi(true);
        clearForm();
        setIsSubmitting(false);
      } catch (error) {
        setErrorMessage('Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.');
        console.error('Unexpected submit error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      verifikasi: 'whatsapp'
    });
    setErrors({});
  };

  return (
    <Fragment>
      <Modals
        title="Hubungi Pengiklan Properti"
        show={show}
        onClose={() => {
          onClose();
          clearForm();
          if (isPageVerified) {
            setDataItem(null);
          }
        }}
        position="center"
        styleModal={{ zIndex: 9999999 }}
        styleModalBackdrop={{ zIndex: 999999 }}
        modalBody={
          <Fragment>
            {isPageVerified ? (
              <SudahLogin dataItem={dataItem} />
            ) : (
              <BelumLogin formData={formData} errors={errors} handleChange={handleChange} />
            )}
          </Fragment>
        }
        additionalInformation={
          isPageVerified ? (
            ''
          ) : (
            <Fragment>
              <div className="container p-2 border-top">
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  <div className="col-6 text-center border-end">
                    <i className="fa-solid fa-lock text-primary me-2 mt-1"></i>
                    <br />
                    <small>
                      <strong>
                        <small>tempat</small>Sewa.Com
                      </strong>{' '}
                      menjaga keamanan data diri kamu
                    </small>
                  </div>
                  <div className="col-6 text-center">
                    <i className="fa-solid fa-check-circle text-success me-2 mt-1"></i>
                    <br />
                    <small> 1x verifikasi untuk komunikasi dengan seluruh pemilik properti.</small>
                  </div>
                </div>
              </div>
            </Fragment>
          )
        }
        modalFooter={
          isPageVerified ? (
            <button
              type="button"
              className="btn btn-success w-100 text-white"
              onClick={handleGoWhatsApp}
            >
              <i className="fa-whatsapp fa-brands"></i> WhatsApp
            </button>
          ) : (
            <Fragment>
              {/* Start Belum Login */}
              {errorMessage && (
                <div className="alert alert-danger mb-2 w-100 p-2" role="alert">
                  {errorMessage}
                </div>
              )}
              <button
                type="button"
                className={`btn btn-${formData?.verifikasi === 'whatsapp' ? 'success' : 'primary'} w-100 text-white`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <i
                  className={` fa-${formData.verifikasi === 'whatsapp' ? 'whatsapp fa-brands' : 'comment-sms fa-solid'}`}
                ></i>{' '}
                {isSubmitting ? 'Memproses...' : 'Lanjutkan'}
              </button>
              <small>
                Dengan ini Anda setuju untuk mematuhi{' '}
                <a
                  href="/syarat-dan-ketentuan"
                  target="_blank"
                  className=""
                  rel="noopener noreferrer"
                >
                  <b>Syarat dan Ketentuan</b>
                </a>{' '}
                &amp;{' '}
                <a href="/kebijakan-privasi" target="_blank" className="" rel="noopener noreferrer">
                  <b>Kebijakan Privasi</b>
                </a>{' '}
                di <small>tempat</small>Sewa.Com
              </small>
            </Fragment>
          )
        }
      />
      <VerifikasiModal
        show={showVerifikasi}
        onClose={() => setShowVerifikasi(false)}
        formData={formData}
        setFormData={setFormData}
        handleGantiNomor={() => (setShowWhatsApp(true), setShowVerifikasi(false))}
        setIsPageVerified={() => (
          setIsPageVerified,
          setShowVerifikasi(false),
          setShowWhatsApp(true),
          setIsPageVerified(true)
        )}
      />
    </Fragment>
  );
};

export default Index;
