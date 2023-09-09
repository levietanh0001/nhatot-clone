import { SuspenseWrapper } from "~/components/ui/suspense/SuspenseWrapper";
import LoggedInRequired from "~/components/features/auth/LoggedInRequired";
import UserProfilePage from "~/pages/UserProfile.page";

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