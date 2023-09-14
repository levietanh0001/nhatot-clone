import { Link } from "react-router-dom";

import styles from './ItemWrapper.module.scss';
import { useContext, useRef } from "react";
import { DashboardContext } from "~/contexts/dashboard/Dashboard.context";
import clsx from "clsx";


const ItemWrapper = (props) => {

  const {
    children,
    href,
    isTitle,
    Icon = <svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>,
    ...rest
  } = props;

  const dashboardContext = useContext(DashboardContext);
  const collapseSidebar = dashboardContext?.collapseSidebar;
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handleIconClick = () => {
    linkRef.current?.click();
  }

  return (
    <>
      <div className={styles['wrapper']}>

        {Icon && 
          <span
            onClick={handleIconClick}
            className={clsx(styles['icon'], {
              [styles['sidebar-collapse']]: collapseSidebar
            })}
          >{Icon}</span>
        }

        <Link
          ref={linkRef}
          className={clsx({
            [styles['link-item']]: !isTitle,
            [styles['title-item']]: isTitle
          })}
          to={href}
          {...rest}
        >
          {!collapseSidebar && <>{children}</>}
        </Link>

        {/* {!collapseSidebar && !isTitle && (
          <Link className={styles['link-item']} to={href} {...rest}>
            {Icon && <span className={styles['icon']}>{Icon}</span>}
            {children}
          </Link>
        )}

        {!collapseSidebar && isTitle && (
          <span className={styles['title-item']} {...rest}>
            {Icon && <span className={styles['icon']}>{Icon}</span>}
            {children}
          </span>
        )} */}

      </div>

    </>
  );
}


export default ItemWrapper;