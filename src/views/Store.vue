<template>
    <div class="store main-bg no-select" v-if="isReady">
        
        <TopBar title="Магазин" />

        <div class="content no-scrollbar">
            <div class="promo-bar" v-if="storeService.items?.length">
                <input
                    v-model.trim="promoCode"
                    type="text"
                    class="promo-input"
                    placeholder="Промокод"
                    autocomplete="off"
                    @keydown.enter.prevent
                />
                <button type="button" class="promo-apply" :disabled="promoBusy" @click="previewPromo">
                    {{ promoBusy ? '…' : 'Применить' }}
                </button>
                <div v-if="promoHint" class="promo-hint" :class="{ error: promoError }">{{ promoHint }}</div>
            </div>

            <div
                class="campaign-banner"
                v-for="c in bannerCampaigns"
                :key="'c-' + c.id"
            >
                {{ c.config?.badge_text || c.name }}
                <span v-if="c.description"> — {{ c.description }}</span>
            </div>
            
            <div class="lot" v-for="item in storeService.items" :key="item.id">
                <template v-if="storeService.isNeuronPack(item)">
                    <div class="neurons">{{ storeService.formattedNum(item, 'qty') }}</div>
                    <div class="subtitle">{{ storeService.getTitle(item) }}</div>
                </template>
                <template v-else>
                    <div class="neurons module-title">{{ storeService.getTitle(item) }}</div>
                    <div class="subtitle" v-if="item.description">{{ item.description }}</div>
                    <div class="subtitle" v-else-if="item.period_days">{{ item.period_days }} дней</div>
                    <div class="subtitle" v-else>{{ productTypeLabel(item) }}</div>
                </template>
                <div class="discount" v-if="item.discount_text || item.campaign_badge">
                    <div class="bckg-wrapper"><img :src="getBckg(item)"></div>
                    {{ item.campaign_badge || item.discount_text }}
                </div>
                <div class="price">{{ storeService.formattedNum(item, 'price') }}</div>
                <div class="price_discounted">{{ displayPrice(item) }} р</div>
                <div
                    class="subtitle mb-1"
                    v-if="storeService.isNeuronPack(item) && item.training_cost"
                >
                    Тренировка = {{ trainingCostFormat(item.training_cost) }} р
                </div>
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
                promoCode: '',
                promoBusy: false,
                promoHint: '',
                promoError: false,
                promoPreview: null,
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

        computed: {
            bannerCampaigns() {
                return (this.storeService?.campaigns || []).filter((c) => c.type === 'banner');
            },
        },

        methods: {
            getBckg(item) {
                const key = `p${this.storeService.getDiscount(item)}`;
                return this[key];
            },

            displayPrice(item) {
                const amount = this.promoPreview?.pricing?.amount;
                if (
                    amount != null
                    && this.promoAppliesTo(item)
                    && ['percent', 'fixed'].includes(this.promoPreview?.promo?.reward_type)
                ) {
                    return new Intl.NumberFormat().format(amount);
                }
                return this.storeService.formattedNum(item, 'price_discounted');
            },

            promoAppliesTo() {
                return !!this.promoPreview?.success;
            },

            async previewPromo() {
                this.promoHint = '';
                this.promoError = false;
                this.promoPreview = null;
                if (!this.promoCode) {
                    this.promoHint = 'Введите промокод';
                    this.promoError = true;
                    return;
                }
                this.promoBusy = true;
                try {
                    const firstItem = this.storeService.items?.[0];
                    const r = await this.storeService.request('/promo/preview', {
                        promo_code: this.promoCode,
                        store_item_id: firstItem?.id || 0,
                    });
                    this.promoPreview = r;
                    const type = r.promo?.reward_type;
                    if (type === 'percent') {
                        this.promoHint = `Скидка ${r.promo.reward_value}%`;
                    } else if (type === 'fixed') {
                        this.promoHint = `Скидка ${r.promo.reward_value} ₽`;
                    } else if (type === 'neurons') {
                        this.promoHint = `Бонус ${r.pricing?.bonus_neurons || r.promo.reward_value || 0} нейронов`;
                    } else {
                        this.promoHint = 'Промокод применён';
                    }
                } catch (res) {
                    this.promoHint = res?.message || 'Не удалось проверить промокод';
                    this.promoError = true;
                } finally {
                    this.promoBusy = false;
                }
            },

            async buy(item) {
                if(this.student.isAutoReg()) {
                    this.$router.push('/link-email');
                    return false;
                }

                try {
                    this.preloader.show = true;

                    await this.yk.createPayment(item.id, this.promoCode || null);
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
            },

            productTypeLabel(item) {
                const map = {
                    module: 'Модуль',
                    subscription: 'Подписка',
                    bundle: 'Бандл',
                };
                return map[item.product_type] || 'Оффер';
            },
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');
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
        },

        beforeUnmount() {
            this.yk?.cancelWait();
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
            width: 100%;
            height: 100%;
            position: relative;

            .promo-bar {
                width: 80%;
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 8px;
                align-items: center;

                .promo-input {
                    width: 100%;
                    border: 1px solid #54546f;
                    border-radius: 12px;
                    background: #3d3d52;
                    color: #fff;
                    padding: 12px 14px;
                    font-size: 15px;
                    outline: none;
                    text-transform: uppercase;
                }

                .promo-apply {
                    border: 0;
                    border-radius: 12px;
                    background: #5cb85c;
                    color: #fff;
                    padding: 12px 14px;
                    font-size: 14px;
                    cursor: pointer;

                    &:disabled {
                        opacity: 0.6;
                    }
                }

                .promo-hint {
                    grid-column: 1 / -1;
                    font-size: 13px;
                    color: #9e9ea8;

                    &.error {
                        color: #f07178;
                    }
                }
            }

            .campaign-banner {
                width: 80%;
                text-align: center;
                padding: 12px 16px;
                border-radius: 14px;
                background: linear-gradient(135deg, #4a4a66, #3d3d52);
                border: 1px solid #6a6a88;
                color: #e8e8f0;
                font-size: 14px;
                line-height: 1.35;
            }

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
                    text-align: center;

                    &.module-title {
                        font-size: 26px;
                        line-height: 1.2;
                        max-width: 100%;
                    }
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