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
import {
  commaSeparatedStringToNumber,
  sanitizeBigIntString,
  sanitizeNumberString,
} from '~/utils/number.util';
import useId from '@mui/material/utils/useId';
import { extractUploadedFiles, validateFileSize, validateFilesSize } from '~/utils/file.util';
import useFetch from '~/hooks/useFetch';
import { backendBaseUrl } from '~/utils/variables.util';
import { buildFormData, logFormData } from '~/utils/form.util';
import { useNavigate } from 'react-router-dom';

let renderCount = 0;

const PostProduct = () => {
  const formId = useId();
  const product = useSelector((state: RootState) => state.postProduct.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [imageErrors, setImageErrors] = useState<string | null>(null);
  const [videoErrors, setVideoErrors] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);

  useEffect(() => {

    console.log({ ...product });

  }, [product]);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(postProductFormSchema),
  });
  const { handleSubmit } = form;

  const onSubmit = async (data, e) => {

    e.preventDefault();

    const numBedrooms = product.numBedrooms? parseInt(product.numBedrooms): null;
    const numBathrooms = product.numBathrooms? parseInt(product.numBathrooms): null;
    const price = product.price? commaSeparatedStringToNumber(product.price): null;
    const deposit = product.deposit? commaSeparatedStringToNumber(product.deposit): null;
    const area = product.area ? parseFloat(product.area) : null;
    const productData = { ...product, numBedrooms, numBathrooms, price, deposit, area };
    delete productData['images'];
    delete productData['video'];
    // console.log({ productData });
    // console.log({ product });

    const productFormData = new FormData();
    const videoFormData = new FormData();

    // add media files to form data
    if(product.images) {
      product.images.forEach(image => productFormData.append('images', image));
    }

    for(let [key, value] of Object.entries(productData)) {
      productFormData.set(key, value as string);
    }
    
    // inspect productFormData
    logFormData(productFormData);

    try {
      
      const createProductUrl = new URL('api/products', backendBaseUrl);
      const createProductResponse = await fetch(createProductUrl, {
        method: 'POST',
        body: productFormData
      });
      const createdProductData = await createProductResponse.json();
      console.log(createdProductData);

      videoFormData.set('video', product.video as Blob);
      const uploadVideoUrl = new URL('api/products/video', backendBaseUrl);
      const uploadVideoResponse = await fetch(uploadVideoUrl, {
        method: 'POST',
        body: videoFormData
      });
      console.log(uploadVideoResponse);

      // navigate('/');

    } catch (error) {
      console.error(error);
    } finally {

      // navigate('/');
    }

  };

  const handleProductCategoryChange = (value) => {
    dispatch(postProductActions.setProductCategory(value));
  };

  const handleProductTypeSelect = (value) => {
    dispatch(postProductActions.setProductType(value));
  };

  const handleProjectNameChange = (e) => {
    dispatch(postProductActions.setProjectName(e.target.value));
  };

  const handleAddressChange = (e) => {
    dispatch(postProductActions.setAddress(e.target.value));
  };

  const handleNumBedRoomsChange = (e) => {
    dispatch(
      postProductActions.setNumBedrooms(sanitizeBigIntString(e.target.value))
    );
  };

  const handleNumBathroomsChange = (e) => {
    dispatch(
      postProductActions.setNumBathrooms(sanitizeBigIntString(e.target.value))
    );
  };

  const handleBalconDirectionChange = (e) => {
    dispatch(postProductActions.setBalconDirection(e.target.value));
  };

  const handleMainDirectionChange = (e) => {
    dispatch(postProductActions.setMainDoorDirection(e.target.value));
  };

  const handleHasLegalDocsChange = (e) => {
    dispatch(postProductActions.setHasLegalDocs(e.target.value));
  };

  const handleFurnitureStatusChange = (e) => {
    dispatch(postProductActions.setFurnitureStatus(e.target.value));
  };

  const handleAreaChange = (e) => {
    dispatch(postProductActions.setArea(e.target.value));
  };

  const handlePriceChange = (e) => {
    dispatch(postProductActions.setPrice(sanitizeBigIntString(e.target.value)));
  };
  const handleDepositChange = (e) => {
    dispatch(
      postProductActions.setDeposit(sanitizeBigIntString(e.target.value))
    );
  };

  const handleProductTitleChange = (e) => {
    dispatch(postProductActions.setPostTitle(e.target.value));
  };

  const handleProductDescriptionChange = (e) => {
    dispatch(postProductActions.setDescription(e.target.value));
  };

  const handleUserTypeSelect = (value) => {
    dispatch(postProductActions.setUserType(value));
  };

  const handleImageChange = (event) => {
    const imageArr = extractUploadedFiles(event.target.files);
    const imageSizeLimit = 5; // MB
    if (validateFilesSize(imageArr, imageSizeLimit)) {
      setImageErrors('');
      dispatch(postProductActions.appendImages(imageArr));
    } else {
      setImageErrors(`Mỗi ảnh cho phép kích thước tối đa là ${imageSizeLimit}`);
    }
  };

  const handleVideoChange = (event) => {

    const video = event.target.files[0];
    const videoSizeLimit = 25;

    if(validateFileSize(video, videoSizeLimit)) {
      setVideoErrors('');
      dispatch(postProductActions.setVideo(video));
    } else {
      setVideoErrors(
        `Video cho phép kích thước tối đa là ${videoSizeLimit}`
      );
    }
  };

  const handleImageRemove = (index) => {
    dispatch(postProductActions.removeImageByIndex(index));
  }

  const handleVideoRemove = () => {
    dispatch(postProductActions.clearVideo());
  }

  // renderCount++;
  const postProductFormId = formId;
  const isAddressValid = !form.formState.errors?.['address'];
  const isProductDetailsValid =
    !form.formState.errors?.['numBedrooms'] &&
    !form.formState.errors?.['numBathrooms'] &&
    !form.formState.errors?.['area'] &&
    !form.formState.errors?.['price'];
  const isPostDetailsValid =
    !form.formState.errors['postTitle'] &&
    !form.formState.errors['description'];

  return (
    <Wrapper>
      <FormProvider {...form}>
        <UploadMedia
          formId={postProductFormId}
          images={product.images}
          video={product.video}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
          onVideoChange={handleVideoChange}
          onVideoRemove={handleVideoRemove}
          imageErrors={imageErrors}
          videoErrors={videoErrors}
        />

        <div className={styles['details']}>
          <form
            id={postProductFormId}
            aria-label='product details form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* {renderCount} */}
            <ProductCategory
              product={product}
              onProductCategoryChange={handleProductCategoryChange}
              name='productCategory'
            />
            {product.productCategory && (
              <ProductType
                product={product}
                onProductTypeSelect={handleProductTypeSelect}
              />
            )}
            {product.productType && (
              <ProductLocation
                product={product}
                onAddressChange={handleAddressChange}
                onProjectNameChange={handleProjectNameChange}
              />
            )}
            {product.address && isAddressValid && (
              <ProductDetails
                product={product}
                onNumBedRoomsChange={handleNumBedRoomsChange}
                onNumBathroomsChange={handleNumBathroomsChange}
                onBalconDirectionChange={handleBalconDirectionChange}
                onMainDirectionChange={handleMainDirectionChange}
                onHasLegalDocsChange={handleHasLegalDocsChange}
                onFurnitureStatusChange={handleFurnitureStatusChange}
                onAreaChange={handleAreaChange}
                onPriceChange={handlePriceChange}
                onDepositChange={handleDepositChange}
              />
            )}
            {product.numBedrooms &&
              product.numBathrooms &&
              product.area &&
              product.price &&
              isProductDetailsValid && (
                <PostDetails
                  product={product}
                  onPostTitleChange={handleProductTitleChange}
                  onPostDescriptionChange={handleProductDescriptionChange}
                />
              )}
            {product.postTitle && product.description && isPostDetailsValid && (
              <UserType
                product={product}
                onUserTypeSelect={handleUserTypeSelect}
              />
            )}

            {product.userType && <ActionButtons formId={postProductFormId} />}

            {/* 
            {JSON.stringify({ errors: form.formState.errors })}
            {JSON.stringify({
              isAddressValid,
              isProductDetailsValid,
              isPostDetailsValid,
            })}
             */}
            {/* {JSON.stringify({ values: form.getValues() })} */}

            {!product.productCategory && <EmptyState />}
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
        <div className={styles['inner-wrapper']}>{children}</div>
      </div>
    </div>
  );
};

export default PostProduct;
