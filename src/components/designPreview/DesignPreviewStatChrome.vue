<template>
    <div class="dp-stat-layer-chrome glass">
        <TimerStat :statService="statService" :isSmall="true" />
        <button class="dp-stat-layer-chrome__settings" type="button" aria-label="Настройки">
            <IconCog class="cog" />
        </button>
    </div>
</template>

<script>
import IconCog from '@/components/icons/IconCog.vue';
import TimerStat from '@/components/TimerStat.vue';
import StatService from '@/services/StatService.js';

export default {
    name: 'DesignPreviewStatChrome',

    components: {
        IconCog,
        TimerStat,
    },

    props: {
        statService: {
            type: StatService,
            required: true,
        },
    },
};
</script>
