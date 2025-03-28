<template>
    <div class="rainbow no-select">
        
        <button class="btn" :class="{freeze: freeze, hidden: isSafari}"></button>

        <div class="safari" :class="{hidden: !isSafari}"></div>

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
            const ua = navigator.userAgent.toLowerCase();
            const vendor = navigator.vendor;
            const isSafari = vendor && vendor.toLowerCase().includes('apple') &&
                   ua.includes('safari') &&
                   !ua.includes('chrome') &&
                   !ua.includes('crios') &&
                   !ua.includes('fxios') &&
                   !ua.includes('edgios');

            return {
                isSafari: isSafari
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

        .safari {
            display: block;
            width: 130px;
            height: 130px;
            margin: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(0deg, #fffb00, #48ff00);

            &:before {
                content: '';
                width: 116px;
                height: 116px;
                border-radius: 50%;
                background-color: #272733;
            }

            &.hidden {
                display: none;
            }
        }

        .btn {
            margin: 40px;
            width: 130px;
            height: 130px;
            border: none;
            outline: none;
            position: relative;
            z-index: 0;
            border-radius: 50%;

            &.hidden {
                display: none;
            }
        
            &:after {
                content: "";
                z-index: -1;
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #272733;
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
                -webkit-backface-visibility: hidden;
                -webkit-transform: translate3d(0, 0, 0);
                will-change: transform, filter;
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

    }

</style>