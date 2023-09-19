import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Pagination } from '@mui/material';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { timeAgo } from '~/utils/date.util';
import { convertToInternationalCurrencySystem } from '~/utils/number.util';
import { placeholderImageSrc } from '~/utils/constants.util';
import styles from './ProductCardList.module.scss';
import Image from '~/components/ui/image/Image';
dayjs.extend(relativeTime);


const ProductCardList = (props) => {
  const {
    isGridView,
    currentPage,
    setCurrentPage,
    numPages,
    setNumPages,
    onPageChange,
    products,
    onFavoriteButtonClick,
    favoriteProductIds,
  } = props;

  return (
    <>
      <ul
        className={clsx(styles['product-card-list'], {
          [styles['grid-view']]: isGridView,
        })}
      >
        {products &&
          products.map((product, index) => (
            <li key={index}>
              <Link
                key={index}
                // to=''
                // slug field on backend
                to={`/product/${product.id}/${product.slug}.htm`}
                className={clsx(styles['link-wrapper'], {
                  [styles['grid-view']]: isGridView,
                })}
              >
                {/* {product.id} */}
                <div
                  className={clsx(styles['card-wrapper'], {
                    [styles['grid-view']]: isGridView,
                  })}
                >
                  <div
                    className={clsx(styles['card'], {
                      [styles['grid-view']]: isGridView,
                    })}
                  >
                    <div
                      className={clsx(styles['card-media'], {
                        [styles['grid-view']]: isGridView,
                      })}
                    >
                      {/* add image skeleton */}
                      {!product.thumbnailImageUrl && (
                        <img
                          style={{
                            display: 'block',
                            margin: 'auto',
                            backgroundColor: 'hsl(0, 0%, 90%)',
                            transition: 'background-color 300ms',
                          }}
                          src={placeholderImageSrc}
                          alt='Ảnh đại diện cho sản phẩm'
                        />
                      )}
                      {product.thumbnailImageUrl && (
                        <img
                          src={product.thumbnailImageUrl}
                          alt={product.postTitle}
                          loading='lazy'
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = placeholderImageSrc;
                          }}
                        />
                      )}
                    </div>
                    <div
                      className={clsx(styles['card-details'], {
                        [styles['grid-view']]: isGridView,
                      })}
                    >
                      <div
                        className={clsx(styles['card-title'], {
                          [styles['grid-view']]: isGridView,
                        })}
                      >
                        {product.postTitle}
                      </div>
                      
                      <div
                        className={clsx(styles['card-content'], {
                          [styles['grid-view']]: isGridView,
                        })}
                      >
                        <div className={styles['price']}>
                          {String(convertToInternationalCurrencySystem(product.price))}
                          {product?.type === 'chothue' && '/tháng'}
                        </div>

                        <div className={styles['description']}>
                          <span className={styles['area']}>
                            {product?.area ?? ''} m
                            <sup className={styles['superscript']}>2</sup>
                          </span>
                          &middot;
                          <span>{product?.numBedrooms ?? ''} PN</span>
                          &middot;
                          <span>{product?.numBathrooms ?? ''} WC</span>
                        </div>
                        
                        <div className={styles['address']}>
                          {product?.address}
                        </div>
                        <div className={styles['project-name']}>
                          {product?.projectName}
                        </div>
                        {/* <div className={styles['updated-date']}>
                          {timeAgo(product?.updatedAt)}
                        </div> */}

                      </div>
                      <div
                        className={clsx(styles['card-footer'], {
                          [styles['grid-view']]: isGridView,
                        })}
                      >
                        <div
                          className={clsx(styles['card-info'], {
                            [styles['grid-view']]: isGridView,
                          })}
                        >
                          <div className={styles['text']}>
                            <span className={styles['person-icon']}>
                              <Image
                                width='20px'
                                height='20px'
                                alt={'avatar'}
                                lazyLoading={true}
                                src={product?.avatarUrl}
                                variant='circular'
                                fallbackImageUrl={placeholderImageSrc}
                                reserverSpace={true}
                              />
                              {/* {product?.userType === 'moigioi' ? (
                                <img
                                  src='https://static.chotot.com/storage/icons/owner/pro.svg'
                                  alt='Môi giới'
                                  height={16}
                                  width={16}
                                  loading='eager'
                                />
                              ) : (
                                <svg
                                  fill='gray'
                                  xmlns='http://www.w3.org/2000/svg'
                                  height='1em'
                                  viewBox='0 0 512 512'
                                >
                                  <path d='M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z' />
                                </svg>
                              )} */}
                            </span>
                            &nbsp;&nbsp;
                            <span className={styles['username']}>{product?.username}</span>
                            {/* {product?.userType === 'moigioi'? <>&nbsp;&middot;&nbsp;môi giới</>: ''} */}
                            &nbsp;&nbsp;
                            <div className={styles['updated-date']}>
                              {timeAgo(product?.updatedAt)}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => onFavoriteButtonClick(product?.id)}
                className={clsx(styles['favorite-btn'], {
                  [styles['grid-view']]: isGridView,
                })}
              >
                <span className={styles['heart-icon']}>
                  {!favoriteProductIds && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='1em'
                      viewBox='0 0 512 512'
                    >
                      <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
                    </svg>
                  )}
                  {favoriteProductIds &&
                    !favoriteProductIds.includes(product.id) && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 512 512'
                      >
                        <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
                      </svg>
                    )}
                  {favoriteProductIds &&
                    favoriteProductIds.includes(product.id) && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 512 512'
                      >
                        <path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' />
                      </svg>
                    )}
                  {/* {JSON.stringify(favoriteProductIds)} */}
                  {/* {JSON.stringify(favoriteProductIds && favoriteProductIds.includes(product.id))}
                {JSON.stringify({id: product.id})} */}
                </span>
              </button>
            </li>
          ))}
      </ul>

      <Pagination
        className={styles['pagination']}
        page={currentPage}
        count={Number(numPages)}
        boundaryCount={0}
        siblingCount={2}
        defaultPage={currentPage}
        shape='rounded'
        variant='outlined'
        onChange={onPageChange}
        showFirstButton
        // showLastButton
      />
    </>
  );
};

ProductCardList.propTypes = {
  isGridView: PropTypes.bool,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  numPages: PropTypes.number,
  setNumPages: PropTypes.func,
  onPageChange: PropTypes.func,
  products: PropTypes.array,
  onFavoriteButtonClick: PropTypes.func,
  favoriteProductIds: PropTypes.array,
};

export default ProductCardList;
