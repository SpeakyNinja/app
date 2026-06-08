export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function highlightTarget(el) {
    if (!el) {
        return;
    }
    el.classList.add('anim-target-highlight');
}

export function clearTargetHighlight(el) {
    el?.classList.remove('anim-target-highlight');
}

export async function demoButtonPress(btn, scale, durationMs) {
    if (!btn) {
        return;
    }

    highlightTarget(btn);
    await sleep(700);

    for (let i = 0; i < 2; i += 1) {
        btn.style.transform = `scale(${scale})`;
        await sleep(durationMs);
        btn.style.transform = 'scale(1)';
        await sleep(450);
    }
}
