import { UseQueryResult } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useGetUserProfiles } from '~/api/user-profile.api';
import { AuthContext } from '~/contexts/auth/AuthContext';

// export const useCreateOneOneChat = (userId, socket, isConnected) => {
//   useEffect(() => {
//     if (!userId) {
//       // if no receiver, set to last active receiver
//     }

//     if (isConnected && userId) {
//       createOneOneChatMutation.mutate(userId);
//     }

//     if (isConnected && socket) {
//       socket.on('one_one_chat_created', (chatId) => {
//         console.log('one one chat created with id = ' + chatId);
//         setOneOneChatConnected(true);
//       });
//     }
//   }, [isConnected, userId]);
// }


export const useSetMessagesOnFetch = (getMessagesQueryResult, callback) => {
  useEffect(() => {
    if (
      !getMessagesQueryResult.isLoading &&
      !getMessagesQueryResult.isError &&
      getMessagesQueryResult.data
    ) {
      console.log({ messagesData: getMessagesQueryResult.data });
      callback(getMessagesQueryResult.data);
    }
  }, [getMessagesQueryResult.isLoading, getMessagesQueryResult.isError]);
};

export const useSetOneOneChatIdOnCreate = (
  createOneOneChatMutation,
  callback
) => {
  useEffect(() => {
    if (
      !createOneOneChatMutation.isLoading &&
      !createOneOneChatMutation.isError &&
      createOneOneChatMutation.data
    ) {
      const createdOneOneChatId = createOneOneChatMutation.data.data._id;
      console.log(`created one one chatId = ` + createdOneOneChatId);
      callback(createdOneOneChatId);
      // setChatId(createdOneOneChatId);
    }
  }, [createOneOneChatMutation.isLoading, createOneOneChatMutation.isError]);
};

export const useJoinOneOneChat = (chatId: string, socket) => {
  useEffect(() => {
    if (chatId && socket) {
      socket.emit('join_one_one_chat', chatId);
    }
  }, [socket, chatId]);
};

export const useGetContactsInfo = (userChatsQueryResult) => {
  const {
    data: userChats,
    isLoading: isUserChatsLoading,
    isError: isUserChatsError,
  } = userChatsQueryResult;

  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [recipientIds, setRecipientIds] = useState<any[]>([]);
  const [chatIds, setChatIds] = useState<any[]>([]);
  const [latestMessages, setLatestMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!isUserChatsLoading && !isUserChatsError) {

      userChats.forEach((chat) => {
        const users = chat.users;
        const recipient = users.filter((item) => item.id !== user.userId);

        setRecipientIds((prev) => [...prev, recipient[0].id]);
        setChatIds((prev) => [...prev, chat._id]);
        setLatestMessages((prev) => [
          ...prev,
          {
            content: chat?.latestMessage?.content ?? '',
            createdAt: chat?.latestMessage?.createdAt ?? '',
          },
        ]);
      });
    }
  }, [isUserChatsLoading, isUserChatsError]);

  const recipientProfiles = useGetUserProfiles(
    recipientIds
  ) as UseQueryResult[];
  const recipientUsernames = recipientProfiles.map((item) => {
    if (!item.isLoading && !item.isError) {
      return (item.data as any).username;
    }
    if (item.isError) {
      return '';
    }
  });

  const contactInfoList = recipientUsernames.map((username, index) => {
    return {
      chatId: chatIds[index],
      username,
      latestMessage: latestMessages[index],
    };
  });

  return { contactInfoList, lastActiveUserId: recipientIds[0] };
  
};

export default useGetContactsInfo;
