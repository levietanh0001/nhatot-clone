import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';

import styles from './DropdownMenu.module.scss';


interface IDropdownMenu {
  children?: React.ReactNode;
  wrapperClass?: string;
  menuBtnClass?: string;
  menuContentClass?: string;
  menuBtn?: JSX.Element;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenu: React.FC<IDropdownMenu> = (props) => {

  const {
    children,
    wrapperClass = '',
    menuBtnClass = '',
    menuContentClass = '',

    menuBtn,
    show, 
    setShow
  } = props;

  return (
    <ClickAwayListener onClickAway={() => setShow(false)}>

      <div className={clsx(styles['dropdown-menu'], wrapperClass)}>

        <div className={clsx(styles['menu-btn'], menuBtnClass)} onClick={() => setShow(!show)} onBlur={() => setShow(false)}>
          {menuBtn}
        </div>

        {show && (
          <div className={clsx(styles['menu-content'], menuContentClass)}>{children}</div>
        )}

      </div>

    </ClickAwayListener>
  );
};

export default DropdownMenu;
