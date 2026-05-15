<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Contas a Receber</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Mensalidades, taxas e cobranças avulsas do mês.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md">Gerar boletos em lote</BaseButton>
        <BaseButton size="md">+ Nova cobrança</BaseButton>
      </div>
    </div>

    <!-- Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">A receber neste mês</p>
        <p class="text-2xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">R$ 67.380</p>
        <p class="text-xs text-slate-500 mt-1">42 cobranças</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">Recebido</p>
        <p class="text-2xl font-semibold text-emerald-600 mt-1 tabular-nums">R$ 48.750</p>
        <div class="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden"><div class="h-full bg-emerald-500" style="width: 72%"></div></div>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">Em aberto (no prazo)</p>
        <p class="text-2xl font-semibold text-amber-600 mt-1 tabular-nums">R$ 13.420</p>
        <p class="text-xs text-slate-500 mt-1">12 cobranças</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">Atrasadas</p>
        <p class="text-2xl font-semibold text-red-600 mt-1 tabular-nums">R$ 5.210</p>
        <p class="text-xs text-red-500 mt-1">5 cobranças · ↑ 1,2% no mês</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-3 items-center">
      <div class="flex items-center gap-2 rounded-lg px-3 py-2 flex-1 min-w-[220px] bg-slate-100 dark:bg-slate-700">
        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
        <input v-model="busca" type="text" placeholder="Buscar por aluno ou responsável..." class="bg-transparent flex-1 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none" />
      </div>

      <div class="flex items-center gap-1.5">
        <button v-for="s in statusList" :key="s.value" @click="status = s.value"
          class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
          :class="status === s.value ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'"
        >{{ s.label }}</button>
      </div>

      <select v-model="mes" class="h-9 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-xs text-slate-700 dark:text-slate-200">
        <option>Maio 2026</option>
        <option>Abril 2026</option>
        <option>Março 2026</option>
      </select>
    </div>

    <!-- Tabela -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="px-5 py-3"><input type="checkbox" /></th>
              <th class="text-left font-semibold px-5 py-3">Aluno</th>
              <th class="text-left font-semibold px-5 py-3">Descrição</th>
              <th class="text-left font-semibold px-5 py-3">Vencimento</th>
              <th class="text-right font-semibold px-5 py-3">Valor</th>
              <th class="text-left font-semibold px-5 py-3">Status</th>
              <th class="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="c in cobrancas" :key="c.id" class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
              <td class="px-5 py-3"><input type="checkbox" /></td>
              <td class="px-5 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-semibold" :style="{ backgroundColor: c.cor }">{{ iniciais(c.aluno) }}</div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white text-sm">{{ c.aluno }}</p>
                    <p class="text-xs text-slate-500">{{ c.responsavel }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300">{{ c.descricao }}</td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300 text-xs">
                {{ c.vencimento }}
                <span v-if="c.diasAtraso > 0" class="block text-red-500 text-[10px]">{{ c.diasAtraso }} dias em atraso</span>
              </td>
              <td class="px-5 py-3 text-right font-medium tabular-nums text-slate-900 dark:text-white">R$ {{ c.valor.toLocaleString('pt-BR') }}</td>
              <td class="px-5 py-3">
                <span
                  class="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  :class="{
                    'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400': c.status === 'pago',
                    'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400': c.status === 'pendente',
                    'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400': c.status === 'atrasado',
                  }"
                >{{ c.status }}</span>
              </td>
              <td class="px-5 py-3 text-right">
                <NuxtLink :to="`/financeiro/cobranca/${c.id}`" class="text-xs text-indigo-600 hover:underline">Ver detalhes</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const busca = ref('')
const status = ref<'todas' | 'pago' | 'pendente' | 'atrasado'>('todas')
const mes = ref('Maio 2026')

const statusList = [
  { value: 'todas' as const,    label: 'Todas' },
  { value: 'pago' as const,     label: 'Pagas' },
  { value: 'pendente' as const, label: 'Pendentes' },
  { value: 'atrasado' as const, label: 'Atrasadas' },
]

const cobrancas = ref([
  { id: 1, aluno: 'Lucas Fernandes Silva',  responsavel: 'Roberta Fernandes', descricao: 'Mensalidade — Maio/2026',     vencimento: '10/05/2026', valor: 1450, status: 'pago',      diasAtraso: 0,  cor: '#6366f1' },
  { id: 2, aluno: 'Maria Eduarda Souza',     responsavel: 'Paulo Souza',       descricao: 'Mensalidade — Maio/2026',     vencimento: '10/05/2026', valor: 1480, status: 'pago',      diasAtraso: 0,  cor: '#ec4899' },
  { id: 3, aluno: 'João Pedro Albuquerque',  responsavel: 'Marina Albuquerque',descricao: 'Mensalidade — Maio/2026',     vencimento: '10/05/2026', valor: 1520, status: 'pendente',  diasAtraso: 0,  cor: '#10b981' },
  { id: 4, aluno: 'Heitor Costa',            responsavel: 'Patrícia Costa',    descricao: 'Mensalidade — Abril/2026',    vencimento: '10/04/2026', valor: 1480, status: 'atrasado',  diasAtraso: 34, cor: '#3b82f6' },
  { id: 5, aluno: 'Beatriz Almeida Cardoso', responsavel: 'Sérgio Cardoso',    descricao: 'Material didático — 1º sem',  vencimento: '20/05/2026', valor: 620,  status: 'pendente',  diasAtraso: 0,  cor: '#f43f5e' },
  { id: 6, aluno: 'Sofia Mendes Lima',       responsavel: 'Renato Lima',       descricao: 'Mensalidade — Maio/2026',     vencimento: '10/05/2026', valor: 1450, status: 'pago',      diasAtraso: 0,  cor: '#f59e0b' },
  { id: 7, aluno: 'Alice Ribeiro Macedo',    responsavel: 'Tiago Macedo',      descricao: 'Mensalidade — Maio/2026',     vencimento: '15/05/2026', valor: 1450, status: 'atrasado',  diasAtraso: 5,  cor: '#8b5cf6' },
])

function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}
</script>
