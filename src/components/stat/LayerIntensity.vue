<template>
    <div class="layer-regularity">
        
        <div class="top glass">
            <TimerStat :statService="statService" />
        </div>

        <div class="middle no-scrollbar">
            <Intensity 
                :dateFrom="dateFrom" 
                :countDays="7" 
                :times="times" 
                :record="record" 
                :lastEarnedTime="lastEarnedTime"
            />
        </div>

        <div class="bottom glass">
            <div class="hint m-light">(Обнови рекорд и получи награду)</div>
        </div>
         
    </div>
</template>

<script>
    import moment from 'moment';
    import Intensity from '@/components/Intensity.vue'
    import TimerStat from '@/components/TimerStat.vue'
    import StatService from '@/services/StatService.js';
    import EarnedTimes from '@/collections/EarnedTimes.js';

    export default {

        components: {
            Intensity,
            TimerStat
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
        },

        beforeMount() {
            this.times = new EarnedTimes();
            this.times.reset(this.statService.intensity.earnedTimeList);

            this.record = 0; // пока отключен
            this.countDays = 7;
            this.dateFrom = moment().startOf('day').subtract(this.countDays - 1, 'days');
            this.lastEarnedTime = this.statService.getLastEarnedTime();
        }
    }
</script>

<style lang="scss" scoped>

    .layer-regularity {

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
            min-height: 200px;
        }

        .middle {
            background-color: #252530;
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 2;
            padding: 10px 0;

        }

        .bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #4c4d57;
            height: 200px;
            min-height: 200px;
            padding-bottom: 70px;

            .hint {
                z-index: 2;
                font-size: 16px;
                color: white;
            }
        }
    }

</style>