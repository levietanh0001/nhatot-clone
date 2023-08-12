import { UseFormReturn } from "react-hook-form";

interface IProductDetails {
  type?: string;
  category?: string;
  projectName?: string;
  address?: string;
  numBedrooms?: string;
  numBathrooms?: string;
  balconDirection?: string;
  mainDoorDirection?: string;
  legalDocsStatus?: string;
  furnitureStatus?: string;
  area?: string;
  price?: string;
  deposit?: string;
  postTitle?: string;
  description?: string;
  userType?: string;
  images?: File[];
  video?: File | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductData {
  details: IProductDetails;
  images?: {
    imageUrl: string;
  }[];
}

export interface IProduct {
  type?: string;
  category?: string;
  projectName?: string;
  address?: string;
  numBedrooms?: string;
  numBathrooms?: string;
  balconDirection?: string;
  mainDoorDirection?: string;
  legalDocsStatus?: string;
  furnitureStatus?: string;
  area?: string;
  price?: string;
  deposit?: string;
  postTitle?: string;
  description?: string;
  userType?: string;
  images?: File[] | string[];
  imageUrls?: string[];
  thumbnailUrl?: string;
  videoThumbnailUrl?: string;
  videoThumbnail?: File | null;
  video?: File | null;
}

export interface IInitialProductState {
  value: IProduct;
  loading: boolean;
  products: any[];
  productCreated: boolean;
  productUpdated: boolean;
  error: string;
  inputError: any;
  // imageError: string;
  videoError: string;
}

export interface IProductForm {
  formId: string;
  form: UseFormReturn;
  onFormSubmit: (...args: any) => any;
  product: (...args: any) => any;
  onImageChange: (...args: any) => any;
  onImagesChange: (...args: any) => any;
  onImageRemove: (...args: any) => any;
  onVideoChange: (...args: any) => any;
  onVideoRemove: (...args: any) => any;
  onVideoThumbnailCreate: (...args: any) => any;
  onCategoryChange: (...args: any) => any;
  onProductTypeSelect: (...args: any) => any;
  onAddressChange: (...args: any) => any;
  onProjectNameChange: (...args: any) => any;
  onNumBedRoomsChange: (...args: any) => any;
  onNumBathroomsChange: (...args: any) => any;
  onBalconDirectionChange: (...args: any) => any;
  onMainDirectionChange: (...args: any) => any;
  onLegalDocsStatusChange: (...args: any) => any;
  onFurnitureStatusChange: (...args: any) => any;
  onAreaChange: (...args: any) => any;
  onPriceChange: (...args: any) => any;
  onDepositChange: (...args: any) => any;
  onPostTitleChange: (...args: any) => any;
  onPostDescriptionChange: (...args: any) => any;
  onUserTypeSelect: (...args: any) => any;
}

export type ProductTypeType = 'muaban' | 'chothue' | 'duan';
