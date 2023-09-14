import Skeleton from '@mui/material/Skeleton';
import { lazy } from 'react';
import { SuspenseWrapper } from '~/components/ui/suspense/SuspenseWrapper'

import ProductSliders from '~/components/features/product/product-sliders/ProductSliders';
const TopCarousel = lazy(() => import('~/components/features/home/top-carousel/TopCarousel'));
// const ProductSliders = lazy(() => import('~/components/features/product/product-sliders/ProductSliders'));
const KhamPhaNhaTot = lazy(() => import('~/components/features/home/kham-pha-nha-tot/KhamPhaNhaTot'));
const CongCuDichVu = lazy(() => import('~/components/features/home/cong-cu-dich-vu/CongCuDichVu'));
const Glossary = lazy(() => import('~/components/features/home/glossary/Glossary'));
const Keywords = lazy(() => import('~/components/features/home/keywords/Keywords'));


const Home = () => {
  return (
    <>

      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton sx={{ height: '250px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      }>
        <TopCarousel />
      </SuspenseWrapper>

      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton sx={{ height: '125px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      }>
        <KhamPhaNhaTot />
      </SuspenseWrapper>

      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton sx={{ height: '125px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      }>
        <CongCuDichVu />
      </SuspenseWrapper>

      <ProductSliders />      

      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton sx={{ height: '300px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      }>
        <Glossary />
      </SuspenseWrapper>

      <SuspenseWrapper fallback={
        <div className='container'>
          <Skeleton sx={{ height: '270px', width: '100%', marginBottom: '10px', borderRadius: '12px' }} variant='rectangular' />
        </div>
      }>
        <Keywords />
      </SuspenseWrapper>

    </>
  )
}

export default Home