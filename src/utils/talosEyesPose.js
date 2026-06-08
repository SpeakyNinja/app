import { DEFAULT_VIEWBOX, resolveTalosEyesMood } from '@/utils/talosEyesMoods.js';

const IDENTITY_MATRIX = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

export function parseViewBox(viewBox) {
    const parts = String(viewBox || DEFAULT_VIEWBOX).trim().split(/\s+/).map(Number);

    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) {
        return [0, 0, 26.45833, 3.9207691];
    }

    return parts;
}

export function easeInOutCubic(t) {
    if (t <= 0) {
        return 0;
    }

    if (t >= 1) {
        return 1;
    }

    return t < 0.5
        ? 4 * t * t * t
        : 1 - ((-2 * t + 2) ** 3) / 2;
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function lerpPair(from, to, t) {
    return [lerp(from[0], to[0], t), lerp(from[1], to[1], t)];
}

export function translatePair(pair, { force = false } = {}) {
    if (!pair) {
        return force ? 'translate(0 0)' : '';
    }

    if (!force && !pair[0] && !pair[1]) {
        return '';
    }

    return `translate(${pair[0]} ${pair[1]})`;
}

export function sumPairs(...pairs) {
    return pairs.reduce(
        (acc, pair) => [acc[0] + (pair?.[0] || 0), acc[1] + (pair?.[1] || 0)],
        [0, 0],
    );
}

export function translatePoint(point) {
    return translatePair([point.tx, point.ty]);
}

function matrixFromSVGMatrix(m) {
    return { a: m.a, b: m.b, c: m.c, d: m.d, e: m.e, f: m.f };
}

export function transformToMatrix(svg, transformStr) {
    if (!svg?.createSVGMatrix) {
        return { ...IDENTITY_MATRIX };
    }

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    if (transformStr) {
        g.setAttribute('transform', transformStr);
    }

    const consolidated = g.transform.baseVal.consolidate();

    return consolidated
        ? matrixFromSVGMatrix(consolidated.matrix)
        : matrixFromSVGMatrix(svg.createSVGMatrix());
}

export function matrixToTransform(matrix) {
    const m = matrix || IDENTITY_MATRIX;

    return `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`;
}

export function lerpMatrix(from, to, t) {
    const a = from || IDENTITY_MATRIX;
    const b = to || IDENTITY_MATRIX;

    return {
        a: lerp(a.a, b.a, t),
        b: lerp(a.b, b.b, t),
        c: lerp(a.c, b.c, t),
        d: lerp(a.d, b.d, t),
        e: lerp(a.e, b.e, t),
        f: lerp(a.f, b.f, t),
    };
}

function readTranslate(el) {
    if (!el) {
        return [0, 0];
    }

    const ctm = el.getCTM?.();
    const parentCtm = el.parentElement?.getCTM?.();

    if (ctm && parentCtm && el.ownerSVGElement) {
        const svg = el.ownerSVGElement;
        const inverse = parentCtm.inverse();
        const local = svg.createSVGPoint();
        local.x = ctm.e;
        local.y = ctm.f;
        const relative = local.matrixTransform(inverse);

        return [relative.x, relative.y];
    }

    if (!el.transform?.baseVal) {
        return [0, 0];
    }

    const consolidated = el.transform.baseVal.consolidate();

    if (!consolidated) {
        return [0, 0];
    }

    const m = consolidated.matrix;

    return [m.e, m.f];
}

function readOpacity(el) {
    if (!el) {
        return 1;
    }

    const attr = el.getAttribute('opacity');

    if (attr !== null && attr !== '') {
        const parsed = Number(attr);

        return Number.isNaN(parsed) ? 1 : parsed;
    }

    const styleOpacity = el.style?.opacity;

    if (styleOpacity) {
        const parsed = Number(styleOpacity);

        return Number.isNaN(parsed) ? 1 : parsed;
    }

    return 1;
}

function readMatrix(el, svg) {
    if (!el?.transform?.baseVal) {
        return transformToMatrix(svg, '');
    }

    const consolidated = el.transform.baseVal.consolidate();

    return consolidated
        ? matrixFromSVGMatrix(consolidated.matrix)
        : transformToMatrix(svg, '');
}

function readTranslateFromStatic(transformStr, svg) {
    const m = transformToMatrix(svg, transformStr);

    return [m.e, m.f];
}

function parseFirstTranslateValues(valuesStr) {
    if (!valuesStr) {
        return [0, 0];
    }

    const first = valuesStr.split(';')[0].trim();
    const parts = first.split(/[\s,]+/).map(Number);

    return [parts[0] || 0, parts[1] || 0];
}

function parseFirstScalarValues(valuesStr, fallback = 1) {
    if (!valuesStr) {
        return fallback;
    }

    const first = valuesStr.split(';')[0].trim();
    const parsed = Number(first);

    return Number.isNaN(parsed) ? fallback : parsed;
}

export function buildPoseFromMood(mood, svg) {
    const anim = resolveTalosEyesMood(mood);
    const entry = anim.entryState;
    const pupilOpacity = anim.hidePupils
        ? 0
        : parseFirstScalarValues(anim.blinkPupilOpacity?.values, entry.pupilOpacity);

    return {
        viewBox: parseViewBox(anim.viewBox),
        gaze: parseFirstTranslateValues(anim.gazeAnimation?.values),
        pupilOpacity,
        pupilRx: anim.pupilRx,
        pupilRy: anim.pupilRy,
        pupilVisible: !anim.hidePupils && pupilOpacity > 0.02,
        contourSway: anim.contourSwayAnimation
            ? parseFirstTranslateValues(anim.contourSwayAnimation.values)
            : [0, 0],
        contourGaze: parseFirstTranslateValues(anim.contourGazeAnimation?.values),
        lidTopMotion: anim.lidTopAnimation
            ? parseFirstTranslateValues(anim.lidTopAnimation.values)
            : [0, 0],
        lidTopBlink: parseFirstTranslateValues(anim.blinkLidTop?.values),
        lidMidBlink: parseFirstTranslateValues(anim.blinkLidMid?.values),
        lidBotBlink: parseFirstTranslateValues(anim.blinkLidBottom?.values),
        lidBias: {
            top: readTranslateFromStatic(entry.lidBias.top, svg),
            mid: readTranslateFromStatic(entry.lidBias.mid, svg),
            bottom: readTranslateFromStatic(entry.lidBias.bottom, svg),
        },
        browLeft: transformToMatrix(svg, entry.browRaise.left),
        browRight: transformToMatrix(svg, entry.browRaise.right),
        midLeft: transformToMatrix(svg, entry.midRaise.left),
        midRight: transformToMatrix(svg, entry.midRaise.right),
        botLeft: transformToMatrix(svg, entry.botRaise.left),
        botRight: transformToMatrix(svg, entry.botRaise.right),
    };
}

function readPupilGaze(refs) {
    if (refs.pupilGazeMotion?.getAttribute('transform')) {
        return readTranslate(refs.pupilGazeMotion);
    }

    return readTranslate(refs.pupilGaze);
}

export function sampleLivePose(svg, refs) {
    return {
        viewBox: [
            svg.viewBox.baseVal.x,
            svg.viewBox.baseVal.y,
            svg.viewBox.baseVal.width,
            svg.viewBox.baseVal.height,
        ],
        gaze: readPupilGaze(refs),
        pupilOpacity: readOpacity(refs.pupilGaze),
        pupilRx: Number(refs.pupilEllipse?.getAttribute('rx')) || 0.473,
        pupilRy: Number(refs.pupilEllipse?.getAttribute('ry')) || 0.45252487,
        pupilVisible: readOpacity(refs.pupilGaze) > 0.05,
        contourSway: readTranslate(refs.contourSway),
        contourGaze: readTranslate(refs.contourGaze),
        lidTopMotion: readTranslate(refs.lidTopMotion),
        lidTopBlink: readTranslate(refs.lidTopBlink),
        lidMidBlink: readTranslate(refs.lidMidBlink),
        lidBotBlink: readTranslate(refs.lidBotBlink),
        lidBias: {
            top: readTranslate(refs.lidsTop),
            mid: readTranslate(refs.lidsMid),
            bottom: readTranslate(refs.lidsBot),
        },
        browLeft: readMatrix(refs.browLeft, svg),
        browRight: readMatrix(refs.browRight, svg),
        midLeft: readMatrix(refs.midLeft, svg),
        midRight: readMatrix(refs.midRight, svg),
        botLeft: readMatrix(refs.botLeft, svg),
        botRight: readMatrix(refs.botRight, svg),
    };
}

export function lerpPose(from, to, t) {
    const eased = easeInOutCubic(t);

    return {
        viewBox: from.viewBox.map((v, i) => lerp(v, to.viewBox[i], eased)),
        gaze: lerpPair(from.gaze, to.gaze, eased),
        pupilOpacity: lerp(from.pupilOpacity, to.pupilOpacity, eased),
        pupilRx: lerp(from.pupilRx, to.pupilRx, eased),
        pupilRy: lerp(from.pupilRy, to.pupilRy, eased),
        pupilVisible: to.pupilVisible || eased < 0.98 || from.pupilVisible,
        contourSway: lerpPair(from.contourSway, to.contourSway, eased),
        contourGaze: lerpPair(from.contourGaze, to.contourGaze, eased),
        lidTopMotion: lerpPair(from.lidTopMotion, to.lidTopMotion, eased),
        lidTopBlink: lerpPair(from.lidTopBlink, to.lidTopBlink, eased),
        lidMidBlink: lerpPair(from.lidMidBlink, to.lidMidBlink, eased),
        lidBotBlink: lerpPair(from.lidBotBlink, to.lidBotBlink, eased),
        lidBias: {
            top: lerpPair(from.lidBias.top, to.lidBias.top, eased),
            mid: lerpPair(from.lidBias.mid, to.lidBias.mid, eased),
            bottom: lerpPair(from.lidBias.bottom, to.lidBias.bottom, eased),
        },
        browLeft: lerpMatrix(from.browLeft, to.browLeft, eased),
        browRight: lerpMatrix(from.browRight, to.browRight, eased),
        midLeft: lerpMatrix(from.midLeft, to.midLeft, eased),
        midRight: lerpMatrix(from.midRight, to.midRight, eased),
        botLeft: lerpMatrix(from.botLeft, to.botLeft, eased),
        botRight: lerpMatrix(from.botRight, to.botRight, eased),
    };
}

export function viewBoxToString(viewBox) {
    return viewBox.join(' ');
}
