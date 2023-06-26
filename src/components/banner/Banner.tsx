import React from 'react'
import styles from './Banner.module.scss';


const Banner = ({ children }) => {
  return (
    <div className='container'>
        <div className={styles['inner-wrapper']}>{children}</div>
    </div>
  )
}

export default Banner