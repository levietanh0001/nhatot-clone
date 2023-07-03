import React from 'react'
import styles from './UserProfileLayout.module.scss';

const UserProfileLayout = ({ userInfo, posts }) => {
  return (
    <div className="container">
      <div className={styles["inner-wrapper"]}>
        <div className={styles["user-info"]}>
          {userInfo}
        </div>
        <div className={styles["posts-wrapper"]}>
          {posts}
        </div>
      </div>
    </div>
  );
}

export default UserProfileLayout