import { createContext, useContext, useEffect, useState } from "react";
import ITopLoadingBarContext from "./TopLoadingBar.context.interface";


export const TopLoadingBarContext = createContext<ITopLoadingBarContext | null>(null);

export const TopLoadingBarProvider = (props) => {

  const [progress, setProgress] = useState<number>(0);

  const value = {
    progress,
    setProgress
  }

  return <TopLoadingBarContext.Provider value={value}>{props.children}</TopLoadingBarContext.Provider>
}


export const useTopLoadingBar = (isLoading) => {

  const topLoadingBarContext = useContext(TopLoadingBarContext);
  
  useEffect(() => {

    if(isLoading) {
      topLoadingBarContext?.setProgress(30);
    } else {
      topLoadingBarContext?.setProgress(100);
    }

  }, [isLoading]);
}