<script>
    export let player;
  </script>
  
  <style>
    .player {
      padding: 10px;
      border: 1px solid #ccc;
      margin: 5px;
      display: flex;
      justify-content: center;
    }
  </style>
  
  <div class="player">
    <h3>{player.name}</h3>
    <p>_위치: {player.position}</p>
    <p>, 자산: {player.money}</p>
  </div>
  