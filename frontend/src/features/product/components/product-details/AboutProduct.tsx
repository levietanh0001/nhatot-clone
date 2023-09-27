import { timeAgo } from '@/utils/date.util';
import { convertToInternationalCurrencySystem } from '@/utils/number.util';
import { FC } from 'react';
import styles from './ProductDetails.module.scss';
import ProductThumbGallery from './ProductThumbGallery';


interface IAboutProductProps {
  product: any;
  favoriteProductIds: number[];
  onFavoriteButtonClick: (productId: number) => void;
}

const AboutProduct: FC<IAboutProductProps> = (props) => {

  const { product, favoriteProductIds, onFavoriteButtonClick } = props;

  return (
    <>
      <ProductThumbGallery imageUrls={product.imageUrls} />
      <div className={styles['product-details']}>
        <div className={styles['product-overview']}>
          <div className={styles['product-heading']}>
            <h1 className={styles['title']}>{product.postTitle}</h1>
            <div className={styles['actions']}>
              <div className={styles['share']}>
                <img
                  src='https://static.chotot.com/storage/icons/svg/share-new.svg'
                  alt='share icon'
                />
                <span>Chia sẻ</span>
              </div>
              <div 
                className={styles['favorite-btn']}
                onClick={() => onFavoriteButtonClick(product?.id)}
              >
                {!favoriteProductIds?.includes(product?.id) && (
                  <svg xmlns='http://www.w3.org/2000/svg' height='1.25em' viewBox='0 0 512 512'><path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' /></svg>
                )}
                {favoriteProductIds?.includes(product?.id) && (
                  <svg fill='red' xmlns='http://www.w3.org/2000/svg' height='1.25em' viewBox='0 0 512 512'><path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' /></svg> 
                )}
                <span>Lưu tin</span>
              </div>
            </div>
          </div>
          <div className={styles['subheading']}>
            <div className={styles['area-price']}>
              <span className={styles['price']}>
                {convertToInternationalCurrencySystem(product.price)}
                {product.type === 'chothue' && '/tháng'}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span className={styles['area']}>{product.area} m2</span>
            </div>
            
          </div>
          <div className={styles['overview']}>
            <div className={styles['location']}>
              <span>
                <img
                  alt='location'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/location.svg'
                />
              </span>
              <span>{product.address}</span>
              <span>&nbsp;</span>
              <span className={styles['see-project']}>
                <span>Xem bản đồ</span>
                <span>
                  <img
                    alt='see project'
                    src='https://static.chotot.com/storage/default_images/project/rightIcon.svg'
                  />
                </span>
              </span>
            </div>
            <div className='upload-date'>
              <span>
                <img
                  src='https://static.chotot.com/storage/icons/svg/order_timer.svg'
                  alt='location'
                />
              </span>
              <span>{timeAgo(product.createdAt)}</span>
            </div>
            <div className={styles['project-name']}>
              <span>
                <img
                  alt='Dự Án'
                  src='https://static.chotot.com/storage/default_images/pty/group.svg'
                />
              </span>
              <span>Dự án: {product.projectName}</span>
            </div>
            <div className={styles['verified']}>
              <span>
                <img
                  src='https://static.chotot.com/storage/icons/svg/shield.svg'
                  alt='location'
                />
              </span>
              <span>Tin đã được kiểm duyệt.</span>
              <span>&nbsp;</span>
              <span className={styles['see-more']}>
                <a href='#'>Tìm hiểu thêm</a>
              </span>
            </div>
          </div>
        </div>
        <div className={styles['product-features']}>
          <h2 
            className={styles['title']}
            style={{ marginBottom: '10px' }}
          >Đặc điểm bất động sản</h2>
          <div className={styles['features']}>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt=''
                  src='https://static.chotot.com/storage/icons/logos/ad-param/ad_type.png'
                />
              </span>
              <span className={styles['info']}>
                {product.type === 'canban' ? 'Cần bán' : 'Cho thuê'}
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Diện tích'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/size.png'
                />
              </span>
              <span className={styles['info']}>
                Diện tích: {product.area} m<sup>2</sup>
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Số phòng ngủ'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/rooms.png'
                />
              </span>
              <span className={styles['info']}>
                Số phòng ngủ: {product.numBedrooms} phòng
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Hướng cửa chính'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/direction.png'
                />
              </span>
              <span className={styles['info']}>
                Hướng cửa chính: {product.mainDoorDirection}
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Số phòng vệ sinh'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/toilets.png'
                />
              </span>
              <span className={styles['info']}>
                Số phòng vệ sinh: {product.numBathrooms} phòng
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Hướng ban công'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/balconydirection.png'
                />
              </span>
              <span className={styles['info']}>
                Hướng ban công: {product.balconDirection}
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Loại hình căn hộ'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/apartment_type.png'
                />
              </span>
              <span className={styles['info']}>
                Loại hình căn hộ: {product.category}
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Giấy tờ pháp lý'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/property_legal_document.png'
                />
              </span>
              <span className={styles['info']}>
                Giấy tờ pháp lý: {product.legalDocsStatus}
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Số tiền cọc'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/deposit.png'
                />
              </span>
              <span className={styles['info']}>
                Số tiền cọc: {convertToInternationalCurrencySystem(product.deposit)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['product-description']}>
          <h2 className={styles['title']}>Mô tả chi tiết</h2>
          <pre className={styles['description']}>{product.description}</pre>
        </div>
        <div className={styles['product-location']}>
          <h2 className={styles['title']}>Địa điểm bất động sản</h2>
          <div className={styles['map']}></div>
        </div>
      </div>
    </>
  );
};


export default AboutProduct;
