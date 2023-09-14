import clsx from 'clsx'

import styles from './SidebarHeader.module.scss';
import { useContext } from 'react';
import { DashboardContext } from '~/contexts/dashboard/Dashboard.context';


const SidebarHeader = () => {

  const dashboardContext = useContext(DashboardContext);
  const collapseSidebar = dashboardContext?.collapseSidebar;

  return (
    <div className={styles['header']}>
      <a
        href='/'
        className={clsx(styles['logo'], {
          [styles['hide-logo']]: collapseSidebar,
        })}
      >
        <img
          src='https://static.chotot.com/storage/APP_WRAPPER/logo/PTY_logo_appwrapper..png'
          alt='logo'
          loading='lazy'
        />
      </a>
    </div>
  )
}

export default SidebarHeader