import { useState } from 'react';
import styles from './FilterBoard.module.scss';
import clsx from 'clsx';


const FilterBoard = (props) => {

  const { category, setCategory } = props;

  return (
    <div className='container'>
        <div className={styles['inner-wrapper']}>
        <div className={styles['options']}>
          <div className={styles['option']} onClick={() => setCategory('')}>
            <div className={clsx(styles['icon-wrapper'], { [styles['active']]: !category } )}>
              <div className={styles['image-placeholder']}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z" /></svg></div>
            </div>
            <span>Tất cả</span>
          </div>          
          <div className={styles['option']} onClick={() => setCategory('canhochungcu')}>
            <div className={clsx(styles['icon-wrapper'], { [styles['active']]: category === 'canhochungcu' } )}>
              <img src='https://static.chotot.com/storage/categories/PTYs/v4/1010.svg' alt='Căn hộ/Chung cư' />
            </div>
            <span>Căn hộ/Chung cư</span>
          </div>
          <div className={styles['option']}  onClick={() => setCategory('nhao')}>
            <div className={clsx(styles['icon-wrapper'], { [styles['active']]: category === 'nhao' } )}>
              <img src='https://static.chotot.com/storage/categories/PTYs/v4/1020.svg' alt='Nhà ở' />
            </div>
            <span>Nhà ở</span>
          </div>
          <div className={styles['option']}  onClick={() => setCategory('khac')}>
            <div className={clsx(styles['icon-wrapper'], { [styles['active']]: category === 'khac' } )}>
              <img src='https://static.chotot.com/storage/categories/PTYs/v4/1030.svg' alt='Văn phòng, Mặt bằng kinh doanh' />
            </div>
            <span>Khác</span>
          </div>
          {/* <div className={styles['option']}>
            <div className={styles['icon-wrapper']}>
              <img src='https://static.chotot.com/storage/categories/PTYs/v4/1040.svg' alt='Đất' />
            </div>
            <span>Đất</span>
          </div>
          <div className={styles['option']}>
            <div className={styles['icon-wrapper']}>
              <img src='https://static.chotot.com/storage/categories/PTYs/v4/1030.svg' alt='Văn phòng, Mặt bằng kinh doanh' />
            </div>
            <span>Văn phòng, Mặt bằng kinh doanh</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default FilterBoard