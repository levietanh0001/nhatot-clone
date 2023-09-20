import styles from './EmptyState.module.scss';

const EmptyState = () => {
  return (
    <div className={styles['image']}>
      <img
        src='https://static.chotot.com/storage/chotot-icons/svg/empty-category.svg'
        alt='ĐĂNG NHANH - BÁN GỌN'
      />
      <div className={styles['caption']}>
        <h3 className={styles['caption-title']}>Đăng nhanh, Bán gọn</h3>
        <p>Chọn danh mục để đăng tin</p>
      </div>
    </div>
  );
};


export default EmptyState;