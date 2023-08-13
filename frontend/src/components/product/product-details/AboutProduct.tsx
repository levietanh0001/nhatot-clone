import PropTypes from 'prop-types';
import { convertToInternationalCurrencySystem } from '~/utils/number.util';
import styles from './ProductDetails.module.scss';
import { timeAgo } from '~/utils/date.util';
import ProductThumbGallery from './ProductThumbGallery';

const AboutProduct = (props) => {

  const { data } = props;

  return (
    <>
      <ProductThumbGallery imageUrls={data.imageUrls} />
      <div className={styles['product-details']}>
        <div className={styles['product-overview']}>
          <h1 className={styles['title']}>{data.postTitle}</h1>
          <div className={styles['subheading']}>
            <div className={styles['area-price']}>
              <span className={styles['price']}>
                {convertToInternationalCurrencySystem(data.price)}
                {data.type === 'chothue' && '/tháng'}
              </span>
              <span>&nbsp;-&nbsp;</span>
              <span className={styles['area']}>{data.area} m2</span>
            </div>
            <div className={styles['actions']}>
              <div className={styles['share']}>
                <img
                  src='https://static.chotot.com/storage/icons/svg/share-new.svg'
                  alt='share icon'
                />
                <span>Chia sẻ</span>
              </div>
              <div className={styles['save-post']}>
                <img
                  height='20'
                  width='20'
                  src='https://static.chotot.com/storage/icons/saveAd/save-ad.svg'
                  alt='like'
                  loading='lazy'
                />
                <span>Lưu tin</span>
              </div>
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
              <span>{data.address}</span>
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
              <span>{timeAgo(data.createdAt)}</span>
            </div>
            <div className={styles['project-name']}>
              <span>
                <img
                  alt='Dự Án'
                  src='https://static.chotot.com/storage/default_images/pty/group.svg'
                />
              </span>
              <span>Dự án: {data.projectName}</span>
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
          <h2 className={styles['title']}>Đặc điểm bất động sản</h2>
          <div className={styles['features']}>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt=''
                  src='https://static.chotot.com/storage/icons/logos/ad-param/ad_type.png'
                />
              </span>
              <span className={styles['info']}>
                {data.type === 'canban' ? 'Cần bán' : 'Cho thuê'}
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
                Diện tích: {data.area} m<sup>2</sup>
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
                Số phòng ngủ: {data.numBedrooms} phòng
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
                Hướng cửa chính: {data.mainDoorDirection}
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
                Số phòng vệ sinh: {data.numBathrooms} phòng
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
                Hướng ban công: {data.balconDirection}
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
                Loại hình căn hộ: {data.category}
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
                Giấy tờ pháp lý: {data.legalDocsStatus}
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
                Số tiền cọc: {convertToInternationalCurrencySystem(data.deposit)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['product-description']}>
          <h2 className={styles['title']}>Mô tả chi tiết</h2>
          <pre className={styles['description']}>{data.description}</pre>
        </div>
        <div className={styles['product-location']}>
          <h2 className={styles['title']}>Địa điểm bất động sản</h2>
          <div className={styles['map']}></div>
        </div>
      </div>
    </>
  );
};

AboutProduct.propTypes = {
  data: PropTypes.object
}

export default AboutProduct;
