import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/common/suspense/SuspenseWrapper';
const Header = lazy(() => import('~/components/layouts/Header'));
const TopNav = lazy(() => import('~/components/common/navbar'));
const Home = lazy(() => import('~/components/features/home/Home'));
const Footer = lazy(() => import('~/components/layouts/Footer'));
const AboutUs = lazy(() => import('~/components/common/footer/about-us/AboutUs'));


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
