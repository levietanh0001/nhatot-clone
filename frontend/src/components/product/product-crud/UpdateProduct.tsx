import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import useId from '@mui/material/utils/useId';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch } from '~/app/store';
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
} from '~/features/products/productSlice';
import { createProduct, updateProduct } from '~/features/products/productThunks';
import postProductFormSchema from '~/schemas/post-product/post-product-form-schema';
import { sanitizeBigIntString } from '~/utils/number.util';
import ProductForm from '~/components/product/product-form';
import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '~/utils/axios.util';
import axios from 'axios';
import { wait, waitAsync } from '~/utils/function.util';


const UpdateProduct = () => {

  const formId = useId();
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formValues, setFormValues] = useState<any | null>(null);
  const [hasProduct, setHasProduct] = useState<boolean>(false);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: ({ signal }) => {

      return axiosPrivate.get(`/products/${productId}`, { signal });
    },
    select: (data) => {
      return data.data;
    },
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
  })

  useEffect(() => {

    console.log({ productId });

    return () => {
      console.log('reset states');
      dispatch(resetAllProductProperties());
    };

  }, []);

  useEffect(() => {

    console.log({ product });

  }, [product]);

  useEffect(() => {

    if(!isLoading) {
      // console.log({ data });
      setFormValues(data);
      dispatch(setProductProperties({
        // more
        type: String(data.type),
        category: String(data.category),
        projectName: String(data.projectName),
        address: String(data.address),
        numBedrooms: Number(data.numBedrooms),
        numBathrooms: Number(data.numBathrooms),
        balconDirection: String(data.balconDirection),
        mainDoorDirection: String(data.mainDoorDirection),
        legalDocsStatus: String(data.legalDocsStatus),
        furnitureStatus: String(data.furnitureStatus),
        area: String(data.area),
        price: String(data.price),
        deposit: data.deposit,
        postTitle: String(data.postTitle),
        description: String(data.description),
        userType: String(data.userType),
        images: data.imageUrls.filter(imageUrl => imageUrl !== ''),
        videoThumbnailUrl: data.videoThumbnailUrl
      }));
      setHasProduct(true);
    }

  }, [data]);

  // useEffect(() => {
  //   console.log({ formValues });
  // }, [formValues]);

  useEffect(() => {

    if(isError) {
      console.error(error);
      navigate('/');
    }

  }, [error]);

  useEffect(() => {
    if (product.productCreated) {
      toast.success('Đăng tải thành công');
    }
    if (product.inputError.image) {
      toast.error(product.inputError.image);
    }
  }, [product.productCreated, product.inputError.image]);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(postProductFormSchema),
    values: {
      projectName: formValues && String(formValues.projectName),
      address: formValues && String(formValues.address),
      numBedrooms: formValues && Number(formValues.numBedrooms),
      numBathrooms: formValues && Number(formValues.numBathrooms),
      balconDirection: formValues && String(formValues.balconDirection),
      mainDoorDirection: formValues && String(formValues.mainDoorDirection),
      legalDocsStatus: formValues && String(formValues.legalDocsStatus),
      furnitureStatus: formValues && String(formValues.furnitureStatus),
      area: formValues && String(formValues.area),
      price: formValues && String(formValues.price),
      deposit: formValues && String(formValues.deposit),
      postTitle: formValues && String(formValues.postTitle),
      description: formValues && String(formValues.description),
    }
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
        window.scrollTo(0, 0);
        waitAsync(1800)
          .then(() => window.location.reload())
          .catch(error => console.error(error));

        return;
      }

      dispatch(updateProduct(productId ?? ''));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {hasProduct && ( 
        <ProductForm
          form={form}
          formId={formId}
          onFormSubmit={handleSubmit(onSubmit)}
          product={product}
          // product={formValues}
          onImageChange={(e) => dispatch(addProductImage(e.target.files[0]))}
          onImagesChange={(e) => dispatch(setProductImages(e.target.files))}
          onImageRemove={(index) => dispatch(removeImageByIndex(index))}
          onVideoChange={(e) => dispatch(setProductVideo(e.target.files[0]))}
          onVideoRemove={() => {
            dispatch(resetProductProperties('videoThumbnailUrl'));
            dispatch(resetProductProperties('video'));
          }}
          onVideoThumbnailCreate={(videoThumbnail) =>
            dispatch(setProductProperties({ videoThumbnail }))
          }
          onVideoThumbnailUrlCreate={(url) => {
            dispatch(setProductProperties({ videoThumbnailUrl: 'true' }));
          }}
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
      )}

    </>
  );
};

export default UpdateProduct;
