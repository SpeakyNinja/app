<template>
    <div class="cf-screen cf-garden cf-garden__conservatory">
        <div class="cf-garden__blob cf-garden__blob--a" aria-hidden="true" />
        <div class="cf-garden__blob cf-garden__blob--b" aria-hidden="true" />

        <div class="cf-garden__timer">00:11:42</div>

        <div class="cf-garden__orb-wrap">
            <div class="cf-garden__orb">
                <TalosEyes mood="listening" fill="#ecfdf5" class="ai-image" />
            </div>
        </div>

        <div class="cf-garden__lines">
            <p class="cf-garden__line">You look like you've seen a ghost.</p>
            <p class="cf-garden__line">Ты выглядишь так, будто видел призрака.</p>
        </div>

        <div class="cf-garden__answers">
            <button
                v-for="choice in choices"
                :key="choice"
                type="button"
                class="cf-garden__answer"
            >
                {{ choice }}
            </button>
        </div>
    </div>
</template>

<script>
import TalosEyes from '@/components/TalosEyes.vue';

export default {
    name: 'ConceptGardenConservatory',

    components: { TalosEyes },

    data() {
        return {
            choices: ['I have, actually.', 'What ghost?', 'Let\'s change the subject'],
        };
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/conceptFlows.scss';
</style>
