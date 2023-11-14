import { createRouter, createWebHistory } from "vue-router";
import Main from '../pages/Main';
import PostPage from '../pages/PostPage';
import AboutPage from '../pages/AboutPage';
import PostIdPage from '../pages/PostIdPage';


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/about',
        component: AboutPage
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router