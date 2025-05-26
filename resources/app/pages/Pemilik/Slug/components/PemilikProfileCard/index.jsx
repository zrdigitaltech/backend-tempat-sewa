import React from 'react';
import { formatPhone } from '@/app/helpers';

const PemilikProfileCard = props => {
  const { profile, handlePhone, handleWhatsApp, handleBagikan } = props;
  if (!profile) return null;

  return (
    <div className="align-items-center border border-primary-subtle d-flex mb-4 p-3 rounded">
      <div className=" me-3 text-center">
        <div className="position-relative">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="rounded-circle "
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
        <div className="badge bg-primary-subtle mt-2 text-primary round-1">
          <small>Pemilik Properti</small>
        </div>
      </div>
      <div>
        <div className="align-items-baseline d-flex">
          <h2 className="fs-4 fw-bold mb-1 text-capitalize">{profile.name}</h2>
          <small className="text-secondary ms-2">Terdaftar sejak 2018</small>
        </div>
        <p className="mb-1 text-muted">Alamat: xxxxx</p>
        <div className="d-flex gap-3 flex-wrap mb-3">
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
        <div className="d-flex gap-3 flex-wrap">
          <button
            className="btn btn-success d-flex align-items-center text-white pe-1"
            onClick={handleWhatsApp}
          >
            <i className="fa-brands fa-whatsapp pe-1" aria-hidden="true"></i> WhatsApp
          </button>
          <button className="btn btn-primary align-items-center d-sm-flex " onClick={handlePhone}>
            <i className="fa fa-phone pe-1" aria-hidden="true"></i>{' '}
            <span className="d-none d-sm-block">{formatPhone(profile.no_whatsapp)}</span>
          </button>
          <button className="bg-white border border-black btn" onClick={handleBagikan}>
            <i className="fa fa-share-alt"></i> Bagikan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PemilikProfileCard;
