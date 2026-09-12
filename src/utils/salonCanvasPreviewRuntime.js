import { replicaScreenSteps, replicaChunkToLines } from '@/services/CanvasDialogService.js';
import { normalizeTalosEyesMoodKey } from '@/utils/talosEyesMoods.js';

export const FINISH_SCREEN_REACTION_ID = 'finish_screen';

const DEFAULT_VARIABLES = {
    intro_done: '0',
};

function cloneState(state) {
    return JSON.parse(JSON.stringify(state));
}

function runtimeContext(state) {
    return {
        completed_dialog_ids: state.completed_dialog_ids || [],
        variables: { ...DEFAULT_VARIABLES, ...(state.variables || {}) },
        activated_block_keys: state.activated_block_keys || [],
    };
}

function passesRules(ruleSet, context) {
    if (!ruleSet || !ruleSet.rules?.length) {
        return true;
    }

    const results = ruleSet.rules.map((rule) => evaluateRule(rule, context));
    const logic = ruleSet.logic || 'and';

    return logic === 'or' ? results.some(Boolean) : results.every(Boolean);
}

function evaluateRule(rule, context) {
    const type = rule.type || '';
    const params = rule.params || {};

    if (type === 'always') {
        return true;
    }

    if (type === 'variable_compare' || type === 'stat_compare') {
        const key = params.key || '';
        const op = params.operator || 'eq';
        const expected = params.value;
        const actual = context.variables?.[key];

        if (op === 'eq') {
            return String(actual) === String(expected);
        }
        if (op === 'neq') {
            return String(actual) !== String(expected);
        }

        return false;
    }

    return true;
}

function resolveEntryBlockKey(dialogData) {
    const blocks = dialogData?.blocks || {};
    const keys = Object.keys(blocks);

    if (!keys.length) {
        return null;
    }

    return keys.sort((a, b) => {
        const ao = blocks[a]?.sort_order ?? 0;
        const bo = blocks[b]?.sort_order ?? 0;

        return ao - bo || String(blocks[a]?.id || '').localeCompare(String(blocks[b]?.id || ''));
    })[0];
}

function replicaGroupHasReplicas(group) {
    return group?.kind === 'replica_group' && (group.replicas || []).length > 0;
}

function collectVisibleReplicaChunks(group, context) {
    const chunks = [];

    for (const replica of group.replicas || []) {
        if (!passesRules(replica.activation_rules, context)) {
            continue;
        }

        const chunk = replica.content || [];
        if (chunk.length) {
            chunks.push(chunk);
        }
    }

    return chunks;
}

function replicaDelaysForGroup(group, context) {
    const delays = [];
    let visibleReplicaIndex = 0;

    for (const replica of group.replicas || []) {
        if (!passesRules(replica.activation_rules, context)) {
            continue;
        }

        if (visibleReplicaIndex > 0) {
            delays.push(Number(replica.delay_seconds ?? 0));
        }

        visibleReplicaIndex += 1;
    }

    return delays;
}

function reactionIsHidden(reaction, context) {
    const hideRules = reaction.hide_rules;
    if (!hideRules?.rules?.length) {
        return false;
    }

    return passesRules(hideRules, context);
}

function mapReactionsForView(reactions, context) {
    const mapped = [];

    for (const reaction of reactions || []) {
        if (!passesRules(reaction.activation_rules, context)) {
            continue;
        }

        if (reactionIsHidden(reaction, context)) {
            continue;
        }

        mapped.push({
            id: String(reaction.id ?? `r-${mapped.length}`),
            label: reaction.label || 'Кнопка',
        });
    }

    return mapped;
}

function moodForGroupIndex(groups, groupIndex) {
    const group = groups[groupIndex];
    if (!group) {
        return 'neutral';
    }

    if (group.kind === 'replica_group') {
        return normalizeTalosEyesMoodKey(group.mood);
    }

    if (group.kind === 'reaction_group') {
        const prev = groups[groupIndex - 1];
        if (prev?.kind === 'replica_group') {
            return normalizeTalosEyesMoodKey(prev.mood);
        }

        return normalizeTalosEyesMoodKey(group.mood);
    }

    return 'neutral';
}

function lastReplicaContent(groups, context) {
    for (let i = groups.length - 1; i >= 0; i -= 1) {
        if (groups[i]?.kind !== 'replica_group') {
            continue;
        }

        const replicas = groups[i].replicas || [];
        for (let j = replicas.length - 1; j >= 0; j -= 1) {
            if (passesRules(replicas[j].activation_rules, context)) {
                return replicas[j].content || [];
            }
        }

        return [];
    }

    return [];
}

function isReplicaOnlyBlockEnd(groups, gIdx, mappedReactions) {
    if (mappedReactions.length) {
        return false;
    }

    const group = groups[gIdx];
    if (!group || group.kind !== 'replica_group' || !replicaGroupHasReplicas(group)) {
        return false;
    }

    let next = gIdx + 1;
    while (groups[next]) {
        const kind = groups[next].kind;
        if (kind === 'replica_group') {
            return false;
        }
        if (kind === 'reaction_group') {
            if ((groups[next].reactions || []).length) {
                return false;
            }
            next += 1;
            continue;
        }
        next += 1;
    }

    return true;
}

function isReplicaOnlyScreenAdvance(groups, gIdx, mappedReactions) {
    if (mappedReactions.length) {
        return false;
    }

    const group = groups[gIdx];
    if (!group || group.kind !== 'replica_group' || !replicaGroupHasReplicas(group)) {
        return false;
    }

    return !isReplicaOnlyBlockEnd(groups, gIdx, mappedReactions);
}

function positionAfterReplicaScreen(groups, replicaGroupIdx) {
    const next = replicaGroupIdx + 1;
    if (!groups[next] || groups[next].kind !== 'reaction_group') {
        return next;
    }
    if (!replicaGroupHasReplicas(groups[replicaGroupIdx] || {})) {
        return next;
    }

    return next + 1;
}

export function buildSalonPreviewView(snapshot, state) {
    const context = runtimeContext(state);
    const dialog = snapshot.dialogs[state.dialog_slug];
    const block = dialog?.blocks?.[state.block_key];
    let isEndpoint = false;
    let displayReplicas = [];
    let replicaDelays = [];
    let reactions = [];

    if (!block) {
        return {
            dialog_slug: state.dialog_slug,
            block_key: state.block_key,
            replicas: [],
            replica_delays: [],
            reactions: [],
            is_endpoint: true,
            group_index: state.group_index ?? 0,
            mood: 'neutral',
        };
    }

    const groups = block.groups || [];
    const gIdx = Number(state.group_index ?? 0);

    if (!groups[gIdx]) {
        isEndpoint = true;
        const lastContent = lastReplicaContent(groups, context);
        displayReplicas = lastContent.length ? [lastContent] : [];
    } else {
        const group = groups[gIdx];

        if (group.kind === 'replica_group') {
            displayReplicas = collectVisibleReplicaChunks(group, context);
            replicaDelays = replicaDelaysForGroup(group, context);
            const next = groups[gIdx + 1];
            if (next?.kind === 'reaction_group') {
                reactions = mapReactionsForView(next.reactions, context);
            }
        } else if (group.kind === 'reaction_group') {
            const prev = groups[gIdx - 1];
            if (prev && replicaGroupHasReplicas(prev)) {
                displayReplicas = collectVisibleReplicaChunks(prev, context);
                replicaDelays = replicaDelaysForGroup(prev, context);
            } else {
                const lastContent = lastReplicaContent(groups.slice(0, gIdx), context);
                displayReplicas = lastContent.length ? [lastContent] : [];
            }
            reactions = mapReactionsForView(group.reactions, context);
        }

        if (isReplicaOnlyBlockEnd(groups, gIdx, reactions)) {
            reactions = [];
            isEndpoint = true;
        } else if (isReplicaOnlyScreenAdvance(groups, gIdx, reactions)) {
            reactions = [{ id: FINISH_SCREEN_REACTION_ID, label: 'Дальше' }];
        } else if (!reactions.length && !groups[gIdx + 1] && group.kind === 'replica_group') {
            isEndpoint = true;
        } else if (!reactions.length && gIdx >= groups.length - 1 && group.kind === 'reaction_group') {
            isEndpoint = true;
        }
    }

    return {
        dialog_slug: state.dialog_slug,
        block_key: state.block_key,
        replicas: displayReplicas,
        replica_delays: replicaDelays,
        reactions,
        is_endpoint: isEndpoint && !reactions.length,
        group_index: state.group_index,
        mood: moodForGroupIndex(groups, gIdx),
    };
}

function normalizeStateAtBlock(snapshot, state) {
    const next = cloneState(state);
    const dialog = snapshot.dialogs[next.dialog_slug];
    const block = dialog?.blocks?.[next.block_key];
    if (!block) {
        return next;
    }

    const context = runtimeContext(next);
    const groups = block.groups || [];
    let gIdx = Number(next.group_index ?? 0);

    while (gIdx < groups.length) {
        const group = groups[gIdx];
        if (group.kind === 'reaction_group') {
            if (!(group.reactions || []).length) {
                gIdx += 1;
                continue;
            }
            next.group_index = gIdx;
            next.replica_index = 0;
            return next;
        }

        if (group.kind === 'replica_group') {
            if (!(group.replicas || []).length) {
                gIdx += 1;
                continue;
            }
            next.group_index = gIdx;
            next.replica_index = 0;
            return next;
        }

        gIdx += 1;
    }

    next.group_index = groups.length;
    next.replica_index = 0;

    return next;
}

function advancePosition(snapshot, state) {
    const next = cloneState(state);
    const dialog = snapshot.dialogs[next.dialog_slug];
    const block = dialog?.blocks?.[next.block_key];
    if (!block) {
        return next;
    }

    const groups = block.groups || [];
    const gIdx = Number(next.group_index ?? 0);
    const group = groups[gIdx];
    if (!group) {
        return next;
    }

    if (group.kind === 'replica_group') {
        next.group_index = positionAfterReplicaScreen(groups, gIdx);
        next.replica_index = 0;
        return next;
    }

    next.group_index = gIdx + 1;
    next.replica_index = 0;

    return next;
}

function resolveGotoBlockKey(dialogData, effect) {
    const targetKey = effect.target_block_key;
    if (targetKey && dialogData.blocks?.[targetKey]) {
        return targetKey;
    }

    const targetId = effect.target_block_id;
    if (!targetId) {
        return null;
    }

    for (const [key, block] of Object.entries(dialogData.blocks || {})) {
        if (String(block.id) === String(targetId)) {
            return key;
        }
    }

    return null;
}

function locateReaction(snapshot, state, reactionId) {
    const dialog = snapshot.dialogs[state.dialog_slug];
    const block = dialog?.blocks?.[state.block_key];
    if (!block) {
        return null;
    }

    for (const group of block.groups || []) {
        if (group.kind !== 'reaction_group') {
            continue;
        }

        for (const reaction of group.reactions || []) {
            if (String(reaction.id) !== String(reactionId)) {
                continue;
            }

            return reaction;
        }
    }

    return null;
}

function applyEffects(snapshot, state, effects) {
    let next = cloneState(state);

    for (const effect of effects?.length ? effects : [{ effect_type: 'advance' }]) {
        const type = effect.effect_type || 'advance';

        if (type === 'goto_dialog') {
            const slug = effect.target_dialog_slug;
            const dialogData = snapshot.dialogs[slug];
            if (!dialogData) {
                continue;
            }

            const entryKey = resolveEntryBlockKey(dialogData);
            next.dialog_slug = slug;
            next.block_key = entryKey;
            next.group_index = 0;
            next.replica_index = 0;
            if (entryKey) {
                next.activated_block_keys = [...new Set([...(next.activated_block_keys || []), entryKey])];
            }
        } else if (type === 'goto_block') {
            const dialogData = snapshot.dialogs[next.dialog_slug] || {};
            const targetKey = resolveGotoBlockKey(dialogData, effect);
            if (!targetKey) {
                continue;
            }

            next.block_key = targetKey;
            next.group_index = 0;
            next.replica_index = 0;
            next.activated_block_keys = [...new Set([...(next.activated_block_keys || []), targetKey])];
        } else if (type === 'set_variable') {
            const key = effect.variable_key || '';
            if (key) {
                next.variables = { ...(next.variables || {}), [key]: effect.variable_value };
            }
            next = advancePosition(snapshot, next);
        } else {
            next = advancePosition(snapshot, next);
        }
    }

    return normalizeStateAtBlock(snapshot, next);
}

function dialogIsEligible(dialogData, context, excludeSlug = null) {
    if (excludeSlug && dialogData.slug === excludeSlug) {
        return false;
    }

    if (dialogData.status && !['active', 'draft'].includes(dialogData.status)) {
        return false;
    }

    return passesRules(dialogData.activation_rules, context);
}

export function initSalonPreviewDialog(snapshot) {
    const starterSlug = snapshot.starter_dialog_slug;
    const dialogData = snapshot.dialogs[starterSlug];
    const entryKey = resolveEntryBlockKey(dialogData);

    const state = normalizeStateAtBlock(snapshot, {
        canvas_slug: snapshot.canvas_slug,
        dialog_slug: starterSlug,
        block_key: entryKey,
        group_index: 0,
        replica_index: 0,
        variables: { ...DEFAULT_VARIABLES },
        activated_block_keys: entryKey ? [entryKey] : [],
        completed_dialog_ids: [],
    });

    return {
        state,
        view: buildSalonPreviewView(snapshot, state),
    };
}

export function getSalonPreviewDoors(snapshot, state) {
    const context = runtimeContext(state);
    const choices = [];

    for (const dialogData of Object.values(snapshot.dialogs || {})) {
        if (!dialogIsEligible(dialogData, context, snapshot.starter_dialog_slug)) {
            continue;
        }

        const entryKey = resolveEntryBlockKey(dialogData);
        const firstReaction = dialogData.blocks?.[entryKey]?.groups?.find((g) => g.kind === 'reaction_group')
            ?.reactions?.[0];

        choices.push({
            id: `door_${dialogData.slug}`,
            label: firstReaction?.label || dialogData.title,
        });
    }

    return choices;
}

export function applySalonPreviewReaction(snapshot, state, reactionId) {
    let next = cloneState(state);

    if (reactionId === FINISH_SCREEN_REACTION_ID) {
        const dialog = snapshot.dialogs[next.dialog_slug];
        const block = dialog?.blocks?.[next.block_key];
        const groups = block?.groups || [];
        const gIdx = Number(next.group_index ?? 0);
        next.group_index = positionAfterReplicaScreen(groups, gIdx);
        next.replica_index = 0;
        next = normalizeStateAtBlock(snapshot, next);

        const view = buildSalonPreviewView(snapshot, next);

        return { state: next, view, closed: false };
    }

    if (String(reactionId).startsWith('door_')) {
        const slug = reactionId.slice(5);
        const dialogData = snapshot.dialogs[slug];
        if (!dialogData) {
            return { state: next, view: buildSalonPreviewView(snapshot, next), closed: false };
        }

        const entryKey = resolveEntryBlockKey(dialogData);
        const entryReaction = dialogData.blocks?.[entryKey]?.groups
            ?.find((g) => g.kind === 'reaction_group')
            ?.reactions?.[0];

        next.dialog_slug = slug;
        next.block_key = entryKey;
        next.group_index = 0;
        next.replica_index = 0;

        if (entryReaction) {
            next = applyEffects(snapshot, next, entryReaction.effects);
        } else {
            next = normalizeStateAtBlock(snapshot, next);
        }

        const view = buildSalonPreviewView(snapshot, next);

        return { state: next, view, closed: false };
    }

    if (reactionId === 'continue_training') {
        return { state: next, view: null, closed: true };
    }

    const reaction = locateReaction(snapshot, next, reactionId);
    if (!reaction) {
        return { state: next, view: buildSalonPreviewView(snapshot, next), closed: false };
    }

    next = applyEffects(snapshot, next, reaction.effects);
    const view = buildSalonPreviewView(snapshot, next);

    if (view.is_endpoint && !view.reactions.length) {
        const doors = getSalonPreviewDoors(snapshot, next);
        if (doors.length) {
            view.reactions = doors;
        }
    }

    return { state: next, view, closed: false };
}

export function salonPreviewReplicaSteps(view) {
    return replicaScreenSteps(view);
}

export function salonPreviewLinesFromChunk(chunk) {
    return replicaChunkToLines(chunk);
}
