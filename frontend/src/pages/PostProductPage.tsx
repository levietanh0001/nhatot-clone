import TopNav from '~/components/shared/navbar';
import PostProduct from '~/components/features/product/product-crud/PostProduct';
import Header from '~/components/shared/layouts/Header';

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
