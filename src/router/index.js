import {createWebHistory, createRouter} from 'vue-router'
import Search from '../components/searchBar/SearchBar'
import App from '../App'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: App
    },
    {
        path: '/',
        name: 'Search',
        component: Search
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router