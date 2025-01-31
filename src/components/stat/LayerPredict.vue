<template>
    <div class="layer-predict">
        
        <div class="top glass">
            <div>Ожидаемый<br> прирост</div>
        </div>

        <div class="middle">
            <SpeedWidget 
                :curValue="statService.predict.curValue" 
                :maxValue="statService.predict.maxValue" 
            />
        </div>

        <div class="bottom glass">
            <div class="">При текущем темпе</div>
        </div>
         
    </div>
</template>

<script>
    import SpeedWidget from '@/components/SpeedWidget.vue'
    import StatService from '@/services/StatService.js';


    export default {

        components: {
            SpeedWidget
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

    .layer-predict {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 100%;
        height: 100vh;
        // position: absolute;
        // top: 0;
        // left: 0;
        z-index: 1;

        .top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #4c4d57;
            height: 200px;

            >div {
                z-index: 1;
                color: white;
                text-align: center;
                font-size: 22px;
                text-shadow: 
                    0px 0px 80px rgba(9,190,255,1), 
                    0px 0px 20px rgba(9,190,255,0.5), 
                    0px 0px 10px rgba(9,190,255,0.25),
                    0px 0px 5px rgba(255,255,255,0.35);
            }
        }

        .middle {
            background-color: #252530;
            flex-grow: 2;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #4c4d57;
            height: 250px;
            padding-bottom: 70px;

            >div {
                z-index: 2;
                color: white;
                font-family: Light;
            }
        }
    }

</style>