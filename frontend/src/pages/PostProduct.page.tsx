import TopNav from '@/components/navbar/TopNav';
import PostProduct from '@/features/product/components/product-crud/PostProduct';
import Header from '@/components/layouts/Header';

const PostProductPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <div style={{ height: 'auto' }}>
        <PostProduct />
      </div>
    </>
  );
};

export default PostProductPage;
