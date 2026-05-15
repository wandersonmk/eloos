<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :class="[
          'w-full appearance-none rounded-lg border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
          'text-sm leading-none transition-colors duration-150 h-9 pl-3 pr-8',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
            : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-400 hover:border-slate-400 dark:hover:border-slate-600',
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800' : '',
        ]"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in normalizedOptions" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
      </select>
      <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
      </span>
    </div>

    <p v-if="error" class="text-xs text-red-500 leading-snug">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-slate-400 dark:text-slate-500 leading-snug">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
type Option = string | { label: string; value: string | number }

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options: Option[]
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}>(), { required: false, disabled: false })

defineEmits<{ 'update:modelValue': [value: string] }>()

const id = useId()

const normalizedOptions = computed(() =>
  (props.options ?? []).map(o => typeof o === 'string' ? { label: o, value: o } : o)
)
</script>
