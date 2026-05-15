<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Contas a Pagar</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Despesas operacionais, fornecedores e folha de pagamento.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md">Importar XML</BaseButton>
        <BaseButton size="md">+ Nova despesa</BaseButton>
      </div>
    </div>

    <!-- Cards de resumo -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">A pagar no mês</p>
        <p class="text-2xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">R$ 31.200</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">Pago</p>
        <p class="text-2xl font-semibold text-emerald-600 mt-1 tabular-nums">R$ 22.450</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 ring-2 ring-amber-200 dark:ring-amber-900/50">
        <p class="text-xs text-slate-500 dark:text-slate-400">Vence em até 7 dias</p>
        <p class="text-2xl font-semibold text-amber-600 mt-1 tabular-nums">R$ 8.130</p>
        <p class="text-[11px] text-amber-600 mt-1">3 despesas — atenção!</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500 dark:text-slate-400">Atrasadas</p>
        <p class="text-2xl font-semibold text-red-600 mt-1 tabular-nums">R$ 620</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

      <!-- Tabela -->
      <div class="xl:col-span-2 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Despesas — Maio/2026</h2>
          <div class="flex items-center gap-1">
            <button v-for="t in tipos" :key="t" class="text-xs px-2 py-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">{{ t }}</button>
          </div>
        </div>
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="text-left font-semibold px-5 py-3">Despesa</th>
              <th class="text-left font-semibold px-5 py-3">Categoria</th>
              <th class="text-left font-semibold px-5 py-3">Vencimento</th>
              <th class="text-right font-semibold px-5 py-3">Valor</th>
              <th class="text-left font-semibold px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="d in despesas" :key="d.id" class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
              <td class="px-5 py-3">
                <p class="font-medium text-slate-900 dark:text-white">{{ d.titulo }}</p>
                <p class="text-xs text-slate-500">{{ d.fornecedor }}</p>
              </td>
              <td class="px-5 py-3">
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full" :class="d.catCor">{{ d.categoria }}</span>
              </td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300 text-xs">{{ d.vencimento }}</td>
              <td class="px-5 py-3 text-right font-medium tabular-nums text-slate-900 dark:text-white">R$ {{ d.valor.toLocaleString('pt-BR') }}</td>
              <td class="px-5 py-3">
                <span
                  class="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  :class="{
                    'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400': d.status === 'pago',
                    'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400': d.status === 'a vencer',
                    'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400': d.status === 'atrasado',
                  }"
                >{{ d.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sidebar fornecedores -->
      <div class="flex flex-col gap-4">
        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Top fornecedores</h2>
            <button class="text-xs text-indigo-600 hover:underline">Ver todos</button>
          </div>
          <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
            <div v-for="f in fornecedores" :key="f.nome" class="flex items-center gap-3 py-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold" :style="{ backgroundColor: f.cor }">{{ f.sigla }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ f.nome }}</p>
                <p class="text-[10px] text-slate-500">{{ f.cnpj }}</p>
              </div>
              <p class="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">R$ {{ f.total.toLocaleString('pt-BR') }}</p>
            </div>
          </div>
        </article>

        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white mb-3">Categorias do mês</h2>
          <div class="flex flex-col gap-2.5">
            <div v-for="cat in categorias" :key="cat.nome">
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="text-slate-600 dark:text-slate-300">{{ cat.nome }}</span>
                <span class="font-medium text-slate-900 dark:text-white tabular-nums">R$ {{ cat.valor.toLocaleString('pt-BR') }}</span>
              </div>
              <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div class="h-full rounded-full" :class="cat.cor" :style="{ width: cat.pct + '%' }"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tipos = ['Todas', 'A vencer', 'Pagas', 'Atrasadas']

const despesas = ref([
  { id: 1, titulo: 'Energia elétrica',         fornecedor: 'Enel SP',              categoria: 'Utilidades',   catCor: 'bg-blue-50 text-blue-600',         vencimento: '15/05/2026', valor: 2840,  status: 'a vencer' },
  { id: 2, titulo: 'Internet corporativa',     fornecedor: 'Vivo Empresas',        categoria: 'Tecnologia',   catCor: 'bg-indigo-50 text-indigo-600',     vencimento: '18/05/2026', valor: 489,   status: 'a vencer' },
  { id: 3, titulo: 'Salários — Maio',          fornecedor: 'Folha de pagamento',   categoria: 'Pessoal',      catCor: 'bg-emerald-50 text-emerald-600',   vencimento: '05/05/2026', valor: 18500, status: 'pago' },
  { id: 4, titulo: 'Material de limpeza',      fornecedor: 'LimpaTudo Distribuidora',categoria: 'Insumos',    catCor: 'bg-amber-50 text-amber-600',       vencimento: '12/05/2026', valor: 620,   status: 'atrasado' },
  { id: 5, titulo: 'Software de gestão',       fornecedor: 'TotvsRM',              categoria: 'Tecnologia',   catCor: 'bg-indigo-50 text-indigo-600',     vencimento: '20/05/2026', valor: 980,   status: 'a vencer' },
  { id: 6, titulo: 'Manutenção predial',       fornecedor: 'JR Manutenções ME',    categoria: 'Manutenção',   catCor: 'bg-purple-50 text-purple-600',     vencimento: '08/05/2026', valor: 1500,  status: 'pago' },
  { id: 7, titulo: 'Aluguel da unidade',       fornecedor: 'Imobiliária Brasil',   categoria: 'Imóvel',       catCor: 'bg-rose-50 text-rose-600',         vencimento: '10/05/2026', valor: 4200,  status: 'pago' },
])

const fornecedores = [
  { nome: 'Folha de pagamento',         sigla: 'FP', cnpj: '—',                  total: 18500, cor: '#10b981' },
  { nome: 'Imobiliária Brasil',         sigla: 'IB', cnpj: '12.345.678/0001-00', total: 4200,  cor: '#f43f5e' },
  { nome: 'Enel SP',                    sigla: 'EN', cnpj: '61.695.731/0001-93', total: 2840,  cor: '#3b82f6' },
  { nome: 'LimpaTudo Distribuidora',    sigla: 'LT', cnpj: '23.456.789/0001-12', total: 620,   cor: '#f59e0b' },
]

const categorias = [
  { nome: 'Pessoal',     valor: 18500, pct: 60, cor: 'bg-emerald-500' },
  { nome: 'Imóvel',      valor: 4200,  pct: 14, cor: 'bg-rose-500' },
  { nome: 'Utilidades',  valor: 2840,  pct: 9,  cor: 'bg-blue-500' },
  { nome: 'Tecnologia',  valor: 1469,  pct: 5,  cor: 'bg-indigo-500' },
  { nome: 'Manutenção',  valor: 1500,  pct: 5,  cor: 'bg-purple-500' },
  { nome: 'Outros',      valor: 2691,  pct: 7,  cor: 'bg-slate-400' },
]
</script>
