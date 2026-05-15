<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Lançamento de Notas</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Grid de avaliações por bimestre · {{ turma }} · {{ disciplina }}</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md">Importar planilha</BaseButton>
        <BaseButton size="md">Salvar e fechar bimestre</BaseButton>
      </div>
    </div>

    <!-- Filtros -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      <select v-model="turma" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>3º Ano A — Manhã</option>
        <option>2º Ano A — Manhã</option>
      </select>
      <select v-model="disciplina" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>Matemática</option>
        <option>Português</option>
        <option>Ciências</option>
      </select>
      <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
        <button v-for="b in [1,2,3,4]" :key="b" @click="bimestre = b"
          class="flex-1 h-8 rounded-md text-xs font-medium transition-colors"
          :class="bimestre === b ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'">
          {{ b }}º Bim
        </button>
      </div>
    </div>

    <!-- Resumo do bimestre -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
        <p class="text-xs text-slate-500">Média da turma</p>
        <p class="text-xl font-semibold text-slate-900 dark:text-white mt-0.5">{{ mediaTurma.toFixed(1) }}</p>
      </div>
      <div class="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
        <p class="text-xs text-slate-500">Acima da média</p>
        <p class="text-xl font-semibold text-emerald-600 mt-0.5">{{ acima }}</p>
      </div>
      <div class="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
        <p class="text-xs text-slate-500">Em recuperação</p>
        <p class="text-xl font-semibold text-amber-600 mt-0.5">{{ recuperacao }}</p>
      </div>
      <div class="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
        <p class="text-xs text-slate-500">Não lançadas</p>
        <p class="text-xl font-semibold text-slate-400 mt-0.5">{{ pendentes }}</p>
      </div>
    </div>

    <!-- Grid de notas -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="text-left font-semibold px-5 py-3 sticky left-0 bg-slate-50 dark:bg-slate-900/50 z-10">Aluno</th>
              <th v-for="av in avaliacoes" :key="av.id" class="text-center font-semibold px-3 py-3">
                <div>{{ av.nome }}</div>
                <div class="text-[9px] text-slate-400 normal-case font-normal mt-0.5">peso {{ av.peso }} · máx {{ av.maximo }}</div>
              </th>
              <th class="text-center font-semibold px-5 py-3 bg-indigo-50 dark:bg-indigo-900/20">Média</th>
              <th class="text-center font-semibold px-5 py-3">Situação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="(a, idx) in alunos" :key="a.id" class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
              <td class="px-5 py-2.5 sticky left-0 bg-white dark:bg-slate-800 z-10">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold" :style="{ backgroundColor: a.cor }">{{ iniciais(a.nome) }}</div>
                  <span class="text-sm text-slate-900 dark:text-white">{{ a.nome }}</span>
                </div>
              </td>
              <td v-for="(av, i) in avaliacoes" :key="av.id" class="px-2 py-2 text-center">
                <input
                  v-model.number="a.notas[i]"
                  type="number"
                  step="0.1"
                  min="0"
                  :max="av.maximo"
                  class="w-16 h-9 text-center rounded-md border bg-white dark:bg-slate-700 text-sm font-medium tabular-nums"
                  :class="corNota(a.notas[i], av.maximo)"
                />
              </td>
              <td class="px-5 py-2.5 text-center bg-indigo-50/50 dark:bg-indigo-900/10">
                <span class="text-sm font-semibold tabular-nums" :class="mediaAluno(idx) >= 6 ? 'text-emerald-600' : 'text-red-600'">
                  {{ mediaAluno(idx).toFixed(1) }}
                </span>
              </td>
              <td class="px-5 py-2.5 text-center">
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  :class="mediaAluno(idx) >= 7
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : mediaAluno(idx) >= 5
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'"
                >
                  {{ mediaAluno(idx) >= 7 ? 'aprovado' : mediaAluno(idx) >= 5 ? 'recuperação' : 'reprovado' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const turma      = ref('3º Ano A — Manhã')
const disciplina = ref('Matemática')
const bimestre   = ref(2)

const avaliacoes = [
  { id: 1, nome: 'Prova 1',    peso: 1, maximo: 10 },
  { id: 2, nome: 'Trabalho',   peso: 1, maximo: 10 },
  { id: 3, nome: 'Prova 2',    peso: 2, maximo: 10 },
  { id: 4, nome: 'Participação',peso: 1, maximo: 10 },
]

const alunos = ref([
  { id: 1, nome: 'Lucas Fernandes',       cor: '#6366f1', notas: [8.5, 9.0, 8.0, 9.5] },
  { id: 2, nome: 'Maria Eduarda',         cor: '#ec4899', notas: [9.5, 9.5, 9.0, 10]  },
  { id: 3, nome: 'João Pedro Albuquerque',cor: '#10b981', notas: [5.0, 6.0, 4.5, 5.5] },
  { id: 4, nome: 'Sofia Mendes',          cor: '#f59e0b', notas: [7.5, 8.0, 8.5, 8.0] },
  { id: 5, nome: 'Heitor Costa',          cor: '#3b82f6', notas: [6.0, 6.5, 5.5, 7.0] },
  { id: 6, nome: 'Alice Ribeiro',         cor: '#8b5cf6', notas: [8.0, 8.5, 9.0, 9.0] },
  { id: 7, nome: 'Gustavo Henrique',      cor: '#06b6d4', notas: [7.0, 7.5, 7.0, 8.0] },
  { id: 8, nome: 'Beatriz Almeida',       cor: '#f43f5e', notas: [9.0, 8.5, 9.5, 9.0] },
  { id: 9, nome: 'Helena Tavares',        cor: '#a855f7', notas: [4.0, 5.0, 3.5, 4.5] },
  { id: 10,nome: 'Felipe Andrade',        cor: '#84cc16', notas: [8.0, 7.5, 8.5, 8.0] },
])

function mediaAluno(idx: number): number {
  const a = alunos.value[idx]!
  const pesoTotal = avaliacoes.reduce((s, av) => s + av.peso, 0)
  const soma = a.notas.reduce((s, n, i) => s + (n ?? 0) * avaliacoes[i]!.peso, 0)
  return soma / pesoTotal
}

const mediaTurma  = computed(() => alunos.value.reduce((s, _, i) => s + mediaAluno(i), 0) / alunos.value.length)
const acima        = computed(() => alunos.value.filter((_, i) => mediaAluno(i) >= 7).length)
const recuperacao  = computed(() => alunos.value.filter((_, i) => mediaAluno(i) >= 5 && mediaAluno(i) < 7).length)
const pendentes    = computed(() => alunos.value.filter(a => a.notas.some(n => n === null || n === undefined)).length)

function corNota(n: number | null | undefined, max: number): string {
  if (n === null || n === undefined) return 'border-slate-200 dark:border-slate-600 text-slate-400'
  const pct = n / max
  if (pct >= 0.7) return 'border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10'
  if (pct >= 0.5) return 'border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/10'
  return 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10'
}

function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}
</script>
