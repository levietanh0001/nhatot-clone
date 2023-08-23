import { lazy } from 'react';
import { SuspenseWrapper } from '~/App';
import { useGetProducts } from '~/hooks/product.hook';
const ProductCardSlider = lazy(() => import('~/components/home/product-card-slider/ProductCardSlider'));

const ProductSliders = () => {

  const { data: allProducts } = useGetProducts({ limit: 10, offset: 0 });
  const { data: canbanProducts } = useGetProducts({ limit: 10, offset: 0, type: 'canban' });
  const { data: chothueProducts } = useGetProducts({ limit: 10, offset: 0, type: 'chothue' });

  return (
    <>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={allProducts}
          type='latest'
          title='Mới nhất'
          className='latest-products-carousel'
          prevEl='prev-latest'
          nextEl='next-latest'
        />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={canbanProducts}
          type='can-ban'
          title='Cần bán bất động sản'
          className='can-ban-products-carousel'
          prevEl='prev-can-ban'
          nextEl='next-can-ban'
        />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={chothueProducts}
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
