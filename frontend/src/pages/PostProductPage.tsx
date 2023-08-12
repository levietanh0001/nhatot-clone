import TopNav from '~/components/common/navbar';
import PostProduct from '~/components/product/product-crud/PostProduct';
import Header from '~/layouts/Header';

const PostProductPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body style={{ height: 'auto' }}>
        <main>
          <PostProduct />
        </main>
      </body>
    </>
  );
};

export default PostProductPage;
