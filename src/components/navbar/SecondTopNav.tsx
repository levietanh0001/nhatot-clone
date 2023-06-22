import { Menu, Person } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./SecondTopNav.module.scss";

const SecondTopNav = () => {
  return (
    <nav aria-label="second top nav bar">
      <div className="container">
        <div className={styles["wrapper"]}>
          <div className={styles["toolbar-menu"]}>
            <Menu />
          </div>
          <Logo />
          <Toolbar />
        </div>
      </div>
    </nav>
  );
};

const DropdownMenu = () => {
  const [isTaikhoanOpen, setTaikhoanOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log({ isTaikhoanOpen });
  }, [isTaikhoanOpen]);

  return (
    <ClickAwayListener onClickAway={() => setTaikhoanOpen(false)}>
      <div className={clsx(styles["action"], styles["dropdown-menu"])}>
        <div
          className={styles["menu-btn"]}
          onClick={() => setTaikhoanOpen(!isTaikhoanOpen)}
          onBlur={() => setTaikhoanOpen(false)}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.99935 3.08366C6.17938 3.08366 3.08268 6.18036 3.08268 10.0003C3.08268 13.8203 6.17938 16.917 9.99935 16.917C13.8193 16.917 16.916 13.8203 16.916 10.0003C16.916 6.18036 13.8193 3.08366 9.99935 3.08366ZM1.91602 10.0003C1.91602 5.53602 5.53505 1.91699 9.99935 1.91699C14.4637 1.91699 18.0827 5.53602 18.0827 10.0003C18.0827 14.4646 14.4637 18.0837 9.99935 18.0837C5.53505 18.0837 1.91602 14.4646 1.91602 10.0003Z"
              fill="#222222"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.99935 6.83366C8.59562 6.83366 7.45768 7.9716 7.45768 9.37533C7.45768 10.779 8.59562 11.917 9.99935 11.917C11.4031 11.917 12.541 10.779 12.541 9.37533C12.541 7.9716 11.4031 6.83366 9.99935 6.83366ZM6.29102 9.37533C6.29102 7.32727 7.95129 5.66699 9.99935 5.66699C12.0474 5.66699 13.7077 7.32727 13.7077 9.37533C13.7077 11.4234 12.0474 13.0837 9.99935 13.0837C7.95129 13.0837 6.29102 11.4234 6.29102 9.37533Z"
              fill="#222222"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.0005 13.0837C9.06941 13.0837 8.15655 13.3415 7.36306 13.8285C6.56957 14.3156 5.92644 15.0128 5.50496 15.843C5.35912 16.1303 5.00802 16.2449 4.72075 16.0991C4.43349 15.9532 4.31884 15.6021 4.46469 15.3149C4.98369 14.2926 5.77564 13.434 6.75275 12.8342C7.72986 12.2345 8.85396 11.917 10.0005 11.917C11.1469 11.917 12.271 12.2345 13.2481 12.8342C14.2253 13.434 15.0172 14.2926 15.5362 15.3149C15.6821 15.6021 15.5674 15.9532 15.2801 16.0991C14.9929 16.2449 14.6418 16.1303 14.4959 15.843C14.0745 15.0128 13.4313 14.3156 12.6378 13.8285C11.8444 13.3415 10.9315 13.0837 10.0005 13.0837Z"
              fill="#222222"
            ></path>
          </svg>
          <span>Tài khoản</span>
          <svg
            data-type="monochrome"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="10px"
            height="10px"
            fill="none"
            id="arrowDownB"
          >
            <path
              d="M7.9 156.8l2.8 3.3 214.8 247.2c7.3 8.4 18.2 13.6 30.3 13.6 12.2 0 23.1-5.4 30.3-13.6l214.7-246.7 3.6-4.1c2.7-3.9 4.3-8.7 4.3-13.7 0-13.7-11.7-25-26.2-25h-453c-14.5 0-26.2 11.2-26.2 25 0 5.2 1.7 10.1 4.6 14z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        {isTaikhoanOpen && (
          <div className={clsx(styles["menu-content"])}>
            <a href="#">
              <Person />
              <span>Đăng nhập/ Đăng ký</span>
            </a>

            <div className={styles["menu-title"]}>
              <span>Quản lý đơn hàng</span>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/svg/escrow_buy_orders.svg"
                  alt="Đơn mua"
                />
                <span>Đơn mua</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/svg/escrow-orders.svg"
                  alt="Đơn bán"
                />
                <span>Đơn bán</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/svg/escrow.svg"
                  alt="Ví bán hàng"
                />
                <span>Ví bán hàng</span>
              </a>
            </div>

            <div className={styles["menu-title"]}>
              <span>Tiện ích</span>
            </div>

            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/svg/menu-saved-ad.svg"
                  alt="Tin đăng đã lưu"
                />
                <span>Tin đăng đã lưu</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/svg/menu-saved-search.svg"
                  alt="Tìm kiếm đã lưu"
                />
                <span>Tìm kiếm đã lưu</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/svg/menu-rating-management.svg"
                  alt="Đánh giá từ tôi"
                />
                <span>Đánh giá từ tôi</span>
              </a>
            </div>

            <div className={styles["menu-title"]}>
              <span>Dịch vụ trả phí</span>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  width="30"
                  height="30"
                  src="https://st.chotot.com/storage/chotot-icons/svg/ct-coin.svg"
                  alt="Đồng Tốt"
                />
                <span>Đồng tốt</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  width="30"
                  height="30"
                  src="https://st.chotot.com/storage/chotot-icons/svg/sub-pro.svg"
                  alt="Gói PRO"
                />
                <span>Gói Pro</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  width="30"
                  height="30"
                  src="https://st.chotot.com/storage/chotot-icons/svg/circle-list.svg"
                  alt="Lịch sử giao dịch"
                />
                <span>Lịch sử giao dịch</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  width="30"
                  height="30"
                  src="https://st.chotot.com/storage/chotot-icons/svg/circle-plus.svg"
                  alt="Tạo Cửa hàng/Chuyên trang"
                />
                <span>Tạo cửa hàng/Chuyên trang</span>
              </a>
            </div>

            <div className={styles["menu-title"]}>
              <span>Ưu đãi, khuyến mãi</span>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://storage.googleapis.com/static-chotot-com/storage/icons/svg/reward-icon.svg"
                  width={30}
                  height={30}
                  alt="Chợ Tốt ưu đãi"
                />
                <span>Chợ tốt ưu đãi</span>
              </a>
            </div>

            <div className={styles["menu-title"]}>
              <span>Khác</span>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://storage.googleapis.com/static-chotot-com/storage/icons/svg/setting.svg"
                  alt="Cài đặt tài khoản"
                  width={30}
                  height={30}
                />
                <span>Cài đặt tài khoản</span>
              </a>
            </div>
            <div className={styles["menu-item"]}>
              <a href="#">
                <img
                  src="https://storage.googleapis.com/static-chotot-com/storage/icons/svg/help.svg"
                  alt="Trợ giúp"
                  width={30}
                  height={30}
                />
                <span>Trợ giúp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

const Toolbar = () => {
  return (
    <div className={styles["toolbar"]}>
      <div className={styles["action"]}>
        <a href="#" rel="nofollow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-type="monochrome"
            viewBox="0 0 26.272 24.4"
            width="1em"
            height="1em"
            fill="none"
          >
            <g fill="currentColor">
              <path d="M7.93 10.791c1.502.355 3.04.533 4.582.528 2.287 0 4.535-.382 6.17-1.05.974-.465.557-.225 1.246-.702l.528-.464c.369.736.992 1.27 1.508 1.712l.22.191a7.999 7.999 0 01.976 3.8c0 4.424-3.738 8.162-8.162 8.162-4.424 0-8.162-3.738-8.162-8.162a7.99 7.99 0 011.095-4.015zm-5.464-4.9l.232-.141a8.086 8.086 0 01-.217-.403l-.017-.032a10.24 10.24 0 01-.448-1.03 6.989 6.989 0 002.028.831 1.23 1.23 0 001.382-.646l.254-.145c1.734-.037 3.48-.766 5.172-1.471 1.276-.532 2.48-1.034 3.55-1.192.67-.1 1.308-.15 1.892-.15 1.63 0 2.86.386 3.552 1.114.464.489.68 1.129.64 1.9-.025.51.267.981.734 1.186.438.19.972.097 1.32-.226.126.099.27.172.427.216.413.115.652.216.8.338.16.13.314.364.503.76.876 1.832.478 2.79-.181 4.376l-.018.045c-.126-.435-.291-.77-.587-1.054a11.595 11.595 0 00-.546-.488c-.516-.442-1.05-.898-1.231-1.458A1.222 1.222 0 0019.6 7.82l-.385.399c-.825.547-.582.377-.98.615-.04.018-.08.035-.12.05-1.46.597-3.503.94-5.603.94-1.59 0-3.253-.195-4.567-.534a1.236 1.236 0 00-.937.137c-.232.14-.34.38-.633 1.022l-.143.313c-.19-.714-.428-1.595-.605-2.055a1.228 1.228 0 00-.52-.614c-.8-.473-1.456-1.03-1.952-1.659a4.43 4.43 0 01-.077-.1l-.076-.106a6.617 6.617 0 01-.299-.472l-.191.11.187-.114-.233.14zm23.154.264c-.213-.448-.417-.783-.66-1.045l.62.31-.62-.883c-.345-.49-.967-.77-1.708-.77-.463 0-.914.107-1.274.295-.06-.958-.417-1.802-1.048-2.466C19.634.232 17.25-.271 14.183.182c-1.254.185-2.602.747-3.906 1.291-1.6.667-3.255 1.357-4.734 1.357-1.92-.205-2.354-.722-3.372-1.783l.086.795.009.065c.039.248.15.516.327.793.069.11.147.218.232.325-.886-.538-1.602-1.343-2.17-2.43L.345 0 .153.644C-.32 2.23.387 4.523 1.13 5.993l.02.046.005.005c.08.156.164.311.252.464l.084.14.014.023c.085.142.175.28.27.416l.016.022c.06.086.124.17.189.253.593.75 1.36 1.413 2.283 1.97.895 2.367 1.099 4.39 1.145 5.17-.004.1-.005.202-.005.304 0 5.2 4.394 9.594 9.594 9.594 5.2 0 9.595-4.394 9.595-9.594 0-.133-.003-.265-.01-.396.21-1.031.555-1.859.888-2.66.704-1.696 1.312-3.16.15-5.595z" />
              <path d="M11.84 14.937a1.052 1.052 0 000-2.1 1.052 1.052 0 000 2.1m6.547 0a1.052 1.052 0 000-2.1 1.052 1.052 0 000 2.1m-3.328 5.912c1.97 0 3.767-.987 4.69-2.576a.718.718 0 00-1.24-.72c-.667 1.149-1.99 1.863-3.45 1.863-1.462 0-2.784-.714-3.451-1.863a.711.711 0 00-.436-.332.717.717 0 00-.803 1.052c.922 1.589 2.72 2.576 4.69 2.576" />
            </g>
          </svg>
          <span>Quản lý tin</span>
        </a>
      </div>

      <div className={clsx(styles["action"], styles["chat"])}>
        <a href="#" rel="nofollow">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            type="monochrome"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.54315 14.1884C5.39767 14.1884 5.26041 14.2418 5.15737 14.3383L3.32586 16.0491V14.6989C3.32586 14.4174 3.08144 14.1884 2.78111 14.1884H2.38803C2.36129 14.1884 2.31155 14.1858 2.19112 14.1736C1.82179 14.1247 1.09173 13.9107 1.09173 12.9782V6.22901C1.09173 6.10509 1.128 5.01668 2.38803 5.01668H14.7521C14.9692 5.01964 16.0531 5.0912 16.0531 6.22674V6.31523C16.0531 6.59553 16.2977 6.82365 16.5982 6.82365C16.8987 6.82365 17.1432 6.59553 17.1432 6.31523V6.22674C17.1432 4.46549 15.5807 4 14.7546 4H2.38803C0.499112 4 0 5.45668 0 6.22691V12.9782C0 14.637 1.38289 15.1475 2.23432 15.2021V17.2775C2.23432 17.4817 2.36578 17.6662 2.57448 17.7495C2.64011 17.7735 2.70968 17.7858 2.7813 17.7858C2.92716 17.7858 3.06798 17.7306 3.16597 17.6364L5.92913 15.0574C6.14138 14.8591 6.14119 14.5362 5.92913 14.3381C5.82572 14.2416 5.68864 14.1884 5.54315 14.1884ZM23.5163 8.14113C23.219 7.76134 22.6472 7.30859 21.6123 7.30859H9.22929C8.40329 7.30859 6.84106 7.77461 6.84106 9.53777V16.4159C6.84106 18.1793 8.40329 18.6453 9.22929 18.6453H11.9921C12.2924 18.6453 12.537 18.417 12.537 18.1367C12.537 17.8551 12.2924 17.6261 11.9921 17.6261H9.22929C9.09651 17.6261 7.93298 17.5921 7.93298 16.4159V9.53795C7.93298 8.36192 9.09651 8.32789 9.22929 8.32789H21.6123C22.8295 8.32789 22.9076 9.3381 22.911 9.53795V16.4161C22.911 17.5923 21.7452 17.6263 21.6123 17.6263H16.5987C16.2982 17.6263 16.0536 17.8553 16.0536 18.1368V19.4874L14.22 17.7754C14.0072 17.578 13.6613 17.5778 13.449 17.7755C13.3456 17.8721 13.2886 17.9998 13.2888 18.1358C13.2888 18.2716 13.3456 18.3992 13.449 18.4953L16.2116 21.0741C16.315 21.1708 16.4525 21.224 16.5985 21.224C16.6688 21.224 16.738 21.2115 16.8076 21.1853C17.0116 21.1045 17.1436 20.92 17.1436 20.7153V18.6453H21.6121C22.4381 18.6453 24.0003 18.1793 24.0003 16.4159V9.53795C24.0003 9.35521 23.9655 8.71449 23.5163 8.14113ZM20.6924 11.1439H10.1508C9.84935 11.1439 9.604 10.9156 9.604 10.6352C9.604 10.354 9.84935 10.125 10.1508 10.125H20.6924C20.9929 10.125 21.2373 10.354 21.2373 10.6352C21.2373 10.9156 20.9929 11.1439 20.6924 11.1439ZM10.1508 13.4854H20.6924C20.9929 13.4854 21.2373 13.2573 21.2373 12.977C21.2373 12.6967 20.9929 12.4688 20.6924 12.4688H10.1508C9.84935 12.4688 9.604 12.6967 9.604 12.977C9.604 13.2573 9.84935 13.4854 10.1508 13.4854ZM20.6924 15.8311H10.1508C9.84935 15.8311 9.604 15.603 9.604 15.3228C9.604 15.0415 9.84935 14.8125 10.1508 14.8125H20.6924C20.9929 14.8125 21.2373 15.0415 21.2373 15.3228C21.2373 15.603 20.9929 15.8311 20.6924 15.8311Z"
              fill="#222222"
            ></path>
          </svg>
          <span>Chat</span>
        </a>
      </div>

      <div className={styles["action"]}>
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-type="monochrome"
            viewBox="0 0 15.706 19.271"
            width="1em"
            height="1em"
            fill="none"
          >
            <path
              d="M13.033 7.739l-.03 8.149H2.705l-.03-8.148c0-2.953 2.226-5.181 5.179-5.183 2.952.002 5.18 2.23 5.18 5.182zm-3.775 9.296c-.194.635-.75 1.066-1.404 1.067-.654-.001-1.21-.432-1.404-1.067zm5.88-1.147h-.947l-.01-8.17c0-3.381-2.409-6-5.746-6.277V.568c0-.37-.292-.566-.582-.568-.288.002-.58.198-.58.568v.873c-3.337.276-5.746 2.896-5.746 6.277l-.01 8.17H.568c-.373 0-.568.293-.568.584 0 .29.195.584.568.584H5.26a2.642 2.642 0 002.593 2.215 2.641 2.641 0 002.593-2.215h4.692c.373 0 .568-.294.568-.584s-.195-.584-.568-.584z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Thông báo</span>
        </a>
      </div>

      <DropdownMenu />
    </div>
  );
};

const Logo = () => {
  return (
    <div className={styles["logo"]}>
      <a href="#">
        <picture>
          <source
            type="image/webp"
            src="https://static.chotot.com/storage/default_images/pty/nhatot-logo.webp"
          />
          <img
            src="https://static.chotot.com/storage/default_images/pty/nhatot-logo.png"
            alt="Chợ Tốt"
          />
        </picture>
      </a>
    </div>
  );
};

export default SecondTopNav;
