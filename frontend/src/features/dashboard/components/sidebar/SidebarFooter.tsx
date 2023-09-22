import { useContext } from 'react';

import styles from './SidebarFooter.module.scss';
import { DashboardContext } from '@/features/dashboard/contexts/Dashboard.context';


const SidebarFooter = () => {

  const dashboardContext = useContext(DashboardContext);

  return (
    <>
      {/* {!dashboardContext?.collapseSidebar && (
        <div className={styles['footer']}>&copy; 2023, <br/>William Le Admin Dashboard</div>
      )} */}
    </>
  )
}

export default SidebarFooter