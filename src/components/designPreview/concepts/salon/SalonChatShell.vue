<template>
    <div class="cf-screen cf-salon cf-salon--thread">
        <div class="cf-salon__ambient" aria-hidden="true" />
        <div class="cf-salon__grain" aria-hidden="true" />

        <header class="cf-salon__toolbar">
            <button
                type="button"
                class="cf-salon__back cf-salon__press-btn"
                aria-label="Назад к входящим"
            >
                ←
            </button>
            <div class="cf-salon__toolbar-meta">
                <div
                    v-if="showTalosAvatar"
                    class="cf-salon__avatar cf-salon__avatar--talos cf-salon__avatar--sm"
                >
                    <TalosEyes
                        :mood="talosMood"
                        fill="#8ab4ff"
                        class="ai-image"
                    />
                </div>
                <div v-else-if="initials" class="cf-salon__avatar cf-salon__avatar--sm">
                    {{ initials }}
                </div>
                <div class="cf-salon__toolbar-text">
                    <h1 class="cf-salon__toolbar-title">{{ title }}</h1>
                    <p v-if="subtitle" class="cf-salon__toolbar-sub">{{ subtitle }}</p>
                </div>
            </div>
            <div v-if="$slots.toolbarAction" class="cf-salon__toolbar-action">
                <slot name="toolbarAction" />
            </div>
        </header>

        <div class="cf-salon__thread-pane">
            <div
                ref="chatEl"
                class="cf-salon__chat"
                :class="{
                    'cf-salon__chat--padded': paddedChat,
                    'cf-salon__chat--anchor-bottom': anchorBottom,
                }"
            >
                <div v-if="anchorBottom" class="cf-salon__chat-spacer" aria-hidden="true" />
                <slot />
                <div v-if="anchorBottom" ref="chatEndEl" class="cf-salon__chat-end" aria-hidden="true" />
            </div>
        </div>

        <footer v-if="$slots.footer" ref="footerEl" class="cf-salon__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';

export default {
    name: 'SalonChatShell',

    components: { TalosEyes },

    props: {
        title: { type: String, required: true },
        subtitle: { type: String, default: '' },
        showTalosAvatar: { type: Boolean, default: false },
        talosMood: { type: String, default: 'neutral' },
        initials: { type: String, default: '' },
        paddedChat: { type: Boolean, default: true },
        anchorBottom: { type: Boolean, default: false },
    },

    data() {
        return {
            resizeObserver: null,
            chatObserved: false,
            footerObserved: false,
        };
    },

    mounted() {
        if (this.anchorBottom) {
            this.bindObservers();
        }
    },

    updated() {
        if (this.anchorBottom) {
            this.bindObservers();
        }
    },

    beforeUnmount() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
        this.chatObserved = false;
        this.footerObserved = false;
    },

    methods: {
        bindObservers() {
            const chat = this.$refs.chatEl;
            const footer = this.$refs.footerEl;

            if (!chat && !footer) {
                return;
            }

            if (!this.resizeObserver) {
                this.resizeObserver = new ResizeObserver(() => {
                    this.scrollToBottom();
                });
            }

            if (chat && !this.chatObserved) {
                this.resizeObserver.observe(chat);
                this.chatObserved = true;
            }

            if (footer && !this.footerObserved) {
                this.resizeObserver.observe(footer);
                this.footerObserved = true;
            }
        },

        scrollToBottom() {
            if (!this.anchorBottom) {
                return Promise.resolve();
            }

            return new Promise((resolve) => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const chat = this.$refs.chatEl;
                        if (chat) {
                            chat.scrollTop = Math.max(0, chat.scrollHeight - chat.clientHeight);
                        }

                        resolve();
                    });
                });
            });
        },
    },
};
</script>
