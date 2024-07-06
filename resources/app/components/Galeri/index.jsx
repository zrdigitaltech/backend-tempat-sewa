import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListGaleri } from '@/redux/action/galeri/creator';

import { Gallery } from 'react-grid-gallery';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function Index() {
  const galeriList = useSelector(state => state.galeri.galeriList);
  const dispatch = useDispatch();

  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(-1);
  const currentImage = galeriList[index];

  const handleClick = async index => {
    setIndex(index);
  };

  const fetchSlides = async () => {
    const slides = galeriList.map(({ original }) => ({
      src: original
    }));
    setSlides(slides);
  };

  const fetchGaleri = async () => {
    dispatch(getListGaleri());
    fetchSlides();
  };

  const styleSmall = () => {
    return {
      color: '#f47629',
      display: 'inline',
      padding: '0.2em 0.6em 0.3em',
      fontSize: '75%',
      fontWeight: '600',
      lineHeight: '1',
      background: 'rgba(0, 0, 0, 0.65)',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'baseline',
      borderRadius: '0.25em'
    };
  };

  useEffect(() => {
    fetchGaleri();
  }, [galeriList]);

  return (
    <section id="ourgallery" className="ourteam">
      <div className="container">
        <div className="section-title">
          <h2>
            Galleri <span className="title-border-white"></span>
          </h2>
        </div>
      </div>
      <div className="container">
        <Gallery
          images={galeriList}
          onClick={handleClick}
          enableImageSelection={false}
          tagStyle={styleSmall}
        />
        {!!currentImage && (
          <Lightbox slides={slides} open={index >= 0} index={index} close={() => setIndex(-1)} />
        )}
      </div>
    </section>
  );
}
