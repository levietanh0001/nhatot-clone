import Modal from "~/components/modal";
import LoginModalContent from "./LoginModalContent";
import { createPortal } from "react-dom";

const LoginModal = ({ show, setShow }) => {
  return (
    <>
      {createPortal(
        <Modal show={show} onModalClose={() => setShow(false)}>
          <LoginModalContent />
        </Modal>,
        document.body
      )}
    </>
  );
};

export default LoginModal;
