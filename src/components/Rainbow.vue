<template>
    <div class="rainbow">
        
        <button class="btn" :class="{freeze: freeze}"></button>

    </div>
</template>

<script>

    export default {

        props: {
            freeze: {
                type: Boolean,
                required: false,
                default: false
            }
        },


        data() {
            return {
            }
        },

        methods: {
            
        }
    }
</script>

<style lang="scss">

    .rainbow {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .btn {
            margin: 40px;
            width: 130px;
            height: 130px;
            border: none;
            outline: none;
            position: relative;
            z-index: 0;
            border-radius: 50%;
        
            &:after {
                content: "";
                z-index: -1;
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #393951;
                left: 0;
                top: 0;
                border-radius: 50%;
            }

            &:before {
                content: "";
                background: linear-gradient(
                    45deg,
                    #ff0000, #ff7300, #fffb00, #48ff00,
                    #00ffd5, #002bff, #ff00c8, #ff0000
                );
                position: absolute;
                top: -4px;
                left: -4px;
                background-size: 600%;
                z-index: -1;
                width: calc(100% + 8px);
                height:  calc(100% + 8px);
                filter: blur(8px);
                animation: glowing 20s linear infinite;
                transition: opacity .3s ease-in-out;
                border-radius: 50%;
            }

            &.freeze {
                &:before {
                    animation-play-state: paused;
                }
            }
        }

        @keyframes glowing {
            0% {background-position: 0 0;}
            50% {background-position: 400% 0;}
            100% {background-position: 0 0;}
        }

        .btn:active:after {
            background: transparent;
        }

        .btn:active {
            color: #000;
            font-weight: bold;
        }

    }

</style>