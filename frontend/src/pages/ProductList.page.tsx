import Ads from '~/components/ui/ads/Ads';
import Breadcrumb from '~/components/ui/breadcrumb/Breadcrumb';
import AboutUs from '~/components/ui/footer/about-us/AboutUs';
import TopNav from '~/components/ui/navbar/TopNav';
import Footer from '~/components/ui/layouts/Footer';
import Header from '~/components/ui/layouts/Header';
import ProductList from '~/components/features/product/product-list/ProductList';
import ContentWithAdsLayout from '~/components/ui/layouts/ContentWithAdsLayout';
import Filters from '~/components/features/product/product-list/Filters';


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
