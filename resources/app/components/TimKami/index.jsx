import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTimKami } from '@/redux/action/timKami/creator';

export default function Index() {
  const timKamiList = useSelector(state => state.timKami.timKamiList);
  const dispatch = useDispatch();

  const fetchTimKami = async () => {
    dispatch(getListTimKami());
  };

  useEffect(() => {
    fetchTimKami();
  }, []);

  return (
    <section id="ourteam" className="ourteam">
      <div className="container">
        <div className="section-title">
          <h2>
            Tim Kami <span className="title-border-white"></span>
          </h2>
        </div>
      </div>
      <div className="container">
        <div id="our-team" className="owl-carousel owl-theme">
          {timKamiList?.map((item, x) => (
            <div
              className="item"
              key={item?.id || x}
              data-aos="flip-up"
              data-aos-delay={x + 1 + '00'}
            >
              <div className="corporate-team">
                <div className="team-member wow fadeIn" data-wow-delay=".2s">
                  <div className="overlay text-center">
                    <div className="overlay-main">
                      <div className="table-cell">
                        <div className="team-icon-grid">
                          <div className="team-icon text-center">
                            <ul className="team-social">
                              {item?.link_fb && (
                                <li>
                                  <a href={item?.fb} target="_blank">
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                  </a>
                                </li>
                              )}
                              {item?.link_twitter && (
                                <li>
                                  <a href={item?.link_twitter} target="_blank">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                  </a>
                                </li>
                              )}
                              {item?.link_ig && (
                                <li>
                                  <a href={item?.link_ig} target="_blank">
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                          {/* <!-- end team-icon  --> */}
                        </div>
                        {/* <!-- end team-icon-grid  --> */}
                      </div>
                      {/* <!-- end table-cell  --> */}
                    </div>
                    {/* <!-- end overlay-main  --> */}
                  </div>
                  {/* <!-- end overlay  --> */}
                  <img src={item?.image} alt={item?.alt} className="team-img" />
                </div>
                {/* <!-- end team-member  --> */}
                <div className="team-details">
                  <h3>{item?.name}</h3>
                  <h4>{item?.position}</h4>
                </div>
                {/* <!-- end team-details  --> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
