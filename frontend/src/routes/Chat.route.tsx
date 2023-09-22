import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';
import LoggedInRequired from '@/features/auth/components/LoggedInRequired';
import CreateChat from '@/features/chat/components/CreateChat';
import ChatPage from '@/pages/Chat.page';


const chatRoutes = [
  {
    path: '/chat',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <ChatPage />
        </SuspenseWrapper>
      </LoggedInRequired>
    ),
  },
  {
    path: '/create-chat/:userId',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <CreateChat />
        </SuspenseWrapper>
      </LoggedInRequired>
    ),
  },
];


export default chatRoutes;
