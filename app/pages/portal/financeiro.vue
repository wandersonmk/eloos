<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Extrato Financeiro</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Mensalidades e taxas do Lucas Fernandes Silva — 3º Ano A</p>
      </div>
      <BaseButton variant="outline" size="md">Baixar extrato (PDF)</BaseButton>
    </div>

    <!-- Resumo -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500">Pago no ano</p>
        <p class="text-2xl font-semibold text-emerald-600 mt-1 tabular-nums">R$ 6.080</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500">Em aberto</p>
        <p class="text-2xl font-semibold text-amber-600 mt-1 tabular-nums">R$ 1.520</p>
      </div>
      <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-xs text-slate-500">Próximo vencimento</p>
        <p class="text-2xl font-semibold text-slate-900 dark:text-white mt-1">10/jun</p>
      </div>
    </div>

    <!-- Próxima fatura — destaque -->
    <article class="rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-900/10 p-6">
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span class="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase">Próxima fatura</span>
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white mt-1">Mensalidade — Junho/2026</h2>
          <p class="text-sm text-slate-500 mt-1">Vence em <strong class="text-slate-700 dark:text-slate-200">10/06/2026</strong> · {{ diasRestantes }} dias restantes</p>
          <p class="text-3xl font-semibold text-slate-900 dark:text-white mt-3 tabular-nums">R$ 1.520,00</p>
        </div>

        <div class="flex flex-col gap-2 min-w-[240px]">
          <BaseButton size="md" block>Pagar com PIX</BaseButton>
          <BaseButton variant="outline" size="md" block>Copiar código de barras</BaseButton>
          <BaseButton variant="ghost" size="sm" block>Baixar boleto PDF</BaseButton>
        </div>
      </div>

      <!-- Código copia e cola -->
      <div class="mt-5 bg-white dark:bg-slate-800 rounded-lg p-4">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-2">PIX — Copia e cola</p>
        <div class="flex items-center gap-3">
          <code class="flex-1 text-[11px] font-mono text-slate-700 dark:text-slate-300 break-all leading-relaxed">
            00020126580014BR.GOV.BCB.PIX0136a629534e-7693-4f1f-a3a5-f1f9b9d5e520520400005303986540515.205802BR5925COL EGIO ELOOS LTDA6009SAO PAULO62070503***6304ABCD
          </code>
          <button class="text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 py-2 rounded-md shrink-0">Copiar</button>
        </div>
      </div>
    </article>

    <!-- Histórico -->
    <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Histórico de pagamentos</h2>
      </div>
      <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="f in faturas" :key="f.id" class="px-5 py-3 flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
               :class="f.status === 'pago' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600'">
            <svg v-if="f.status === 'pago'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v4l3 2"/></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-white">{{ f.titulo }}</p>
            <p class="text-xs text-slate-500">Vencimento {{ f.vencimento }} · {{ f.pago ? `Pago em ${f.pago}` : 'Em aberto' }}</p>
          </div>
          <p class="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">R$ {{ f.valor.toLocaleString('pt-BR') }}</p>
          <button class="text-xs text-indigo-600 hover:underline shrink-0">{{ f.status === 'pago' ? 'Recibo' : 'Ver detalhes' }}</button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const diasRestantes = 27

const faturas = [
  { id: 1, titulo: 'Mensalidade — Junho/2026',  valor: 1520, vencimento: '10/06/2026', pago: '',          status: 'em aberto' },
  { id: 2, titulo: 'Mensalidade — Maio/2026',   valor: 1520, vencimento: '10/05/2026', pago: '08/05/2026',status: 'pago' },
  { id: 3, titulo: 'Mensalidade — Abril/2026',  valor: 1520, vencimento: '10/04/2026', pago: '10/04/2026',status: 'pago' },
  { id: 4, titulo: 'Material didático — 1º sem',valor: 620,  vencimento: '20/03/2026', pago: '18/03/2026',status: 'pago' },
  { id: 5, titulo: 'Mensalidade — Março/2026',  valor: 1520, vencimento: '10/03/2026', pago: '09/03/2026',status: 'pago' },
  { id: 6, titulo: 'Mensalidade — Fevereiro/2026', valor: 1520, vencimento: '10/02/2026', pago: '07/02/2026',status: 'pago' },
  { id: 7, titulo: 'Matrícula 2026',            valor: 1520, vencimento: '20/01/2026', pago: '15/01/2026',status: 'pago' },
]
</script>
