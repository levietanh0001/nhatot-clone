import styles from './ContentWithStickyBox.module.scss';

const ProductListWithAds = ({ content, stickyBox }) => {
  return (
    <div className="container">
      <div className={styles["content-wrapper"]}>
        <div className={styles["content"]}>
          {content}
        </div>
        <div className={styles["sticky-box"]}>
          {stickyBox}
        </div>
      </div>
    </div>
  );
};

export default ProductListWithAds;
