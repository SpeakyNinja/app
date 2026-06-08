<template>
    <div class="engagement-preview-page main-bg">
        <NoticeLayer
            v-if="noticeItems.length"
            :key="`notice-${previewStateKey}`"
            :items="noticeItems"
            :fade="false"
            @closedHandler="() => {}"
        />

        <component
            v-else-if="routeView"
            :is="routeView"
            :key="`route-${previewStateKey}`"
            class="engagement-preview-route"
        />

        <component
            v-else-if="statLayerView"
            :is="statLayerView"
            :key="`stat-${previewStateKey}`"
            :stat-layer="statLayerName"
            class="engagement-preview-route"
        />

        <DialogTestPlay
            v-else-if="canvasSlug"
            :slug="canvasSlug"
            class="engagement-preview-route"
        />

        <div v-else class="engagement-preview-missing">
            <p>Превью для «{{ moduleKey }}» пока не настроено.</p>
        </div>
    </div>
</template>

<script>
import NoticeLayer from '@/components/NoticeLayer.vue';
import NoticeService from '@/services/NoticeService.js';
import { resolveEngagementPreview } from '@/utils/engagementPreviewCatalog.js';
import { noticeOptionsFromState, previewStateKey as buildPreviewStateKey, readModuleTestState } from '@/utils/moduleTestPreviewState.js';
import Training from '@/views/Training.vue';
import Statistics from '@/views/Statistics.vue';
import AddWords from '@/views/AddWords.vue';
import Test from '@/views/Test.vue';
import FewNeurons from '@/views/FewNeurons.vue';
import Index from '@/views/Index.vue';
import Login from '@/views/Login.vue';
import Store from '@/views/Store.vue';
import Options from '@/views/Options.vue';
import DialogTestPlay from '@/views/DialogTestPlay.vue';
import Registration from '@/views/Registration.vue';
import Feedback from '@/views/Feedback.vue';
import PermanentRegistration from '@/views/PermanentRegistration.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import DialogTestMenu from '@/views/DialogTestMenu.vue';
import StatisticsLayerPreview from '@/views/engagement/StatisticsLayerPreview.vue';

const ROUTE_VIEWS = {
    training: Training,
    statistics: Statistics,
    add_words: AddWords,
    test: Test,
    'route.few_neurons': FewNeurons,
    'route.index': Index,
    'route.login': Login,
    'route.store': Store,
    'route.options': Options,
    'route.registration': Registration,
    'route.feedback': Feedback,
    'route.permanent_registration': PermanentRegistration,
    'route.forgot_password': ForgotPassword,
    'route.dialog_test_menu': DialogTestMenu,
};

export default {
    name: 'EngagementPreview',

    components: {
        NoticeLayer,
        Training,
        Statistics,
        AddWords,
        Test,
        FewNeurons,
        Index,
        Login,
        Store,
        Options,
        DialogTestPlay,
        Registration,
        Feedback,
        PermanentRegistration,
        ForgotPassword,
        DialogTestMenu,
        StatisticsLayerPreview,
    },

    props: {
        moduleKey: { type: String, required: true },
    },

    provide() {
        return {
            engagementPreview: true,
        };
    },

    data() {
        return {
            noticeItems: [],
            routeView: null,
            statLayerView: null,
            statLayerName: 'LayerDashboard',
            canvasSlug: null,
        };
    },

    computed: {
        previewStateKey() {
            return buildPreviewStateKey(this.$route);
        },
    },

    mounted() {
        this.buildPreview();
    },

    watch: {
        moduleKey() {
            this.buildPreview();
        },
        '$route.query'() {
            this.buildPreview();
        },
    },

    methods: {
        buildPreview() {
            const spec = resolveEngagementPreview(this.moduleKey);
            this.noticeItems = [];
            this.routeView = null;
            this.statLayerView = null;
            this.canvasSlug = null;

            if (!spec) {
                return;
            }

            if (spec.kind === 'notice') {
                const service = new NoticeService();
                const ps = readModuleTestState(this.$route);
                const mergedOptions = {
                    ...(spec.options || {}),
                    ...noticeOptionsFromState(ps, spec.noticeKey),
                };
                let items = service.getItems(spec.noticeKey, mergedOptions) || [];
                if (spec.noticeKey === 'timeIsEmpty') {
                    items = service.getItems('timeIsEmpty', mergedOptions);
                }
                this.noticeItems = items;

                return;
            }

            if (spec.kind === 'stat_layer') {
                this.statLayerName = spec.layer || 'LayerDashboard';
                this.statLayerView = StatisticsLayerPreview;

                return;
            }

            if (spec.kind === 'route') {
                const key = spec.routeKey || this.moduleKey;
                this.routeView = ROUTE_VIEWS[key] || null;

                return;
            }

            if (spec.kind === 'canvas') {
                this.canvasSlug = spec.slug;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.engagement-preview-page {
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.engagement-preview-route {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
}

.engagement-preview-missing {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: #9091a1;
    padding: 24px;
    text-align: center;
}
</style>
