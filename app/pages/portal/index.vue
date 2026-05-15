<template>
  <div class="flex flex-col gap-6">

    <!-- Saudação aluno/responsável -->
    <div class="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">
      <p class="text-sm opacity-80">Portal do Responsável</p>
      <h1 class="text-2xl font-semibold mt-1">Olá, Roberta!</h1>
      <p class="text-sm opacity-80 mt-2">Aqui está o resumo do Lucas hoje.</p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p class="text-[10px] uppercase tracking-widest opacity-70">Média atual</p>
          <p class="text-2xl font-semibold mt-1">8,4</p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p class="text-[10px] uppercase tracking-widest opacity-70">Frequência</p>
          <p class="text-2xl font-semibold mt-1">96%</p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p class="text-[10px] uppercase tracking-widest opacity-70">Próxima fatura</p>
          <p class="text-2xl font-semibold mt-1">10/jun</p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p class="text-[10px] uppercase tracking-widest opacity-70">Avisos novos</p>
          <p class="text-2xl font-semibold mt-1">3</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Avisos -->
      <article class="lg:col-span-2 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Avisos recentes</h2>
          <NuxtLink to="/portal/agenda" class="text-xs text-indigo-600 hover:underline">Ver todos</NuxtLink>
        </div>
        <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
          <div v-for="a in avisos" :key="a.id" class="py-3 flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="a.iconBg">
              <svg class="w-4 h-4" :class="a.iconColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="a.icon"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 dark:text-white">{{ a.titulo }}</p>
              <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">{{ a.descricao }}</p>
              <p class="text-[10px] text-slate-400 mt-1.5">{{ a.tempo }}</p>
            </div>
            <span v-if="a.novo" class="w-2 h-2 rounded-full bg-indigo-500 mt-2"></span>
          </div>
        </div>
      </article>

      <!-- Próximas faturas -->
      <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Faturas</h2>
          <NuxtLink to="/portal/financeiro" class="text-xs text-indigo-600 hover:underline">Ver extrato</NuxtLink>
        </div>
        <div class="flex flex-col gap-3">
          <div v-for="f in faturas" :key="f.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs text-slate-500">{{ f.mes }}</p>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full" :class="f.statusClass">{{ f.status }}</span>
            </div>
            <p class="text-base font-semibold text-slate-900 dark:text-white tabular-nums">R$ {{ f.valor.toLocaleString('pt-BR') }}</p>
            <p class="text-[11px] text-slate-500 mt-0.5">Vence {{ f.vencimento }}</p>
            <button v-if="f.status === 'em aberto'" class="mt-2 w-full text-xs font-medium text-indigo-600 hover:underline">Pagar via PIX →</button>
          </div>
        </div>
      </article>
    </div>

    <!-- Notas recentes -->
    <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Notas recentes</h2>
        <NuxtLink to="/portal/boletim" class="text-xs text-indigo-600 hover:underline">Ver boletim completo</NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="n in notasRecentes" :key="n.disciplina" class="rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p class="text-xs text-slate-500">{{ n.disciplina }}</p>
          <p class="text-xs text-slate-400 mt-0.5">{{ n.avaliacao }}</p>
          <p class="text-2xl font-semibold mt-2 tabular-nums" :class="n.nota >= 7 ? 'text-emerald-600' : n.nota >= 5 ? 'text-amber-600' : 'text-red-600'">{{ n.nota.toFixed(1) }}</p>
          <p class="text-[10px] text-slate-400 mt-1">{{ n.data }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const avisos = [
  { id: 1, titulo: 'Reunião de pais — 3º Ano A',     descricao: 'Confirme sua presença para a reunião do dia 20/05 às 19h no auditório.', tempo: 'Há 2 horas', novo: true,  iconBg: 'bg-indigo-50 dark:bg-indigo-900/30', iconColor: 'text-indigo-600',  icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07' },
  { id: 2, titulo: 'Feira de Ciências — adiada',      descricao: 'A feira foi adiada para 15/06 devido a obras no pátio. Novos detalhes em breve.',  tempo: 'Ontem',       novo: true,  iconBg: 'bg-amber-50 dark:bg-amber-900/30',  iconColor: 'text-amber-600',   icon: 'M12 9v3.75m9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374' },
  { id: 3, titulo: 'Cardápio da semana',              descricao: 'Confira o cardápio especial da semana focado em alimentação balanceada.',           tempo: 'Há 2 dias',   novo: true,  iconBg: 'bg-emerald-50 dark:bg-emerald-900/30', iconColor: 'text-emerald-600', icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z' },
  { id: 4, titulo: 'Boletim do 1º bimestre disponível',descricao: 'O boletim do primeiro bimestre já pode ser consultado no portal.',                  tempo: '14/04/2026',  novo: false, iconBg: 'bg-blue-50 dark:bg-blue-900/30',     iconColor: 'text-blue-600',    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25' },
]

const faturas = [
  { id: 1, mes: 'Junho/2026', valor: 1520, vencimento: '10/06/2026', status: 'em aberto', statusClass: 'bg-amber-50 text-amber-600' },
  { id: 2, mes: 'Maio/2026',  valor: 1520, vencimento: '10/05/2026', status: 'pago',      statusClass: 'bg-emerald-50 text-emerald-600' },
  { id: 3, mes: 'Abril/2026', valor: 1520, vencimento: '10/04/2026', status: 'pago',      statusClass: 'bg-emerald-50 text-emerald-600' },
]

const notasRecentes = [
  { disciplina: 'Matemática', avaliacao: 'Prova 2',     nota: 8.5, data: '08/05/2026' },
  { disciplina: 'Português',  avaliacao: 'Trabalho',    nota: 9.5, data: '06/05/2026' },
  { disciplina: 'Ciências',   avaliacao: 'Prova 1',     nota: 7.0, data: '03/05/2026' },
  { disciplina: 'Inglês',     avaliacao: 'Apresentação',nota: 6.5, data: '29/04/2026' },
]
</script>
