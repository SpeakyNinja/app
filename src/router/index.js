import { createRouter, createWebHistory } from 'vue-router'
import AiDialog from '@/views/AiDialog.vue'
import Test from '@/views/Test.vue'
import AddWords from '@/views/AddWords.vue'
import Training from '@/views/Training.vue'
import Statistics from '@/views/Statistics.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AiDialog
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
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('../views/AboutView.vue')
        // }
    ]
})

export default router
