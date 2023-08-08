import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import useId from '@mui/material/utils/useId';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch } from '~/app/store';
import { addProductImage, removeImageByIndex, resetAllProductProperties, resetProductProperties, setImageError, setProductImages, setProductProperties, setProductVideo, setVideoThumbnail } from '~/features/products/productSlice';
import { createProduct } from '~/features/products/productThunks';
import postProductFormSchema from '~/schemas/post-product/post-product-form-schema';
import { sanitizeBigIntString } from '~/utils/number.util';
import ProductForm from './ProductForm';

const PostProduct = () => {

  const formId = useId();
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      console.log('reset states');
      dispatch(resetAllProductProperties());
    };
  }, []);

  useEffect(() => {
    if (product.productCreated) {
      toast.success('Đăng tải thành công');
    }
    if (product.imageError) {
      toast.error(product.imageError);
    }
  }, [product.productCreated, product.imageError]);

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

      if (product.value.images?.length === 0) {
        dispatch(setImageError('Cần có ảnh minh họa cho sản phẩm'));
        window.scrollTo(0, 0);
        return;
      }

      dispatch(createProduct());

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <ProductForm
      form={form}
      formId={formId}
      onFormSubmit={handleSubmit(onSubmit)}
      product={product}
      onImageChange={(e) => dispatch(addProductImage(e.target.files[0]))}
      onImagesChange={(e) => dispatch(setProductImages(e.target.files))}
      onImageRemove={(index) => dispatch(removeImageByIndex(index))}
      onVideoChange={(e) => dispatch(setProductVideo(e.target.files[0]))}
      onVideoRemove={() => dispatch(resetProductProperties('video'))}
      onVideoThumbnailCreate={(videoThumbnail) => dispatch(setVideoThumbnail(videoThumbnail))}
      onCategoryChange={(value) => dispatch(setProductProperties({ category: value }))}
      onProductTypeSelect={(value) => dispatch(setProductProperties({ type: value }))}
      onAddressChange={(e) => dispatch(setProductProperties({ address: e.target.value }))}
      onProjectNameChange={(e) => dispatch(setProductProperties({ projectName: e.target.value }))}
      onNumBedRoomsChange={(e) => dispatch(setProductProperties({ numBedrooms: sanitizeBigIntString(e.target.value) }))}
      onNumBathroomsChange={(e) => dispatch(setProductProperties({ numBathrooms: sanitizeBigIntString(e.target.value) }))}
      onBalconDirectionChange={(e) => dispatch(setProductProperties({ balconDirection: e.target.value }))}
      onMainDirectionChange={(e) => dispatch(setProductProperties({ mainDoorDirection: e.target.value }))}
      onLegalDocsStatusChange={(e) => dispatch(setProductProperties({ legalDocsStatus: e.target.value }))}
      onFurnitureStatusChange={(e) => dispatch(setProductProperties({ furnitureStatus: e.target.value }))}
      onAreaChange={(e) =>dispatch(setProductProperties({ area: e.target.value }))}
      onPriceChange={(e) =>dispatch(setProductProperties({ price: sanitizeBigIntString(e.target.value) }))}
      onDepositChange={(e) => dispatch(setProductProperties({ deposit: sanitizeBigIntString(e.target.value) }))}
      onPostTitleChange={(e) => dispatch(setProductProperties({postTitle: e.target.value }))}
      onPostDescriptionChange={(e) => dispatch(setProductProperties({ description: e.target.value }))}
      onUserTypeSelect={(value) => dispatch(setProductProperties({ userType: value }))}
    />

  );
};


export default PostProduct;
