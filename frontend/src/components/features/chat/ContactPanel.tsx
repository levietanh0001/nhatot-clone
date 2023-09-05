import ClickAwayListener from '@mui/material/ClickAwayListener';
import styles from './ContactPanel.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { IContactPanel } from './ContactPanel.interface';
import { AuthContext } from '~/contexts/auth/AuthContext';
import { useGetUserProfiles } from '~/api/user.api';
import { UseQueryResult } from '@tanstack/react-query';
import {
  useGetLatestChatMessages,
  useGetMessagesQuery,
} from '~/api/message.api';
import { timeAgo } from '~/utils/date.util';

const ContactPanel: React.FC<IContactPanel> = (props) => {
  const {
    // userProfile,
    // userChats,
    contactInfoList,
    onContactClick,
  } = props;

  // const authContext = useContext(AuthContext);
  // const user = authContext?.user;

  const [show, setShow] = useState<boolean>(false);

  // // lift these up
  // let recipientIds = [] as any[];
  // let chatIds = [] as any[];
  // let latestMessages = [] as any[];
  // userChats.forEach(chat => {
  //   const users = chat.users;
  //   const recipient = users.filter(item => item.id !== user.userId);
  //   recipientIds = [...recipientIds, recipient[0].id];
  //   chatIds = [...chatIds, chat._id];
  //   latestMessages = [...latestMessages, {
  //     content: chat?.latestMessage?.content ?? '',
  //     createdAt: chat?.latestMessage?.createdAt ?? ''
  //   }];
  // });

  // const recipientProfiles = useGetUserProfiles(recipientIds) as UseQueryResult[];
  // const recipientUsernames = recipientProfiles.map(item => {
  //   if (!item.isLoading && !item.isError) {
  //     return (item.data as any).username;
  //   }
  //   if (item.isError) {
  //     return '';
  //   }
  // });

  // const chatInfoList = recipientUsernames.map((username, index) => {
  //   return {
  //     chatId: chatIds[index],
  //     username,
  //     latestMessage: latestMessages[index]
  //   }
  // })

  return (
    <div className={styles['contact-panel']}>
      <div className={styles['toolbar']}>
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div className={styles['message-filter-menu']}>
            <button
              className={styles['menu-btn']}
              onClick={() => setShow(!show)}
            >
              <span className={styles['current-value']}>Tất cả</span>
              <span className={styles['dropdown-icon']}>
                <img
                  src='https://chat.chotot.com/icons/dropdown.svg'
                  alt='drop down'
                />
              </span>
            </button>
            {show && (
              <div className={styles['menu-content']}>
                {/* <MessageFilterMenuOptions /> */}
                <div className={styles['message-filter-options']}>
                  <ul>
                    <li>Tất cả</li>
                    <li>Chưa đọc</li>
                    <li>Tin nhắn rác</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </ClickAwayListener>
        <div className={styles['settings']}>
          <div className={styles['settings-icon']}>
            <img src='https://chat.chotot.com/icons/setting.svg' alt='' />
          </div>
        </div>
      </div>

      <div className={styles['contacts']}>
        <ul>
          {/* {JSON.stringify(userChats)} */}
          {contactInfoList.map((contactInfo, index) => (
            <li key={index} onClick={() => onContactClick(contactInfo.chatId)}>
              <div className={styles['contact-card']}>
                <div className={styles['card-header']}>
                  <span className={styles['avatar']}>
                    <img
                      src='https://cdn.chotot.com/73TO65Il6h0sDADPUC1slh5Y1vS2PLWhtNQHi_jRmOQ/preset:uac/plain/d01e19fd5a0155b562cce3020725c41a-7b935f90d149c81e3a81f07cce1a9040332e6d90.jpg'
                      alt='userAvatar'
                    />
                  </span>
                </div>
                <div className={styles['card-body']}>
                  <div className={styles['card-title']}>
                    <span className={styles['user-name']}>
                      {contactInfo.username}
                    </span>
                    <span className={styles['last-active']}>
                      {contactInfo.latestMessage.createdAt && (
                        <span>&nbsp;-&nbsp;</span>
                      )}
                      {contactInfo.latestMessage.createdAt
                        ? timeAgo(contactInfo.latestMessage.createdAt)
                        : ''}
                    </span>
                  </div>
                  <div className={styles['last-message']}>
                    <span>{contactInfo.latestMessage.content}</span>
                  </div>
                </div>
                <div className={styles['card-footer']}>
                  <span className={styles['product-image']}>
                    {/* <img
                      src='https://cdn.chotot.com/0g-P9xck3F_3oG2U7eIS6QrCn5QbesNp0v2hjGgHviE/preset:listing/plain/55b5bb7e078e2200ea6d82a7daccb234-2830698562985958996.jpg'
                      alt='product'
                    /> */}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactPanel;
