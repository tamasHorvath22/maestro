import CreateGame from './components/create-game/CreateGame.vue';
import Game from './components/game/Game.vue';
import Points from './components/points/Points.vue';

export default [
    {
        path: '/create-game',
        component: CreateGame
    },
    {
        path: '/game',
        component: Game
    },
    {
        path: '/points',
        component: Points
    }
]