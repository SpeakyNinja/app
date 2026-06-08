<template>
    <div class="anim-preview-shell">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AnimPreviewShell',
};
</script>

<style scoped lang="scss">
.anim-preview-shell {
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: relative;
    overflow: hidden;
}
</style>
