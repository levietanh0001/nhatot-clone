import styles from './ActionButtons.module.scss';


const ActionButtons = (props) => {

  const { formId, disabledSubmitBtn } = props;

  return (
    <div className={styles['action-buttons']}>
      <div className={styles['preview']}>
        <button type='button'>Xem trước</button>
      </div>
      <div className={styles['post-btn']}>
        <button form={formId} type='submit' disabled={disabledSubmitBtn}>Đăng tin</button>
      </div>
    </div>
  )
}



export default ActionButtons