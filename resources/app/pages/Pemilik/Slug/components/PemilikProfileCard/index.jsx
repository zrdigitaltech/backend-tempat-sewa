import React from 'react';
import { formatPhone } from '@/app/helpers';

const PemilikProfileCard = ({ profile, handlePhone, handleWhatsApp, handleBagikan }) => {
  if (!profile) return null;

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start border border-primary-subtle rounded p-3 mb-4 gap-3">
      {/* Avatar & Badge */}
      <div className="text-center">
        <div className="position-relative mb-2">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="rounded-circle"
            width={112}
            height={112}
          />
          <i
            className="fa fa-check-circle text-primary"
            style={{
              position: 'absolute',
              bottom: 0,
              right: '8px',
              background: 'white',
              borderRadius: '50%',
              fontSize: '30px'
            }}
          ></i>
        </div>
        <div className="badge bg-primary-subtle text-primary rounded-pill">
          <small>Pemilik Properti</small>
        </div>
      </div>

      {/* Profile Content */}
      <div className="w-100 text-center text-sm-start">
        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-baseline mb-2 gap-2">
          <h2 className="fs-4 fw-bold text-capitalize mb-0">{profile.name}</h2>
          <small className="text-secondary">Terdaftar sejak 2018</small>
        </div>
        <p className="text-muted mb-2">Alamat: xxxxx</p>

        {/* Social Links */}
        <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 mb-3">
          {profile.socials?.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <i className="fa-brands fa-instagram me-1"></i> Instagram
            </a>
          )}
          {profile.socials?.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <i className="fa-brands fa-linkedin me-1"></i> LinkedIn
            </a>
          )}
          {profile.socials?.facebook && (
            <a
              href={profile.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <i className="fa-brands fa-facebook me-1"></i> Facebook
            </a>
          )}
          {profile.socials?.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <i className="fa-brands fa-x-twitter me-1"></i> Twitter
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div
          id="actionButtons"
          className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2"
        >
          <button
            className="btn btn-success text-white d-flex align-items-center"
            onClick={handleWhatsApp}
          >
            <i className="fa-brands fa-whatsapp me-1" aria-hidden="true"></i> WhatsApp
          </button>
          <button className="btn btn-primary d-flex align-items-center" onClick={handlePhone}>
            <i className="fa fa-phone me-1" aria-hidden="true"></i>
            <span className="d-none d-sm-inline">{formatPhone(profile.no_whatsapp)}</span>
            <span className="d-inline d-sm-none">Telepon</span>
          </button>
          <button
            className="btn border border-black bg-white d-flex align-items-center"
            onClick={handleBagikan}
          >
            <i className="fa fa-share-alt me-1"></i> Bagikan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PemilikProfileCard;
