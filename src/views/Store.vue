<template>
    <div class="store main-bg no-select" v-if="isReady">
        <div class="top glass">
            <router-link to="/statistics" class="back-button">
                <IcoArrow height="18" fill="#ebebed" />
            </router-link>

            <div class="title">Магазин</div>
        </div>

        <div class="content no-scrollbar">
            <div class="lot">
                <div class="neurons">125 000</div>
                <div class="subtitle">нейронов</div>
                <div class="discont">-0%</div>
                <div class="sum">249 р.</div>
                <div class="btn green">Купить</div>
            </div>

            <div class="lot">
                <div class="neurons">250 000</div>
                <div class="subtitle">нейронов</div>
                <div class="discont">-10%</div>
                <div class="sum">449 р.</div>
                <div class="btn green">Купить</div>
            </div>
        </div>
         
    </div>

</template>

<script>
    import { inject } from 'vue';
    import { nextTick } from "vue";
    import IcoArrow from '@/components/icons/IcoArrow.vue';

    export default {

        components: {
            IcoArrow
        },

        data() {
            return {
                isReady: false
            }
        },

        methods: {
            
        },

        beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.isReady = true;
        }
    }
</script>

<style lang="scss" scoped>

    .store {
        flex-grow: 2;
        width: 100%;
        height: 100%;
        position: relative;

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #4c4d57;
            height: 80px;
            padding: 0 50px 0 20px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .title {
                z-index: 1;
                color: white;
                flex-grow: 2;
                display: flex;
                justify-content: center;
                font-size: 20px;
            }

            .back-button {
                z-index: 1;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                border: 1px solid #4c4d57;
                box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
            }
        }

        .content {
            display: flex;
            flex-direction: column;
            padding: 90px 20px 10px 20px;
            gap: 40px;
            overflow-y: auto;
            height: 100%;

            .lot {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                background-color: #3d3d52;
                border: 1px solid #54546f;
                border-radius: 20px;
                padding: 50px 32px 27px 32px;

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

                .discont {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 2px solid #54546f;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 50px;
                    font-family: RobotoLight;
                    font-size: 24px;
                    line-height: 1;
                    color: #9e9ea8;
                }

                .sum {
                    margin-top: 36px;
                    margin-bottom: 20px;
                    font-size: 32px;
                    font-family: RobotoLight;
                    color: white;
                }
            }
        }

    }

</style>