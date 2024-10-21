<template>
    <RoundProgress 
        :options="options"
        :radius="radius"
        :strokeWidth="strokeWidth"
        :filledStroke="getFilledStroke()"
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
                options: {progress: this.getProgress()},
            }
        },

        methods: {
            getFilledStroke() {
                let color = '#fa3d3d';

                if(this.mem > 10) {
                    color = '#3db8fa'
                } else if(this.mem > 6) {
                    color = '#76fa3d'
                } else if(this.mem > 2) {
                    color = '#eafa3d'
                }

                return color;
            },

            getProgress() {
                const level = this.mem + 1;
                return Math.round(level * 100 / this.maxLevel);
            }
        },

        beforeMount() {
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';


</style>