import clsx from "clsx";
import styles from "./UserProfile.module.scss";
import PostList from "./PostList";

const UserProfile = () => {
  return (
    <div className={styles["user-profile-wrapper"]}>
      <ProductStatusTabs />
      <PostList />
    </div>
  );
};

const ProductStatusTabs = () => {
  return (
    <>
      <div className={styles["tab"]}>
        <button className={clsx(styles["tab-btn"], styles["active"])}>
          Đang hiển thị (5)
        </button>
        <button className={styles["tab-btn"]}>Đã bán (1)</button>
      </div>
    </>
  );
};

export default UserProfile;
