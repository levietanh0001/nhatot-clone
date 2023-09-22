import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { axiosPrivate } from '@/utils/http.util';



export function useSendOneOneMessageMutation() {
  
  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: ({ chatId, message }: any) => {
      const formData = new FormData();
      formData.set('chatId', chatId as string);
      formData.set('message', message as string);
      return axiosPrivate.post('message', { chatId, message });
    },
  });
}

export function useGetMessagesQuery(chatId, limit?) {
  // console.log(`current chatId = ${chatId}`);
  return useQuery({
    queryKey: ['getMessages', chatId, limit],
    queryFn: ({ signal }) => {

      console.log('getting messages from chatId = ' + chatId);
      const params = new URLSearchParams({
        limit: limit || '',
      });

      return axiosPrivate.get(`/message/${chatId}`, { params, signal });
    },
    // keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    enabled: !!chatId,
  });
}

export function useGetLatestChatMessages(chatIds: string[]) {
  return useQueries({
    queries: chatIds.map((chatId) => {
      return {
        queryKey: ['getLatestChatMessage', chatId],
        queryFn: () => {
          return axiosPrivate.get(`/message/${chatId}`);
        },
        select: (data) => {
          return data.data.slice(-1);
        },
        staleTime: 1000,
        keepPreviousData: false,
        refetchOnMount: true, // if component is mounted, refetch
        refetchOnWindowFocus: false,
        enabled: !!chatId,
      };
    }),
  });
}

export function useHandleReceiveMessages(socket, callback) {

  useEffect(() => {

    if (socket) {

      socket.on('receive_message', (data) => {
        if (data) {
          callback(data);
          // console.log('received' + message);
          // setMessages((prev) => [
          //   ...prev,
          //   { content: message, origin: 'other' },
          // ]);
        }
      });
    }

  }, [socket]);
}




// export function useFetchChatMessages(chatId, callback) {
//   // console.log(`fetching message from ${chatId}`);
//   const { data, isLoading, isError } = useGetMessages(chatId);

//   // console.log({ data, chatId });

//   useEffect(() => {
//     if (!isLoading && !isError && data) {
//       callback(data);
//       // const fetchedMessages = data.map(item => ({ content: item.content, origin: item.sender.id }));
//       // setMessages(prev => [...prev, ...fetchedMessages]);
//     }
//   }, [isLoading, isError]);
// }
