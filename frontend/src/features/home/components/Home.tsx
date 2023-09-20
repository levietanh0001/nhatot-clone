import Skeleton from '@mui/material/Skeleton';
import { lazy } from 'react';
import { SuspenseWrapper } from '@/components/suspense/SuspenseWrapper'

import ProductSliders from '@/features/product/components/product-sliders/ProductSliders';
const TopCarousel = lazy(() => import('@/features/home/components/top-carousel/TopCarousel'));
const KhamPhaNhaTot = lazy(() => import('@/features/home/components/kham-pha-nha-tot/KhamPhaNhaTot'));
const CongCuDichVu = lazy(() => import('@/features/home/components/cong-cu-dich-vu/CongCuDichVu'));
const Glossary = lazy(() => import('@/features/home/components/glossary/Glossary'));
const Keywords = lazy(() => import('@/features/home/components/keywords/Keywords'));


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