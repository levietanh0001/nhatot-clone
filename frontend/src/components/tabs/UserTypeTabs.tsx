import clsx from 'clsx';
import styles from './UserTypeTabs.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';
import { TfiViewGrid } from 'react-icons/tfi';


const UserTypeTabs = (props) => {

  const {
    userType,
    setUserType,
    onViewModeToggle
  } = props;

  return (
    <div className={styles['wrapper']}>
      <div className={styles['actions']}>
        <button onClick={() => setUserType('')} className={clsx(styles['filter-btn'], { [styles['active']]: !userType })}>Tất cả thành viên</button>
        <button onClick={() => setUserType('canhan')} className={clsx(styles['filter-btn'], { [styles['active']]: userType === 'canhan' })}>Cá nhân</button>
        <button onClick={() => setUserType('moigioi')} className={clsx(styles['filter-btn'], { [styles['active']]: userType === 'moigioi' })}>Môi giới</button>
        <button className={styles['sort-by-menu']}>
          <span>Tin mới trước</span>
          <AiFillCaretDown />
        </button>
      </div>
      <div className={styles['view-mode']}>
        <button onClick={onViewModeToggle}><TfiViewGrid /></button>
      </div>
    </div>
  )
}


export default UserTypeTabs