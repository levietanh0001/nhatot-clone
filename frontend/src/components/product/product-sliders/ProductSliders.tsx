import { lazy } from 'react';
import { SuspenseWrapper } from '~/App';
import { useGetProducts } from '~/hooks/product.hook';
const ProductCardSlider = lazy(() => import('~/components/home/product-card-slider/ProductCardSlider'));

const ProductSliders = () => {

  const { data: allProducts } = useGetProducts({ limit: 10, offset: 0 });
  const { data: muabanProducts } = useGetProducts({ limit: 10, offset: 0, type: 'canban' });
  const { data: chothueProducts } = useGetProducts({ limit: 10, offset: 0, type: 'chothue' });

  return (
    <>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={allProducts}
          type='khac'
          title='Các loại hình bất động sản khác'
          className='du-an-bds-carousel'
          prevEl='prev-du-an'
          nextEl='next-du-an'
        />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={muabanProducts}
          type='mua-ban'
          title='Mua bán bất động sản'
          className='mua-ban-bds-carousel'
          prevEl='prev-mua-ban'
          nextEl='next-mua-ban'
        />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductCardSlider
          slides={chothueProducts}
          type='cho-thue'
          title='Cho thuê bất động sản'
          className='cho-thue-bds-carousel'
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
