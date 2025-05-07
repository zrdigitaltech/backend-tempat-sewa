import React, { Fragment, useState } from 'react';
import Modals from '@/app/components/Modals';

const Index = props => {
  const { formData, errors, handleChange } = props;

  return (
    <Fragment>
      <small className="mb-3">
        Untuk kelancaran komunikasi dengan pengiklan, kami perlu memastikan nama dan nomor telepon
        kamu terlebih dahulu
      </small>
      <div className="my-3">
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
          placeholder={`${formData.verifikasi === 'whatsapp' ? 'Nomor WhatsApp' : 'Nomor Telepon'}`}
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
      <div>
        <label for="exampleFormControlInput1" className="form-label">
          Verifikasi Nomor Via:
        </label>
      </div>
      <div className="mb-3">
        <div className="d-flex gap-2">
          <div>
            <input
              type="radio"
              className="btn-check"
              name="verifikasi"
              id="verifikasi-wa"
              value="whatsapp"
              checked={formData.verifikasi === 'whatsapp'}
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              className={`btn ${formData.verifikasi === 'whatsapp' ? 'btn-primary' : 'btn-outline-primary'}`}
              htmlFor="verifikasi-wa"
            >
              WhatsApp
            </label>
          </div>
          <div>
            <input
              type="radio"
              className="btn-check"
              name="verifikasi"
              id="verifikasi-sms"
              value="sms"
              checked={formData.verifikasi === 'sms'}
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              className={`btn ${formData.verifikasi === 'sms' ? 'btn-primary' : 'btn-outline-primary'}`}
              htmlFor="verifikasi-sms"
            >
              SMS
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
