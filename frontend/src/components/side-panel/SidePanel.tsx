import clsx from 'clsx';
import { FC } from 'react';

import ISidePanel from './SidePanel.interface';
import styles from './SidePanel.module.scss';



const SidePanel: FC<ISidePanel> = (props) => {

  const { 
    show,
    onCloseButtonClick,
    children
  } = props;

  return (
    <>
      <div 
        className={clsx(styles['overlay'], { [styles['opened']]: show })}
        onClick={onCloseButtonClick}
      ></div>
      <div className={clsx(styles['wrapper'], { [styles['opened']]: show } )}>
        {children}
      </div>
    </>
  )
}

export default SidePanel