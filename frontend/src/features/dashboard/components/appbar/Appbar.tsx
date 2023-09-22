

import { useContext } from 'react';
import { DashboardContext } from '@/features/dashboard/contexts/Dashboard.context';
import styles from './Appbar.module.scss';
import AppbarActionButtons from './AppbarActionButtons';
import AppbarSearchBox from './AppbarSearchBox';


const Appbar = () => {

  const dashboardContext = useContext(DashboardContext);

  const handleCollapseButtonClick = () => {
    dashboardContext?.setCollapseSidebar(prev => !prev);
  }

  return (
    <div className={styles['app-bar']}>

      <div className={styles['collapse-btn']} onClick={handleCollapseButtonClick}>
        <span className={styles['collapse-icon']}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
        </span>
        <span className='sr-only'>Collapse Sidebar</span>
      </div>

      <span className={styles['title']}>Admin Dashboard</span>

      {/* fuse.js */}
      <AppbarSearchBox />
      <AppbarActionButtons />

    </div>
  );
};


// const SearchBox = () => {
//   const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

//   const handleSearchModalClose = () => {
//     setShowSearchModal(false);
//   };

//   const handleEscKeyPress = (e) => {

//     if(e.key === 'Escape') {
//       setShowSearchModal(false);
//     }
//   }

//   useEffect(() => {
    
//     document.addEventListener('keydown', handleEscKeyPress);

//     return () => {
//       document.removeEventListener('keydown', handleEscKeyPress);
//     }
//   }, []);

//   return (
//     <>
//       <div
//         className={styles['search-box']}
//         onClick={() => setShowSearchModal(true)}
//       >
//         <div className={styles['search-input']}>
//           <button className={styles['search-btn']}>
//             <span className={styles['search-icon']}>
//               <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
//             </span>
//             <span className='sr-only'>Search</span>
//           </button>
//           <span className={styles['search-text']}>Tìm kiếm</span>
//         </div>
//       </div>

//       <Modal
//         open={showSearchModal}
//         onClose={handleSearchModalClose}
//       >
//         <Box sx={{
//           position: 'absolute' as 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           height: 'auto',
//           bgcolor: 'background.paper',
//           p: 4,
//           borderRadius: '4px'
//         }}>
//         </Box>
//       </Modal>
      
//       {/* <SearchModal
//         show={showSearchModal}
//         onModalClose={handleSearchModalClose}
//         onClickAway={handleSearchModalClose}
//         // onKeyPress={handleKeyPress}
//       /> */}

//     </>
//   );
// };



export default Appbar;