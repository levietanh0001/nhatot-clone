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
  images: {
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
  images?: File[];
  video?: File | null;
}

export interface IInitialProductState {
  value: IProduct;
  loading: boolean;
  products: any[];
  productCreated: boolean;
  error: string;
}

export type ProductTypeType = 'muaban' | 'chothue' | 'duan';
