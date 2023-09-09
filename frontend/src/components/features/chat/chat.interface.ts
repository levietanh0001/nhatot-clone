export interface IMessage {
  content: any;
  senderId: string;
}

export interface IContactPanel {
  // userChats: any[];
  contactInfoList: any[];
  onContactClick: (chatId: string) => void;
}
