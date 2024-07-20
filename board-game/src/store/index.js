import { createStore } from 'vuex';

const store = createStore({
  state: {
    players: [
      { id: 1, name: '플레이어 1', money: 1500, position: 0 },
      { id: 2, name: '플레이어 2', money: 1500, position: 0 }
    ],
    currentPlayer: 1,
    diceValue: 1,
    websocket: null
  },
  mutations: {
    SET_STATE(state, newState) {
      state.players = newState.players;
      state.currentPlayer = newState.currentPlayer;
      state.diceValue = newState.diceValue;
    },
    SET_DICE_VALUE(state, value) {
      state.diceValue = value;
    },
    MOVE_PLAYER(state, { playerId, steps }) {
      const player = state.players.find(p => p.id === playerId);
      player.position = (player.position + steps) % state.players.length;
    },
    SET_WEBSOCKET(state, websocket) {
      state.websocket = websocket;
    }
  },
  actions: {
    movePlayer({ commit, state }, steps) {
      commit('MOVE_PLAYER', { playerId: state.currentPlayer, steps });
      store.dispatch('sendState');
    },
    sendState() {
      const state = store.state;
      const ws = store.state.websocket;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(state));
      }
    },
    initWebSocket({ commit }) {
      const websocket = new WebSocket('ws://localhost:8081');
      
      websocket.onmessage = (event) => {
        const newState = JSON.parse(event.data);
        commit('SET_STATE', newState);
      };

      websocket.onopen = () => {
        console.log('WebSocket 연결이 열렸습니다.');
      };

      websocket.onerror = (error) => {
        console.log('WebSocket 오류:', error);
      };

      websocket.onclose = () => {
        console.log('WebSocket 연결이 닫혔습니다.');
      };

      commit('SET_WEBSOCKET', websocket);
    }
  },
  modules: {}
});

export default store;
