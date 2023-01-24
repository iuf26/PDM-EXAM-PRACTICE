export const baseUrl = 'localhost:3000';

export const newWebSocket = (onMessage) => {
    const ws = new WebSocket(`ws://${baseUrl}`)
    ws.onopen = () => {
      console.info('web socket onopen');
    };
    ws.onclose = () => {
      console.info('web socket onclose');
    };
    ws.onerror = error => {
      console.info('web socket onerror', error);
    };
    ws.onmessage = messageEvent => {
      onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
      ws.close();
    }
  }