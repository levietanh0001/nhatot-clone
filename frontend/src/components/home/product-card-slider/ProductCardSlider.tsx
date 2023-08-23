  import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

import './SwiperCardSlider.scss';
import styles from './ProductCardSlider.module.scss';
import ArrowBtn from './ArrowBtn';
import { timeAgo } from '~/utils/date.util';
import { convertToInternationalCurrencySystem } from '~/utils/number.util';



const ProductCardSlider: React.FC<IProductCardSliderProps> = (props) => {

  const {
    slides,
    type, 
    title, 
    className, 
    prevEl, 
    nextEl, 
  } = props;
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);

  return (
    <div className='container'>
      <div className={styles['wrapper']}>
        <h2 className={styles['title']}>{title}</h2>
        <div className={className}>
          <Swiper
            slidesPerView={4}
            spaceBetween={0}
            navigation={{
              prevEl: `.${prevEl}`,
              nextEl: `.${nextEl}`,
            }}
            modules={[Navigation]}
          >
            {slides?.map((item, index) => (
              <SwiperSlide key={index}>
                <Card
                  key={index}
                  title={item?.postTitle ?? ''}
                  imageSrc={item?.thumbnailImageUrl ?? '#'}
                >
                  <div>
                    {!!item?.area && (
                      <span>{item?.area} m<sup>2</sup> &middot; </span>
                    )}
                    {!!item?.numBedrooms && (
                      <span>{item?.numBedrooms} PN &middot; </span>
                    )}
                    {!!item?.numBathrooms && (
                      <span>{item?.numBathrooms} WC</span>
                    )}
                  </div>
                  <div className={styles['card-body']}>
                    <span className={styles['price']}>
                      {String(convertToInternationalCurrencySystem(item?.price))}
                      {item?.type === 'chothue' && '/tháng'}
                    </span>
                    <span className={styles['address']}>
                      {item?.address ?? ''}
                    </span>
                  </div>
                  <footer className={styles['card-footer']}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>
                    <span>{String(item?.userType).replace('canhan', 'cá nhân').replace('moigioi', 'môi giới')}</span>
                    <span>{timeAgo(item?.updatedAt)}</span>
                  </footer>
                </Card>
              </SwiperSlide>
            ))}
            <ArrowBtn IconComp={
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
            } ref={prevRef} style={{ display: 'none' }} />
            <ArrowBtn IconComp={
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
            } ref={nextRef} style={{ display: 'none' }} />
          </Swiper>
          <ArrowBtn
            className={prevEl}
            onClick={() => prevRef.current?.click()}
            IconComp={
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
            }
          />
          <ArrowBtn
            className={nextEl}
            onClick={() => prevRef.current?.click()}
            IconComp={
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
            }
          />
        </div>

        {/* <Link to={`/product-list/${type}`} className={styles['more']}> */}
        <Link to={`/product-list?type=${type}`} className={styles['more']}>
          <div>
            <span>Xem thêm 148.654 tin khác</span>
          </div>
          <div className={styles['more-icon']}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
          </div>
        </Link>
      </div>
    </div>
  );
};



// interface ICardProps {
//   children?: React.ReactNode,
//   img?: {
//     src: string;
//     alt?: string;
//   },
//   title?: string;
// }

const Card = (props) => {
  const {
    children,
    imageSrc,
    title
  } = props;

  return (
    <Link to='/product' className={styles['card-wrapper']}>
      <div className={styles['card']}>
        <div className={styles['card-media']}>
          {imageSrc && <img src={imageSrc ?? ''} alt={title ?? ''} loading='lazy' />}
        </div>
        <div className={styles['card-content']}>
          <div className={styles['card-title']}>
            <p>{title}</p>
          </div>
          <div className={styles['card-details']}>{children}</div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  imageSrc: PropTypes.string,
  title: PropTypes.string,

}

const srcList = [
  'https://cdn.chotot.com/YiW5G3t-XPqvOmy4_dwktTnpfcUDx1F5i7ZGRKPgn10/preset:listing/plain/fe8c3c1720749469fc518bc17ff6dcaf-2828836700652840477.jpg',
  'https://cdn.chotot.com/9lbxj-EKh1KXVOJb_5I5f4d44WgTDjB5gYiO1WnTuss/preset:listing/plain/765da8c83777256683311c681e39c390-2819732954924348631.jpg',
  'https://cdn.chotot.com/z5wMimw_gLHA93GF9D3zjYsrBfXM9fbjJ5fGaNaIyWw/preset:listing/plain/2c65368a27b9d7df05a3f97b3880bb6c-2828991746408773885.jpg',
  'https://cdn.chotot.com/rF68XKEgwEsekc9xXD-lHzXCpnZPUQXb1BAzGanx6u4/preset:listing/plain/8c0637277b08f171e2dd04f5dc28c406-2830984849783579334.jpg',
  'https://cdn.chotot.com/6BHLaw-fe8sx3P4GpB3HDfXmXKeRyXXmo0mBkAifyXc/preset:listing/plain/ce354c8585a87565315f3b173174619b-2823934818590421101.jpg',
  'https://cdn.chotot.com/Mt5CA46No541mBP9gGaGb5d72UM_u_sB997J52IQ5kM/preset:listing/plain/832173c5773e6c6a0381c9d654a577b2-2824457488492683656.jpg',
  'https://cdn.chotot.com/0AQZ0aBviO6LoMlsUFEQ1M1639CeeeilIXyFB9YLinI/preset:listing/plain/7650c53c67a0319388e9cb2f9c38571c-2824458832462501098.jpg',
  'https://cdn.chotot.com/pAtlrCEj7MEB8IcBUJyFnfx1Rj8k7eCDsqgBn10Ffig/preset:listing/plain/88096984dc2b20ce3b94ee52161fe431-2830984665748857542.jpg',
  'https://cdn.chotot.com/7L6VWe71_tvp7yeSmyBNQsjZm1wC1YHaERhJN1xL8ng/preset:listing/plain/a65b14520bc775d4ecf57e5cb0dfe0f4-2804924532258773338.jpg',
];

const slides = srcList.map((src) => {
  return {
    img: {
      src: src,
    },
  };
});

interface IProductCardSliderProps {
  slides: any[];
  type: string;
  title?: string;
  className?: string;
  prevEl: string;
  nextEl: string;
}


export default ProductCardSlider;
