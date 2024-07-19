import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [
      { id: 1, name: 'Player 1', money: 1500, position: 0 },
      { id: 2, name: 'Player 2', money: 1500, position: 0 },
      // 다른 플레이어들...
    ],
    currentPlayer: 1,
    diceValue: 1,
  },
  mutations: {
    SET_DICE_VALUE(state, value) {
      state.diceValue = value;
    },
    MOVE_PLAYER(state, { playerId, steps }) {
      const player = state.players.find(p => p.id === playerId);
      player.position = (player.position + steps) % 40; // 예: 40개의 도시가 있는 경우
    },
    // 다른 뮤테이션...
  },
  actions: {
    rollDice({ commit }) {
      const value = Math.floor(Math.random() * 6) + 1;
      commit('SET_DICE_VALUE', value);
      commit('MOVE_PLAYER', { playerId: this.state.currentPlayer, steps: value });
      // 다른 액션...
    },
  },
});
