import Skeleton from '@mui/material/Skeleton';
import { useGetProductCount, useGetProducts } from '@/features/product/api/product.api';
import ProductCardSlider from '@/features/home/components/product-card-slider/ProductCardSlider';
import { RootState, useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { setProductCount } from '@/features/product/product.slice';
import { TopLoadingBarContext, useTopLoadingBar } from '@/contexts/top-loading-bar/TopLoadingBar.context';
import LoadingBar from 'react-top-loading-bar';
import { useConsoleLogOnChange } from '@/hooks/utils.hook';


const ProductSliders = () => {

  const productState = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();

  const { data: allProducts, isLoading: isAllProductsLoading } = useGetProducts({ limit: 20, offset: 0 });
  const { data: canbanProducts, isLoading: isCanbanProductsLoading } = useGetProducts({ limit: 20, offset: 0, type: 'canban' });
  const { data: chothueProducts, isLoading: isChothueProductsLoading } = useGetProducts({ limit: 20, offset: 0, type: 'chothue' });
  const { data: allProductCount, isLoading: isAllProductCountLoading } = useGetProductCount();
  const { data: canbanProductCount, isLoading: isCanBanProductCountLoading } = useGetProductCount({ type: 'canban' });
  const { data: chothueProductCount, isLoading: isChoThueProductCountLoading } = useGetProductCount({ type: 'chothue' });

  useEffect(() => {

    if(allProductCount) {
      dispatch(setProductCount({ type: 'all', count: allProductCount }));
    }

    if(canbanProductCount) {
      dispatch(setProductCount({ type: 'canban', count: canbanProductCount }));
    }

    if(chothueProductCount) {
      dispatch(setProductCount({ type: 'chothue', count: chothueProductCount }));
    }

  }, [allProductCount, canbanProductCount, chothueProductCount]);

  useTopLoadingBar(
    isAllProductsLoading ||
    isCanbanProductsLoading ||
    isChothueProductsLoading ||
    isAllProductCountLoading ||
    isCanBanProductCountLoading ||
    isChoThueProductCountLoading
  )

  useConsoleLogOnChange({ allProducts, canbanProducts, chothueProducts });

  return (
    <>

      {isAllProductsLoading && isAllProductCountLoading && (
        <div className='container'>
          <Skeleton sx={{ height: '350px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      )}

      {isCanbanProductsLoading && isCanBanProductCountLoading && (
        <div className='container'>
          <Skeleton sx={{ height: '350px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      )}

      {isChothueProductsLoading && isChoThueProductCountLoading && (
        <div className='container'>
          <Skeleton sx={{ height: '350px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      )}

      {allProducts && allProductCount && (
        <ProductCardSlider
          slides={allProducts ?? []}
          numMore={productState.count.all}
          type='latest'
          title='Mới nhất'
          className='latest-products-carousel'
          prevEl='prev-latest'
          nextEl='next-latest'
        />
      )}

      {canbanProducts && canbanProductCount && (
        <ProductCardSlider
          slides={canbanProducts ?? []}
          numMore={productState.count.canban}
          type='can-ban'
          title='Cần bán bất động sản'
          className='can-ban-products-carousel'
          prevEl='prev-can-ban'
          nextEl='next-can-ban'
        />
      )}

      {chothueProducts && chothueProductCount && (
        <ProductCardSlider
          slides={chothueProducts ?? []}
          numMore={productState.count.chothue}
          type='cho-thue'
          title='Cho thuê bất động sản'
          className='cho-thue-products-carousel'
          prevEl='prev-cho-thue'
          nextEl='next-cho-thue'
        />
      )}

    </>
  );
};


export default ProductSliders;
