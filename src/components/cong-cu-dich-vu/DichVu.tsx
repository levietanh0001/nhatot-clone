import styles from './DichVu.module.scss';

const DichVu = () => {
  return (
    <div className={styles['outer-wrapper']}>
      <h2 className={styles['h2']}>Dịch vụ dành cho môi giới</h2>

      <div className={styles['inner-wrapper']}>
        <a href='#'>
          <div className={styles['goi-pro']}>
            <span>Gói pro</span>
          </div>
        </a>
        <a href='#'>
          <div className={styles['tai-khoan-doanh-nghiep']}>
            <span>Tài khoản doanh nghiệp</span>
          </div>
        </a>
        <a href='#'>
          <div className={styles['chuyen-trang-moi-gioi']}>
            <span className={styles['chuyen-trang-moi-gioi__title']}>
              Chuyên trang môi giới
            </span>
            <span className={styles['chuyen-trang-moi-gioi__badge']}>
              <span>mới</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DichVu;
