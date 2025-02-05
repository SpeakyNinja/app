<template>

    <div class="time-is-empty">

        <div class="m-center">
            <Ai fill="white" class="ai-image" />
        </div>

        <div class="title m-light">Допущено доведение&nbsp;таймера до нуля</div>

        <div class="texts">
            
            <div class="text m-light">Таймер перезапущен.</div>
            
            <div class="text m-light">
                {{`Следующие ${getCount()} тренировок будут дороже на ${getCount()}%`}}
            </div>

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

<style lang="scss" >

    .time-is-empty {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-grow: 2;
        padding: 100px 0 10px 0;

        .title {
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: 32px;
            margin-top: 100px;
        }

        .texts {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
            margin-top: 32px;

            .text {
                text-align: center;
            }
        }

        .button-wrapper {
            flex-grow: 2;
            padding-bottom: 30px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .ai-image {
            width: 300px;
            height: 50px;
            filter: drop-shadow(#0bcccf 0px 0px 5px);
        }
    }

</style>