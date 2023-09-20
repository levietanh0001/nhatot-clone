import ProductDetails from '@/features/product/components/product-details';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import AboutUs from '@/components/footer/about-us/AboutUs';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import TopNav from '@/components/navbar/TopNav';


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
