import { createStore } from 'vuex';

export default createStore({
  state: {
    players: [
      { id: 1, name: '플레이어 1', money: 1500, position: 0 },
      { id: 2, name: '플레이어 2', money: 1500, position: 0 }
    ],
    currentPlayer: 1,
    diceValue: 1
  },
  mutations: {
    SET_DICE_VALUE(state, value) {
      state.diceValue = value;
    },
    MOVE_PLAYER(state, { playerId, steps }) {
      const player = state.players.find(p => p.id === playerId);
      player.position = (player.position + steps) % state.players.length;
    }
  },
  actions: {
    movePlayer({ commit, state }, steps) {
      commit('MOVE_PLAYER', { playerId: state.currentPlayer, steps });
    }
  }
});
