<template>

    <Type1>
        <template v-slot:top>
            <Rainbow />
        </template>

        <template v-slot:center>
            <div class="m-light m-size32 m-center">Легко</div>
        </template>

        <template v-slot:bottom>
            <div class="m-light m-center">Слова английского будут запоминаться сами</div>

            <div class="m-light m-center muted">как слова родного языка</div>
        </template>
    </Type1>

</template>

<script>
    import { nextTick } from 'vue';
    import Type1 from "@/components/notices/Type1.vue";
    import Rainbow from '@/components/Rainbow.vue';

    export default {
        components: {
            Rainbow,
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