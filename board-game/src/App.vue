<template>
  <div id="app">
    <header>
      <h1>부루마불 게임</h1>
    </header>
    <main>
      <GameBoard />
      <DiceRoll />
      <PlayerStatus />
    </main>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';
import DiceRoll from './components/DiceRoll.vue';
import PlayerStatus from './components/PlayerStatus.vue';

export default {
  name: 'App',
  components: {
    GameBoard,
    DiceRoll,
    PlayerStatus
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

header {
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
