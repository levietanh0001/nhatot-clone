import React, { Profiler } from 'react';
import AboutUs from '~/components/footer/about-us/AboutUs';
import Filters from '~/components/filters/Filters';
import TopNav from '~/components/navbar';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import Breadcrumb from '~/components/breadcrumb/Breadcrumb';
import Ads from '~/components/ads/Ads';
import FilterBoard from '~/components/filters/FilterBoard';
import UserTypeTabs from '~/components/tabs/UserTypeTabs';
import ProductCardList from '~/components/product-list/ProductCardList';
import ContentWithAdsLayout from '~/layouts/ContentWithAdsLayout';
import ProductList from '~/components/product-list/ProductList';

const ProductListPage = () => {

  // function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    
    
  // }

  return (
    <>
      <Header>
        <TopNav />
        <Filters />
      </Header>
      <body>
        <Ads />
        <Breadcrumb />
        <PageTitle />
        <main>
          <ContentWithAdsLayout>
            <ProductList />
            {/* <Profiler id='ProductList' onRender={onRender}>
            </Profiler> */}
            {/* 
            <FilterBoard />
            <UserTypeTabs />
            <ProductCardList /> 
            */}
          </ContentWithAdsLayout>
        </main>
      </body>
      <Footer>
        <AboutUs />
      </Footer>
    </>
  );
};

const PageTitle = () => {
  return (
    <div className='container'>
      <h1 style={{ margin: '15px 0 15px 0', fontSize: '1.25rem' }}>
        Mua bán bất động sản giá tốt
      </h1>
    </div>
  );
};

export default ProductListPage;
