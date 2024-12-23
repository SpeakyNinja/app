<template>
    
    <div class="pult" v-if="curIndex < layers.length - 1">
        <Arrows 
            fill="white" 
            class="m-pointer"
            :class="{'muted-button': curIndex == 0}"
            @click="$emit('toggle', -1)" 
        />

        <div class="text">{{ layers[curIndex].title }}</div>
        
        <Arrows fill="white" class="m-flip-horizontal m-pointer" @click="$emit('toggle', 1)" />

        <div class="big-buttons">
            <div @click="$emit('toggle', -1)"></div>
            <div @click="$emit('toggle', 1)"></div>
        </div>
    </div>

</template>

<script>
    import Arrows from '@/components/icons/Arrows.vue';

    export default {
        components: {
            Arrows,
        },

        emits: ['toggle'],

        props: {
            layers: {
                type: Array,
                required: true
            },
            curIndex: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
            }
        },

        methods: {
        },

        mounted() {
        }
    }
</script>

<style lang="scss" scoped>

    .pult {
        position: fixed;
        bottom: 0;
        left: -10%;
        width: 120%;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 100;
        color: white;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        border-top-left-radius: 100%;
        border-top-right-radius: 100%;
        border-top: 1px solid #7a7a7d;
        font-family: RobotoLight;
        padding: 0 20%;
        overflow: hidden;

        .text {
            margin-bottom: 20px;
            flex-grow: 2;
            text-align: center;
        }

        .big-buttons {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 0;
            left: 0;

            div {
                width: 40%;
                height: 100%;
            }
        }

        .muted-button {
            opacity: 0.2;
        }
    }

</style>