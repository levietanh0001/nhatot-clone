export interface ISecondTopNav {
  handleToolbarMenuIconClick: React.MouseEventHandler<HTMLDivElement>;
}

export interface IToolbarMenu { 
  show: boolean;
  onCloseButtonClick: React.MouseEventHandler<HTMLDivElement>
}
