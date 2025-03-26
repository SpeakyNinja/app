<template>

    <Type1>
        <template v-slot:top>
            <SpeedWidget 
                :curValue="540"
                :maxValue="750"
                backgroundColor="#464664"
                :glow="false"
                forceMainColor="#96dd47"
            />
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Быстро</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">
                Методика использует досознательные механики усвоения слов мозгом
            </div>

            <div class="m-light m-center muted">Удивляйся своим способностям</div>
        </template>
    </Type1>

</template>

<script>
    import { nextTick } from 'vue';
    import Type1 from "@/components/notices/Type1.vue";
    import SpeedWidget from '@/components/SpeedWidget.vue';

    export default {
        components: {
            SpeedWidget,
            Type1
        },

        data() {
            return {
            };
        },

        methods: {
        }
    }
</script>

<style lang="scss" scoped>
</style>