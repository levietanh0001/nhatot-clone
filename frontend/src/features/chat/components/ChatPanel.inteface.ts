export interface IChatPanel {
  userProfile?: any;
  inputMessage: string;
  messages: any[];
  chatId: string;
  // lastContactInfo: any;
  currentContactInfo: any;
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendButtonClick?: () => void;
  handleEnterKeyPress?: (e: React.KeyboardEvent) => void;
}

export interface IHeaderCardProps {
  userProfile?: any;
  currentContactInfo: any;
}

export interface IMessageBoxProps {
  inputMessage: string;
  messages: any[];
  chatId: string;
  onInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick?: () => void;
  onEnterKeyPress?: (e: any) => void;
}
