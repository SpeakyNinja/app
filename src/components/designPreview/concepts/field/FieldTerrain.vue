<template>
    <svg class="field-terrain" viewBox="0 0 400 310" fill="none" aria-hidden="true">
        <g stroke="currentColor" stroke-width="1">
            <ellipse v-for="n in 12" :key="n" cx="226" cy="163" :rx="26 + n * 16" :ry="14 + n * 11" :transform="`rotate(-32 226 163)`" />
            <path d="M55 280C44 208 194 244 158 162S230 119 251 34" stroke-dasharray="3 6" stroke-width="2" />
        </g>
        <circle cx="158" cy="162" r="19" fill="var(--f-acid)" />
        <circle cx="158" cy="162" r="5" fill="var(--f-ink)" />
        <path d="m247 30 10 3-6 8Z" fill="var(--f-paper)" />
        <g stroke="currentColor"><path d="M340 39v22m-11-11h22M48 80v12m-6-6h12" /></g>
    </svg>
</template>
