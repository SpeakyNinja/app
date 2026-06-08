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
import Store from '@/views/Store.vue';
import FewNeurons from '@/views/FewNeurons.vue';
import PermanentRegistration from '@/views/PermanentRegistration.vue';
import Feedback from '@/views/Feedback.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import Recovery from '@/views/Recovery.vue';
import Page404 from '@/views/Page404.vue';
import DialogTestMenu from '@/views/DialogTestMenu.vue';
import DialogTestPlay from '@/views/DialogTestPlay.vue';
import EngagementPreview from '@/views/EngagementPreview.vue';
import AnimationPreview from '@/views/AnimationPreview.vue';

const dialogTestEnabled = import.meta.env.VITE_DIALOG_TEST_ENABLED === 'true';

const dialogTestRoutes = dialogTestEnabled ? [
    {
        path: '/dialog-test',
        component: DialogTestMenu,
    },
    {
        path: '/dialog-test/:slug',
        component: DialogTestPlay,
        props: true,
    },
] : [];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Index
        }, {
            path: '/engagement-preview/:moduleKey',
            component: EngagementPreview,
            props: true,
        }, {
            path: '/animation-preview/:scenarioKey',
            component: AnimationPreview,
            props: true,
        }, {
            path: '/:catchAll(.*)',
            component: Page404
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/registration',
            component: Registration
        }, {
            path: '/forgot-password',
            component: ForgotPassword
        }, {
            path: '/recovery/:token',
            component: Recovery
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
        }, {
            path: '/store',
            component: Store
        }, {
            path: '/few-neurons',
            component: FewNeurons
        }, {
            path: '/permanent-registration',
            component: PermanentRegistration
        }, {
            path: '/feedback',
            component: Feedback
        },
        ...dialogTestRoutes,
    ]
})

export default router
