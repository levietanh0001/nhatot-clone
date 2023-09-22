import Chat from '@/features/chat/components/Chat';
import TopNav from '@/components/navbar/TopNav';
import Header from '@/components/layouts/Header';



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
