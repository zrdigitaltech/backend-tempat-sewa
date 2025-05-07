import React, { Fragment, useState } from 'react';
import Modals from '@/app/components/Modals';
import BelumLogin from '@/app/pages/modal/WhatsApp/components/BelumLogin';
import SudahLogin from '@/app/pages/modal/WhatsApp/components/SudahLogin';
import { Link } from 'react-router-dom';

const Index = props => {
  const { show, onClose } = props;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    verifikasi: 'whatsapp'
  });

  const [errors, setErrors] = useState({});
  const [showBerhasilDiLaporkan, setShowBerhasilDiLaporkan] = useState(false);

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

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      verifikasi: 'whatsapp'
    });
    setErrors({});
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form data valid:', formData);
      // Lakukan submit ke server di sini
      onClose();
      setShowBerhasilDiLaporkan(true);
      clearForm();
    }
  };

  return (
    <Modals
      title="Hubungi pengiklan Properti"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <BelumLogin formData={formData} errors={errors} handleChange={handleChange} />
          {/* <SudahLogin /> */}
        </Fragment>
      }
      additionalInformation={
        <Fragment>
          <div className="container p-2 border-top">
            <div className="row row-cols-1 row-cols-md-2 g-3">
              <div className="col text-center border-end">
                <i className="fa-solid fa-lock text-primary me-2 mt-1"></i>
                <br />
                <small>
                  <strong>tempatSewa.Com</strong> menjaga keamanan data Anda
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
      }
      modalFooter={
        <Fragment>
          {/* Start Belum Login */}
          <button type="button" className="btn btn-success w-100 text-white" onClick={handleSubmit}>
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
          {/* Start Sudah Login */}
          {/* <button type="button" className="btn btn-success w-100 text-white">
            <i className="fa-whatsapp fa-brands"></i> WhatsApp
          </button> */}
        </Fragment>
      }
    />
  );
};

export default Index;
