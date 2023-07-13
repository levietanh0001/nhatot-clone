import styles from './Upload.module.scss';

const UploadMedia = () => {
  return (
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
      <UploadImage />
      <UploadVideo />
    </div>
  );
};


const UploadVideo = () => {
  return (
    <div className={styles['file-upload']}>
      <span className={styles['upload-icons']}>
        <svg xmlns="http://www.w3.org/2000/svg" width={53} height={39} fill="none" viewBox="0 0 53 39"><path stroke="#FF8800" strokeWidth={2} d="M39.62 11.031l.013-.006.012-.006 11.707-6.042a1.329 1.329 0 01.208-.076l.007.003.128.025c.28.054.305.221.305.228v26.046a.412.412 0 01-.07.095.704.704 0 01-.203.145h-.122c-.073 0-.126 0-.176-.002h-.024l-.031-.017-11.721-6.183-.016-.008-.017-.008c-.16-.077-.41-.363-.41-.847v-12.5c0-.484.25-.77.41-.847zm11.716 20.404h.001-.001z" /><mask id="path-2-inside-1_289_1913" fill="#fff"><path fillRule="evenodd" d="M10.447 7c1.81 0 3.234 1.466 3.234 3.333 0 1.867-1.423 3.333-3.234 3.333S7.213 12.2 7.213 10.333C7.213 8.466 8.636 7 10.447 7zM28.07 36.167c4.656 0 8.537-4 8.537-8.8v-18.4c0-4.8-3.88-8.8-8.537-8.8H8.537C3.881.167 0 4.167 0 8.967v18.4c0 4.934 3.751 8.8 8.537 8.8H28.07z" clipRule="evenodd" /></mask><path fill="#FF8800" d="M10.447 9c.65 0 1.234.513 1.234 1.333h4C15.68 7.419 13.419 5 10.447 5v4zm1.234 1.333c0 .82-.584 1.333-1.234 1.333v4c2.972 0 5.234-2.42 5.234-5.333h-4zm-1.234 1.333c-.65 0-1.234-.513-1.234-1.333h-4c0 2.914 2.262 5.333 5.234 5.333v-4zm-1.234-1.333c0-.82.584-1.333 1.234-1.333V5c-2.972 0-5.234 2.42-5.234 5.333h4zM28.07 38.167c5.818 0 10.537-4.953 10.537-10.8h-4c0 3.753-3.042 6.8-6.537 6.8v4zm10.537-10.8v-18.4h-4v18.4h4zm0-18.4c0-5.847-4.72-10.8-10.537-10.8v4c3.495 0 6.537 3.047 6.537 6.8h4zM28.07-1.833H8.537v4H28.07v-4zm-19.533 0C2.72-1.833-2 3.12-2 8.967h4c0-3.753 3.042-6.8 6.537-6.8v-4zM-2 8.967v18.4h4v-18.4h-4zm0 18.4c0 5.98 4.59 10.8 10.537 10.8v-4c-3.624 0-6.537-2.913-6.537-6.8h-4zm10.537 10.8H28.07v-4H8.537v4z" mask="url(#path-2-inside-1_289_1913)" /></svg>
        <svg
          className={styles['plus-icon']}
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 20 21'
        >
          <g fill='none' fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g fill='#FF8800' transform='translate(-161 -428)'>
              <g transform='translate(132 398)'>
                <g transform='translate(16.648 17.048)'>
                  <g transform='rotate(-180 16.142 16.838)'>
                    <rect
                      width='2.643'
                      height='19.82'
                      x='8.588'
                      y='0'
                      rx='1.321'
                    ></rect>
                    <path
                      d='M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z'
                      transform='rotate(90 9.91 9.91)'
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
      <div className={styles['upload-requirements']}>
        <p>Đăng tối đa 1 video</p>
        <p>Bạn đã đăng 1/10 video trong tháng</p>
      </div>
    </div>
  );
};


const UploadImage = () => {
  return (
    <div className={styles['file-upload']}>
      <span className={styles['upload-icons']}>
        <svg
          className={styles['camera-icon']}
          xmlns='http://www.w3.org/2000/svg'
          width='53'
          height='39'
          viewBox='0 0 53 39'
        >
          <g fill='none' fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g
              stroke='#FF8800'
              stroke-width='2'
              transform='translate(-255 -179)'
            >
              <g transform='translate(132 122)'>
                <path d='M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z'></path>
              </g>
            </g>
          </g>
        </svg>
        <svg
          className={styles['plus-icon']}
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          viewBox='0 0 20 21'
        >
          <g fill='none' fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g fill='#FF8800' transform='translate(-161 -428)'>
              <g transform='translate(132 398)'>
                <g transform='translate(16.648 17.048)'>
                  <g transform='rotate(-180 16.142 16.838)'>
                    <rect
                      width='2.643'
                      height='19.82'
                      x='8.588'
                      y='0'
                      rx='1.321'
                    ></rect>
                    <path
                      d='M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z'
                      transform='rotate(90 9.91 9.91)'
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
      <span className={styles['upload-requirements']}>
        Hình có kích thước tối thiểu 240x240
      </span>
    </div>
  );
};


export default UploadMedia;