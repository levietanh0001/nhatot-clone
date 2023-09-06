import TopNav from '~/components/shared/navbar';
import UpdateProduct from '~/components/features/product/product-crud/UpdateProduct';
import Header from '~/components/shared/layouts/Header';

const UpdateProductPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <div style={{ height: 'auto' }}>
        <UpdateProduct />
      </div>
    </>
  );
};

export default UpdateProductPage;
