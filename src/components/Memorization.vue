<template>
    <RoundProgress 
        :options="{progress: map[this.mem]?.progress}"
        :radius="radius"
        :strokeWidth="strokeWidth"
        :stroke="map[this.mem]?.stroke"
        :filledStroke="map[this.mem]?.filledStroke"
    />
</template>

<script>
    import RoundProgress from '@/components/RoundProgress.vue'

    export default {
        components: {
            RoundProgress
        },

        props: {
            mem: {
                type: Number,
                required: true
            },
            radius: {
                type: Number,
                required: false,
                default: 18
            },
            strokeWidth: {
                type: Number,
                required: false,
                default: 3
            },
            maxLevel: {
                type: Number,
                required: false,
                default: 12
            }
        },

        data() {
            return {
                map: {
                    0: {stroke: '#674848', filledStroke: '#fa3d3d', progress: 0},
                    1: {stroke: '#674848', filledStroke: '#fa3d3d', progress: 33},
                    2: {stroke: '#674848', filledStroke: '#fa3d3d', progress: 66},
                    3: {stroke: '#674848', filledStroke: '#fa3d3d', progress: 100},
                    4: {stroke: '#646748', filledStroke: '#eafa3d', progress: 25},
                    5: {stroke: '#646748', filledStroke: '#eafa3d', progress: 50},
                    6: {stroke: '#646748', filledStroke: '#eafa3d', progress: 75},
                    7: {stroke: '#646748', filledStroke: '#eafa3d', progress: 100},
                    8: {stroke: '#4e6748', filledStroke: '#76fa3d', progress: 20},
                    9: {stroke: '#4e6748', filledStroke: '#76fa3d', progress: 40},
                    10: {stroke: '#4e6748', filledStroke: '#76fa3d', progress: 60},
                    11: {stroke: '#4e6748', filledStroke: '#76fa3d', progress: 80},
                    12: {stroke: '#4e6748', filledStroke: '#76fa3d', progress: 100},
                    13: {stroke: '#34505f', filledStroke: '#3db8fa', progress: 100}
                }
            }
        },

        methods: {
            
        },

        beforeMount() {
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';


</style>