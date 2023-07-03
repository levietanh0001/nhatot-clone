import { Clear, Done, Search } from '@mui/icons-material';
import { ClickAwayListener, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './ThirdTopNav.module.scss';
import { Link } from 'react-router-dom';

const ThirdTopNav = () => {
  return (
    <div>
      <div className='container'>
        <div className={styles['wrapper']}>
          <div className={styles['search-action']}>
            <RealEstateTypeMenu />
            <SearchBox />
          </div>
          <PostButton />
        </div>
      </div>
    </div>
  );
};

const RealEstateTypeMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [realEstateType, setRealEstateType] = useState<
    'muaban' | 'chothue' | 'duan'
  >('muaban');

  useEffect(() => {
    console.log({ realEstateType });
  }, [realEstateType]);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={styles['dropdown-menu']} onClick={() => setOpen(!open)}>
        <div className={styles['menu-btn']}>
          <span>
            {realEstateType === 'chothue'
              ? 'Cho thuê'
              : realEstateType === 'duan'
              ? 'Dự án'
              : 'Mua bán'}
          </span>
          <svg
            data-type='monochrome'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width='10px'
            height='10px'
            fill='none'
            id='arrowDownB'
          >
            <path
              d='M7.9 156.8l2.8 3.3 214.8 247.2c7.3 8.4 18.2 13.6 30.3 13.6 12.2 0 23.1-5.4 30.3-13.6l214.7-246.7 3.6-4.1c2.7-3.9 4.3-8.7 4.3-13.7 0-13.7-11.7-25-26.2-25h-453c-14.5 0-26.2 11.2-26.2 25 0 5.2 1.7 10.1 4.6 14z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
        {open && (
          <div className={styles['menu-content']}>
            <div
              className={styles['menu-item']}
              onClick={() => setRealEstateType('muaban')}
            >
              <span>Mua bán</span>
              <Done
                sx={{
                  visibility:
                    realEstateType === 'muaban' ? 'initial' : 'hidden',
                }}
              />
            </div>
            <div
              className={styles['menu-item']}
              onClick={() => setRealEstateType('chothue')}
            >
              <span>Cho thuê</span>
              <Done
                sx={{
                  visibility:
                    realEstateType === 'chothue' ? 'initial' : 'hidden',
                }}
              />
            </div>
            <div
              className={styles['menu-item']}
              onClick={() => setRealEstateType('duan')}
            >
              <span>Dự án</span>
              <Done
                sx={{
                  visibility: realEstateType === 'duan' ? 'initial' : 'hidden',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <div className={styles['search-box']}>
      <input
        className={styles['search-input']}
        type='text'
        placeholder='Tìm bất động sản'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput && (
        <span onClick={() => setSearchInput('')}>
          <Clear sx={{ fontSize: '1rem' }} />
        </span>
      )}
      <div className={styles['search-btn']}>
        <IconButton disableRipple sx={{ padding: '5px' }}>
          <Search
            sx={{ stroke: 'white', strokeWidth: 1.3, color: 'white' }}
            fontSize='small'
          />
        </IconButton>
      </div>
    </div>
  );
};

const PostButton = () => {
  return (
    <div className={styles['post-btn']}>
      <Link to='/post' onClick={() => console.log('Đăng tin')}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          data-type='monochrome'
          viewBox='0 0 23.228 23.227'
          width='1em'
          height='1em'
          fill='none'
        >
          <path
            d='M13.288 0a.759.759 0 110 1.518H3.396a1.88 1.88 0 00-1.877 1.877v16.438a1.88 1.88 0 001.877 1.877h16.437a1.88 1.88 0 001.877-1.877V9.488a.76.76 0 011.518 0v10.344a3.399 3.399 0 01-3.395 3.395H3.396A3.4 3.4 0 010 19.832V3.395A3.4 3.4 0 013.396 0zm6.022.21c.273-.1.564-.078.835-.038.276.042.57.205.83.461l.54.54 1.117 1.117c.24.24.394.497.46.766a1.68 1.68 0 01-.4 1.545l-.058.062c-.344.352-.7.707-1.048 1.05l-.631.63-6.33 6.328-.488.493-.038.04c-.307.31-.621.628-.939.932-.153.148-.339.219-.619.236l-3.014.184h-.03a.719.719 0 01-.484-.218c-.158-.156-.249-.358-.24-.543l.135-3.097c.016-.253.095-.443.248-.598l.157-.16.003-.002.082-.081 5.416-5.415a719.16 719.16 0 011.747-1.745l1.68-1.682c.144-.146.27-.275.397-.396a1.8 1.8 0 01.672-.408zm.493 1.428l-.221.219c-.153.151-.306.305-.457.456l-.536.537-8.151 8.152-.086 1.957 1.906-.115.312-.312.226-.224.05-.049.385-.38 8.401-8.403-1.211-1.209a8.233 8.233 0 01-.172-.175l-.027-.029c-.065-.068-.13-.137-.2-.206l-.22-.219z'
            fill='currentColor'
          ></path>
        </svg>
        <span>Đăng tin</span>
      </Link>
    </div>
  );
};

export default ThirdTopNav;
