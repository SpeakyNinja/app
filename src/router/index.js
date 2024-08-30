import { createRouter, createWebHistory } from 'vue-router'
import AiDialog from '@/views/AiDialog.vue'
import Test from '@/views/Test.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'ai-dialog',
            component: AiDialog
        },
        {
            path: '/test',
            name: 'test',
            component: Test
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
