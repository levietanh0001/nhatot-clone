import { ReactNode } from "react";

export default interface ISidePanel {
  show: boolean;
  onCloseButtonClick: React.MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}