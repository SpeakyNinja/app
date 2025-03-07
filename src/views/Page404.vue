<template>
    <Form class="main-bg">

        <template v-slot:description>
            <div class="m-light m-gray mt-1">404</div>
        </template>

        <template v-slot:content>

            <div class="content mt-5">
                <div>
                    <div class="m-center m-white m-size30 m-light">
                        Страница не&nbsp;существует или&nbsp;была удалена
                    </div>
                </div>

                <router-link :to="link" class="btn green">Ок</router-link>
            </div>


        </template>

    </Form>

</template>

<script>
    import { inject } from 'vue';
    import Form from "@/components/Form.vue";

    export default {

        components: {
            Form
        },

        data() {
            return {
                link: '/statistics'
            }
        },

        methods: {
        },

        beforeMount() {
            this.student = inject('student');
            if(this.student.isGuest()) {
                this.link = '/';
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>