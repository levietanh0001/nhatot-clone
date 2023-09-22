import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate, axiosPublic } from '@/utils/http.util';



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
