import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import { GridColDef, GridRowModel } from '@mui/x-data-grid';
import { 
  useDeleteProductsMutation, 
  useGetAllProducts, 
  useUpdateProductByIdMutation 
} from '@/features/product/api/product.api';
import MUIDataGrid from '@/components/datagrid/MUIDatagrid';
import { toastNotification } from '@/utils/react-toastify.util';
import { placeholderImageSrc } from '@/utils/constants.util';
import styles from './ProductsDashboardContent.module.scss';
import { TopLoadingBarContext, useTopLoadingBar } from '@/contexts/top-loading-bar/TopLoadingBar.context';


const useFakeMutation = () => {
  return useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    [],
  );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {

  const mutationArr = [] as string[];

  Object.keys(oldRow).forEach(key => {
    if(newRow[key] !== oldRow[key]) {
      mutationArr.push(`${key} from '${oldRow[key] || ''}' to '${newRow[key] || ''}'`);
    }
  })

  return mutationArr;
}

const ProductsDashboardContent = () => {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { data, error, isLoading, isError } = useGetAllProducts();
  const productData = useMemo(() => data, [data]);

  useTopLoadingBar(isLoading);
  
  // const mutateRow = useFakeMutation();
  const updateProductByIdMutation = useUpdateProductByIdMutation();
  const deleteProductsMutation = useDeleteProductsMutation();
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const columns: GridColDef[] = [
    { field: 'productId', headerName: 'productId', width: 130 },
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
    {
      field: 'delete',
      headerName: 'delete',
      width: 70,
      renderCell: (params) => {
        return (
          <button
            className={styles['delete-action']}
            onClick={(e) => handleDeleteProducts(e, params)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1.75em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
          </button>
        );
      },
    },
    { field: 'type', headerName: 'type', width: 100, editable: true },
    { field: 'category', headerName: 'category', width: 100, editable: true },
    {
      field: 'projectName',
      headerName: 'projectName',
      width: 200,
      editable: true,
    },
    { field: 'address', headerName: 'address', width: 100, editable: true },
    {
      field: 'numBedrooms',
      headerName: 'numBedrooms',
      width: 100,
      editable: true,
    },
    {
      field: 'numBathrooms',
      headerName: 'numBathrooms',
      width: 100,
      editable: true,
    },
    {
      field: 'balconDirection',
      headerName: 'balconDirection',
      width: 100,
      editable: true,
    },
    {
      field: 'mainDoorDirection',
      headerName: 'mainDoorDirection',
      width: 100,
      editable: true,
    },
    {
      field: 'legalDocsStatus',
      headerName: 'legalDocsStatus',
      width: 100,
      editable: true,
    },
    {
      field: 'furnitureStatus',
      headerName: 'furnitureStatus',
      width: 100,
      editable: true,
    },
    { field: 'area', headerName: 'area', width: 100, editable: true },
    { field: 'price', headerName: 'price', width: 100, editable: true },
    { field: 'deposit', headerName: 'deposit', width: 100, editable: true },
    { field: 'postTitle', headerName: 'postTitle', width: 100, editable: true },
    {
      field: 'description',
      headerName: 'description',
      width: 100,
      editable: true,
    },
    { field: 'userType', headerName: 'userType', width: 100 },
    { field: 'createdAt', headerName: 'createdAt', width: 100 },
    { field: 'updatedAt', headerName: 'updatedAt', width: 100 },
    { field: 'userId', headerName: 'userId', width: 100 },
  ];

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutations = computeMutation(newRow, oldRow);
        if (mutations.length > 0) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {

    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      
      // const response = await mutateRow(newRow);
      const productId = newRow.productId;
      console.log({ oldRow, newRow });
      updateProductByIdMutation.mutate({ productId, newProduct: newRow }, {
        onSuccess: () => {
          setSnackbar({ children: 'Lưu thay đổi sản phẩm thành công', severity: 'success' });
          resolve(newRow);
          setPromiseArguments(null);
        },
        onError: (error) => {
          setSnackbar({ children: "Name can't be empty", severity: 'error' });
          reject(error);
          setPromiseArguments(null);
        },

      });


    } catch (error) {

      console.error(error);
      setSnackbar({ children: "Có lỗi xảy ra", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {

    noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutations = computeMutation(newRow, oldRow);

    return (
      <Dialog
        fullWidth
        // maxWidth="md"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Confirm the following changes: `}
          <ul style={{ listStyleType: 'none' }}>
            {mutations.map((item, index) => (
              <li key={index}>{index+1}. {item}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleRowsSelect = (ids) => {
    setSelectedRows(ids);
  };

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const handleDeleteProducts = (e, params) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log(selectedRows);

    if(window.confirm('Xóa sản phẩm?')) {

      deleteProductsMutation.mutate(
        selectedRows.length > 0 ? selectedRows : [params.row?.productId],
        {
          onSuccess: () => {
            toastNotification(
              'Xóa sản phẩm thành công',
              'success'
            );
          },
          onError: () => {
            toastNotification(
              `Có lỗi xảy ra: ${JSON.stringify(
                deleteProductsMutation.error
              )}`,
              'error'
            );
          },
        }
      );

    }

  };

  return (
    <>
      <ToastContainer position='top-right' theme='colored' autoClose={3000} />

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
        <Paper
        elevation={3}
          sx={{
            padding: '20px',
            backgroundColor: '#202020',
            minHeight: '100%',
            borderRadius: '12px',
          }}
          >
          {renderConfirmDialog()}
          {!!snackbar && (
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open onClose={handleCloseSnackbar} autoHideDuration={3000}>
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}

          <div className={styles['add-product']}>
            <button>
              <span>Add Product</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
              </span>
            </button>
          </div>

          <MUIDataGrid
            data={productData}
            columns={columns}
            rows={productData}
            idField='productId'
            onRowSelectionModelChange={handleRowsSelect}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            editMode='row'
          />
        </Paper>
      )}
    </>
  );


};



export default ProductsDashboardContent;
