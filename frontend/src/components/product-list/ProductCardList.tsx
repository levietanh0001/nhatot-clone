import { Link } from 'react-router-dom';
import styles from './ProductCardList.module.scss';

const ProductCardList = () => {
  return (
    <div className={styles['product-card-list']}>
      {data.map((item, index) => (
        <Link key={index} to={item.href} className={styles['link-wrapper']}>
          <div className={styles['card-wrapper']}>
            <div className={styles['card']}>
              <div className={styles['card-media']}>
                <img src={item.img.src} alt={item.img.alt} />
              </div>
              <div className={styles['card-details']}>
                <div className={styles['card-title']}>{item.title}</div>
                <div className={styles['card-content']}>
                  <div className={styles['description']}>
                    <span className={styles['area']}>
                      {item.area.squareMeter} m
                      <sup className={styles['superscript']}>2</sup>
                    </span>
                    <span>-</span>
                    <span>{item.bedroom} PN</span>
                  </div>
                  <span className={styles['price']}>
                    {item.price.amount} {item.price.unit}
                  </span>
                </div>
                <div className={styles['card-footer']}>
                  <div className={styles['card-info']}>
                    <span className={styles['person-icon']}>
                      <svg
                        fill='black'
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 512 512'
                      >
                        {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
                      </svg>
                      {/* <Person fontSize='small' /> */}
                    </span>
                    <span>1 ngày trước</span>
                    <span>{item.location}</span>
                  </div>
                  <button className={styles['favorite-btn']}>
                    <span className={styles['heart-icon']}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 512 512'
                      >
                        {/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
                      </svg>
                    </span>
                    {/* <AiOutlineHeart /> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

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

const data = srcList.map((src) => {
  return {
    img: { src, alt: '' },
    title: 'Cần bán bất động sản nhất cận thị nhị cận sông',
    href: '/product',
    price: { amount: 20, unit: 'tỷ' },
    location: 'Hà Nội',
    area: { squareMeter: 65 },
    bedroom: 2,
  };
});

export default ProductCardList;
