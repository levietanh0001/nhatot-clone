import Ads from '~/components/common/ads/Ads';
import Breadcrumb from '~/components/common/breadcrumb/Breadcrumb';
import AboutUs from '~/components/common/footer/about-us/AboutUs';
import TopNav from '~/components/common/navbar';
import Filters from '~/components/features/product/product-filters/Filters';
import ProductList from '~/components/features/product/product-list/ProductList';
import ContentWithAdsLayout from '~/components/layouts/ContentWithAdsLayout';
import Footer from '~/components/layouts/Footer';
import Header from '~/components/layouts/Header';

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
