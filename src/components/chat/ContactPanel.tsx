import { ClickAwayListener } from '@mui/material';
import styles from './ContactPanel.module.scss';
import { useState } from 'react';

const ContactPanel = () => {
  return (
    <div className={styles['contact-panel']}>
      <Toolbar />
      <div className={styles['contacts']}>
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </div>
    </div>
  );
};

const Toolbar = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={styles['toolbar']}>
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <div className={styles['message-filter-menu']}>
          <button className={styles['menu-btn']} onClick={() => setShow(!show)}>
            <span className={styles['current-value']}>Tất cả</span>
            <span className={styles['dropdown-icon']}>
              <img src='https://chat.chotot.com/icons/dropdown.svg' alt='drop down' />
            </span>
          </button>
          {
            show && <div className={styles["menu-content"]}>
              <MessageFilterMenuOptions />
            </div>
          }
        </div>
      </ClickAwayListener>
      <div className={styles['settings']}>
        <span className={styles['settings-icon']}>
          <img src='https://chat.chotot.com/icons/setting.svg' alt='settings' />
        </span>
      </div>
    </div>
  );
};


const MessageFilterMenuOptions = () => {
  return (
    <div className={styles["message-filter-options"]}>
      <ul>
        <li>Tất cả</li>
        <li>Chưa đọc</li>
        <li>Tin nhắn rác</li>
      </ul>
    </div>
  );
}

const ContactCard = () => {
  return (
    <div className={styles['contact-card']}>
      <div className={styles['card-header']}>
        <span className={styles['avatar']}>
          <img
            src='https://cdn.chotot.com/73TO65Il6h0sDADPUC1slh5Y1vS2PLWhtNQHi_jRmOQ/preset:uac/plain/d01e19fd5a0155b562cce3020725c41a-7b935f90d149c81e3a81f07cce1a9040332e6d90.jpg'
            alt='userAvatar'
          />
        </span>
      </div>
      <div className={styles['card-body']}>
        <div className={styles['card-title']}>
          <span className={styles['user-name']}>Lê Việt Anh</span>
          <span>&nbsp;-&nbsp;</span>
          <span className={styles['last-active']}>1 giờ trước</span>
        </div>
        <div className={styles['last-message']}>
          <span>Căn hộ này bên mình có còn cho thuê nữa không ạ?</span>
        </div>
      </div>
      <div className={styles['card-footer']}>
        <span className={styles['product-image']}>
          <img
            src='https://cdn.chotot.com/0g-P9xck3F_3oG2U7eIS6QrCn5QbesNp0v2hjGgHviE/preset:listing/plain/55b5bb7e078e2200ea6d82a7daccb234-2830698562985958996.jpg'
            alt='product'
          />
        </span>
      </div>
    </div>
  );
};

export default ContactPanel;
