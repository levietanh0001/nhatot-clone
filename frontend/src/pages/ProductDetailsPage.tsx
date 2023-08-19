import AboutUs from '~/components/common/footer/about-us/AboutUs';
import Breadcrumb from '~/components/common/breadcrumb/Breadcrumb';
import TopNav from '~/components/common/navbar';
import ContactUser from '~/components/product/product-details/ContactUser';
import ProductDetails from '~/components/product/product-details';
import ContentWithStickyBox from '~/layouts/ContentWithStickyBox';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';

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
