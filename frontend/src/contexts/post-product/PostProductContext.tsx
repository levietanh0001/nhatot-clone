// import React, { useState, createContext } from "react";

// // type ProductTypeType = 'canban' | 'chothue' | 'duan' | '';
// // type ProductCategoryType = 'canhochungcu' | 'nhao' | 'dat' | 'vanphong' | 'matbangkinhdoanh' | 'phongtro' | '';
// // type UserRoleType = 'canhan' | 'moigioi' | '';

// type ProductTypeType = string;
// type ProductCategoryType = string;
// type UserRoleType = string;

// interface IActiveButtons {
//   productType?: {
//     button: string;
//   };
//   userType?: {
//     button: string;
//   };
// }

// interface IPostProductContext {
//   productCategory?: ProductCategoryType;
//   productType?: ProductTypeType;
//   activeButtons?: IActiveButtons | null;
//   userRole?: UserRoleType;
//   setProductType?: (productType: ProductTypeType) => void;
//   setProductCategory?: (productCategory: ProductCategoryType) => void;
//   setActiveButtons?: (activeButtons: IActiveButtons | null) => void;
//   setUserRole?: (userRole: UserRoleType) => void;
// }

// const PostProductContext = createContext<IPostProductContext | null>(null);

// function PostProductProvider(props) {

//   const [productType, setProductType] = useState<ProductTypeType>('');
//   const [productCategory, setProductCategory] = useState<ProductCategoryType>('');
//   const [activeButtons, setActiveButtons] = useState<IActiveButtons | null>(null);
//   const [userRole, setUserRole] = useState<UserRoleType>('');

//   const value = {
//     productCategory,
//     productType,
//     activeButtons,
//     userRole,
//     setProductType,
//     setProductCategory,
//     setActiveButtons,
//     setUserRole
//   };

//   return (
//     <PostProductContext.Provider value={value}>{props.children}</PostProductContext.Provider>
//   );
// }

// export { PostProductContext, PostProductProvider };

export {};
