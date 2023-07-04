import { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { CiFilter, CiLocationOn } from 'react-icons/ci';
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai';
import clsx from 'clsx';

const Filters = () => {
  const [show, setShow] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleFilters = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleFilters);

      return function removeScroll() {
        window.removeEventListener('scroll', toggleFilters);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <div 
        className={styles['outer-wrapper']}
        style={{
          top: show? '100%': '-50px',
          zIndex: '-1',
        }}
      >
        <div className='container'>
          <div className={styles['inner-wrapper']}>
            <button className={styles['filter-btn']}>
              <CiFilter className={styles['icon']} />
              <span className={styles['text']}>Lọc</span>
            </button>

            <button className={styles['filter-btn']}>
              <CiLocationOn className={styles['icon']} />
              <span className={styles['text']}>Toàn quốc</span>
              <AiFillCaretDown className={styles['icon']} fontSize={'0.875rem'} />
            </button>

            <button className={styles['filter-btn']}>
              <span className={styles['text']}>Mua bán</span>
              <AiFillCaretDown className={styles['icon']} fontSize={'0.875rem'} />
            </button>

            <button className={styles['filter-btn']}>
              <span className={styles['text']}>Loại BĐS</span>
              <AiFillCaretDown className={styles['icon']} fontSize={'0.875rem'} />
            </button>

            <button className={clsx(styles['filter-btn'], styles['gray'])}>
              <span className={styles['text']}>Giá</span>
              <AiOutlinePlus className={styles['icon']} fontSize={'0.875rem'} />
            </button>

            <button className={clsx(styles['filter-btn'], styles['gray'])}>
              <span className={styles['text']}>Dự án</span>
              <AiOutlinePlus className={styles['icon']} fontSize={'0.875rem'} />
            </button>

            <button className={clsx(styles['filter-btn'], styles['gray'])}>
              <span className={styles['text']}>Tin có video</span>
              <AiOutlinePlus className={styles['icon']} fontSize={'0.875rem'} />
            </button>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Filters;
