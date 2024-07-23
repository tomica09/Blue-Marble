const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let state = {
  diceValue: 1,
  playerPosition: 0
};

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(state));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'ROLL_DICE') {
      state.diceValue = Math.floor(Math.random() * 6) + 1;
      state.playerPosition = (state.playerPosition + state.diceValue) % 44; // 44 is the total number of cells
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(state));
        }
      });
    }
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
