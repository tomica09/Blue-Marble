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
        { id: 1, name: "Seoul" },
        { id: 2, name: "New York" },
        // 다른 도시들...
      ],
    };
  },
};
</script>

<style>
.game-board {
  display: flex;
  flex-wrap: wrap;
}
.city {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
</style>
