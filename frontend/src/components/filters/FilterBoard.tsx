import styles from './FilterBoard.module.scss';


const FilterBoard = () => {
  return (
    <div className='container'>
        <div className={styles['inner-wrapper']}>
        <div className={styles["options"]}>
          <div className={styles['option']}>
            <div className={styles['icon-wrapper']}>
              <img src='https://static.chotot.com/storage/categories/PTYs/v4/1010.svg' alt='Căn hộ/Chung cư' />
            </div>
            <span>Căn hộ/Chung cư</span>
          </div>
          <div className={styles['option']}>
            <div className={styles['icon-wrapper']}>
              <img src="https://static.chotot.com/storage/categories/PTYs/v4/1020.svg" alt="Nhà ở" />
            </div>
            <span>Nhà ở</span>
          </div>
          <div className={styles['option']}>
            <div className={styles['icon-wrapper']}>
              <img src="https://static.chotot.com/storage/categories/PTYs/v4/1040.svg" alt="Đất" />
            </div>
            <span>Đất</span>
          </div>
          <div className={styles['option']}>
            <div className={styles['icon-wrapper']}>
              <img src="https://static.chotot.com/storage/categories/PTYs/v4/1030.svg" alt="Văn phòng, Mặt bằng kinh doanh" />
            </div>
            <span>Văn phòng, Mặt bằng kinh doanh</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBoard