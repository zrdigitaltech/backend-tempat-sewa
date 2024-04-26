import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListHubungiKami } from '@/redux/action/hubungiKami/creator';
import { getListPembayaran } from '@/redux/action/pembayaran/creator';

export default function Index() {
  const [copySuccess, setCopySuccess] = useState('Salin No Rek!');

  const hubungiKamiList = useSelector(state => state.hubungiKami.hubungiKamiList);
  const pembayaranList = useSelector(state => state.pembayaran.pembayaranList);
  const dispatch = useDispatch();

  const fetchHubungiKami = async () => {
    dispatch(getListHubungiKami());
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
    fetchHubungiKami();
    fetchPembayaran();
  }, []);

  return (
    <section id="contactus" className="contactus">
      <div className="container">
        <div className="section-title" data-aos="fade-up" data-aos-delay="0">
          <h2>
            Hubungi Kami<span className="title-border-white"></span>
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="contact-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row">
                <div className="col-md-12">
                  <div className="">
                    <p>
                      <i className="fa fa-home text-theme"></i> {hubungiKamiList?.alamat}
                    </p>
                    {/* <p>
                                            <i className="fa fa-phone text-theme"></i>{" "}
                                            <a
                                                href={`tel:${hubungiKamiList?.no_telp}`}
                                            >
                                                {hubungiKamiList?.no_telp}
                                            </a>{" "}
                                        </p> */}
                    <p>
                      <i className="fa fa-whatsapp text-theme"></i>{' '}
                      <a href={hubungiKamiList?.link_no_wa} target="_blank">
                        {hubungiKamiList?.no_wa}
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
                                href={hubungiKamiList?.link_konfirmasi_wa}
                                target="_blank"
                                className="text-theme"
                              >
                                {hubungiKamiList?.no_wa}
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
          <div className="col-md-6 col-sm-12">
            <div className="google-map w-100" data-aos="fade-up" data-aos-delay="400">
              <iframe
                src={hubungiKamiList?.embed_google_map}
                allowFullScreen
                loading="lazy"
              ></iframe>
              {/* <div className="map-content">
                                <ul>
                                    <li>
                                        <i className="fa fa-home"></i>
                                        {hubungiKamiList?.alamat}
                                    </li>
                                    <li>
                                        <i className="fa fa-clock-o"></i>
                                        {hubungiKamiList?.jam_kerja}
                                    </li>
                                    <li>
                                        <i className="fa fa-phone"></i>
                                        <a
                                            href={`tel:${hubungiKamiList?.no_telp}`}
                                        >
                                            {hubungiKamiList?.no_telp}
                                        </a>{" "}
                                    </li>
                                    <li>
                                        <i className="fa fa-whatsapp"></i>
                                        <a
                                            href={`https://wa.me/${hubungiKamiList?.link_no_wa}/?text=Hi%2C%20Saya%20memerlukan%20bantuan%20untuk%20pemeliharaan%20listrik%20MekanikElektro.com`}
                                            target="_blank"
                                        >
                                            {hubungiKamiList?.no_wa}
                                        </a>{" "}
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope"></i>
                                        <a
                                            href={`mailto:${hubungiKamiList?.email}`}
                                        >
                                            {hubungiKamiList?.email}
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
