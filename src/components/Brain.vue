<template>
    <div class="brain">
        <canvas :width="width * 2" :height="height * 2" ref="canvas" :style="{width: `${width}px`, height: `${height}px`}"></canvas>
    </div>
</template>

<script>
    import Brain from '@/services/Brain.js';

    export default {
        name: "Brain",

        components: {
        },

        props: {
            width: {
                type: Number,
                required: false,
                default: window.screen.width > 550 ? 372 : 288
            },
            height: {
                type: Number,
                required: false,
                default: window.screen.width > 550 ? 316 : 246
            },
            hexRadius: {
                type: Number,
                required: false,
                default: window.screen.width > 550 ? 36 : 28
            },
            items: {
                type: Array,
                required: false,
                default: []
            },
            colorTheme: {
                type: Object,
                required: false,
                default: null,
            },
            introSequence: {
                type: Array,
                required: false,
                default: () => [],
            },
            introStaggerMs: {
                type: Number,
                required: false,
                default: 65,
            },
            centerInCanvas: {
                type: Boolean,
                default: false,
            },
            glassCells: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                contentOffset: { cx: 0, cy: 0, scale: 1 },
            }
        },

        methods: {
            computeCanvasOffset() {
                let minX = Infinity;
                let maxX = -Infinity;
                let minY = Infinity;
                let maxY = -Infinity;

                this.brainService.hexagons.forEach((row, y) => {
                    row.forEach((hex, x) => {
                        if (hex.isEmpty) {
                            return;
                        }

                        const pos = this.getPosition(x, y);
                        minX = Math.min(minX, pos.x - this.hexRadius);
                        maxX = Math.max(maxX, pos.x + this.hexRadius);
                        minY = Math.min(minY, pos.y - this.hexRadius);
                        maxY = Math.max(maxY, pos.y + this.hexRadius);
                    });
                });

                if (!Number.isFinite(minX)) {
                    return { cx: 0, cy: 0, scale: 1 };
                }

                const contentW = maxX - minX;
                const contentH = maxY - minY;
                const viewportW = this.width * 2;
                const viewportH = this.height * 2;
                const scale = Math.min(
                    1,
                    (viewportW * 0.94) / contentW,
                    (viewportH * 0.94) / contentH,
                );

                return {
                    cx: (minX + maxX) / 2,
                    cy: (minY + maxY) / 2,
                    scale,
                };
            },

            applyCanvasOffset() {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);

                if (!this.centerInCanvas) {
                    return;
                }

                const { cx, cy, scale } = this.contentOffset;
                // Canvas buffer is 2× CSS size; visible center is (width, height) in buffer coords.
                this.ctx.translate(this.width, this.height);
                this.ctx.scale(scale, scale);
                this.ctx.translate(-cx, -cy);
            },

            init() {
                this.ctx = this.$refs.canvas.getContext('2d');
                this.contentOffset = this.centerInCanvas
                    ? this.computeCanvasOffset()
                    : { cx: 0, cy: 0, scale: 1 };
                this.applyCanvasOffset();
                this.ctx.fillStyle = 'white';
                this.drawBackground(this.brainService.getHexagons());
                
                if(this.items.length) {
                    this.brainService.fillAll(this.items);
                }

                this.drawHexagons(this.brainService.getHexagons());
            },

            isFilledCell(item) {
                return item.fillColor && item.fillColor !== 'transparent';
            },

            drawHexagons(hexagons) {
                hexagons.forEach((row, y) => {
                    row.forEach((item, x) => {
                        const position = this.getPosition(row.length - 1 - x, y);
                        const useGlass = this.glassCells && this.isFilledCell(item);

                        if (useGlass) {
                            this.drawGlassHexagon(item.fillColor, position, null, item.radiusCoeff);
                            this.drawGlassOutline(item.outlineColor, position);
                        } else {
                            this.drawHexagon(item.fillColor, position, null, item.radiusCoeff);
                            this.drawOutline(item.outlineColor, position);
                        }
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

            preparePath(position, radius) {
                const { x, y } = position;
                
                this.ctx.beginPath();

                for(let i = 0; i < 6; i++) {
                    const angle = Math.PI / 3 * i;
                    const vertexX = x + radius * Math.cos(angle);
                    const vertexY = y + radius * Math.sin(angle);

                    if(i === 0) {
                        this.ctx.moveTo(vertexX, vertexY);
                    } else {
                        this.ctx.lineTo(vertexX, vertexY);
                    }
                }

                this.ctx.closePath();
            },

            drawHexagon(fillColor, position, radius = null, radiusCoeff = 1) {
                if(radius == null) {
                    radius = this.hexRadius * radiusCoeff;
                }
                
                this.preparePath(position, radius);
                this.ctx.fillStyle = fillColor;
                this.ctx.fill();
            },

            drawGlassHexagon(fillColor, position, radius = null, radiusCoeff = 1) {
                if (radius == null) {
                    radius = this.hexRadius * radiusCoeff;
                }

                const { x, y } = position;
                this.preparePath(position, radius);

                const grad = this.ctx.createLinearGradient(x, y - radius, x, y + radius * 0.92);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
                grad.addColorStop(0.38, 'rgba(255, 255, 255, 0.08)');
                grad.addColorStop(0.72, 'rgba(42, 42, 46, 0.2)');
                grad.addColorStop(1, 'rgba(18, 18, 22, 0.38)');

                this.ctx.fillStyle = grad;
                this.ctx.fill();

                this.preparePath(position, radius * 0.9);
                this.ctx.save();
                this.ctx.shadowColor = 'rgba(122, 158, 194, 0.72)';
                this.ctx.shadowBlur = 16;
                this.ctx.globalAlpha = 0.62;
                this.ctx.fillStyle = fillColor;
                this.ctx.fill();
                this.ctx.restore();
            },

            drawGlassOutline(outlineColor, position) {
                this.preparePath(position, this.hexRadius);
                this.ctx.lineWidth = 1.5;
                this.ctx.strokeStyle = outlineColor || 'rgba(255, 255, 255, 0.24)';
                this.ctx.stroke();
            },

            drawOutline(outlineColor, position) {
                this.preparePath(position, this.hexRadius);
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = outlineColor;
                this.ctx.stroke();
            },

            drawHexagonWithAnimation(fillColor, outlineColor, position, radius) {
                const useGlass = this.glassCells && fillColor && fillColor !== 'transparent';

                if (useGlass) {
                    this.drawGlassHexagon(fillColor, position, radius);
                } else {
                    this.drawHexagon(fillColor, position, radius);
                }

                if (radius == this.hexRadius) {
                    if (useGlass) {
                        this.drawGlassOutline(outlineColor, position);
                    } else {
                        this.drawOutline(outlineColor, position);
                    }
                }
                
                if(radius < this.hexRadius) {
                    setTimeout(() => {
                        this.drawHexagonWithAnimation(fillColor, outlineColor, position, radius + 1);
                    }, 5);
                }
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
                const data = this.brainService.addWord(status);
                // this.refresh();
                if(data) {
                    const position = this.getPosition(data.x, data.y);
                    const hexs = this.brainService.getHexagons();
                    const item = hexs[data.y][data.x];
                    this.drawHexagonWithAnimation(item.fillColor, item.outlineColor, position, 1);
                    // this.drawHexagon(item.fillColor, position);
                }
            },

            refresh() {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
                this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
                if (this.centerInCanvas) {
                    this.contentOffset = this.computeCanvasOffset();
                }
                this.applyCanvasOffset();
                this.drawBackground(this.brainService.getHexagons());
                this.drawHexagons(this.brainService.getHexagons());
            },

            playIntroSequence() {
                const stagger = this.introStaggerMs;
                this.introSequence.forEach((status, i) => {
                    setTimeout(() => this.addWord(status), 180 + i * stagger);
                });
            },
        },

        mounted() {
            this.brainService = new Brain(this.colorTheme || {});
            this.init();

            if (this.introSequence?.length) {
                this.$nextTick(() => this.playIntroSequence());
            }
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