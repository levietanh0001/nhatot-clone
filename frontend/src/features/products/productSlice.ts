import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import {
  IInitialProductState,
  IProduct,
} from '~/interfaces/product.interface';
import { axiosInstance } from '~/utils/axios.util';
import { commaSeparatedStringToNumber } from '~/utils/number.util';
import { createProduct, getProducts } from './productThunks';

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
    video: null,
  },
  loading: false,
  products: [],
  productCreated: false,
  error: '',
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
          ...initialState.value,
          [action.payload]: initialState.value[action.payload],
        };
      }
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
  },
});

const productReducer = productSlice.reducer;

export const productActions = productSlice.actions;

export default productReducer;
