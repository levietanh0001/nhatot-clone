import Modal from '~/components/common/modal';
import { LoginContent } from '~/components/features/auth';


const LoginModal = ({ show, setShow }) => {
  return (
    <Modal show={show} onModalClose={() => setShow(false)}>
      <LoginContent />
    </Modal>
  );
};

export default LoginModal;
