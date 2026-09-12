<template>
    <div
        class="cf-salon__msg-row"
        :class="{
            'cf-salon__msg-row--talos': role === 'talos',
            'cf-salon__msg-row--user': role === 'user',
            'cf-salon__msg-row--system': role === 'system',
            'cf-salon__msg-row--wide': wide,
            'cf-salon__msg-row--enter': entering,
        }"
        :style="{ animationDelay: entering ? '0s' : `${delay * 0.08}s` }"
    >
        <div class="cf-salon__msg-wrap">
            <div
                class="cf-salon__msg"
                :class="[
                    `cf-salon__msg--${variant}`,
                    { 'cf-salon__msg--wide': wide },
                ]"
            >
                <slot />
            </div>
            <span v-if="time" class="cf-salon__msg-time">{{ time }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SalonMessage',

    props: {
        role: { type: String, default: 'talos' },
        variant: { type: String, default: 'default' },
        time: { type: String, default: '' },
        delay: { type: Number, default: 0 },
        wide: { type: Boolean, default: false },
        showAvatar: { type: Boolean, default: true },
        entering: { type: Boolean, default: false },
    },
};
</script>
