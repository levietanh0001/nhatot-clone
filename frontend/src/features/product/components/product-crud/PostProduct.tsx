import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import useId from '@mui/material/utils/useId';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch } from '@/app/store';
import ProductForm from '@/features/product/components/product-form';
import {
  addProductImage,
  removeImageByIndex,
  resetAllProductProperties,
  resetProductProperties,
  setInputError,
  setProductImages,
  setProductProperties,
  setProductVideo,
  setVideoThumbnail,
} from '@/features/product/product.slice';
import { createProduct } from '@/features/product/product.thunk';
import { sanitizeBigIntString } from '@/utils/number.util';
import postProductFormSchema from '../../schemas/post-product-form.schema';
import { AuthContext } from '@/contexts/auth/Auth.context';

const PostProduct = () => {
  const formId = useId();
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log({ inputError: product.inputError });
    return () => {
      console.log('reset states');
      dispatch(resetAllProductProperties());
    };
  }, []);

  useEffect(() => {
    if (product.productCreated) {
      // toast.success('Đăng tải thành công');
      const userId = authContext?.user?.userId;
      if(userId) {
        navigate(`/user-profile/${userId}`, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [product.productCreated]);

  const form = useForm({
    mode: 'onTouched',
    resolver: yupResolver(postProductFormSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      if (!product.value.images) {
        throw new Error('Product images are undefined');
      }

      if (product.value.images?.length === 0) {
        dispatch(setInputError({ image: 'Cần có ảnh minh họa cho sản phẩm' }));
        window.scrollTo({ top: 10, behavior: 'smooth' });
        toast.error('Vui lòng kiểm tra lại form');
        return;
      }

      if (!product.value.type) {
        dispatch(setInputError({ type: 'Danh mục sản phẩm không thể trống' }));
        window.scrollTo({ top: 10, behavior: 'smooth' });
        toast.error('Vui lòng kiểm tra lại form');
        return;
      }

      if (Object.entries(form.formState.errors).length > 0) {
        window.scrollTo({ top: 10, behavior: 'smooth' });
        toast.error('Vui lòng kiểm tra lại form');
        return;
      }

      for (const [key, value] of Object.entries(product.inputError)) {
        if (value) {
          console.log({ key, value });
          window.scrollTo({ top: 10, behavior: 'smooth' });
          toast.error('Vui lòng kiểm tra lại form');
          break;
        }
      }

      dispatch(createProduct());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductForm
      disabledSubmitBtn={product.loading}
      form={form}
      formId={formId}
      onFormSubmit={handleSubmit(onSubmit)}
      product={product}
      onImageChange={(e) => dispatch(addProductImage(e.target.files[0]))}
      onImagesChange={(e) => dispatch(setProductImages(e.target.files))}
      onImageRemove={(index) => dispatch(removeImageByIndex(index))}
      onVideoChange={(e) => dispatch(setProductVideo(e.target.files[0]))}
      onVideoRemove={() => dispatch(resetProductProperties('video'))}
      onVideoThumbnailCreate={(videoThumbnail) =>
        dispatch(setVideoThumbnail(videoThumbnail))
      }
      onCategoryChange={(value) =>
        dispatch(setProductProperties({ category: value }))
      }
      onProductTypeSelect={(value) =>
        dispatch(setProductProperties({ type: value }))
      }
      onAddressChange={(e) =>
        dispatch(setProductProperties({ address: e.target.value }))
      }
      onProjectNameChange={(e) =>
        dispatch(setProductProperties({ projectName: e.target.value }))
      }
      onNumBedRoomsChange={(e) =>
        dispatch(
          setProductProperties({
            numBedrooms: sanitizeBigIntString(e.target.value),
          })
        )
      }
      onNumBathroomsChange={(e) =>
        dispatch(
          setProductProperties({
            numBathrooms: sanitizeBigIntString(e.target.value),
          })
        )
      }
      onBalconDirectionChange={(e) =>
        dispatch(setProductProperties({ balconDirection: e.target.value }))
      }
      onMainDirectionChange={(e) =>
        dispatch(setProductProperties({ mainDoorDirection: e.target.value }))
      }
      onLegalDocsStatusChange={(e) =>
        dispatch(setProductProperties({ legalDocsStatus: e.target.value }))
      }
      onFurnitureStatusChange={(e) =>
        dispatch(setProductProperties({ furnitureStatus: e.target.value }))
      }
      onAreaChange={(e) =>
        dispatch(setProductProperties({ area: e.target.value }))
      }
      onPriceChange={(e) =>
        dispatch(
          setProductProperties({ price: sanitizeBigIntString(e.target.value) })
        )
      }
      onDepositChange={(e) =>
        dispatch(
          setProductProperties({
            deposit: sanitizeBigIntString(e.target.value),
          })
        )
      }
      onPostTitleChange={(e) =>
        dispatch(setProductProperties({ postTitle: e.target.value }))
      }
      onPostDescriptionChange={(e) =>
        dispatch(setProductProperties({ description: e.target.value }))
      }
      onUserTypeSelect={(value) =>
        dispatch(setProductProperties({ userType: value }))
      }
    />
  );
};

export default PostProduct;
