import { SuspenseWrapper } from "~/components/common/suspense/SuspenseWrapper";
import LoggedInRequired from "~/components/features/auth/LoggedInRequired";
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
  }
]

export default chatRoutes;