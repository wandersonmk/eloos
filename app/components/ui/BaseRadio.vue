<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <div :class="['flex gap-1.5', inline ? 'flex-row flex-wrap' : 'flex-col']">
      <label
        v-for="opt in normalizedOptions"
        :key="String(opt.value)"
        :class="[
          'flex items-center gap-2 cursor-pointer rounded-lg border px-2.5 py-1.5 transition-colors',
          modelValue === opt.value
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-200',
        ]"
      >
        <span
          :class="[
            'shrink-0 w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 flex items-center justify-center',
            modelValue === opt.value
              ? 'border-indigo-600'
              : 'border-slate-300 dark:border-slate-500',
          ]"
        >
          <span v-show="modelValue === opt.value" class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
        </span>
        <input
          type="radio"
          :name="groupName"
          :value="opt.value"
          :checked="modelValue === opt.value"
          @change="$emit('update:modelValue', opt.value)"
          class="sr-only"
        />
        <span class="text-[13px] select-none">{{ opt.label }}</span>
      </label>
    </div>

    <p v-if="error" class="text-xs text-red-500 leading-snug">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-slate-400 dark:text-slate-500 leading-snug">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
type Option = string | { label: string; value: string | number | boolean }

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean
  options: Option[]
  label?: string
  required?: boolean
  inline?: boolean
  error?: string
  hint?: string
}>(), { required: false, inline: true })

defineEmits<{ 'update:modelValue': [value: any] }>()

const groupName = useId()

const normalizedOptions = computed(() =>
  (props.options ?? []).map(o => typeof o === 'string' ? { label: o, value: o } : o)
)
</script>
