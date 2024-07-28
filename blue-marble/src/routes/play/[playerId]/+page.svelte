<script>
  import GameBoard from '$lib/GameBoard.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let dice1 = 0;
  let dice2 = 0;
  let double = '';
  let socket;
  let currentPlayer = null;
  let players = {}; // 플레이어의 위치를 저장합니다.
  let connectionMessage = '';

  // URL 파라미터에서 playerId 가져오기
  let playerId;
  $: playerId = $page.data.playerId;

  onMount(() => {
    socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ type: 'register', playerId: `${playerId}` }));
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'connected') {
        connectionMessage = data.message;
      } else if (data.type === 'move') {
        players[data.playerId] = data.position;
        dice1 = data.dice1;
        dice2 = data.dice2;
        double = data.double;
        console.log(`Player ${data.playerId} moved to position ${data.position}`);
      }
    });

    socket.addEventListener('close', () => {
      connectionMessage = 'Connection closed.';
    });
  });

  function rollDice() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    const dice = dice1 + dice2;
    double = (dice1 === dice2) ? '더블!' : '';
    
    socket.send(JSON.stringify({
      type: 'move',
      playerId,
      position: (players[playerId] || 0) + dice, // 현재 위치 업데이트 로직 필요
      dice1,
      dice2,
      double
    }));
  }
</script>

<style>
  .controller {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }
  .dice-container {
    width: 1cm;
    margin-top: 1cm;
  }
  .double {
    margin-top: 10px;
  }
  .connection-message {
    margin-top: 10px;
    color: green;
  }
</style>

<div class="controller">
  <button on:click={rollDice}>주사위 굴리기</button>
  <div class="dice-container">
    <p>{dice1}</p>
    <p>{dice2}</p>
  </div>
  <div class="double">
    <p>{double}</p>
  </div>
  <div class="connection-message">
    <p>{connectionMessage}</p>
  </div>
  <GameBoard {players} />
</div>
