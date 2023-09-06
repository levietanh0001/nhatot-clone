import { IDropdownMenuItem } from './DropdownMenu.interface';
import styles from './DropdownMenuItem.module.scss';
import clsx from 'clsx';



const DropdownMenuItem: React.FC<IDropdownMenuItem> = (props) => {

  const { 
    wrapperClass = '',
    iconClass = '',
    labelClass = '',

    href = '#',
    Icon = <></>,
    label = '',

    isTitle = false,
    onClick,

    show = true,
    ...rest
  } = props;

  if(!show) {
    return null;
  }
  
  return (
    <div 
      className={clsx({ 
        [styles['menu-item']]: !isTitle, 
        [styles['title-item']]: isTitle 
      }, wrapperClass)}
      onClick={onClick}
    >

      {isTitle && (
        <a href={href}>
          <span className={clsx(styles['title-name'], labelClass)}>{label}</span>
        </a>
      )}

      {!isTitle && (
        <a href={href}>
          <span className={clsx(styles['item-icon'], iconClass)}>{Icon}</span>
          <span className={clsx(styles['item-label'], labelClass)}>{label}</span>
        </a>
      )}

    </div>
  );
};


export default DropdownMenuItem;
