import React from 'react'
import TopNav from '~/components/navbar/TopNav'
import Header from '~/layouts/Header'
import PostProduct from '~/components/post-product/PostProduct'

const PostPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body style={{ height: '100vh' }}>
        <main>
          <PostProduct />
        </main>
      </body>
    </>
  )
}

export default PostPage