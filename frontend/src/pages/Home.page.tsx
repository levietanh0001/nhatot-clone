import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
const Header = lazy(() => import('~/components/ui/layouts/Header'));
const TopNav = lazy(() => import('~/components/ui/navbar/TopNav'));
const Home = lazy(() => import('~/components/features/home/Home'));
const Footer = lazy(() => import('~/components/ui/layouts/Footer'));
const AboutUs = lazy(
  () => import('~/components/ui/footer/about-us/AboutUs')
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
