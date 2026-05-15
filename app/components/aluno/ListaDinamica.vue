<template>
  <div class="flex flex-col gap-2.5">
    <div v-if="modelValue.length === 0" class="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-3 py-4 text-center">
      <p class="text-[12px] text-slate-500 dark:text-slate-400">{{ emptyMessage }}</p>
    </div>

    <div
      v-for="(item, idx) in modelValue"
      :key="idx"
      class="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-900/40 p-3 relative"
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {{ itemLabel }} #{{ idx + 1 }}
        </span>
        <button
          type="button"
          @click="remove(idx)"
          class="w-6 h-6 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          aria-label="Remover"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
        </button>
      </div>
      <slot :item="item" :index="idx" :update="(patch: any) => update(idx, patch)" />
    </div>

    <button
      type="button"
      @click="add"
      class="self-start flex items-center gap-1.5 px-2.5 h-8 text-[12px] rounded-md border border-dashed border-indigo-300 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
      {{ addLabel }}
    </button>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
const props = withDefaults(defineProps<{
  modelValue: T[]
  itemLabel?: string
  addLabel?: string
  emptyMessage?: string
  newItem: () => T
}>(), {
  itemLabel: 'Entrada',
  addLabel: 'Adicionar',
  emptyMessage: 'Nenhuma entrada cadastrada.',
})

const emit = defineEmits<{ 'update:modelValue': [value: T[]] }>()

function add() {
  emit('update:modelValue', [...props.modelValue, props.newItem()])
}

function remove(idx: number) {
  emit('update:modelValue', props.modelValue.filter((_, i) => i !== idx))
}

function update(idx: number, patch: Partial<T>) {
  const next = props.modelValue.map((it, i) => i === idx ? { ...it, ...patch } : it)
  emit('update:modelValue', next)
}
</script>
