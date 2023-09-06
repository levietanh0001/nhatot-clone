import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';
import { useEffect } from 'react';

const Modal = (props) => {

  const {
    wrapperClass = '',
    overlayClass = '',
    modalClass = '',
    closeBtnClass = '',
    modalContentClass = '',
    contentInnerWrapperClass = '',
    closeIcon,

    show,
    onModalClose,
    onClickAway = () => null,
    children,
  } = props;

  useEffect(() => {

    if (show) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
      // document.body.style.position = 'fixed';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
      // document.body.style.position = 'unset';
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <>  
      {createPortal(
      <div className={clsx(styles['wrapper'], wrapperClass)}>
        <div className={clsx(styles['overlay'], overlayClass)}></div>
        <ClickAwayListener onClickAway={onClickAway}>
          <div className={clsx(styles['modal'], modalClass)}>
            <button className={clsx(styles['close-btn'], closeBtnClass)} onClick={onModalClose}>
              {!closeIcon && <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 384 512'><path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' /></svg>}
              {closeIcon}
            </button>
            <div className={clsx(styles['modal-content'], modalContentClass)}>
              <div className={clsx(styles['content-inner-wrapper'], contentInnerWrapperClass)}>
                {children}
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
      , document.body)}
    </>
  );
};

export default Modal;
