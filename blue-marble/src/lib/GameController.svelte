<script>
  export let playerId;
  export let players;
  import { onMount } from "svelte";

  let socket;
  onMount(() => {
    socket = new WebSocket("ws://localhost:8080");
  });

  let fifty = 3;
  let ten = 10;
  let five = 10;
  let two = 10;
  let one = 10;
  let ptfive = 5;
  let ptone = 5;

  ptone = 6;
  let money =
    (fifty * 500 +
      ten * 100 +
      five * 50 +
      two * 20 +
      one * 10 +
      ptfive * 5 +
      ptone) /
    10;
  function buyGround() {
    socket.send(
      JSON.stringify({
        type: "buyGround",
        playerId,
        where: players[playerId],
      })
    );
    console.log(`GameController, Roger ${players[playerId]}`);
  }
</script>

{#if playerId !== undefined}
  <h1>Player {playerId} 통계</h1>
  <p>50만원권 : {fifty}장</p>
  <p>10만원권 : {ten}장</p>
  <p>5만원권 : {five}장</p>
  <p>2만원권 : {two}장</p>
  <p>1만원권 : {one}장</p>
  <p>5천원권 : {ptfive}장</p>
  <p>1천원권 : {ptone}장</p>
  <p>총 재산 : {money} 만원</p>
  <button on:click={buyGround}>땅 구매</button>
{/if}

<style>
</style>
