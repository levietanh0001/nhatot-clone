import React from 'react';
import styles from './Post.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';

const Post = () => {
  return (
    <div className={styles['outer-wrapper']}>
      <div className='container'>
        <div className={styles['inner-wrapper']}>
          <div className={styles['media']}>
            <h2 className={styles['title']}>Hình ảnh và Video sản phẩm</h2>
            <p className={styles['help']}>
              Xem thêm về&nbsp;
              <a
                href='https://trogiup.chotot.com/nguoi-ban/dang-tin/'
                target='_blank'
                rel='noreferrer'
              >
                Quy định đăng tin của Chợ Tốt
              </a>
            </p>
            <div className={styles['file-upload']}>
              <span className={styles['upload-icons']}>
                <svg className={styles['camera-icon']} xmlns='http://www.w3.org/2000/svg' width='53' height='39' viewBox='0 0 53 39'><g fill='none' fill-rule='evenodd' stroke='none' stroke-width='1'><g stroke='#FF8800' stroke-width='2' transform='translate(-255 -179)'><g transform='translate(132 122)'><path d='M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z'></path></g></g></g></svg>
                <svg className={styles['plus-icon']} xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 21'><g fill='none' fill-rule='evenodd' stroke='none' stroke-width='1'><g fill='#FF8800' transform='translate(-161 -428)'><g transform='translate(132 398)'><g transform='translate(16.648 17.048)'><g transform='rotate(-180 16.142 16.838)'><rect width='2.643' height='19.82' x='8.588' y='0' rx='1.321'></rect><path d='M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z' transform='rotate(90 9.91 9.91)'></path></g></g></g></g></g></svg>
              </span>
              <span className={styles['upload-requirements']}>Hình có kích thước tối thiểu 240x240</span>
            </div>
          </div>
          <div className={styles['details']}>
            <div className={styles['product-type']}>
              <select
                name='product-type'
                id='product-type'
                placeholder='Danh mục tin đăng'
              >
                <option value=''>Danh mục tin đăng</option>
                <option value='batdongsan'>Căn hộ/Chung cư</option>
                <option value='batdongsan'>Nhà ở</option>
                <option value='batdongsan'>Dự án</option>
              </select>
              <span className={styles['dropdown-icon']}>
                <AiFillCaretDown />
              </span>
            </div>
            <div className={styles['image']}>
              <img src='https://static.chotot.com/storage/chotot-icons/svg/empty-category.svg' alt='ĐĂNG NHANH - BÁN GỌN' />
              <div className={styles['caption']}>
                <h3 className={styles['caption-title']}>Đăng nhanh, Bán gọn</h3>
                <p>Chọn danh mục để đăng tin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
