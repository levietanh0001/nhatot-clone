import clsx from 'clsx';
import styles from './UserType.module.scss';


const UserType = ({ product, onUserTypeSelect }) => {

  return (
    <div className={styles['user-role-wrapper']}>
      <h2 className={clsx(styles['title'], 'required')}>Bạn là</h2>
      <div className={styles['user-role']}>
        <ul>
          <li>
            <button
              type='button'
              className={clsx({
                [styles['active']]: product.userType === 'canhan',
              })}
              onClick={() => onUserTypeSelect('canhan')}
            >
              Cá nhân
            </button>
          </li>
          <li>
            <button
              type='button'
              className={clsx({
                [styles['active']]: product.userType === 'moigioi',
              })}
              onClick={() => onUserTypeSelect('moigioi')}
            >
              Môi giới
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserType;
