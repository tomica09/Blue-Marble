<script>
    import Tile from './Tile.svelte';
    
    // 예제 타일 데이터
    const tiles = [
      { id: 1, name: 'Start' },
      { id: 2, name: 'Property 1' },
      // 추가 타일 데이터
    ];
  </script>
  
  <style>
    .board {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(10, 1fr);
      gap: 1px;
      width: 100%; 
      height: 100%;
    }
  </style>
  
  <div class="board">
    {#each tiles as tile}
      <Tile {tile} />
    {/each}
  </div>
  