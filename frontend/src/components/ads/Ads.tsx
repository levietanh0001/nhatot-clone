import styles from "./Ads.module.scss";

const Ads = () => {
  return (
    <div className={styles["outer-wrapper"]}>
      <div className="container">
        <div className={styles["inner-wrapper"]}>Ads</div>
      </div>
    </div>
  );
};

export default Ads;
