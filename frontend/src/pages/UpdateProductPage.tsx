import TopNav from '~/components/common/navbar';
import UpdateProduct from '~/components/product/product-crud/UpdateProduct';
import Header from '~/layouts/Header';

const UpdateProductPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body style={{ height: 'auto' }}>
        <main>
          <UpdateProduct />
        </main>
      </body>
    </>
  );
};

export default UpdateProductPage;
