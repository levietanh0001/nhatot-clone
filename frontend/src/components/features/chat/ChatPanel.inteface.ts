export interface IChatPanel {
  userProfile: any;
  inputMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendButtonClick: () => void;
  messages: any[];
  handleEnterKeyPress: (e: React.KeyboardEvent) => void;
}

export interface IHeaderCardProps {
  userProfile: any;
}

export interface IMessageBoxProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick: () => void;
  onEnterKeyPress: (e: any) => void;
  messages: any[];
}
