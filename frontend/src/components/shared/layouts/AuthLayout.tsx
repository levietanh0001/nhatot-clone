import styles from './AuthLayout.module.scss';

const AuthLayout = ({ AuthComp }) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['auth-comp']}>
        {AuthComp}
      </div>
    </div>
  )
}

export default AuthLayout