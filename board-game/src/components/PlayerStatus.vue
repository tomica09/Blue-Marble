<template>
  <div class="player-status">
    <div v-for="player in players" :key="player.id" class="player">
      <p>{{ player.name }} - 위치: {{ player.position }} - 자산: {{ player.money }} 원</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['players'])
  }
};
</script>

<style>
.player-status {
  margin-top: 20px;
}

.player {
  margin-bottom: 10px;
}
</style>
