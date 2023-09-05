import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useCreateOneOneChatQuery } from './chat.api';
import {
  IUseConnectSocketProps,
  IUseConnectSocketReturn,
} from './socket.interface';

export const useConnectSocket = (
  props?: IUseConnectSocketProps
): IUseConnectSocketReturn => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const socketConn = io(props?.backendUrl || 'http://localhost:4000', {
      forceNew: true,
    });

    socketConn.on('connect', () => {
      console.log('socket connected with id = ' + socketConn.id);
      setSocket(socketConn);
      setIsConnected(true);
      setIsError(false);
      setError(null);
    });

    socketConn.on('connect_error', (error) => {
      setSocket(null);
      setIsConnected(false);
      setIsError(true);
      setError(error);
    });

    socketConn.on('disconnect', (name) => {
      console.log(name + ' has disconnected from the chat.' + socketConn.id);
      setSocket(null);
      setIsConnected(false);
      setIsError(false);
    });

    return () => {
      socketConn.disconnect();
    }
    
  }, []);

  return { socket, error, isConnected, isError };
};

export function useSetupOneOneChat(userId, callback) {
  const [oneOneChatConnected, setOneOneChatConnected] =
    useState<boolean>(false);
  const { socket, isConnected, error: socketError } = useConnectSocket();
  const mutation = useCreateOneOneChatQuery();

  useEffect(() => {
    if (isConnected && userId) {
      mutation.mutate(String(userId));
    }
  }, [isConnected, userId]);

  useEffect(() => {
    if (socket) {
      // 2. on private chat created, set privateChatConnected to true
      socket.on('one_one_chat_created', (chatId) => {
        setOneOneChatConnected(true);
        callback(chatId);
        // console.log('one one chat created ' + chatId);
      });
    }
  }, [socket, socketError]);

  useEffect(() => {
    if (!mutation.isLoading && !mutation.error) {
      // // 1. setup chat room with chat id from data
      // // console.log({ fetchedChatId: mutation?.data });
      // setChatId(mutation?.data?.data._id);
      // if(socket && chatId) {
      //   socket.emit('one_one_chat_setup', chatId);
      // }
    }
  }, [
    socket,
    mutation.isLoading,
    // chatId
  ]);

  return { socket, oneOneChatConnected };
}

// export function useSetupOneOneChat(userId, chatId, setChatId) {

//   const [oneOneChatConnected, setOneOneChatConnected] = useState<boolean>(false);
//   const { currentSocket: socket, connected, error: socketError } = useConnectSocket();
//   const mutation = useCreateOneOneChat();

//   useEffect(() => {

//     if(socket) {

//       // 2. on private chat created, set privateChatConnected to true
//       socket.on('one_one_chat_created', (chatId) => {
//         console.log('one one chat created ' + chatId);
//         setOneOneChatConnected(true);
//       });

//     }

//   }, [socket, socketError]);

//   useEffect(() => {
//     if(connected && userId) {
//       mutation.mutate(String(userId));
//     }
//   }, [connected, userId]);

//   useEffect(() => {
//     if(!mutation.isLoading && !mutation.error) {

//       // 1. setup chat room with chat id from data
//       // console.log({ fetchedChatId: mutation?.data });
//       setChatId(mutation?.data?.data._id);

//       if(socket && chatId) {
//         socket.emit('one_one_chat_setup', chatId);
//       }
//     }
//   }, [socket, mutation.isLoading, chatId]);

//   return { socket, oneOneChatConnected };
// }
