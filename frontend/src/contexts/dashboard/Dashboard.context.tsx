import { createContext, useEffect, useState } from "react";
import IDashboardContext from "./Dashboard.context.interface";

export const DashboardContext = createContext<IDashboardContext | null>(null);

export const DashboardProvider = (props) => {

  const { children } = props;

  const [collapseSidebar, setCollapseSidebar] = useState<boolean>(() => {
    return sessionStorage.getItem('collapseSidebar') === 'true'? true: false
  });

  useEffect(() => {
    sessionStorage.setItem('collapseSidebar', JSON.stringify(collapseSidebar));
  }, [collapseSidebar]);

  const value = {
    collapseSidebar,
    setCollapseSidebar,
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}