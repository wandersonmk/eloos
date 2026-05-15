<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        role="dialog"
        aria-modal="true"
        @keydown.esc="close"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="closeOnBackdrop && close()"
        />

        <!-- Conteúdo -->
        <div
          :class="[
            'relative bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col w-full max-h-[92vh]',
            sizeClass,
          ]"
        >
          <!-- Header -->
          <header
            v-if="title || $slots.header"
            class="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 shrink-0"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <div
                v-if="icon || $slots.icon"
                class="w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0"
              >
                <slot name="icon">
                  <span v-html="icon" />
                </slot>
              </div>
              <div class="flex flex-col min-w-0">
                <slot name="header">
                  <h3 class="text-[14px] font-semibold text-slate-900 dark:text-white truncate leading-tight">{{ title }}</h3>
                  <p v-if="subtitle" class="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">{{ subtitle }}</p>
                </slot>
              </div>
            </div>

            <button
              type="button"
              @click="close"
              class="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Fechar"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </header>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-4 py-4">
            <slot />
          </div>

          <!-- Footer -->
          <footer
            v-if="$slots.footer"
            class="flex items-center justify-end gap-2 px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 shrink-0 rounded-b-xl"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  subtitle?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
}>(), { size: 'md', closeOnBackdrop: true })

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const sizeClass = computed(() => ({
  sm: 'sm:max-w-md',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-3xl',
  xl: 'sm:max-w-5xl',
}[props.size]))

function close() {
  emit('update:modelValue', false)
  emit('close')
}

// Bloqueia scroll do body quando aberto
watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = props.modelValue ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity .15s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to    { opacity: 0; }
</style>
