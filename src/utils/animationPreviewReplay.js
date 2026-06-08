export const ANIM_PREVIEW_REPLAY_MESSAGE = 'sn-anim-preview-replay';
export const ANIM_PREVIEW_CONFIG_MESSAGE = 'sn-anim-preview-config-update';

export function listenAnimationPreviewReplay(callback) {
    const handler = (event) => {
        if (event?.data?.type === ANIM_PREVIEW_REPLAY_MESSAGE) {
            callback();
        }
    };

    window.addEventListener('message', handler);

    return () => {
        window.removeEventListener('message', handler);
    };
}

export function postAnimationPreviewReplay(iframeEl) {
    iframeEl?.contentWindow?.postMessage({ type: ANIM_PREVIEW_REPLAY_MESSAGE }, '*');
}

export function listenAnimationPreviewConfigUpdate(callback) {
    const handler = (event) => {
        if (event?.data?.type === ANIM_PREVIEW_CONFIG_MESSAGE) {
            callback(event.data.search || '');
        }
    };

    window.addEventListener('message', handler);

    return () => {
        window.removeEventListener('message', handler);
    };
}

export function postAnimationPreviewConfigUpdate(iframeEl, search = '') {
    iframeEl?.contentWindow?.postMessage(
        { type: ANIM_PREVIEW_CONFIG_MESSAGE, search },
        '*',
    );
}

export function waitForRefReady(getRef, predicate, maxAttempts = 60) {
    return new Promise((resolve) => {
        let attempts = 0;

        const tick = async () => {
            attempts += 1;
            const ref = getRef();
            if (ref && predicate(ref)) {
                resolve(ref);
                return;
            }
            if (attempts >= maxAttempts) {
                resolve(ref || null);
                return;
            }
            await new Promise((r) => requestAnimationFrame(r));
            tick();
        };

        tick();
    });
}
