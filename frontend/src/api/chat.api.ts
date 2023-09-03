import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "~/api/axios.api";

export function useCreateOneOneChat() {

  return useMutation({
    mutationKey: ['createChat'],
    mutationFn: (userId: string) => {
      return axiosPrivate.post('chat', { userId })
    },
  })
}


export function useGetUserChats(enabled=true) {
  return useQuery({
    queryKey: ['getUserChats'],
    queryFn: ({ signal }) => {
      return axiosPrivate.get(`/chat`, { signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 10000, // by default 5 mins
    staleTime: 2000,
    select: (data) => {
      return data.data;
    },
    enabled
    // onSettled: (data) => {
    //   console.log({ data });
    // }
  });
}