import { Socket } from "socket.io-client";


export interface IUseConnectSocketProps {
  backendUrl?: string;
  // userId: number;
  // input?: string;
  // connect: boolean;
  // onConnect: (userChatId: string) => void;  
}

export interface IUseConnectSocketReturn {
  socket: Socket | null;
  error: Error | null;
  isConnected: boolean;
  isError: boolean;
}
