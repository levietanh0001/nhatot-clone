import { CSSProperties, forwardRef } from "react";

interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

interface IArrowBtn {
  IconComp: IconBaseProps;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties
}

const ArrowBtn = forwardRef<HTMLButtonElement, IArrowBtn>(
  ({ IconComp, className, onClick, style }, ref) => {
    return (
      <button 
        className={className} 
        style={style}
        ref={ref}
        onClick={onClick}
      >
        {IconComp}
      </button>
    );
  }
);

export default ArrowBtn;
