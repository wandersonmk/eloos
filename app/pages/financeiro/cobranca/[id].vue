<template>
  <div class="flex flex-col gap-6 max-w-5xl">

    <!-- Header -->
    <div class="flex items-center gap-3">
      <NuxtLink to="/financeiro/receber" class="w-9 h-9 flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Cobrança #{{ route.params.id }}</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Mensalidade — Abril/2026 · Em atraso há 34 dias</p>
      </div>
      <span class="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">Atrasado</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Coluna esquerda — detalhes -->
      <div class="lg:col-span-2 flex flex-col gap-4">

        <!-- Fatura visual -->
        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
            <p class="text-xs uppercase tracking-widest opacity-75">Eloos · Colégio Centro</p>
            <p class="text-lg font-semibold mt-1">Fatura — Abril/2026</p>
          </div>
          <div class="p-6 grid grid-cols-2 gap-5">
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-400">Aluno</p>
              <p class="text-sm font-medium text-slate-900 dark:text-white mt-1">Heitor Costa</p>
              <p class="text-xs text-slate-500">Matrícula 2026-0005 · 2º Ano A</p>
            </div>
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-400">Responsável financeiro</p>
              <p class="text-sm font-medium text-slate-900 dark:text-white mt-1">Patrícia Costa Almeida</p>
              <p class="text-xs text-slate-500">CPF 321.654.987-00</p>
            </div>
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-400">Vencimento original</p>
              <p class="text-sm font-medium text-slate-900 dark:text-white mt-1">10/04/2026</p>
            </div>
            <div>
              <p class="text-[10px] uppercase tracking-widest text-slate-400">Vencimento atualizado</p>
              <p class="text-sm font-medium text-red-600 mt-1">10/04/2026 · +34 dias</p>
            </div>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700 p-6">
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Composição</p>
            <table class="w-full text-sm">
              <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                <tr class="text-slate-700 dark:text-slate-300"><td class="py-2.5">Mensalidade — 2º Ano A</td><td class="py-2.5 text-right tabular-nums">R$ 1.480,00</td></tr>
                <tr class="text-amber-600"><td class="py-2.5">Juros (1% a.m.)</td><td class="py-2.5 text-right tabular-nums">R$ 16,40</td></tr>
                <tr class="text-amber-600"><td class="py-2.5">Multa (2%)</td><td class="py-2.5 text-right tabular-nums">R$ 29,60</td></tr>
              </tbody>
              <tfoot class="border-t-2 border-slate-200 dark:border-slate-700">
                <tr class="text-slate-900 dark:text-white font-semibold text-base">
                  <td class="pt-3">Total</td>
                  <td class="pt-3 text-right tabular-nums">R$ 1.526,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </article>

        <!-- Histórico -->
        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Histórico</h2>
          <ol class="relative border-l border-slate-200 dark:border-slate-700 ml-3">
            <li v-for="h in historico" :key="h.id" class="ml-6 pb-4 last:pb-0">
              <span class="absolute -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800" :class="h.cor"></span>
              <p class="text-xs text-slate-500">{{ h.data }}</p>
              <p class="text-sm text-slate-800 dark:text-slate-200">{{ h.acao }}</p>
            </li>
          </ol>
        </article>
      </div>

      <!-- Coluna direita — ações -->
      <div class="flex flex-col gap-4">
        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-3">
          <p class="text-[10px] uppercase tracking-widest text-slate-400">Ações</p>
          <BaseButton size="md" block>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/></svg>
            Gerar boleto / 2ª via
          </BaseButton>
          <BaseButton variant="outline" size="md" block>Enviar lembrete por WhatsApp</BaseButton>
          <BaseButton variant="outline" size="md" block>Enviar recibo por e-mail</BaseButton>
          <BaseButton variant="ghost" size="md" block>Dar baixa manual</BaseButton>
        </article>

        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Código PIX (copia e cola)</p>
          <div class="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-3 text-[11px] font-mono text-slate-700 dark:text-slate-300 break-all leading-relaxed">
            00020126580014BR.GOV.BCB.PIX0136a629534e-7693-4f1f-a3a5-f1f9b9d5e520...
          </div>
          <button class="mt-3 text-xs text-indigo-600 hover:underline">Copiar código</button>
        </article>

        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Atalhos</p>
          <NuxtLink to="/alunos/5" class="text-xs text-indigo-600 hover:underline block">→ Perfil do aluno</NuxtLink>
          <NuxtLink to="/responsaveis" class="text-xs text-indigo-600 hover:underline block mt-1">→ Responsável financeiro</NuxtLink>
          <NuxtLink to="/financeiro/receber" class="text-xs text-indigo-600 hover:underline block mt-1">→ Outras cobranças</NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const historico = [
  { id: 1, data: '10/04/2026', acao: 'Boleto gerado e enviado para o e-mail do responsável.',        cor: 'bg-indigo-500' },
  { id: 2, data: '11/04/2026', acao: 'Lembrete automático (régua de cobrança — 1 dia após vencimento).', cor: 'bg-amber-400' },
  { id: 3, data: '20/04/2026', acao: 'Lembrete por WhatsApp enviado.',                                   cor: 'bg-amber-400' },
  { id: 4, data: '02/05/2026', acao: 'Contato realizado pela secretaria. Responsável solicitou prazo.',  cor: 'bg-slate-400' },
  { id: 5, data: '14/05/2026', acao: 'Juros e multa aplicados automaticamente.',                          cor: 'bg-red-500' },
]
</script>
