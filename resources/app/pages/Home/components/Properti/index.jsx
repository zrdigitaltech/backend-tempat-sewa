import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import { GridView } from '@/app/components/PropertiCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { HubungiPengiklanPropertiModal } from '@/app/pages/modal';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isPageVerified, setIsPageVerified] = useState(false);

  // Modal states
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [dataItem, setDataItem] = useState(null);

  const fetchKontrakan = async () => {
    setIsLoading(true);
    await dispatch(getListKontrakan());
    setIsLoading(false);

    // Scroll ke atas setelah data termuat
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  const handleGoToWhatsApp = no_whatsapp => {
    if (!no_whatsapp) {
      alert('Nomor WhatsApp tidak tersedia.');
      return;
    }
    // Ganti dengan real redirect jika perlu
    alert(`Redirect langsung ke WhatsApp ${no_whatsapp}`);
  };

  return (
    <Fragment>
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-semibold mb-4">Properti Terbaru</h2>
          <div className="row g-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="col-6 col-sm-6 col-lg-4 col-xl-3">
                    <Skeleton height={200} />
                    <Skeleton count={2} />
                  </div>
                ))
              : kontrakanList?.slice(0, 8).map((item, index) => (
                  <div key={index} className="col-6 col-sm-6 col-lg-4 col-xl-3">
                    <GridView
                      {...item}
                      showKategori
                      showInterior
                      handlePhone={() => {
                        setShowWhatsApp(true);
                        setDataItem(item);
                      }}
                      handleWhatsApp={() =>
                        isPageVerified
                          ? handleGoToWhatsApp(item?.no_whatsapp)
                          : (setShowWhatsApp(true), setDataItem(item))
                      }
                    />
                  </div>
                ))}

            {/* Tombol "Lihat Semua" */}
            {!isLoading && kontrakanList?.length > 8 && (
              <div className="col-12 text-center mt-4">
                <a
                  className="btn btn-warning fw-semibold rounded-3 px-5"
                  href="/search?keyword=&viewMode=list"
                  target="_blank"
                >
                  Lihat Semua
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal WhatsApp */}
      <HubungiPengiklanPropertiModal
        show={showWhatsApp}
        setShowWhatsApp={setShowWhatsApp}
        onClose={() => {
          setShowWhatsApp(false);
        }}
        isPageVerified={isPageVerified}
        setIsPageVerified={setIsPageVerified}
        handleGoWhatsApp={() => handleGoToWhatsApp(dataItem?.no_whatsapp)}
        dataItem={dataItem}
        setDataItem={setDataItem}
      />
    </Fragment>
  );
}
