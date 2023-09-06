import { useQuery } from "@tanstack/react-query";
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