import Modal from '@/components/modal';
import { LoginContent } from '@/features/auth/components';

const LoginModal = ({ show, setShow }) => {
  return (
    <Modal show={show} onModalClose={() => setShow(false)}>
      <LoginContent />
    </Modal>
  );
};

export default LoginModal;
