<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Chamada</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Frequência da turma {{ turma }} · {{ data }}</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md" @click="marcarTodos('presente')">Todos presentes</BaseButton>
        <BaseButton size="md">Salvar chamada</BaseButton>
      </div>
    </div>

    <!-- Filtros -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      <select v-model="turma" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>3º Ano A — Manhã</option>
        <option>2º Ano A — Manhã</option>
        <option>1º Ano A — Manhã</option>
      </select>
      <input v-model="data" type="date" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm" />
      <select v-model="aula" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>1º horário — Matemática</option>
        <option>2º horário — Português</option>
        <option>3º horário — Ciências</option>
      </select>
    </div>

    <!-- KPIs rápidos -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
      <div class="rounded-lg p-3 bg-emerald-50 dark:bg-emerald-900/20">
        <p class="text-xs text-slate-500">Presentes</p>
        <p class="text-xl font-semibold text-emerald-600 mt-0.5">{{ contar('presente') }}</p>
      </div>
      <div class="rounded-lg p-3 bg-red-50 dark:bg-red-900/20">
        <p class="text-xs text-slate-500">Faltas</p>
        <p class="text-xl font-semibold text-red-600 mt-0.5">{{ contar('falta') }}</p>
      </div>
      <div class="rounded-lg p-3 bg-amber-50 dark:bg-amber-900/20">
        <p class="text-xs text-slate-500">Atrasos</p>
        <p class="text-xl font-semibold text-amber-600 mt-0.5">{{ contar('atraso') }}</p>
      </div>
      <div class="rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
        <p class="text-xs text-slate-500">Justificados</p>
        <p class="text-xl font-semibold text-blue-600 mt-0.5">{{ contar('justificado') }}</p>
      </div>
      <div class="rounded-lg p-3 bg-slate-100 dark:bg-slate-700 col-span-2 sm:col-span-2 flex flex-col justify-center">
        <p class="text-xs text-slate-500">% Presença</p>
        <p class="text-xl font-semibold text-slate-900 dark:text-white mt-0.5">{{ pctPresenca }}%</p>
      </div>
    </div>

    <!-- Lista de alunos -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Alunos da turma</h2>
      </div>
      <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="a in alunos" :key="a.id" class="px-5 py-3 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" :style="{ backgroundColor: a.cor }">{{ iniciais(a.nome) }}</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ a.nome }}</p>
            <p class="text-xs text-slate-500">Frequência no bimestre: {{ a.freqBim }}%</p>
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <button
              v-for="o in opcoes"
              :key="o.value"
              @click="a.status = o.value"
              class="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
              :class="a.status === o.value ? o.activeClass : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'"
            >
              {{ o.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Histograma de frequência da turma -->
    <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
      <h2 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Frequência por aluno no bimestre</h2>
      <div class="flex items-end gap-1.5 h-32">
        <div v-for="a in alunos" :key="a.id" class="flex-1 flex flex-col items-center gap-1 group">
          <span class="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{{ a.freqBim }}%</span>
          <div
            class="w-full rounded-t-md transition-colors"
            :class="a.freqBim >= 90 ? 'bg-emerald-500' : a.freqBim >= 75 ? 'bg-amber-400' : 'bg-red-500'"
            :style="{ height: a.freqBim + '%' }"
          ></div>
          <span class="text-[9px] text-slate-400 truncate w-full text-center">{{ a.nome.split(' ')[0] }}</span>
        </div>
      </div>
      <div class="flex items-center gap-4 mt-4 text-xs">
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-emerald-500"></span>≥ 90%</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-amber-400"></span>75–89%</span>
        <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-red-500"></span>&lt; 75%</span>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
type Status = 'presente' | 'falta' | 'atraso' | 'justificado'

const turma = ref('3º Ano A — Manhã')
const data  = ref('2026-05-14')
const aula  = ref('1º horário — Matemática')

const opcoes: { value: Status; label: string; activeClass: string }[] = [
  { value: 'presente',    label: 'P',  activeClass: 'bg-emerald-500 text-white' },
  { value: 'falta',       label: 'F',  activeClass: 'bg-red-500 text-white'     },
  { value: 'atraso',      label: 'A',  activeClass: 'bg-amber-500 text-white'   },
  { value: 'justificado', label: 'J',  activeClass: 'bg-blue-500 text-white'    },
]

const alunos = ref<{ id: number; nome: string; cor: string; status: Status; freqBim: number }[]>([
  { id: 1, nome: 'Lucas Fernandes',       cor: '#6366f1', status: 'presente',    freqBim: 96 },
  { id: 2, nome: 'Maria Eduarda Souza',   cor: '#ec4899', status: 'presente',    freqBim: 98 },
  { id: 3, nome: 'João Pedro Albuquerque',cor: '#10b981', status: 'falta',       freqBim: 78 },
  { id: 4, nome: 'Sofia Mendes Lima',     cor: '#f59e0b', status: 'presente',    freqBim: 92 },
  { id: 5, nome: 'Heitor Costa',          cor: '#3b82f6', status: 'atraso',      freqBim: 84 },
  { id: 6, nome: 'Alice Ribeiro',         cor: '#8b5cf6', status: 'presente',    freqBim: 94 },
  { id: 7, nome: 'Gustavo Henrique',      cor: '#06b6d4', status: 'justificado', freqBim: 89 },
  { id: 8, nome: 'Beatriz Almeida',       cor: '#f43f5e', status: 'presente',    freqBim: 91 },
  { id: 9, nome: 'Helena Tavares',        cor: '#a855f7', status: 'presente',    freqBim: 73 },
  { id: 10, nome: 'Felipe Andrade',       cor: '#84cc16', status: 'presente',    freqBim: 88 },
])

function contar(s: Status): number { return alunos.value.filter(a => a.status === s).length }

const pctPresenca = computed(() => {
  const total = alunos.value.length
  const presentes = alunos.value.filter(a => a.status === 'presente' || a.status === 'atraso').length
  return Math.round(presentes / total * 100)
})

function marcarTodos(s: Status) { alunos.value.forEach(a => (a.status = s)) }

function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}
</script>
