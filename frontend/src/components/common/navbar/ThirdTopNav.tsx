import { useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

import { useConsoleLogOnChange } from '~/hooks/utils.hook';
import PostButton from './PostButton';
import SearchBox from './SearchBox';
import SearchFilterMenu from './SearchFilterMenu';
import styles from './ThirdTopNav.module.scss';
import { useSearchProducts } from '~/api/product.api';

const ThirdTopNav = () => {

  const [productType, setProductType] = useState<string>('canban');
  const [searchInput, setSearchInput] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const query = String(useDebounce(searchInput, 800)).trim() ?? '';

  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    isError: isSearchResultsError,
    error,
  } = useSearchProducts({ query });

  useShowSearchResultsOnSearchInputEntered(searchInput, setShowResults);
  useSetFilteredResults(
    searchResults,
    isSearchResultsLoading,
    isSearchResultsError,
    setFilteredResults
  );
  useConsoleLogOnChange({ location, searchResults, error });

  const handleSearchButtonClick = () => {};

  const handleSearchResultClick = (result) => {
    // const type = result?.type === 'chothue' ? 'cho-thue' : result?.type === 'canban' ? 'can-ban' : 'latest';
    const q = result?.projectName + result?.address;
    navigate(
      {
        pathname: `/product-list`,
        // pathname: `/product-list/${type}`,
        search: createSearchParams({ q }).toString(),
        
      },
      {
        // state, // pass data from one route to another
        replace: true, // replace current entry in the history
      }
    );
    navigate(0); // refresh current page
    
  };

  return (
    <div className='container'>
      <div className={styles['wrapper']}>
        <div className={styles['search-action']}>
          <SearchFilterMenu
            productType={productType}
            setProductType={setProductType}
          />
          <SearchBox
            onSearchResultClick={handleSearchResultClick}
            searchInput={searchInput}
            // onSearchInputKeyUp={(e) => setSearchInput(e.target.value)}
            onSearchInputChange={(e) => setSearchInput(e.target.value)}
            onClearButtonClick={() => setSearchInput('')}
            onSearchButtonClick={handleSearchButtonClick}
            results={filteredResults}
            showResults={showResults}
            setShowResults={setShowResults}
          />
        </div>
        <PostButton />
      </div>
    </div>
  );
};

const useShowSearchResultsOnSearchInputEntered = (
  searchInput,
  setShowResults
) => {
  useEffect(() => {
    if (!searchInput) {
      setShowResults(Boolean(searchInput));
    } else {
      setShowResults(Boolean(searchInput));
    }
  }, [searchInput]);
};

const useSetFilteredResults = (
  data,
  isLoading,
  isError,
  setFilteredResults
) => {
  useEffect(() => {
    if (!isLoading && !isError) {
      setFilteredResults(
        data
        // searchResults.filter((item) => {
        //   const type = item?.type === 'canban'? 'can ban': item?.type === 'chothue'? 'cho thue': 'du an';
        //   const category =  item?.category === 'canhochungcu'? 'can ho chung cu':
        //                     item?.category === 'nhao'? 'nha o': 'khac';
        //   const result = `${type}${category}${item?.projectName}${item?.address}`;
        //   return result.toLowerCase().includes(searchInput.toLowerCase());
        // })
      );
    }
  }, [isLoading]);
};

export default ThirdTopNav;
