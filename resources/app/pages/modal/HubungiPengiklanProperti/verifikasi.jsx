import React, { Fragment, useEffect, useState, useRef } from 'react';
import Modals from '@/app/components/Modals';
import { useDispatch } from 'react-redux';
import { submitVerifikasi } from '@/app/redux/action/hubungiPengiklanProperti/creator';
import UseToasts from '@/app/components/Toasts';

const Verifikasi = props => {
  const { show, onClose, formData, handleGantiNomor, setFormData, setIsPageVerified } = props;
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isChangingMetode, setIsChangingMetode] = useState(true);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const inputRefs = useRef([]);
  const [otpError, setOtpError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);

      // Fokus ke input berikutnya jika ada dan value tidak kosong
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Cek jika semua input terisi, lalu submit
      if (updated.every(val => val !== '') && updated.length === 4) {
        setTimeout(handleSubmitOtp, 100); // beri jeda kecil agar input terakhir terupdate
      }
    }
  };

  const formatTimer = () => {
    const m = String(Math.floor(timer / 60)).padStart(2, '0');
    const s = String(timer % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleGantiMetode = () => {
    setOtp(['', '', '', '']);
    setIsChangingMetode(false);
    setFormData(prev => ({
      ...prev,
      verifikasi: prev.verifikasi === 'whatsapp' ? 'sms' : 'whatsapp'
    }));
    setTimer(60);
  };

  const handleResendOtp = async () => {
    if (timer > 0 || isSendingOtp) return;

    try {
      setIsSendingOtp(true);
      // TODO: Panggil API kirim ulang OTP di sini (misalnya await sendOtpAPI(formData.phone))
      console.log('Mengirim ulang OTP ke +62' + formData.phone);

      setTimer(60);
    } catch (err) {
      console.error('Gagal mengirim ulang OTP', err);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmitOtp = async () => {
    const kodeOtp = otp.join('');
    console.log('Submit OTP:', kodeOtp);

    const otpBenar = '123';

    if (kodeOtp === otpBenar) {
      try {
        setIsPageVerified(true);

        // Submit data setelah verifikasi
        const response = await dispatch(submitVerifikasi(otp));

        if (response.success) {
          console.log('Submit berhasil:', response.data);
          // Lanjutkan ke langkah berikutnya (tutup modal, redirect, dsb.)
        } else {
          console.error('Gagal submit:', response.error);
          showError('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
        }
        setOtpError('');
        setIsVerified(true);
        localStorage.setItem('isVerified', 'true');
      } catch (error) {
        console.error('Unexpected submit error:', error);
        showError('Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.');
      } finally {
      }
    } else {
      setOtpError('Kode OTP yang kamu masukkan salah. Coba lagi.');
    }
  };

  const resetState = () => {
    setOtp(['', '', '', '']);
    setTimer(60);
    setIsChangingMetode(true);
    setOtpError('');
    setIsVerified(false);
    setErrorMessage('');
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
    <Modals
      title="Verifikasi Nomor HP Kamu"
      show={show}
      onClose={() => {
        onClose();
        resetState();
      }}
      position="center"
      modalBody={
        isVerified ? (
          <div className="text-center my-5">
            <i className="fas fa-check-circle text-primary fs-1 mb-3" />
            <h5 className="text-primary mb-2">Verifikasi Berhasil</h5>
            <p className="small text-muted">Nomor HP kamu telah berhasil diverifikasi.</p>
          </div>
        ) : (
          <Fragment>
            <p className="mb-3 small">
              Masukkan kode OTP yang telah kami kirimkan melalui{' '}
              {formData?.verifikasi === 'whatsapp' ? 'WhatsApp' : 'SMS'} pada nomor{' '}
              <strong className="text-primary">+62{formData?.phone}</strong>
            </p>

            {/* OTP Inputs */}
            <div className="d-flex justify-content-center gap-3 my-4">
              {otp.map((val, idx) => (
                <input
                  ref={el => (inputRefs.current[idx] = el)}
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={e => handleOtpChange(e.target.value, idx)}
                  className="form-control text-center fs-4 fw-bold border-0 border-bottom border-2 rounded-0"
                  style={{ width: '48px', height: '48px' }}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                      inputRefs.current[idx - 1]?.focus();
                    }
                  }}
                />
              ))}
            </div>

            {otpError && <div className="text-danger text-center mt-2 small">{otpError}</div>}
            {errorMessage && (
              <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
            )}

            {/* Resend & Options */}
            <div className="text-center mt-4">
              <button
                disabled={timer > 0 || isSendingOtp}
                onClick={handleResendOtp}
                className="btn btn-link  text-primary fw-medium p-0"
              >
                {timer === 0 && !isSendingOtp && <i className="fas fa-arrow-rotate-right me-1" />}
                {isSendingOtp ? 'Mengirim ulang...' : 'Kirim ulang OTP'}
                {timer > 0 && <span> ({formatTimer()})</span>}
              </button>

              <p className="mt-2">
                {isChangingMetode && (
                  <Fragment>
                    <span
                      className="text-primary fw-medium cursor-pointer"
                      onClick={handleGantiMetode}
                    >
                      Kirim Via {formData?.verifikasi !== 'whatsapp' ? 'WhatsApp' : 'SMS'}
                    </span>{' '}
                    atau{' '}
                  </Fragment>
                )}

                <span
                  className="text-primary fw-medium cursor-pointer"
                  onClick={() => {
                    handleGantiNomor();
                    resetState();
                  }}
                >
                  Ganti Nomor HP
                </span>
              </p>
            </div>
          </Fragment>
        )
      }
      modalFooter={false}
    />
  );
};

export default Verifikasi;
