<script>
  /*export let players = {};**/
  export let rows;
  export let cols;
  import { get } from "svelte/store";
  import Tile from "./Tile.svelte";
  import GameController from "./GameController.svelte";
  export let players;
  let socket;
  export let playerId;
  import { onMount } from "svelte";
  export let tiles;

  rows = 11;
  cols = 11;

  // 그리드 데이터 생성
  let grid = Array(rows)
    .fill()
    .map(() => Array(cols).fill(null));

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    grid[Math.floor(i / cols)][i % cols] = tile;
  }
</script>

<div class="board">
  {#each grid as row, rowIndex}
    {#each row as tile, colIndex}
      <div class="tile">
        {#if tile}
          {#if players !== null && players !== undefined}
            <div class="ply">
              <div id="ply1">
                {#if players[1]}
                  {#if players[1] === tile.num}
                    1
                  {/if}
                {/if}
              </div>
              <div id="ply2">
                {#if players[2]}
                  {#if players[2] === tile.num}
                    2
                  {/if}
                {/if}
              </div>
              <div id="ply3">
                {#if players[3]}
                  {#if players[3] === tile.num}
                    3
                  {/if}
                {/if}
              </div>
              <div id="ply4">
                {#if players[4]}
                  {#if players[4] === tile.num}
                    4
                  {/if}
                {/if}
              </div>
            </div>
            <Tile {tile} />
          {:else}
            <Tile {tile} />
          {/if}
        {/if}
      </div>
    {/each}
  {/each}
</div>

<GameController {playerId} {players} />

<!--<script>
  import Tile from './Tile.svelte';
  
  // 예제 타일 데이터
   const tiles = [
    { name: '무인도' , num: 10},
    { name: '아테네' , num: 11},
    { name: '황금열쇠3' , num: 12},
    { name: '코펜하겐' , num: 13},
    { name: '스톡홀롬' , num: 14},
    { name: '콩코드여객기' , num: 15},
    { name: '베른' , num: 16},
    { name: '황금열쇠4' , num: 17},
    { name: '베를린' , num: 18},
    { name: '오타와' , num: 19},
    { name: '사회복지기금' , num: 20},
    { name: '이스탄불' , num: 9},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '부에노스아이레스' , num: 21},
    { name: '카이로' , num: 8},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '황금열쇠5' , num: 22},
    { name: '황금열쇠2' , num: 7},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '상파울루' , num: 23},
    { name: '싱가포르' , num: 6},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '시드니' , num: 24},
    { name: '제주' , num: 25},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '부산' , num: 5},
    { name: '마닐라' , num: 4},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '하와이' , num: 26},
    { name: '베이징' , num: 3},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '리스본' , num: 27},
    { name: '황금열쇠1' , num: 2},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '퀸 엘리자베스 호' , num: 28},
    { name: '타이베이' , num: 1},
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: ``,num: '' },
    { name: '마드리드' , num: 29},
    { name: '출발' , num: 0},
    { name: '서울' , num: 39},
    { name: '사회복지기금 접수처' , num: 38},
    { name: '뉴욕' , num: 37},
    { name: '런던' , num: 36},
    { name: '황금열쇠6' , num: 35},
    { name: '로마' , num: 34},
    { name: '파리' , num: 33},
    { name: '컬럼비아호' , num: 32},
    { name: '도쿄' , num: 31},
    { name: '우주여행' , num: 30},
  ];

  // 11x11 그리드에 맞게 타일을 배치합니다.
  const gridSize = 11;
  let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
  
  // 예시로 첫 번째 행에 타일을 채워넣는 코드 (실제 타일 배치는 게임 규칙에 맞게 조정해야 함)
  for (let i = 0; i < gridSize; i++) {
    grid[0][i] = tiles[i] || { name: `Tile ${i + 1}` };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[1][i] = tiles[i+11] || { name: `​`,num: '​' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[2][i] = tiles[i+22] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[3][i] = tiles[i+33] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[4][i] = tiles[i+44] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[5][i] = tiles[i+55] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[6][i] = tiles[i+66] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[7][i] = tiles[i+77] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[8][i] = tiles[i+88] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[9][i] = tiles[i+99] || { name: ``,num: '' };
  }
  for (let i = 0; i < gridSize; i++) {
    grid[10][i] = tiles[i+110] || { name: ``,num: '' };
  }
</script>

<style>
  .board {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    gap: 1px;
    width: 17cm;
    height: 17cm;
  }
  .empty-tile {
    border: 1px solid transparent;
  }
</style>

<div class="board">
  {#each grid as row, rowIndex}
    {#each row as tile, colIndex}
      {#if tile}
        <Tile {tile} />
      {:else}
        <div class="empty-tile"></div>
      {/if}
    {/each}
  {/each}
</div>
-->

<style>
  .board {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    gap: 1px;
    width: 17cm;
    height: 17cm;
  }
  .tile {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #ply1 {
    color: red;
  }
  #ply2 {
    color: blue;
  }
  #ply3 {
    color: rgb(0, 255, 0);
  }
  #ply4 {
    color: rgb(255, 217, 0);
  }
  .ply {
    font-weight: 1000;
  }

  /*
  .player {
    
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  */
</style>
