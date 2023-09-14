import clsx from 'clsx';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardContext } from '~/contexts/dashboard/Dashboard.context';
import Appbar from './Appbar';
import styles from './Dashboard.module.scss';
import Sidebar from './Sidebar';


const Dashboard = () => {

  const dashboardContext = useContext(DashboardContext);

  return (
    <div
      className={clsx(styles['sliding-sidebar-layout'], {
        [styles['retract-sidebar']]: dashboardContext?.collapseSidebar,
      })}
    >
      <Sidebar />

      <div className={styles['main']}>
        <Appbar />

        <div className={styles['content-wrapper']}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};





export default Dashboard;
