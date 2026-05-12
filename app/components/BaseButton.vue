<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'relative inline-flex items-center justify-center gap-2 font-normal rounded-md',
      'transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'active:scale-[0.97]',
      'touch-manipulation select-none cursor-pointer',
      sizeClasses,
      variantClasses,
      (disabled || loading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      block ? 'w-full' : '',
    ]"
  >
    <!-- Spinner de loading -->
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="animate-spin"
        :class="spinnerSize"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </span>

    <!-- Conteúdo -->
    <span :class="loading ? 'invisible' : 'flex items-center gap-2'">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
})

// Mínimo 44px de altura (touch target — Apple HIG / Material Design)
const sizeClasses = computed(() => ({
  sm: 'h-9 px-4 text-sm min-h-[36px]',
  md: 'h-11 px-5 text-base min-h-[44px]',
  lg: 'h-13 px-7 text-lg min-h-[52px]',
}[props.size]))

const spinnerSize = computed(() => ({
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}[props.size]))

const variantClasses = computed(() => ({
  primary: [
    'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white',
    'shadow-[0_1px_2px_rgba(0,0,0,.15),inset_0_1px_0_rgba(255,255,255,.12)]',
    'hover:from-indigo-400 hover:to-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,.4)]',
    'focus-visible:ring-indigo-500',
  ].join(' '),

  secondary: [
    'bg-gradient-to-b from-slate-600 to-slate-700 text-white',
    'shadow-[0_1px_2px_rgba(0,0,0,.2),inset_0_1px_0_rgba(255,255,255,.08)]',
    'hover:from-slate-500 hover:to-slate-600 hover:shadow-[0_4px_12px_rgba(71,85,105,.35)]',
    'focus-visible:ring-slate-500',
  ].join(' '),

  outline: [
    'border-2 border-indigo-500 text-indigo-600 bg-transparent',
    'hover:bg-indigo-50 hover:border-indigo-600 hover:shadow-[0_2px_8px_rgba(99,102,241,.2)]',
    'focus-visible:ring-indigo-400',
  ].join(' '),

  ghost: [
    'text-indigo-600 bg-transparent',
    'hover:bg-indigo-50',
    'focus-visible:ring-indigo-400',
  ].join(' '),

  danger: [
    'bg-gradient-to-b from-red-500 to-red-600 text-white',
    'shadow-[0_1px_2px_rgba(0,0,0,.15),inset_0_1px_0_rgba(255,255,255,.12)]',
    'hover:from-red-400 hover:to-red-500 hover:shadow-[0_4px_12px_rgba(239,68,68,.4)]',
    'focus-visible:ring-red-500',
  ].join(' '),
}[props.variant]))
</script>
