import Modal from '@/components/modal/Modal';


const SearchModal = ({ show, onModalClose, onClickAway }) => {

  return (
    <Modal
      show={show}
      onModalClose={onModalClose}
      onClickAway={onClickAway}
      // onKeyPress={onKeyPress}
      // className={styles['search-modal']}
    >
      
    </Modal>
  );
};


export default SearchModal;