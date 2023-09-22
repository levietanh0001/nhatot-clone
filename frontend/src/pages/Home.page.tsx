import Skeleton from '@mui/material/Skeleton';
import { lazy } from 'react';
import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper';
import Home from '@/features/home/components/Home';
const Header = lazy(() => import('@/components/layouts/Header'));
const TopNav = lazy(() => import('@/components/navbar/TopNav'));
const Footer = lazy(() => import('@/components/layouts/Footer'));
const AboutUs = lazy(() => import('@/components/footer/about-us/AboutUs'));


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
