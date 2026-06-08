import AbstractService from '@/services/AbstractService.js';

export default class CanvasDialogService extends AbstractService {
    listPublished() {
        return this.request('/canvases/published');
    }

    init(slug) {
        return this.request(`/canvases/${slug}/init`);
    }

    reaction(slug, state, reactionId) {
        return this.request(`/canvases/${slug}/reaction`, { state, reaction_id: reactionId });
    }

    doors(slug, state) {
        return this.request(`/canvases/${slug}/doors`, { state });
    }

    initEngagementPreview(slug) {
        return this.request(`/canvases/${slug}/engagement-preview/init`);
    }

    reactionEngagementPreview(slug, state, reactionId) {
        return this.request(`/canvases/${slug}/engagement-preview/reaction`, { state, reaction_id: reactionId });
    }

    doorsEngagementPreview(slug, state) {
        return this.request(`/canvases/${slug}/engagement-preview/doors`, { state });
    }
}

export function replicaChunkToLines(chunk) {
    const lines = [];
    const blocks = Array.isArray(chunk) ? chunk : [];

    for (const block of blocks) {
        if (block.block_type !== 'text') {
            continue;
        }
        const plain = block.payload?.plain || '';
        plain.split('\n').forEach((line) => {
            const trimmed = line.trim();
            if (trimmed) {
                lines.push(trimmed);
            }
        });
    }

    return lines;
}

export function replicaChunksToLines(replicas) {
    const lines = [];

    for (const chunk of replicas || []) {
        lines.push(...replicaChunkToLines(chunk));
    }

    return lines;
}

/** Нормализует view.replicas к массиву чанков (по одной реплике). */
export function normalizeReplicaChunks(replicas) {
    if (!replicas?.length) {
        return [];
    }

    const first = replicas[0];
    if (first && typeof first === 'object' && 'block_type' in first) {
        return [replicas];
    }

    return replicas.map((chunk) => (Array.isArray(chunk) ? chunk : [chunk]));
}

/**
 * @returns {{ lines: string[], delayBefore: number }[]}
 */
export function replicaScreenSteps(view) {
    const chunks = normalizeReplicaChunks(view?.replicas);
    const delays = view?.replica_delays || [];

    return chunks.map((chunk, index) => ({
        lines: replicaChunkToLines(chunk),
        delayBefore: index === 0 ? 0 : Number(delays[index - 1] ?? 0),
    }));
}

export function replicaChunksToImageUrl(replicas) {
    for (const chunk of replicas || []) {
        const blocks = Array.isArray(chunk) ? chunk : [];
        for (const block of blocks) {
            if (block.block_type === 'image' && block.payload?.url) {
                return block.payload.url;
            }
        }
    }

    return null;
}
