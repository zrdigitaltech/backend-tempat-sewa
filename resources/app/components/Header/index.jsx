import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListLogos } from '@/redux/action/logos/creator';
import { getListBanners } from '@/redux/action/banners/creator';

export default function Index() {
  const logosList = useSelector(state => state.logos.logosList);
  const bannersList = useSelector(state => state.banners.bannersList);
  const dispatch = useDispatch();

  const fetchLogos = async () => {
    dispatch(getListLogos());
  };

  const fetchBannersList = async () => {
    dispatch(getListBanners());
  };

  useEffect(() => {
    fetchLogos();
    fetchBannersList();
  }, []);

  return (
    <header id="home" className="welcome-hero-area">
      <div className="header-top-area">
        <div className="container">
          {/* <!-- START MAIN MENU --> */}
          <nav className="navbar navbar-default">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                {' '}
                <span className="sr-only">Toggle navigation</span>{' '}
                <span className="icon-bar"></span> <span className="icon-bar"></span>{' '}
                <span className="icon-bar"></span>{' '}
              </button>
              <a className="navbar-brand" href="#home">
                <img src={logosList?.image} alt={logosList?.alt} />
              </a>
              {/* <!-- Logo --> */}
            </div>
            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <a className="smoth-scroll" href="#home">
                    Beranda
                  </a>
                </li>
                <li>
                  <a className="smoth-scroll" href="#aboutus">
                    Tentang Kami
                  </a>
                </li>
                {/* <li>
                                    <a className="smoth-scroll" href="#ourteam">
                                        Tim Kami
                                    </a>
                                </li> */}
                <li>
                  <a className="smoth-scroll" href="#services">
                    Layanan
                  </a>
                </li>
                <li>
                  <a className="smoth-scroll" href="#testimonials">
                    Testimoni
                  </a>
                </li>
                <li>
                  <a className="smoth-scroll" href="#ourgallery">
                    Galeri
                  </a>
                </li>
                <li>
                  <a className="smoth-scroll" href="#contactus">
                    Kontak Kami
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* <!-- END MAIN MENU --> */}
        </div>
      </div>
      {/* <!-- Start Slider Area --> */}
      <div className="home-slider-area">
        <div
          id="welcome-slide-carousel"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          {bannersList?.length > 1 && (
            <ol className="carousel-indicators">
              <li data-target="#welcome-slide-carousel" data-slide-to="0" className="active"></li>
              <li data-target="#welcome-slide-carousel" data-slide-to="1"></li>
              <li data-target="#welcome-slide-carousel" data-slide-to="2"></li>
            </ol>
          )}
          <div className="carousel-inner" role="listbox">
            {/* <!-- Start Single Slider Item --> */}
            {bannersList?.map((item, x) => (
              <div className={`item ${x === 0 ? 'active' : ''}`} key={item?.id || x}>
                <div
                  className={`single-slide-item slide-${x + 1}`}
                  style={{
                    backgroundImage: `url(${item?.image?.includes('assets') ? item?.image : 'storage/' + item?.image})`
                  }}
                >
                  <div className="single-slide-item-table">
                    <div className="single-slide-item-table-cell">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <h1
                              dangerouslySetInnerHTML={{
                                __html: item?.title
                              }}
                            ></h1>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item?.description
                              }}
                            ></p>
                            {item?.title_wa && item?.link_wa && (
                              <a
                                className="btn-one smoth-scroll"
                                href={item?.link_wa}
                                target="_blank"
                              >
                                {item?.title_wa}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <!-- End Single Slider Item--> */}
            {bannersList?.length > 1 && (
              <Fragment>
                <a
                  className="left welcome-control"
                  href="#welcome-slide-carousel"
                  role="button"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left"></i>
                </a>{' '}
                <a
                  className="right welcome-control"
                  href="#welcome-slide-carousel"
                  role="button"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right"></i>
                </a>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      {/* <!-- End Slider Area --> */}
    </header>
  );
}
