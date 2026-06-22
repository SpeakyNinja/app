export const DESIGN_PREVIEW_PRESSABLE = [
    '.buttons-sticked .item',
    '.dp-btn',
    '.dp-stat-items .item',
    '.dp-layer-dashboard__train',
    '.dp-stat-pult__arrow:not(.dp-stat-pult__arrow--muted)',
    '.dp-stat-layer-chrome__settings',
].join(', ');

export function bindDesignPreviewPress(rootEl) {
    if (!rootEl) {
        return () => {};
    }

    const onPointerDown = (event) => {
        if (event.button !== 0) {
            return;
        }

        const el = event.target.closest(DESIGN_PREVIEW_PRESSABLE);
        if (!el || !rootEl.contains(el)) {
            return;
        }

        el.classList.add('dp-press');

        const release = () => {
            el.classList.remove('dp-press');
            document.removeEventListener('pointerup', release);
            document.removeEventListener('pointercancel', release);
        };

        document.addEventListener('pointerup', release);
        document.addEventListener('pointercancel', release);
    };

    rootEl.addEventListener('pointerdown', onPointerDown);

    return () => {
        rootEl.removeEventListener('pointerdown', onPointerDown);
    };
}
