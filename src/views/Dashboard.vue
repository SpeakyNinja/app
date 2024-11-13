<template>
    <div class="dashboard main-bg">

        <div class="progress mb-7">
            <div class="row">
                <div class="m-size20">пройдено тренировок</div>
                <div class="m-size40 m-black">{{ student?.progress?.trainingCount }}</div>
            </div>

            <div class="row">
                <div class="m-size20">слов выучено</div>
                <div class="m-size40 m-black">{{ student?.progress?.learnedWordsCount }}</div>
            </div>

            <div class="row">
                <div class="m-size20">слов изучается</div>
                <div class="m-size40 m-black">{{ student?.progress?.inProgressWordsCount }}</div>
            </div>
        </div>
        
        <ButtonsSticked>
            <template v-slot:items>
                <div class="item no-select" @click="toStat()">Статистика</div>
                <div class="item no-select" @click="toTraining()">Тренировка</div>
                <div class="item no-select" @click="toOptions()">Настройки</div>
            </template>
        </ButtonsSticked>

    </div>
</template>

<script>
    import { inject } from 'vue';
    import ButtonsSticked from '@/components/ButtonsSticked.vue'

    export default {

        components: {
            ButtonsSticked
        },

        data() {
            return {
            }
        },

        methods: {
            toStat() {
                this.$router.push('/statistics');
            },

            toTraining() {
                this.$router.push('/training');
            },

            toOptions() {
                this.$router.push('/options');
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');

            if(!this.student.progress) {
                try {
                    this.preloader.show = true;
                    await this.student.fetchProgress();
                    this.$forceUpdate();
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .dashboard {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;

        .progress {
            text-align: center;
            margin-top: 60px;
            color: #959595;

            .row {
                margin-bottom: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .m-black {
                    color: #ebebed;
                }
            }
        }
    }

</style>