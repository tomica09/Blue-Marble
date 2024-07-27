<head>
	ㅇ
</head>
<script>
	import GameBoard from './components/GameBoard.svelte';
	import GameController from './components/GameController.svelte';
  </script>
  
  <main>
	<h1>부루마불 게임</h1>
	<GameBoard />
	<GameController />
  </main>
  
  <style>
	main {
	  display: flex;
	  flex-direction:row;
	  align-items: center;
	  gap: 20px;
	}
  </style>
  