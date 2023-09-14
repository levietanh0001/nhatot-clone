import { useContext, useEffect } from 'react';

import styles from './Sidebar.module.scss';
import { DashboardContext } from '~/contexts/dashboard/Dashboard.context';
import useWindowDimensions from '~/hooks/window.hook';

import SidebarAccordionMenu from "./SidebarAccordionMenu";
import SidebarFooter from './SidebarFooter';
import SidebarHeader from "./SidebarHeader";
import SidePanel from '~/components/ui/side-panel/SidePanel';


const Sidebar = () => {

  const { width } = useWindowDimensions();
  const dashboardContext = useContext(DashboardContext);

  useEffect(() => {

    if(width < 992) {
      dashboardContext?.setCollapseSidebar(true);
    } else {
      dashboardContext?.setCollapseSidebar(false);
    }

  }, [width]);
  
  return (
    <div className={styles['sidebar']}>

      {width < 420 && (
        <SidePanel
          show={!dashboardContext?.collapseSidebar}
          onCloseButtonClick={() => dashboardContext?.setCollapseSidebar(true)}
        />
      )}

      <SidebarHeader />
      <SidebarAccordionMenu />
      <SidebarFooter />

    </div>
  );
};


export default Sidebar;