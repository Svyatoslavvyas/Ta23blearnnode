import './style.scss';

import { createApp } from 'vue';
import { createWebHashHistory, createWebHistory, createMemoryHistory, createRouter } from 'vue-router';

import App from './App.vue';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';
import ChuckNorris from './pages/ChuckNorris.vue';
import RickAndMorty from './pages/RickAndMorty.vue';
import CookieClikier from './pages/CookieCliker.vue';
import Vibration from './pages/Vibration.vue';
import Chat from './pages/chat.vue';
import Leaflet from './pages/Leaflet.vue';


const routes = [
  { path: '/', component: ToDo, name: 'ToDo' },
  { path: '/modals', component: Modals, name: 'Modals' },
  { path: '/chuck', component: ChuckNorris, name: 'Chuck Norris' },
  { path: '/rickandmorty', component: RickAndMorty, name: 'Rick And Morty' },
  { path: '/cookieclicker', component: CookieClikier, name: 'Cookie Clicker', meta: {container: false} },
  { path: '/vibration', component: Vibration, name: 'Vibration' },
  { path: '/Chat', component: Chat, name: 'Chat' },
  { path: '/Leaflet', component: Leaflet, name:'Leaflet'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


const app = createApp(App);
app.use(router);
app.mount('#app');
