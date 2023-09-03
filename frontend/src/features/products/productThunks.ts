import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '~/api/axios.api';
import { RootState } from '~/app/store';
import { commaSeparatedStringToNumber } from '~/utils/number.util';

export const getProducts = createAsyncThunk(
  'product/getProducts', // used to generate additional Redux action type constants, representing the lifecycle of an async request
  async (arg, thunkAPI) => {
    const res = await axiosPrivate.get('products');
    return res.data;
  }
); // returns a promise (pending, fulfilled, rejected)

export const getProductById = createAsyncThunk(
  'product/getProductById', // used to generate additional Redux action type constants, representing the lifecycle of an async request
  async (productId: string, thunkAPI) => {
    const res = await axiosPrivate.get(`products/${productId}`);
    return res.data;
  }
);


export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (productId: string, thunkAPI) => {

    const state = thunkAPI.getState() as RootState;
    const productState = state.product;

    // const response = await axios.get(String(productState.value.images[0]), { responseType: 'blob' });
    // console.log({ response: response.data });
    // let productThumbnailImage = new File([response.data as BlobPart], 'thumbnail.png', { type: 'image/png' });

    const imageUrls = productState.value.images? productState.value.images.map(image => {
      if(typeof image === 'string') {
        return image;
      }
      return '';
    }): [];

    const images = (productState.value.images as any[]).filter(image => {
      if(image instanceof File) {
        return image;
      }
    });

    const newProductData: any = {
      ...productState.value,
      imageUrls: JSON.stringify(imageUrls),
      images
    }

    delete newProductData['images'];
    delete newProductData['video'];
    delete newProductData['videoThumbnail'];
    console.log({ productId, newProductData });

    if (!Array.isArray(productState.value.images)) {
      throw new Error('Product images are undefined');
    }

    const productFormData = new FormData();

    if(productState.value.images.length > 0) {
      productState.value.images.forEach((image) => {
        productFormData.append('images', image);
      });
    }

    for (let [key, value] of Object.entries(newProductData)) {
      productFormData.set(key, value as string);
    }

    const updateProductResponse = await axiosPrivate.put(
      `products/${productId}`,
      productFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    console.log({ updateProductResponse });

    // update video
    if(productState.value.video) {

      const videoFormData = new FormData();
        
      videoFormData.set('video', productState.value.video as Blob ?? '');
  
      await axiosPrivate.post('products/video', videoFormData, {
        params: { productId },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const videoThumbnailFormData = new FormData();
      videoThumbnailFormData.set(
        'image',
        productState.value.videoThumbnail as Blob
      );
      await axiosPrivate.post(
        'products/video-thumbnail',
        videoThumbnailFormData,
        {
          params: { productId },
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

    }

    
  }
)


export const createProduct = createAsyncThunk(
  'product/createProduct', // used to generate additional Redux action type constants, representing the lifecycle of an async request
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const productState = state.product;

    const numBedrooms = productState.value.numBedrooms
      ? parseInt(productState.value.numBedrooms)
      : '';
    const numBathrooms = productState.value.numBathrooms
      ? parseInt(productState.value.numBathrooms)
      : '';
    const price = productState.value.price
      ? commaSeparatedStringToNumber(productState.value.price)
      : '';
    const deposit = productState.value.deposit
      ? commaSeparatedStringToNumber(productState.value.deposit)
      : '';

    const area = productState.value.area
      ? parseFloat(productState.value.area)
      : null;
    const productData = {
      type: productState.value.type,
      category: productState.value.category,
      projectName: productState.value.projectName,
      address: productState.value.address,
      numBedrooms,
      numBathrooms,
      balconDirection: productState.value.balconDirection,
      mainDoorDirection: productState.value.mainDoorDirection,
      legalDocsStatus: productState.value.legalDocsStatus,
      furnitureStatus: productState.value.furnitureStatus,
      area,
      price,
      deposit,
      postTitle: productState.value.postTitle,
      description: productState.value.description,
      userType: productState.value.userType,
    };
    delete productData['images'];
    delete productData['video'];

    console.log({ productData });

    const productFormData = new FormData();

    if (!productState.value.images) {
      throw new Error('Product images are undefined');
    }

    productState.value.images.forEach((image) => {
      productFormData.append('images', image);
    });

    for (let [key, value] of Object.entries(productData)) {
      productFormData.set(key, value as string);
    }

    const createdProductResponse = await axiosPrivate.post(
      'products',
      productFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    const createdProductData = createdProductResponse.data;

    const videoFormData = new FormData();

    if (productState.value.video) {
      const productId = createdProductData['id'];
      videoFormData.set('video', productState.value.video as Blob);

      await axiosPrivate.post('products/video', videoFormData, {
        params: { productId },
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const videoThumbnailFormData = new FormData();
      videoThumbnailFormData.set(
        'image',
        productState.value.videoThumbnail as Blob
      );
      await axiosPrivate.post(
        'products/video-thumbnail',
        videoThumbnailFormData,
        {
          params: { productId },
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
    }
  }
);
