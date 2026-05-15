<template>
  <section class="rounded-lg border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
    <header
      v-if="title || $slots.header"
      class="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-100 dark:border-slate-700/70 bg-slate-50/50 dark:bg-slate-800/40"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <div
          v-if="icon || $slots.icon"
          class="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0"
        >
          <slot name="icon">
            <span v-html="icon" />
          </slot>
        </div>
        <div class="flex flex-col min-w-0">
          <h3 class="text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate leading-tight">{{ title }}</h3>
          <p v-if="subtitle" class="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">{{ subtitle }}</p>
        </div>
      </div>
      <slot name="actions" />
    </header>

    <div :class="['p-4', dense ? 'space-y-2.5' : 'space-y-4']">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  icon?: string
  dense?: boolean
}>()
</script>
