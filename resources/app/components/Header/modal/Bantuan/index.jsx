import React, { Fragment, useState } from 'react';
import Modals from '@/app/components/Modals';
import { KonsultasiModal, BeriSaranModal } from '@/app/pages/modal';

const Index = props => {
  const { show, onClose, setShowBantuan } = props;
  const [showKonsultasi, setShowKonsultasi] = useState(false);
  const [showBeriSaran, setShowBeriSaran] = useState(false);

  return (
    <Fragment>
      <Modals
        title="Bantuan"
        show={show}
        onClose={onClose}
        position="center"
        classModalBody="p-0"
        modalBody={
          <div className="py-2">
            {/* Carikan Properti */}
            <div
              className="d-flex align-items-center gap-3 p-3 mx-3 mt-3 rounded-3 shadow-sm bg-white"
              role="button"
              onClick={() => {
                setShowKonsultasi(true);
                onClose();
              }}
            >
              <div
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                <i className="fa-solid fa-house-circle-check fs-4 text-primary"></i>
              </div>
              <div>
                <div className="fw-semibold text-dark">Carikan Properti</div>
                <div className="text-muted small">
                  Kami siap bantu temukan properti sesuai kebutuhanmu
                </div>
              </div>
            </div>

            {/* Beri Saran */}
            <div
              className="d-flex align-items-center gap-3 p-3 mx-3 mt-3 rounded-3 shadow-sm bg-white"
              role="button"
              onClick={() => {
                setShowBeriSaran(true);
                onClose();
              }}
            >
              <div
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                <i className="fa-solid fa-comment-dots fs-4 text-info"></i>
              </div>
              <div>
                <div className="fw-semibold text-dark">Beri Saran</div>
                <div className="text-muted small">
                  Bantu kami untuk melayani kamu lebih baik lagi
                </div>
              </div>
            </div>
          </div>
        }
      />

      <KonsultasiModal
        show={showKonsultasi}
        onClose={() => (setShowKonsultasi(false), setShowBantuan(true))}
      />
      <BeriSaranModal
        show={showBeriSaran}
        onClose={() => (setShowBeriSaran(false), setShowBantuan(true))}
      />
    </Fragment>
  );
};

export default Index;
