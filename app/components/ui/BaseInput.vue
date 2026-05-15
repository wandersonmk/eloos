<template>
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="relative flex items-center group">
      <!-- Ícone / slot esquerdo -->
      <span
        v-if="$slots.prefix"
        class="absolute left-2.5 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-150 pointer-events-none"
        aria-hidden="true"
      >
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        ref="inputRef"
        v-bind="$attrs"
        :type="currentType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        :class="[
          'w-full rounded-lg border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500',
          'text-sm leading-none transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'h-9',
          $slots.prefix  ? 'pl-8'  : 'pl-3',
          isPassword      ? 'pr-9' : $slots.suffix ? 'pr-9' : 'pr-3',
          error
            ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
            : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-400 hover:border-slate-400 dark:hover:border-slate-600',
          disabled
            ? 'opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            : '',
        ]"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
      />

      <!-- Toggle senha -->
      <button
        v-if="isPassword"
        type="button"
        class="absolute right-2.5 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors duration-150 focus-visible:outline-none focus-visible:text-indigo-500"
        :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
        @click="togglePassword"
        tabindex="-1"
      >
        <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <span
        v-else-if="$slots.suffix"
        class="absolute right-2.5 flex items-center text-slate-400"
        aria-hidden="true"
      >
        <slot name="suffix" />
      </span>

      <span
        v-if="error && !isPassword && !$slots.suffix"
        class="absolute right-2.5 flex items-center text-red-400 pointer-events-none"
        aria-hidden="true"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path stroke-linecap="round" d="M12 8v4m0 4h.01" />
        </svg>
      </span>
    </div>

    <!-- Mensagem de erro (§8: error-placement — abaixo do campo) -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="text-xs text-red-500 flex items-center gap-1 leading-snug"
      role="alert"
    >
      {{ error }}
    </p>

    <!-- Texto de dica -->
    <p
      v-else-if="hint"
      :id="`${inputId}-hint`"
      class="text-xs text-slate-400 leading-snug"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  autocomplete?: string
}>(), {
  type: 'text',
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const inputId = useId()
const inputRef = ref<HTMLInputElement>()

const isPassword = computed(() => props.type === 'password')
const showPassword = ref(false)
const currentType = computed(() => {
  if (isPassword.value) return showPassword.value ? 'text' : 'password'
  return props.type
})

function togglePassword() {
  showPassword.value = !showPassword.value
  nextTick(() => inputRef.value?.focus())
}
</script>
