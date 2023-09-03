import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "~/utils/axios.util";
import { logFormData } from "~/utils/form.util";

export function useCreateOneOneChat() {

  return useMutation({
    mutationKey: ['createChat'],
    mutationFn: (userId: string) => {
      return axiosPrivate.post('chat', { userId })
    },
  })
}


export function useSendOneOneMessageMutation() {

  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: ({ chatId, message }: any) => {
      
      const formData = new FormData();
      formData.set('chatId', chatId as string);
      formData.set('message', message as string);
      logFormData(formData);
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