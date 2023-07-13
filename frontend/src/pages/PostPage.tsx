import TopNav from '~/components/navbar'
import PostProduct from '~/components/post-product'
import Header from '~/layouts/Header'


const PostPage = () => {
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

export default PostPage