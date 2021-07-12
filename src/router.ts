import {createWebHistory, createRouter} from 'vue-router';
import Home from './views/Home.vue';
import Games from './views/Games.vue';
import AddGame from './views/AddGame.vue';
import PlayerStats from './views/PlayerStats.vue';


const routes = [
    {path: '/', name: "Home", component: Home},
    {path: '/games', name: "Games", component: Games},
    {path: '/add_game', name: "Add Game", component: AddGame},
    {path: '/player_stats', name: "PlayerStats", component: PlayerStats},
];

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;
