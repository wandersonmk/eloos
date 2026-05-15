<template>
  <label
    :class="[
      'flex items-start gap-2.5 cursor-pointer select-none group',
      disabled ? 'opacity-60 cursor-not-allowed' : '',
    ]"
  >
    <span
      :class="[
        'relative shrink-0 w-[18px] h-[18px] rounded-md border-2 transition-all duration-150 mt-px',
        'flex items-center justify-center',
        modelValue
          ? 'bg-indigo-600 border-indigo-600 shadow-[0_2px_6px_rgba(99,102,241,.35)]'
          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-indigo-400',
      ]"
    >
      <svg
        v-show="modelValue"
        class="w-3 h-3 text-white"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M2 6.5l2.5 2.5L10 3" />
      </svg>
    </span>

    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="sr-only"
    />

    <span class="flex flex-col gap-0.5 min-w-0">
      <span class="text-[13px] leading-snug text-slate-700 dark:text-slate-200">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="hint" class="text-[11px] text-slate-400 dark:text-slate-500">{{ hint }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: boolean
  label?: string
  hint?: string
  disabled?: boolean
}>(), { disabled: false })

defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
