import ClickAwayListener from "@mui/material/ClickAwayListener";
// import styles from "./Modal.module.scss";
import './Modal.scss';
import { MdClose } from "react-icons/md";

const Modal = ({
  className='',
  children,
  show,
  onModalClose,
  onClickAway = () => {}
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay"></div>
      <ClickAwayListener onClickAway={onClickAway}>
        <div className="modal">
          <button className="close-btn" onClick={onModalClose}>
            <MdClose />
          </button>
          <div className="content">{children}</div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default Modal;
