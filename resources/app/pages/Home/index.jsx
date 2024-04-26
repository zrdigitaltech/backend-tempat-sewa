import React, { Fragment, useEffect } from "react";

import Header from "@/components/Header";
import NumberingSectionStart from "@/components/NumberingSectionStart";
import TentangKami from "@/components/TentangKami";
import TimKami from "@/components/TimKami";
import Layanan from "@/components/Layanan";
import CallToAction from "@/components/CallToAction";
import Testimoni from "@/components/Testimoni";
import Galeri from "@/components/Galeri";
import KontakKami from "@/components/KontakKami";
import Footer from "@/components/Footer";

import { FloatingWhatsApp } from "react-floating-whatsapp";

import { useSelector, useDispatch } from "react-redux";
import { getListFloatingWhatsapp } from "@/redux/action/floatingWhatsapp/creator";

export default function Index() {
    const floatingWhatsAppList = useSelector(
        (state) => state.floatingWhatsapp.floatingWhatsappList
    );
    const dispatch = useDispatch();

    const fetchFloatingWhatsApp = async () => {
        dispatch(getListFloatingWhatsapp());
    };

    useEffect(() => {
        fetchFloatingWhatsApp();
        const loadScripts = async () => {
            // Memuat jQuery secara asinkron
            const jqueryScript = document.createElement("script");
            jqueryScript.src = "assets/jquery/jquery-3.1.1.min.js";
            jqueryScript.async = true;

            // Menunggu jQuery dimuat
            await new Promise((resolve, reject) => {
                jqueryScript.onload = resolve;
                jqueryScript.onerror = reject;
                document.body.appendChild(jqueryScript);
            });

            // Memuat skrip Bootstrap
            const bootstrapScript = document.createElement("script");
            bootstrapScript.src = "assets/bootstrap/js/bootstrap.min.js";
            bootstrapScript.async = true;

            // Menunggu Bootstrap dimuat
            await new Promise((resolve, reject) => {
                bootstrapScript.onload = resolve;
                bootstrapScript.onerror = reject;
                document.body.appendChild(bootstrapScript);
            });

            // Memuat skrip Owl Carousel
            const owlCarouselScript = document.createElement("script");
            owlCarouselScript.src = "assets/owl-carousel/js/owl.carousel.js";
            owlCarouselScript.async = true;

            // Menunggu Owl Carousel dimuat
            await new Promise((resolve, reject) => {
                owlCarouselScript.onload = resolve;
                owlCarouselScript.onerror = reject;
                document.body.appendChild(owlCarouselScript);
            });

            // Setelah semua skrip dimuat, memuat skrip lainnya
            const otherScripts = [
                "assets/easing/jquery.easing.min.js",
                "assets/jquery/jquery.animateNumber.min.js",
                "assets/jquery/plugins.js",
                "assets/js/custom.js",
            ];

            otherScripts.forEach((src) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                document.body.appendChild(script);
            });
        };

        loadScripts();

        // Membersihkan elemen script ketika komponen tidak lagi digunakan
        return () => {
            document.querySelectorAll("script").forEach((script) => {
                script.remove();
            });
        };
    }, []);

    return (
        <Fragment>
            <Header />
            <NumberingSectionStart />
            <TentangKami />
            {/* <TimKami /> */}
            <Layanan />
            <CallToAction />
            <Testimoni />
            {/* <Galeri /> */}
            <KontakKami />
            <Footer />

            <FloatingWhatsApp
                avatar={floatingWhatsAppList?.avatar}
                phoneNumber={floatingWhatsAppList?.phone_number}
                accountName={floatingWhatsAppList?.account_name}
                chatMessage={floatingWhatsAppList?.chat_message}
                statusMessage={floatingWhatsAppList?.status_message}
                darkMode={true}
                allowEsc={true}
                allowClickAway
                notification
                notificationDelay={60000} // 1 minute
                notificationSound
                styles={{
                    position: "fixed",
                    bottom: "15px",
                    height: "0px !important",
                }}
            />
        </Fragment>
    );
}
