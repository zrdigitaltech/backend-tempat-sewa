import React from 'react';

const AuthorProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="d-flex align-items-center mb-4">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="rounded-circle me-3"
        width={80}
        height={80}
      />
      <div>
        <h2 className="fs-4 fw-bold mb-1">{profile.name}</h2>
        <p className="mb-1 text-muted">{profile.bio}</p>
        <div className="d-flex gap-3 flex-wrap">
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
      </div>
    </div>
  );
};

export default AuthorProfileCard;
