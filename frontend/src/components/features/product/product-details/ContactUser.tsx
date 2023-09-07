import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IContactUser } from './ContactUser.interface';
import styles from './ContactUser.module.scss';
import Image from '~/components/shared/image/Image';
import { placeholderImageSrc } from '~/utils/variables.util';

const ContactUser: React.FC<IContactUser> = (props) => {
  const { userId: userId, userProfile } = props;
  const phoneNumber = userProfile?.phoneNumber ?? '';
  const [showPhone, setShowPhone] = useState<boolean>(false);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['user-card']}>
        <div className={styles['user-avatar']}>
          <Image
            width='46px'
            height='46px'
            alt={'avatar'}
            lazyLoading={true}
            src={userProfile?.avatarUrl}
            variant='circular'
            fallbackImageUrl={placeholderImageSrc}
            reserverSpace={true}
          />
          {/* <img
            src='https://cdn.chotot.com/73TO65Il6h0sDADPUC1slh5Y1vS2PLWhtNQHi_jRmOQ/preset:uac/plain/d01e19fd5a0155b562cce3020725c41a-7b935f90d149c81e3a81f07cce1a9040332e6d90.jpg'
            decoding='async'
            data-nimg='intrinsic'
          /> */}
        </div>
        <div className={styles['user-info']}>
          <div className={styles['card-header']}>
            <div className={styles['card-title']}>
              <span>{userProfile?.username ?? ''}</span>
            </div>
            <div className={styles['to-profile-page']}>
              <span>
                <Link to={`/user-profile/${userId ?? ''}`}>Xem trang</Link>
              </span>
              <span>&gt;</span>
            </div>
          </div>
          <div className={styles['card-body']}>
            <div className={styles['user-type-wrapper']}>
              <span className={styles['user-icon']}>
                {userProfile?.role === 'moigioi' && (
                  <img width={15} src="https://static.chotot.com/storage/chotot-icons/next/pro.svg" alt="Môi giới" />
                )}
                {/* <img
                  src='https://static.chotot.com/storage/default_images/pty/private-pty-icon.svg'
                  alt='https://static.chotot.com/storage/default_images/pty/private-pty-icon.svg'
                /> */}
              </span>
              <span className={styles['user-type']}>
                {String(userProfile?.role ?? '')
                  .replace('canhan', 'Cá nhân')
                  .replace('moigioi', 'Môi giới')}
              </span>
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
          {phoneNumber && (
            <button
              className={styles['call']}
              onClick={() => setShowPhone((prev) => !prev)}
            >
              <span className={styles['call-icon']}>
                <img
                  alt='loadingIcon'
                  src='https://static.chotot.com/storage/chotot-icons/svg/white-phone.svg'
                />
              </span>
              <span
                className={clsx(styles['phone-number'], {
                  [styles['shortened']]: !showPhone,
                })}
              >
                {phoneNumber}
              </span>
              <span
                className={clsx(styles['expand'], {
                  [styles['hidden']]: showPhone,
                })}
              >
                Bấm để hiện số
              </span>
            </button>
          )}
          <button className={styles['chat']}>
            <span className={styles['chat-icon']}></span>
            <span className={styles['chat-with-user']}>
              <Link to={`/create-chat/${userId}`}>Chat với người dùng</Link>
            </span>
          </button>
        </div>
      </div>
      <div className={styles['contact-admin']}>
        <div className={styles['help-wrapper']}>
          <span className={styles['help-icon']}>
            <img
              src='https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/support.svg'
              alt='Cần trợ giúp'
            />
          </span>
          <a href='#'>Cần trợ giúp</a>
        </div>
        <div className={styles['report-wrapper']}>
          <span className={styles['report-icon']}>
            <img
              src='https://storage.googleapis.com/static-chotot-com/storage/chotot-icons/svg/warning_grey.svg'
              alt='Báo cáo tin đăng này'
            />
          </span>
          <a href='#'>Báo cáo tin đăng này</a>
        </div>
      </div>
    </div>
  );
};

export default ContactUser;
