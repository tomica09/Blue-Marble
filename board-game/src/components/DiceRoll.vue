<template>
  <div class="dice-roll">
    <button @click="rollDice">주사위 굴리기</button>
    <p>주사위 값: {{ diceValue }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['diceValue'])
  },
  methods: {
    rollDice() {
      const value = Math.floor(Math.random() * 6) + 1;
      this.$store.commit('SET_DICE_VALUE', value);
      this.$store.dispatch('movePlayer', value);
    }
  }
};
</script>

<style>
.dice-roll {
  margin-top: 20px;
}
</style>
