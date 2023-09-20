import clsx from 'clsx';
import { FC } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { TfiViewGrid } from 'react-icons/tfi';
import styles from './UserTypeTabs.module.scss';
import { IUserTypesTab } from './product-list.interface';


const UserTypeTabs: FC<IUserTypesTab> = (props) => {

  const {
    userType,
    onUserTypeChange,
    onViewModeToggle
  } = props;

  return (
    <div className={styles['wrapper']}>
      <div className={styles['actions']}>
        <button onClick={() => onUserTypeChange('')} className={clsx(styles['filter-btn'], { [styles['active']]: !userType })}>Tất cả thành viên</button>
        <button onClick={() => onUserTypeChange('canhan')} className={clsx(styles['filter-btn'], { [styles['active']]: userType === 'canhan' })}>Cá nhân</button>
        <button onClick={() => onUserTypeChange('moigioi')} className={clsx(styles['filter-btn'], { [styles['active']]: userType === 'moigioi' })}>Môi giới</button>
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

// UserTypeTabs.propTypes = {
//   userType: PropTypes.string,
//   onUserTypeChange: PropTypes.func,
//   onViewModeToggle: PropTypes.func
// }


export default UserTypeTabs