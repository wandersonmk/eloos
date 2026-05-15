<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Caixa e Bancos</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Saldos das contas e movimentações financeiras.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md">Transferir entre contas</BaseButton>
        <BaseButton size="md">+ Lançamento manual</BaseButton>
      </div>
    </div>

    <!-- Cards das contas -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <article
        v-for="c in contas"
        :key="c.id"
        @click="contaSelecionada = c.id"
        class="rounded-xl border p-5 flex flex-col gap-3 cursor-pointer transition-all"
        :class="contaSelecionada === c.id
          ? 'bg-white border-indigo-500 ring-2 ring-indigo-100 dark:bg-slate-800 dark:ring-indigo-900/40'
          : 'bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600'"
      >
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-semibold" :style="{ backgroundColor: c.cor }">{{ c.sigla }}</div>
          <span v-if="c.principal" class="text-[10px] font-semibold text-amber-500">★ Principal</span>
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ c.nome }}</p>
          <p class="text-[10px] text-slate-400 mt-0.5">{{ c.detalhe }}</p>
        </div>
        <div>
          <p class="text-xl font-semibold tabular-nums" :class="c.saldo >= 0 ? 'text-slate-900 dark:text-white' : 'text-red-600'">
            R$ {{ c.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
          </p>
        </div>
      </article>
    </div>

    <!-- Resumo do mês + Extrato -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

      <!-- Resumo -->
      <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Maio/2026</h2>
        <div class="flex flex-col gap-3 text-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span class="text-slate-600 dark:text-slate-300">Entradas</span>
            </div>
            <span class="font-medium tabular-nums text-emerald-600">+ R$ 48.750,00</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-500"></span>
              <span class="text-slate-600 dark:text-slate-300">Saídas</span>
            </div>
            <span class="font-medium tabular-nums text-red-600">− R$ 22.450,00</span>
          </div>
          <div class="border-t border-slate-200 dark:border-slate-700 pt-3 flex items-center justify-between">
            <span class="text-slate-900 dark:text-white font-semibold">Resultado</span>
            <span class="text-lg font-semibold tabular-nums text-slate-900 dark:text-white">R$ 26.300,00</span>
          </div>
        </div>
        <div class="h-32 rounded-lg overflow-hidden -mx-1">
          <ChartArea />
        </div>
        <BaseButton variant="outline" size="sm" block>Ver demonstrativo completo</BaseButton>
      </article>

      <!-- Extrato -->
      <article class="xl:col-span-2 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Extrato — {{ contaAtual.nome }}</h2>
          <button class="text-xs text-indigo-600 hover:underline">Conciliar</button>
        </div>
        <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
          <div v-for="m in movimentos" :key="m.id" class="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30">
            <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                 :class="m.tipo === 'entrada' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'">
              <svg v-if="m.tipo === 'entrada'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"/></svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ m.descricao }}</p>
              <p class="text-xs text-slate-500">{{ m.data }} · {{ m.categoria }}</p>
            </div>
            <span class="text-sm font-semibold tabular-nums" :class="m.tipo === 'entrada' ? 'text-emerald-600' : 'text-red-600'">
              {{ m.tipo === 'entrada' ? '+' : '−' }} R$ {{ m.valor.toLocaleString('pt-BR') }}
            </span>
            <span v-if="m.conciliado" class="text-emerald-500" title="Conciliado">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
            </span>
            <span v-else class="text-amber-400" title="Pendente de conciliação">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v4l3 2"/></svg>
            </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const contaSelecionada = ref(1)

const contas = ref([
  { id: 1, nome: 'Banco do Brasil',  sigla: 'BB', detalhe: 'Ag 1234 · CC 56789-0',  saldo: 84320.45, cor: '#facc15', principal: true },
  { id: 2, nome: 'Itaú',             sigla: 'IT', detalhe: 'Ag 5678 · CC 12345-6',  saldo: 12450.00, cor: '#f97316', principal: false },
  { id: 3, nome: 'Caixa Econômica',  sigla: 'CX', detalhe: 'Op 013 · CC 99887-7',   saldo: 3210.50,  cor: '#3b82f6', principal: false },
  { id: 4, nome: 'Dinheiro em caixa',sigla: '₿', detalhe: 'Caixa físico — Centro',  saldo: 480.00,   cor: '#10b981', principal: false },
])

const contaAtual = computed(() => contas.value.find(c => c.id === contaSelecionada.value) ?? contas.value[0]!)

const movimentos = [
  { id: 1, descricao: 'PIX recebido — Roberta Fernandes',  data: '13/05',  categoria: 'Mensalidade', tipo: 'entrada', valor: 1450, conciliado: true },
  { id: 2, descricao: 'Boleto pago — Maria Eduarda Souza', data: '12/05',  categoria: 'Mensalidade', tipo: 'entrada', valor: 1480, conciliado: true },
  { id: 3, descricao: 'Pagamento — Enel SP',                data: '10/05', categoria: 'Utilidades',  tipo: 'saida',   valor: 2840, conciliado: true },
  { id: 4, descricao: 'Salários — folha de maio',           data: '05/05', categoria: 'Pessoal',     tipo: 'saida',   valor: 18500, conciliado: true },
  { id: 5, descricao: 'PIX recebido — Paulo Souza',         data: '04/05', categoria: 'Mensalidade', tipo: 'entrada', valor: 2930, conciliado: false },
  { id: 6, descricao: 'Transferência → Itaú',               data: '03/05', categoria: 'Transferência',tipo: 'saida',  valor: 5000, conciliado: true },
  { id: 7, descricao: 'Aluguel — Imobiliária Brasil',       data: '02/05', categoria: 'Imóvel',      tipo: 'saida',   valor: 4200, conciliado: true },
]
</script>
