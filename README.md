####  socket.io client for @nestjs/platform-socket.io v7 with react hooks
#####  socket.io-client v2.3.0 

[![npm](https://img.shields.io/npm/v/socket.io-client-react-hook.svg?style=flat-square)](https://www.npmjs.com/package/socket.io-client-react-hook)
[![npm](https://img.shields.io/npm/dt/socket.io-client-react-hook?style=flat-square)](https://www.npmtrends.com/socket.io-client-react-hook)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/socket.io-client-react-hook?style=flat-square)](https://bundlephobia.com/result?p=socket.io-client-react-hook)


## Installation

```sh
yarn add socket.io-client-react-hook
```

## Usage

```tsx
import { useEffect, useState, useRef } from 'react';
import useSocketClient from 'socket.io-client-react-hook';

const wsUrl = 'ws://localhost:3000';

const Index: React.FC = () => {
  const room = `chat-room-001`;
  const chatsRef = useRef([]);
  const [chats, setChats] = useState([]);
  const { client, connected } = useSocketClient(wsUrl, {
    transports: ['websocket'],
  });

  useEffect(() => {
    if (connected && client) client.emit('join-room', room);
    return () => {
      if (client) client.emit('leave-room', room);
    };
  }, [connected, client]);

  useEffect(() => {
    if (!client) return;
    client.on('event:message_received', (val: any) => {
      onChatReceived(val || 'new message');
    });
  }, [client]);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  const onChatReceived = (val: string) => {
    const ary = Array.from(chatsRef.current);
    ary.push(val);
    setChats(ary);
  };

  return (
    <div>
      <h1>React Socket.IO Client Hook</h1>

      <div>
        <span>
          Connection Status:
          <span style={{ margin: '0 20px', color: connected ? 'green' : 'gray' }}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </span>
      </div>
      <h4>Messages</h4>
      <div style={{ border: '1px solid black', width: 500, minHeight: 300 }}>
        {chats.map((msg, index) => (
          <div key={index}>
            {index + 1}: {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
```
