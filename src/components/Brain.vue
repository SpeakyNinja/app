<template>
    <div class="brain">
        <canvas width="368" height="316" ref="canvas"></canvas>
    </div>
</template>

<script>
    import Brain from '@/services/Brain.js';

    export default {
        name: "Brain",

        components: {
        },

        data() {
            return {
            }
        },

        methods: {
            init() {
                this.hexRadius = 18;
                this.ctx = this.$refs.canvas.getContext('2d');
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.fillStyle = 'white';
                this.drawBackground(this.brainService.getHexagons());
                this.drawHexagons(this.brainService.getHexagons());
            },

            drawHexagons(hexagons) {
                hexagons.forEach((row, y) => {
                    row.forEach((item, x) => {
                        const position = this.getPosition(x, y);
                        this.drawHexagon(item.fillColor, item.outlineColor, position);
                    });
                });
            },

            getPosition(col, row) {
                const hexRadius = this.hexRadius;
                const hexHeight = Math.sqrt(3) * hexRadius;
                const hexWidth = 2 * hexRadius;
                const side = 2 * hexRadius / Math.sqrt(3) - 2;

                const xOffset = (row % 2 === 0) ? 1 : (hexWidth + side) / 2 + 1;

                const xPos = col * (hexWidth + side) + xOffset + hexRadius;
                const yPos = row * (hexHeight * 0.5) + hexRadius;

                return { x: xPos, y: yPos };
            },

            drawHexagon(fillColor, outlineColor, position) {
                const { x, y } = position;
                
                this.ctx.beginPath();

                for(let i = 0; i < 6; i++) {
                    const angle = Math.PI / 3 * i;
                    const vertexX = x + this.hexRadius * Math.cos(angle);
                    const vertexY = y + this.hexRadius * Math.sin(angle);

                    if(i === 0) {
                        this.ctx.moveTo(vertexX, vertexY);
                    } else {
                        this.ctx.lineTo(vertexX, vertexY);
                    }
                }

                this.ctx.closePath();

                this.ctx.fillStyle = fillColor;
                this.ctx.fill();

                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = outlineColor;
                this.ctx.stroke();
            },

            drawBackground(hexagons) {
                hexagons.forEach((row, y) => {
                    row.forEach((item, x) => {
                        const position = this.getPosition(x, y);
                        this.drawOutlineHexagon(this.brainService.baseColor, position, item.sides);
                    });
                });
            },

            drawOutlineHexagon(outlineColor, position, sides = []) {
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = outlineColor;

                const sideVertexMap = {
                    0: {n1: 0, n2: 1},
                    1: {n1: 1, n2: 2},
                    2: {n1: 2, n2: 3},
                    3: {n1: 3, n2: 4},
                    4: {n1: 4, n2: 5},
                    5: {n1: 5, n2: 0}
                };

                sides.forEach(side => {
                    const { n1, n2 } = sideVertexMap[side];
                    this.ctx.beginPath();
                    let pos = this.getVertex(position, n1);
                    this.ctx.moveTo(pos.x, pos.y);
                    pos = this.getVertex(position, n2);
                    this.ctx.lineTo(pos.x, pos.y);
                    this.ctx.stroke();
                });
            },

            getVertex(hexPosition, n) {
                const { x, y } = hexPosition;
                const angle = Math.PI / 3 * n;
                const vertexX = x + this.hexRadius * Math.cos(angle);
                const vertexY = y + this.hexRadius * Math.sin(angle);
                return {x: vertexX, y: vertexY};
            },

            addWord(status) {
                const success = this.brainService.addWord(status);
                this.refresh();
                return success;
            },

            refresh() {
                this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
                this.drawBackground(this.brainService.getHexagons());
                this.drawHexagons(this.brainService.getHexagons());
            }
        },

        mounted() {
            this.brainService = new Brain();
            this.init();
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/global.scss';

    .brain {
        canvas {
        }
    }

</style>