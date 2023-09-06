import { lazy, useEffect } from 'react';
import { useGetProductCount, useGetProducts } from '~/api/product.api';
import { SuspenseWrapper } from '~/components/shared/suspense/SuspenseWrapper';
const ProductCardSlider = lazy(() => import('~/components/features/home/product-card-slider/ProductCardSlider'));

const ProductSliders = () => {

  const { data: allProducts } = useGetProducts({ limit: 20, offset: 0 });
  const { data: canbanProducts } = useGetProducts({ limit: 20, offset: 0, type: 'canban' });
  const { data: chothueProducts } = useGetProducts({ limit: 20, offset: 0, type: 'chothue' });
  const { data: allProductCount, isLoading: isAllProductCountLoading } = useGetProductCount();
  const { data: canbanProductCount, isLoading: isCanBanProductCountLoading } = useGetProductCount({ type: 'canban' });
  const { data: chothueProductCount, isLoading: isChoThueProductCountLoading } = useGetProductCount({ type: 'chothue' });

  return (
    <>
      <SuspenseWrapper>
        <ProductCardSlider
          slides={allProducts ?? []}
          numMore={allProductCount}
          type='latest'
          title='Mới nhất'
          className='latest-products-carousel'
          prevEl='prev-latest'
          nextEl='next-latest'
        />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={canbanProducts ?? []}
          numMore={canbanProductCount}
          type='can-ban'
          title='Cần bán bất động sản'
          className='can-ban-products-carousel'
          prevEl='prev-can-ban'
          nextEl='next-can-ban'
        />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={chothueProducts ?? []}
          numMore={chothueProductCount}
          type='cho-thue'
          title='Cho thuê bất động sản'
          className='cho-thue-products-carousel'
          prevEl='prev-cho-thue'
          nextEl='next-cho-thue'
        />
      </SuspenseWrapper>

    </>
  );
};

ProductSliders.propTypes = {

}

export default ProductSliders;
