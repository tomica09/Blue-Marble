const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

let gameState = {
  players: [],
  currentPlayer: 0,
  // 초기 게임 상태...
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('rollDice', () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    io.emit('diceRolled', { playerId: gameState.currentPlayer, diceValue });
    // 게임 상태 업데이트...
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
