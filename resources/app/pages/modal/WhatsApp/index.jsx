import React, { Fragment, useEffect, useState } from 'react';
import Modals from '@/app/components/Modals';
import BelumLogin from '@/app/pages/modal/WhatsApp/components/BelumLogin';
import SudahLogin from '@/app/pages/modal/WhatsApp/components/SudahLogin';
import { Link } from 'react-router-dom';
import VerifikasiModal from '@/app/pages/modal/WhatsApp/verifikasi';

const Index = props => {
  const { show, onClose, setShowWhatsApp } = props;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    verifikasi: 'whatsapp'
  });

  const [errors, setErrors] = useState({});
  const [showVerifikasi, setShowVerifikasi] = useState(false);
  const [isPageVerified, setIsPageVerified] = useState(false);

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

    if (!formData.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor tidak boleh kosong';
    } else if (formData.phone.length < 9) {
      newErrors.phone = 'Nomor tidak boleh kurang dari 9 digit';
    }
    if (!formData.verifikasi.trim()) {
      newErrors.verifikasi = 'Verifikasi tidak boleh kosong';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form data valid:', formData);
      // Lakukan submit ke server di sini
      onClose();
      setShowVerifikasi(true);
      setErrors({});
    }
  };

  useEffect(() => {
    if (isPageVerified) {
      // Logic to show the WhatsApp component after the page is verified
      setIsPageVerified(true);
    }
  }, [isPageVerified]);

  return (
    <Fragment>
      <Modals
        title="Hubungi pengiklan Properti"
        show={show}
        onClose={() => onClose()}
        position="center"
        modalBody={
          <Fragment>
            {isPageVerified ? (
              <SudahLogin />
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
                  <div className="col text-center border-end">
                    <i className="fa-solid fa-lock text-primary me-2 mt-1"></i>
                    <br />
                    <small>
                      <strong>tempatSewa.Com</strong> menjaga keamanan data diri kamu
                    </small>
                  </div>
                  <div className="col text-center">
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
            <button type="button" className="btn btn-success w-100 text-white">
              <i className="fa-whatsapp fa-brands"></i> WhatsApp
            </button>
          ) : (
            <Fragment>
              {/* Start Belum Login */}
              <button
                type="button"
                className={`btn btn-${formData?.verifikasi === 'whatsapp' ? 'success' : 'primary'} w-100 text-white`}
                onClick={handleSubmit}
              >
                <i
                  className={` fa-${formData.verifikasi === 'whatsapp' ? 'whatsapp fa-brands' : 'comment-sms fa-solid'}`}
                ></i>{' '}
                Lanjutkan
              </button>
              <small>
                Dengan ini anda bersedia untuk mengikuti{' '}
                <Link to="/terms-and-conditions" className="text-decoration-none">
                  <b>Terms and Conditions</b>
                </Link>{' '}
                &{' '}
                <Link to="/privacy-policy" className="text-decoration-none">
                  <b>Privacy Policy</b>
                </Link>{' '}
                tempatSewa.Com
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
        setIsPageVerified={setIsPageVerified}
      />
    </Fragment>
  );
};

export default Index;
