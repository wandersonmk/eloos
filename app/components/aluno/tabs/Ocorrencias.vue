<template>
  <FormSection title="Ocorrências" subtitle="Histórico de ocorrências registradas">
    <div v-if="!ocorrencias.length" class="flex flex-col items-center justify-center py-10 gap-3">
      <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
      </div>
      <p class="text-[13px] text-slate-500 dark:text-slate-400">Nenhuma ocorrência encontrada</p>
    </div>

    <div v-else class="flex flex-col gap-2">
      <div
        v-for="oc in ocorrencias"
        :key="oc.id"
        class="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-white dark:bg-slate-800/40 flex gap-3 items-start"
      >
        <div :class="['w-1 self-stretch rounded-full', gravidadeBar(oc.gravidade)]" />
        <div class="flex flex-col flex-1 min-w-0 gap-1">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[13px] font-medium text-slate-800 dark:text-slate-100 truncate">{{ oc.assunto }}</span>
            <span :class="['text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md shrink-0', statusClass(oc.status)]">{{ oc.status }}</span>
          </div>
          <p class="text-[12px] text-slate-600 dark:text-slate-300 line-clamp-2">{{ oc.descricao }}</p>
          <div class="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            <span>{{ formatar(oc.data) }}</span>
            <span>•</span>
            <span>Registrado por {{ oc.registradoPor }}</span>
          </div>
        </div>
      </div>
    </div>
  </FormSection>
</template>

<script setup lang="ts">
import type { OcorrenciaItem } from '~/composables/useAlunoForm'

defineProps<{ ocorrencias: OcorrenciaItem[] }>()

function formatar(iso: string): string {
  return iso ? new Date(iso).toLocaleDateString('pt-BR') : ''
}

function gravidadeBar(g: OcorrenciaItem['gravidade']): string {
  return { baixa: 'bg-blue-400', media: 'bg-amber-400', alta: 'bg-red-500' }[g]
}

function statusClass(s: OcorrenciaItem['status']): string {
  switch (s) {
    case 'Aberta':       return 'bg-red-50     text-red-700     dark:bg-red-900/30     dark:text-red-300'
    case 'Em andamento': return 'bg-amber-50   text-amber-700   dark:bg-amber-900/30   dark:text-amber-300'
    case 'Resolvida':    return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
  }
}
</script>
