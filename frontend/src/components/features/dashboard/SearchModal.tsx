import styles from './SearchModal.module.scss';
import Modal from '~/components/ui/modal/Modal';


const SearchModal = ({ show, onModalClose, onClickAway }) => {
  return (
    <Modal
      show={show}
      onModalClose={onModalClose}
      onClickAway={onClickAway}
      // className={styles['search-modal']}
    >
      
    </Modal>
  );
};


export default SearchModal;