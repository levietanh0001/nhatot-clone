import styles from './ContactUser.module.scss';


const ContactUser = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['user-card']}>
        <div className={styles['user-avatar']}>
          <img src='https://cdn.chotot.com/73TO65Il6h0sDADPUC1slh5Y1vS2PLWhtNQHi_jRmOQ/preset:uac/plain/d01e19fd5a0155b562cce3020725c41a-7b935f90d149c81e3a81f07cce1a9040332e6d90.jpg' decoding='async' data-nimg='intrinsic' />
        </div>
        <div className={styles['user-info']}>
          <div className={styles['card-header']}>
            <div className={styles['card-title']}>
              <span>Lê Việt Anh</span>
            </div>
            <div className={styles['to-profile-page']}>
              <span>Xem trang</span>
              <span>&gt;</span>
            </div>
          </div>
          <div className={styles['card-body']}>
            <div className={styles['user-type-wrapper']}>
              <span className={styles['user-icon']}>
                <img src='https://static.chotot.com/storage/default_images/pty/private-pty-icon.svg' alt='https://static.chotot.com/storage/default_images/pty/private-pty-icon.svg' />
              </span>
              <span className={styles['user-type']}>Cá nhân</span>
            </div>
            <div className={styles['status-wrapper']}>
              <span className={styles['status-icon']}>•</span>
              <span className={styles['status']}>Hoạt động 3 ngày trước</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['contact-user-card']}>
        <div className={styles['card-header']}>
          <span className={styles['card-title']}>Liên hệ với người dùng</span>
          <span className={styles['feedback']}>Phản hồi</span>
        </div>
        <div className={styles['card-body']}>
          <ul>
            <li>Căn hộ này còn không ạ?</li>
            <li>Thời hạn thuê tối đa là bao lâu?</li>
            <li>Thời gian thuê tối thiểu là bao lâu?</li>
            <li>Căn hộ có sẳn nội thất chưa ạ?</li>
            <li>Có thêm chi phí phát sinh gì nữa không?</li>
          </ul>
        </div>
        <div className={styles['card-actions']}>
          <button className={styles['call']}>
            <span className={styles['call-icon']}>
              <img alt="loadingIcon" src="https://static.chotot.com/storage/chotot-icons/svg/white-phone.svg" />
            </span>
            <span className={styles['phone-number']}>0326896269</span>
            <span className={styles['expand']}>Bấm để hiện số</span>
          </button>
          <button className={styles['chat']}>
            <span className={styles['chat-icon']}></span>
            <span className={styles['chat-with-user']}>Chat với người dùng</span>
          </button>
        </div>
      </div>
      <div className={styles['contact-admin']}>
        <div className={styles['help-wrapper']}>
          <span className={styles['help-icon']}>
            <img src="https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/support.svg" alt="Cần trợ giúp" />
          </span>
          <a href='#'>Cần trợ giúp</a>
        </div>
        <div className={styles['report-wrapper']}>
          <span className={styles['report-icon']}>
            <img src="https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/warning_grey.svg" alt="Báo cáo tin đăng này" />
          </span>
          <a href='#'>Báo cáo tin đăng này</a>
        </div>
      </div>
    </div>
  )
}

export default ContactUser