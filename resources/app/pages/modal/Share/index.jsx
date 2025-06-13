import React, { Fragment, useRef } from 'react';
import { UseModals } from '@/app/components';
import * as bootstrap from 'bootstrap';

const Index = props => {
  const { show, onClose, data } = props;
  const slug = data?.slug?.includes('pemilik') ? data?.slug : (`properti/${data?.slug}` ?? '');
  const nama = data?.nama ?? '';
  const domain = typeof window !== 'undefined' ? window.location.origin : '';

  const copyBtnRef = useRef(null);
  const tooltipRef = useRef(null);

  const url = `${domain}/${slug}`;
  const shareLinks = {
    copylink: url,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Cek properti menarik di tempatSEWA.Com: ${nama} - ${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Cek properti menarik di tempatSEWA.Com: ${nama} - ${url}`)}`
  };

  const handleShare = platform => {
    if (platform === 'copylink') {
      navigator.clipboard
        .writeText(shareLinks[platform])
        .then(() => {
          if (copyBtnRef.current) {
            copyBtnRef.current.setAttribute('title', 'Tautan disalin!');

            if (tooltipRef.current) {
              tooltipRef.current.dispose();
              tooltipRef.current = null;
            }

            tooltipRef.current = new bootstrap.Tooltip(copyBtnRef.current);
            tooltipRef.current.show();

            setTimeout(() => {
              if (tooltipRef.current) {
                tooltipRef.current.hide();
                tooltipRef.current.dispose();
                tooltipRef.current = null;
              }

              copyBtnRef.current.removeAttribute('title');
            }, 1000);
          }
        })
        .catch(err => console.error('Gagal menyalin tautan:', err));
    } else {
      window.open(shareLinks[platform], '_blank', 'noopener');
    }
  };

  const socialIcons = [
    { platform: 'copylink', text: 'Copy Link' },
    { platform: 'whatsapp', text: 'WhatsApp' },
    { platform: 'facebook', text: 'Facebook' },
    { platform: 'x', text: 'X (Twitter)' }
  ];

  if (!data || !data.slug) return null;

  return (
    <UseModals
      title="Bagikan"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="row">
            {socialIcons.map((item, idx) => (
              <div className="col-6 mb-2" key={idx}>
                <a
                  ref={item.platform === 'copylink' ? copyBtnRef : null}
                  onClick={() => handleShare(item.platform)}
                  className={`btn w-100 d-flex align-items-center ${
                    item.platform === 'whatsapp'
                      ? 'btn-outline-success'
                      : item.platform === 'x' || item.platform === 'copylink'
                        ? 'btn-outline-dark'
                        : 'btn-outline-primary'
                  }`}
                  data-bs-toggle={item.platform === 'copylink' ? 'tooltip' : null}
                  data-bs-placement="top"
                >
                  {item.platform === 'copylink' && <i className="fa-solid fa-copy"></i>}
                  {item.platform === 'whatsapp' && <i className="fa-brands fa-whatsapp"></i>}
                  {item.platform === 'facebook' && <i className="fa-brands fa-facebook"></i>}
                  {item.platform === 'x' && <i className="fa-brands fa-twitter"></i>}
                  <span className="ps-1">{item.text}</span>
                </a>
              </div>
            ))}
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Index;
