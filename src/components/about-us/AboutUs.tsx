import React from 'react';
import styles from './AboutUs.module.scss';


const AboutUs = () => {
  return (
    <>
      <Details />
      <Address />
    </>
  );
};

const Address = () => {
  return (
    <address className={styles['address']}>
      <div className='container'>
        <div className={styles['inner-wrapper']}>
          <p>
            CÔNG TY TNHH CHỢ TỐT - Người đại diện theo pháp luật: Nguyễn Trọng
            Tấn;
          </p>
          <br />
          <p>GPDKKD: 0312120782 do sở KH & ĐT TP.HCM cấp ngày 11/01/2013;</p>
          <br />
          <p>
            Địa chỉ: Số 2 Ngô Đức Kế, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí
            Minh, Việt Nam; Email: trogiup@chotot.vn - Tổng đài CSKH: 19003003
            (1.000đ/phút)
          </p>
        </div>
      </div>
    </address>
  );
};

const Details = () => {
  return (
    <div className={styles['details']}>
      <div className={styles['our-app']}>
        <div className={styles['title']}>
          <p>Tìm bất động sản trên ứng dụng chợ tốt</p>
        </div>
        <div className={styles['content']}>
          <img
            alt='Chợ Tốt'
            src='https://static.chotot.com/storage/default/group-qr.jpeg'
            width='87'
            height='87'
          ></img>
          <ul className={styles['app-stores']}>
            <li>
              <a
                href='https://itunes.apple.com/us/app/chotot.vn/id790034666'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                <img
                  alt='App Store'
                  src='https://static.chotot.com/storage/default/ios.svg'
                />
              </a>
            </li>
            <li>
              <a
                href='https://play.google.com/store/apps/details?id=com.chotot.vn'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                <img
                  alt='Google Play'
                  src='https://static.chotot.com/storage/default/android.svg'
                />
              </a>
            </li>
            <li>
              <a
                href='https://appgallery.cloud.huawei.com/ag/n/app/C102420927?channelId=web&detailType=0'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                <picture>
                  <source
                    type='image/webp'
                    srcSet='https://static.chotot.com/storage/default/huawei_app_install.webp'
                  />
                  <img
                    alt='App Huawei'
                    src='https://static.chotot.com/storage/default/huawei_app_install.png'
                  />
                </picture>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['about-us']}>
        <div className={styles['title']}>
          <p>Về nhà tốt</p>
        </div>
        <ul className={styles['content']}>
          <li>
            <a href=''>Quy chế hoạt động sàn</a>
          </li>
          <li>
            <a href=''>Chính sách bảo mật</a>
          </li>
          <li>
            <a href=''>Giải quyết tranh chấp</a>
          </li>
          <li>
            <a href=''>Điều khoản sử dụng</a>
          </li>
        </ul>
      </div>
      <div className={styles['recognition']}>
        <div className={styles['social']}>
          <div className={styles['title']}>
            <p>Liên kết</p>
          </div>
          <div className={styles['icon-btn-list']}>
            <div className='icon-btn'>
              <a
                href='https://www.facebook.com/chotot.vn'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                <img
                  alt='Facebook'
                  width='32'
                  height='32'
                  src='https://static.chotot.com/storage/default/facebook.svg'
                />
              </a>
            </div>
            <div className='icon-btn'>
              <a
                href='https://www.youtube.com/ChototVN'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                <img
                  alt='Youtube'
                  width={32}
                  height={32}
                  src='https://static.chotot.com/storage/default/youtube.svg'
                />
              </a>
            </div>
            <div className='icon-btn'>
              <a
                href='https://linkedin.com/company/cho-tot'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                <img
                  alt='LinkedIn'
                  width={32}
                  height={32}
                  src='https://static.chotot.com/storage/default/linkedin.svg'
                />
              </a>
            </div>
          </div>
        </div>
        <div className={styles['certification']}>
          <div className={styles['title']}>
            <p>Chứng nhận</p>
            <div className={styles['icon-button']}>
              <img
                alt='Certification'
                width={130}
                height={40}
                src='https://static.chotot.com/storage/default/certificate.png'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AboutUs;
