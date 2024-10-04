import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Test from '@/views/Test.vue'
import AddWords from '@/views/AddWords.vue'
import Training from '@/views/Training.vue'
import Statistics from '@/views/Statistics.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Login
        }, {
            path: '/test',
            component: Test
        }, {
            path: '/add-words',
            component: AddWords
        }, {
            path: '/training',
            component: Training
        }, {
            path: '/statistics',
            component: Statistics
        }
    ]
})

export default router
