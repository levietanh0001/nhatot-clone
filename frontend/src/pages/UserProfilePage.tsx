import { Suspense, lazy } from 'react';
import { SuspenseWrapper } from '~/App';
const Header = lazy(() => import('~/components/layouts/Header'));
const TopNav = lazy(() => import('~/components/common/navbar'));
const UserProfile = lazy(
  () => import('~/components/features/user-profile/UserProfile')
);
const Footer = lazy(() => import('~/components/layouts/Footer'));
const AboutUs = lazy(
  () => import('~/components/common/footer/about-us/AboutUs')
);

// import AboutUs from '~/components/common/footer/about-us/AboutUs';
// import TopNav from '~/components/common/navbar';
// import UserCard from '~/components/user-profile/UserCard';
// import UserProfile from '~/components/user-profile/UserProfile';
// import Footer from '~/layouts/Footer';
// import Header from '~/layouts/Header';

const UserProfilePage = () => {
  return (
    <>
      <SuspenseWrapper>
        <Header>
          <TopNav />
        </Header>
      </SuspenseWrapper>

      <SuspenseWrapper>
        <body>
          <main>
            <UserProfile />
          </main>
        </body>
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
