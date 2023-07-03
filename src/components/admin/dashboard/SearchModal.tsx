import styles from './SearchModal.module.scss';
// import './SearchModal.scss';
import Modal from '~/components/modal/Modal';


const SearchModal = ({ show, onModalClose, onClickAway }) => {
  return (
    <Modal
      show={show}
      onModalClose={onModalClose}
      onClickAway={onClickAway}
      className={styles['search-modal']}
    >
      <div className={styles['inner-wrapper']}>
        
      </div>
    </Modal>
  );
};


export default SearchModal;