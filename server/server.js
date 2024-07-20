const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
let state = {
  players: [
    { id: 1, name: '플레이어 1', money: 1500, position: 0 },
    { id: 2, name: '플레이어 2', money: 1500, position: 0 }
  ],
  currentPlayer: 1,
  diceValue: 1
};

wss.on('connection', (ws) => {
  // 현재 상태를 새 클라이언트에 전송
  ws.send(JSON.stringify(state));

  ws.on('message', (message) => {
    // 클라이언트로부터 메시지를 수신하고 상태 업데이트
    const newState = JSON.parse(message);
    state = newState;

    // 모든 클라이언트에 새로운 상태 브로드캐스트
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(state));
      }
    });
  });
});

app.use(express.static('public'));

server.listen(8081, () => {
  console.log('서버가 포트 8081에서 실행 중입니다.');
});
