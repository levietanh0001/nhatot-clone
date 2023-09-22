import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@/contexts/auth/Auth.context';
import useGetContactsInfo, {
  useJoinOneOneChat,
  useSetMessagesOnFetch,
  useSetOneOneChatIdOnCreate,
} from '@/features/chat/hooks/chat.hook';
import styles from './Chat.module.scss';
import { ChatPanel } from './ChatPanel';
import ContactPanel from './ContactPanel';
import { useCreateOneOneChatQuery, useGetUserChats } from '@/features/chat/api/chat.api';
import { IMessage } from '@/features/chat/interfaces/chat.interface';
import {
  useGetMessagesQuery,
  useHandleReceiveMessages,
  useSendOneOneMessageMutation,
} from '@/features/chat/api/message.api';
import { useConnectSocket } from '@/features/chat/hooks/socket.hook';



// let reload = 0;
const Chat = () => {
  
  // go to /chatroom/create?userId then redirect to /chat
  // seeding userId for chat! / migration update userId for chat field
  // set last active contact after choosing (set id)

  // const params = useParams();
  // const userId = params['userId'];
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  // const navigate = useNavigate();

  const [currentReceiverId, setCurrentReceiverId] = useState<string>('');
  // const [currentReceiverId, setCurrentReceiverId] = useState(userId);
  const [oneOneChatConnected, setOneOneChatConnected] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentContact, setCurrentContact] = useState<any | null>(null);

  useEffect(() => {
    if(localStorage.getItem('currentContact') === '') {
      localStorage.setItem('currentContact', 'null');
    }
    setCurrentContact(JSON.parse(localStorage.getItem('currentContact') ?? 'null'));
  }, []);

  useEffect(() => {
    localStorage.setItem('currentContact', JSON.stringify(currentContact));
  }, [currentContact]);

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
  const getMessagesQueryResult = useGetMessagesQuery(currentContact?.chatId ?? chatId);
  // const getMessagesQueryResult = useGetMessagesQuery(chatId);
  useSetMessagesOnFetch(getMessagesQueryResult, (data) => {
    const fetchedMessages = data.map((item) => ({
      content: item.content,
      senderId: item.sender.id,
    }));
    setMessages(fetchedMessages);
  });

  const userChatsQueryResult = useGetUserChats(true);
  useEffect(() => {
    console.log({ userChatsData: userChatsQueryResult.data });
  }, [userChatsQueryResult.data]);
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

  const handleContactClick = (contactInfo) => {
    console.log(`chosen contact with chatId = ` + contactInfo.chatId);
    setChatId(contactInfo.chatId);
    setCurrentContact(contactInfo);
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
            // currentContactInfo={currentContact}
            currentContactInfo={currentContact || contactInfoList[0]}
            // lastContactInfo={contactInfoList[0]} // [0] or [lastChosenId]
            chatId={chatId}
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
