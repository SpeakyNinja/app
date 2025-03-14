<template>

    <div id="google-login-button"></div>

</template>

<script>
    import { inject } from 'vue';

    export default {

        data() {
            return {
                googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
            }
        },

        methods: {
            loadGoogleScript() {
                return new Promise((resolve, reject) => {
                    if (window.google && window.google.accounts && window.google.accounts.id) {
                        resolve();
                        return;
                    }

                    const script = document.createElement('script');
                    script.src = 'https://accounts.google.com/gsi/client';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            },

            async initGoogleSignIn() {
                try {
                    await this.loadGoogleScript();

                    window.google.accounts.id.initialize({
                        client_id: this.googleClientId,
                        callback: this.handleCredentialResponse
                    });

                    window.google.accounts.id.renderButton(
                        document.getElementById('google-login-button'),
                        { theme: 'outline', size: 'large', type: 'icon', shape: 'circle' }
                    );
                } catch(e) {
                    console.log(e);
                    this.modal.show({message: 'Не удалось загрузить авторизацию google'});
                }
            },

            async handleCredentialResponse(response) {

                try {
                    this.preloader.show = true;
                    await this.student.googleAuthHandler(response.credential);
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
            this.initGoogleSignIn();
        }
    }
</script>

<style lang="scss">
</style>