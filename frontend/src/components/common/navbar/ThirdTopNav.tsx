import PropTypes from 'prop-types';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './ThirdTopNav.module.scss';
import { ProductTypeType } from '~/interfaces/product.interface';
import { useSearchProducts } from '~/hooks/product.hook';
import { useDebounceCallback } from '~/hooks/useDebounce.hook';
import { useDebounce } from 'usehooks-ts';
import PostButton from './PostButton';
import SearchFilterMenu from './SearchFilterMenu';
import SearchBox from './SearchBox';


const ThirdTopNav = () => {

  // khac -> duan (type)
  // khac -> all (category)
  // search by postTitle, receive postTitle as results, then get products by more criteria

  const [productType, setProductType] = useState<string>('muaban');
  const [searchInput, setSearchInput] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const query = String(useDebounce(searchInput, 500)).trim() ?? '';
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    isError: isSearchResultsError,
    error
  } = useSearchProducts({ query });

  useEffect(() => {
    console.log({ searchResults, error });
  }, [searchResults, error]);

  useEffect(() => {
    if (!isSearchResultsLoading && !isSearchResultsError) {
      setFilteredData(
        // searchResults
        searchResults.filter((item) => {
          const type = item?.type === 'canban'? 'can ban': item?.type === 'chothue'? 'cho thue': 'du an';
          const category =  item?.category === 'canhochungcu'? 'can ho chung cu': 
                            item?.category === 'nhao'? 'nha o': 'khac';
          const result = `${type}${category}${item?.postTitle}`;
          return result.toLowerCase().includes(searchInput.toLowerCase());
        })
      );
    }
  }, [isSearchResultsLoading]);

  // useDebounceCallback(() => {
  //   setFilteredData(
  //     searchResults
      // searchResults.filter((item) => item.postTitle.toLowerCase().includes(searchInput.toLowerCase()))
  //   );
  // }, [searchInput, searchResults], 800);

  useEffect(() => {
    if (!searchInput) {
      setShowResults(Boolean(searchInput));
    } else {
      setShowResults(Boolean(searchInput));
    }
  }, [searchInput]);

  const handleSearchButtonClick = () => {};

  return (
    <div className='container'>
      <div className={styles['wrapper']}>
        <div className={styles['search-action']}>
          <SearchFilterMenu
            productType={productType}
            setProductType={setProductType}
          />
          <SearchBox
            searchInput={searchInput}
            // onSearchInputKeyUp={(e) => setSearchInput(e.target.value)}
            onSearchInputChange={(e) => setSearchInput(e.target.value)}
            onClearButtonClick={() => setSearchInput('')}
            onSearchButtonClick={handleSearchButtonClick}
            results={filteredData}
            showResults={showResults}
            setShowResults={setShowResults}
          />
        </div>
        <PostButton />
      </div>
    </div>
  );
};




export default ThirdTopNav;
