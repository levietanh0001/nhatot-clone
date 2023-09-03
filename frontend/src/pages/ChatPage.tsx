import Chat from '~/components/features/chat/Chat';
import TopNav from '~/components/common/navbar/TopNav';
import Header from '~/components/layouts/Header';

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
  );
};

export default ChatPage;
