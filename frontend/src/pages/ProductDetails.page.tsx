import ProductDetails from '~/components/features/product/product-details';
import Breadcrumb from '~/components/ui/breadcrumb/Breadcrumb';
import AboutUs from '~/components/ui/footer/about-us/AboutUs';
import Footer from '~/components/ui/layouts/Footer';
import Header from '~/components/ui/layouts/Header';
import TopNav from '~/components/ui/navbar/TopNav';

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
