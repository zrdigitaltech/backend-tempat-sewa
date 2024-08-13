import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontakKami } from '@/redux/action/kontakKami/creator';
import { getListPembayaran } from '@/redux/action/pembayaran/creator';

export default function Index() {
  const [copySuccess, setCopySuccess] = useState('Salin No Rek!');

  const kontakKamiList = useSelector(state => state.kontakKami.kontakKamiList);
  const pembayaranList = useSelector(state => state.pembayaran.pembayaranList);
  const dispatch = useDispatch();

  const fetchKontakKami = async () => {
    dispatch(getListKontakKami());
  };

  const fetchPembayaran = async () => {
    dispatch(getListPembayaran());
  };

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Berhasil disalin!');
    } catch (err) {
      setCopySuccess('Gagal menyalin!');
    }
  };

  const mouseOut = async () => {
    setCopySuccess('Salin No Rek!');
  };

  useEffect(() => {
    fetchKontakKami();
    fetchPembayaran();
  }, []);

  return (
    <section id="contactus" className="contactus">
      <div className="container">
        <div className="section-title">
          <h2>
            Hubungi Kami<span className="title-border-white"></span>
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12" data-aos="slide-right" data-aos-delay="0">
            <div className="contact-form">
              <div className="row">
                <div className="col-md-12">
                  <div className="">
                    <p>
                      <i className="fa fa-home text-theme"></i> {kontakKamiList?.alamat}
                    </p>
                    {/* <p>
                                            <i className="fa fa-phone text-theme"></i>{" "}
                                            <a
                                                href={`tel:${kontakKamiList?.no_telp}`}
                                            >
                                                {kontakKamiList?.no_telp}
                                            </a>{" "}
                                        </p> */}
                    <p>
                      <i className="fa fa-whatsapp text-theme"></i>{' '}
                      <a href={kontakKamiList?.link_no_wa} target="_blank">
                        {kontakKamiList?.no_wa}
                      </a>{' '}
                    </p>
                    <hr />
                    <div className="single-section">
                      <h4 className="text-theme">Pembayaran :</h4>
                      <ul>
                        {pembayaranList?.map((item, x) => (
                          <li key={item?.id || x}>
                            <img src={item?.image} width={150} />
                            <br />
                            No Rek : <b className="text-theme">{item?.no_rek}</b> {' a/n '}
                            {item?.nama_rek}{' '}
                            <b
                              onClick={() => copyToClipBoard(item?.no_rek)}
                              onMouseOut={mouseOut}
                              className="text-theme cursor-pointer"
                            >
                              {copySuccess}
                            </b>
                          </li>
                        ))}
                        <li>
                          <span>
                            Setelah pembayaran,{' '}
                            <b className="text-theme">
                              Silahkan Konfirmasi Ke{' '}
                              <a
                                href={kontakKamiList?.link_konfirmasi_wa}
                                target="_blank"
                                className="text-theme"
                              >
                                {kontakKamiList?.no_wa}
                              </a>
                            </b>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12" data-aos="slide-left" data-aos-delay="0">
            <div className="google-map">
              <iframe
                src={kontakKamiList?.embed_google_map}
                allowFullScreen
                loading="lazy"
              ></iframe>
              {/* <div className="map-content">
                                <ul>
                                    <li>
                                        <i className="fa fa-home"></i>
                                        {kontakKamiList?.alamat}
                                    </li>
                                    <li>
                                        <i className="fa fa-clock-o"></i>
                                        {kontakKamiList?.jam_kerja}
                                    </li>
                                    <li>
                                        <i className="fa fa-phone"></i>
                                        <a
                                            href={`tel:${kontakKamiList?.no_telp}`}
                                        >
                                            {kontakKamiList?.no_telp}
                                        </a>{" "}
                                    </li>
                                    <li>
                                        <i className="fa fa-whatsapp"></i>
                                        <a
                                            href={`https://wa.me/${kontakKamiList?.link_no_wa}/?text=Hi%2C%20Saya%20memerlukan%20bantuan%20untuk%20pemeliharaan%20listrik%20MekanikElektro.com`}
                                            target="_blank"
                                        >
                                            {kontakKamiList?.no_wa}
                                        </a>{" "}
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope"></i>
                                        <a
                                            href={`mailto:${kontakKamiList?.email}`}
                                        >
                                            {kontakKamiList?.email}
                                        </a>
                                        ,
                                    </li>
                                </ul>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
