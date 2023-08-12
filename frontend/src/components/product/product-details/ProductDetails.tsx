import styles from './ProductDetails.module.scss';
import ProductThumbGallery from './ProductThumbGallery';

const ProductDetails = () => {
  return (
    <>
      <ProductThumbGallery />
      <div className={styles['product-details']}>
        <div className={styles['product-overview']}>
          <h1 className={styles['title']}>
            Cho thuê căn góc full nội thất ban công đông nam
          </h1>
          <div className={styles['subheading']}>
            <div className={styles['area-price']}>
              <span className={styles['price']}>6 triệu/tháng</span>
              <span>&nbsp;-&nbsp;</span>
              <span className={styles['area']}>61.5 m2</span>
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
              <span>
                Ecopark, Phường Hải Tân, Thành phố Hải Dương, Hải Dương
              </span>
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
              <span>Đăng 6 ngày trước</span>
            </div>
            <div className={styles['project-name']}>
              <span>
                <img
                  alt='Dự Án'
                  src='https://static.chotot.com/storage/default_images/pty/group.svg'
                />
              </span>
              <span>Dự án: Đang cập nhật</span>
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
              <span className={styles['info']}>Cho thuê</span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Diện tích'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/size.png'
                />
              </span>
              <span className={styles['info']}>
                Diện tích: 62 m<sup>2</sup>
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Số phòng ngủ'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/rooms.png'
                />
              </span>
              <span className={styles['info']}>Số phòng ngủ: 2 phòng</span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Hướng cửa chính'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/direction.png'
                />
              </span>
              <span className={styles['info']}>Hướng cửa chính: Đông Nam</span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Số phòng vệ sinh'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/toilets.png'
                />
              </span>
              <span className={styles['info']}>Số phòng vệ sinh: 2 phòng</span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Hướng ban công'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/balconydirection.png'
                />
              </span>
              <span className={styles['info']}>Hướng ban công: Nam</span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Loại hình căn hộ'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/apartment_type.png'
                />
              </span>
              <span className={styles['info']}>Loại hình căn hộ: Chung cư</span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Giấy tờ pháp lý'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/property_legal_document.png'
                />
              </span>
              <span className={styles['info']}>
                Giấy tờ pháp lý: Đang chờ sổ
              </span>
            </div>
            <div className={styles['feature']}>
              <span className={styles['icon']}>
                <img
                  alt='Số tiền cọc'
                  src='https://static.chotot.com/storage/icons/logos/ad-param/deposit.png'
                />
              </span>
              <span className={styles['info']}>Số tiền cọc</span>
            </div>
          </div>
        </div>
        <div className={styles['product-description']}>
          <h2 className={styles['title']}>Mô tả chi tiết</h2>
          <pre className={styles['description']}>
            👉 Cho thuê Chung cư Lighthouse Ecopark HD đầy đủ các hướng view hồ
            - view sông
            <br />
            - Full đồ nội thất khách hàng chỉ việc xách vali đến ở<br />
            -Căn 1ngủ:giá từ 6-7tr
            <br />
            -Căn 2ngủ 1vs :8-10tr
            <br />
            - Căn 2ngủ 2vs :10-12tr
            <br />
            Liên hệ xem nhà
          </pre>
        </div>
        <div className={styles['product-location']}>
          <h2 className={styles['title']}>Địa điểm bất động sản</h2>
          <div className={styles['map']}></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
