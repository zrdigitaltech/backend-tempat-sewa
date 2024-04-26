import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListKontrakan } from '@/redux/action/kontrakan/creator';

import { Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the Carousel CSS

import { useParams } from 'react-router-dom';

import { formatPrice } from '@/helpers';

import RouteLoading from '@/components/RouteLoading';
import NotFound from '@/pages/404';

import Heads from '@/components/Heads';
import Header from '@/components/Header';

const Index = () => {
  const { slug } = useParams();

  const kontrakanList = useSelector(state => state.kontrakan.kontrakanList);
  const dispatch = useDispatch();

  const [kontrakanDetail, setKontrakanDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKontrakanDetails = async () => {
      setIsLoading(true);
      await dispatch(getListKontrakan());
    };

    fetchKontrakanDetails();
  }, [dispatch]);

  useEffect(() => {
    if (kontrakanList?.length > 0) {
      const findSlug = kontrakanList?.find(item => item?.slug === slug);
      if (findSlug) {
        setKontrakanDetail(findSlug);
      }
      setIsLoading(false);
    }
  }, [kontrakanList, slug]);

  return (
    <Fragment>
      <Heads
        title={kontrakanDetail?.nama}
        deskripsi={kontrakanDetail?.deskripsi}
        image={kontrakanDetail?.image?.[0]}
      />
      {isLoading ? (
        <RouteLoading />
      ) : !kontrakanDetail ? (
        <NotFound />
      ) : (
        <Fragment>
          <Header title={kontrakanDetail?.nama} />
          <section id="services" className="services">
            <div className="container mt-3">
              <div className="d-flex justify-content-center row">
                <div className="col-sm-12 col-md-12" data-aos="fade-up" data-aos-delay="0">
                  <Carousel
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showIndicators={false}
                    swipeable={true}
                    emulateTouch={true}
                    interval={3000}
                  >
                    {kontrakanDetail?.image?.map((item, idx) => (
                      <div key={item?.id || idx}>
                        {item?.image ? (
                          <img
                            src={
                              item?.image.includes('assets')
                                ? item?.image
                                : '/storage/' + item?.image
                            }
                            alt={kontrakanDetail?.nama}
                          />
                        ) : (
                          <img
                            src="/assets/images/kontrakan-black.webp"
                            alt={kontrakanDetail?.nama}
                          />
                        )}
                        {/* <p className="legend">Legend 1</p> */}
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <div className="d-flex justify-content-center">
                  <div>
                    <h3>{kontrakanDetail?.nama}</h3>
                  </div>
                </div>
                <div className="d-flex justify-content-center text-center">
                  <p className="mb-0">
                    <b>
                      Rp{' '}
                      {formatPrice(
                        parseInt(
                          kontrakanDetail?.harga_sewa?.find(price => price.durasi === '1')?.harga
                        )
                      ) || 'N/A'}
                    </b>
                    <br />
                    <b>(Bulan pertama)</b>
                  </p>
                </div>
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <div className="d-flex justify-content-center mt-3 row">
                  <div className="col-sm-12 col-md-12">
                    <div className="single-content-informasi">Deskripsi</div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 row">
                  <div className="col-sm-12 col-md-12">
                    <div
                      className="single-deskripsi"
                      dangerouslySetInnerHTML={{ __html: kontrakanDetail?.deskripsi }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Index;
