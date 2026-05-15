<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <div :class="['grid gap-1.5', gridClass]">
      <label
        v-for="opt in normalizedOptions"
        :key="String(opt.value)"
        :class="[
          'flex items-center gap-2 cursor-pointer rounded-lg border px-2.5 py-1.5 transition-colors',
          isChecked(opt.value)
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-200',
        ]"
      >
        <span
          :class="[
            'relative shrink-0 w-[15px] h-[15px] rounded border-2 transition-all duration-150 flex items-center justify-center',
            isChecked(opt.value)
              ? 'bg-indigo-600 border-indigo-600'
              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500',
          ]"
        >
          <svg
            v-show="isChecked(opt.value)"
            class="w-2.5 h-2.5 text-white"
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
          :checked="isChecked(opt.value)"
          @change="toggle(opt.value)"
          class="sr-only"
        />
        <span class="text-[13px] truncate">{{ opt.label }}</span>
      </label>
    </div>

    <p v-if="hint" class="text-xs text-slate-400 dark:text-slate-500 leading-snug">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
type Option = string | { label: string; value: string }

const props = withDefaults(defineProps<{
  modelValue: string[]
  options: Option[]
  label?: string
  required?: boolean
  hint?: string
  /** Quantas colunas mostrar. Default = responsivo (2/3/4 conforme breakpoint). */
  cols?: 1 | 2 | 3 | 4 | 'auto'
}>(), { required: false, cols: 'auto' })

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

const normalizedOptions = computed(() =>
  (props.options ?? []).map(o => typeof o === 'string' ? { label: o, value: o } : o)
)

const gridClass = computed(() => {
  if (props.cols === 1) return 'grid-cols-1'
  if (props.cols === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (props.cols === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  if (props.cols === 4) return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
  return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' // default 'auto'
})

function isChecked(value: string): boolean {
  return props.modelValue.includes(value)
}

function toggle(value: string) {
  const next = isChecked(value)
    ? props.modelValue.filter(v => v !== value)
    : [...props.modelValue, value]
  emit('update:modelValue', next)
}
</script>
