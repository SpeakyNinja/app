<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Допущено доведение&nbsp;таймера до нуля</div>

    <div class="texts">
        
        <div class="text m-light">Таймер перезапущен.</div>
        
        <div class="text m-light">
            {{`Следующие ${getCount()} тренировок будут дороже на ${getCount()}%`}}
        </div>

        <div class="button-wrapper">
            <div class="btn green" @click="ok()">ОК</div>
        </div>
    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue'

    export default {
        components: {
            Ai
        },

        props: {
            options: {
                type: Object,
                required: false,
                default: {}
            }
        },

        data() {
            return {
            }
        },

        methods: {
            async ok() {
                try {
                    this.preloader.show = true;
                    const r = await this.statService.writeGameover();
                    this.statService.intensity.timeRecord = r.timeRecord;
                    this.$parent.changeItem(1);
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            },

            getCount() {
                return (this.statService.count_game_overs + 1) * 10;
            }
        },

        beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.statService = this.options.statService;
        }
    }
</script>

<style lang="scss" scoped>

    .texts {
        min-height: 38% !important;
        height: 38% !important;
    }
    
</style>