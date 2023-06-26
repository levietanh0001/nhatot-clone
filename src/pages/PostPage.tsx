import React from 'react'
import TopNav from '../components/navbar/TopNav'
import Header from '../layouts/Header'
import Post from '../components/post/Post'

const PostPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body style={{ height: '100vh' }}>
        <main>
          <Post />
        </main>
      </body>
    </>
  )
}

export default PostPage