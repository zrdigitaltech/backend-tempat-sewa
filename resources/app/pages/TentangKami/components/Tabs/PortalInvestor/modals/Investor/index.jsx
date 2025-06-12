import React, { Fragment, useState, useEffect } from 'react';
import Modals from '@/app/components/Modals';
import classNames from 'classnames';
import InvestorBerhasilModal from './InvestorBerhasil';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/app/redux/action/tipeProperti/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  capitalizeWords,
  formatUnderscore,
  formatPriceLocale,
  formatRupiah,
  unFormatRupiah,
  formatStrip,
  unFormatStrip
} from '@/app/helpers';

const Index = props => {
  const { show, onClose } = props;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    investasi_min: '',
    target_roi: '',
    tipe_properti: []
  });

  const [errors, setErrors] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const tipePropertiList = useSelector(state => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTipeProperti = async () => {
    setIsLoading(true);
    await dispatch(getListTipeProperti());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTipeProperti();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    // Jika investasi_min dan target_roi, pastikan input angka saja
    if (name === 'investasi_min') {
      const formatted = formatRupiah(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prevErrors => {
        const updated = { ...prevErrors };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleCheckboxChange = id => {
    const isSelected = selectedTypes.includes(id);
    let updatedSelection = [];
    if (isSelected) {
      updatedSelection = selectedTypes.filter(tid => tid !== id);
    } else {
      updatedSelection = [...selectedTypes, id];
    }
    setSelectedTypes(updatedSelection);
    setFormData(prev => ({ ...prev, tipe_properti: updatedSelection }));

    if (errors['tipe_properti']) {
      setErrors(prevErrors => {
        const updated = { ...prevErrors };
        delete updated['tipe_properti'];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const investasiMinNum = parseInt(formData.investasi_min, 10);
    const roiNum = parseFloat(formData.target_roi);

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

    if (!formData.investasi_min.trim()) {
      newErrors.investasi_min = 'Minimal investasi tidak boleh kosong';
    } else if (isNaN(investasiMinNum) || investasiMinNum <= 0) {
      newErrors.investasi_min = 'Minimal investasi harus angka positif';
    }

    if (!formData.target_roi.trim()) {
      newErrors.target_roi = 'Target ROI tidak boleh kosong';
    } else if (isNaN(roiNum) || roiNum <= 0) {
      newErrors.target_roi = 'Target ROI harus angka positif';
    }

    if (!formData.tipe_properti.length) {
      newErrors.tipe_properti = 'Pilih minimal satu tipe properti';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      investasi_min: '',
      target_roi: '',
      tipe_properti: []
    });
    setErrors({});
    setSelectedTypes([]);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        const bodyFormData = {
          name: formData.name,
          phone: formData.phone,
          investasi_min: parseInt(formData.investasi_min, 10),
          target_roi: parseFloat(formData.target_roi),
          tipe_properti: formData.tipe_properti
        };

        console.log('Form data valid:', bodyFormData);

        // Kirim ke server misal:
        // await fetch('/api/investasi', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(bodyFormData)
        // });

        onClose();
        setShowSuccess(true);
        clearForm();
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
        title="Formulir Investor Properti"
        show={show}
        onClose={() => {
          onClose();
          clearForm();
        }}
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

            <div className="input-group mb-3">
              <span className="bg-primary input-group-text text-white">+62</span>
              <input
                type="text"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Masukkan Nomor HP"
                name="phone"
                value={formData.phone}
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
              {errors.phone && <small className="invalid-feedback">{errors.phone}</small>}
            </div>

            <div className="input-group mb-3">
              <span className="bg-primary input-group-text text-white">Rp</span>
              <input
                type="text"
                className={`form-control ${errors.investasi_min ? 'is-invalid' : ''}`}
                placeholder="Minimal Investasi"
                name="investasi_min"
                value={formData.investasi_min}
                onChange={handleChange}
              />
              {errors.investasi_min && (
                <small className="invalid-feedback">{errors.investasi_min}</small>
              )}
            </div>

            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${errors.target_roi ? 'is-invalid' : ''}`}
                placeholder="Target ROI"
                name="target_roi"
                value={formData.target_roi}
                onChange={handleChange}
                onKeyPress={e => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <span className="bg-primary input-group-text text-white">%</span>
              {errors.target_roi && <small className="invalid-feedback">{errors.target_roi}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Pilih Jenis Properti<small className="text-danger">*</small>
              </label>
              <div className={`d-flex flex-wrap gap-2`}>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        height={38}
                        width={100}
                        className="rounded-pill"
                        style={{ marginRight: '0.5rem' }}
                      />
                    ))
                  : tipePropertiList.map(item => {
                      const isSelected = selectedTypes.includes(item.id);
                      return (
                        <div key={item.id}>
                          <input
                            type="checkbox"
                            className="btn-check"
                            id={`checkbox-${item.id}`}
                            autoComplete="off"
                            onChange={() => handleCheckboxChange(item.id)}
                            checked={isSelected}
                          />
                          <label
                            className={classNames('btn rounded-pill text-truncate', {
                              'btn-outline-primary': !isSelected,
                              'btn-primary': isSelected,
                              'text-dark': !isSelected
                            })}
                            htmlFor={`checkbox-${item.id}`}
                          >
                            {item.nama}
                          </label>
                        </div>
                      );
                    })}
              </div>
              {errors.tipe_properti && (
                <small className="text-danger w-100 mt-1">{errors.tipe_properti}</small>
              )}
            </div>
          </Fragment>
        }
        modalFooter={
          <Fragment>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Mengirim...' : 'Ajukan Investasi'}
            </button>
          </Fragment>
        }
      />

      {showSuccess && (
        <InvestorBerhasilModal
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          message="Terima kasih, permintaan investasi Anda sudah kami terima."
        />
      )}
    </Fragment>
  );
};

export default Index;
