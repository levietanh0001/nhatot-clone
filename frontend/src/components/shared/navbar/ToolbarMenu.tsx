import clsx from 'clsx';
import styles from './ToolbarMenu.module.scss';
import { IToolbarMenu } from './Navbar.interface';



const ToolbarMenu: React.FC<IToolbarMenu> = (props) => {

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