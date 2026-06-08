<template>
    <div class="dialog-test-menu main-bg">
        <TopBar title="Тест диалогов" back-link="/options" />

        <div class="menu-body no-scrollbar">
            <p v-if="!canvases.length && !loading" class="empty">Нет опубликованных холстов</p>

            <button
                v-for="canvas in canvases"
                :key="canvas.slug"
                type="button"
                class="canvas-item no-select"
                @click="openCanvas(canvas.slug)"
            >
                <span class="canvas-item__title">{{ canvas.title }}</span>
                <span v-if="canvas.comment" class="canvas-item__comment">{{ canvas.comment }}</span>
                <span class="canvas-item__meta">v{{ canvas.published_version }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
import TopBar from '@/components/TopBar.vue';
import CanvasDialogService from '@/services/CanvasDialogService.js';

export default {
    components: { TopBar },

    data() {
        return {
            canvases: [],
            loading: true,
        };
    },

    async beforeMount() {
        this.modal = inject('modal');
        this.preloader = inject('preloader');
        this.api = new CanvasDialogService();

        try {
            this.preloader.show = true;
            const res = await this.api.listPublished();
            this.canvases = res.canvases || [];
        } catch (e) {
            this.modal.show(this.normalizeError(e));
        } finally {
            this.loading = false;
            this.preloader.show = false;
        }
    },

    methods: {
        openCanvas(slug) {
            this.$router.push(`/dialog-test/${slug}`);
        },

        normalizeError(e) {
            if (e?.message) {
                return e;
            }
            const data = e?.response?.data;
            return {
                message: data?.message || e?.message || 'Ошибка загрузки',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.dialog-test-menu {
    flex-grow: 2;
    height: 100%;
    padding-top: 80px;

    .menu-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 24px 30px 40px;
        max-width: 500px;
        margin: 0 auto;
        width: 100%;
        max-height: calc(100vh - 80px);
        overflow-y: auto;
    }

    .empty {
        color: #9ca3af;
        text-align: center;
        padding: 40px 0;
    }

    .canvas-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        width: 100%;
        padding: 16px 18px;
        border: none;
        border-radius: 12px;
        background: #3d3e48;
        color: #ebebed;
        text-align: left;
        cursor: pointer;

        &__title {
            font-family: Bold;
            font-size: 18px;
        }

        &__comment {
            font-family: Light;
            font-size: 15px;
            color: #b8b9c4;
        }

        &__meta {
            font-size: 13px;
            color: #7b7d8a;
        }

        &:active {
            opacity: 0.85;
        }
    }
}
</style>
