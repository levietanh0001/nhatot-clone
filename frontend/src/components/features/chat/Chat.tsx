import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCreateOneOneChatQuery, useGetUserChats } from '~/api/chat.api';
import {
  useGetMessagesQuery,
  useHandleReceiveMessages,
  useSendOneOneMessageMutation,
} from '~/api/message.api';
import { useConnectSocket, useSetupOneOneChat } from '~/api/socket.api';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { IMessage } from './Chat.interface';
import styles from './Chat.module.scss';
import { ChatPanel } from './ChatPanel';
import ContactPanel from './ContactPanel';
import { useGetUserProfiles } from '~/api/user.api';
import { UseQueryResult } from '@tanstack/react-query';
import useGetContactsInfo, {
  useJoinOneOneChat,
  useSetMessagesOnFetch,
  useSetOneOneChatIdOnCreate,
} from './Chat.hook';
import { useConsoleLogOnChange } from '~/hooks/utils.hook';

const Chat = () => {
  
  // go to /chatroom/create?userId then redirect to /chat
  // seeding userId for chat! / migration update userId for chat field
  // set last active contact after choosing (set id)

  const params = useParams();
  const userId = params['userId'];
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [currentReceiverId, setCurrentReceiverId] = useState(userId);
  const [oneOneChatConnected, setOneOneChatConnected] =
    useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  // establish socket.io connection
  const { socket, isConnected } = useConnectSocket();

  // create and join user chat
  const createOneOneChatMutation = useCreateOneOneChatQuery();

  useEffect(() => {

    if (isConnected && currentReceiverId) {
      createOneOneChatMutation.mutate(currentReceiverId);
    }

    if (isConnected && socket && currentReceiverId) {
      socket.on('one_one_chat_created', (chatId) => {
        console.log('one one chat created with id = ' + chatId);
        setOneOneChatConnected(true);
      });
    }
  }, [isConnected, currentReceiverId]);

  useSetOneOneChatIdOnCreate(createOneOneChatMutation, (chatId) => {
    setChatId(chatId);
  });
  useJoinOneOneChat(chatId, socket);

  // get messages of current chat
  const getMessagesQueryResult = useGetMessagesQuery(chatId);
  useSetMessagesOnFetch(getMessagesQueryResult, (data) => {
    const fetchedMessages = data.map((item) => ({
      content: item.content,
      senderId: item.sender.id,
    }));
    setMessages(fetchedMessages);
  });

  const userChatsQueryResult = useGetUserChats();
  const { contactInfoList, lastActiveUserId } = useGetContactsInfo(userChatsQueryResult);

  useEffect(() => {

    if(!currentReceiverId && lastActiveUserId) {
      console.log('lastActiveUserId = ' + lastActiveUserId);
      setCurrentReceiverId(lastActiveUserId);
    }
  }, [lastActiveUserId]);

  const sendOneOneMessageMutation = useSendOneOneMessageMutation();
  useHandleReceiveMessages(socket, (data) => {
    console.log('received message ' + data);
    setMessages((prev) => [...prev, { content: data, senderId: 'receiver' }]);
  });

  const sendMessage = (message) => {
    if (socket && inputMessage && chatId && oneOneChatConnected) {
      console.log(`sending message ${message}`);
      socket.emit('send_message', message, chatId);

      if (message) {
        setMessages((prev) => [
          ...prev,
          { content: message, senderId: user?.userId },
        ]);
        sendOneOneMessageMutation.mutate({ chatId, message });
      }
    }

    setInputMessage('');
  };

  const handleSendButtonClick = () => {
    sendMessage(inputMessage);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.currentTarget.value);
  };

  const handleContactClick = (chatId: string) => {
    console.log(`chosen contact with chatId = ` + chatId);
    setChatId(chatId);
  }

  // useConsoleLogOnChange({ chatId });

  return (
    <>
      <div className='container'>
        <div className={styles['inner-wrapper']}>
          {contactInfoList && (
            <ContactPanel
              contactInfoList={contactInfoList}
              onContactClick={handleContactClick}
            />
          )}

          <ChatPanel
            inputMessage={inputMessage}
            messages={messages}
            lastContactInfo={contactInfoList[0]} // [0] or [lastChosenId]
            handleInputChange={handleInputChange}
            handleSendButtonClick={handleSendButtonClick}
            handleEnterKeyPress={handleEnterKeyPress}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
