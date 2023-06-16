import React, { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import styles from "./ToggleThemeButton.module.scss";
import clsx from "clsx";


const ToggleThemeButton = () => {

  const [darkTheme, setDarkTheme] = useState<boolean>(
    () => localStorage.getItem("darkTheme") === 'true'? true: false
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
      localStorage.setItem('darkTheme', 'true');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('darkTheme', 'false');
    }
  }, [darkTheme]);

  const handleToggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const classes = clsx(styles["toggle-theme-btn"]);

  return (
    <div>
      <button
        className={classes}
        // disableRipple
        onClick={handleToggleTheme}
      >
        {darkTheme ? (
          <LightModeIcon sx={{ color: "white" }} />
        ) : (
          <DarkModeIcon sx={{ color: "black" }} />
        )}
      </button>
    </div>
  );
};

export default ToggleThemeButton;
