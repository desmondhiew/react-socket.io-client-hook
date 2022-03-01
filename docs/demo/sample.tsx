import { useEffect, useState, useRef } from 'react';
import useSocketClient from 'react-socket.io-client-hook';

const wsUrl = 'ws://localhost:3000';

const Index: React.FC = () => {
  const room = `merchant-1-branch-1`;
  const chatsRef = useRef([]);
  const [chats, setChats] = useState([]);
  const { client, connected } = useSocketClient(wsUrl, {
    transports: ['websocket'],
  });

  useEffect(() => {
    if (connected && client) client.emit('joinRoom', room);
    return () => {
      if (client) client.emit('leaveRoom', room);
    };
  }, [connected, client]);

  useEffect(() => {
    if (!client) return;
    client.on('event:order_created', (val: any) => {
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
