import React from 'react';
import { Person } from '@mui/icons-material';
import { AiOutlineHeart } from 'react-icons/ai';
import styles from './MuaBanCardList.module.scss';

const MuaBanCardList = () => {
  return (
    <div>
      {
        data.map((item, index) => (
          <a href={item.href} className={styles['card-wrapper']}>
            <div className={styles['card']}>
              <div className={styles['card-media']}>
                <img src={item.img.src} alt={item.img.alt} />
              </div>
              <div className={styles['card-details']}>
                <div className={styles['card-title']}>{item.title}</div>
                <div className={styles['card-content']}>
                  <div className={styles['description']}>
                    <span className={styles['area']}>
                      {item.area.squareMeter} m<sup className={styles['superscript']}>2</sup>
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
                    <span className={styles['icon']}><Person fontSize='small' /></span>
                    <span>1 ngày trước</span>
                    <span>{item.location}</span>
                  </div>
                  <button className={styles['favorite-btn']}>
                    <AiOutlineHeart />
                  </button>
                </div>
              </div>
            </div>
          </a>
        ))
      }
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

const data = srcList.map(src => {
  return {
    img: { src, alt: '' },
    title: 'Cần bán bất động sản nhất cận thị nhị cận sông',
    href: '#',
    price: { amount: 20, unit: 'tỷ' },
    location: 'Hà Nội',
    area: { squareMeter: 65 },
    bedroom: 2
  }
})

export default MuaBanCardList;
