<template>

    <Type1>
        <template v-slot:top>
            <img :src="heatMap">
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Наглядно</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">
                Видимый прогресс после каждой тренировки
            </div>
        </template>
    </Type1>

</template>

<script>
    import { nextTick } from 'vue';
    import Type1 from "@/components/notices/Type1.vue";

    export default {
        components: {
            Type1
        },

        data() {
            return {
                heatMap: new URL('@/images/HeatMap.svg', import.meta.url).href
            };
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
</style>