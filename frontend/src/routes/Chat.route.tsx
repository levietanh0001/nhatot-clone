import { SuspenseWrapper } from "~/components/shared/suspense/SuspenseWrapper";
import LoggedInRequired from "~/components/features/auth/LoggedInRequired";
import CreateChat from "~/components/features/chat/CreateChat";
import ChatPage from "~/pages/ChatPage";

const chatRoutes = [
  {
    path: '/chat/:userId?',
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

]

export default chatRoutes;