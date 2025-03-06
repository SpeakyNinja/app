<template>

    <div class="password-box">

        <template v-if="passwordMasked">
            <slot name="password-input"></slot>
            
            <EyeClosed 
                fill="#19191e" 
                class="eye-closed" 
                @click="toggle()" 
            />
        </template>

        <template v-else>
            <slot name="text-input"></slot>

            <EyeOpen 
                fill="#19191e" 
                class="eye-open" 
                @click="toggle()" 
            />
        </template>

    </div>

</template>

<script>
    import EyeOpen from "@/components/icons/EyeOpen.vue";
    import EyeClosed from "@/components/icons/EyeClosed.vue";

    export default {
        components: {
            EyeOpen,
            EyeClosed
        },

        props: {
        },

        data() {
            return {
                passwordMasked: true,
            }
        },

        methods: {
            toggle() {
                this.passwordMasked = !this.passwordMasked;
            },

            getFieldType() {
                return this.passwordMasked ? 'password' : 'text';
            }
        }
    }
</script>

<style lang="scss">

    .password-box {
        display: flex;
        gap: 5px;
        align-items: center;

        background-color: white;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: 0 10px !important;

        input {
            font-size: 20px;
            outline: none;
            border: none;
            height: 70px;
            width: 210px;
            flex-grow: 2;
            background-color: transparent;

            &[type="password"] {
                padding-top: 2px;
                font-size: 30px;
            }
        }

        svg {
            cursor: pointer;

            &.eye-open {
                width: 38px;
                height: 26px;
            }

            &.eye-closed {
                width: 31px;
                height: 12px;
            }
        }
    }

</style>