import clsx from 'clsx';
import styles from './UserTypeTabs.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';
import { TfiViewGrid } from 'react-icons/tfi';

const UserTypeTabs = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles["actions"]}>
        <button className={clsx(styles['all'], styles['underlined'])}>Tất cả</button>
        <button className={styles['individual']}>Cá nhân</button>
        <button className={styles['broker']}>Môi giới</button>
        <button className={styles['sort-by-menu']}>
          <span>Tin mới trước</span>
          <AiFillCaretDown />
        </button>
      </div>
      <div className={styles['view-mode']}>
        <TfiViewGrid />
      </div>
    </div>
  )
}

export default UserTypeTabs