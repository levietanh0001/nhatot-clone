import { Skeleton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetAllUserProfiles } from '~/api/user-profile.api';

import styles from './UsersContent.module.scss';
import {
  useRevokeUsersRefreshTokensMutation,
  useVerifyUsersMutation,
} from '~/api/user.api';
import { toastNotification } from '~/utils/react-toastify.util';
import { placeholderImageSrc } from '~/utils/variables.util';
import DashboardContent from './DashboardContent';
// import { useConsoleLogOnChange } from '~/hooks/utils.hook';



const UsersContent = () => {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const { data, error, isLoading, isError } = useGetAllUserProfiles();
  const userData = useMemo(() => data, [data]);

  const verifyUsersMutation = useVerifyUsersMutation();
  const revokeUsersRefreshTokensMutation = useRevokeUsersRefreshTokensMutation();

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'userId', width: 20 },
    {
      field: 'avatarUrl',
      headerName: 'avatar',
      width: 70,
      renderCell: (params) => {
        return (
          <img
            loading='lazy'
            className={styles['user-avatar']}
            src={params.row.avatarUrl ?? placeholderImageSrc}
            alt='user avatar'
          />
        );
      },
    },
    { field: 'email', headerName: 'email', width: 200 },
    { field: 'username', headerName: 'username', width: 160 },
    {
      field: 'verify',
      headerName: 'verify',
      width: 70,
      renderCell: (params) => {
        return (
          <button
            className={styles['verify-action']}
            onClick={(e) => handleVerifyUser(e, params)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'><path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' /></svg>
          </button>
        );
      },
    },
    {
      field: 'revoke',
      headerName: 'revoke',
      width: 70,
      renderCell: (params) => {
        return (
          <button
            className={styles['revoke-action']}
            onClick={(e) => handleRevokeUserClick(e, params)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'><path d='M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z' /></svg>
          </button>
        );
      },
    },
    {
      field: 'isVerified',
      headerName: 'isVerified',
      width: 100,
      type: 'boolean',
    },
    { field: 'refreshToken', headerName: 'refreshToken', width: 160 },
    { field: 'gender', headerName: 'gender', width: 70 },
    { field: 'rating', headerName: 'rating', width: 50 },
    { field: 'follower', headerName: 'follower', width: 70 },
    { field: 'following', headerName: 'following', width: 70 },
    { field: 'address', headerName: 'address', width: 200 },
    { field: 'phoneNumber', headerName: 'phoneNumber', width: 150 },
    { field: 'role', headerName: 'role', width: 70 },
    { field: 'createdAt', headerName: 'createdAt', width: 160 },

  ];

  const handleRevokeUserClick = (e, params) => {

    e.preventDefault();
    e.stopPropagation();

    // console.log('revoke user clicked');
    revokeUsersRefreshTokensMutation
      .mutate(selectedRows.length > 0? selectedRows: [params.row.userId], {
        onSuccess: () => {
          toastNotification('Vô hiệu refresh token người dùng thành công', 'success');
        },
        onError: () => {
          toastNotification(`Có lỗi xảy ra: ${JSON.stringify(revokeUsersRefreshTokensMutation.error)}`, 'error');
        }
      });
  
  };

  const handleVerifyUser = (e, params) => {

    e.preventDefault();
    e.stopPropagation();

    // console.log('verify user clicked');
    verifyUsersMutation.mutate(selectedRows.length > 0? selectedRows: [params.row.userId], {
      onSuccess: () => {
        toastNotification('Xác nhận người dùng thành công', 'success');
      },
      onError: () => {
        toastNotification(`Có lỗi xảy ra: ${JSON.stringify(verifyUsersMutation.error)}`, 'error');
      }
    });

  };

  const handleRowsSelect = (ids) => {
    setSelectedRows(ids);
  };

  // useConsoleLogOnChange({ selectedRows });

  return (
    <>
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={3000}
      />

      <h1 className={styles['title']}>Users List</h1>
      {isLoading && (
        <Skeleton
          sx={{ backgroundColor: '#252525', borderRadius: '14px' }}
          animation='wave'
          width='100%'
          height='100%'
          variant='rectangular'
        />
      )}

      {isError && <p>{JSON.stringify(error)}</p>}
      {userData && (
        <DashboardContent
          data={userData}
          columns={columns}
          rows={userData}
          idField='userId'
          onRowSelectionModelChange={handleRowsSelect}
        />
      )}

    </>
  );
};

export default UsersContent;
