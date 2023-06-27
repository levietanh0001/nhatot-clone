import React from 'react';
import clsx from 'clsx';

import styles from './TopCarousel.module.scss';


const slides = [
  {
    imgSrc: 'https://cdn.chotot.com/admincentre/UcvcfUTYee0oRvekvI9K8zaCMCuJU3JE1G96GzRY2JU/preset:raw/plain/a9ad0f1e7102ae6b4e9ddc12cb6a9620-2828674230988306341.jpg',
    backgroundColor: '#0088FE',
  },
  {
    imgSrc: 'https://cdn.chotot.com/admincentre/ICGqIPhBAn559vSI4v7jaBAYFYegeRG7xSfUJ6tkugI/preset:raw/plain/6ec3994f81e14d768dfc467847ce430c-2820195948173896828.jpg',
    backgroundColor: '#00C49F',
  },
  {
    imgSrc: 'https://cdn.chotot.com/admincentre/veScoYPqB2TIpSbs2HCMOY6ZDVpcs21DlBQWp5a3Up8/preset:raw/plain/ee1123abbc4c91975cf7a5f42c046d5b-2816676295139993019.jpg',
    backgroundColor: '#FFBB28',
  },
];

const duration = 2500;

function TopCarousel() {
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {

    const timerId = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      duration
    );

    // 3. clear timer on unmount
    return () => {
      clearTimeout(timerId);
    };
  }, [index]);

  return (
    <div className={styles['outer-wrapper']}>
      <div className='container'>
        <div className={styles['inner-wrapper']}>
          <div
            className={styles['carousel']}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {slides.map((slide, index) => (
              <div
                className={styles['slide']}
                key={index}
                style={{ backgroundColor: slide.backgroundColor }}
                tabIndex={0}
              >
                <a href='#'>
                  <img 
                    src={slide.imgSrc} 
                    alt='Chính sách mới của nhà tốt' 
                  />
                </a>
              </div>
            ))}
          </div>

          <div className={styles['dots']}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={clsx(
                  styles['dot'],
                  {
                    [styles['active']]: index === idx? true: false
                  }
                )}
                onClick={() => setIndex(idx)}
              ></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default TopCarousel;
