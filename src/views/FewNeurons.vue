<template>
    <div class="few-neurons main-bg">
        
        <Ai class="ai-image" />

        <div class="title m-size32 m-light w350">Недостаточно нейронов</div>

        <div class="text m-light w350">Пополните запас нейронов в магазине или зайдите завтра, когда снова будут доступны бесплатные тренировки.</div>

        <div class="controls">
            <router-link to="/store" class="btn green">Пополнить</router-link>
            <router-link to="/statistics" class="btn gray">Назад</router-link>
        </div>

    </div>

    <NoticeLayer 
        :items="noticeItemsBefore" 
        @closedHandler="()=>{}" 
        v-if="noticeItemsBefore?.length" 
    />

</template>

<script>
    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue'
    import NoticeLayer from '@/components/NoticeLayer.vue'
    import NoticeService from '@/services/NoticeService.js';

    export default {

        components: {
            Ai,
            NoticeLayer
        },

        data() {
            return {
                noticeItemsBefore: []
            }
        },

        methods: {
        },

        beforeMount() {
            this.state = inject('state');
            this.noticeService = new NoticeService();

            if(!this.state.wasFewNeuronsMessage()) {
                this.state.storeFewNeuronsMessage();
                const notices = [];
                notices.push( ...this.noticeService.getItems('ratingShort') );
                this.noticeItemsBefore = notices;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .few-neurons {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        flex-grow: 2;
        padding: 120px 20px 50px 20px;
        background-color: #272733 !important;

        .title {
            text-align: center;
            margin-top: 80px;
        }

        .text {
            flex-grow: 2;
            display: flex;
            align-items: center;
            text-align: center;
        }

        .controls {
            display: flex;
            flex-direction: column;
            gap: 30px;
            width: 300px;
        }

        .w350 {
            max-width: 350px;
        }
    }

</style>