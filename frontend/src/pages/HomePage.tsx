import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/shared/suspense/SuspenseWrapper';
const Header = lazy(() => import('~/components/shared/layouts/Header'));
const TopNav = lazy(() => import('~/components/shared/navbar'));
const Home = lazy(() => import('~/components/features/home/Home'));
const Footer = lazy(() => import('~/components/shared/layouts/Footer'));
const AboutUs = lazy(
  () => import('~/components/shared/footer/about-us/AboutUs')
);

const HomePage = () => {
  return (
    <>
      <SuspenseWrapper>
        <Header>
          <TopNav />
        </Header>
      </SuspenseWrapper>

      <SuspenseWrapper>
        <Home />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <Footer>
          <AboutUs />
        </Footer>
      </SuspenseWrapper>
    </>
  );
};

export default HomePage;
