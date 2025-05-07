import React, { Fragment, useState } from 'react';
import Modals from '@/app/components/Modals';
import classNames from 'classnames';
import BerhasilDiLaporkanModal from '@/app/pages/modal/LaporkanIklan/BerhasilDiLaporkan';

const Index = props => {
  const { show, onClose } = props;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    otherDetail: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedReason, setSelectedReason] = useState('');

  const [showBerhasilDiLaporkan, setShowBerhasilDiLaporkan] = useState(false);

  const reasons = [
    'Iklan Ganda',
    'Iklan tidak lagi tersedia',
    'Informasi yang salah',
    'Agen tidak responsif',
    'Iklan palsu',
    'Diskriminasi',
    'Lainnya'
  ];

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
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Nomor harus berupa angka';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.reason) {
      newErrors.reason = 'Silakan pilih salah satu alasan';
    }
    if (formData.reason === 'Lainnya' && !formData.otherDetail.trim()) {
      newErrors.otherDetail = 'Harap isi keterangan tambahan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      reason: '',
      otherDetail: ''
    });
    setErrors({});
    setSelectedReason('');
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form data valid:', formData);
      // Lakukan submit ke server di sini
      onClose();
      setShowBerhasilDiLaporkan(true);
    }
  };

  return (
    <Fragment>
      <Modals
        title="Laporkan Iklan"
        show={show}
        onClose={() => (onClose(), clearForm())}
        position="center"
        modalBody={
          <Fragment>
            <form>
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
                  placeholder="Masukkan Nomor"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyPress={e => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={15}
                />
                {errors.phone && <small className="invalid-feedback">{errors.phone}</small>}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Alamat Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                />
                {errors.email && <small className="invalid-feedback">{errors.email}</small>}
              </div>

              <h4 className="mt-4 mb-3 fw-semibold">
                Permasalahan apa yang kamu temukan pada iklan ini?
              </h4>

              <div
                className={`${selectedReason === 'Lainnya' ? 'mb-3' : ''} d-flex flex-wrap gap-2`}
              >
                {reasons.map((label, index) => {
                  const isSelected = selectedReason === label;
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="report_type"
                        id={`radio-${index}`}
                        autoComplete="off"
                        onChange={() => {
                          setSelectedReason(label);
                          setFormData(prev => ({ ...prev, reason: label }));
                        }}
                        checked={isSelected}
                      />
                      <label
                        className={classNames('btn rounded-pill', {
                          'btn-outline-primary': !isSelected,
                          'btn-primary': isSelected,
                          'text-dark': !isSelected
                        })}
                        htmlFor={`radio-${index}`}
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}
                {errors.reason && <small className="text-danger w-100 mt-1">{errors.reason}</small>}
              </div>

              {selectedReason === 'Lainnya' && (
                <div className="mb-3">
                  <textarea
                    className={`form-control ${errors.otherDetail ? 'is-invalid' : ''}`}
                    placeholder="Tambahkan Keterangan"
                    rows="3"
                    name="otherDetail"
                    value={formData.otherDetail}
                    onChange={handleChange}
                  />
                  {errors.otherDetail && (
                    <small className="invalid-feedback">{errors.otherDetail}</small>
                  )}
                </div>
              )}
            </form>
          </Fragment>
        }
        modalFooter={
          <Fragment>
            <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
              Laporkan
            </button>
          </Fragment>
        }
      />
      <BerhasilDiLaporkanModal
        show={showBerhasilDiLaporkan}
        onClose={() => setShowBerhasilDiLaporkan(false)}
      />
    </Fragment>
  );
};

export default Index;
