import { useState } from 'react';

import styles from './TopNav.module.scss';
import FirstTopNav from './FirstTopNav';
import SecondTopNav from './SecondTopNav';
import ThirdTopNav from './ThirdTopNav';
import ToolbarMenu from './ToolbarMenu';

const TopNav = () => {

  const [showToolbarMenu, setShowToolbarMenu] = useState<boolean>(false);

  // useConsoleLogOnChange({ showToolbarMenu });

  return (
    <>
      <ToolbarMenu 
        show={showToolbarMenu}
        onCloseButtonClick={() => setShowToolbarMenu(false)}
      />
      <div className={styles['wrapper']}>
        <div className={styles['inner-wrapper']}>
          <FirstTopNav />
          <SecondTopNav
            handleToolbarMenuIconClick={() => setShowToolbarMenu((prev) => !prev)}
          />
          <ThirdTopNav />
          <div className='nav-spacer'></div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
