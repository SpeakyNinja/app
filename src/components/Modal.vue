<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div v-if="!options.hideClose" class="close no-select" @click="$emit('close')">×</div>
                <div class="modal-header">
                    {{ options.header }}
                </div>

                <slot name="body">
                    <div class="modal-body mt-3">
                        {{ options.body }}
                    </div>
                </slot>

                <slot name="footer">
                    <div class="modal-footer mt-3">
                            <button 
                                class="btn mr-2" 
                                :class="getActionButtonCssClass()" 
                                v-if="options.action" 
                                @click="options.action()">
                                {{ options.actionButtonText }}
                            </button>

                            <button 
                                v-if="!options.hideCloseInFooter"
                                class="btn" 
                                :class="getCancelButtonCssClass()" 
                                @click="$emit('close')">
                                {{ options.cancelButtonText || 'Закрыть' }}
                            </button>
                    </div>
                </slot>
            </div>
        </div>
    </Transition>
</template>

<script>
    export default {
        props: {
            show: Boolean,
            options: Object
        },

        emits: ['close'],

        methods: {
            getActionButtonCssClass() {
                return this.options.actionButtonClass ? this.options.actionButtonClass : '';
            },

            getCancelButtonCssClass() {
                return this.options.cancelButtonClass ? this.options.cancelButtonClass : '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';
    
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease;

        display: flex;
        justify-content: center;
        align-items: center;

        .modal-container {
            min-width: 460px;
            margin: 0px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
            position: relative;
            text-align: center;
            border-radius: 10px;

            .close {
                position: absolute;
                top: 0;
                right: 10px;
                font-size: 34px;
                cursor: pointer;
                line-height: 0.5;
                color: black;
                font-family: RobotoLight;
                line-height: 1;
            }
        }

        .modal-header {
            margin-top: 0;
            font-family: RobotoBold;
            font-size: 20px;
        }

        .modal-body {
            font-size: 18px;
            font-family: Roboto;
        }

        &.modal-enter-from, &.modal-leave-to {
            opacity: 0;

            .modal-container {
                -webkit-transform: scale(1.1);
                transform: scale(1.1);
            }
        }

        .modal-footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
    }

    @media(max-width: 500px) {
        .modal-mask {

            .modal-container {
                width: 90%;
                min-width: 90%;
                max-width: 90%;
            }
        }
    }
</style>