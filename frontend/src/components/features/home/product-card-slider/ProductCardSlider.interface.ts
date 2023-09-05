import { CSSProperties } from "react";

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export interface IArrowBtn {
  IconComp: IconBaseProps;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties
}

export interface IProductCardSliderProps {
  slides: any[];
  type: string;
  title?: string;
  className?: string;
  prevEl: string;
  nextEl: string;
  numMore: number;
}
