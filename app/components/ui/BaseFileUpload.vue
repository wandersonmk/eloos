<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none">{{ label }}</label>

    <div
      :class="[
        'flex items-center justify-between gap-3 rounded-lg border border-dashed px-3 py-2 transition-colors',
        modelValue
          ? 'border-emerald-300 bg-emerald-50/60 dark:bg-emerald-900/15'
          : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 bg-slate-50/60 dark:bg-slate-800/40',
      ]"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-7 h-7 rounded-md bg-white dark:bg-slate-700 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-600">
          <svg class="w-3.5 h-3.5 text-slate-500 dark:text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
        </div>
        <div class="flex flex-col min-w-0 leading-tight">
          <span v-if="modelValue" class="text-[13px] font-medium text-slate-800 dark:text-slate-100 truncate">{{ modelValue }}</span>
          <span v-else class="text-[13px] text-slate-500 dark:text-slate-400">Nenhum arquivo selecionado</span>
          <span class="text-[10px] text-slate-400 dark:text-slate-500">{{ accept || 'PDF, JPG ou PNG' }}</span>
        </div>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <button
          v-if="modelValue"
          type="button"
          @click="clear"
          class="text-[11px] px-2 h-7 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >Remover</button>
        <button
          type="button"
          @click="open"
          class="text-[11px] px-2.5 h-7 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
        >{{ modelValue ? 'Trocar' : 'Selecionar' }}</button>
      </div>
    </div>

    <input ref="input" type="file" :accept="accept || 'image/*,application/pdf'" class="hidden" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: string | null; label?: string; accept?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const input = ref<HTMLInputElement>()
function open() { input.value?.click() }
function clear() {
  emit('update:modelValue', null)
  if (input.value) input.value.value = ''
}
function onChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) emit('update:modelValue', file.name)
}
</script>
