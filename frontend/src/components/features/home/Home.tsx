import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/shared/suspense/SuspenseWrapper'

// import ProductSliders from '~/components/features/product/product-sliders/ProductSliders';
const TopCarousel = lazy(() => import('~/components/features/home/top-carousel/TopCarousel'));
const ProductSliders = lazy(() => import('~/components/features/product/product-sliders/ProductSliders'));
const KhamPhaNhaTot = lazy(() => import('~/components/features/home/kham-pha-nha-tot/KhamPhaNhaTot'));
const CongCuDichVu = lazy(() => import('~/components/features/home/cong-cu-dich-vu/CongCuDichVu'));
const Glossary = lazy(() => import('~/components/features/home/glossary/Glossary'));
const Keywords = lazy(() => import('~/components/features/home/keywords/Keywords'));


const Home = () => {
  return (
    <>

      <SuspenseWrapper>
        <TopCarousel />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <KhamPhaNhaTot />
        <CongCuDichVu />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <ProductSliders />
      </SuspenseWrapper>

      <SuspenseWrapper>
        <Glossary />
        <Keywords />
      </SuspenseWrapper>

    </>
  )
}

export default Home