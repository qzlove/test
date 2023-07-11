import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/index',
        component: App,
    },
    {
        path: '/index',
        name: 'main',
        component: () => import('@/views/Main/index.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home/index.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: 'error',
        component: () => import('@/views/Error/index.vue'),
    },
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

export default router
