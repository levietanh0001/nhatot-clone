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
import PostDetails from './PostDetails';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import postProductFormSchema from '~/schemas/post-product/post-product-form-schema';
import { sanitizeBigIntString } from '~/utils/number.util';
import useId from '@mui/material/utils/useId';
import {
  extractUploadedFiles,
  validateFileSize,
  validateFilesSize,
} from '~/utils/file.util';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createProduct } from '~/features/products/productThunks';
import { productActions } from '~/features/products/productSlice';

const PostProduct = () => {

  const formId = useId();
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [imageErrors, setImageErrors] = useState<string | null>(null);
  const [videoErrors, setVideoErrors] = useState<string | null>(null);

  useEffect(() => {

    return () => {
      console.log('reset states');
      dispatch(productActions.resetAllProductProperties());
    };
  }, []);

  useEffect(() => {

    if (product.productCreated) {
      toast.success('Đăng tải thành công');
    }

  }, [product.productCreated]);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(postProductFormSchema),
  });
  const { handleSubmit } = form;

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {

      if (!product.value.images) {
        throw new Error('Product images are undefined');
      }
      
      // add media files to form data
      if (product.value.images?.length === 0) {
        setImageErrors('Cần có ảnh minh họa cho sản phẩm');
        window.scrollTo(0, 0);
        throw new Error('Images are required');
      }

      // dispatch(productActions.generateProductData());
      dispatch(createProduct());

    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const imageArr = extractUploadedFiles(event.target.files);
    const imageSizeLimit = 5; // MB

    if (!validateFilesSize(imageArr, imageSizeLimit)) {
      setImageErrors(`Mỗi ảnh cho phép kích thước tối đa là ${imageSizeLimit}`);
    } else if (imageArr.length > 6) {
      setImageErrors(`Chỉ có thể tải lên tối đa 6 ảnh`);
    } else {
      setImageErrors('');
      dispatch(productActions.setProductProperties({ images: imageArr }));
    }
  };

  const handleVideoChange = (event) => {
    const video = event.target.files[0];
    const videoSizeLimit = 25;

    if (validateFileSize(video, videoSizeLimit)) {
      setVideoErrors('');
      dispatch(productActions.setProductProperties({ video: video }));
    } else {
      setVideoErrors(`Video cho phép kích thước tối đa là ${videoSizeLimit}`);
    }
  };

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
          images={product.value.images}
          video={product.value.video}
          onImageChange={handleImageChange}
          onImageRemove={(index) =>
            dispatch(productActions.removeImageByIndex(index))
          }
          onVideoChange={handleVideoChange}
          onVideoRemove={() =>
            dispatch(productActions.resetProductProperties('video'))
          }
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
            <ProductCategory
              product={product.value}
              onCategoryChange={(value) =>
                dispatch(
                  productActions.setProductProperties({ category: value })
                )
              }
              name='category'
            />

            {product.value.category && (
              <ProductType
                product={product.value}
                onProductTypeSelect={(value) =>
                  dispatch(productActions.setProductProperties({ type: value }))
                }
              />
            )}

            {product.value.type && (
              <ProductLocation
                product={product.value}
                onAddressChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      address: e.target.value,
                    })
                  )
                }
                onProjectNameChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      projectName: e.target.value,
                    })
                  )
                }
              />
            )}

            {product.value.address && isAddressValid && (
              <ProductDetails
                product={product.value}
                onNumBedRoomsChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      numBedrooms: sanitizeBigIntString(e.target.value),
                    })
                  )
                }
                onNumBathroomsChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      numBathrooms: sanitizeBigIntString(e.target.value),
                    })
                  )
                }
                onBalconDirectionChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      balconDirection: e.target.value,
                    })
                  )
                }
                onMainDirectionChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      mainDoorDirection: e.target.value,
                    })
                  )
                }
                onLegalDocsStatusChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      legalDocsStatus: e.target.value,
                    })
                  )
                }
                onFurnitureStatusChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      furnitureStatus: e.target.value,
                    })
                  )
                }
                onAreaChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      area: e.target.value,
                    })
                  )
                }
                onPriceChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      price: sanitizeBigIntString(e.target.value),
                    })
                  )
                }
                onDepositChange={(e) =>
                  dispatch(
                    productActions.setProductProperties({
                      deposit: sanitizeBigIntString(e.target.value),
                    })
                  )
                }
              />
            )}

            {product.value.numBedrooms &&
              product.value.numBathrooms &&
              product.value.area &&
              product.value.price &&
              isProductDetailsValid && (
                <PostDetails
                  product={product.value}
                  onPostTitleChange={(e) =>
                    dispatch(
                      productActions.setProductProperties({
                        postTitle: e.target.value,
                      })
                    )
                  }
                  onPostDescriptionChange={(e) =>
                    dispatch(
                      productActions.setProductProperties({
                        description: e.target.value,
                      })
                    )
                  }
                />
              )}

            {product.value.postTitle &&
              product.value.description &&
              isPostDetailsValid && (
                <UserType
                  product={product.value}
                  onUserTypeSelect={(value) =>
                    dispatch(
                      productActions.setProductProperties({ userType: value })
                    )
                  }
                />
              )}

            {product.value.userType && (
              <ActionButtons formId={postProductFormId} />
            )}

            {/* {JSON.stringify({ errors: form.formState.errors })} */}
            {/* {JSON.stringify({ isAddressValid, isProductDetailsValid, isPostDetailsValid })} */}
            {/* {JSON.stringify({ values: form.getValues() })} */}

            {!product.value.category && <EmptyState />}
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

export default PostProduct;
