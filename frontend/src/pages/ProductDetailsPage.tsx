import AboutUs from '~/components/common/footer/about-us/AboutUs';
import Breadcrumb from '~/components/common/breadcrumb/Breadcrumb';
import TopNav from '~/components/common/navbar';
import ContactUser from '~/components/features/product/product-details/ContactUser';
import ProductDetails from '~/components/features/product/product-details';
import ContentWithStickyBox from '~/components/layouts/ContentWithStickyBox';
import Footer from '~/components/layouts/Footer';
import Header from '~/components/layouts/Header';

const ProductDetailsPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body>
        <Breadcrumb />
        <main>
          <ProductDetails />
        </main>
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

export default ProductDetailsPage;
