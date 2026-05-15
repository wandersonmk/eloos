<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <textarea
      :id="id"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :class="[
        'w-full rounded-lg border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400',
        'text-sm leading-relaxed transition-colors duration-150 px-3 py-2',
        'focus:outline-none focus:ring-2 focus:ring-offset-0 resize-y',
        error
          ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
          : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-400 hover:border-slate-400 dark:hover:border-slate-600',
        disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : '',
      ]"
    />

    <p v-if="error" class="text-xs text-red-500 leading-snug">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-slate-400 dark:text-slate-500 leading-snug">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}>(), { rows: 3, required: false, disabled: false })

defineEmits<{ 'update:modelValue': [value: string] }>()

const id = useId()
</script>
