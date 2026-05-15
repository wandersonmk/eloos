<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Boletim e Frequência</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Lucas Fernandes Silva · 3º Ano A · Ano letivo 2026</p>
      </div>
      <BaseButton variant="outline" size="md">Baixar PDF</BaseButton>
    </div>

    <!-- Resumo do aluno -->
    <div class="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
      <div class="grid grid-cols-3 gap-6">
        <div>
          <p class="text-[10px] uppercase tracking-widest opacity-70">Média geral</p>
          <p class="text-3xl font-semibold mt-1">8,4</p>
          <p class="text-xs opacity-80 mt-1">↑ +0,3 vs. 1º bim</p>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest opacity-70">Frequência</p>
          <p class="text-3xl font-semibold mt-1">96%</p>
          <p class="text-xs opacity-80 mt-1">3 faltas no ano</p>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest opacity-70">Situação</p>
          <p class="text-xl font-semibold mt-2">✓ Aprovado</p>
        </div>
      </div>
    </div>

    <!-- Tabs por bimestre -->
    <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1 w-full max-w-md">
      <button v-for="b in [1,2,3,4]" :key="b" @click="bimAtivo = b"
        class="flex-1 h-9 rounded-md text-sm font-medium transition-colors"
        :class="bimAtivo === b ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'">
        {{ b }}º Bimestre
      </button>
    </div>

    <!-- Notas por disciplina -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <article v-for="d in disciplinas" :key="d.nome" class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ d.nome }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ d.professor }}</p>
          </div>
          <span class="text-2xl font-semibold tabular-nums" :class="d.nota >= 7 ? 'text-emerald-600' : d.nota >= 5 ? 'text-amber-600' : 'text-red-600'">{{ d.nota.toFixed(1) }}</span>
        </div>

        <div class="flex items-center justify-between text-xs mb-1.5">
          <span class="text-slate-500">Desempenho</span>
          <span class="text-slate-700 dark:text-slate-300 font-medium">{{ d.nota >= 7 ? 'bom' : d.nota >= 5 ? 'em recuperação' : 'crítico' }}</span>
        </div>
        <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div class="h-full rounded-full transition-all"
            :class="d.nota >= 7 ? 'bg-emerald-500' : d.nota >= 5 ? 'bg-amber-500' : 'bg-red-500'"
            :style="{ width: (d.nota * 10) + '%' }"></div>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
          <div>
            <p class="text-slate-400">Faltas</p>
            <p class="text-slate-700 dark:text-slate-200 font-medium mt-0.5">{{ d.faltas }}</p>
          </div>
          <div>
            <p class="text-slate-400">Aulas</p>
            <p class="text-slate-700 dark:text-slate-200 font-medium mt-0.5">{{ d.aulas }}</p>
          </div>
          <div>
            <p class="text-slate-400">Material</p>
            <button class="text-indigo-600 hover:underline font-medium mt-0.5">{{ d.materiais }} arq.</button>
          </div>
        </div>
      </article>
    </div>

    <!-- Faltas detalhadas -->
    <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
      <h2 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Registro de faltas — {{ bimAtivo }}º bim</h2>
      <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="f in faltas" :key="f.id" class="flex items-center gap-3 py-2.5">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-900 dark:text-white">{{ f.data }}</p>
            <p class="text-xs text-slate-500">{{ f.disciplina }} · {{ f.aula }}</p>
          </div>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            :class="f.tipo === 'justificada' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'">
            {{ f.tipo }}
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const bimAtivo = ref(2)

const disciplinas = [
  { nome: 'Matemática',       professor: 'Prof. Felipe Andrade',   nota: 8.5, faltas: 1, aulas: 24, materiais: 8 },
  { nome: 'Português',        professor: 'Profª. Ana Clara Mendes', nota: 9.5, faltas: 0, aulas: 24, materiais: 12 },
  { nome: 'Ciências',         professor: 'Profª. Mariana Lopes',    nota: 7.0, faltas: 1, aulas: 16, materiais: 5 },
  { nome: 'História',         professor: 'Prof. Carlos E. Souza',   nota: 8.0, faltas: 0, aulas: 12, materiais: 4 },
  { nome: 'Geografia',        professor: 'Prof. Carlos E. Souza',   nota: 7.5, faltas: 0, aulas: 12, materiais: 4 },
  { nome: 'Inglês',           professor: 'Profª. Juliana Castro',   nota: 6.5, faltas: 1, aulas: 12, materiais: 6 },
]

const faltas = [
  { id: 1, data: '12/05/2026', disciplina: 'Matemática', aula: 'Aula 12', tipo: 'justificada' },
  { id: 2, data: '03/05/2026', disciplina: 'Ciências',   aula: 'Aula 8',  tipo: 'falta' },
  { id: 3, data: '22/04/2026', disciplina: 'Inglês',     aula: 'Aula 6',  tipo: 'falta' },
]
</script>
