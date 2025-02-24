<template>

    <div class="component">
        <Ai
            fill="white"
            class="ai-image"
        />
    </div>

    <div class="title m-light">Что скажешь?</div>

    <div class="texts">

        <div class="text m-light">Как тебе мой способ усвоения слов?</div>

        <div class="smyles" :class="{selected: rating}">
            <Smyle1 class="smyle m-pointer no-select" :class="{ active: ratingIs(1) }" @click="setRating(1)" />
            <Smyle2 class="smyle m-pointer no-select" :class="{ active: ratingIs(2) }" @click="setRating(2)" />
            <Smyle3 class="smyle m-pointer no-select" :class="{ active: ratingIs(3) }" @click="setRating(3)" />
            <Smyle4 class="smyle m-pointer no-select" :class="{ active: ratingIs(4) }" @click="setRating(4)" />
            <Smyle5 class="smyle m-pointer no-select" :class="{ active: ratingIs(5) }" @click="setRating(5)" />
        </div>

        <div class="button-wrapper">
            <div class="btn m-pointer no-select" :class="{gray: !rating, green: rating}" @click="send()">
                Отправить
            </div>
        </div>

    </div>

</template>

<script>

    import { inject } from 'vue';
    import Ai from '@/components/icons/Ai.vue'
    import Smyle1 from '@/components/icons/Smyle1.vue'
    import Smyle2 from '@/components/icons/Smyle2.vue'
    import Smyle3 from '@/components/icons/Smyle3.vue'
    import Smyle4 from '@/components/icons/Smyle4.vue'
    import Smyle5 from '@/components/icons/Smyle5.vue'

    export default {
        components: {
            Ai,
            Smyle1,
            Smyle2,
            Smyle3,
            Smyle4,
            Smyle5
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
                rating: null
            }
        },

        methods: {
            ratingIs(value) {
                return this.rating == value;
            },

            setRating(value) {
                this.rating = value;
            },

            async send() {
                if(!this.rating) {
                    return false;
                }

                try {
                    this.preloader.show = true;
                    await this.student.rateApp(this.rating);
                    this.$parent.changeItem(1);
                } catch(res) {
                    this.modal.show(res);
                } finally {
                    this.preloader.show = false;
                }
            }
        },

        beforeMount() {
            this.modal = inject('modal');
            this.preloader = inject('preloader');
            this.student = inject('student');
        }
    }
</script>

<style lang="scss">

    .smyles {
        display: flex;
        gap: 15px;
        justify-content: center;

        &.selected {
            .smyle {
                fill: #686870;
            }
        }

        .smyle {
            width: 40px;
            height: 40px;
            fill: #bebec1;

            &.active {
                &:nth-child(1) {
                    fill: #ff4242;
                }

                &:nth-child(2) {
                    fill: #ff8446;
                }

                &:nth-child(3) {
                    fill: #fbff49;
                }

                &:nth-child(4) {
                    fill: #abff4e;
                }

                &:nth-child(5) {
                    fill: #94f2ff;
                }
            }
        }
    }

</style>