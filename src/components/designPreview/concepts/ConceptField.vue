<template>
    <div class="field-app" :class="{ 'field-app--focus': screen === 'training', 'field-app--still': !preferences.motion }">
        <header class="field-header">
            <button v-if="screen !== 'home'" class="field-icon-button" aria-label="На главный экран FIELD" @click="go('home')"><FieldIcon name="back" /></button>
            <button v-else class="field-brand" aria-label="FIELD — маршрут дня" @click="go('home')"><FieldIcon name="spark" />field<span>by speaky.ninja</span></button>
            <span v-if="screen !== 'home'" class="field-eyebrow">{{ screenTitle }}</span>
            <button class="field-avatar" aria-label="Открыть профиль" @click="go('account')">Р</button>
        </header>

        <main ref="scrollArea" class="field-scroll">
            <Transition name="field-page" mode="out-in">
                <div :key="screen" class="field-page">
                    <template v-if="screen === 'home'">
                        <div class="field-intro"><span class="field-eyebrow">ТВОЯ ЕЖЕДНЕВНАЯ ЭКСПЕДИЦИЯ</span><h1>Мир становится<br /><em>ближе.</em></h1><p>Привет, Роман. Куда отправимся сегодня?</p></div>
                        <div class="field-rhythm"><span><i /> В своём ритме</span><span>5 дней с языком <FieldIcon name="sun" /></span></div>
                        <button class="field-hero" @click="startTraining">
                            <FieldTerrain />
                            <div class="field-hero-top"><span class="field-eyebrow">МАРШРУТ 014</span><span class="field-chip">4 слова · ~2 мин</span></div>
                            <div class="field-hero-copy"><span>Маленькие открытия</span><h2>Сойти с<br />привычного пути.</h2><p>wander · notice · curious · belong</p></div>
                            <div class="field-hero-bottom"><span>Начать тренировку</span><span class="field-round"><FieldIcon name="arrow" /></span></div>
                        </button>
                        <div class="field-section-title"><h2>Ещё немного мира</h2><span>01 / 03</span></div>
                        <button class="field-dialog-card" @click="go('dialog')"><div class="field-talos"><span /><span /></div><div><span class="field-eyebrow">РАЗГОВОР С TALOS</span><h3>Книжная за углом</h3><p>Незнакомый город. Знакомое чувство.</p></div><FieldIcon name="arrow" /></button>
                        <div class="field-two-up"><button class="field-small-card" @click="go('stats')"><FieldIcon name="map" /><strong>186<span>слов в твоём мире</span></strong><span class="field-text-link">Открыть атлас ↗</span></button><button class="field-small-card field-small-card--lime" @click="go('quests')"><FieldIcon name="compass" /><strong>1 / 3<span>задания недели</span></strong><span class="field-text-link">Выбрать направление ↗</span></button></div>
                        <button class="field-letter-link" @click="go('report')"><span>Письмо тебе</span><strong>Эта неделя была хорошей. ↗</strong></button>
                        <p class="field-footnote">FIELD / ПОЛЕ ЯЗЫКА · ИНТЕРАКТИВНЫЙ КОНЦЕПТ</p>
                    </template>

                    <template v-else-if="screen === 'training'">
                        <div class="field-training-meta"><span class="field-eyebrow">МАЛЕНЬКИЕ ОТКРЫТИЯ</span><span>{{ wordIndex + 1 }} <span class="field-muted">/ {{ words.length }}</span></span></div>
                        <div class="field-progress" role="progressbar" :aria-valuenow="wordIndex" :aria-valuemax="words.length" aria-valuemin="0" aria-label="Прогресс тренировки"><span :style="{ width: `${wordIndex / words.length * 100}%` }" /></div>
                        <section :key="wordIndex" class="field-word-stage"><span class="field-coordinate">FIELD NOTE / 0{{ wordIndex + 1 }}</span><div class="field-word-orbit" aria-hidden="true" /><h1 lang="en">{{ word.word }}</h1><button class="field-pronunciation" :aria-label="`Произнести ${word.word}`" @click="speak(word.word)">{{ word.phonetic }} <FieldIcon name="sound" /></button></section>
                        <div class="field-context"><span class="field-eyebrow">ПРЕДСТАВЬ СИТУАЦИЮ</span><p lang="en">{{ word.context }}</p><button class="field-text-link" :aria-expanded="showTranslation" @click="showTranslation = !showTranslation">{{ showTranslation ? word.translation : 'Показать перевод ↗' }}</button></div>
                        <fieldset class="field-answers"><legend>Что значит «{{ word.word }}»?</legend><button v-for="(answer, index) in word.answers" :key="answer" :disabled="selectedAnswer !== null" :class="{ correct: selectedAnswer !== null && index === word.correct, incorrect: selectedAnswer === index && index !== word.correct }" @click="chooseAnswer(index)"><span class="field-answer-index">0{{ index + 1 }}</span>{{ answer }}<FieldIcon v-if="selectedAnswer !== null && index === word.correct" name="check" /></button></fieldset>
                        <div v-if="selectedAnswer !== null" class="field-feedback" role="status"><strong>{{ selectedAnswer === word.correct ? 'Есть. Ещё одно открытие.' : 'Теперь это слово чуть ближе.' }}</strong><p>{{ word.note }}</p><button class="field-primary" @click="nextWord">{{ wordIndex === words.length - 1 ? 'Посмотреть результат' : 'Следующее слово' }}<FieldIcon name="arrow" /></button></div>
                        <p v-else class="field-footnote">Здесь можно ошибаться. Так и учатся.</p>
                    </template>

                    <template v-else-if="screen === 'dialog'">
                        <div class="field-scene"><div class="field-scene-art" aria-hidden="true"><div class="field-bookshop"><span>BOOKS & COFFEE</span><i /><i /><i /></div><span class="field-scene-sun" /></div><div class="field-scene-caption"><span class="field-eyebrow">СЦЕНА 01 · ГОРОД</span><h1>Книжная за углом.</h1><p>Найди своё место в незнакомом городе.</p></div></div>
                        <div class="field-conversation" aria-label="Диалог с Talos" aria-live="polite"><div class="field-speaker"><div class="field-talos"><span /><span /></div><strong>Talos</strong><span>твой проводник</span></div><div v-for="(message, i) in messages" :key="i" class="field-message" :class="{ 'field-message--you': message.role === 'you' }"><p lang="en">{{ message.text }}</p></div></div>
                        <template v-if="dialogStep < dialog.length"><button class="field-text-link" :aria-expanded="dialogTranslation" @click="dialogTranslation = !dialogTranslation">{{ dialogTranslation ? dialog[dialogStep].translation : 'Нужен перевод?' }}</button><div class="field-dialog-choices"><span class="field-eyebrow">ТВОЯ РЕПЛИКА</span><button v-for="(choice, i) in dialog[dialogStep].choices" :key="choice" @click="reply(i)"><span lang="en">{{ choice }}</span><FieldIcon name="arrow" /></button></div></template>
                        <div v-else class="field-feedback" role="status"><strong>Разговор случился.</strong><p>Ты поддержал беседу, рассказал о себе и нашёл новое место. С этого начинается уверенность.</p><button class="field-primary" @click="go('achievements')">Заглянуть в коллекцию<FieldIcon name="arrow" /></button><button class="field-text-link" @click="resetDialog">Пройти сцену ещё раз</button></div>
                    </template>

                    <template v-else-if="screen === 'session'">
                        <div class="field-completion-art"><FieldTerrain /><div class="field-seal"><FieldIcon name="check" /></div></div><div class="field-intro field-center"><span class="field-eyebrow">МАРШРУТ ПРОЙДЕН</span><h1>Уже немного<br /><em>свободнее.</em></h1><p>{{ completedSession ? 'Четыре слова стали частью твоего мира.' : 'Так выглядит итог короткой тренировки.' }}</p></div>
                        <div class="field-metrics"><div><strong>{{ completedSession ? words.length : 14 }}</strong><span>слов разобрано</span></div><div><strong>{{ completedSession ? Math.round(score / words.length * 100) : 86 }}<small>%</small></strong><span>с первого раза</span></div><div><strong>+{{ completedSession ? score * 20 : 240 }}</strong><span>нейронов</span></div></div>
                        <div class="field-note"><FieldIcon name="spark" /><p>Важно не ответить идеально.<br /><strong>Важно вернуться и попробовать.</strong></p></div><button class="field-primary" @click="go('dialog')">Попробовать слова в разговоре<FieldIcon name="arrow" /></button><button class="field-secondary" @click="go('home')">На сегодня достаточно</button>
                    </template>

                    <template v-else-if="screen === 'stats'">
                        <div class="field-intro"><span class="field-eyebrow">ЛИЧНАЯ ГЕОГРАФИЯ</span><h1>Твой мир<br /><em>расширяется.</em></h1></div>
                        <div class="field-atlas"><FieldTerrain /><div><strong>186</strong><span>знакомых слов</span></div><span class="field-atlas-tag">ТЕРРИТОРИЯ / A2</span></div>
                        <div class="field-legend"><span><i />42 закреплено</span><span><i />126 в работе</span><span><i />18 новых</span></div>
                        <section class="field-rank"><span class="field-eyebrow">СЛЕДУЮЩИЙ ГОРИЗОНТ</span><h2>От зелёного к синему.</h2><div class="field-belt" aria-hidden="true"><span /></div><div class="field-between"><span>36 из 50 слов</span><strong>72%</strong></div><div class="field-progress"><span style="width:72%" /></div><p>Ещё 14 слов до следующего пояса.</p></section>
                        <div class="field-section-title"><h2>Твой ритм</h2><button class="field-text-link" @click="go('report')">Вся неделя ↗</button></div><div class="field-week-chart" role="img" aria-label="Минуты занятий: понедельник 12, вторник 8, среда 0, четверг 15, пятница 6, суббота 18, воскресенье 8"><div v-for="(minutes, i) in week" :key="i"><span>{{ minutes }}</span><i :style="{ height: `${Math.max(minutes * 5, 3)}px` }" /><small>{{ days[i] }}</small></div></div><p class="field-footnote">Пропуск — часть жизни. Можно просто продолжить.</p>
                    </template>

                    <template v-else-if="screen === 'quests'">
                        <div class="field-intro"><span class="field-eyebrow">ПЛАН НА ЭТУ НЕДЕЛЮ</span><h1>Небольшие шаги.<br /><em>Настоящий путь.</em></h1><p>Выбери то, на что сегодня есть силы.</p></div>
                        <article v-for="(quest, i) in quests" :key="quest.id" class="field-quest" :class="{ 'field-quest--done': quest.done }"><div class="field-between"><span class="field-coordinate">ЭКСПЕДИЦИЯ / 0{{ i + 1 }}</span><FieldIcon :name="quest.done ? 'check' : 'compass'" /></div><h2>{{ quest.title }}</h2><p>{{ quest.description }}</p><div class="field-progress"><span :style="{ width: `${quest.progress / quest.target * 100}%` }" /></div><div class="field-between"><span>{{ quest.progress }} / {{ quest.target }}</span><strong>+{{ quest.reward }} нейронов</strong></div><button v-if="quest.done" class="field-primary" :disabled="claimed" @click="claimReward">{{ claimed ? 'Награда в твоём запасе' : 'Забрать награду' }}<FieldIcon name="check" /></button><button v-else class="field-text-link" @click="quest.id === 'words' ? startTraining() : go('dialog')">{{ quest.id === 'words' ? 'Продолжить тренировку' : 'Начать разговор' }} ↗</button></article>
                    </template>

                    <template v-else-if="screen === 'achievements'">
                        <div class="field-intro"><span class="field-eyebrow">КОЛЛЕКЦИЯ ОТКРЫТИЙ</span><h1>У каждого шага<br /><em>есть история.</em></h1><p>{{ badges.filter(b => b.unlocked).length }} открыто · ещё 2 впереди</p></div><div class="field-filters" aria-label="Категории достижений"><button v-for="filter in ['Все', 'Слова', 'Ритм', 'Диалоги']" :key="filter" :aria-pressed="badgeFilter === filter" @click="badgeFilter = filter">{{ filter }}</button></div>
                        <div class="field-badge-grid"><button v-for="badge in filteredBadges" :key="badge.id" class="field-badge-card" :class="{ 'field-badge-card--locked': !badge.unlocked }" @click="selectedBadge = badge"><span class="field-stamp"><FieldIcon :name="badge.symbol" /></span><span class="field-eyebrow">{{ badge.category }}</span><h2>{{ badge.name }}</h2><small>{{ badge.unlocked ? 'В твоей коллекции ↗' : 'Впереди · узнать больше' }}</small></button></div>
                        <div v-if="selectedBadge" class="field-note field-badge-detail" role="status"><FieldIcon :name="selectedBadge.symbol" /><div><strong>{{ selectedBadge.name }}</strong><p>{{ selectedBadge.detail }}</p></div><button class="field-icon-button" aria-label="Закрыть описание достижения" @click="selectedBadge = null"><FieldIcon name="close" /></button></div>
                    </template>

                    <template v-else-if="screen === 'report'">
                        <article class="field-report"><div class="field-between"><span class="field-eyebrow">ПИСЬМО № 024</span><FieldIcon name="sun" /></div><h1>Роман,<br />ты стал<br /><em>смелее.</em></h1><p class="field-report-lead">На этой неделе английский был рядом с тобой пять дней. Вот что из этого получилось.</p><div class="field-report-number"><strong>+24</strong><span>новых слова.<br />24 способа сказать больше.</span></div><div class="field-report-trend" role="img" aria-label="Регулярность выросла с 62 до 84 процентов"><svg viewBox="0 0 320 95" fill="none" aria-hidden="true"><path d="M0 85H320M0 45H320" stroke="currentColor" opacity=".15" /><path d="M5 80 57 62 109 51 161 42 213 30 265 17 315 10" stroke="currentColor" stroke-width="3" /><circle cx="315" cy="10" r="5" fill="currentColor" /></svg><div class="field-between"><span>Регулярность</span><strong>84% <small>↑ 12 п.п.</small></strong></div></div><p>Самая длинная серия — <strong>7 дней</strong>. Точность — <strong>81%</strong>. А главное: ты снова возвращался к языку.</p><div class="field-report-next"><span class="field-eyebrow">ОДНА ИДЕЯ НА СЛЕДУЮЩУЮ НЕДЕЛЮ</span><h2>Дай словам голос.</h2><p>Попробуй короткий диалог. Знание становится уверенностью, когда используешь его.</p><button class="field-primary" @click="go('dialog')">Поговорить с Talos<FieldIcon name="arrow" /></button></div><p class="field-signature">До следующего открытия,<br /><em>твоя команда Speaky Ninja</em></p></article>
                    </template>

                    <template v-else-if="screen === 'settings'">
                        <div class="field-intro"><span class="field-eyebrow">НАСТРОЙКИ РИТМА</span><h1>Как удобно<br /><em>тебе.</em></h1><p>Хорошая привычка вписывается в жизнь.</p></div><section class="field-settings-section"><h2>Время для языка</h2><p>Твой ориентир на день</p><div class="field-time-options"><button v-for="time in [5, 10, 15]" :key="time" :aria-pressed="dailyMinutes === time" @click="dailyMinutes = time; savePreferences()"><strong>{{ time }}</strong>минут</button></div></section><div v-for="setting in settingOptions" :key="setting.key" class="field-setting-row"><div><strong>{{ setting.title }}</strong><p>{{ setting.description }}</p></div><button class="field-switch" role="switch" :aria-label="setting.title" :aria-checked="preferences[setting.key]" @click="preferences[setting.key] = !preferences[setting.key]; savePreferences()"><span /></button></div><p class="field-settings-caption" role="status">{{ settingsMessage || 'Настройки этого концепта сохраняются только в этом браузере.' }}</p><button class="field-secondary" @click="go('account')">Учётная запись<FieldIcon name="arrow" /></button>
                    </template>

                    <template v-else-if="screen === 'account'">
                        <div class="field-intro"><span class="field-eyebrow">ПАСПОРТ ИССЛЕДОВАТЕЛЯ</span><h1>Твой собственный<br /><em>маршрут.</em></h1></div><div class="field-passport"><div class="field-between"><span class="field-eyebrow">SPEAKY NINJA / FIELD</span><FieldIcon name="compass" /></div><div class="field-passport-person"><span class="field-profile-avatar">Р</span><div><h2>Роман</h2><p>Исследователь языка</p></div></div><div class="field-passport-line"><span>НАПРАВЛЕНИЕ</span><strong>Английский · A2</strong></div><div class="field-passport-line"><span>В ПУТИ С</span><strong>Марта 2025</strong></div><div class="field-passport-line"><span>ТВОЙ РАНГ</span><strong>Зелёный пояс</strong></div><div class="field-passport-code" aria-hidden="true">FIELD&lt;ROMAN&lt;&lt;ENGLISH&lt;A2&lt;&lt;&lt;<br />DISCOVER&lt;A&lt;LITTLE&lt;EVERY&lt;DAY</div></div><button class="field-wallet" @click="go('quests')"><div><span class="field-eyebrow">ЗАПАС ДЛЯ ОТКРЫТИЙ</span><strong>{{ 1240 + (claimed ? 120 : 0) }} <small>нейронов</small></strong></div><FieldIcon name="arrow" /></button><button class="field-secondary" @click="go('settings')"><FieldIcon name="settings" />Настроить свой ритм</button><button class="field-secondary" @click="go('achievements')"><FieldIcon name="spark" />Моя коллекция</button><p class="field-footnote">ДЕМОНСТРАЦИОННЫЙ ПРОФИЛЬ · FIELD CONCEPT</p>
                    </template>
                </div>
            </Transition>
        </main>

        <nav v-if="screen !== 'training'" class="field-dock" aria-label="Навигация FIELD"><button v-for="item in nav" :key="item.id" :aria-current="screen === item.id ? 'page' : undefined" @click="go(item.id)"><FieldIcon :name="item.icon" /><span>{{ item.label }}</span><i v-if="screen === item.id" /></button></nav>
    </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import FieldIcon from './field/FieldIcon.vue';
import FieldTerrain from './field/FieldTerrain.vue';
import { FIELD_SCREENS, FIELD_WORDS, FIELD_DIALOG, FIELD_BADGES } from '@/utils/fieldConcept.js';

const props = defineProps({ moduleKey: { type: String, default: 'field_home' } });
const router = useRouter();
const screen = computed(() => props.moduleKey.replace(/^field_/, ''));
const screenTitle = computed(() => FIELD_SCREENS.find(s => s[0] === screen.value)?.[1] || 'FIELD');
const scrollArea = ref(null);
const nav = [{ id: 'home', label: 'Сегодня', icon: 'sun' }, { id: 'stats', label: 'Атлас', icon: 'map' }, { id: 'dialog', label: 'Talos', icon: 'chat' }, { id: 'achievements', label: 'Открытия', icon: 'spark' }];
const words = FIELD_WORDS;
const wordIndex = ref(0);
const word = computed(() => words[wordIndex.value]);
const selectedAnswer = ref(null);
const showTranslation = ref(false);
const score = ref(0);
const completedSession = ref(false);
const dialog = FIELD_DIALOG;
const dialogStep = ref(0);
const dialogTranslation = ref(false);
const messages = ref([{ role: 'talos', text: dialog[0].line }]);
const badges = FIELD_BADGES;
const badgeFilter = ref('Все');
const selectedBadge = ref(null);
const filteredBadges = computed(() => badges.filter(b => badgeFilter.value === 'Все' || b.category === badgeFilter.value));
const claimed = ref(false);
const week = [12, 8, 0, 15, 6, 18, 8];
const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const quests = [{ id: 'words', title: 'Пять встреч с языком', description: 'Заверши пять коротких тренировок.', progress: 4, target: 5, reward: 80 }, { id: 'dialog', title: 'Начни разговор', description: 'Три жизненные сцены вместе с Talos.', progress: 1, target: 3, reward: 100 }, { id: 'rhythm', title: 'Найди свой ритм', description: 'Занимайся хотя бы четыре дня на неделе.', progress: 4, target: 4, reward: 120, done: true }];
const settingOptions = [{ key: 'sound', title: 'Звук слов', description: 'Произношение по нажатию' }, { key: 'hints', title: 'Подсказки', description: 'Перевод контекста сразу' }, { key: 'motion', title: 'Мягкие переходы', description: 'Немного движения между экранами' }];
const preferences = ref({ sound: true, hints: false, motion: true });
const dailyMinutes = ref(10);
const settingsMessage = ref('');
try {
    const saved = JSON.parse(localStorage.getItem('speaky-field-preferences') || 'null');
    if (saved && typeof saved === 'object') {
        for (const key of ['sound', 'hints', 'motion']) if (typeof saved[key] === 'boolean') preferences.value[key] = saved[key];
        if ([5, 10, 15].includes(saved.dailyMinutes)) dailyMinutes.value = saved.dailyMinutes;
    }
} catch { /* Storage can be disabled in embedded previews. */ }
function go(id) { router.push(`/design-preview/field_${id}`); }
function startTraining() { wordIndex.value = 0; selectedAnswer.value = null; score.value = 0; completedSession.value = false; showTranslation.value = preferences.value.hints; go('training'); }
function chooseAnswer(index) { if (selectedAnswer.value !== null) return; selectedAnswer.value = index; if (index === word.value.correct) score.value++; }
function nextWord() {
    if (wordIndex.value === words.length - 1) { completedSession.value = true; go('session'); return; }
    wordIndex.value++; selectedAnswer.value = null; showTranslation.value = preferences.value.hints; scrollArea.value?.scrollTo({ top: 0 });
}
function speak(text) {
    if (!preferences.value.sound) return;
    if (!('speechSynthesis' in window)) { showTranslation.value = true; return; }
    window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-GB'; utterance.rate = .85; window.speechSynthesis.speak(utterance);
}
async function reply(index) {
    const step = dialog[dialogStep.value];
    if (!step) return;
    messages.value.push({ role: 'you', text: step.choices[index] }, { role: 'talos', text: step.replies[index] });
    dialogStep.value++; dialogTranslation.value = false;
    if (dialogStep.value < dialog.length) messages.value.push({ role: 'talos', text: dialog[dialogStep.value].line });
    await nextTick(); scrollArea.value?.scrollTo({ top: scrollArea.value.scrollHeight, behavior: 'smooth' });
}
function resetDialog() { dialogStep.value = 0; messages.value = [{ role: 'talos', text: dialog[0].line }]; dialogTranslation.value = false; scrollArea.value?.scrollTo({ top: 0 }); }
function claimReward() { claimed.value = true; }
function savePreferences() {
    try { localStorage.setItem('speaky-field-preferences', JSON.stringify({ ...preferences.value, dailyMinutes: dailyMinutes.value })); settingsMessage.value = 'Сохранено в этом браузере.'; }
    catch { settingsMessage.value = 'Применено на время просмотра. Браузер не разрешил сохранение.'; }
}
watch(screen, async () => { await nextTick(); scrollArea.value?.scrollTo({ top: 0 }); });
onBeforeUnmount(() => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); });
</script>

<style lang="scss">
@import '@/assets/scss/fieldConcept.scss';
</style>
