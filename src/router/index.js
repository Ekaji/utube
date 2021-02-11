import {createWebHistory, createRouter} from 'vue-router'
import Search from '../components/searchBar/SearchBar'
import Home from '../components/home/Home'
import Video from '../components/video/Video'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/video',
        name: 'Video',
        component: Video
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router