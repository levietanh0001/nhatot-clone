import clsx from 'clsx';
import { useContext } from 'react';
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
          <div className={styles['content-body']}>
            <Outlet />
          </div>
          <div className={styles['content-footer']}>
            &copy; 2023, William Le Admin Dashboard, nhatot clone
          </div>
        </div>

      </div>

    </div>
  );
};





export default Dashboard;
