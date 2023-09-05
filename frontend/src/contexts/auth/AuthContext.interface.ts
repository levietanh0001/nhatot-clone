import { SetStateAction } from "react";

export interface IAuthContext {
  user: any | null;
  setUser: SetStateAction<any | null>;
  userData?: any | null;
  setUserData?: SetStateAction<any | null>;
  authenticated?: boolean;
  setAuthenticated?: React.Dispatch<SetStateAction<boolean>>;
  registerUser: (email: string, password: string, confirmPassword: string, userName: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  logoutUser: () => Promise<any>;
  resetUserPassword: (email: string) => Promise<any>;
  //? updateUserEmail: (email: string) => Promise<any>;
  updateUserPassword: (newPassword: string, userId: string, resetToken: string,) => Promise<any>;
  checkLoggedIn: () => Promise<boolean>;
  redirectToLoginPage: (loginUrl?: string) => void;
  redirectToRegisterPage: (registerUrl?: string) => void;
}