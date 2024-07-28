import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let players = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'register') {
      players[data.playerId] = ws;
    } else if (data.type === 'move') {
      const { playerId, position, dice1, dice2, double } = data;
      Object.values(players).forEach(client => {
        client.send(JSON.stringify({ type: 'move', playerId, position, dice1, dice2, double }));
      });
    }
  });

  ws.on('close', () => {
    for (const playerId in players) {
      if (players[playerId] === ws) {
        delete players[playerId];
        console.log(`Player ${playerId} disconnected`);
        break;
      }
    }
  });
});
console.log('WebSocket server is running on ws://localhost:8080');
