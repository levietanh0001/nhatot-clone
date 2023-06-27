import React from 'react'
import TopNav from '../components/navbar/TopNav'
import Header from '../layouts/Header'
import Chat from '../components/chat/Chat'

const ChatPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <body>
        <Chat />
      </body>
    </>
  )
}

export default ChatPage