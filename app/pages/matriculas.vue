<template>
  <div class="flex flex-col gap-6">

    <!-- Cabeçalho -->
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Matrículas</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ano letivo {{ anoLetivo }} · {{ matriculas.length }} matrículas
          <span v-if="escolaId !== 'todas'"> · {{ escolaSelecionada?.nome_escola }}</span>
        </p>
        <p class="text-xs text-slate-400 mt-1">
          <Icon name="lucide:info" class="w-3 h-3 inline-block -mt-0.5" />
          Matrículas são criadas automaticamente ao cadastrar um aluno. Aqui você acompanha status e gerencia.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model.number="anoLetivo"
          class="h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 text-sm text-slate-700 dark:text-slate-200"
        >
          <option v-for="a in anosLetivos" :key="a" :value="a">{{ a }}</option>
        </select>
        <NuxtLink to="/alunos/novo">
          <BaseButton size="md">
            <Icon name="lucide:user-plus" class="w-4 h-4" />
            Cadastrar aluno
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Filtro de escolas -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-[10px] uppercase tracking-widest text-slate-400">Unidade / Escola</p>
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
            <span class="block text-[10px] font-normal opacity-60">{{ matriculas.length }} matrículas</span>
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
            <span class="block text-[10px] font-normal opacity-60">{{ contarPorEscola(e.id) }} matrículas</span>
          </span>
        </button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div v-for="k in kpis" :key="k.label" class="rounded-xl border p-5 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p class="text-xs text-slate-500 dark:text-slate-400">{{ k.label }}</p>
        <p class="text-2xl font-semibold tracking-tight mt-1" :class="k.color">{{ k.v }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-slate-500">
      <Icon name="lucide:loader-2" class="w-5 h-5 mx-auto mb-2 animate-spin" />
      Carregando matrículas...
    </div>

    <!-- Empty state -->
    <div v-else-if="matriculasFiltradas.length === 0" class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-12 text-center">
      <Icon name="lucide:clipboard-list" class="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
      <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Nenhuma matrícula encontrada</p>
      <p class="text-xs text-slate-500 mt-1">
        As matrículas aparecem aqui automaticamente após o cadastro de cada aluno.
      </p>
      <NuxtLink to="/alunos/novo">
        <BaseButton size="md" class="mt-4">
          <Icon name="lucide:user-plus" class="w-4 h-4" /> Cadastrar aluno
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Lista -->
    <div v-else class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="text-left font-semibold px-5 py-3">Aluno</th>
              <th class="text-left font-semibold px-5 py-3">Turma</th>
              <th class="text-left font-semibold px-5 py-3">Responsável</th>
              <th class="text-left font-semibold px-5 py-3">Mensalidade</th>
              <th class="text-left font-semibold px-5 py-3">Contrato</th>
              <th class="text-left font-semibold px-5 py-3">Status</th>
              <th class="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr
              v-for="m in matriculasFiltradas"
              :key="m.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
            >
              <td class="px-5 py-3 cursor-pointer" @click="navigateTo(`/alunos/${m.aluno_id}`)">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" :style="{ backgroundColor: m.cor }">{{ iniciais(m.aluno_nome ?? '') }}</div>
                  <div class="min-w-0">
                    <p class="font-medium text-slate-900 dark:text-white truncate">{{ m.aluno_nome ?? '—' }}</p>
                    <p class="text-xs text-slate-500">{{ m.numero || m.aluno_matricula || '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300 cursor-pointer" @click="navigateTo(`/alunos/${m.aluno_id}`)">{{ m.turma_nome || '—' }}</td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300 cursor-pointer" @click="navigateTo(`/alunos/${m.aluno_id}`)">{{ m.responsavel_nome || '—' }}</td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300 tabular-nums cursor-pointer" @click="navigateTo(`/alunos/${m.aluno_id}`)">
                <span v-if="m.tabela_preco_mensalidade != null">R$ {{ Number(m.tabela_preco_mensalidade).toLocaleString('pt-BR') }}</span>
                <span v-else class="text-slate-400">—</span>
              </td>
              <td class="px-5 py-3 cursor-pointer" @click="navigateTo(`/alunos/${m.aluno_id}`)">
                <span v-if="m.status_contrato === 'assinado'" class="inline-flex items-center gap-1 text-xs text-emerald-600">
                  <Icon name="lucide:check" class="w-3.5 h-3.5" /> Assinado
                </span>
                <span v-else-if="m.status_contrato === 'enviado'" class="inline-flex items-center gap-1 text-xs text-amber-600">Aguardando assinatura</span>
                <span v-else class="inline-flex items-center gap-1 text-xs text-slate-500">Não enviado</span>
              </td>
              <td class="px-5 py-3 cursor-pointer" @click="navigateTo(`/alunos/${m.aluno_id}`)">
                <span
                  class="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  :class="{
                    'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400': m.status_matricula === 'confirmada',
                    'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400':         m.status_matricula === 'docs_pendentes',
                    'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400':     m.status_matricula === 'em_analise',
                    'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300':           m.status_matricula === 'cancelada',
                  }"
                >{{ STATUS_MATRICULA_LABEL[m.status_matricula] }}</span>
              </td>
              <td class="px-5 py-3 text-right">
                <button
                  type="button"
                  @click.stop="confirmarExclusao(m)"
                  class="inline-flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  :title="`Excluir matrícula de ${m.aluno_nome}`"
                  :aria-label="`Excluir matrícula de ${m.aluno_nome}`"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de confirmação de exclusão -->
    <div v-if="excluindo" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click.self="cancelarExclusao">
      <div class="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div class="p-6">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0">
              <Icon name="lucide:alert-triangle" class="w-6 h-6" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-semibold text-slate-900 dark:text-white">Excluir matrícula?</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
                A matrícula de <span class="font-medium">{{ excluindo.aluno_nome }}</span> no ano letivo {{ excluindo.ano_letivo }} será removida.
              </p>
              <p class="text-xs text-slate-500 mt-3">
                O aluno permanece cadastrado, mas ficará <span class="font-medium">sem matrícula</span> até uma nova ser criada (via cadastro do aluno).
              </p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2 bg-slate-50 dark:bg-slate-900/40 rounded-b-2xl">
          <BaseButton variant="ghost" size="md" :disabled="salvandoExclusao" @click="cancelarExclusao">Cancelar</BaseButton>
          <BaseButton size="md" :disabled="salvandoExclusao" @click="executarExclusao" class="!bg-red-600 hover:!bg-red-700">
            <Icon v-if="salvandoExclusao" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            <Icon v-else name="lucide:trash-2" class="w-4 h-4" />
            Excluir matrícula
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import {
  useMatriculas,
  STATUS_MATRICULA_LABEL,
  type MatriculaRecord,
} from '~/composables/useMatriculas'
import type { Database, StatusMatricula } from '~/types/database.types'

const supabase = useSupabaseClient<Database>()
const { listar: listarMatriculas, remover: removerMatricula } = useMatriculas()

const anoLetivo  = ref<number>(new Date().getFullYear())
const anosLetivos = computed(() => {
  const atual = new Date().getFullYear()
  return [atual - 1, atual, atual + 1]
})

const escolas       = ref<{ id: string; nome_escola: string }[]>([])
const escolaId      = ref<string | 'todas'>('todas')
const matriculas    = ref<MatriculaRecord[]>([])
const loading       = ref(true)

const escolaSelecionada = computed(() =>
  escolaId.value === 'todas' ? null : escolas.value.find(e => e.id === escolaId.value) ?? null,
)

const matriculasFiltradas = computed(() => {
  if (escolaId.value === 'todas') return matriculas.value
  return matriculas.value.filter(m => m.escola_id === escolaId.value)
})

const kpis = computed(() => {
  const m = matriculasFiltradas.value
  const c = (s: StatusMatricula) => m.filter(x => x.status_matricula === s).length
  return [
    { label: 'Confirmadas',     v: c('confirmada'),     color: 'text-emerald-500' },
    { label: 'Aguardando docs', v: c('docs_pendentes'), color: 'text-amber-500' },
    { label: 'Em análise',      v: c('em_analise'),     color: 'text-indigo-500' },
    { label: 'Canceladas',      v: c('cancelada'),      color: 'text-slate-400' },
  ]
})

function contarPorEscola(id: string): number {
  return matriculas.value.filter(m => m.escola_id === id).length
}

// ─── Helpers de UI ────────────────────────────────────────────────────────
const PALETTE = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#14b8a6', '#f43f5e']
function corPorSeed(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}
function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 0) return '?'
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}
function siglaEscola(nome: string): string {
  const partes = nome.replace(/\b(unidade|—|-)\b/gi, '').trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return nome.slice(0, 2).toUpperCase()
  if (partes.length === 1) return partes[0]!.slice(0, 2).toUpperCase()
  return (partes[0]![0]! + partes[partes.length - 1]![0]!).toUpperCase()
}
function corEscola(id: string): string { return corPorSeed(id) }

// ─── Carregamento ─────────────────────────────────────────────────────────
async function recarregar() {
  loading.value = true
  try {
    matriculas.value = await listarMatriculas({ anoLetivo: anoLetivo.value })
  } catch (e: any) {
    toast.error(`Erro ao carregar matrículas: ${e?.message ?? ''}`)
  } finally {
    loading.value = false
  }
}

async function carregarEscolas() {
  const { data, error } = await supabase
    .from('escolas')
    .select('id, nome_escola')
    .order('nome_escola')
  if (error) { toast.error(`Erro ao carregar escolas: ${error.message}`); return }
  escolas.value = data ?? []
}

onMounted(async () => {
  await carregarEscolas()
  await recarregar()
})
watch(anoLetivo, () => recarregar())

// ─── Exclusão ─────────────────────────────────────────────────────────────
const excluindo = ref<MatriculaRecord | null>(null)
const salvandoExclusao = ref(false)

function confirmarExclusao(m: MatriculaRecord) {
  excluindo.value = m
}
function cancelarExclusao() {
  if (salvandoExclusao.value) return
  excluindo.value = null
}

async function executarExclusao() {
  if (!excluindo.value) return
  const m = excluindo.value
  salvandoExclusao.value = true
  try {
    await removerMatricula(m.id)
    // Limpa turma_id e tabela_preco_id do aluno (fica "sem matrícula")
    await supabase
      .from('alunos')
      .update({ turma_id: null, tabela_preco_id: null, forma_pagamento: null })
      .eq('id', m.aluno_id)
    toast.success('Matrícula excluída.', {
      description: `${m.aluno_nome} agora está sem matrícula. Reative editando o cadastro do aluno.`,
    })
    excluindo.value = null
    await recarregar()
  } catch (e: any) {
    toast.error(`Erro ao excluir matrícula: ${e?.message ?? ''}`)
  } finally {
    salvandoExclusao.value = false
  }
}
</script>
