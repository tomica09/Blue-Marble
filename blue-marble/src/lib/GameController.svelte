<script>
  export let playerId;
  export let players;
  export let tiles;
  import { onMount } from "svelte";
  export let turn;

  let noHavemoney = "";
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

  let money = 0;
  function paytax() {
    if (
      findwhose(players[playerId]) === String(playerId) ||
      findwhose(players[playerId]) === ""
    ) {
      nomoney("통행료를 납부할 필요가 없습니다");
    } else if (
      findwhose(players[playerId]) === "1" ||
      findwhose(players[playerId]) === "2" ||
      findwhose(players[playerId]) === "3" ||
      findwhose(players[playerId]) === "4"
    ) {
      if (typeof findhowmuchtax(players[playerId]) === "string") {
        nomoney("통행료를 납부할 수 없습니다");
      } else if (send * 10 === findhowmuchtax(players[playerId])) {
        //가격이 같으면
        socket.send(
          JSON.stringify({
            type: "tax",
            playerId,
            passmoney: 1,
          })
        );
        send = (send * 10 - findhowmuchtax(players[playerId])) / 10;
        playermoney[Number(findwhose(players[playerId]))].fifty =
          sendmoney.fifty;
        playermoney[Number(findwhose(players[playerId]))].ten = sendmoney.ten;
        playermoney[Number(findwhose(players[playerId]))].five = sendmoney.five;
        playermoney[Number(findwhose(players[playerId]))].two = sendmoney.two;
        playermoney[Number(findwhose(players[playerId]))].one = sendmoney.one;
        playermoney[Number(findwhose(players[playerId]))].ptfive =
          sendmoney.ptfive;
        playermoney[Number(findwhose(players[playerId]))].ptone =
          sendmoney.ptone;

        sendmoney.fifty = 0;
        sendmoney.ten = 0;
        sendmoney.five = 0;
        sendmoney.two = 0;
        sendmoney.one = 0;
        sendmoney.ptfive = 0;
        sendmoney.ptone = 0;
      } else if (send * 10 < findhowmuchtax(players[playerId])) {
        nomoney(
          `${(findhowmuchtax(players[playerId]) - send * 10) / 10} 만원 만큼 돈이 부족합니다!`
        );
      } else if (send * 10 > findhowmuchtax(players[playerId])) {
        nomoney(
          `${(-1 * (findhowmuchtax(players[playerId]) - send * 10)) / 10} 만원 만큼 돈이 남습니다!`
        );
      } else {
        alert("요청처리 실패");
      }
    } else {
      alert("요청처리 실패");
    }
  }
  function buyGround() {
    if (findwhose(players[playerId]) === "") {
      //주인이 없으면
      if (send * 10 === findhowmuch(players[playerId])) {
        //가격이 같으면
        socket.send(
          JSON.stringify({
            type: "buyGround",
            playerId,
            where: players[playerId],
          })
        );
        send = (send * 10 - findhowmuch(players[playerId])) / 10;

        sendmoney.fifty = 0;
        sendmoney.ten = 0;
        sendmoney.five = 0;
        sendmoney.two = 0;
        sendmoney.one = 0;
        sendmoney.ptfive = 0;
        sendmoney.ptone = 0;
      } else if (send * 10 <= findhowmuch(players[playerId])) {
        nomoney(
          `${(findhowmuch(players[playerId]) - send * 10) / 10} 만원 만큼 돈이 부족합니다!`
        );
      } else if (send * 10 >= findhowmuch(players[playerId])) {
        nomoney(
          `${(-1 * (findhowmuch(players[playerId]) - send * 10)) / 10} 만원 만큼 돈이 남습니다!`
        );
      }
    } else {
      nomoney("이 땅을 구매할 수 없습니다!");
    }
    console.log(`GameController, Roger ${players[playerId]}`);
  }
  function buyhotel() {
    if (
      send * 10 === findhowmuchhotel(players[playerId]) &&
      findwhose(players[playerId]) === playerId &&
      turn + 1 === Number(playerId)
    ) {
      socket.send(
        JSON.stringify({
          type: "buyStructure",
          playerId,
          where: players[playerId],
          hotel: 1,
          building: 0,
          house: 0,
        })
      );
      send = (send * 10 - findhowmuchhotel(players[playerId])) / 10;
      sendmoney.fifty = 0;
      sendmoney.ten = 0;
      sendmoney.five = 0;
      sendmoney.two = 0;
      sendmoney.one = 0;
      sendmoney.ptfive = 0;
      sendmoney.ptone = 0;
    } else if (turn + 1 !== Number(playerId)) {
      nomoney("당신의 차례가 아닙니다!");
    } else if (findwhose(players[playerId]) !== playerId) {
      nomoney("당신의 땅이 아닙니다");
    } else if (send * 10 < findhowmuchhotel(players[playerId])) {
      nomoney(
        `${(findhowmuchhotel(players[playerId]) - send * 10) / 10} 만원 만큼 돈이 부족합니다!`
      );
    } else if (send * 10 > findhowmuchhotel(players[playerId])) {
      nomoney(
        `${(-1 * (findhowmuchhotel(players[playerId]) - send * 10)) / 10} 만원 만큼 돈이 남습니다!`
      );
    } else {
      nomoney("이 땅은 건물을 지을 수 없음");
    }
  }
  function buybuilding() {
    if (
      send * 10 === findhowmuchbuilding(players[playerId]) &&
      findwhose(players[playerId]) === playerId &&
      turn + 1 === Number(playerId)
    ) {
      socket.send(
        JSON.stringify({
          type: "buyStructure",
          playerId,
          where: players[playerId],
          hotel: 0,
          building: 1, //"🏢",
          house: 0,
        })
      );
      send = (send * 10 - findhowmuchbuilding(players[playerId])) / 10;

      sendmoney.fifty = 0;
      sendmoney.ten = 0;
      sendmoney.five = 0;
      sendmoney.two = 0;
      sendmoney.one = 0;
      sendmoney.ptfive = 0;
      sendmoney.ptone = 0;
    } else if (turn + 1 !== Number(playerId)) {
      nomoney("당신의 차례가 아닙니다!");
    } else if (findwhose(players[playerId]) !== playerId) {
      nomoney("당신의 땅이 아닙니다");
    } else if (send * 10 < findhowmuchbuilding(players[playerId])) {
      nomoney(
        `${(findhowmuchbuilding(players[playerId]) - send * 10) / 10} 만원 만큼 돈이 부족합니다!`
      );
    } else if (send * 10 > findhowmuchbuilding(players[playerId])) {
      nomoney(
        `${(-1 * (findhowmuchbuilding(players[playerId]) - send * 10)) / 10} 만원 만큼 돈이 남습니다!`
      );
    } else {
      nomoney("이 땅은 건물을 지을 수 없음");
    }
  }
  function buyhouse() {
    if (
      send * 10 === findhowmuchhouse(players[playerId]) &&
      findwhose(players[playerId]) === playerId &&
      turn + 1 === Number(playerId)
    ) {
      socket.send(
        JSON.stringify({
          type: "buyStructure",
          playerId,
          where: players[playerId],
          hotel: 0,
          building: 0,
          house: 1, //"🏠",
        })
      );
      send = (send * 10 - findhowmuchhouse(players[playerId])) / 10;

      sendmoney.fifty = 0;
      sendmoney.ten = 0;
      sendmoney.five = 0;
      sendmoney.two = 0;
      sendmoney.one = 0;
      sendmoney.ptfive = 0;
      sendmoney.ptone = 0;
    } else if (turn + 1 !== Number(playerId)) {
      nomoney("당신의 차례가 아닙니다!");
    } else if (findwhose(players[playerId]) !== playerId) {
      nomoney("당신의 땅이 아닙니다");
    } else if (send * 10 < findhowmuchhouse(players[playerId])) {
      nomoney(
        `${(findhowmuchhouse(players[playerId]) - send * 10) / 10} 만원 만큼 돈이 부족합니다!`
      );
    } else if (send * 10 > findhowmuchhouse(players[playerId])) {
      nomoney(
        `${(-1 * (findhowmuchhouse(players[playerId]) - send * 10)) / 10} 만원 만큼 돈이 남습니다!`
      );
    } else {
      nomoney("이 땅은 건물을 지을 수 없음");
    }
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
      nomoney("돈이 부족합니다!");
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
      nomoney("돈이 부족합니다!");
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
      nomoney("돈이 부족합니다!");
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
      nomoney("돈이 부족합니다!");
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
      nomoney("돈이 부족합니다!");
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
      nomoney("돈이 부족합니다!");
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
      nomoney("돈이 부족합니다!");
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
  function findhowmuchhotel(a) {
    const found = tiles.find((country) => country.num === a);
    return found ? found.price3 : null;
  }
  function findhowmuchbuilding(a) {
    const found = tiles.find((country) => country.num === a);
    return found ? found.price2 : null;
  }
  function findhowmuchhouse(a) {
    const found = tiles.find((country) => country.num === a);
    return found ? found.price1 : null;
  }
  function findhowmuchtax(a) {
    let taxx;
    if (typeof a === "number") {
      const found = tiles.find((country) => country.num === a);
      taxx =
        found.pass +
        found.pass1 * found.house +
        found.pass2 * found.building +
        found.pass3 * found.hotel;
    } else {
      taxx = "없음";
    }
    return taxx;
  }

  function nomoney(a) {
    noHavemoney = a;

    setTimeout(function () {
      noHavemoney = "";
    }, 700);
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
  <p>
    총 재산 : {(playermoney[playerId - 1].fifty * 500 +
      playermoney[playerId - 1].ten * 100 +
      playermoney[playerId - 1].five * 50 +
      playermoney[playerId - 1].two * 20 +
      playermoney[playerId - 1].one * 10 +
      playermoney[playerId - 1].ptfive * 5 +
      playermoney[playerId - 1].ptone) /
      10} 만원
  </p>
  <p>
    현재 땅의 통행료 : {#if typeof findhowmuchtax(players[playerId]) === "number"}
      {findhowmuchtax(players[playerId]) / 10}만원
    {:else}{findhowmuchtax(players[playerId])}
    {/if}
  </p>
  {noHavemoney}
  <button on:click={buyGround}>땅 구매</button>
  {#if players[playerId] !== 0}
    {#if playerId === findwhose(players[playerId])}
      <button on:click={buyhouse}>별장 구매</button>
      <button on:click={buybuilding}>빌딩 구매</button>
      <button on:click={buyhotel}>호텔 구매</button>
    {/if}
    {#if findwhose(players[playerId]) !== 0 && findwhose(players[playerId]) !== 5 && findwhose(players[playerId]) !== 6}
      <button on:click={paytax}>통행료 납부</button>
    {/if}
  {/if}
{/if}

<style>
</style>
