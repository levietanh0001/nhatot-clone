import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/shared/suspense/SuspenseWrapper';
const Header = lazy(() => import('~/components/shared/layouts/Header'));
const TopNav = lazy(() => import('~/components/shared/navbar'));
const UserProfile = lazy(() => import('~/components/features/user-profile/UserProfile'));
const Footer = lazy(() => import('~/components/shared/layouts/Footer'));
const AboutUs = lazy(() => import('~/components/shared/footer/about-us/AboutUs'));


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
