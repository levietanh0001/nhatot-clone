import { StyledEngineProvider } from "@mui/material";
import React, { ReactNode } from "react";

interface IStyledEngineProviderProps {
  children?: ReactNode;
}

const MUIStyledEngineProvider = ({ children }: IStyledEngineProviderProps) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};

export default MUIStyledEngineProvider;
