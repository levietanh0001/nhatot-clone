import styles from './ActionButtons.module.scss';


const ActionButtons = () => {
  return (
    <div className={styles['action-buttons']}>
      <div className={styles['preview']}>
        <button type='button'>Xem trước</button>
      </div>
      <div className={styles['post-btn']}>
        <button type='button'>Đăng tin</button>
      </div>
    </div>
  )
}

export default ActionButtons