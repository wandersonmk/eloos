<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Alunos</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {{ totalAlunos }} alunos no total · {{ totalAtivos }} ativos
          <span v-if="escolaId !== 'todas'"> · filtrando {{ escolaSelecionada?.nome_escola }}</span>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="md" :disabled="true" title="Em breve">
          <Icon name="lucide:download" class="w-4 h-4" />
          Exportar
        </BaseButton>
        <NuxtLink to="/alunos/novo">
          <BaseButton size="md">
            <Icon name="lucide:plus" class="w-4 h-4" />
            Novo aluno
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Filtro de unidade -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-[10px] uppercase tracking-widest text-slate-400">1. Unidade / Escola</p>
        <NuxtLink to="/unidades" class="text-[11px] text-indigo-600 hover:underline">Gerenciar unidades</NuxtLink>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          @click="escolaId = 'todas'"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5 border"
          :class="escolaId === 'todas'
            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 hover:border-slate-300 dark:text-slate-300'"
        >
          <span class="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-500">
            <Icon name="lucide:layout-grid" class="w-3.5 h-3.5" />
          </span>
          <span class="text-left">
            Todas as escolas
            <span class="block text-[10px] font-normal opacity-60">{{ totalAlunos }} alunos</span>
          </span>
        </button>
        <button
          v-for="e in escolas"
          :key="e.id"
          @click="escolaId = e.id"
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5 border"
          :class="escolaId === e.id
            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 hover:border-slate-300 dark:text-slate-300'"
        >
          <span class="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-semibold" :style="{ backgroundColor: corEscola(e.id) }">{{ siglaEscola(e.nome_escola) }}</span>
          <span class="text-left">
            {{ e.nome_escola }}
            <span class="block text-[10px] font-normal opacity-60">{{ contarPorEscola(e.id) }} alunos</span>
          </span>
        </button>
      </div>
    </div>

    <!-- Filtros internos -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4">
      <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">2. Filtros{{ escolaId !== 'todas' ? ` — ${escolaSelecionada?.nome_escola}` : '' }}</p>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div class="md:col-span-2 flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-100 dark:bg-slate-700">
          <Icon name="lucide:search" class="w-4 h-4 text-slate-400" />
          <input v-model="busca" type="text" placeholder="Buscar por nome, matrícula ou documento..." class="bg-transparent flex-1 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none" />
        </div>
        <select v-model="turmaFiltro" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm text-slate-700 dark:text-slate-200">
          <option value="">Todas as turmas</option>
          <option v-for="t in turmasDoFiltro" :key="t" :value="t">{{ t }}</option>
        </select>
        <select v-model="statusFiltro" class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm text-slate-700 dark:text-slate-200">
          <option value="">Todos os status</option>
          <option value="ativo">Ativos</option>
          <option value="inativo">Inativos</option>
          <option value="suspenso">Suspensos</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-slate-500">
      <Icon name="lucide:loader-2" class="w-5 h-5 mx-auto mb-2 animate-spin" />
      Carregando alunos...
    </div>

    <!-- Empty -->
    <div v-else-if="alunosFiltrados.length === 0" class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-12 text-center">
      <Icon name="lucide:users-round" class="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
      <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Nenhum aluno encontrado</p>
      <p class="text-xs text-slate-500 mt-1">
        {{ alunos.length === 0
          ? 'Comece cadastrando seu primeiro aluno.'
          : 'Tente ajustar os filtros acima.' }}
      </p>
      <NuxtLink v-if="alunos.length === 0" to="/alunos/novo">
        <BaseButton size="md" class="mt-4">
          <Icon name="lucide:plus" class="w-4 h-4" /> Novo aluno
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Tabela -->
    <div v-else class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="text-left font-semibold px-5 py-3">Aluno</th>
              <th class="text-left font-semibold px-5 py-3">Matrícula</th>
              <th v-if="escolaId === 'todas'" class="text-left font-semibold px-5 py-3">Escola</th>
              <th class="text-left font-semibold px-5 py-3">Turma</th>
              <th class="text-left font-semibold px-5 py-3">Responsável</th>
              <th class="text-left font-semibold px-5 py-3">Status</th>
              <th class="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr
              v-for="a in alunosFiltrados"
              :key="a.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer"
              @click="navigateTo(`/alunos/${a.id}`)"
            >
              <td class="px-5 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" :style="{ backgroundColor: a.cor }">{{ iniciais(a.nome) }}</div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ a.nome }}</p>
                    <p class="text-xs text-slate-500">{{ a.idade != null ? `${a.idade} anos` : 'Idade não informada' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3 font-mono text-xs">
                <p class="text-slate-700 dark:text-slate-200">{{ a.matricula || '—' }}</p>
                <p class="text-slate-400 dark:text-slate-500">{{ a.documento || '—' }}</p>
              </td>
              <td v-if="escolaId === 'todas'" class="px-5 py-3">
                <span class="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: corEscola(a.escola_id) }"></span>
                  {{ a.escola_nome || '—' }}
                </span>
              </td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300">{{ a.turma_nome || '—' }}</td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300">{{ a.responsavel_nome || '—' }}</td>
              <td class="px-5 py-3">
                <span class="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <span class="w-1.5 h-1.5 rounded-full" :class="{
                    'bg-emerald-500': a.status === 'ativo',
                    'bg-slate-300':   a.status === 'inativo',
                    'bg-amber-400':   a.status === 'suspenso',
                  }"></span>
                  {{ a.status }}
                </span>
              </td>
              <td class="px-5 py-3 text-right">
                <Icon name="lucide:chevron-right" class="w-4 h-4 text-slate-400" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-5 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
        <p class="text-xs text-slate-500">Mostrando {{ alunosFiltrados.length }} de {{ alunos.length }} alunos</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useAlunos, type AlunoRecord } from '~/composables/useAlunos'
import type { Database } from '~/types/database.types'

const supabase = useSupabaseClient<Database>()
const { listar: listarAlunos } = useAlunos()

const alunos     = ref<AlunoRecord[]>([])
const escolas    = ref<{ id: string; nome_escola: string }[]>([])
const loading    = ref(true)

const busca        = ref('')
const turmaFiltro  = ref('')
const statusFiltro = ref('')
const escolaId     = ref<string | 'todas'>('todas')

const escolaSelecionada = computed(() =>
  escolaId.value === 'todas' ? null : escolas.value.find(e => e.id === escolaId.value) ?? null,
)

const totalAlunos = computed(() => alunos.value.length)
const totalAtivos = computed(() => alunos.value.filter(a => a.status === 'ativo').length)

const turmasDoFiltro = computed(() => {
  const fonte = escolaId.value === 'todas' ? alunos.value : alunos.value.filter(a => a.escola_id === escolaId.value)
  return Array.from(new Set(fonte.map(a => a.turma_nome).filter((t): t is string => !!t))).sort()
})

const alunosFiltrados = computed(() => {
  const q = busca.value.toLowerCase().trim()
  return alunos.value.filter(a => {
    if (escolaId.value !== 'todas' && a.escola_id !== escolaId.value) return false
    if (turmaFiltro.value  && a.turma_nome !== turmaFiltro.value)     return false
    if (statusFiltro.value && a.status     !== statusFiltro.value)    return false
    if (q
      && !a.nome.toLowerCase().includes(q)
      && !(a.matricula ?? '').toLowerCase().includes(q)
      && !(a.documento ?? '').toLowerCase().includes(q)) return false
    return true
  })
})

function contarPorEscola(id: string): number {
  return alunos.value.filter(a => a.escola_id === id).length
}

function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 0) return '?'
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}

const PALETTE = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6', '#14b8a6', '#f43f5e']
function corEscola(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}
function siglaEscola(nome: string): string {
  const partes = nome.replace(/\b(unidade|—|-)\b/gi, '').trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return nome.slice(0, 2).toUpperCase()
  if (partes.length === 1) return partes[0]!.slice(0, 2).toUpperCase()
  return (partes[0]![0]! + partes[partes.length - 1]![0]!).toUpperCase()
}

// Limpa a turma se ela não pertencer mais à escola selecionada
watch(escolaId, () => {
  if (turmaFiltro.value && !turmasDoFiltro.value.includes(turmaFiltro.value)) {
    turmaFiltro.value = ''
  }
})

async function carregarTudo() {
  loading.value = true
  try {
    const [alunosResp, { data: esc, error: escErr }] = await Promise.all([
      listarAlunos(),
      supabase.from('escolas').select('id, nome_escola').order('nome_escola'),
    ])
    alunos.value = alunosResp
    if (escErr) throw escErr
    escolas.value = esc ?? []
  } catch (e: any) {
    toast.error(`Erro ao carregar alunos: ${e?.message ?? ''}`)
  } finally {
    loading.value = false
  }
}

onMounted(carregarTudo)
</script>
