import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Index from '@/views/Index.vue';
import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';
import Test from '@/views/Test.vue';
import AddWords from '@/views/AddWords.vue';
import Training from '@/views/Training.vue';
import Statistics from '@/views/Statistics.vue';
import Options from '@/views/Options.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Index
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/registration',
            component: Registration
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
        }, {
            path: '/options',
            component: Options
        }
    ]
})

export default router
