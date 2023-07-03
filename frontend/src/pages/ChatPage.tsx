import Chat from '~/components/chat/Chat'
import TopNav from '~/components/navbar/TopNav'
import Header from '~/layouts/Header'

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