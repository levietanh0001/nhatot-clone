import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate, axiosPublic } from '@/utils/http.util';


// export function useGetCreatedChat() {
//   return useQuery({
//     queryKey: ['createdOneOneChat'],

//   })
// }

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


export function useCreateOneOneChatQuery() {

  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ['createOneOneChat'],
    mutationFn: (userId: string) => {
      return axiosPrivate.post('chat', { userId });
    },
    // onSuccess: data => {
    //   queryClient.setQueryData(['createdOneOneChat'], data);
    // }

  });
}

export function useGetUserChats(enabled = true) {
  return useQuery({
    queryKey: ['getUserChats'],
    queryFn: ({ signal }) => {
      return axiosPrivate.get(`/chat`, { signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    enabled,
    onSettled: (data) => {
      console.log('fetching user chats');
    }
  });
}
