<template>
  <FormSection title="Matrículas" subtitle="Histórico de matrículas do aluno">
    <div v-if="!matriculas.length" class="flex flex-col items-center justify-center py-10 gap-3">
      <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
      </div>
      <p class="text-[13px] text-slate-500 dark:text-slate-400">Nenhuma matrícula encontrada</p>
      <NuxtLink to="/matriculas" class="text-[12px] text-indigo-600 dark:text-indigo-400 hover:underline">
        Criar nova matrícula →
      </NuxtLink>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-[13px]">
        <thead>
          <tr class="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <th class="font-medium py-2 px-2">Turma</th>
            <th class="font-medium py-2 px-2">Período</th>
            <th class="font-medium py-2 px-2">Início</th>
            <th class="font-medium py-2 px-2">Fim</th>
            <th class="font-medium py-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in matriculas" :key="m.id" class="border-b border-slate-100 dark:border-slate-700/60">
            <td class="py-2.5 px-2 text-slate-800 dark:text-slate-100">{{ m.turma }}</td>
            <td class="py-2.5 px-2 text-slate-600 dark:text-slate-300">{{ m.periodo }}</td>
            <td class="py-2.5 px-2 text-slate-600 dark:text-slate-300">{{ formatar(m.inicio) }}</td>
            <td class="py-2.5 px-2 text-slate-600 dark:text-slate-300">{{ m.fim ? formatar(m.fim) : '—' }}</td>
            <td class="py-2.5 px-2">
              <span :class="['text-[11px] px-2 py-0.5 rounded-full font-medium', statusClass(m.status)]">{{ m.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </FormSection>
</template>

<script setup lang="ts">
import type { MatriculaItem } from '~/composables/useAlunoForm'

defineProps<{ matriculas: MatriculaItem[] }>()

function formatar(iso: string): string {
  return iso ? new Date(iso).toLocaleDateString('pt-BR') : ''
}

function statusClass(status: MatriculaItem['status']): string {
  switch (status) {
    case 'Ativa':     return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    case 'Concluída': return 'bg-blue-50    text-blue-700    dark:bg-blue-900/30    dark:text-blue-300'
    case 'Cancelada': return 'bg-red-50     text-red-700     dark:bg-red-900/30     dark:text-red-300'
    case 'Trancada':  return 'bg-amber-50   text-amber-700   dark:bg-amber-900/30   dark:text-amber-300'
  }
}
</script>
