import PropTypes from 'prop-types';
import styles from './ProductListing.module.scss';
import { timeAgo } from '@/utils/date.util';
import { convertToInternationalCurrencySystem } from '@/utils/number.util';
import clsx from 'clsx';
import Pagination from '@mui/material/Pagination';
import { placeholderImageSrc } from '@/utils/constants.util';


const ProductListing = (props) => {

  const {
    products, 
    onEditButtonClick, 
    onDeleteButtonClick,
    currentPage,
    productCount,
    onPageChange,
    user,
    userId,
    currentTab
  } = props;

  return (
    <>
      <div className={styles['wrapper']}>
        {[...products ?? []].map((item, index) => (
          <a key={index} href={`/product/${item?.id}/${item?.slug}.htm`} className={styles['card-wrapper']}>
            <div className={styles['card']}>
              <div className={styles['card-media']}>
                <img src={item?.thumbnailImageUrl ?? placeholderImageSrc} alt={item?.postTitle ?? ''} />
                {user?.userId === userId && currentTab === 'userProducts' && (
                  <button className={styles['edit-btn']} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEditButtonClick(item?.id ?? '', item?.slug ?? '') }}>
                    <svg fill='gold' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
                    {/* <svg width={24} height={24} viewBox='0 0 24 24' fill='red' xmlns='http://www.w3.org/2000/svg'><path opacity='0.8' d='M12.0004 20.95C11.7085 20.9488 11.4233 20.8619 11.1804 20.7C6.7604 17.7 2.2404 13.87 2.3004 8.28C2.28968 6.8971 2.82608 5.56604 3.79266 4.57698C4.75924 3.58792 6.07762 3.02107 7.4604 3C8.35262 3.02544 9.22682 3.25717 10.0145 3.67703C10.8022 4.09689 11.4819 4.69347 12.0004 5.42C12.5189 4.69347 13.1986 4.09689 13.9863 3.67703C14.774 3.25717 15.6482 3.02544 16.5404 3C17.9145 3.02098 19.2253 3.58093 20.1905 4.5592C21.1557 5.53747 21.6979 6.85575 21.7004 8.23C21.7604 13.82 17.2404 17.65 12.8104 20.65C12.5775 20.8305 12.2947 20.9352 12.0004 20.95Z' fill='white' /><path d='M12.0004 20.95C11.7085 20.9488 11.4233 20.8619 11.1804 20.7C6.7604 17.7 2.2404 13.87 2.3004 8.28C2.28968 6.8971 2.82608 5.56604 3.79266 4.57698C4.75924 3.58792 6.07762 3.02107 7.4604 3C8.35262 3.02544 9.22682 3.25717 10.0145 3.67703C10.8022 4.09689 11.4819 4.69347 12.0004 5.42C12.5189 4.69347 13.1986 4.09689 13.9863 3.67703C14.774 3.25717 15.6482 3.02544 16.5404 3C17.9145 3.02098 19.2253 3.58093 20.1905 4.5592C21.1557 5.53747 21.6979 6.85575 21.7004 8.23C21.7604 13.82 17.2404 17.65 12.8104 20.65C12.5775 20.8305 12.2947 20.9352 12.0004 20.95ZM7.4604 4.4C6.45333 4.41839 5.49404 4.83276 4.79028 5.55336C4.08653 6.27396 3.69497 7.24278 3.7004 8.25C3.6504 13.17 7.8504 16.7 12.0004 19.49C16.1804 16.7 20.3804 13.18 20.3304 8.24C20.3332 7.2345 19.9405 6.26824 19.237 5.5498C18.5335 4.83136 17.5757 4.41837 16.5704 4.4C14.0004 4.4 12.6404 6.95 12.6204 7.01C12.565 7.1274 12.4773 7.2265 12.3674 7.29561C12.2575 7.36472 12.1302 7.40094 12.0004 7.4C11.8694 7.40045 11.7409 7.36413 11.6296 7.29519C11.5182 7.22625 11.4284 7.12744 11.3704 7.01C11.3704 7.01 10.0004 4.4 7.4604 4.4Z' fill='#E5193B' /></svg> */}
                  </button>
                )}
                {user?.userId === userId && currentTab === 'userProducts' && (
                  <button className={styles['delete-btn']} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDeleteButtonClick(item?.id ?? '') }}>
                    <svg fill='red' width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                  </button>
                )}
              </div>
              <div className={styles['card-details']}>
                <div className={styles['card-title']}>{item?.postTitle ?? ''}</div>
                <div className={styles['card-content']}>
                  <span className={styles['content-line']}>{item?.area ?? ''} m<sup>2</sup> &middot; {item?.numBedrooms ?? ''} PN &middot; {item?.numBathrooms ?? ''} WC</span>
                  <span className={clsx(styles['price'], styles['content-line'])}>
                    {convertToInternationalCurrencySystem(item?.price ?? '')}
                    {item?.type === 'chothue'? '/tháng': ''}
                  </span>
                  <span className={clsx(styles['address'], styles['content-line'])}>{item?.address ?? ''}</span>
                </div>
                <div className={styles['card-footer']}>
                  <div className={styles['card-info']}>
                    <span className={styles['icon']}>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' style={{width: 14, height: 14}}><g clipPath='url(#clip0_8440_50991)'><path d='M12 15.375a4.125 4.125 0 100-8.25 4.125 4.125 0 000 8.25z' /><path d='M12 2.25A9.75 9.75 0 1021.75 12 9.769 9.769 0 0012 2.25zm6.169 15.225a7.624 7.624 0 00-2.297-2.156 5.597 5.597 0 01-7.744 0 7.622 7.622 0 00-2.297 2.156 8.25 8.25 0 1112.338 0z' /></g><defs><clipPath id='clip0_8440_50991'><path d='M0 0h24v24H0z' /></clipPath></defs></svg>
                    </span>
                    <span>{timeAgo(item?.updatedAt) ?? ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: '15px' }}>
        <Pagination
          className={styles['pagination']}
          page={currentPage}
          count={Number(Math.ceil(Number(productCount ?? 0) / 9))}
          boundaryCount={0}
          siblingCount={2}
          defaultPage={currentPage}
          shape='rounded'
          variant='outlined'
          onChange={onPageChange}
          showFirstButton
        />
      </div>
    </>
  );
};

// ProductListing.propTypes = {
//   products: PropTypes.array,
//   currentPage: PropTypes.number,
//   onFavoriteButtonClick: PropTypes.func,
//   onDeleteButtonClick: PropTypes.func,
//   onPageChange: PropTypes.func,
//   productCount: PropTypes.number,
//   user: PropTypes.object,
//   userId: PropTypes.number
// }

// const srcList = [
//   'https://cdn.chotot.com/YiW5G3t-XPqvOmy4_dwktTnpfcUDx1F5i7ZGRKPgn10/preset:listing/plain/fe8c3c1720749469fc518bc17ff6dcaf-2828836700652840477.jpg',
//   'https://cdn.chotot.com/9lbxj-EKh1KXVOJb_5I5f4d44WgTDjB5gYiO1WnTuss/preset:listing/plain/765da8c83777256683311c681e39c390-2819732954924348631.jpg',
//   'https://cdn.chotot.com/z5wMimw_gLHA93GF9D3zjYsrBfXM9fbjJ5fGaNaIyWw/preset:listing/plain/2c65368a27b9d7df05a3f97b3880bb6c-2828991746408773885.jpg',
//   'https://cdn.chotot.com/rF68XKEgwEsekc9xXD-lHzXCpnZPUQXb1BAzGanx6u4/preset:listing/plain/8c0637277b08f171e2dd04f5dc28c406-2830984849783579334.jpg',
//   'https://cdn.chotot.com/6BHLaw-fe8sx3P4GpB3HDfXmXKeRyXXmo0mBkAifyXc/preset:listing/plain/ce354c8585a87565315f3b173174619b-2823934818590421101.jpg',
//   'https://cdn.chotot.com/Mt5CA46No541mBP9gGaGb5d72UM_u_sB997J52IQ5kM/preset:listing/plain/832173c5773e6c6a0381c9d654a577b2-2824457488492683656.jpg',
//   'https://cdn.chotot.com/0AQZ0aBviO6LoMlsUFEQ1M1639CeeeilIXyFB9YLinI/preset:listing/plain/7650c53c67a0319388e9cb2f9c38571c-2824458832462501098.jpg',
//   'https://cdn.chotot.com/pAtlrCEj7MEB8IcBUJyFnfx1Rj8k7eCDsqgBn10Ffig/preset:listing/plain/88096984dc2b20ce3b94ee52161fe431-2830984665748857542.jpg',
//   'https://cdn.chotot.com/7L6VWe71_tvp7yeSmyBNQsjZm1wC1YHaERhJN1xL8ng/preset:listing/plain/a65b14520bc775d4ecf57e5cb0dfe0f4-2804924532258773338.jpg',
// ];

// const data = srcList.map((src) => {
//   return {
//     img: { src, alt: '' },
//     title: 'Cần bán bất động sản nhất cận thị nhị cận sông',
//     href: '#',
//     price: { amount: 20, unit: 'tỷ' },
//     location: 'Hà Nội',
//     area: { squareMeter: 65 },
//     bedroom: 2,
//   };
// });


export default ProductListing;
