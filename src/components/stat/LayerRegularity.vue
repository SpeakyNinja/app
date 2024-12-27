<template>
    <div class="layer-regularity">
        
        <div class="top glass">
            <div class="days accuracy-1">{{ statService.getNonstopDays() }}</div>
            <div class="accuracy-small-1">
                {{ tools.plural(statService.getNonstopDays(), ['День', 'Дня', 'Дней']) }} подряд!
            </div>
        </div>
        
        <div class="middle">
            <RegularityWidget :statService="statService" />
        </div>

        <div class="bottom glass">
            <div class="">Ты входишь в топ {{ getPercentRegularity() }}% по&nbsp;регулярности занятий</div>
        </div>
         
    </div>
</template>

<script>
    import RegularityWidget from '@/components/RegularityWidget.vue'
    import StatService from '@/services/StatService.js';
    import ToolsService from '@/services/ToolsService.js';

    export default {

        components: {
            RegularityWidget
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
            },

            getPercentRegularity() {
                const max = this.statService.getTotalMaxnonstopDays();
                const percentRegularity = max ? Math.round(this.statService.getNonstopDays() * 100 / max) : 100;
                return percentRegularity > 100 ? 100 : percentRegularity;
            }
        },

        beforeMount() {
            this.tools = new ToolsService();
        }
    }
</script>

<style lang="scss" scoped>

    .layer-regularity {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        .top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #4c4d57;
            height: 200px;

            .days {
                font-size: 68px;
                font-family: RobotoBlack;
            }

            div {
                color: white;
                z-index: 2;
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
            height: 200px;
            padding: 0 20px 70px 20px;

            div {
                z-index: 2;
                text-align: center;
                color: white;
                font-family: Light;
            }
        }
    }

</style>