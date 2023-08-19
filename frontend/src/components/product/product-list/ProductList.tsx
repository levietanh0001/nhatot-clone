// import { debounce } from "lodash";
import { useUpdateEffect } from 'usehooks-ts';
import FilterBoard from '~/components/product/product-filters/FilterBoard';
import UserTypeTabs from '~/components/product/user-type-tabs/UserTypeTabs';
import ProductCardList from './ProductCardList';
import {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useState,
} from 'react';
import { axiosPrivate, axiosPublic } from '~/utils/axios.util';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { AxiosError } from 'axios';

const pageSize = 9;
const productPerPage = 20;

function addProductToFavoriteList(favoriteProductId) {
  return axiosPrivate.post(`favorite-list/${String(favoriteProductId)}`);
}

function removeProductFromFavoriteList(favoriteProductId) {
  return axiosPrivate.delete(`favorite-list/${String(favoriteProductId)}`);
}

const ProductList = () => {
  const params = useParams();
  const type = params.type;
  const authContext = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [userType, setUserType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [gridView, setGridView] = useState<boolean>(false);
  // const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [favoriteProductIds, setFavoriteProductIds] = useState<any[]>([]);

  useEffect(() => {
    console.log('first mount');
    const controller = new AbortController();

    async function favoriteListPopulate() {
      try {
        // const data = await getFavoriteList(accessToken, controller.signal);
        const response = await axiosPrivate.get('favorite-list', {
          signal: controller.signal,
        });
        const data = response.data;
        if (data && data.productIds) {
          setFavoriteProductIds(data.productIds);
        }
      } catch (error) {
        console.error(error);
      }
    }

    favoriteListPopulate();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log({ favoriteProductIds });
  }, [favoriteProductIds]);

  const { isLoading, isError, error, data } =
    useQuery({
      queryKey: ['products', currentPage, category, userType, type],
      queryFn: ({ signal }) => {
        const filters = {
          ...(category && { category }),
          ...(userType && { userType }),
          ...(type && {
            type:
              type === 'mua-ban'
                ? 'canban'
                : type === 'cho-thue'
                ? 'chothue'
                : 'duan',
          }),
        };

        const params = new URLSearchParams({
          limit: `${productPerPage}`,
          offset: `${productPerPage * (currentPage - 1)}`,
          ...filters,
        });

        console.log({
          limit: `${productPerPage}`,
          offset: `${productPerPage * (currentPage - 1)}`,
          ...filters,
        });

        return axiosPublic.get('/products', { params, signal });
      },
      keepPreviousData: true,
      refetchOnMount: true, // if component is mounted, refetch
      refetchOnWindowFocus: false,
      // cacheTime: 5000, // by default 5 mins
      staleTime: 5000,
    });

  const products = data?.data;
  console.log({ products });

  useEffect(() => {
    axiosPublic
      .get('/products/count')
      .then((result) => setNumPages(Math.ceil(Number(result.data) / pageSize)))
      .catch((error) => console.error(error));

    const storedPage = sessionStorage.getItem('currentPage');

    if (storedPage) {
      setCurrentPage(JSON.parse(storedPage));
    }
  }, []);

  useEffect(() => {
    console.log({ currentPage, category, userType, gridView });
  }, [currentPage, category, userType, gridView]);

  useEffect(() => {
    if (products) {
      console.log({ products });
    }
  }, [products]);

  useEffect(() => {
    window.scrollTo({ top: 10, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', JSON.stringify(page));
  };

  const handleViewModeToggle = () => {
    setGridView((prev) => !prev);
  };

  const handleFavoriteButtonClick = async (id) => {
    const productId = id;

    console.log({ favoriteProductIds });

    if (favoriteProductIds && !favoriteProductIds.includes(productId)) {
      addProductToFavoriteList(productId)
        .then(() => {
          console.log('adding product to favorite list');
          return axiosPrivate.get('favorite-list');
        })
        .then((response) => {
          const data = response.data;
          // console.log({ data });

          if (data) {
            if (!data.productIds) {
              setFavoriteProductIds([]);
            }

            if (data.productIds) {
              // if unauthorized, will be undefined, requires refreshing token before sending request
              setFavoriteProductIds(data.productIds);
            }
          }
        })
        .catch((error) => {
          console.error(error);

          if (error.name === 'USER_NOT_FOUND') {
            authContext?.redirectToRegisterPage();
          } else {
            authContext?.redirectToLoginPage();
          }
        });
    } else if (favoriteProductIds && favoriteProductIds.includes(productId)) {
      removeProductFromFavoriteList(productId)
        .then(() => {
          console.log('removing product from favorite list');
          return axiosPrivate.get('favorite-list');
        })
        .then((response) => {
          const data = response.data;
          // console.log({ data });

          if (data) {
            if (!data.productIds) {
              setFavoriteProductIds([]);
            }

            if (data.productIds) {
              setFavoriteProductIds(data.productIds);
            }
          }
        })
        .catch((error) => {
          console.error(error);

          if (error.name === 'USER_NOT_FOUND') {
            authContext?.redirectToRegisterPage();
          } else {
            authContext?.redirectToLoginPage();
          }
        });
    }
  };

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
        onViewModeToggle={handleViewModeToggle}
      />
      <ProductCardList
        favoriteProductIds={favoriteProductIds}
        onFavoriteButtonClick={handleFavoriteButtonClick}
        isGridView={gridView}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numPages={numPages}
        setNumPages={setNumPages}
        onPageChange={handlePageChange}
        products={products}
      />
    </>
  );
};

export default ProductList;
