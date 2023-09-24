import { CSSProperties, ReactNode } from "react";


export interface ICard {
  product: any;
}

// export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
//   children?: ReactNode;
//   size?: string | number;
//   color?: string;
//   title?: string;
//   key?: any;
//   props: any;
// }

export interface IArrowBtn {
  // IconComp: IconBaseProps;
  IconComp: any;
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
