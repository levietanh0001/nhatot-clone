import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState } from 'react';
import Fuse from 'fuse.js';

import styles from './AppbarSearchBox.module.scss';
import { Link } from 'react-router-dom';
import { sidebarMenuItems } from '@/features/dashboard/components/sidebar/SidebarAccordionMenu';


const AppbarSearchBox = () => {

  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // searchInputRef.current?.focus();
  }, [showSearchModal]);

  const fuse = new Fuse(sidebarMenuItems, {
    keys: ['id'],
  });

  const results = fuse.search(query);
  const searchResults = results.map(result => result.item);

  console.log({ searchResults });

  const handleSearchModalClose = () => {
    setShowSearchModal(false);
  };

  const handleEscKeyPress = (e) => {

    if (e.key === 'Escape') {
      setShowSearchModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    }
  }, []);

  return (
    <>
      <div
        className={styles['search-box']}
        onClick={() => setShowSearchModal(true)}
      >
        <div className={styles['search-input']}>
          <button className={styles['search-btn']}>
            <span className={styles['search-icon']}>
              <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' /></svg>
            </span>
            <span className='sr-only'>Search</span>
          </button>
          <span className={styles['search-text']}>Tìm kiếm</span>
        </div>
      </div>

      <Modal
        open={showSearchModal}
        onClose={handleSearchModalClose}
      >

        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'max(300px, 40vw)',
          height: '400px',
          bgcolor: '#202020',
          borderRadius: '12px'
        }}>

          <div
            className={styles['modal-search']}
            onClick={() => setShowSearchModal(true)}
          >
            <div className={styles['modal-search-box']}>
              <div className={styles['modal-search-btn']}>
                <button>
                  <span className={styles['modal-search-icon']}>
                    <svg xmlns='http://www.w3.org/2000/svg' height='1.25em' viewBox='0 0 512 512'>{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' /></svg>
                  </span>
                  <span className='sr-only'>Search</span>
                </button>
              </div>
              <div className={styles['modal-search-input']}>
                <input
                  autoFocus
                  ref={searchInputRef}
                  style={{
                    border: 0,
                    padding: '10px'
                  }}
                  type='text' value={query} onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>


          </div>

          <div className={styles['search-results']}>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} onClick={handleSearchModalClose}>
                  <Link className={styles['search-result']} to={result?.href ?? '#'}>
                    <span className={styles['search-result-item']}>
                      {result?.Icon? result.Icon: <svg xmlns='http://www.w3.org/2000/svg' height='0.75em' viewBox='0 0 512 512'>{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z' /></svg>}
                    </span>
                    <span className={styles['search-result-item']}>
                      {result.label}
                    </span>
                    <span className={styles['search-result-item']}>
                      {result?.parentLabel && <>({result?.parentLabel})</>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </Box>


      </Modal>

    </>
  );
};

export default AppbarSearchBox;