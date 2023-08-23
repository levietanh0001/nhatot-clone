import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import FilterBoard from '~/components/product/product-filters/FilterBoard';
import UserTypeTabs from '~/components/product/user-type-tabs/UserTypeTabs';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { updateFavoriteList, usePopulateFavoritelist } from '~/hooks/favorite-list.hook';
import { useScrollToTopOnPageChange, useSetAvailablePages, useSetCurrentPage } from '~/hooks/pagination.hook';
import { useGetProductCount, usePaginateProducts } from '~/hooks/product.hook';
import { useConsoleLogOnChange } from '~/hooks/utils.hook';
import ProductCardList from './ProductCardList';

// const pageSize = 9;
const productPerPage = 20;

const ProductList = () => {

  // get url params
  // const params = useParams();
  // const type = params.type;
  const queryParams = new URLSearchParams(window.location.search) as any;
  const q = queryParams.getAll('q')[0] ?? '';
  const type = queryParams.getAll('type')[0] ?? '';

  // states and auth context
  const authContext = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [userType, setUserType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [gridView, setGridView] = useState<boolean>(false);
  const [favoriteProductIds, setFavoriteProductIds] = useState<any[]>([]);

  // fetch products and favorite products
  const { isLoading, isError, error, data: products } = usePaginateProducts(currentPage, productPerPage, { type, category, userType, q });
  usePopulateFavoritelist(setFavoriteProductIds);

  // handle product pages
  const { data: productCount } = useGetProductCount();
  useSetCurrentPage(setCurrentPage);
  useScrollToTopOnPageChange(currentPage);
  useSetAvailablePages(productCount, productPerPage, setNumPages);

  // logging
  useConsoleLogOnChange({ products });
  useConsoleLogOnChange({ productCount });
  useConsoleLogOnChange({ q });


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    if (error instanceof AxiosError || error instanceof Error) {
      return <p>{error.message}</p>;
    }
  }

  return (
    <>
      <FilterBoard category={category} setCategory={setCategory} />
      <UserTypeTabs
        userType={userType}
        setUserType={setUserType}
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
        onFavoriteButtonClick={(id) => {
          updateFavoriteList(id, favoriteProductIds, setFavoriteProductIds, authContext)
        }}
        onPageChange={(event, page) => {
          setCurrentPage(page);
          sessionStorage.setItem('currentPage', JSON.stringify(page));
        }}
      />
    </>
  );
};

export default ProductList;