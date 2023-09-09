import Chat from '~/components/features/chat/Chat';
import TopNav from '~/components/ui/navbar/TopNav';
import Header from '~/components/ui/layouts/Header';

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
