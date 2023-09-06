import Chat from '~/components/features/chat/Chat';
import TopNav from '~/components/shared/navbar/TopNav';
import Header from '~/components/shared/layouts/Header';

const ChatPage = () => {
  return (
    <>
      <Header>
        <TopNav />
      </Header>
      <Chat />
    </>
  );
};

export default ChatPage;
