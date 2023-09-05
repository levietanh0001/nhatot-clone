import { SuspenseWrapper } from "~/components/common/suspense/SuspenseWrapper";
import LoggedInRequired from "~/components/features/auth/LoggedInRequired";
import UserProfilePage from "~/pages/UserProfilePage";

const userRoutes = [
  {
    path: '/user-profile/:userId',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <UserProfilePage />
        </SuspenseWrapper>
      </LoggedInRequired>
    )
  }
]

export default userRoutes;