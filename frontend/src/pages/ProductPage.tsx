import AboutUs from '~/components/footer/about-us/AboutUs';
import Breadcrumb from '~/components/common/breadcrumb/Breadcrumb';
import TopNav from '~/components/navbar';
import ContactUser from '~/components/products/product/ContactUser';
import Product from '~/components/products/product/Product';
import ContentWithStickyBox from '~/layouts/ContentWithStickyBox';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';

const ProductPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body>
        <Breadcrumb />
        <main>
          <ContentWithStickyBox
            content={<Product />}
            stickyBox={<ContactUser />}
          />
        </main>
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

export default ProductPage;
