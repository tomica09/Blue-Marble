<script>
  import GameBoard from "$lib/GameBoard.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import GameController from "../../../lib/GameController.svelte";
  import { tiles } from "./tiles.js";
  let turn = 0;
  let dice1 = 0;
  let dice2 = 0;
  let double = "";
  let socket;
  let currentPlayer = null;
  let players = {}; // 플레이어의 위치를 저장합니다.
  let connectionMessage = "";
  // URL 파라미터에서 playerId 가져오기
  let playerId;
  $: playerId = $page.data.playerId;
  let gb = "";
  let data = "";
  onMount(() => {
    socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({ type: "register", playerId: `${playerId}` })
      );
    });

    socket.addEventListener("message", (event) => {
      data = JSON.parse(event.data);
      if (data.type === "connected") {
        connectionMessage = data.message;
      } else if (data.type === "move") {
        players[data.playerId] = data.position;
        dice1 = data.dice1;
        dice2 = data.dice2;
        double = data.double;
        turn = data.turn;
        console.log(
          `Player ${data.playerId} moved to position ${data.position}`
        );
      } else if (data.type === "turn") {
        turn = data.turn;
      } else if (data.type === "buyGround") {
        let found = tiles.find((country) => country.num === data.where);
        found.whose = data.playerId;
      } else if (data.type === "buyStructure") {
        let found = tiles.find((country) => country.num === data.where);
        found.hotel = found.hotel + data.hotel;
        found.building = found.building + data.building;
        found.house = found.house + data.house;
        console.log(tiles);
      }
    });

    socket.addEventListener("close", () => {
      connectionMessage = "Connection closed.";
    });
  });

  function rollDice() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    const dice = dice1 + dice2;
    double = dice1 === dice2 ? "더블!" : "";

    socket.send(
      JSON.stringify({
        type: "move",
        playerId,
        position: ((players[playerId] ? players[playerId] : 0) + dice) % 40, // 현재 위치 업데이트 로직 필요
        dice1,
        dice2,
        double,
        turn,
      })
    );
  }

  let notYourTurn = "";
  function whosturn() {
    notYourTurn = "";
    console.log(turn);
    console.log(playerId);

    if (turn === 0 && playerId === "1") {
      rollDice();
      console.log(double);
      if (double !== "더블!") {
        turn = (turn + 1) % 4;
        socket.send(
          JSON.stringify({
            type: "turn",
            turn,
          })
        );
      }
    } else if (turn === 1 && playerId === "2") {
      rollDice();
      console.log(double);
      if (double !== "더블!") {
        turn = (turn + 1) % 4;
        socket.send(
          JSON.stringify({
            type: "turn",
            turn,
          })
        );
      }
    } else if (turn === 2 && playerId === "3") {
      rollDice();
      console.log(double);
      if (double !== "더블!") {
        turn = (turn + 1) % 4;
        socket.send(
          JSON.stringify({
            type: "turn",
            turn,
          })
        );
      }
    } else if (turn === 3 && playerId === "4") {
      rollDice();
      console.log(double);
      if (double !== "더블!") {
        turn = (turn + 1) % 4;
        socket.send(
          JSON.stringify({
            type: "turn",
            turn,
          })
        );
      }
    } else {
      notYourTurn = "당신의 차례가 아닙니다";
      setTimeout(function () {
        notYourTurn = "";
      }, 700);
    }
  }
  let b = 0;
  setInterval(function () {
    b = (b + 1) % 2;
  }, 500);
</script>

<div class="controller">
  <div class="dice-container">
    <button on:click={whosturn}>주사위 굴리기</button>

    <p>순서: Player {turn + 1}</p>
    <p>{dice1}</p>
    <p>{dice2}</p>

    <div class="double">
      <p>{double}</p>
    </div>
    <h3>{notYourTurn}</h3>
  </div>

  <div class="connection-message">
    <p>{connectionMessage}</p>
    게임말이 출발지점에 있을 경우<br />표시가 되지 않을 수 있습니다.
  </div>
  <GameBoard {players} {playerId} {tiles} {b} {turn} />
  <div class="gamecontroller">
    {#if playerId}
      <GameController {playerId} {players} {tiles} {turn} />
    {/if}
  </div>
</div>

<style>
  .gamecontroller {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }
  .controller {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 30px;
  }
  .dice-container {
    width: 2cm;
    margin-top: 1cm;
  }
  .double {
    margin-top: 10px;
  }
  .connection-message {
    margin-top: 10px;
    color: green;
  }
</style>
