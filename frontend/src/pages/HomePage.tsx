import { lazy } from 'react';
import { SuspenseWrapper } from '~/App';
import ProductSliders from '~/components/features/product/product-sliders/ProductSliders';

const Header = lazy(() => import('~/components/layouts/Header'));
const TopNav = lazy(() => import('~/components/common/navbar'));
const TopCarousel = lazy(
  () => import('~/components/features/home/top-carousel/TopCarousel')
);
const KhamPhaNhaTot = lazy(
  () => import('~/components/features/home/kham-pha-nha-tot/KhamPhaNhaTot')
);
const CongCuDichVu = lazy(
  () => import('~/components/features/home/cong-cu-dich-vu/CongCuDichVu')
);
const Glossary = lazy(
  () => import('~/components/features/home/glossary/Glossary')
);
const Keywords = lazy(
  () => import('~/components/features/home/keywords/Keywords')
);
const Footer = lazy(() => import('~/components/layouts/Footer'));
const AboutUs = lazy(
  () => import('~/components/common/footer/about-us/AboutUs')
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
        <body>
          <SuspenseWrapper>
            <TopCarousel />
          </SuspenseWrapper>

          <SuspenseWrapper>
            <KhamPhaNhaTot />
            <CongCuDichVu />
          </SuspenseWrapper>

          <ProductSliders />

          <SuspenseWrapper>
            <Glossary />
            <Keywords />
          </SuspenseWrapper>
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

export default HomePage;
