import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/auth/Auth.context';
import { updateFavoriteList, usePopulateFavoritelist } from '@/features/product/api/favorite-list.api';
import { useGetProductCount, usePaginateProducts } from '@/features/product/api/product.api';
import { useScrollToTopOnPageChange, useSetAvailablePages, useSetCurrentPage } from '@/hooks/pagination.hook';
import FilterBoard from './FilterBoard';
import ProductCardList from './ProductCardList';
import UserTypeTabs from './UserTypeTabs';
import { useTopLoadingBar } from '@/contexts/top-loading-bar/TopLoadingBar.context';


// let render = 0;
// const pageSize = 9;
const productPerPage = 20;

const ProductList = () => {

  const queryParams = new URLSearchParams(window.location.search) as URLSearchParams;
  const q = queryParams.getAll('q')[0] ?? '';
  const type = queryParams.getAll('type')[0] ?? '';
  const category = queryParams.getAll('category')[0] ?? '';
  const userType = queryParams.getAll('userType')[0] ?? '';

  // states and auth context
  const authContext = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [gridView, setGridView] = useState<boolean>(() => localStorage.getItem('gridView') === 'true'? true: false);
  const [favoriteProductIds, setFavoriteProductIds] = useState<any[]>([]);
  const navigate = useNavigate();

  // fetch products and favorite products
  const { isLoading, isError, error, data: products } = usePaginateProducts(
    currentPage, 
    productPerPage, 
    { type: type ?? '', category: category ?? '', userType: userType ?? '', q: q ?? '' }
    );
    usePopulateFavoritelist(setFavoriteProductIds);
    
  // handle product pages
  const { data: productCount, isLoading: isProductCountLoading } = useGetProductCount();
  useTopLoadingBar(isLoading || isProductCountLoading);

  useSetCurrentPage(setCurrentPage);
  useScrollToTopOnPageChange(currentPage);
  useSetAvailablePages(productCount, productPerPage, setNumPages);

  // logging
  // useConsoleLogOnChange({ products });
  // useConsoleLogOnChange({ productCount });
  // useConsoleLogOnChange({ q });
  // useConsoleLogOnChange({ queryParams: queryParams.toString() });

  useEffect(() => {
    localStorage.setItem('gridView', String(gridView));
  },[gridView]);

  const handleCategoryChange = (value) => {

    if(value) {
    queryParams.set('category', value);
    } else {
      queryParams.delete('category');
    }

    navigate({
      pathname: '/product-list',
      search: queryParams.toString()
    }, { replace: true });

    navigate(0);
  }

  const handleUserTypeChange = (value) => {

    if(value) {
      queryParams.set('userType', value);
      } else {
      queryParams.delete('userType');
    }

    navigate({
      pathname: '/product-list',
      search: queryParams.toString(),
    }, { replace: true });

    navigate(0);
  }

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  if (isError) {
    if (error instanceof AxiosError || error instanceof Error) {
      return <p>{error.message}</p>;
    }
  }

  

  return (
    <>
      {/* states (category, userType, type) to query params in navigate */}
      {/* {render} */}
      <FilterBoard 
        category={category} 
        onCategoryChange={handleCategoryChange}
        // onCategoryChange={(value) => setCategory(value)} 
      />
      <UserTypeTabs
        userType={userType}
        onUserTypeChange={handleUserTypeChange}
        // setUserType={setUserType}
        onViewModeToggle={() => setGridView((prev) => !prev)}
      />
      <ProductCardList
        products={products}
        favoriteProductIds={favoriteProductIds}
        isGridView={gridView}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numPages={numPages}
        setNumPages={setNumPages}
        onFavoriteButtonClick={(id) => updateFavoriteList(id, favoriteProductIds, setFavoriteProductIds, authContext)}
        onPageChange={(event, page) => {
          setCurrentPage(page);
          sessionStorage.setItem('currentPage', JSON.stringify(page));
        }}
      />
    </>
  );
};

export default ProductList;