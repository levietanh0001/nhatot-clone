import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { axiosInstance } from "~/utils/axios.util";
import { commaSeparatedStringToNumber } from "~/utils/number.util";

export const getProducts = createAsyncThunk(
  'product/getProducts', // used to generate additional Redux action type constants, representing the lifecycle of an async request
  async (arg, thunkAPI) => {
    const res = await axiosInstance.get('products');
    return res.data;
  }
); // returns a promise (pending, fulfilled, rejected)

export const getProductById = createAsyncThunk(
  'product/getProductById', // used to generate additional Redux action type constants, representing the lifecycle of an async request
  async (productId: string, thunkAPI) => {

    const res = await axiosInstance.get(`products/${productId}`);
    return res.data;
  }
);

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

    const area = productState.value.area ? parseFloat(productState.value.area) : null;
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

    productState.value.images.forEach((image) =>
      productFormData.append('images', image)
    );

    for (let [key, value] of Object.entries(productData)) {
      productFormData.set(key, value as string);
    }

    const createdProductResponse = await axiosInstance.post(
      'products',
      productFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    const createdProductData = createdProductResponse.data;

    const videoFormData = new FormData();

    if (productState.value.video) {
      const productId = createdProductData['id'];
      videoFormData.set('video', productState.value.video as Blob);

      await axiosInstance.post(
        'products/video',
        videoFormData,
        {
          params: { productId },
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const videoThumbnailFormData = new FormData();
      videoThumbnailFormData.set('image', productState.value.videoThumbnail as Blob);
      await axiosInstance.post(
        'products/video-thumbnail',
        videoThumbnailFormData,
        {
          params: { productId },
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
    }

    

  }
);