<template>
    <div class="layer-accuracy">
        
        <div class="top-fixed glass">
            <div class="wrapper">
                <AccuracyWidget :accuracy="statService.getAccuracy()" />
                <LastTrainings :statService="statService" class="mt-4" />
            </div>
        </div>

        <div class="controls glass">
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
            
        }
    }
</script>

<style lang="scss" scoped>

    .layer-accuracy {
        // position: absolute;
        // top: 0;
        // left: 0;
        width: 100%;
        min-width: 100%;
        height: 100%;
        position: relative;

        .top-fixed {
            position: absolute;
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
            padding: 20px;
            display: flex;
            justify-content: center;
            position: absolute;
            bottom: 0;
            left: -10%;
            width: 120%;
            height: 70px;
            z-index: 1;
            overflow: hidden;
            border-top-left-radius: 100%;
            border-top-right-radius: 100%;
        }
    }

</style>