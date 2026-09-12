<template>
    <div class="cf-screen cf-atelier">
        <header class="cf-atelier__masthead">
            <div class="cf-atelier__issue">Speaky.Ninja · Выпуск № 24</div>
            <h1 class="cf-atelier__title">Сегодняшний<br>выпуск</h1>
            <p class="cf-atelier__date">Воскресенье, 22 июня · 12 мин чтения</p>
        </header>

        <nav class="cf-atelier__articles" aria-label="Материалы выпуска">
            <article class="cf-atelier__article">
                <span class="cf-atelier__article-tag">Сессия</span>
                <h2 class="cf-atelier__article-head">Практика: 14 слов в запасе</h2>
                <p class="cf-atelier__article-meta">Кольцо пояса 72% · нейроны 240</p>
            </article>
            <article class="cf-atelier__article">
                <span class="cf-atelier__article-tag">Подборка</span>
                <h2 class="cf-atelier__article-head">Новые лица словаря</h2>
                <p class="cf-atelier__article-meta">6 карточек ждут решения</p>
            </article>
            <article class="cf-atelier__article">
                <span class="cf-atelier__article-tag">Отчёт</span>
                <h2 class="cf-atelier__article-head">Регулярность и прогноз</h2>
                <p class="cf-atelier__article-meta">5 дней подряд · +18 слов к июлю</p>
            </article>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'ConceptAtelierCover',
};
</script>

<style lang="scss">
@import '@/assets/scss/conceptFlows.scss';
</style>
