import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListAreaLayanan } from "@/redux/action/areaLayanan/creator";
import { getListNumberLayanan } from "@/redux/action/numberLayanan/creator";

export default function Index() {
    const numberLayananList = useSelector(
        (state) => state.numberLayanan.numberLayananList
    );
    const areaLayananList = useSelector(
        (state) => state.areaLayanan.areaLayananList
    );
    const dispatch = useDispatch();

    const fetchNumberLayanan = async () => {
        dispatch(getListNumberLayanan());
    };

    const fetchAreaLayanan = async () => {
        dispatch(getListAreaLayanan());
    };

    useEffect(() => {
        fetchNumberLayanan();
        fetchAreaLayanan();
    }, []);

    return (
        <section className="numbering-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="number-services">
                            <h3 data-aos="slide-right" data-aos-delay="0">
                                <span className="size">
                                    {numberLayananList?.tahun_pengalaman}
                                </span>
                                <span className="total-text">
                                    <span className="text">Tahun Lebih</span>
                                    <span className="big-text">Pengalaman</span>
                                </span>
                            </h3>
                            <p
                                className="line"
                                data-aos="slide-right"
                                data-aos-delay="0"
                            >
                                {numberLayananList?.description_pengalaman}
                            </p>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div
                                        className="single-section"
                                        data-aos="flip-right"
                                        data-aos-delay="0"
                                    >
                                        <i
                                            className="fa fa-certificate"
                                            aria-hidden="true"
                                        ></i>
                                        <h3>Sertifikasi</h3>
                                        <p>
                                            {
                                                numberLayananList?.certification_description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div
                                        className="single-section"
                                        data-aos="flip-right"
                                        data-aos-delay="0"
                                    >
                                        <i
                                            className="fa fa-clock-o"
                                            aria-hidden="true"
                                        ></i>
                                        <h3>24/7 Layanan</h3>
                                        <p>
                                            {
                                                numberLayananList?.operasional_description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div
                                        className="single-section"
                                        data-aos="flip-right"
                                        data-aos-delay="0"
                                    >
                                        <i
                                            className="fa fa-money"
                                            aria-hidden="true"
                                        ></i>
                                        <h3>
                                            Harga{" "}
                                            <span className="text-responsive">
                                                Terjangkau
                                            </span>
                                        </h3>
                                        <p>
                                            {
                                                numberLayananList?.harga_wajar_description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="section-title">
                                    <h3>Area Layanan</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {areaLayananList?.slice(0, 3).map((item, x) => (
                                <div className="col-sm-4" key={item?.id || x}>
                                    <div
                                        className="counter"
                                        data-aos="flip-right"
                                        data-aos-delay="0"
                                    >
                                        <div className="icon">
                                            <span className="lnr lnr-location"></span>
                                        </div>
                                        <div
                                            className="number animateNumber"
                                            data-num=""
                                        >
                                            {" "}
                                            <span>{item?.title}</span>
                                        </div>
                                        {/* <p>Workers Employed</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center row">
                            {areaLayananList?.slice(3, 5).map((item, x) => (
                                <div className="col-sm-4" key={item?.id || x}>
                                    <div
                                        className="counter"
                                        data-aos="flip-right"
                                        data-aos-delay="0"
                                    >
                                        <div className="icon">
                                            <span className="lnr lnr-location"></span>
                                        </div>
                                        <div
                                            className="number animateNumber"
                                            data-num="99"
                                        >
                                            {" "}
                                            <span>{item?.title}</span>
                                        </div>
                                        {/* <p>Awards Won</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
