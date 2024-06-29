import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTentangKami } from '@/redux/action/tentangKami/creator';
import { getListLayanan } from '@/redux/action/layanan/creator';

export default function Index() {
  const tentangKamiList = useSelector(state => state.tentangKami.tentangKamiList);
  const layananList = useSelector(state => state.layanan.layananList);
  const dispatch = useDispatch();

  const fetchTentangKami = async () => {
    dispatch(getListTentangKami());
  };

  const fetchLayananList = async () => {
    dispatch(getListLayanan());
  };

  useEffect(() => {
    fetchTentangKami();
    fetchLayananList();
  }, []);

  return (
    <section id="aboutus" className="aboutus angle">
      <div className="container">
        <div className="section-title">
          <h2>Tentang Kami</h2>
          <span className="title-border-white"></span>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6" data-aos="slide-right" data-aos-delay="0">
            <div className="about-img">
              <img src={tentangKamiList?.image?.includes('assets') ? tentangKamiList?.image : 'storage/' + tentangKamiList?.image} alt={tentangKamiList?.alt} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="about-text">
              <p
                dangerouslySetInnerHTML={{
                  __html: tentangKamiList?.description
                }}
                data-aos="slide-left"
                data-aos-delay="0"
                className="mb-0"
              ></p>
              <ul className="about-list hidden-sm about-list-services">
                {layananList?.map((item, x) => (
                  <li
                    key={item?.id || x}
                    className="nav navbar-nav"
                    data-aos="flip-right"
                    data-aos-delay="0"
                  >
                    <a href="#services" className="smoth-scroll">
                      {item?.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
