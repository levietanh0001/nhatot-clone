import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate, axiosPublic } from './axios.api';

export function useGetUserIdForChat(userId) {
  return useQuery({
    queryKey: ['user-id-for-chat', userId],
    queryFn: ({ signal }) => {
      return axiosPublic.get(`/user/user-id-for-chat/${userId}`, { signal });
    },
    keepPreviousData: false,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 5000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
    enabled: !!userId,
  });
}

export function useRevokeUsersRefreshTokensMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['revokeUserRefreshToken'],
    mutationFn: (userIds: string[]) => {
      return axiosPrivate.put(`/admin/user/revoke-refresh-token`, { userIds });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getAllUserProfiles']);
    },
  });
}

export function useVerifyUsersMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['verifyUser'],
    mutationFn: (userIds: string[]) => {
      return axiosPrivate.put(`/admin/user/verify`, { userIds });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getAllUserProfiles']);
    },
  });
}

export function useGetUserCountByGroup() {
  return useQuery({
    queryKey: ['getUserCountByGroup'],
    queryFn: ({ signal }) => {
      return axiosPrivate.get(`/admin/users/count-by-group`, { signal });
    },
    keepPreviousData: false,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
  });
}
