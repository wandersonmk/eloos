<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Boletim Acadêmico</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Visão consolidada do desempenho do aluno por bimestre.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md">Enviar para responsável</BaseButton>
        <BaseButton size="md">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/></svg>
          Imprimir
        </BaseButton>
      </div>
    </div>

    <!-- Filtros -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      <select class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>3º Ano A — Manhã</option>
        <option>2º Ano A — Manhã</option>
      </select>
      <select class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>Lucas Fernandes Silva</option>
        <option>Maria Eduarda Souza</option>
        <option>João Pedro Albuquerque</option>
      </select>
      <select class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm">
        <option>Ano letivo 2026</option>
      </select>
    </div>

    <!-- Cabeçalho do aluno -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
      <div class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-semibold" style="background-color: #6366f1">LF</div>
      <div class="flex-1">
        <p class="text-base font-semibold text-slate-900 dark:text-white">Lucas Fernandes Silva</p>
        <p class="text-xs text-slate-500">3º Ano A · Matrícula 2026-0001 · 8 anos</p>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-slate-400">Média geral</p>
          <p class="text-xl font-semibold text-emerald-600 mt-0.5">8,4</p>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-slate-400">Frequência</p>
          <p class="text-xl font-semibold text-slate-900 dark:text-white mt-0.5">96%</p>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-slate-400">Situação</p>
          <p class="text-sm font-semibold text-emerald-600 mt-1">Aprovado</p>
        </div>
      </div>
    </div>

    <!-- Tabela de notas -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
          <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <th class="text-left font-semibold px-5 py-3">Disciplina</th>
            <th v-for="b in [1,2,3,4]" :key="b" class="text-center font-semibold px-5 py-3">{{ b }}º Bim</th>
            <th class="text-center font-semibold px-5 py-3 bg-indigo-50 dark:bg-indigo-900/20">Média anual</th>
            <th class="text-center font-semibold px-5 py-3">Faltas</th>
            <th class="text-center font-semibold px-5 py-3">Situação</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="d in disciplinas" :key="d.nome" class="hover:bg-slate-50 dark:hover:bg-slate-900/30">
            <td class="px-5 py-3 font-medium text-slate-900 dark:text-white">{{ d.nome }}</td>
            <td v-for="(n, i) in d.bimestres" :key="i" class="px-5 py-3 text-center tabular-nums" :class="n >= 7 ? 'text-emerald-600' : n >= 5 ? 'text-amber-600' : 'text-red-600'">
              {{ n.toFixed(1) }}
            </td>
            <td class="px-5 py-3 text-center bg-indigo-50/50 dark:bg-indigo-900/10 font-semibold tabular-nums" :class="d.media >= 7 ? 'text-emerald-700' : d.media >= 5 ? 'text-amber-700' : 'text-red-700'">
              {{ d.media.toFixed(1) }}
            </td>
            <td class="px-5 py-3 text-center text-slate-600 dark:text-slate-300">{{ d.faltas }}</td>
            <td class="px-5 py-3 text-center">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                :class="d.media >= 7 ? 'bg-emerald-50 text-emerald-600' : d.media >= 5 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'">
                {{ d.media >= 7 ? 'aprovado' : d.media >= 5 ? 'recuperação' : 'reprovado' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Observações pedagógicas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Observações da coordenação</p>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Aluno demonstra excelente desempenho em todas as disciplinas, com destaque para Matemática e Português. Apresenta liderança em atividades em grupo. Recomendamos manter o engajamento extracurricular.
        </p>
      </article>
      <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Recomendações ao responsável</p>
        <ul class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-disc pl-5 space-y-1">
          <li>Continuar incentivando a leitura diária (mínimo 20 min).</li>
          <li>Reforçar tabuada do 6 ao 9 — pontos a melhorar em Matemática.</li>
          <li>Comparecer à reunião de pais em 20/05.</li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const disciplinas = [
  { nome: 'Matemática',          bimestres: [8.0, 8.5, 0.0, 0.0], media: 8.25, faltas: 1 },
  { nome: 'Português',           bimestres: [9.0, 9.5, 0.0, 0.0], media: 9.25, faltas: 0 },
  { nome: 'Ciências',            bimestres: [7.5, 8.0, 0.0, 0.0], media: 7.75, faltas: 2 },
  { nome: 'História',            bimestres: [8.5, 8.0, 0.0, 0.0], media: 8.25, faltas: 0 },
  { nome: 'Geografia',           bimestres: [7.0, 7.5, 0.0, 0.0], media: 7.25, faltas: 0 },
  { nome: 'Artes',               bimestres: [9.5, 9.0, 0.0, 0.0], media: 9.25, faltas: 0 },
  { nome: 'Educação Física',     bimestres: [10.0, 9.5, 0.0, 0.0], media: 9.75, faltas: 0 },
  { nome: 'Inglês',              bimestres: [7.0, 6.5, 0.0, 0.0], media: 6.75, faltas: 1 },
]
</script>
