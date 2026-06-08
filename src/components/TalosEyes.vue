<template>
    <svg
        ref="svgRoot"
        class="talos-eyes"
        :viewBox="displayViewBox"
        fill="currentColor"
        :style="{ color: fill, fill }"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <g transform="translate(-23.145874,-79.958172)">
            <g class="talos-eyes__contours">
                <g
                    ref="contourSway"
                    class="talos-eyes__contours-sway"
                    :transform="renderContourSway"
                >
                    <animateTransform
                        v-if="runSmil && moodAnim.contourSwayAnimation"
                        :key="`${smilKey}-contour-sway`"
                        attributeName="transform"
                        type="translate"
                        begin="indefinite"
                        restart="always"
                        repeatCount="indefinite"
                        v-bind="moodAnim.contourSwayAnimation"
                    />
                    <g
                        ref="contourGaze"
                        class="talos-eyes__contours-gaze"
                        :transform="renderContourGaze"
                    >
                        <animateTransform
                            v-if="runSmil"
                            :key="`${smilKey}-contour`"
                            attributeName="transform"
                            type="translate"
                            begin="indefinite"
                            restart="always"
                            repeatCount="indefinite"
                            v-bind="moodAnim.contourGazeAnimation"
                        />
                        <g
                            ref="lidsTop"
                            class="talos-eyes__lids-top"
                            :transform="renderLidBiasTop"
                        >
                            <g
                                ref="lidTopMotion"
                                class="talos-eyes__lids-top-motion"
                                :transform="renderLidTopMotion"
                            >
                                <animateTransform
                                    v-if="runSmil && moodAnim.lidTopAnimation"
                                    :key="`${smilKey}-lid-top`"
                                    attributeName="transform"
                                    type="translate"
                                    begin="indefinite"
                                    restart="always"
                                    repeatCount="indefinite"
                                    v-bind="moodAnim.lidTopAnimation"
                                />
                                <g
                                    ref="lidTopBlink"
                                    class="talos-eyes__lids-top-blink"
                                    :transform="renderLidTopBlink"
                                >
                                    <animateTransform
                                        v-if="runSmil"
                                        :key="`${smilKey}-blink-top`"
                                        attributeName="transform"
                                        type="translate"
                                        begin="indefinite"
                                        restart="always"
                                        repeatCount="indefinite"
                                        v-bind="moodAnim.blinkLidTop"
                                    />
                                    <g
                                        ref="browRight"
                                        class="talos-eyes__brow talos-eyes__brow--right"
                                        :transform="renderBrowRight"
                                    >
                                        <path
                                            id="top-right"
                                            d="m 47.422135,79.958819 c -2.250885,0.0098 -4.700853,0.136927 -7.282613,0.673476 l 0.06594,0.27397 c 5.529753,-0.732646 7.54317,-0.649874 9.388703,-0.646294 l 0.01004,-0.282715 c -0.703567,-0.01198 -1.431769,-0.02171 -2.182065,-0.01844 z"
                                        />
                                    </g>
                                    <g
                                        ref="browLeft"
                                        class="talos-eyes__brow talos-eyes__brow--left"
                                        :transform="renderBrowLeft"
                                    >
                                        <path
                                            id="top-left"
                                            d="m 25.32794,79.958819 c -0.750296,-0.0033 -1.478499,0.0065 -2.182066,0.01844 l 0.01003,0.282715 c 1.84554,-0.0036 3.858952,-0.08635 9.388705,0.646294 l 0.06594,-0.27397 C 30.028793,80.095746 27.578825,79.968639 25.32794,79.958819 Z"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                        <g
                            ref="lidsMid"
                            class="talos-eyes__lids-mid"
                            :transform="renderLidBiasMid"
                        >
                            <g ref="lidMidBlink" :transform="renderLidMidBlink">
                                <animateTransform
                                    v-if="runSmil"
                                    :key="`${smilKey}-blink-mid`"
                                    attributeName="transform"
                                    type="translate"
                                    begin="indefinite"
                                    restart="always"
                                    repeatCount="indefinite"
                                    v-bind="moodAnim.blinkLidMid"
                                />
                                <g
                                    ref="midRight"
                                    class="talos-eyes__lid-mid talos-eyes__lid-mid--right"
                                    :transform="renderMidRight"
                                >
                                    <path
                                        id="mid-right"
                                        d="m 39.701772,81.855082 -0.179302,0.04596 c 0.230106,0.691366 0.506266,1.233221 0.798156,1.649991 l 0.157349,-0.09081 C 40.199,82.916142 39.887868,82.373773 39.701772,81.855082 Z"
                                    />
                                </g>
                                <g
                                    ref="midLeft"
                                    class="talos-eyes__lid-mid talos-eyes__lid-mid--left"
                                    :transform="renderMidLeft"
                                >
                                    <path
                                        id="mid-left"
                                        d="m 33.048303,81.855082 c -0.186096,0.518691 -0.49723,1.06106 -0.776204,1.605143 l 0.15735,0.09081 c 0.291891,-0.41677 0.56805,-0.958625 0.798156,-1.649991 z"
                                    />
                                </g>
                            </g>
                        </g>
                        <g
                            ref="lidsBot"
                            class="talos-eyes__lids-bot"
                            :transform="renderLidBiasBottom"
                        >
                            <g ref="lidBotBlink" :transform="renderLidBotBlink">
                                <animateTransform
                                    v-if="runSmil"
                                    :key="`${smilKey}-blink-bot`"
                                    attributeName="transform"
                                    type="translate"
                                    begin="indefinite"
                                    restart="always"
                                    repeatCount="indefinite"
                                    v-bind="moodAnim.blinkLidBottom"
                                />
                                <g
                                    ref="botRight"
                                    class="talos-eyes__lid-bot talos-eyes__lid-bot--right"
                                    :transform="renderBotRight"
                                >
                                    <path
                                        id="bot-right"
                                        d="m 46.479321,82.879788 c -1.895399,0.167346 -2.78859,0.393235 -4.269464,0.916403 l 0.0076,0.08275 c 1.974882,-0.591734 2.429008,-0.715897 4.285583,-0.924121 z"
                                    />
                                </g>
                                <g
                                    ref="botLeft"
                                    class="talos-eyes__lid-bot talos-eyes__lid-bot--left"
                                    :transform="renderBotLeft"
                                >
                                    <path
                                        id="bot-left"
                                        d="m 26.270754,82.879788 -0.02367,0.07503 c 1.856576,0.208224 2.310702,0.332387 4.285584,0.924121 l 0.0075,-0.08275 c -1.480874,-0.523168 -2.374063,-0.749057 -4.269463,-0.916403 z"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
        <g v-if="showPupils" transform="translate(7.5105624, 2.3977065)">
            <g ref="pupilGazeMotion" :transform="renderPupilGazeOverlay">
                <g
                    ref="pupilGaze"
                    class="talos-eyes__pupil talos-eyes__pupil--left"
                    :transform="renderPupilGazeSeed"
                    :opacity="renderPupilOpacity"
                >
                    <animateTransform
                        v-if="runSmil"
                        :key="`${smilKey}-pupil`"
                        attributeName="transform"
                        type="translate"
                        begin="indefinite"
                        restart="always"
                        repeatCount="indefinite"
                        v-bind="moodAnim.gazeAnimation"
                    />
                    <animate
                        v-if="runSmil"
                        :key="`${smilKey}-pupil-op`"
                        attributeName="opacity"
                        begin="indefinite"
                        restart="always"
                    repeatCount="indefinite"
                    v-bind="moodAnim.blinkPupilOpacity"
                />
                    <ellipse
                        ref="pupilEllipse"
                        cx="0"
                        cy="0"
                        :rx="renderPupilRx"
                        :ry="renderPupilRy"
                    />
                </g>
            </g>
        </g>
        <g v-if="showPupils" transform="translate(19.033865, 2.269403)">
            <g :transform="renderPupilGazeOverlay">
                <g
                    class="talos-eyes__pupil talos-eyes__pupil--right"
                    :transform="renderPupilGazeSeed"
                    :opacity="renderPupilOpacity"
                >
                    <animateTransform
                        v-if="runSmil"
                        :key="`${smilKey}-pupil-r`"
                        attributeName="transform"
                        type="translate"
                        begin="indefinite"
                        restart="always"
                        repeatCount="indefinite"
                        v-bind="moodAnim.gazeAnimation"
                    />
                    <animate
                        v-if="runSmil"
                        :key="`${smilKey}-pupil-op-r`"
                        attributeName="opacity"
                        begin="indefinite"
                        restart="always"
                    repeatCount="indefinite"
                    v-bind="moodAnim.blinkPupilOpacity"
                />
                    <ellipse
                        cx="0"
                        cy="0"
                        :rx="renderPupilRx"
                        :ry="renderPupilRy"
                    />
                </g>
            </g>
        </g>
    </svg>
</template>

<script>
import { resolveTalosEyesMood } from '@/utils/talosEyesMoods.js';
import {
    buildPoseFromMood,
    lerpPose,
    matrixToTransform,
    sampleLivePose,
    sumPairs,
    translatePair,
    viewBoxToString,
} from '@/utils/talosEyesPose.js';

function entryTranslate(pair) {
    return translatePair(pair, { force: true });
}

export default {
    name: 'TalosEyes',

    props: {
        fill: { type: String, default: '#ebebed' },
        animated: { type: Boolean, default: true },
        mood: { type: String, default: 'neutral' },
        moodTransition: { type: Boolean, default: false },
        moodTransitionMs: { type: Number, default: 500 },
    },

    data() {
        return {
            reduceMotion: false,
            smilMood: this.mood,
            transitioning: false,
            smilReady: true,
            manualPose: null,
            transitionFrameId: null,
            transitionToken: 0,
            smilEpoch: 0,
        };
    },

    computed: {
        smilKey() {
            return `${this.smilEpoch}-${this.smilMood}`;
        },

        moodAnim() {
            return resolveTalosEyesMood(this.smilMood);
        },

        poseOverlay() {
            return this.manualPose || null;
        },

        runSmil() {
            return this.animated && !this.reduceMotion && !this.transitioning && this.smilReady;
        },

        moodEntry() {
            return this.moodAnim.entryState;
        },

        displayViewBox() {
            if (this.poseOverlay) {
                return viewBoxToString(this.poseOverlay.viewBox);
            }

            return this.moodAnim.viewBox;
        },

        showPupils() {
            if (this.poseOverlay) {
                return this.poseOverlay.pupilOpacity > 0.02;
            }

            return !this.moodAnim.hidePupils;
        },

        renderPupilGazeOverlay() {
            return this.poseOverlay
                ? translatePair(this.poseOverlay.gaze, { force: true })
                : undefined;
        },

        renderPupilGazeSeed() {
            if (this.poseOverlay || !this.runSmil) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.gaze);
        },

        renderPupilOpacity() {
            if (this.poseOverlay) {
                return this.poseOverlay.pupilOpacity;
            }

            if (this.runSmil && !this.moodAnim.hidePupils) {
                return this.moodEntry.pupilOpacity;
            }

            return undefined;
        },

        renderPupilRx() {
            return this.poseOverlay
                ? this.poseOverlay.pupilRx
                : this.moodAnim.pupilRx;
        },

        renderPupilRy() {
            return this.poseOverlay
                ? this.poseOverlay.pupilRy
                : this.moodAnim.pupilRy;
        },

        renderContourSway() {
            if (this.poseOverlay) {
                return translatePair(
                    sumPairs(this.poseOverlay.contourSway, this.poseOverlay.contourGaze),
                    { force: true },
                );
            }

            if (!this.runSmil || !this.moodAnim.contourSwayAnimation) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.contourSway);
        },

        renderContourGaze() {
            if (this.poseOverlay) {
                return 'translate(0 0)';
            }

            if (!this.runSmil) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.contourGaze);
        },

        renderLidBiasTop() {
            if (this.poseOverlay) {
                return translatePair(
                    sumPairs(
                        this.poseOverlay.lidBias?.top,
                        this.poseOverlay.lidTopMotion,
                        this.poseOverlay.lidTopBlink,
                    ),
                    { force: true },
                );
            }

            return this.moodAnim.lidBias.top || undefined;
        },

        renderLidBiasMid() {
            if (this.poseOverlay) {
                return translatePair(
                    sumPairs(
                        this.poseOverlay.lidBias?.mid,
                        this.poseOverlay.lidMidBlink,
                    ),
                    { force: true },
                );
            }

            return this.moodAnim.lidBias.mid || undefined;
        },

        renderLidBiasBottom() {
            if (this.poseOverlay) {
                return translatePair(
                    sumPairs(
                        this.poseOverlay.lidBias?.bottom,
                        this.poseOverlay.lidBotBlink,
                    ),
                    { force: true },
                );
            }

            return this.moodAnim.lidBias.bottom || undefined;
        },

        renderLidTopMotion() {
            if (this.poseOverlay) {
                return 'translate(0 0)';
            }

            if (!this.runSmil || !this.moodAnim.lidTopAnimation) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.lidTopMotion);
        },

        renderLidTopBlink() {
            if (this.poseOverlay) {
                return 'translate(0 0)';
            }

            if (!this.runSmil) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.lidTopBlink);
        },

        renderLidMidBlink() {
            if (this.poseOverlay) {
                return 'translate(0 0)';
            }

            if (!this.runSmil) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.lidMidBlink);
        },

        renderLidBotBlink() {
            if (this.poseOverlay) {
                return 'translate(0 0)';
            }

            if (!this.runSmil) {
                return undefined;
            }

            return entryTranslate(this.moodEntry.lidBotBlink);
        },

        renderBrowLeft() {
            if (this.poseOverlay) {
                return matrixToTransform(this.poseOverlay.browLeft);
            }

            return this.moodAnim.browRaise.left || undefined;
        },

        renderBrowRight() {
            if (this.poseOverlay) {
                return matrixToTransform(this.poseOverlay.browRight);
            }

            return this.moodAnim.browRaise.right || undefined;
        },

        renderMidLeft() {
            if (this.poseOverlay) {
                return matrixToTransform(this.poseOverlay.midLeft);
            }

            return this.moodAnim.midRaise.left || undefined;
        },

        renderMidRight() {
            if (this.poseOverlay) {
                return matrixToTransform(this.poseOverlay.midRight);
            }

            return this.moodAnim.midRaise.right || undefined;
        },

        renderBotLeft() {
            if (this.poseOverlay) {
                return matrixToTransform(this.poseOverlay.botLeft);
            }

            return this.moodAnim.botRaise.left || undefined;
        },

        renderBotRight() {
            if (this.poseOverlay) {
                return matrixToTransform(this.poseOverlay.botRight);
            }

            return this.moodAnim.botRaise.right || undefined;
        },
    },

    watch: {
        mood(nextMood) {
            if (nextMood === this.smilMood && !this.transitioning) {
                return;
            }

            this.queueMoodTransition(nextMood);
        },
    },

    mounted() {
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.smilMood = this.mood;

        this.$nextTick(() => {
            if (this.runSmil) {
                this.restartSmilAnimations();
            }
        });
    },

    beforeUnmount() {
        this.cancelTransition();
    },

    methods: {
        getPoseRefs() {
            return {
                contourSway: this.$refs.contourSway,
                contourGaze: this.$refs.contourGaze,
                lidsTop: this.$refs.lidsTop,
                lidTopMotion: this.$refs.lidTopMotion,
                lidTopBlink: this.$refs.lidTopBlink,
                lidsMid: this.$refs.lidsMid,
                lidMidBlink: this.$refs.lidMidBlink,
                lidsBot: this.$refs.lidsBot,
                lidBotBlink: this.$refs.lidBotBlink,
                pupilGazeMotion: this.$refs.pupilGazeMotion,
                pupilGaze: this.$refs.pupilGaze,
                pupilEllipse: this.$refs.pupilEllipse,
                browLeft: this.$refs.browLeft,
                browRight: this.$refs.browRight,
                midLeft: this.$refs.midLeft,
                midRight: this.$refs.midRight,
                botLeft: this.$refs.botLeft,
                botRight: this.$refs.botRight,
            };
        },

        cancelTransition() {
            if (this.transitionFrameId) {
                cancelAnimationFrame(this.transitionFrameId);
                this.transitionFrameId = null;
            }

        },

        restartSmilAnimations() {
            const svg = this.$refs.svgRoot;

            if (!svg) {
                return;
            }

            const nodes = svg.querySelectorAll('animate, animateTransform');

            nodes.forEach((node) => {
                try {
                    node.endElement();
                } catch (_) {
                    // SMIL end is best-effort across browsers.
                }
            });

            nodes.forEach((node) => {
                try {
                    node.beginElement();
                } catch (_) {
                    // SMIL restart is best-effort across browsers.
                }
            });
        },

        activateSmilAfterTransition(token) {
            this.smilEpoch += 1;
            this.smilReady = true;
            this.manualPose = null;

            this.$nextTick(() => {
                if (token !== this.transitionToken) {
                    return;
                }

                this.restartSmilAnimations();
            });
        },

        queueMoodTransition(targetMood) {
            if (!this.moodTransition || this.reduceMotion || targetMood === this.smilMood) {
                this.cancelTransition();
                this.transitioning = false;
                this.smilReady = true;
                this.manualPose = null;
                this.smilMood = targetMood;
                this.smilEpoch += 1;

                this.$nextTick(() => {
                    this.restartSmilAnimations();
                });

                return;
            }

            const token = this.transitionToken + 1;
            this.transitionToken = token;

            this.$nextTick(() => {
                requestAnimationFrame(() => {
                    if (token !== this.transitionToken) {
                        return;
                    }

                    const svg = this.$refs.svgRoot;
                    if (!svg) {
                        this.smilMood = targetMood;
                        return;
                    }

                    const fromPose = this.manualPose
                        ? { ...this.manualPose }
                        : sampleLivePose(svg, this.getPoseRefs());
                    const toPose = buildPoseFromMood(targetMood, svg);
                    const duration = Math.max(120, this.moodTransitionMs || 500);

                    this.cancelTransition();
                    this.smilReady = false;
                    this.transitioning = true;
                    this.manualPose = fromPose;

                    const start = performance.now();

                    const finishTransition = () => {
                        if (token !== this.transitionToken) {
                            return;
                        }

                        this.manualPose = { ...toPose };
                        this.smilMood = targetMood;
                        this.transitioning = false;
                        this.transitionFrameId = null;

                        requestAnimationFrame(() => {
                            if (token !== this.transitionToken) {
                                return;
                            }

                            this.activateSmilAfterTransition(token);
                        });
                    };

                    const step = (now) => {
                        if (token !== this.transitionToken) {
                            return;
                        }

                        const progress = Math.min(1, (now - start) / duration);
                        this.manualPose = lerpPose(fromPose, toPose, progress);

                        if (progress < 1) {
                            this.transitionFrameId = requestAnimationFrame(step);
                            return;
                        }

                        finishTransition();
                    };

                    this.transitionFrameId = requestAnimationFrame(step);
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@media (max-width: 550px) {
    .talos-eyes.ai-image {
        width: 80vw;
        height: 12vw;
    }
}
</style>
