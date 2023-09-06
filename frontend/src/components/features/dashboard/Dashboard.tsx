import clsx from "clsx";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";

import styles from "./Dashboard.module.scss";
import ToggleThemeButton from "~/components/shared/navbar/ToggleThemeButton";
import Avatar from "~/components/shared/avatar/Avatar";
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
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9h2.3c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z" /></svg>
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
