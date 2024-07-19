import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// URL 파라미터를 통해 플레이어 ID 설정
const urlParams = new URLSearchParams(window.location.search);
const playerId = parseInt(urlParams.get('player')) || 1;
store.state.currentPlayer = playerId;

store.dispatch('initWebSocket');

createApp(App).use(store).mount('#app');
