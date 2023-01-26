import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});
