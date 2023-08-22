import PropTypes from 'prop-types';
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import styles from './SearchFilterMenu.module.scss';


const SearchFilterMenu = (props) => {
  const [show, setShow] = useState<boolean>(false);

  const { productType, setProductType } = props;

  return (
    <>
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <div className={styles['dropdown-menu']} onClick={() => setShow(!show)}>
          <div className={styles['menu-btn']}>
            <span>
              {productType === 'chothue'
                ? 'Cho thuê'
                : productType === 'duan'
                ? 'Dự án'
                : 'Mua bán'}
            </span>
            <svg
              data-type='monochrome'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              width='10px'
              height='10px'
              fill='none'
              id='arrowDownB'
            >
              <path
                d='M7.9 156.8l2.8 3.3 214.8 247.2c7.3 8.4 18.2 13.6 30.3 13.6 12.2 0 23.1-5.4 30.3-13.6l214.7-246.7 3.6-4.1c2.7-3.9 4.3-8.7 4.3-13.7 0-13.7-11.7-25-26.2-25h-453c-14.5 0-26.2 11.2-26.2 25 0 5.2 1.7 10.1 4.6 14z'
                fill='currentColor'
              ></path>
            </svg>
          </div>

          {show && (
            <div className={styles['menu-content']}>
              <div
                className={styles['menu-item']}
                onClick={() => setProductType('muaban')}
              >
                <span>Mua bán</span>
                <svg
                  style={{
                    visibility: productType === 'muaban' ? 'initial' : 'hidden',
                  }}
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 448 512'
                >
                  <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                </svg>
              </div>

              <div
                className={styles['menu-item']}
                onClick={() => setProductType('chothue')}
              >
                <span>Cho thuê</span>
                <svg
                  style={{
                    visibility:
                      productType === 'chothue' ? 'initial' : 'hidden',
                  }}
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 448 512'
                >
                  <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                </svg>
              </div>

              <div
                className={styles['menu-item']}
                onClick={() => setProductType('duan')}
              >
                <span>Khác</span>
                <svg
                  style={{
                    visibility: productType === 'duan' ? 'initial' : 'hidden',
                  }}
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 448 512'
                >
                  <path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
                </svg>
              </div>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
};

SearchFilterMenu.propTypes = {
  productType: PropTypes.string,
  setProductType: PropTypes.func,
};

export default SearchFilterMenu;