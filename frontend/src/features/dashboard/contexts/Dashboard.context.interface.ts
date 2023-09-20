import { Dispatch, SetStateAction } from "react";

export default interface IDashboardContext {
  collapseSidebar: boolean;
  setCollapseSidebar: Dispatch<SetStateAction<boolean>>;
}