export const DESIGN_PREVIEW_VARIANT_MESSAGE = 'sn-design-preview-variant';

export function listenDesignPreviewVariant(callback) {
    const handler = (event) => {
        if (event?.data?.type === DESIGN_PREVIEW_VARIANT_MESSAGE) {
            callback(event.data.variant || 'baseline');
        }
    };

    window.addEventListener('message', handler);

    return () => {
        window.removeEventListener('message', handler);
    };
}

export function postDesignPreviewVariant(iframeEl, variant) {
    iframeEl?.contentWindow?.postMessage(
        { type: DESIGN_PREVIEW_VARIANT_MESSAGE, variant },
        '*',
    );
}
