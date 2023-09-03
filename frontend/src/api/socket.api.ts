import { useEffect, useState } from "react"
import { io } from "socket.io-client";


// interface IUseConnectSocketProps {
//   backendUrl?: string;
//   // userId: number;
//   // input?: string;
//   // connect: boolean;
//   // onConnect: (userChatId: string) => void;  
// }


export const useConnectSocket = (props?): any => {
  
  // const { backendUrl } = props;

  const [currentSocket, setCurrentSocket] = useState<any | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  // const [user, setUser] = useState<any | null>(null);

  useEffect(() => {

    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
      // console.log('connected with id = ' + socket.id);
      setCurrentSocket(socket);
      setConnected(true);
      setError(null);
    });

    socket.on('connect_error', error => {
      setConnected(false);
      setError(error);
    });

  }, []);

  return { currentSocket: currentSocket ?? null, error: error ?? null, connected };

  // if(currentSocket) {
  //   return { currentSocket, error, connected };
  // } else {
  //   return null;
  // }

}

