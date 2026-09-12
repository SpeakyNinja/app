<template>
    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">вход</div>
        </template>

        <template v-slot:content>
            <div class="content mt-1">
                <template v-if="loading">
                    <div class="m-light ml-1 mb-1 m-size20 m-white m-center">Проверяем ссылку...</div>
                </template>

                <template v-else-if="error">
                    <div class="m-red m-center">{{ error }}</div>
                    <div class="btn green mt-2" @click="$router.push('/login')">Запросить новую ссылку</div>
                </template>
            </div>
        </template>

    </Form>
</template>

<script>
    import { inject } from 'vue';
    import Form from '@/components/Form.vue';
    import YandexMetrika from '@/services/YandexMetrika.js';

    export default {
        components: {
            Form,
        },

        data() {
            return {
                loading: true,
                error: '',
            };
        },

        methods: {
            async verify() {
                try {
                    this.preloader.show = true;
                    await this.student.verifyMagicLink(this.$route.params.token);
                    if (this._unmounted) {
                        return;
                    }
                    YandexMetrika.sendUserParams(this.student.getId());
                    const route = await this.student.resolvePostLoginRoute();
                    this.$router.replace(route);
                } catch (res) {
                    if (this._unmounted) {
                        return;
                    }
                    this.error = res.message || 'Ссылка не найдена или устарела';
                    this.loading = false;
                } finally {
                    if (!this._unmounted) {
                        this.preloader.show = false;
                    }
                }
            },
        },

        beforeMount() {
            this.preloader = inject('preloader');
            this.student = inject('student');
            this.verify();
        },

        beforeUnmount() {
            this._unmounted = true;
        },
    };
</script>
