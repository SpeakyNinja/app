<template>
    <div class="store main-bg no-select" v-if="isReady">
        
        <TopBar title="Магазин" />

        <div class="content no-scrollbar">
            
            <div class="lot" v-for="item in storeService.items">
                <div class="neurons">{{ storeService.formattedNum(item, 'qty') }}</div>
                <div class="subtitle">{{ storeService.getTitle(item) }}</div>
                <div class="discount">
                    <div class="bckg-wrapper"><img :src="getBckg(item)"></div>
                    {{ item.discount_text }}
                </div>
                <div class="price">{{ storeService.formattedNum(item, 'price') }}</div>
                <div class="price_discounted">{{ storeService.formattedNum(item, 'price_discounted') }} р</div>
                <div class="subtitle mb-1">Тренировка = {{ trainingCostFormat(item.training_cost) }} р</div>
                <div class="btn green" @click="buy(item)">Купить</div>
            </div>

        </div>
         
        <div id="payment-form" :class="{'m-hidden': !showPaymentForm}"></div>
    </div>


</template>

<script>
    import { inject } from 'vue';
    import { nextTick } from "vue";
    import TopBar from '@/components/TopBar.vue';
    import StoreService from '@/services/StoreService.js';
    import YookassaService from '@/services/YookassaService.js';

    export default {

        components: {
            TopBar
        },

        data() {
            return {
                isReady: false,
                showPaymentForm: false,
                p0: new URL(`@/images/0.svg`, import.meta.url).href,
                p10: new URL(`@/images/10.svg`, import.meta.url).href,
                p20: new URL(`@/images/20.svg`, import.meta.url).href,
                p30: new URL(`@/images/30.svg`, import.meta.url).href,
                p40: new URL(`@/images/40.svg`, import.meta.url).href,
                p50: new URL(`@/images/50.svg`, import.meta.url).href,
                p60: new URL(`@/images/60.svg`, import.meta.url).href,
                p70: new URL(`@/images/70.svg`, import.meta.url).href,
                p75: new URL(`@/images/75.svg`, import.meta.url).href,
                p80: new URL(`@/images/80.svg`, import.meta.url).href
            }
        },

        methods: {
            getBckg(item) {
                const key = `p${this.storeService.getDiscount(item)}`;
                return this[key];
            },

            async buy(item) {
                try {
                    this.preloader.show = true;

                    await this.yk.createPayment(item.id);
                    await this.yk.waitForScript();
                    
                    this.preloader.show = false;
                    this.showPaymentForm = true;
                    await this.yk.showWidget('payment-form');

                    await this.yk.confirmPayment();
                    
                    if(this.yk.isSucceeded()) {
                        this.showPaymentForm = false;
                        this.$router.push('/statistics');
                    } else {
                        this.modal.show({message: 'Платеж не был подтвержден'});
                    }

                } catch(res) {
                    this.showPaymentForm = false;
                    this.preloader.show = false;
                    this.modal.show(res);
                }
            },

            trainingCostFormat(value) {
                return ('' + (value * 1)).replace('.', ',');
            }
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.storeService = new StoreService();
            this.yk = new YookassaService();

            try {
                this.preloader.show = true;
                await this.storeService.fetch();
                this.$forceUpdate();
            } catch(res) {
                this.modal.show(res);
            } finally {
                this.yk.loadWidget();
                this.preloader.show = false;
                this.isReady = true;
            }
        }
    }
</script>

<style lang="scss" scoped>

    #payment-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #30313f;
        z-index: 2;
    }

    .store {
        flex-grow: 2;
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #252631!important;

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 90px 20px 10px 20px;
            gap: 40px;
            overflow-y: auto;
            height: 100%;
            position: relative;

            .lot {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                background-color: #3d3d52;
                border: 1px solid #54546f;
                border-radius: 20px;
                padding: 50px 32px 27px 32px;
                width: 80%;

                .neurons {
                    font-family: RobotoBlack;
                    font-size: 36px;
                    color: white;
                    line-height: 1;
                }

                .subtitle {
                    font-size: 14px;
                    font-family: Light;
                    color: #9e9ea8;
                }

                .discount {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    // border: 2px solid #54546f;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 50px;
                    font-family: RobotoLight;
                    font-size: 24px;
                    line-height: 1;
                    color: #9e9ea8;
                    position: relative;

                    .bckg-wrapper {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .price {
                    margin-top: 36px;
                    font-size: 22px;
                    font-family: RobotoLight;
                    color: #9e9ea8;
                    position: relative;

                    &:before {
                        content: "";
                        border-bottom: 1px solid #9e9ea8;
                        position: absolute;
                        width: 110%;
                        height: 50%;
                        transform: rotate(-12deg);
                        margin-left: -7%;
                    }
                }

                .price_discounted {
                    margin-bottom: 15px;
                    font-size: 32px;
                    font-family: RobotoLight;
                    color: white;
                }
            }
        }

    }

</style>