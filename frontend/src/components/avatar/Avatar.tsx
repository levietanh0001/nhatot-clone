import styles from './Avatar.module.scss';


const Avatar = ({
  avatarWrapperClass = styles['avatar-wrapper'],
  statusIconClass = styles['status-icon'],
  name = 'Le Viet Anh'
}) => {
  return (
    <div className={avatarWrapperClass}>
      {/* <img src="https://ui-avatars.com/api/?name=Le+Viet+Anh" alt="avatar image" /> */}
      <span className={styles["status-icon"]}></span>
    </div>
  )
}

export default Avatar