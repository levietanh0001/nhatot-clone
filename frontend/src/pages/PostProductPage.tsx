
import TopNav from '~/components/navbar'
import PostProduct from '~/components/products/post-product'
import Header from '~/layouts/Header'


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
  )
}

export default PostProductPage