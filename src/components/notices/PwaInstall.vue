<template>

    <div class="component">
        <Ai fill="white" class="ai-image" />
    </div>

    <div class="title m-light">Установить приложение?</div>

    <div class="texts">
        
        <div class="text m-light">
            Чтобы запускать через иконку на рабочем столе.
        </div>
        
        <div class="button-wrapper">
            <div class="btn green" @click="installPwa()">Установить</div>
            <div class="btn transparent" @click="$parent.changeItem(1)">нет, не надо</div>
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue';
    import PwaInstallService from '@/services/PwaInstallService.js';

    export default {
        components: {
            Ai
        },

        props: {
            options: {
                type: Object,
                required: false,
                default: {}
            }
        },

        data() {
            return {
            }
        },

        methods: {
            async installPwa() {
                try {
                    this.preloader.show = true;
                    const choiceResult = await PwaInstallService.install();
                    this.$parent.changeItem(1);
                } catch(error) {
                    this.modal.show({message: 'Ошибка при попытке установки PWA'});
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
        }
    }
</script>

<style lang="scss" scoped>

    .btn.transparent {
        background-color: transparent;
    }

</style>