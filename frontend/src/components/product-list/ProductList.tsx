// import { debounce } from "lodash";
import { useUpdateEffect } from 'usehooks-ts';
import FilterBoard from "~/components/filters/FilterBoard"
import UserTypeTabs from "~/components/tabs/UserTypeTabs"
import ProductCardList from "./ProductCardList"
import { useCallback, useDebugValue, useEffect, useState } from "react";
import { axiosClient } from "~/utils/axios.util";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { backendBaseUrl } from "~/utils/variables.util";


const pageSize = 9;
const productPerPage = 20;


async function getFavoriteList(accessToken, signal) {

  const response = await fetch(new URL('favorite-list', backendBaseUrl), {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    signal: signal? signal: null
  });

  return response.json();  

}

function addProductToFavoriteList(accessToken, favoriteProductId) {
  return fetch(new URL(`favorite-list/${String(favoriteProductId)}`, backendBaseUrl), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

function removeProductFromFavoriteList(accessToken, favoriteProductId) {
  return fetch(new URL(`favorite-list/${String(favoriteProductId)}`, backendBaseUrl), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

const ProductList = () => {

  const params = useParams();
  const type = params.type;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [userType, setUserType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [gridView, setGridView] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [favoriteProductIds, setFavoriteProductIds] = useState<any[]>([]);

  useEffect(() => {

    console.log('first mount');
    const controller = new AbortController();

    async function favoriteListPopulate() {
      try {
        const data = await getFavoriteList(accessToken, controller.signal);
        if(data && data.productIds) {
          setFavoriteProductIds(data.productIds);
        }
      } catch(error) {
        console.error(error);
      }
    }

    favoriteListPopulate();

    return () => {
      controller.abort();
    }

  }, []);

  useEffect(() => {
    console.log({ favoriteProductIds });
  }, [favoriteProductIds]);

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
    queryKey: ['products', currentPage, category, userType, type], 
    queryFn: ({ signal }) => {

      const filters = {
        ...(category) && { category },
        ...(userType) && { userType },
        ...(type) && { type: type === 'mua-ban'? 'canban': type === 'cho-thue'? 'chothue': 'duan' },
      }

      const params = new URLSearchParams({
        limit: `${productPerPage}`,
        offset: `${productPerPage * currentPage}`,
        ...filters
      });

      return axiosClient.get('/products', { params, signal });
    },
    keepPreviousData: true
  });

  const products = data?.data;

  useEffect(() => {

    axiosClient.get('/products/count')
      .then(result => setNumPages(Math.ceil(Number(result.data) / pageSize)))
      .catch(error => console.error(error));

    const storedPage = sessionStorage.getItem('currentPage');
    if(storedPage) {
      setCurrentPage(JSON.parse(storedPage));
    }

  }, []);

  useEffect(() => {
    console.log({ currentPage, category, userType, gridView });
  }, [currentPage, category, userType, gridView]);

  useEffect(() => {
    if(products) {
      console.log({ products });
    }
  }, [products]);

  const handlePageChange = (event, page) => {

    setCurrentPage(page);
    window.scrollTo(0, 0);
    sessionStorage.setItem('currentPage', JSON.stringify(page));
  }

  const handleViewModeToggle = () => {
    setGridView((prev) => !prev);
  }

  const handleFavoriteButtonClick = async (id) => {

    const productId = id;

    if(favoriteProductIds && !favoriteProductIds.includes(productId)) {
      
      addProductToFavoriteList(accessToken, productId)
        .then(() => {
          console.log('adding product to favorite list');
          return fetch(new URL('favorite-list', backendBaseUrl), {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if(data) {
            setFavoriteProductIds(data.productIds);
          }
        })
        .catch(error => console.error(error));

    } else if(favoriteProductIds && favoriteProductIds.includes(productId)) {
      
      removeProductFromFavoriteList(accessToken, productId)
        .then(() => {
          console.log('removing product from favorite list');
          return fetch(new URL('favorite-list', backendBaseUrl), {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if(data) {
            setFavoriteProductIds(data.productIds);
          }
        })
        .catch(error => console.error(error));

    }

  }

  return (
    <>
      <FilterBoard category={category} setCategory={setCategory} />
      <UserTypeTabs userType={userType} setUserType={setUserType} onViewModeToggle={handleViewModeToggle} />
      <ProductCardList favoriteProductIds={favoriteProductIds} onFavoriteButtonClick={handleFavoriteButtonClick} isGridView={gridView} currentPage={currentPage} setCurrentPage={setCurrentPage} numPages={numPages} setNumPages={setNumPages} onPageChange={handlePageChange} products={products} />
    </>
  )
}

export default ProductList