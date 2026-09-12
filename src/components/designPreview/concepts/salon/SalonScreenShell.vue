<template>
    <div class="cf-screen cf-salon cf-salon--screen">
        <div class="cf-salon__ambient" aria-hidden="true" />
        <div class="cf-salon__grain" aria-hidden="true" />

        <header class="cf-salon__screen-head">
            <button
                type="button"
                class="cf-salon__back cf-salon__press-btn"
                aria-label="Назад"
            >
                ←
            </button>
            <div class="cf-salon__screen-head-meta">
                <h1 class="cf-salon__screen-title">{{ title }}</h1>
                <p v-if="subtitle" class="cf-salon__screen-sub">{{ subtitle }}</p>
            </div>
            <div v-if="$slots.headAction" class="cf-salon__screen-head-action">
                <slot name="headAction" />
            </div>
        </header>

        <div class="cf-salon__screen-body">
            <slot />
        </div>

        <footer v-if="$slots.footer" class="cf-salon__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script>
export default {
    name: 'SalonScreenShell',

    props: {
        title: { type: String, required: true },
        subtitle: { type: String, default: '' },
    },
};
</script>
