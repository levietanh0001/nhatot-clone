import Header from '@/components/layouts/Header';
import TopNav from '@/components/navbar/TopNav';
import UpdateProduct from '@/features/product/components/product-crud/UpdateProduct';

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
