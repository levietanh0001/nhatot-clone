import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAction extends PayloadAction<number> {}

const initialState = {
  product: {
    productType: null,
    productCategory: null,
    projectName: null,
    address: null,
    numBedrooms: null,
    numBathrooms: null,
    balconDirection: null,
    mainDoorDirection: null,
    hasLegalDocs: null,
    furnitureStatus: null,
    area: null,
    price: null,
    deposit: null,
    postTile: null,
    description: null,
    userType: null,
  },
  formStep: 0
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
    setPostTile: (state, action) => {
      state.product.postTile = action.payload;
    },
    setDescription: (state, action) => {
      state.product.description = action.payload;
    },
    
  },
});

const postProductReducer = postProductSlice.reducer;

// export const {
//   setProductCategory,
//   setProductType,
//   setUserType,
//   incrementFormStep,
// } = postProductSlice.actions;

export const postProductActions = postProductSlice.actions;

export default postProductReducer;
