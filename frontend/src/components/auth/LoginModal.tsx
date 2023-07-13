import Modal from '~/components/modal';
import LoginContent from './LoginContent';


const LoginModal = ({ show, setShow }) => {
  return (
    <Modal show={show} onModalClose={() => setShow(false)}>
      <LoginContent />
    </Modal>
  );
};

export default LoginModal;
