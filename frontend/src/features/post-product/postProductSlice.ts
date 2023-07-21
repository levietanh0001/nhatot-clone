import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAction extends PayloadAction<number> {}

interface IInitialState {
  product: {
    productType?: string;
    productCategory?: string;
    projectName?: string;
    address?: string;
    numBedrooms?: string;
    numBathrooms?: string;
    balconDirection?: string;
    mainDoorDirection?: string;
    hasLegalDocs?: string;
    furnitureStatus?: string;
    area?: string;
    price?: string;
    deposit?: string;
    postTitle?: string;
    description?: string;
    userType?: string;
    images?: File[];
    video?: File | null;
  };
  formStep: number;
}

const initialState: IInitialState = {
  product: {
    productType: '',
    productCategory: '',
    projectName: '',
    address: '',
    numBedrooms: '',
    numBathrooms: '',
    balconDirection: '',
    mainDoorDirection: '',
    hasLegalDocs: 'dangchoso',
    furnitureStatus: '',
    area: '',
    price: '',
    deposit: '',
    postTitle: '',
    description: '',
    userType: '',
    images: [],
    video: null,
  },
  formStep: 0,
};

const postProductSlice = createSlice({
  name: 'postProduct',
  initialState,
  reducers: {
    setProductCategory: (state, action) => {
      state.product.productCategory = action.payload;
    },
    setProductType: (state, action) => {
      state.product.productType = action.payload;
    },
    setUserType: (state, action) => {
      state.product.userType = action.payload;
    },
    incrementFormStep: (state) => {
      state.formStep += 1;
    },
    setProjectName: (state, action) => {
      state.product.projectName = action.payload;
    },
    setAddress: (state, action) => {
      state.product.address = action.payload;
    },
    setNumBedrooms: (state, action) => {
      state.product.numBedrooms = action.payload;
    },
    setNumBathrooms: (state, action) => {
      state.product.numBathrooms = action.payload;
    },
    setBalconDirection: (state, action) => {
      state.product.balconDirection = action.payload;
    },
    setMainDoorDirection: (state, action) => {
      state.product.mainDoorDirection = action.payload;
    },
    setHasLegalDocs: (state, action) => {
      state.product.hasLegalDocs = action.payload;
    },
    setFurnitureStatus: (state, action) => {
      state.product.furnitureStatus = action.payload;
    },
    setArea: (state, action) => {
      state.product.area = action.payload;
    },
    setPrice: (state, action) => {
      state.product.price = action.payload;
    },
    setDeposit: (state, action) => {
      state.product.deposit = action.payload;
    },
    setPostTitle: (state, action) => {
      state.product.postTitle = action.payload;
    },
    setDescription: (state, action) => {
      state.product.description = action.payload;
    },
    appendImages: (state, action) => {
      if(state.product.images) {
        state.product.images = [...state.product.images, ...action.payload];
      }
    },
    removeImageByIndex: (state, action) => {
      if(state.product.images) {
        state.product.images.splice(action.payload, 1);
      }
    },
    clearImage: (state) => {
      if(state.product.images) {
        state.product.images.length = 0;
      }
    },
    setVideo: (state, action) => {
      state.product.video = action.payload;
    },
    clearVideo: (state) => {
      state.product.video = null;
    },
    resetStates: () => {
      return initialState;
    }
  },
});

const postProductReducer = postProductSlice.reducer;

export const postProductActions = postProductSlice.actions;

export default postProductReducer;
