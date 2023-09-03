import TopNav from '~/components/common/navbar';
import UpdateProduct from '~/components/features/product/product-crud/UpdateProduct';
import Header from '~/components/layouts/Header';

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
