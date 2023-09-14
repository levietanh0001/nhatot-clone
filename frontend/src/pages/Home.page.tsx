import { Paper } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { lazy } from 'react';
import Home from '~/components/features/home/Home';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper';
const Header = lazy(() => import('~/components/ui/layouts/Header'));
const TopNav = lazy(() => import('~/components/ui/navbar/TopNav'));
// const Home = lazy(() => import('~/components/features/home/Home'));
const Footer = lazy(() => import('~/components/ui/layouts/Footer'));
const AboutUs = lazy(() => import('~/components/ui/footer/about-us/AboutUs'));

const HomePage = () => {
  return (
    <>
      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton height='143px' width='100%' />
        </div>
      }>
        <Header>
          <TopNav />
        </Header>
      </SuspenseWrapper>

      <Home />
      {/* <SuspenseWrapper fallback={
        <div className='container'>
          Loading Home...
        </div>
      }>
      </SuspenseWrapper> */}

      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton height='296px' width='100%' />
        </div>
      }>
        <Footer>
          <AboutUs />
        </Footer>
      </SuspenseWrapper>
    </>
  );
};

export default HomePage;
