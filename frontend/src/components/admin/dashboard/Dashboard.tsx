import clsx from "clsx";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { HiLanguage } from "react-icons/hi2";

import styles from "./Dashboard.module.scss";
import ToggleThemeButton from "~/components/navbar/ToggleThemeButton";
import Avatar from "~/components/avatar/Avatar";
import SidebarAccordionMenu from "./SidebarAccordionMenu";
import SearchModal from './SearchModal';


const Dashboard = () => {
  const [collapse, setCollapse] = useState<boolean>(false);

  const handleSidebarCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div
      className={clsx(styles["sliding-sidebar-layout"], {
        [styles["retract-sidebar"]]: collapse,
      })}
    >
      <Sidebar collapse={collapse} onSidebarCollapse={handleSidebarCollapse} />

      <div className={styles["main"]}>
        <Appbar collapse={collapse} onSidebarCollapse={handleSidebarCollapse} />
        <Content />
      </div>
    </div>
  );
};

const Content = () => {
  return <div className={styles["content"]}>Content</div>;
};

const Appbar = ({ collapse, onSidebarCollapse }) => {
  return (
    <div className={styles["app-bar"]}>
      <div className={styles["collapse-btn"]} onClick={onSidebarCollapse}>
        <span className={styles["collapse-icon"]}>
          <AiOutlineMenu />
        </span>
        <span className="sr-only">Collapse Sidebar</span>
      </div>
      <span className={styles["title"]}>Admin Dashboard</span>

      <SearchBox />

      <div className={styles["actions"]}>
        <div className={styles["action"]}>
          <LanguageBtn />
        </div>
        <div className={styles["action"]}>
          <NotificationBtn />
        </div>
        <div className={styles["action"]}>
          <ToggleThemeButton />
        </div>
        <div className={styles["action"]}>
          <Avatar />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ collapse, onSidebarCollapse }) => {
  return (
    <div className={styles["sidebar"]}>
      <div className={styles["header"]}>
        <a
          href="/"
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

      <SidebarAccordionMenu
        collapse={collapse}
        onSidebarCollapse={onSidebarCollapse}
      />

      <div className={styles["footer"]}>Footer</div>
    </div>
  );
};

const LanguageBtn = () => {
  return (
    <button className={styles["language-btn"]}>
      <span className={styles["icon-wrapper"]}>
        <HiLanguage />
      </span>
      <span className="sr-only">Language Settings</span>
    </button>
  );
};

const NotificationBtn = () => {
  return (
    <button className={styles["notification-btn"]}>
      <span className={styles["icon-wrapper"]}>
        <AiOutlineBell />
      </span>
      <span className="sr-only">Notifications</span>
    </button>
  );
};

const SearchBox = () => {
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  const handleSearchModalClose = () => {
    setShowSearchModal(false);
  };

  return (
    <>
      <div
        className={styles["search-box"]}
        onClick={() => setShowSearchModal(true)}
      >
        <div className={styles["search-input"]}>
          <button className={styles["search-btn"]}>
            <span className={styles["search-icon"]}>
              <AiOutlineSearch />
            </span>
            <span className="sr-only">Search</span>
          </button>
          <span className={styles["search-text"]}>Tìm kiếm</span>
        </div>
      </div>

      <SearchModal
        show={showSearchModal}
        onModalClose={handleSearchModalClose}
        onClickAway={handleSearchModalClose}
      />

    </>
  );
};



export default Dashboard;
