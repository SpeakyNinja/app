<template>
    <div class="options main-bg" v-if="isReady">
        
        <router-link to="/training">Тренировка</router-link>
        
    </div>
</template>

<script>
    import { inject } from 'vue';

    export default {

        components: {
        },

        data() {
            return {
                isReady: false
            }
        },

        methods: {
            
        },

        async beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');
            this.isReady = true;
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .options {
        
    }

</style>