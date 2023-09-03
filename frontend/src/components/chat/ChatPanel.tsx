import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import styles from './ChatPanel.module.scss';
import { AuthContext } from '~/contexts/auth/AuthContext';

interface IHeaderCardProps {
  userProfile: any;
}

export const HeaderCard: React.FC<IHeaderCardProps> = (props) => {

  const { userProfile } = props;

  return (
    <div className={styles['header-card']}>
      <div className={styles['card-header']}>
        <span className={styles['avatar']}>
          <img
            src='https://cdn.chotot.com/73TO65Il6h0sDADPUC1slh5Y1vS2PLWhtNQHi_jRmOQ/preset:uac/plain/d01e19fd5a0155b562cce3020725c41a-7b935f90d149c81e3a81f07cce1a9040332e6d90.jpg'
            alt='userAvatar'
          />
        </span>
      </div>
      <div className={styles['card-body']}>
        <div className={styles['user-name']}>{userProfile?.username ?? ''}</div>
        <div className={styles['last-active']}>
          <span className={styles['status-icon']}></span>
          <span className={styles['time']}>1 giờ trước</span>
        </div>
      </div>
      <div className={styles['card-footer']}>
        <span className={styles['more']}>
          <img
            src='https://chat.chotot.com/icons/moreVertical.svg'
            alt='more'
          />
        </span>
      </div>
    </div>
  );
};


interface IMessageBoxProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick: () => void;
  onEnterKeyPress: (e: any) => void;
  messages: any[];
}


let render = 0;
export const MessageBox: React.FC<IMessageBoxProps> = (props) => {

  const {
    input,
    onInputChange,
    onSendButtonClick,
    messages,
    onEnterKeyPress,
  } = props;

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.user;
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesStartRef = useRef<HTMLDivElement | null>(null);
  const prevScrollPos = useRef(0);
  const [scrollTopVisible, setScrollTopVisible] = useState<boolean>(false);
  const [scrollBottomVisible, setScrollBottomVisible] = useState<boolean>(false);

  useEffect(() => {
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      messagesEndElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  useEffect(() => {

    const messagesElement = messagesRef.current;

    const toggleVisibility = () => {


      if (messagesElement) {
        const currentScrollPos = messagesElement.scrollTop;
        if (currentScrollPos >= 20 && currentScrollPos > prevScrollPos.current) {
          setScrollTopVisible(true);
          setScrollBottomVisible(false);
        } else if (currentScrollPos < 20 && currentScrollPos < prevScrollPos.current) {
          setScrollTopVisible(false);
          setScrollBottomVisible(true);
        }

        prevScrollPos.current = currentScrollPos;
      }

    };

    if (messagesElement) {
      messagesElement.addEventListener('scroll', toggleVisibility);
    }

    return () => {
      if (messagesElement) {
        messagesElement.removeEventListener('scroll', toggleVisibility);
      }
    }
  }, [scrollTopVisible]);

  useEffect(() => {

    if (inputRef.current) {
      if (input.length > 62) {
        inputRef.current.style.height = `35px`;
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      } else {
        inputRef.current.style.height = `35px`;
      }
    }

  }, [input]);

  const handleScrollToTopClick = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const handleScrollToBottomClick = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  render++;

  return (
    <div className={styles['message-box']}>
      {/* {render} */}
      <div className={styles['messages']} ref={messagesRef}>
        <div ref={messagesStartRef}></div>

        <button
          className={clsx(styles['scroll-to-top-btn'], { [styles['hidden']]: !scrollTopVisible })}
          onClick={handleScrollToTopClick}
        >
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' /></svg>
        </button>

        <ul>
          {messages.map((item, index) => (
            <li key={index}>
              <div
                className={clsx(
                  styles['message-content'],
                  {
                    [styles['self']]: item?.origin === currentUser?.userId,
                    [styles['other']]: item?.origin !== currentUser?.userId
                  }
                )}
              >
                <span>
                  {item.content}
                </span>
                <span className={styles['avatar']}>
                  <img
                    src='https://cdn.chotot.com/73TO65Il6h0sDADPUC1slh5Y1vS2PLWhtNQHi_jRmOQ/preset:uac/plain/d01e19fd5a0155b562cce3020725c41a-7b935f90d149c81e3a81f07cce1a9040332e6d90.jpg'
                    alt='userAvatar'
                    height={'35px'}
                    width={'35px'}
                  />
                </span>
              </div>
            </li>
          ))}

          {/* {[...Array(50)].map((item, index) => (
            <li key={index}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, error non. Saepe amet officiis debitis expedita provident deserunt fuga id. Magni aspernatur ut tempore. Temporibus iste at ex soluta cum.</li>
          ))} */}
        </ul>
        <button
          className={clsx(styles['scroll-to-bottom-btn'], { [styles['hidden']]: !scrollBottomVisible })}
          onClick={handleScrollToBottomClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
        </button>
        <div ref={messagesEndRef}></div>
      </div>
      <div className={styles['quick-messages']}>
        <ul>
          <li>Căn hộ này còn không ạ?</li>
          <li>Thời hạn thuê tối đa là bao lâu?</li>
          <li>Thời gian thuê tối thiểu là bao lâu?</li>
          <li>Căn hộ có sẳn nội thất chưa ạ?</li>
          <li>Có thêm chi phí phát sinh gì nữa không?</li>
        </ul>
      </div>
      <div className={styles['chat-box']}>
        <div className={styles['more-actions']}>
          <img src='https://chat.chotot.com/icons/plusCircle.svg' alt='open' />
        </div>
        <div className={styles['chat-input']}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={onEnterKeyPress}
            placeholder='Nhập tin nhắn'
          ></textarea>
        </div>
        <button
          className={styles['send-button']}
          onClick={onSendButtonClick}
          tabIndex={0}
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};