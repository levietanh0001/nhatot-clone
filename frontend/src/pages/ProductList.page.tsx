import Ads from '@/components/ads/Ads';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import AboutUs from '@/components/footer/about-us/AboutUs';
import ContentWithAdsLayout from '@/components/layouts/ContentWithAdsLayout';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import TopNav from '@/components/navbar/TopNav';
import Filters from '@/features/product/components/product-list/Filters';
import ProductList from '@/features/product/components/product-list/ProductList';


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
