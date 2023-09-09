import TopNav from '~/components/ui/navbar/TopNav';
import UpdateProduct from '~/components/features/product/product-crud/UpdateProduct';
import Header from '~/components/ui/layouts/Header';

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
