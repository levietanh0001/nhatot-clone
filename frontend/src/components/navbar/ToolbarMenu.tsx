import { FC } from 'react';

// import SidePanel from '@/components/ui/side-panel/SidePanel';
import { IToolbarMenu } from './navbar.interface';
import SidePanel from '@/components/side-panel/SidePanel';



const ToolbarMenu: FC<IToolbarMenu> = (props) => {

  const { 
    show,
    onCloseButtonClick
  } = props;

  return (
    <>
      <SidePanel
        show={show}
        onCloseButtonClick={onCloseButtonClick}
      ></SidePanel>
      
      {/* <div 
        className={clsx(styles['overlay'], { [styles['opened']]: show })}
        onClick={onCloseButtonClick}
      ></div>
      <div className={clsx(styles['wrapper'], { [styles['opened']]: show } )}>
        <ul>
          <li>Lorem, ipsum</li>
          <li>Lorem, ipsum</li>
          <li>Lorem, ipsum</li>
        </ul>
      </div> */}
    </>
  )
}

export default ToolbarMenu