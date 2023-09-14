import { ToastContainer } from 'react-toastify';
import { useMemo, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProductsContent.module.scss';
import { useGetAllProducts } from '~/api/product.api';
import DashboardContent from './DashboardContent';
import { GridColDef } from '@mui/x-data-grid';
import Skeleton from '@mui/material/Skeleton';
import { placeholderImageSrc } from '~/utils/variables.util';


const ProductsContent = () => {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { data, error, isLoading, isError } = useGetAllProducts();
  const productData = useMemo(() => data, [data]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70 },
    {
      field: 'thumbnailImageUrl',
      headerName: 'thumbnailImageUrl',
      width: 70,
      renderCell: (params) => {
        return (
          <img
            loading='lazy'
            className={styles['product-thumbnail']}
            src={params.row.thumbnailImageUrl ?? placeholderImageSrc}
            alt='product thumbnail'
          />
        );
      },
    },
    { field: 'type', headerName: 'type', width: 100, editable: true },
    { field: 'category', headerName: 'category', width: 100, editable: true },
    { field: 'projectName', headerName: 'projectName', width: 100, editable: true },
    { field: 'address', headerName: 'address', width: 100, editable: true },
    { field: 'numBedrooms', headerName: 'numBedrooms', width: 100, editable: true },
    { field: 'numBathrooms', headerName: 'numBathrooms', width: 100, editable: true },
    { field: 'balconDirection', headerName: 'balconDirection', width: 100, editable: true },
    { field: 'mainDoorDirection', headerName: 'mainDoorDirection', width: 100, editable: true },
    { field: 'legalDocsStatus', headerName: 'legalDocsStatus', width: 100, editable: true },
    { field: 'furnitureStatus', headerName: 'furnitureStatus', width: 100, editable: true },
    { field: 'area', headerName: 'area', width: 100, editable: true },
    { field: 'price', headerName: 'price', width: 100, editable: true },
    { field: 'deposit', headerName: 'deposit', width: 100, editable: true },
    { field: 'postTitle', headerName: 'postTitle', width: 100, editable: true },
    { field: 'description', headerName: 'description', width: 100, editable: true },
    { field: 'userType', headerName: 'userType', width: 100 },
    { field: 'createdAt', headerName: 'createdAt', width: 100 },
    { field: 'updatedAt', headerName: 'updatedAt', width: 100 },
    { field: 'userId', headerName: 'userId', width: 100 },

  ];

  const handleRowsSelect = (ids) => {
    setSelectedRows(ids);
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={3000}
      />

      <h1 className={styles['title']}>Products List</h1>

      {isLoading && (
        <>
          <Skeleton
            sx={{ backgroundColor: '#252525', borderRadius: '14px' }}
            animation='wave'
            width='100%'
            height='100%'
            variant='rectangular'
          />
        </>
      )}
      
      {isError && <p>{JSON.stringify(error)}</p>}


      {productData && (
        <DashboardContent
          data={productData}
          columns={columns}
          rows={data}
          idField='id'
          onRowSelectionModelChange={handleRowsSelect}
        >
          <div className={styles['add-product']}>
            <button>
              <span>Add new product</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
              </span>
            </button>
          </div>

        </DashboardContent>
      )}

    </>
  )
}

export default ProductsContent