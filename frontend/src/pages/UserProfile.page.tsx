import { lazy } from 'react';
import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';
const Header = lazy(() => import('@/components/layouts/Header'));
const TopNav = lazy(() => import('@/components/navbar/TopNav'));
const UserProfile = lazy(() => import('@/features/user-profile/components/UserProfile'));
const Footer = lazy(() => import('@/components/layouts/Footer'));
const AboutUs = lazy(() => import('@/components/footer/about-us/AboutUs'));


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
