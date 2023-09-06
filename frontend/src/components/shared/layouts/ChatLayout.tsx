import styles from './ChatLayout.module.scss';


const ChatLayout = ({ ContactPanel, ChatPanel }) => {
  return (
    <div className='container'>
      <div className={styles['inner-wrapper']}>
        <div className={styles["contact-panel"]}>
          {ContactPanel}
        </div>
        <div className={styles["chat-panel"]}>
          {ChatPanel}
        </div>
      </div>
    </div>
  )
}

export default ChatLayout