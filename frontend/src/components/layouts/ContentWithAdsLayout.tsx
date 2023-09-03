import React from "react";
import styles from './ContentWithAds.module.scss';

const ProductListWithAds = ({ children }) => {
  return (
    <div className="container">
      <div className={styles["content-wrapper"]}>
        <div className={styles["content"]}>
          {children}
        </div>
        <div className={styles["ads"]}>Ads</div>
      </div>
    </div>
  );
};

export default ProductListWithAds;
