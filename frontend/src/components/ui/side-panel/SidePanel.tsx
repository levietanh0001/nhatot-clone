import clsx from 'clsx';
import { FC } from 'react';
import styles from './SidePanel.module.scss';
import ISidePanel from './SidePanel.interface';



const SidePanel: FC<ISidePanel> = (props) => {

  const { 
    show,
    onCloseButtonClick
  } = props;

  return (
    <>
      <div 
        className={clsx(styles['overlay'], { [styles['opened']]: show })}
        onClick={onCloseButtonClick}
      ></div>
      <div className={clsx(styles['wrapper'], { [styles['opened']]: show } )}>
        <ul>
          {/* <li><ToolbarMenuButton onClick={onCloseButtonClick} /></li> */}
          <li>Lorem, ipsum</li>
          <li>Lorem, ipsum</li>
          <li>Lorem, ipsum</li>
        </ul>
      </div>
    </>
  )
}

export default SidePanel