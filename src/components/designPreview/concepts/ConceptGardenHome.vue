<template>
    <div class="cf-screen cf-garden">
        <div class="cf-garden__blob cf-garden__blob--a" aria-hidden="true" />
        <div class="cf-garden__blob cf-garden__blob--b" aria-hidden="true" />

        <div class="cf-garden__island">
            <span class="cf-garden__island-dot" aria-hidden="true" />
            <span>Сессия активна</span>
            <span class="cf-garden__island-streak">5 дн · 240 🧠</span>
        </div>

        <div class="cf-garden__bento">
            <div class="cf-garden__tile cf-garden__tile--accent">
                <span class="cf-garden__tile-label">Практика</span>
                <div>
                    <div class="cf-garden__tile-value">14 слов</div>
                    <div class="cf-garden__tile-meta">Кольцо 72%</div>
                </div>
            </div>
            <div class="cf-garden__tile">
                <span class="cf-garden__tile-label">Словарь</span>
                <div>
                    <div class="cf-garden__tile-value">+6</div>
                    <div class="cf-garden__tile-meta">ждут решения</div>
                </div>
            </div>
            <div class="cf-garden__tile">
                <span class="cf-garden__tile-label">Диалог</span>
                <div>
                    <div class="cf-garden__tile-value">Оранжерея</div>
                    <div class="cf-garden__tile-meta">12:04 осталось</div>
                </div>
            </div>
            <div class="cf-garden__tile cf-garden__tile--wide">
                <div>
                    <span class="cf-garden__tile-label">Прогноз</span>
                    <div class="cf-garden__tile-value">+18 слов к июлю</div>
                </div>
                <div class="cf-garden__tile-meta">регулярность 72%</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConceptGardenHome',
};
</script>

<style lang="scss">
@import '@/assets/scss/conceptFlows.scss';
</style>
