<template>
    <div class="timer-stat">

        <template v-for="(item, i) in timeParts" :key="`${i}-${item.value}`">
            <div :class="{muted: item.isMuted, small: isSmall}">
                {{ item.value }}
            </div>
        </template>        

    </div>
</template>

<script>
    import moment from 'moment';
    import ToolsService from '@/services/ToolsService.js';

    export default {

        props: {
            ownedTime: {
                type: Number,
                required: true
            },

            isSmall: {
                type: Boolean,
                required: false,
                default: false
            }
        },

        components: {
        },

        data() {
            return {
                timeParts: [],
                gridOffset: 10
            }
        },

        methods: {
            updateTimeParts() {
                const secondsFromStartOfDay = Math.round( (moment() - moment().startOf('day')) / 1000 );
                const leftSeconds = this.ownedTime - secondsFromStartOfDay;
                
                const days = this.toolsService.days(leftSeconds);
                const hours = this.toolsService.hours(leftSeconds);
                const minutes = this.toolsService.minutes(leftSeconds);
                const seconds = this.toolsService.seconds(leftSeconds);
                
                this.timeParts = [
                    ...String(days).padStart(2, '0').split('').map((char, i) => ({ value: char, isMuted: char === '0' && days < 10 && (!i || !days) })),
                    { value: ' ', isMuted: true },
                    ...String(hours).padStart(2, '0').split('').map((char, i) => ({ value: char, isMuted: char === '0' && hours < 10 && ( !i || (!days && !hours) ) })),
                    { value: ':', isMuted: !days && !hours },
                    ...String(minutes).padStart(2, '0').split('').map((char, i) => ({ value: char, isMuted: char === '0' && minutes < 10 && ( !i || (!days && !hours && !minutes) ) })),
                    { value: ':', isMuted: !days && !hours && !minutes },
                    ...String(seconds).padStart(2, '0').split('').map((char, i) => ({ value: char, isMuted: char === '0' && seconds < 10 && ( !i || (!days && !hours && !minutes && !seconds) ) }))
                ];
            },

            start() {
                this.updateTimeParts();
                this.interval = setInterval(() => {
                    this.updateTimeParts();
                }, 1000);
            }
        },

        beforeMount() {
            this.toolsService = new ToolsService();
        },

        mounted() {
            this.start();
        },

        beforeUnmount() {
            clearInterval(this.interval);
        }
    }
</script>

<style lang="scss" scoped>

    .timer-stat {
        z-index: 2;
        display: flex;

        div {
            font-size: 40px;
            font-family: RobotoBlack;
            color: white;
            min-width: 20px;
            display: flex;
            justify-content: center;
            text-shadow: 0px 0px 15px #7faef9, 0px 0px 15px rgba(127,174,249,0.5);
            line-height: 1;

            &.muted {
                z-index: 2;
                color: #646471;
                text-shadow: none;
            }

            &.small {
                font-size: 28px;
                min-width: 18px;
            }
        }
    }

</style>