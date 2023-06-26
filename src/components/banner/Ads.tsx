import React from 'react'
import Banner from './Banner'
import styles from './Ads.module.scss';


const Ads = () => {
  return (
    <div className={styles['wrapper']}>
      <Banner>Ads</Banner>
    </div>
  )
}

export default Ads