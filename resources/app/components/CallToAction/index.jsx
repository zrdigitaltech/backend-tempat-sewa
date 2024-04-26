import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListCallToAction } from "@/redux/action/callToAction/creator";

export default function Index() {
    const callToActionList = useSelector(
        (state) => state.callToAction.callToActionList
    );
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
                    <div
                        className="col-sm-9"
                        data-aos="slide-right"
                        data-aos-delay="0"
                    >
                        <h3>{callToActionList?.title}</h3>
                    </div>
                    <div
                        className="col-sm-3"
                        data-aos="slide-left"
                        data-aos-delay="0"
                    >
                        {" "}
                        <a
                            className="btn-one pull-right smoth-scroll"
                            href={`https://wa.me/${callToActionList?.no_wa}/?text=Hi%2C%20Saya%20memerlukan%20bantuan%20untuk%20pemeliharaan%20listrik%20MekanikListrik.com`}
                            target="_blank"
                        >
                            Whatsapp Kami
                        </a>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}
