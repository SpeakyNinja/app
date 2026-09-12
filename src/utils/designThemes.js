/** Design lab variants — preview-only; production app unchanged. */

export const DESIGN_VARIANTS = [
    {
        key: 'prism_flow',
        label: 'Prism Flow',
        labelRu: 'Призматический поток',
        description: 'Ocean glass: teal + coral sunset, 3D-orbs, wave charts, volumetric glow.',
        mood: 'experimental',
    },
];

const THEMES = {
    prism_flow: {
        outer: '#030c12',
        column: 'rgba(13, 148, 136, 0.08)',
        elevated: 'rgba(20, 184, 166, 0.14)',
        panel: 'rgba(45, 212, 191, 0.18)',
        text: '#ecfdf5',
        muted: '#7dd3c0',
        accent: '#14b8a6',
        accentAlt: '#fb7185',
        mascotFill: '#ecfdf5',
        mascotGlow: '#2dd4bf',
        radius: '24px',
        radiusLg: '36px',
        btnHeight: '58px',
        glassBlur: '26px',
        glassBg: 'rgba(20, 184, 166, 0.12)',
        glassBorder: 'rgba(45, 212, 191, 0.32)',
        fontUi: 'Medium, sans-serif',
        fontMono: 'RobotoMonoBold, monospace',
        fontDisplay: 'Bold, sans-serif',
        fontTitle: 'Light, sans-serif',
        fontAccent: 'Bold, sans-serif',
        sheetBorder: 'rgba(45, 212, 191, 0.22)',
        brainBase: '#0f766e',
        brainRed: '#fb7185',
        brainYellow: '#fbbf24',
        brainGreen: '#2dd4bf',
        brainCyan: '#22d3ee',
        brainWhite: '#ecfdf5',
        brainKnows: '#99f6e4',
    },
};

export function normalizeDesignVariantKey(raw) {
    const key = String(raw || 'prism_flow').trim().toLowerCase().replace(/-/g, '_');
    return THEMES[key] ? key : 'prism_flow';
}

export function getDesignTheme(variantKey) {
    return THEMES[normalizeDesignVariantKey(variantKey)];
}

export function cssVarsFromDesignTheme(variantKey) {
    const t = getDesignTheme(variantKey);
    return {
        '--dp-outer': t.outer,
        '--dp-column': t.column,
        '--dp-elevated': t.elevated,
        '--dp-panel': t.panel,
        '--dp-text': t.text,
        '--dp-muted': t.muted,
        '--dp-accent': t.accent,
        '--dp-accent-alt': t.accentAlt,
        '--dp-mascot-fill': t.mascotFill,
        '--dp-mascot-glow': t.mascotGlow,
        '--dp-radius': t.radius,
        '--dp-radius-lg': t.radiusLg || t.radius,
        '--dp-btn-height': t.btnHeight,
        '--dp-glass-blur': t.glassBlur || '20px',
        '--dp-glass-bg': t.glassBg || 'rgba(255, 255, 255, 0.1)',
        '--dp-glass-border': t.glassBorder || 'rgba(255, 255, 255, 0.2)',
        '--dp-font-ui': t.fontUi,
        '--dp-font-mono': t.fontMono,
        '--dp-font-display': t.fontDisplay,
        '--dp-font-title': t.fontTitle,
        '--dp-font-accent': t.fontAccent,
        '--dp-sheet-border': t.sheetBorder,
        '--dp-brain-base': t.brainBase,
        '--dp-brain-red': t.brainRed,
        '--dp-brain-yellow': t.brainYellow,
        '--dp-brain-green': t.brainGreen,
        '--dp-brain-cyan': t.brainCyan,
        '--dp-brain-white': t.brainWhite,
        '--dp-brain-knows': t.brainKnows,
    };
}

export function readDesignPreviewConfig(search = '') {
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
    return {
        variant: normalizeDesignVariantKey(params.get('variant')),
    };
}
