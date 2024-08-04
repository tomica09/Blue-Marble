<script>
  export let playerId;
  export let players;
  export let tiles;
  import { onMount } from "svelte";
  let ahotel = 0;
  let abuilding = 0;
  let ahouse = 0;
  let socket;
  onMount(() => {
    socket = new WebSocket("ws://localhost:8080");
  });
  let playermoney = [
    {
      id: 1,
      fifty: 3,
      ten: 10,
      five: 10,
      two: 10,
      one: 10,
      ptfive: 5,
      ptone: 5,
    },
    {
      id: 2,
      fifty: 3,
      ten: 10,
      five: 10,
      two: 10,
      one: 10,
      ptfive: 5,
      ptone: 5,
    },
    {
      id: 3,
      fifty: 3,
      ten: 10,
      five: 10,
      two: 10,
      one: 10,
      ptfive: 5,
      ptone: 5,
    },
    {
      id: 4,
      fifty: 3,
      ten: 10,
      five: 10,
      two: 10,
      one: 10,
      ptfive: 5,
      ptone: 5,
    },
  ];
  let send = 0;
  let sendmoney = {
    fifty: 0,
    ten: 0,
    five: 0,
    two: 0,
    one: 0,
    ptfive: 0,
    ptone: 0,
  };

  let nomoney = "";
  let money =
    (playermoney[playerId - 1].fifty * 500 +
      playermoney[playerId - 1].ten * 100 +
      playermoney[playerId - 1].five * 50 +
      playermoney[playerId - 1].two * 20 +
      playermoney[playerId - 1].one * 10 +
      playermoney[playerId - 1].ptfive * 5 +
      playermoney[playerId - 1].ptone) /
    10;
  function buyGround() {
    if (findwhose(players[playerId]) === "") {
      if (send * 10 === findhowmuch(players[playerId])) {
        socket.send(
          JSON.stringify({
            type: "buyGround",
            playerId,
            where: players[playerId],
          })
        );
        send = (send * 10 - findhowmuch(players[playerId])) / 10;
      } else {
        nomoney = `금액이 맞지 않습니다!`;

        setTimeout(function () {
          nomoney = "";
        }, 700);
      }
    } else {
      nomoney = "이 땅을 구매할 수 없습니다!";

      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
    console.log(`GameController, Roger ${players[playerId]}`);
  }
  function buyhotel() {
    ahotel = 1;
    socket.send(
      JSON.stringify({
        type: "buyStructure",
        playerId,
        where: players[playerId],
        hotel: ahotel,
        building: abuilding,
        house: ahouse,
      })
    );
  }
  function buybuilding() {
    abuilding = 1;
    socket.send(
      JSON.stringify({
        type: "buyStructure",
        playerId,
        where: players[playerId],
        hotel: ahotel,
        building: abuilding,
        house: ahouse,
      })
    );
  }
  function buyhouse() {
    ahouse = 1;
    socket.send(
      JSON.stringify({
        type: "buyStructure",
        playerId,
        where: players[playerId],
        hotel: ahotel,
        building: abuilding,
        house: ahouse,
      })
    );
  }
  function moneymoney1() {
    if (playermoney[playerId - 1].fifty > 0) {
      sendmoney.fifty = sendmoney.fifty + 1;
      playermoney[playerId - 1].fifty = playermoney[playerId - 1].fifty - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }
  function moneymoney2() {
    if (playermoney[playerId - 1].ten > 0) {
      sendmoney.ten = sendmoney.ten + 1;
      playermoney[playerId - 1].ten = playermoney[playerId - 1].ten - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }
  function moneymoney3() {
    if (playermoney[playerId - 1].five > 0) {
      sendmoney.five = sendmoney.five + 1;
      playermoney[playerId - 1].five = playermoney[playerId - 1].five - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }
  function moneymoney4() {
    if (playermoney[playerId - 1].two > 0) {
      sendmoney.two = sendmoney.two + 1;
      playermoney[playerId - 1].two = playermoney[playerId - 1].two - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }
  function moneymoney5() {
    if (playermoney[playerId - 1].one > 0) {
      sendmoney.one = sendmoney.one + 1;
      playermoney[playerId - 1].one = playermoney[playerId - 1].one - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }
  function moneymoney6() {
    if (playermoney[playerId - 1].ptfive > 0) {
      sendmoney.ptfive = sendmoney.ptfive + 1;
      playermoney[playerId - 1].ptfive = playermoney[playerId - 1].ptfive - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }
  function moneymoney7() {
    if (playermoney[playerId - 1].ptone > 0) {
      sendmoney.ptone = sendmoney.ptone + 1;
      playermoney[playerId - 1].ptone = playermoney[playerId - 1].ptone - 1;
      send =
        (sendmoney.fifty * 500 +
          sendmoney.ten * 100 +
          sendmoney.five * 50 +
          sendmoney.two * 20 +
          sendmoney.one * 10 +
          sendmoney.ptfive * 5 +
          sendmoney.ptone) /
        10;
    } else {
      nomoney = "돈이 부족합니다!";
      setTimeout(function () {
        nomoney = "";
      }, 700);
    }
  }

  function resetmoney() {
    playermoney[playerId - 1].fifty =
      playermoney[playerId - 1].fifty + sendmoney.fifty;
    playermoney[playerId - 1].ten =
      playermoney[playerId - 1].ten + sendmoney.ten;
    playermoney[playerId - 1].five =
      playermoney[playerId - 1].five + sendmoney.five;
    playermoney[playerId - 1].two =
      playermoney[playerId - 1].two + sendmoney.two;
    playermoney[playerId - 1].one =
      playermoney[playerId - 1].one + sendmoney.one;
    playermoney[playerId - 1].ptfive =
      playermoney[playerId - 1].ptfive + sendmoney.ptfive;
    playermoney[playerId - 1].ptone =
      playermoney[playerId - 1].ptone + sendmoney.ptone;
    sendmoney.fifty = 0;
    sendmoney.ten = 0;
    sendmoney.five = 0;
    sendmoney.two = 0;
    sendmoney.one = 0;
    sendmoney.ptfive = 0;
    sendmoney.ptone = 0;
    send =
      (sendmoney.fifty * 500 +
        sendmoney.ten * 100 +
        sendmoney.five * 50 +
        sendmoney.two * 20 +
        sendmoney.one * 10 +
        sendmoney.ptfive * 5 +
        sendmoney.ptone) /
      10;
  }
  function findwhose(a) {
    const found = tiles.find((country) => country.num === a);
    return found ? found.whose : null;
  }
  function findhowmuch(a) {
    const found = tiles.find((country) => country.num === a);
    return found ? found.price : null;
  }
</script>

{#if playerId !== undefined}
  <h1>Player {playerId} 통계</h1>

  <button on:click={moneymoney1}
    >50만원권 : {playermoney[playerId - 1].fifty}장</button
  >
  <button on:click={moneymoney2}
    >10만원권 : {playermoney[playerId - 1].ten}장</button
  >
  <button on:click={moneymoney3}
    >5만원권 : {playermoney[playerId - 1].five}장</button
  >
  <button on:click={moneymoney4}
    >2만원권 : {playermoney[playerId - 1].two}장</button
  >
  <button on:click={moneymoney5}
    >1만원권 : {playermoney[playerId - 1].one}장</button
  >
  <button on:click={moneymoney6}
    >5천원권 : {playermoney[playerId - 1].ptfive}장</button
  >
  <button on:click={moneymoney7}
    >1천원권 : {playermoney[playerId - 1].ptone}장</button
  >
  <p>
    선택한 금액 {send} 만원
    <button on:click={resetmoney}>선택 금액 초기화</button>
  </p>
  <p>총 재산 : {money} 만원</p>
  {nomoney}
  <button on:click={buyGround}>땅 구매</button>
  {#if players[playerId] !== 0}
    {#if players[playerId] === findwhose(players[playerId])}
      <button on:click={buyhouse}>별장 구매</button>
      <button on:click={buybuilding}>빌딩 구매</button>
      <button on:click={buyhotel}>호텔 구매</button>
    {/if}
  {/if}
{/if}

<style>
</style>
