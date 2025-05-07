import React, { Fragment, useEffect } from 'react';
import Modals from '@/app/components/Modals';

const Index = props => {
  const { show, onClose, data } = props;
  const domain = typeof window !== 'undefined' ? window.location.origin : '';

  const shareLinks = {
    copylink: `${domain + '/properti/' + data?.slug}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Cek properti menarik di tempatSEWA.Com: ** - ${domain + '/properti/' + data?.slug}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${domain + '/properti/' + data?.slug}`)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Cek properti menarik di tempatSEWA.Com: ** - ${domain + '/properti/' + data?.slug}`)}`
  };

  const handleShare = platform => {
    if (platform === 'copylink') {
      navigator.clipboard
        .writeText(shareLinks[platform])
        .then(() => {
          alert('Tautan telah disalin ke clipboard!');
        })
        .catch(err => {
          console.error('Gagal menyalin tautan:', err);
        });
    } else {
      window.open(shareLinks[platform], '_blank', 'noopener');
    }
  };

  const socialIcons = [
    {
      platform: 'copylink',
      text: 'Copy Link'
    },
    {
      platform: 'whatsapp',
      text: 'WhatsApp'
    },
    {
      platform: 'facebook',
      text: 'Facebook'
    },
    {
      platform: 'x',
      text: 'X (Twitter)'
    }
  ];

  useEffect(() => {}, [data]);

  return (
    <Modals
      title="Bagikan Properti"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="row">
            {socialIcons.map((item, idx) => (
              <div className="col-6 mb-2" key={item ?? idx}>
                <a
                  onClick={() => handleShare(item?.platform)}
                  className={`btn w-100 d-flex align-items-center ${
                    item?.platform === 'whatsapp'
                      ? 'btn-outline-success'
                      : item?.platform === 'x' || item?.platform === 'copylink'
                        ? 'btn-outline-dark'
                        : 'btn-outline-primary'
                  }`}
                >
                  {/* {item?.icon} */}
                  {item?.platform === 'copylink' && <i className="fa-solid fa-copy"></i>}
                  {item?.platform === 'whatsapp' && <i className="fa-brands fa-whatsapp"></i>}
                  {item?.platform === 'facebook' && <i className="fa-brands fa-facebook"></i>}
                  {item?.platform === 'x' && <i className="fa-brands fa-twitter"></i>}
                  <span className="ps-1">{item?.text}</span>
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
