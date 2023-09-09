import TopNav from '~/components/ui/navbar/TopNav';
import PostProduct from '~/components/features/product/product-crud/PostProduct';
import Header from '~/components/ui/layouts/Header';

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
