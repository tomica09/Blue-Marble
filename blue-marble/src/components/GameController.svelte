<script>
    import { gameStore } from '../stores/gameStore.js';
    import { onMount } from 'svelte';
    import Player from './Player.svelte';  // Player 컴포넌트 임포트
  
    let players = [];
  
    onMount(() => {
      const unsubscribe = gameStore.subscribe(state => {
        players = state.players;
      });
      return unsubscribe;
    });
    let double=''
    let dice1 = 0
    let dice2 = 0
    function rollDice() {
      dice1 = Math.floor(Math.random() * 6) + 1;
      dice2 = Math.floor(Math.random() * 6) + 1;
      const dice = dice1+dice2
      if(dice1===dice2){
        double = '더블!'
      }else{
        double = ''
      }
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
    {#each players as player}
      <Player {player} />
    {/each}
  </div>
  <div class="double">
    <p>{dice1}</p>
    <p>{dice2}</p>
    <p>{double}</p>
  </div>