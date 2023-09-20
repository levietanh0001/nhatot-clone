import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';
import LoggedInRequired from '@/features/auth/components/LoggedInRequired';
import UserProfilePage from '@/pages/UserProfile.page';


const userRoutes = [
  {
    path: '/user-profile/:userId',
    element: (
      <LoggedInRequired>
        <SuspenseWrapper>
          <UserProfilePage />
        </SuspenseWrapper>
      </LoggedInRequired>
    ),
  },
];


export default userRoutes;
