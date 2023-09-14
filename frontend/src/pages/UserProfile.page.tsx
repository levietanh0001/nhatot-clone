import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
const Header = lazy(() => import('~/components/ui/layouts/Header'));
const TopNav = lazy(() => import('~/components/ui/navbar/TopNav'));
const UserProfile = lazy(() => import('~/components/features/user-profile/UserProfile'));
const Footer = lazy(() => import('~/components/ui/layouts/Footer'));
const AboutUs = lazy(() => import('~/components/ui/footer/about-us/AboutUs'));


const UserProfilePage = () => {
  return (
    <>
      <SuspenseWrapper>
        <Header>
          <TopNav />
        </Header>
      </SuspenseWrapper>

      <SuspenseWrapper>
        <UserProfile />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <Footer>
          <AboutUs />
        </Footer>
      </SuspenseWrapper>
    </>
  );
};

export default UserProfilePage;