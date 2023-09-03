import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useConnectSocket } from '~/api/socket.api';
import { useGetUserProfile } from '~/api/user.api';
import { useCreateOneOneChat, useGetUserChats } from '~/api/chat.api';
import { useGetMessages, useSendOneOneMessageMutation } from '~/api/message.api';
import styles from './Chat.module.scss';
import { ChatPanel, HeaderCard, MessageBox } from './ChatPanel';
import ContactPanel from './ContactPanel';
import { AuthContext } from '~/contexts/auth/AuthContext';


interface IMessage {
  content: string;
  origin: string;
}

const Chat = () => {

  const params = useParams();
  const userId = params['userId'];
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [inputMessage, setInputMessage] = useState<string>('');
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const { data: userProfileData,  isLoading: isUserProfileLoading,  isError: isUserProfileError } = useGetUserProfile(userId, true);
  const { data: userChats, isLoading: isUserChatsLoading, isError: isUserChatsError } = useGetUserChats();
  const sendOneOneMessageMutation = useSendOneOneMessageMutation();

  const { socket, oneOneChatConnected } = useSetupOneOneChat(userId, chatId, setChatId);
  useFetchMessages(chatId, setMessages);
  useHandleReceiveMessages(socket, setMessages);

  // useEffect(() => {

  //   if(!isUserProfileLoading && !isUserProfileError) {
  //     setUserProfile(userProfileData);
  //   }

  // }, [isUserProfileLoading, isUserProfileError]);


  const sendMessage = (message) => {

    if(socket && inputMessage && oneOneChatConnected && chatId) {
      socket.emit('send_message', message, chatId);
      
      if(message) {
        setMessages(prev => [...prev, { content: message, origin: user?.userId }]);
        if(chatId) {
          // 3. send message in database
          sendOneOneMessageMutation.mutate({ chatId, message });
        }
      }
    }

    setInputMessage('');
  }

  const handleSendButtonClick = () => {
    sendMessage(inputMessage);
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.currentTarget.value);
    // setInputMessage({ content: e.currentTarget.value, origin: 'self' });
  }

  return (
    <>
      <div className='container'>
        <div className={styles['inner-wrapper']}>
          <ContactPanel 
            userProfile={userProfile} 
            userChats={userChats} 
          />

          <ChatPanel
            userProfile={userProfile}
            inputMessage={inputMessage}
            handleInputChange={handleInputChange}
            handleSendButtonClick={handleSendButtonClick}
            messages={messages}
            handleEnterKeyPress={handleEnterKeyPress}
          />

        </div>
      </div>

    </>
  )
}


function useSetupOneOneChat(userId, chatId, setChatId) {

  const [oneOneChatConnected, setOneOneChatConnected] = useState<boolean>(false);
  const { currentSocket: socket, connected, error: socketError } = useConnectSocket();
  const mutation = useCreateOneOneChat();

  useEffect(() => {

    if(socket) {

      // 2. on private chat created, set privateChatConnected to true
      socket.on('one_one_chat_created', (chatId) => {
        console.log('one one chat created ' + chatId);
        setOneOneChatConnected(true);
      });

    }

    if(socketError) {
      console.log({ socketError });
    }

  }, [socket, socketError]);

  useEffect(() => {
    if(connected && userId) {
      mutation.mutate(String(userId));
    }
  }, [connected, userId]);

  useEffect(() => {
    if(!mutation.isLoading && !mutation.error) {

      // 1. setup chat room with chat id from data
      // console.log({ fetchedChatId: mutation?.data?.data });
      setChatId(mutation?.data?.data._id);

      if(socket && chatId) {
        socket.emit('one_one_chat_setup', chatId);
      }
    }
  }, [socket, mutation.isLoading, chatId]);

  return { socket, oneOneChatConnected };
}


function useFetchMessages(chatId, setMessages) {

  const { data, isLoading, isError } = useGetMessages(chatId);

  useEffect(() => {
    if(!isLoading && !isError) {
      const fetchedMessages = data.map(item => ({ content: item.content, origin: item.sender.id }));
      setMessages(prev => [...prev, ...fetchedMessages]);
    }
  }, [isLoading, isError]);

}

function useHandleReceiveMessages(socket, setMessages) {
  useEffect(() => {

    if(socket) {
      socket.on('receive_message', (message) => {
        if(message) {
          console.log('received' + message);
          setMessages(prev => [...prev, { content: message, origin: 'other' }]);
        }
      });
    }

  }, [socket]);
}

export default Chat