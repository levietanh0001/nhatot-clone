export interface IDropdownMenu {
  children?: React.ReactNode;
  wrapperClass?: string;
  menuBtnClass?: string;
  menuContentClass?: string;
  menuBtn?: JSX.Element;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDropdownMenuItem {

  href?: string;
  Icon?: JSX.Element;
  label?: string;
  isTitle?: boolean;
  
  wrapperClass?: string;
  iconClass?: string;
  labelClass?: string;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
  show?: boolean;
}