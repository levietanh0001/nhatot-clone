import clsx from "clsx";
import styles from "./Dashboard.module.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  // const sidebarLayoutRef = useRef<HTMLDivElement>(null);
  // const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {}, [collapse]);

  return (
    <div
      className={clsx(styles["sliding-sidebar-layout"], {
        [styles["retract-sidebar"]]: collapse,
      })}
    >
      <div className={styles["sidebar"]}>
        <div className={styles["header"]}>
          <a
            href=""
            className={clsx(styles["logo"], {
              [styles["hide-logo"]]: collapse,
            })}
          >
            <img
              src="https://static.chotot.com/storage/APP_WRAPPER/logo/PTY_logo_appwrapper..png"
              alt="logo"
              loading="lazy"
            />
          </a>
        </div>

        <div className={styles["menu"]}>Menu</div>

        <div className={styles["footer"]}>Footer</div>
      </div>

      <div className={styles["main"]}>

        <div className={styles["app-bar"]}>
          <div
            className={styles["collapse-btn"]}
            onClick={() => setCollapse(!collapse)}
          >
            <span className={styles["collapse-icon"]}>
              <AiOutlineMenu />
            </span>
            <span className="sr-only">Collapse Sidebar</span>
          </div>
          
        </div>
        <div className={styles["content"]}>Content</div>
      </div>
    </div>
  );
};

export default Dashboard;
