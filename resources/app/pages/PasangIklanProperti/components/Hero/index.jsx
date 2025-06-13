import React, { useEffect, useRef, useState } from 'react';
import FormRegister from './FormRegister';
import './hero.scss';

export default function HeroSection() {
  const [count, setCount] = useState(90000);
  const requestRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    const duration = 2500; // 2.5 detik
    const startValue = 90000;
    const endValue = 99000;
    const valueRange = endValue - startValue;

    const animate = timestamp => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const currentValue = Math.floor(startValue + progress * valueRange);
      setCount(currentValue);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="bg-primary text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="d-flex flex-column align-items-start">
              <h1 className="fw-bold display-5">Pasang Iklan Properti dengan Mudah</h1>
              <p className="fs-5 mt-3">
                Solusi lengkap untuk <strong>memasarkan</strong> dan{' '}
                <strong>mengelola properti sewa</strong> Anda dalam satu platform.
              </p>
              Jangkau lebih dari{' '}
              <span className="fw-bold fs-1 text-warning">{count.toLocaleString('id-ID')}+</span>{' '}
              pencarian properti setiap hari.
            </div>
          </div>

          {/* Right Form */}
          <div className="col-lg-4">
            <FormRegister />
          </div>
        </div>
      </div>
    </div>
  );
}
