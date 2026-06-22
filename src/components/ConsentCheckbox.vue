<template>
    <label class="consent-checkbox" :class="{ error: showError && !modelValue }">
        <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
        <span class="consent-checkbox__text">
            Я принимаю
            <router-link to="/privacy" class="consent-checkbox__link">политику обработки персональных данных</router-link>
            и
            <a href="https://speaky.ninja/agreement" target="_blank" rel="noopener" class="consent-checkbox__link">пользовательское соглашение</a>
        </span>
    </label>
    <div v-if="showError && !modelValue" class="consent-checkbox__error">Необходимо принять условия</div>
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: Boolean,
                default: false,
            },
            showError: {
                type: Boolean,
                default: false,
            },
        },

        emits: ['update:modelValue'],
    };
</script>

<style lang="scss" scoped>
    .consent-checkbox {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        cursor: pointer;
        color: #ebebed;
        font-size: 14px;
        line-height: 1.4;

        input {
            margin-top: 3px;
            flex-shrink: 0;
        }

        &__link {
            color: #7dd3fc;
            text-decoration: underline;
        }

        &.error {
            color: #ffb4b4;
        }

        &__error {
            margin-top: 8px;
            color: #ff6b6b;
            font-size: 14px;
        }
    }
</style>
