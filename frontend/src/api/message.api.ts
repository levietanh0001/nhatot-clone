import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "./axios.api";

export function useSendOneOneMessageMutation() {

  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: ({ chatId, message }: any) => {
      
      const formData = new FormData();
      formData.set('chatId', chatId as string);
      formData.set('message', message as string);
      // logFormData(formData);
      return axiosPrivate
             .post('message', { chatId, message });
      // return axiosPrivate
      //        .post('message', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
  })
}


export function useGetMessages(chatId, limit?) {
  return useQuery({
    queryKey: ['getMessages', chatId, limit],
    queryFn: ({ signal }) => {

      const params = new URLSearchParams({
        limit: limit || ''
      });

      return axiosPrivate.get(`/message/${chatId}`, { params, signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 10000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
    enabled: !!chatId
    // onSettled: (data) => {
    //   console.log({ data });
    // }
  });
}