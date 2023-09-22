import { Dispatch, SetStateAction } from "react";

export default interface ITopLoadingBarContext {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}