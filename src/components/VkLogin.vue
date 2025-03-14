<template>
    
    <div ref="container"></div>

</template>

<script>
    import { inject } from 'vue';

    export default {

        data() {
            return {
            }
        },

        methods: {
            loadVkScript() {
                return new Promise((resolve, reject) => {
                    if('VKIDSDK' in window) {
                        resolve();
                        return;
                    }

                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            },

            async initVkSignIn() {
                try {
                    await this.loadVkScript();

                    const VKID = window.VKIDSDK;

                    VKID.Config.init({
                        app: import.meta.env.VITE_VK_APP_ID,
                        redirectUrl: 'https://app.speaky.ninja',
                        responseMode: VKID.ConfigResponseMode.Callback,
                        source: VKID.ConfigSource.LOWCODE,
                        scope: 'email', // Заполните нужными доступами по необходимости
                    });

                    const oneTap = new VKID.OneTap();

                    oneTap.render({
                        container: this.$refs.container,
                        scheme: 'dark',
                        showAlternativeLogin: true,
                        styles: {
                            borderRadius: 50,
                            width: 40,
                            height: 40
                        }
                    })
                    .on(VKID.WidgetEvents.ERROR, this.vkidOnError)
                    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, this.loginHandler);
                } catch(e) {
                    console.log(e);
                    // this.modal.show({message: 'Не удалось загрузить авторизацию VK'});
                }
            },

            loginHandler(payload) {
                const code = payload.code;
                const deviceId = payload.device_id;
                const VKID = window.VKIDSDK;
                VKID.Auth.exchangeCode(code, deviceId).then(this.vkidOnSuccess).catch(this.vkidOnError);
            },

            vkidOnError(error) {
                console.log(error);
                // this.modal.show({message: 'Не удалось авторизоваться через VK'});
            },

            async vkidOnSuccess(data) {
                try {
                    this.preloader.show = true;
                    await this.student.vkAuthHandler(data.access_token);
                    this.$router.push('/statistics');
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
        },

        mounted() {
            this.initVkSignIn();
        }
    }
</script>

<style lang="scss" scoped>
</style>