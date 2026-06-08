export const ANIMATION_CONFIG_KEY = 'animationPreviewConfig';
export const REPLAY_KEY = 'animationPreviewReplay';

const EASING_MAP = {
    ease: 'ease',
    'ease-out': 'ease-out',
    'ease-in': 'ease-in',
    'ease-in-out': 'ease-in-out',
    linear: 'linear',
    cubic_out: 'cubic-bezier(0.33, 1, 0.68, 1)',
    cubic_in_out: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

function clampNumber(raw, min, max, fallback) {
    const n = Number(raw);
    if (Number.isNaN(n)) {
        return fallback;
    }

    return Math.min(max, Math.max(min, n));
}

function boolVal(raw, fallback) {
    if (raw === undefined || raw === null || raw === '') {
        return fallback;
    }

    return raw === '1' || raw === 'true' || raw === true;
}

export function readAnimationPreviewConfig(search = '') {
    const raw = {};
    const qs = search.startsWith('?') ? search.slice(1) : search;
    const params = new URLSearchParams(qs);
    params.forEach((val, key) => {
        if (key.startsWith('ap_')) {
            raw[key.slice(3)] = val;
        }
    });

    return normalizeAnimationConfig(raw);
}

export function normalizeAnimationConfig(raw = {}) {
    return {
        preset: raw.preset || 'slide_up',
        duration_ms: clampNumber(raw.duration_ms, 50, 5000, 450),
        distance_px: clampNumber(raw.distance_px, 0, 200, 10),
        stagger_ms: clampNumber(raw.stagger_ms, 0, 1000, 80),
        item_fade_ms: clampNumber(raw.item_fade_ms, 50, 3000, 500),
        easing: raw.easing || 'ease',
        item_count: clampNumber(raw.item_count, 1, 10, 4),
        scale_from: clampNumber(raw.scale_from, 1, 1.5, 1.1),
        scale_press: clampNumber(raw.scale_press, 0.7, 1, 0.95),
        backdrop_fade: boolVal(raw.backdrop_fade, true),
        from_percent: clampNumber(raw.from_percent, 0, 100, 0),
        to_percent: clampNumber(raw.to_percent, 0, 100, 65),
        char_delay_ms: clampNumber(raw.char_delay_ms, 10, 500, 35),
        typewriter_start_ms: clampNumber(raw.typewriter_start_ms, 0, 3000, 0),
        show_cursor: boolVal(raw.show_cursor, true),
        mood: raw.mood || 'neutral',
        mood_transition_ms: clampNumber(raw.mood_transition_ms, 120, 2000, 500),
    };
}

export function animationPreviewStateKey(config) {
    return JSON.stringify(config || {});
}

export function easingCss(easing) {
    return EASING_MAP[easing] || EASING_MAP.ease;
}

export function durationCss(ms) {
    return `${ms}ms`;
}

export function cssVarsFromConfig(config) {
    const c = normalizeAnimationConfig(config);

    return {
        '--ap-duration': durationCss(c.duration_ms),
        '--ap-easing': easingCss(c.easing),
        '--ap-distance': `${c.distance_px}px`,
        '--ap-stagger': `${c.stagger_ms}ms`,
        '--ap-item-fade': `${c.item_fade_ms}ms`,
        '--ap-scale-from': String(c.scale_from),
        '--ap-scale-press': String(c.scale_press),
    };
}

export function lineEnterClass(preset) {
    const map = {
        slide_up: 'ap-anim-line-slide-up',
        fade: 'ap-anim-line-fade',
        slide_left: 'ap-anim-line-slide-left',
        slide_right: 'ap-anim-line-slide-right',
        scale_in: 'ap-anim-line-scale',
        blur_in: 'ap-anim-line-blur',
        none: '',
    };

    return map[preset] || map.slide_up;
}
