export interface IChatPanel {
  userProfile?: any;
  inputMessage: string;
  messages: any[];
  lastContactInfo: any;
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendButtonClick?: () => void;
  handleEnterKeyPress?: (e: React.KeyboardEvent) => void;
}

export interface IHeaderCardProps {
  userProfile?: any;
  lastContactInfo: any;
}

export interface IMessageBoxProps {
  inputMessage: string;
  messages: any[];
  onInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick?: () => void;
  onEnterKeyPress?: (e: any) => void;
}
