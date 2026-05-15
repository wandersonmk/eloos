<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Diário de Classe</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Registre o conteúdo lecionado, atividades aplicadas e observações da aula.</p>
      </div>
      <BaseButton size="md">Salvar registro</BaseButton>
    </div>

    <!-- Seletor de turma/disciplina/data -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="text-[10px] uppercase tracking-widest text-slate-400">Turma</label>
        <select v-model="turma" class="mt-1.5 w-full min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 text-sm">
          <option>3º Ano A — Manhã</option>
          <option>2º Ano A — Manhã</option>
          <option>1º Ano A — Manhã</option>
        </select>
      </div>
      <div>
        <label class="text-[10px] uppercase tracking-widest text-slate-400">Disciplina</label>
        <select v-model="disciplina" class="mt-1.5 w-full min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 text-sm">
          <option>Matemática</option>
          <option>Português</option>
          <option>Ciências</option>
          <option>Geografia</option>
          <option>História</option>
        </select>
      </div>
      <div>
        <label class="text-[10px] uppercase tracking-widest text-slate-400">Data</label>
        <input v-model="data" type="date" class="mt-1.5 w-full min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 text-sm" />
      </div>
      <div>
        <label class="text-[10px] uppercase tracking-widest text-slate-400">Aula nº</label>
        <input v-model="numAula" type="number" class="mt-1.5 w-full min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 text-sm" />
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

      <!-- Formulário -->
      <div class="xl:col-span-2 flex flex-col gap-4">
        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Conteúdo da aula</h2>

          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Conteúdo programático</label>
            <textarea v-model="conteudo" rows="3" placeholder="Ex: Frações equivalentes e operações com frações de mesmo denominador..."
              class="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm"></textarea>
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Metodologia</label>
            <textarea v-model="metodologia" rows="2" placeholder="Aula expositiva com exercícios em duplas..."
              class="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm"></textarea>
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Atividades / Tarefas de casa</label>
            <textarea v-model="atividades" rows="2" placeholder="Páginas 42 a 45 do livro didático..."
              class="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm"></textarea>
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200">Observações da turma</label>
            <textarea v-model="obs" rows="2" placeholder="Turma engajada. João Pedro com dificuldade em frações..."
              class="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-sm"></textarea>
          </div>

          <!-- Anexos -->
          <div>
            <p class="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Anexos</p>
            <button class="w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 py-6 flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
              <span class="text-xs">Adicionar lista de presença, plano de aula ou outros materiais</span>
            </button>
          </div>
        </article>
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-4">
        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Planejamento da semana</p>
          <div class="flex flex-col gap-2 text-xs">
            <div v-for="d in planejamento" :key="d.dia" class="flex items-start gap-2.5">
              <span class="w-12 shrink-0 text-slate-400 font-medium">{{ d.dia }}</span>
              <div class="flex-1">
                <p class="text-slate-700 dark:text-slate-200">{{ d.tema }}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">{{ d.disciplina }}</p>
              </div>
              <svg v-if="d.feito" class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
            </div>
          </div>
        </article>

        <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Atalhos</p>
          <NuxtLink to="/academico/chamada" class="text-xs text-indigo-600 hover:underline block">→ Fazer chamada</NuxtLink>
          <NuxtLink to="/academico/notas" class="text-xs text-indigo-600 hover:underline block mt-1">→ Lançar notas</NuxtLink>
          <NuxtLink to="/academico/boletim" class="text-xs text-indigo-600 hover:underline block mt-1">→ Ver boletim</NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const turma      = ref('3º Ano A — Manhã')
const disciplina = ref('Matemática')
const data       = ref('2026-05-14')
const numAula    = ref('45')
const conteudo    = ref('')
const metodologia = ref('')
const atividades  = ref('')
const obs         = ref('')

const planejamento = [
  { dia: 'Seg', disciplina: 'Matemática', tema: 'Revisão de frações',                     feito: true  },
  { dia: 'Ter', disciplina: 'Português',  tema: 'Substantivos próprios e comuns',         feito: true  },
  { dia: 'Qua', disciplina: 'Matemática', tema: 'Operações com frações',                  feito: false },
  { dia: 'Qui', disciplina: 'Ciências',   tema: 'Sistema solar — apresentações',           feito: false },
  { dia: 'Sex', disciplina: 'História',   tema: 'Brasil colônia — atividade em grupo',    feito: false },
]
</script>
