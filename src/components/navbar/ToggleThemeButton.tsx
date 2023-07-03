import { useEffect, useState } from "react";
import styles from "./ToggleThemeButton.module.scss";
import { FaRegSun, FaRegMoon } from 'react-icons/fa';


const ToggleThemeButton = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(() =>
    localStorage.getItem("darkTheme") === "true" ? true : false
  );

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkTheme) {
      document.documentElement.classList.add("dark");
      setDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkTheme", "true");
      setDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkTheme", "false");
      setDarkTheme(false);
    }
  }, [darkTheme]);

  const handleToggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <>
      <button 
        className={styles["toggle-theme-btn"]}
        onClick={handleToggleTheme}
      >
        <span className={styles["icon-wrapper"]}>
          {darkTheme ? (
            <FaRegSun />
          ) : (
            <FaRegMoon />
          )}
        </span>
        <span className="sr-only">Notifications</span>
      </button>

      {/* <button
        className={styles["toggle-theme-btn"]}
        onClick={handleToggleTheme}
        style={{
          backgroundColor: "transparent",
          border: 0,
          padding: 0,
        }}
      >
        {darkTheme ? (
          <LightModeIcon sx={{ color: "white", border: 0 }} />
        ) : (
          <DarkModeIcon sx={{ color: "white", border: 0 }} />
        )}
      </button> */}
    </>
  );
};

export default ToggleThemeButton;
