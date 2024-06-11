import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListCallToAction } from '@/redux/action/callToAction/creator';

export default function Index() {
  const callToActionList = useSelector((state) => state.callToAction.callToActionList);
  const dispatch = useDispatch();

  const fetchCallToActionList = async () => {
    dispatch(getListCallToAction());
  };

  useEffect(() => {
    fetchCallToActionList();
  }, []);

  return (
    <div className="call-to-action">
      <div className="container">
        <div className="row">
          <div className="col-sm-9" data-aos="slide-right" data-aos-delay="0">
            <h3>{callToActionList?.title}</h3>
            <span className="text-white">{callToActionList?.subtitle}</span>
          </div>
          <div className="col-sm-3" data-aos="slide-left" data-aos-delay="0">
            {' '}
            <a
              className="btn-one pull-right smoth-scroll"
              href={callToActionList?.link_wa}
              target="_blank"
            >
              Whatsapp Kami
            </a>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
