<template>
  <div class="game-board">
    <div v-for="city in cities" :key="city.id" class="city">
      {{ city.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        { id: 1, name: '서울' },
        { id: 2, name: '뉴욕' },
        { id: 3, name: '파리' }
      ]
    };
  }
};
</script>

<style>
.game-board {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
}

.city {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
