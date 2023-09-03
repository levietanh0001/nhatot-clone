import { FormProvider } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from './ProductForm.module.scss';
import ActionButtons from './ActionButtons';
import EmptyState from './EmptyState';
import PostDetails from './PostDetails';
import ProductCategory from './ProductCategory';
import ProductInfo from './ProductInfo';
import ProductLocation from './ProductLocation';
import ProductType from './ProductType';
import UploadMedia from './Upload';
import UserType from './UserType';
import { useEffect } from 'react';

const ProductForm = (props) => {
  const {
    formId,
    form,
    onFormSubmit,
    product,
    onImageChange,
    onImagesChange,
    onImageRemove,
    onVideoChange,
    onVideoRemove,
    onVideoThumbnailCreate,
    onVideoThumbnailUrlCreate,
    onCategoryChange,
    onProductTypeSelect,
    onAddressChange,
    onProjectNameChange,
    onNumBedRoomsChange,
    onNumBathroomsChange,
    onBalconDirectionChange,
    onMainDirectionChange,
    onLegalDocsStatusChange,
    onFurnitureStatusChange,
    onAreaChange,
    onPriceChange,
    onDepositChange,
    onPostTitleChange,
    onPostDescriptionChange,
    onUserTypeSelect,
  } = props;

  // useEffect(() => {
  //   console.log({ uploadProduct: product });
  // }, []);

  return (
    <Wrapper>
      <FormProvider {...form}>
        <UploadMedia
          formId={formId}
          product={product}
          // images={product.value.images}
          // video={product.value.video}
          onImageChange={onImageChange}
          onImagesChange={onImagesChange}
          onImageRemove={onImageRemove}
          onVideoChange={onVideoChange}
          onVideoRemove={onVideoRemove}
          onVideoThumbnailCreate={onVideoThumbnailCreate}
          onVideoThumbnailUrlCreate={onVideoThumbnailUrlCreate}
          imageError={product.inputError.image}
          videoErrors={product.videoError}
        />

        <div className={styles['details']}>
          <form
            id={formId}
            aria-label='product details form'
            onSubmit={onFormSubmit}
            noValidate
          >
            <ProductCategory
              product={product.value}
              onCategoryChange={onCategoryChange}
              name='category'
            />

            <ProductType
              product={product.value}
              onProductTypeSelect={onProductTypeSelect}
              productTypeError={product.inputError.type}
            />

            <ProductLocation
              product={product.value}
              onAddressChange={onAddressChange}
              onProjectNameChange={onProjectNameChange}
            />

            <ProductInfo
              product={product.value}
              onNumBedRoomsChange={onNumBedRoomsChange}
              onNumBathroomsChange={onNumBathroomsChange}
              onBalconDirectionChange={onBalconDirectionChange}
              onMainDirectionChange={onMainDirectionChange}
              onLegalDocsStatusChange={onLegalDocsStatusChange}
              onFurnitureStatusChange={onFurnitureStatusChange}
              onAreaChange={onAreaChange}
              onPriceChange={onPriceChange}
              onDepositChange={onDepositChange}
            />

            <PostDetails
              product={product.value}
              onPostTitleChange={onPostTitleChange}
              onPostDescriptionChange={onPostDescriptionChange}
            />

            <UserType
              product={product.value}
              onUserTypeSelect={onUserTypeSelect}
            />

            <ActionButtons formId={formId} />

            {JSON.stringify({ errors: form.formState.errors, values: form.getValues().projectName })}
            {/* {JSON.stringify({ errors: form.formState.errors, values: form.getValues() })} */}
            {/* {!product.value.category && <EmptyState />} */}
          </form>
        </div>
      </FormProvider>
    </Wrapper>
  );
};

const Wrapper = ({ children }) => {
  return (
    <div className={styles['outer-wrapper']}>
      <div className='container'>
        <ToastContainer
          position='top-right'
          hideProgressBar
          theme='colored'
          autoClose={2000}
        />
        <div className={styles['inner-wrapper']}>{children}</div>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  formId: PropTypes.string,
  form: PropTypes.object,
  onFormSubmit: PropTypes.func,
  product: PropTypes.object,
  onImageChange: PropTypes.func,
  onImagesChange: PropTypes.func,
  onImageRemove: PropTypes.func,
  onVideoChange: PropTypes.func,
  onVideoRemove: PropTypes.func,
  onVideoThumbnailCreate: PropTypes.func,
  onVideoThumbnailUrlCreate: PropTypes.func,
  onCategoryChange: PropTypes.func,
  onProductTypeSelect: PropTypes.func,
  onAddressChange: PropTypes.func,
  onProjectNameChange: PropTypes.func,
  onNumBedRoomsChange: PropTypes.func,
  onNumBathroomsChange: PropTypes.func,
  onBalconDirectionChange: PropTypes.func,
  onMainDirectionChange: PropTypes.func,
  onLegalDocsStatusChange: PropTypes.func,
  onFurnitureStatusChange: PropTypes.func,
  onAreaChange: PropTypes.func,
  onPriceChange: PropTypes.func,
  onDepositChange: PropTypes.func,
  onPostTitleChange: PropTypes.func,
  onPostDescriptionChange: PropTypes.func,
  onUserTypeSelect: PropTypes.func,
};

export default ProductForm;
