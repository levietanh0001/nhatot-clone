import clsx from 'clsx';
import { FC } from 'react';
import styles from './ToolbarMenu.module.scss';
import { IToolbarMenu } from './navbar.interface';



const ToolbarMenu: FC<IToolbarMenu> = (props) => {

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

export default ToolbarMenu