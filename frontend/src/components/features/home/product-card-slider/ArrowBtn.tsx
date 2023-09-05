import { forwardRef } from "react";
import { IArrowBtn } from "./ProductCardSlider.interface";


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
