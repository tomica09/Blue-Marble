<script context="module">
  export async function load({ params }) {
    return {
      props: {
        playerId: params.playerId
      }
    };
  }
</script>

<script>
  import GameBoard from '$lib/GameBoard.svelte';
  import { onMount } from 'svelte';

  export let playerId;

  let dice1 = 0;
  let dice2 = 0;
  let double = '';
  let socket;
  let currentPlayer = null;
  let players = {}; // 플레이어의 위치를 저장합니다.

  onMount(() => {
    socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ type: 'register', playerId }));
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'move') {
        // 다른 플레이어가 이동한 정보를 업데이트합니다.
        players[data.playerId] = data.position;
        console.log(`Player ${data.playerId} moved to position ${data.position}`);
      }
    });

    return () => {
      socket.close();
    };
  });

  function rollDice() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    const dice = dice1 + dice2;
    double = (dice1 === dice2) ? '더블!' : '';
    socket.send(JSON.stringify({ type: 'move', playerId, position: dice }));
    players[playerId] = dice; // 자신의 위치를 업데이트합니다.
  }
</script>

<main>
  <h1>Player {playerId}</h1>
  <GameBoard {players} rows={11} cols={11} />
  <div class="double">
  <button on:click={rollDice}>주사위 굴리기</button>
  
    <p>{dice1}</p>
    <p>{dice2}</p>
    <p>{double}</p>
  </div>
</main>

<style>
  main{
    display: flex;
    flex-direction: row;
    gap:2cm;
  }
  button{
    width:3cm;
    height: 1cm;
  }
  
</style>