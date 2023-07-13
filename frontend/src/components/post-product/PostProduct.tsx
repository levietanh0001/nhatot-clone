import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './PostProduct.module.scss';
import { RootState, useAppDispatch } from '~/app/store';
import ProductCategory from './ProductCategory';
import ProductLocation from './ProductLocation';
import ProductType from './ProductType';
import UploadMedia from './Upload';
import EmptyState from './EmptyState';
import ProductDetails from './ProductDetails';
import UserType from './UserType';
import ActionButtons from './ActionButtons';
import { postProductActions } from '~/features/post-product/postProductSlice';
import PostDetails from './PostDetails';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import postProductFormSchema from '~/schemas/post-product/post-product-form-schema';
import FloatingLabelInput from '../input/FloatingLabelInput';
import clsx from 'clsx';


const PostProduct = () => {

  // const [productState, setProductState] = useState<any>();
  const product = useSelector((state: RootState) => state.postProduct.product);
  const formStep = useSelector((state: RootState) => state.postProduct.formStep);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setProductState(product);
  // }, [product]);

  useEffect(() => {
    console.log({ formStep, ...product });
  }, [product, formStep]);

  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(postProductFormSchema),
  });
  const { handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log({ data });
  };

  const handleProductCategoryChange = (value) => {
    dispatch(postProductActions.setProductCategory(value));
    dispatch(postProductActions.incrementFormStep());
  }

  const handleProductTypeSelect = (value) => {
    dispatch(postProductActions.setProductType(value));
    dispatch(postProductActions.incrementFormStep());
  }

  const handleProjectNameChange = (e) => {
    dispatch(postProductActions.setProjectName(e.target.value));
  }

  const handleAddressChange = (e) => {
    dispatch(postProductActions.setAddress(e.target.value));
    dispatch(postProductActions.incrementFormStep());
  }

  const handleNumBedRoomsChange = (e) => {
    dispatch(postProductActions.setNumBedrooms(e.target.value));
  }

  const handleNumBathroomsChange = (e) => {
    dispatch(postProductActions.setNumBathrooms(e.target.value));
  }

  const handleBalconDirectionChange = (e) => {
    dispatch(postProductActions.setBalconDirection(e.target.value));
  }

  const handleMainDirectionChange = (e) => {
    dispatch(postProductActions.setMainDoorDirection(e.target.value));
  }

  const handleHasLegalDocsChange = (e) => {
    dispatch(postProductActions.setHasLegalDocs(e.target.value));
  }

  const handleFurnitureStatusChange = (e) => {
    dispatch(postProductActions.setFurnitureStatus(e.target.value));
  }

  const handleAreaChange = (e) => {
    dispatch(postProductActions.setArea(e.target.value));
  }

  const handlePriceChange = (e) => {
    dispatch(postProductActions.setPrice(e.target.value));
    dispatch(postProductActions.incrementFormStep());
  }

  const handleDepositChange = (e) => {
    dispatch(postProductActions.setDeposit(e.target.value));
  }

  const handleUserTypeSelect = (value) => {
    dispatch(postProductActions.setUserType(value));
    dispatch(postProductActions.incrementFormStep());
  };

  return (
    <Wrapper>
      <UploadMedia />

      <div className={styles['details']}>
        <FormProvider {...form}>
          <form aria-label='product details form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <ProductCategory product={product} onProductCategoryChange={handleProductCategoryChange} />
            {formStep > 0 && <ProductType product={product} onProductTypeSelect={handleProductTypeSelect} />}
            {formStep > 1 && <ProductLocation product={product} onAddressChange={handleAddressChange} onProjectNameChange={handleProjectNameChange} />}
            {formStep > 2 && <ProductDetails product={product} onNumBedRoomsChange={handleNumBedRoomsChange} onNumBathroomsChange={handleNumBathroomsChange} onBalconDirectionChange={handleBalconDirectionChange} onMainDirectionChange={handleMainDirectionChange} onHasLegalDocsChange={handleHasLegalDocsChange} onFurnitureStatusChange={handleFurnitureStatusChange} onAreaChange={handleAreaChange} onPriceChange={handlePriceChange} onDepositChange={handleDepositChange} />}
            {formStep > 3 && <UserType product={product} onUserTypeSelect={handleUserTypeSelect} />}
            {formStep > 3 && <ActionButtons />}
            {formStep === 0 && !product.productCategory && <EmptyState />} 
          </form>
        </FormProvider>
      </div>

    </Wrapper>
  );
};

const Wrapper = ({ children }) => {
  return (
    <div className={styles['outer-wrapper']}>
      <div className='container'>
        <div className={styles['inner-wrapper']}>{children}</div>
      </div>
    </div>
  );
}

export default PostProduct;
