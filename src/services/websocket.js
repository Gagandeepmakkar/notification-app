export const setupWebSocket = (onMessageCallback) => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => console.log('Connected to WebSocket');
    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      onMessageCallback(data);
    };
    ws.onclose = () => console.log('Disconnected from WebSocket');
    
    return ws;
  };
  