import Ads from '~/components/shared/ads/Ads';
import Breadcrumb from '~/components/shared/breadcrumb/Breadcrumb';
import AboutUs from '~/components/shared/footer/about-us/AboutUs';
import TopNav from '~/components/shared/navbar';
import Filters from '~/components/features/product/product-filters/Filters';
import ProductList from '~/components/features/product/product-list/ProductList';
import ContentWithAdsLayout from '~/components/shared/layouts/ContentWithAdsLayout';
import Footer from '~/components/shared/layouts/Footer';
import Header from '~/components/shared/layouts/Header';

const ProductListPage = () => {
  return (
    <>
      <Header>
        <TopNav />
        <Filters />
      </Header>
      <body>
        <Ads />
        <Breadcrumb />
        <PageTitle />
        <main>
          <ContentWithAdsLayout>
            <ProductList />
          </ContentWithAdsLayout>
        </main>
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

const PageTitle = () => {
  return (
    <div className='container'>
      <h1 style={{ margin: '15px 0 15px 0', fontSize: '1.25rem' }}>
        Mua bán bất động sản giá tốt
      </h1>
    </div>
  );
};

export default ProductListPage;
