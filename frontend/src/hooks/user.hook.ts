import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "~/utils/axios.util";

export function useGetUserProfile(userId) {

  return useQuery({
    queryKey: ['products', userId],
    queryFn: ({ signal }) => {
      
      return axiosPublic.get(`/user-profile/${userId}`, { signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 5000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
    
  });
}