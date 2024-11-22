<template>
    <div class="layer-accuracy">
        
        <div class="top-fixed glass">
            <div class="wrapper">
                <AccuracyWidget :accuracy="statService.getAccuracy()" />
                <LastTrainings :statService="statService" class="mt-4" />
            </div>
        </div>

        <div class="controls glass">
            <div class="btn green" @click="toTraining()">Тренироваться</div>
        </div>
         
    </div>
</template>

<script>
    import AccuracyWidget from '@/components/AccuracyWidget.vue'
    import LastTrainings from '@/components/LastTrainings.vue'
    import StatService from '@/services/StatService.js';

    export default {

        components: {
            AccuracyWidget,
            LastTrainings
        },

        props: {
            statService: {
                type: StatService,
                required: true
            }
        },

        data() {
            return {
            }
        },

        methods: {
            toTraining() {
                this.$router.push('/training');
            }
        }
    }
</script>

<style lang="scss" scoped>

    .layer-accuracy {

        .top-fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;

            .wrapper {
                z-index: 2;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 55px 10px 40px 10px;
                color: white;
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
        }

        .controls {
            margin-top: 10px;
            padding: 20px;
            display: flex;
            justify-content: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 191px;
            border-top: 1px solid rgba(255,255,255,0.2);
            z-index: 1;

            .btn {
                max-width: 250px;
                z-index: 2;
            }
        }
    }

</style>