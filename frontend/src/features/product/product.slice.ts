import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IInitialProductState, IProduct } from '@/interfaces/product.interface';
import { extractUploadedFiles, validateFileSize, validateFilesSize } from '@/utils/file.util';
import { createProduct, getProductById, getProducts, updateProduct } from './product.thunk';

export interface IAction extends PayloadAction<IProduct> {}

const initialState: IInitialProductState = {
  value: {
    type: '',
    category: '',
    projectName: '',
    address: '',
    numBedrooms: '',
    numBathrooms: '',
    balconDirection: '',
    mainDoorDirection: '',
    legalDocsStatus: 'dangchoso',
    furnitureStatus: '',
    area: '',
    price: '',
    deposit: '',
    postTitle: '',
    description: '',
    userType: '',
    images: [],
    imageUrls: [],
    video: null,
    videoThumbnailUrl: '',
  },
  loading: false,
  products: [],
  productCreated: false,
  productUpdated: false,
  error: '',
  inputError: {},
  // imageError: '',
  videoError: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // sync reducers
    setProductProperties: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    resetProductProperties: (state, action) => {
      if (!action.payload) {
        state.value = initialState.value;
      } else if (Array.isArray(action.payload)) {
        action.payload.forEach((prop) => {
          state.value = {
            ...initialState.value,
            [prop]: initialState.value[prop],
          };
        });
      } else {
        state.value = {
          // ...initialState.value,
          ...state.value,
          [action.payload]: initialState.value[action.payload],
        };
      }
    },
    setProductImages: (state, action) => {
      const imageArr = extractUploadedFiles(action.payload);
      const imageSizeLimit = 5; // MB

      if (!validateFilesSize(imageArr, imageSizeLimit)) {
        state.inputError.image = `Mỗi ảnh cho phép kích thước tối đa là ${imageSizeLimit}`;
      } else if (imageArr.length > 6) {
        state.inputError.image = `Chỉ có thể tải lên tối đa 6 ảnh`;
      } else {
        state.inputError.image = '';
        state.value.images = imageArr;
      }
    },
    addProductImage: (state, action) => {
      const image = action.payload;

      console.log({ addProductImage_image: image });
      const imageSizeLimit = 5; // MB

      if (!validateFileSize(image, imageSizeLimit)) {
        state.inputError.image = `Mỗi ảnh cho phép kích thước tối đa là ${imageSizeLimit}`;
      } else {
        state.inputError.image = '';
        state.value.images?.push(image);
      }
    },
    setProductVideo: (state, action) => {
      const video = action.payload;
      const videoSizeLimit = 25;

      if (validateFileSize(video, videoSizeLimit)) {
        state.videoError = '';
        state.value.video = video;
      } else {
        state.videoError = `Video cho phép kích thước tối đa là ${videoSizeLimit}`;
      }
    },
    setVideoThumbnail: (state, action) => {
      state.value.videoThumbnail = action.payload;
    },
    setInputError: (state, action) => {
      state.inputError = {...state.inputError, ...action.payload};
    },
    setImageError: (state, action) => {
      state.inputError.image = action.payload;
    },
    setVideoError: (state, action) => {
      state.videoError = action.payload;
    },
    removeImageByIndex: (state, action) => {
      if (state.value.images) {
        state.value.images.splice(action.payload, 1);
      }
    },
    resetAllProductProperties: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // async reducers

    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // comes from returned res.data in async thunk above
      state.error = '';
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message
        ? action.error.message
        : 'Some error occured';
    });

    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      // state.value = action.payload; // comes from `res.data` returned from async thunk
      state.error = '';
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.value = initialState.value;
      state.error = action.error.message
        ? action.error.message
        : 'Some error occured';
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.productCreated = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.productCreated = true;
      state.error = '';
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.productCreated = false;
      state.error = action.error.message
        ? action.error.message
        : 'Some error occured';
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.productUpdated = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.productUpdated = true;
      state.error = '';
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.productUpdated = false;
      state.error = action.error.message
        ? action.error.message
        : 'Some error occured';
    });

  },
});

const productReducer = productSlice.reducer;

export const {
  setProductProperties,
  resetAllProductProperties,
  resetProductProperties,
  setProductImages,
  addProductImage,
  removeImageByIndex,
  setInputError,
  setImageError,
  setVideoError,
  setProductVideo,
  setVideoThumbnail,
} = productSlice.actions;


export default productReducer;
