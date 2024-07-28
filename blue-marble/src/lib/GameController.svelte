<script>
  import { gameStore } from '$lib/stores/gameStore';
  import Player from './Player.svelte'; // Player 컴포넌트 임포트
  
  export let playerId;
  
  let players = [];
  let currentPlayer = null;
  let double = '';
  let dice1 = 0;
  let dice2 = 0;

  $: {
    gameStore.subscribe(state => {
      players = state.players;
      currentPlayer = players.find(player => player.id === playerId);
    });
  }

  function rollDice() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    const dice = dice1 + dice2;
    double = (dice1 === dice2) ? '더블!' : '';
    gameStore.movePlayer(dice);
  }
</script>

<style>
  .controller {
    padding: 10px;
  }
</style>

<div class="controller">
  <button on:click={rollDice}>주사위 굴리기</button>
  {#if currentPlayer}
    <Player player={currentPlayer} />
  {/if}
</div>
<div class="double">
  <p>{dice1}</p>
  <p>{dice2}</p>
  <p>{double}</p>
</div>
