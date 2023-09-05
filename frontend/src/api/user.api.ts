import { useQueries, useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./axios.api";


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
    enabled: !!userId
  });
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
    // cacheTime: 5000, // by default 5 mins
    staleTime: 5000,
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