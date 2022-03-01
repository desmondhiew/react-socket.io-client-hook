import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

export const useSocketIoClient = (url: string, options?: SocketIOClient.ConnectOpts) => {
  const client = useRef<SocketIOClient.Socket>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    client.current = io(url, options);

    client.current.on("connect", () => {
      if (client.current) setConnected(client.current.connected || false);
    });

    client.current.on("disconnect", () => {
      if (client.current) setConnected(client.current.connected || false);
    });

    return () => {
      if (client.current) client.current.disconnect();
    };
  }, []);

  return { client: client.current, connected };
};

export default useSocketIoClient;
