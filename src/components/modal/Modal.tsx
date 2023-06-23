import styles from './Modal.module.scss';
import { MdClose } from 'react-icons/md';

const Modal = ({ children, show, onModalClose }) => {

  if(!show) {
    return null;
  }

  return (
    <>
      <div className={styles['overlay']}></div>
      <div className={styles['modal']}>
        <button className={styles['close-btn']} onClick={onModalClose}>
          <MdClose />
        </button>
        <div className={styles['content']}>{children}</div>
      </div>
    </>
  );
};


export default Modal;