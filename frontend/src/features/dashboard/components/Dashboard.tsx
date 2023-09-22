import clsx from 'clsx';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardContext } from '@/features/dashboard/contexts/Dashboard.context';
import Appbar from '@/features/dashboard/components/appbar/Appbar';
import styles from './Dashboard.module.scss';
import Sidebar from './sidebar/Sidebar';
import LoadingBar from 'react-top-loading-bar';
import { TopLoadingBarContext } from '@/contexts/top-loading-bar/TopLoadingBar.context';


const Dashboard = () => {

  const dashboardContext = useContext(DashboardContext);
  const topLoadingBarContext = useContext(TopLoadingBarContext);

  return (
    <>
      <LoadingBar 
        color='#FF7C05'
        progress={topLoadingBarContext?.progress} 
        onLoaderFinished={() => topLoadingBarContext?.setProgress(0)} 
      />

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
    </>
  );
};





export default Dashboard;
