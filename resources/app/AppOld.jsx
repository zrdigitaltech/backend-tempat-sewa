import React, { Fragment, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import HubungiKami from '@/app/components/HubungiKami';
import Footer from '@/app/components/Footer';

import { FloatingWhatsApp } from 'react-floating-whatsapp';

import { useSelector, useDispatch } from 'react-redux';
import { getListFloatingWhatsapp } from '@/app/redux/action/floatingWhatsapp/creator';

import FloatingPengaduan from '@/app/components/FloatingPengaduan';

function App() {
  const floatingWhatsappList = useSelector(state => state.floatingWhatsapp.floatingWhatsappList);
  const dispatch = useDispatch();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchFloatingWhatsapp = async () => {
    dispatch(getListFloatingWhatsapp());
  };

  useEffect(() => {
    AOS.init();
    fetchFloatingWhatsapp();
    const loadScripts = async () => {
      // Memuat jQuery secara asinkron
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'assets/jquery/jquery-3.1.1.min.js';
      jqueryScript.async = true;

      // Menunggu jQuery dimuat
      await new Promise((resolve, reject) => {
        jqueryScript.onload = resolve;
        jqueryScript.onerror = reject;
        document.body.appendChild(jqueryScript);
      });

      // Memuat skrip Bootstrap
      const bootstrapScript = document.createElement('script');
      bootstrapScript.src = 'assets/bootstrap/js/bootstrap.min.js';
      bootstrapScript.async = true;

      // Menunggu Bootstrap dimuat
      await new Promise((resolve, reject) => {
        bootstrapScript.onload = resolve;
        bootstrapScript.onerror = reject;
        document.body.appendChild(bootstrapScript);
      });

      // // Memuat skrip Owl Carousel
      // const owlCarouselScript = document.createElement('script');
      // owlCarouselScript.src = 'assets/owl-carousel/js/owl.carousel.js';
      // owlCarouselScript.async = true;

      // // Menunggu Owl Carousel dimuat
      // await new Promise((resolve, reject) => {
      //   owlCarouselScript.onload = resolve;
      //   owlCarouselScript.onerror = reject;
      //   document.body.appendChild(owlCarouselScript);
      // });

      // Setelah semua skrip dimuat, memuat skrip lainnya
      const otherScripts = [
        'assets/easing/jquery.easing.min.js',
        // 'assets/jquery/jquery.animateNumber.min.js',
        'assets/jquery/plugins.js',
        'assets/js/custom.js'
      ];

      otherScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
    };

    loadScripts();

    // Membersihkan elemen script ketika komponen tidak lagi digunakan
    return () => {
      document.querySelectorAll('script').forEach(script => {
        script.remove();
      });
    };
  }, []);

  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
      <HubungiKami />
      <Footer />
      <FloatingPengaduan isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible} />
      <div>
        <FloatingWhatsApp
          onClick={() => setIsFormVisible(false)}
          avatar={floatingWhatsappList?.avatar}
          phoneNumber={floatingWhatsappList?.phone_number}
          accountName={floatingWhatsappList?.account_name}
          chatMessage={floatingWhatsappList?.chat_message}
          statusMessage={floatingWhatsappList?.status_message}
          darkMode={true}
          allowEsc={true}
          allowClickAway
          notification
          notificationDelay={60000} // 1 minute
          notificationSound
          styles={{
            position: 'fixed',
            bottom: '15px',
            height: '0px !important',
            border: '0'
          }}
        />
      </div>
    </Fragment>
  );
}

export default App;
