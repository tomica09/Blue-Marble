<script>
  import GameBoard from '../components/GameBoard.svelte';
  import GameController from '../components/GameController.svelte';

  // 플레이어 1의 아이디를 설정
  const playerId = 1;
</script>

<main>
  <h1>Player 1</h1>
  <GameBoard />
  <GameController {playerId} />
</main>
