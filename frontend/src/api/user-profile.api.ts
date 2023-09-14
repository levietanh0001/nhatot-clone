import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, axiosPublic } from "./axios.api";
import { useContext } from "react";
import { AuthContext } from "~/contexts/auth/Auth.context";


export function useUploadAvatarImage() {

  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['uploadAvatarImage'],
    mutationFn: (data: File) => {

      console.log({ avatarImg: data });
      const avatarImageFormData = new FormData();
      avatarImageFormData.set('image', data);
      return axiosPrivate.post(
        `/user-profile/avatar`, 
        avatarImageFormData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user-profile', String(user.userId)]);
      // queryClient.invalidateQueries(['user-profile', user.userId]);
    }
  })
}


export function useGetUserProfile(userId, enabled=false) {

  return useQuery({
    queryKey: ['user-profile', userId],
    queryFn: ({ signal }) => {
      
      return axiosPublic.get(`/user-profile/${userId}`, { signal });
    },
    keepPreviousData: false,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    enabled
  });
}

export function useGetUserProfiles(userIds: any[]) {

  return useQueries({
    queries: userIds.map(userId => {
      return {
        queryKey: ['getUserProfile', userId],
        queryFn: () => {
          return axiosPublic.get(`/user-profile/${userId}`);
        },
        select: (data) => {
          return data.data;
        },
        staleTime: 1000,
        keepPreviousData: false,
        refetchOnMount: true, // if component is mounted, refetch
        refetchOnWindowFocus: false,
        enabled: !!userId
      }
  }),

  })
}


export function useGetAllUserProfiles() {

  return useQuery({
    queryKey: ['all-user-profiles'],
    queryFn: ({ signal }) => {
      return axiosPrivate.get(`/admin/user-profile`, { signal })
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    
  })
}