import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/app/redux/action/kontrakan/creator';

import { GridView } from '@/app/components/PropertiCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Modals
import WhatsAppModal from '@/app/pages/modal/WhatsApp';

export default function Index() {
  const kontrakanList = useSelector(state => state?.kontrakan?.kontrakanList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // UI State
  const [isPageVerified, setIsPageVerified] = useState(false);

  // Modal States
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [dataItem, setDataItem] = useState(null);

  const fetchKontrakan = async () => {
    setIsLoading(true);
    await dispatch(getListKontrakan());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchKontrakan();
  }, []);

  const handleGoToWhatsApp = no_whatsapp => {
    if (!no_whatsapp) {
      alert('Nomor WhatsApp tidak tersedia.');
      return;
    }

    alert(`Redirect langsung ke whatsapp ${no_whatsapp}`);
  };

  return (
    <Fragment>
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-semibold mb-4">Properti Terbaru</h2>
          <div className="row g-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <Skeleton height={200} />
                    <Skeleton count={2} />
                  </div>
                ))
              : kontrakanList?.map((item, index) => (
                  <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <GridView
                      {...item}
                      newTab={true}
                      showKategori={true}
                      showInterior={true}
                      handlePhone={() => (setShowWhatsApp(true), setDataItem(item))}
                      handleWhatsApp={() =>
                        isPageVerified
                          ? handleGoToWhatsApp(item?.no_whatsapp)
                          : setShowWhatsApp(true)
                      }
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>
      <WhatsAppModal
        show={showWhatsApp}
        setShowWhatsApp={setShowWhatsApp}
        onClose={() => (setShowWhatsApp(false), setDataItem(null))}
        isPageVerified={isPageVerified}
        setIsPageVerified={setIsPageVerified}
        handleGoWhatsApp={() => handleGoToWhatsApp(dataItem?.no_whatsapp)}
        dataItem={dataItem}
      />
    </Fragment>
  );
}
