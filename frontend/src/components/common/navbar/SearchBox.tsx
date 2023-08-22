import PropTypes from 'prop-types';
import styles from './SearchBox.module.scss';
import ClickAwayListener from '@mui/material/ClickAwayListener';



const SearchBox = (props) => {
  const {
    searchInput,
    onSearchInputChange,
    onSearchInputKeyUp,
    onClearButtonClick,
    onSearchButtonClick,

    results = [],
    showResults,
    setShowResults,
  } = props;

  return (
    <>
      <div className={styles['search-box']}>
        <input
          className={styles['search-input']}
          type='text'
          placeholder='Tìm bất động sản'
          value={searchInput}
          onChange={onSearchInputChange}
          onKeyUp={onSearchInputKeyUp}
        />
        {searchInput && (
          <span className={styles['clear-btn']} onClick={onClearButtonClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='0.75em'
              viewBox='0 0 512 512'
            >
              <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
            </svg>
          </span>
        )}
        {showResults && (
          <ClickAwayListener onClickAway={() => setShowResults(false)}>
            <div className={styles['search-queries']}>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>{result?.postTitle ?? ''}</li>
                ))}
              </ul>
            </div>
          </ClickAwayListener>
        )}
      </div>
      <div className={styles['search-btn']}>
        <button onClick={onSearchButtonClick}>
          <svg
            color='white'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            viewBox='0 0 512 512'
          >
            <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
          </svg>
        </button>
      </div>
    </>
  );
};

SearchBox.propTypes = {
  searchInput: PropTypes.string,
  onSearchInputChange: PropTypes.func,
  onSearchInputKeyUp: PropTypes.func,
  onClearButtonClick: PropTypes.func,
  onSearchButtonClick: PropTypes.func,
  results: PropTypes.array,
  showResults: PropTypes.bool,
  setShowResults: PropTypes.func,
};


export default SearchBox;