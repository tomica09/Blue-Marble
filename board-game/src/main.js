import Vue from 'vue';
import App from './App.vue';
import store from './store';
import io from 'socket.io-client';

Vue.config.productionTip = false;

const socket = io('http://localhost:4000');

socket.on('diceRolled', ({ playerId, diceValue }) => {
  store.commit('SET_DICE_VALUE', diceValue);
  store.commit('MOVE_PLAYER', { playerId, steps: diceValue });
  // 다른 이벤트 처리...
});

Vue.prototype.$socket = socket;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
