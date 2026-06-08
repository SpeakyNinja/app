const GAZE_SPLINE_SOFT = '0.42 0.05 0.58 0.95';
const GAZE_SPLINE_SACCADE = '0.15 0 0.85 1';
const CONTOUR_FOLLOW_SCALE = 0.3;
const BLINK_CLOSE_SEC = 0.15;

function gazeSplineForSegment(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const dist = Math.hypot(dx, dy);

    if (dist < 0.04) {
        return GAZE_SPLINE_SOFT;
    }

    return dist > 0.55 ? GAZE_SPLINE_SACCADE : GAZE_SPLINE_SOFT;
}

function contourOffset(pos, follow) {
    if (!follow) {
        return [0, 0];
    }

    return [pos[0] * CONTOUR_FOLLOW_SCALE, pos[1] * CONTOUR_FOLLOW_SCALE];
}

function buildLidTopAnimation(frames, durSec) {
    const gazeLike = frames.map(([t, pos]) => [t, pos, false]);

    return buildGazeAnimation(gazeLike, durSec);
}

function buildGazeAnimation(frames, durSec, mapPos = (pos) => pos) {
    const values = frames.map(([, pos, follow]) => mapPos(pos, follow).join(' ')).join('; ');
    const splines = frames.slice(1).map(([, to], i) => gazeSplineForSegment(frames[i][1], to));

    return {
        values,
        keyTimes: frames.map(([t]) => (t / durSec).toFixed(4)).join('; '),
        dur: `${durSec}s`,
        calcMode: 'spline',
        keySplines: splines.join('; '),
    };
}

function blinkKeyframes(durSec, atTimesSec, closeSec) {
    const fmt = (t) => Math.min(1, Math.max(0, t / durSec)).toFixed(4);
    const keyTimes = ['0'];
    const sorted = [...atTimesSec].sort((a, b) => a - b);

    sorted.forEach((atSec) => {
        keyTimes.push(fmt(atSec));
        keyTimes.push(fmt(atSec + closeSec * 0.35));
        keyTimes.push(fmt(atSec + closeSec * 0.55));
        keyTimes.push(fmt(atSec + closeSec));
    });

    keyTimes.push('1');

    return keyTimes.join('; ');
}

function buildBlinkLidAnimation(durSec, atTimesSec, closeSec, deltaY) {
    const y = deltaY.toFixed(3);
    const blinkCount = atTimesSec.length;
    const values = ['0 0'];

    for (let i = 0; i < blinkCount; i += 1) {
        values.push('0 0', `0 ${y}`, `0 ${y}`, '0 0');
    }

    values.push('0 0');

    return {
        values: values.join('; '),
        keyTimes: blinkKeyframes(durSec, atTimesSec, closeSec),
        dur: `${durSec}s`,
        calcMode: 'linear',
    };
}

function buildBlinkPupilOpacity(durSec, atTimesSec, closeSec) {
    const blinkCount = atTimesSec.length;
    const values = ['1'];

    for (let i = 0; i < blinkCount; i += 1) {
        values.push('1', '0', '0', '1');
    }

    values.push('1');

    return {
        values: values.join('; '),
        keyTimes: blinkKeyframes(durSec, atTimesSec, closeSec),
        dur: `${durSec}s`,
        calcMode: 'linear',
    };
}

const PUPIL_RX = 0.473;
const PUPIL_RY = 0.45252487;
const DEFAULT_VIEWBOX = '0 0 26.45833 3.9207691';
const BROW_ANCHOR_LEFT = '25.32794, 79.958819';
const BROW_ANCHOR_RIGHT = '47.422135, 79.958819';

function buildMood({
    cycleSec,
    gazeKeyframes,
    blinks = [],
    lidBias = { top: '', mid: '', bottom: '' },
    browRaise = { left: '', right: '' },
    pupilScale = 1,
    viewBox = DEFAULT_VIEWBOX,
    lidTopKeyframes = null,
    hidePupils = false,
    midRaise = { left: '', right: '' },
    botRaise = { left: '', right: '' },
    contourSwayKeyframes = null,
}) {
    const gazeAnimation = buildGazeAnimation(gazeKeyframes, cycleSec);
    const contourGazeAnimation = buildGazeAnimation(gazeKeyframes, cycleSec, contourOffset);
    const contourSwayAnimation = contourSwayKeyframes
        ? buildLidTopAnimation(contourSwayKeyframes, cycleSec)
        : null;
    const entryGaze = gazeKeyframes[0]?.[1] || [0, 0];
    const entryFollow = gazeKeyframes[0]?.[2] || false;

    return {
        cycleSec,
        entryState: {
            gaze: entryGaze,
            contourGaze: contourOffset(entryGaze, entryFollow),
            contourSway: contourSwayKeyframes?.[0]?.[1] || [0, 0],
            lidTopMotion: lidTopKeyframes?.[0]?.[1] || [0, 0],
            lidTopBlink: [0, 0],
            lidMidBlink: [0, 0],
            lidBotBlink: [0, 0],
            pupilOpacity: hidePupils ? 0 : 1,
            lidBias,
            browRaise,
            midRaise,
            botRaise,
        },
        gazeAnimation,
        contourGazeAnimation,
        contourSwayAnimation,
        lidTopAnimation: lidTopKeyframes ? buildLidTopAnimation(lidTopKeyframes, cycleSec) : null,
        blinkLidTop: buildBlinkLidAnimation(cycleSec, blinks, BLINK_CLOSE_SEC, 0.14),
        blinkLidMid: buildBlinkLidAnimation(cycleSec, blinks, BLINK_CLOSE_SEC, 0.05),
        blinkLidBottom: buildBlinkLidAnimation(cycleSec, blinks, BLINK_CLOSE_SEC, -0.1),
        blinkPupilOpacity: buildBlinkPupilOpacity(cycleSec, blinks, BLINK_CLOSE_SEC),
        lidBias,
        browRaise,
        pupilScale,
        pupilRx: PUPIL_RX * pupilScale,
        pupilRy: PUPIL_RY * pupilScale,
        viewBox,
        hidePupils,
        midRaise,
        botRaise,
    };
}

export { DEFAULT_VIEWBOX };

const NEUTRAL_CYCLE = 18;
const NEUTRAL_GAZE = [
    [0.0, [0, 0], false],
    [0.9, [0.05, 0.02], false],
    [1.3, [0, 0], false],
    [2.1, [-0.82, 0.34], true],
    [2.7, [-0.79, 0.32], true],
    [3.3, [-0.82, 0.34], true],
    [4.2, [0.06, 0.42], false],
    [5.0, [0.74, 0.39], true],
    [5.6, [0.71, 0.37], true],
    [6.2, [0.74, 0.39], true],
    [6.8, [0.91, 0.16], false],
    [7.5, [-0.14, 0.17], false],
    [8.2, [-0.95, 0.1], true],
    [8.8, [-0.92, 0.11], true],
    [9.4, [-0.95, 0.1], true],
    [10.0, [-0.54, 0.33], false],
    [10.7, [0.03, 0.04], false],
    [11.4, [0, 0], false],
    [12.4, [0, 0], false],
    [13.2, [0.8, 0.29], true],
    [13.8, [0.77, 0.28], true],
    [14.4, [0.8, 0.29], true],
    [15.1, [-0.32, -0.06], false],
    [15.7, [0.07, 0.03], false],
    [16.3, [0, 0], false],
    [NEUTRAL_CYCLE, [0, 0], false],
];

export const TALOS_EYES_MOOD_OPTIONS = [
    { value: 'neutral', label: 'Нейтральный (idle)' },
    { value: 'thinking', label: 'Думает' },
    { value: 'listening', label: 'Слушает' },
    { value: 'focused', label: 'Сосредоточен' },
    { value: 'happy', label: 'Радостный' },
    { value: 'question', label: 'Вопрос' },
    { value: 'angry', label: 'Злость' },
];

export const TALOS_EYES_MOOD_LABELS = Object.fromEntries(
    TALOS_EYES_MOOD_OPTIONS.map((o) => [o.value, o.label]),
);

const MOOD_BUILDS = {
    neutral: buildMood({
        cycleSec: NEUTRAL_CYCLE,
        gazeKeyframes: NEUTRAL_GAZE,
        blinks: [5.4, 11.8],
    }),

    thinking: buildMood({
        cycleSec: 14,
        viewBox: '-0.5 -1.3 27.5 5.8',
        gazeKeyframes: [
            [0, [0, 0], false],
            [0.7, [-0.38, 0.3], true],
            [1.3, [-0.42, 0.32], true],
            [5, [-0.42, 0.32], true],
            [5.8, [-0.44, -0.12], false],
            [6.8, [-0.5, -0.82], true],
            [9, [-0.52, -0.9], true],
            [11.5, [-0.5, -0.88], true],
            [14, [-0.5, -0.88], true],
        ],
        lidTopKeyframes: [
            [0, [0, 0]],
            [5, [0, 0]],
            [5.8, [0, 0]],
            [6.8, [-0.14, -0.42]],
            [9, [-0.15, -0.44]],
            [14, [-0.14, -0.42]],
        ],
        blinks: [3, 10],
    }),

    listening: buildMood({
        cycleSec: 12,
        gazeKeyframes: [
            [0, [0, 0], false],
            [0.6, [0, 0], false],
            [1.4, [-0.55, 0.05], true],
            [3.2, [-0.52, 0.04], true],
            [4, [-0.55, 0.05], true],
            [4.8, [0, 0], false],
            [5.6, [0, 0], false],
            [6.4, [0.55, 0.05], true],
            [8.2, [0.52, 0.04], true],
            [9, [0.55, 0.05], true],
            [9.8, [0, 0], false],
            [12, [0, 0], false],
        ],
        blinks: [2.8, 7.6],
    }),

    focused: buildMood({
        cycleSec: 10,
        gazeKeyframes: [
            [0, [0, 0.52], false],
            [1.8, [0.05, 0.54], false],
            [2.5, [0, 0.52], false],
            [4.2, [-0.05, 0.53], false],
            [5, [0, 0.52], false],
            [6.8, [0.04, 0.53], false],
            [7.5, [0, 0.52], false],
            [10, [0, 0.52], false],
        ],
        blinks: [4.5],
        pupilScale: 0.9,
        browRaise: {
            left: 'translate(0, 0.12)',
            right: 'translate(0, 0.12)',
        },
        lidBias: {
            top: 'translate(0, 0.16)',
            mid: 'translate(0, -0.1)',
            bottom: 'translate(0, -0.18)',
        },
    }),

    happy: buildMood({
        cycleSec: 8,
        hidePupils: true,
        viewBox: '-0.5 -1.15 27.5 5.4',
        gazeKeyframes: [
            [0, [0, 0], false],
            [8, [0, 0], false],
        ],
        blinks: [],
        browRaise: {
            left: `rotate(-13, ${BROW_ANCHOR_LEFT}) translate(0.12, -0.24)`,
            right: `rotate(13, ${BROW_ANCHOR_RIGHT}) translate(-0.12, -0.24)`,
        },
        midRaise: {
            left: 'translate(0.1, -0.2)',
            right: 'translate(-0.1, -0.2)',
        },
        botRaise: {
            left: 'translate(0.12, -0.34)',
            right: 'translate(-0.12, -0.34)',
        },
        lidBias: {
            top: 'translate(0, -0.1)',
            mid: 'translate(0, -0.14)',
            bottom: 'translate(0, -0.28)',
        },
        contourSwayKeyframes: [
            [0, [0, 0]],
            [0.4, [0.04, -0.055]],
            [0.8, [0, -0.03]],
            [1.2, [-0.04, -0.06]],
            [1.6, [0, 0]],
            [2, [0.04, -0.055]],
            [2.4, [0, -0.03]],
            [2.8, [-0.04, -0.06]],
            [3.2, [0, 0]],
            [3.6, [0.035, -0.05]],
            [4, [0, -0.02]],
            [4.4, [-0.035, -0.055]],
            [4.8, [0, 0]],
            [5.2, [0.04, -0.055]],
            [5.6, [0, -0.03]],
            [6, [-0.04, -0.06]],
            [6.4, [0, 0]],
            [6.8, [0.03, -0.045]],
            [7.2, [0, -0.02]],
            [7.6, [-0.025, -0.035]],
            [8, [0, 0]],
        ],
    }),

    question: buildMood({
        cycleSec: 8,
        gazeKeyframes: [
            [0, [0, -0.14], true],
            [0.4, [0, -0.16], true],
            [2.5, [0.04, -0.12], true],
            [3, [0, -0.16], true],
            [5, [-0.06, -0.1], true],
            [5.5, [0, -0.16], true],
            [8, [0, -0.14], true],
        ],
        blinks: [4.2],
        pupilScale: 1.08,
        browRaise: {
            left: 'translate(0, -0.3)',
            right: `rotate(10, ${BROW_ANCHOR_RIGHT}) translate(-0.05, 0.42)`,
        },
        lidBias: {
            top: '',
            mid: 'translate(0, -0.02)',
            bottom: 'translate(0, 0.1)',
        },
    }),

    angry: buildMood({
        cycleSec: 9,
        viewBox: '-0.5 -0.2 27.5 5.1',
        gazeKeyframes: [
            [0, [0, 0.08], false],
            [1.2, [0.06, 0.1], false],
            [2.5, [0, 0.08], false],
            [4, [-0.06, 0.09], false],
            [5.5, [0, 0.08], false],
            [7, [0.05, 0.1], false],
            [9, [0, 0.08], false],
        ],
        blinks: [3.8],
        pupilScale: 0.94,
        browRaise: {
            left: `rotate(10, ${BROW_ANCHOR_LEFT}) translate(0.08, 0.14)`,
            right: `rotate(-10, ${BROW_ANCHOR_RIGHT}) translate(-0.08, 0.14)`,
        },
        lidBias: {
            top: 'translate(0, 0.06)',
            mid: 'translate(0, -0.04)',
            bottom: 'translate(0, -0.08)',
        },
    }),
};

const MOOD_ALIASES = {
    surprised: 'question',
};

export function normalizeTalosEyesMoodKey(mood) {
    const key = MOOD_ALIASES[mood] || mood || 'neutral';

    return MOOD_BUILDS[key] ? key : 'neutral';
}

export function resolveTalosEyesMood(mood) {
    return MOOD_BUILDS[normalizeTalosEyesMoodKey(mood)] || MOOD_BUILDS.neutral;
}

export function isTalosEyesMood(mood) {
    if (MOOD_ALIASES[mood]) {
        return true;
    }

    return Boolean(MOOD_BUILDS[mood]);
}
