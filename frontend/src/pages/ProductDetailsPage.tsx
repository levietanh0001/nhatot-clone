import ProductDetails from '~/components/features/product/product-details';
import Breadcrumb from '~/components/shared/breadcrumb/Breadcrumb';
import AboutUs from '~/components/shared/footer/about-us/AboutUs';
import Footer from '~/components/shared/layouts/Footer';
import Header from '~/components/shared/layouts/Header';
import TopNav from '~/components/shared/navbar';

const ProductDetailsPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      
      <Breadcrumb />
      <ProductDetails />

      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

export default ProductDetailsPage;
