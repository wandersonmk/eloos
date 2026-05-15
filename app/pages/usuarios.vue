<template>
  <div class="flex flex-col gap-6">

    <!-- ═════ Cabeçalho ═════ -->
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Gestão de Usuários</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Administradores, coordenadores, professores e secretaria com acesso ao sistema. Professores são vinculados a unidades e turmas específicas.
        </p>
      </div>
      <BaseButton size="md" @click="abrirNovo">
        <Icon name="lucide:user-plus" class="w-4 h-4" />
        Novo usuário
      </BaseButton>
    </div>

    <!-- ═════ Filtros ═════ -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-3">
      <FormGrid :cols="4">
        <BaseInput v-model="filtros.busca" label="Buscar" placeholder="Nome, e-mail ou CPF...">
          <template #prefix>
            <Icon name="lucide:search" class="w-3.5 h-3.5" />
          </template>
        </BaseInput>

        <BaseSelect
          v-model="filtros.tipo"
          label="Perfil"
          placeholder="Todos os perfis"
          :options="filtroTipoOpts"
        />

        <BaseSelect
          v-model="filtros.escola"
          label="Unidade"
          placeholder="Todas as unidades"
          :options="filtroEscolaOpts"
        />

        <BaseSelect
          v-model="filtros.status"
          label="Status"
          placeholder="Todos"
          :options="[
            { label: 'Ativos',   value: 'ativo'    },
            { label: 'Inativos', value: 'inativo'  },
            { label: 'Suspensos',value: 'suspenso' },
          ]"
        />
      </FormGrid>

      <div v-if="hasFiltro" class="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[12px] text-slate-500 dark:text-slate-400">
          <span class="font-semibold text-slate-700 dark:text-slate-200">{{ filtrados.length }}</span>
          {{ filtrados.length === 1 ? 'resultado' : 'resultados' }} de {{ usuarios.length }} usuários
        </p>
        <button type="button" @click="limparFiltros" class="text-[12px] text-indigo-600 dark:text-indigo-400 hover:underline">
          Limpar filtros
        </button>
      </div>
    </div>

    <!-- ═════ Tabela ═════ -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div v-if="loading" class="px-5 py-12 text-center text-sm text-slate-500">
        <Icon name="lucide:loader-2" class="w-5 h-5 mx-auto mb-2 animate-spin" />
        Carregando usuários...
      </div>

      <div v-else-if="!filtrados.length" class="px-5 py-12 text-center">
        <Icon name="lucide:users-round" class="w-8 h-8 mx-auto mb-2 text-slate-300" />
        <p class="text-sm text-slate-500">Nenhum usuário encontrado para os filtros selecionados.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="text-left font-semibold px-4 py-3">Usuário</th>
              <th class="text-left font-semibold px-3 py-3">Perfil</th>
              <th class="text-left font-semibold px-3 py-3">Cargo</th>
              <th class="text-left font-semibold px-3 py-3">Unidades / Turmas</th>
              <th class="text-left font-semibold px-3 py-3">Status</th>
              <th class="px-3 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="u in filtrados" :key="u.id" class="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors align-top">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0" :style="{ backgroundColor: u.cor ?? '#6366f1' }">{{ iniciais(u.nome) }}</div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ u.nome }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ u.email }}</p>
                    <p v-if="u.cpf" class="text-[11px] text-slate-400 tabular-nums">{{ u.cpf }}</p>
                  </div>
                </div>
              </td>

              <td class="px-3 py-3">
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full" :class="tipoUsuarioStyle(u.tipo_usuario)">
                  {{ tipoUsuarioLabel(u.tipo_usuario) }}
                </span>
                <div v-if="u.tipo_usuario === 'professor' && u.disciplinas.length" class="flex flex-wrap gap-1 mt-1.5">
                  <span
                    v-for="d in u.disciplinas.slice(0, 3)"
                    :key="d"
                    class="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                  >{{ d }}</span>
                  <span v-if="u.disciplinas.length > 3" class="text-[10px] text-slate-400">+{{ u.disciplinas.length - 3 }}</span>
                </div>
              </td>

              <td class="px-3 py-3 text-slate-600 dark:text-slate-300 text-xs max-w-[180px] truncate">{{ u.cargo || '—' }}</td>

              <td class="px-3 py-3">
                <div v-if="u.escolas.length" class="flex flex-col gap-1.5">
                  <div v-for="e in u.escolas" :key="e.id" class="flex flex-col gap-1">
                    <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 self-start">
                      <Icon name="lucide:school" class="w-3 h-3" />
                      {{ e.nome_escola }}
                    </span>
                    <div v-if="u.tipo_usuario === 'professor'" class="flex flex-wrap gap-1 ml-4">
                      <span
                        v-for="t in turmasDoUsuarioPorEscola(u, e.id)"
                        :key="t.id"
                        class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >{{ t.nome }}<span v-if="t.turno" class="opacity-70"> · {{ t.turno }}</span></span>
                      <span v-if="!turmasDoUsuarioPorEscola(u, e.id).length" class="text-[10px] text-slate-400 italic">sem turma</span>
                    </div>
                  </div>
                </div>
                <span v-else class="text-[11px] text-slate-400">— Sem vínculo</span>
              </td>

              <td class="px-3 py-3">
                <span class="inline-flex items-center gap-1.5 text-xs">
                  <span class="w-1.5 h-1.5 rounded-full" :class="u.status === 'ativo' ? 'bg-emerald-500' : u.status === 'suspenso' ? 'bg-amber-500' : 'bg-slate-300'"></span>
                  {{ u.status === 'ativo' ? 'Ativo' : u.status === 'suspenso' ? 'Suspenso' : 'Inativo' }}
                </span>
              </td>

              <td class="px-3 py-3 text-right">
                <button
                  type="button"
                  @click="abrirEdicao(u)"
                  class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Editar"
                >
                  <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═════ Matriz de Permissões (editável) ═════ -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
      <div class="flex items-center justify-between mb-1">
        <div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Permissões por perfil</h2>
          <p class="text-xs text-slate-500 mt-0.5">Clique em cada célula para alternar entre <span class="font-medium text-emerald-600">completo</span> → <span class="font-medium text-amber-600">leitura</span> → <span class="font-medium text-slate-500">sem acesso</span>.</p>
        </div>
        <div v-if="permLoading" class="text-xs text-slate-400 inline-flex items-center gap-1.5">
          <Icon name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
          Carregando...
        </div>
      </div>

      <div class="overflow-x-auto mt-3">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <th class="text-left font-semibold px-3 py-2">Módulo</th>
              <th
                v-for="p in PERFIS_EDITAVEIS"
                :key="p.value"
                class="text-center font-semibold px-3 py-2"
              >{{ p.label }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="m in MODULOS" :key="m.key" class="text-slate-700 dark:text-slate-300">
              <td class="px-3 py-2.5 font-medium">{{ m.label }}</td>
              <td v-for="p in PERFIS_EDITAVEIS" :key="p.value" class="text-center">
                <button
                  type="button"
                  @click="alternarPermissao(m.key, p.value)"
                  :disabled="permSaving === `${m.key}-${p.value}`"
                  class="inline-flex items-center justify-center w-24 h-7 rounded-md text-[11px] font-semibold transition-colors disabled:opacity-50"
                  :class="nivelClasse(nivelDe(m.key, p.value))"
                  :title="`Atual: ${nivelLabel(nivelDe(m.key, p.value))} · Clique para alternar`"
                >
                  <Icon :name="nivelIcon(nivelDe(m.key, p.value))" class="w-3.5 h-3.5" />
                  <span class="ml-1">{{ nivelLabel(nivelDe(m.key, p.value)) }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═════ MODAL — Edição / criação ═════ -->
    <BaseModal
      v-model="modalOpen"
      :title="editId ? `Editar — ${form.nome || 'Usuário'}` : 'Novo usuário'"
      :subtitle="editId ? 'Atualize dados, vínculos com unidades e turmas designadas.' : 'Cadastre um novo profissional. O e-mail será o login do sistema.'"
      size="lg"
    >
      <template #icon>
        <Icon :name="editId ? 'lucide:pencil' : 'lucide:user-plus'" class="w-4 h-4" />
      </template>

      <form class="flex flex-col gap-4" @submit.prevent="salvar">
        <FormSection title="Identificação" dense>
          <FormGrid :cols="2">
            <BaseInput v-model="form.nome"      label="Nome completo" placeholder="Ex.: Maria Silva" required />
            <BaseInput v-model="form.cpf"       label="CPF"           placeholder="000.000.000-00" />
            <BaseInput v-model="form.email"     label="E-mail (login)" type="email" placeholder="usuario@eloos.com" required />
            <BaseInput v-model="form.telefone"  label="Telefone"      placeholder="(00) 00000-0000" />
            <BaseInput v-model="form.cargo"     label="Cargo"         placeholder="Ex.: Coordenadora Pedagógica" hint="Texto livre. Útil para descrever o cargo dentro da escola." />
            <BaseSelect
              v-model="form.tipo_usuario"
              label="Perfil de acesso"
              :options="TIPOS_USUARIO"
              required
            />
          </FormGrid>
        </FormSection>

        <FormSection v-if="form.tipo_usuario === 'professor'" title="Atuação acadêmica" dense>
          <BaseCheckboxGroup
            v-model="form.disciplinas"
            label="Disciplinas que leciona"
            :options="DISCIPLINAS_OPTS"
            hint="Selecione todas as disciplinas que o professor leciona"
          />
        </FormSection>

        <FormSection title="Vínculo com unidades" subtitle="Selecione as unidades às quais o usuário terá acesso. Para professores, escolha também as turmas." dense>
          <BaseCheckboxGroup
            v-model="form.escolas"
            label="Unidades vinculadas"
            :options="escolasOpts"
            required
            hint="O usuário só verá dados das unidades selecionadas"
          />
        </FormSection>

        <FormSection
          v-if="escolasSelecionadas.length"
          title="Turmas designadas por unidade"
          :subtitle="form.tipo_usuario === 'professor'
            ? 'Para cada unidade vinculada, escolha quais turmas o professor pode acessar.'
            : 'Opcional — selecione turmas específicas que este usuário poderá acompanhar dentro de cada unidade.'"
          dense
        >
          <div class="flex flex-col gap-3">
            <div
              v-for="e in escolasSelecionadas"
              :key="e.id"
              class="rounded-lg border border-slate-200 dark:border-slate-700 p-3"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="text-[12px] font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Icon name="lucide:school" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  {{ e.nome_escola }}
                </p>
                <span class="text-[10px] text-slate-500 dark:text-slate-400">
                  {{ turmasSelContagem(e.id) }} / {{ turmasOpts(e.id).length }} selecionadas
                </span>
              </div>
              <BaseCheckboxGroup
                v-if="turmasOpts(e.id).length"
                v-model="form.turmas"
                :options="turmasOpts(e.id)"
              />
              <p v-else class="text-[11px] text-slate-400 italic">Esta unidade ainda não tem turmas cadastradas.</p>
            </div>
          </div>

          <div
            v-if="form.tipo_usuario === 'professor' && form.turmas.length === 0"
            class="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-3 py-2 flex items-start gap-2"
          >
            <Icon name="lucide:triangle-alert" class="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p class="text-[12px] text-amber-700 dark:text-amber-300 leading-snug">
              Sem turmas designadas, o professor entra no sistema mas <strong>não verá nenhum aluno</strong>. Selecione pelo menos uma turma.
            </p>
          </div>
        </FormSection>

        <FormSection title="Status" dense>
          <FormGrid :cols="2">
            <BaseSelect
              v-model="form.status"
              label="Situação"
              :options="[
                { label: 'Ativo',    value: 'ativo'    },
                { label: 'Inativo',  value: 'inativo'  },
                { label: 'Suspenso', value: 'suspenso' },
              ]"
            />
          </FormGrid>
        </FormSection>
      </form>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalOpen = false">Cancelar</BaseButton>
        <BaseButton size="sm" :disabled="salvando" @click="salvar">
          <Icon v-if="salvando" name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
          <Icon v-else          name="lucide:check"    class="w-3.5 h-3.5" />
          {{ editId ? 'Salvar alterações' : 'Cadastrar usuário' }}
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { TipoUsuario, StatusGeral } from '~/types/database.types'
import {
  useUsuarios, TIPOS_USUARIO, DISCIPLINAS_OPTS, tipoUsuarioLabel, tipoUsuarioStyle,
  type UsuarioRecord, type EscolaResumo, type TurmaResumo,
} from '~/composables/useUsuarios'
import { usePermissoes, proximoNivel, MODULOS, PERFIS_EDITAVEIS, type Nivel } from '~/composables/usePermissoes'

definePageMeta({ title: 'Usuários' })

const { listar, atualizar, listarEscolas, listarTurmas } = useUsuarios()
const { listar: listarPerm, atualizarNivel } = usePermissoes()

// ─── Estado de dados ──────────────────────────────────────────────────────────
const usuarios = ref<UsuarioRecord[]>([])
const escolas  = ref<EscolaResumo[]>([])
const turmas   = ref<TurmaResumo[]>([])
const loading  = ref(true)

async function recarregar() {
  loading.value = true
  try {
    const [u, e, t] = await Promise.all([listar(), listarEscolas(), listarTurmas()])
    usuarios.value = u
    escolas.value  = e
    turmas.value   = t
  } catch (err) {
    console.error(err)
    toast.error('Erro ao carregar usuários.')
  } finally {
    loading.value = false
  }
}

// ─── Filtros ──────────────────────────────────────────────────────────────────
const filtros = ref({
  busca:  '',
  tipo:   '' as '' | TipoUsuario,
  escola: '',
  status: '' as '' | StatusGeral,
})

const hasFiltro = computed(() => !!(filtros.value.busca || filtros.value.tipo || filtros.value.escola || filtros.value.status))

const filtroTipoOpts = computed(() => TIPOS_USUARIO.map(t => ({ label: t.label, value: t.value })))
const filtroEscolaOpts = computed(() => escolas.value.map(e => ({ label: e.nome_escola, value: e.id })))

const filtrados = computed(() => {
  const q = filtros.value.busca.trim().toLowerCase()
  return usuarios.value.filter(u => {
    if (q && !u.nome.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !(u.cpf ?? '').includes(q)) return false
    if (filtros.value.tipo   && u.tipo_usuario !== filtros.value.tipo)   return false
    if (filtros.value.status && u.status       !== filtros.value.status) return false
    if (filtros.value.escola && !u.escolas.some(e => e.id === filtros.value.escola)) return false
    return true
  })
})

function limparFiltros() {
  filtros.value = { busca: '', tipo: '', escola: '', status: '' }
}

function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}

function turmasDoUsuarioPorEscola(u: UsuarioRecord, escolaId: string): TurmaResumo[] {
  return u.turmas.filter(t => t.escola_id === escolaId)
}

// ─── Modal cadastro/edição ────────────────────────────────────────────────────
const modalOpen = ref(false)
const editId    = ref<string | null>(null)
const salvando  = ref(false)
const form      = ref(novoForm())

function novoForm() {
  return {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cargo: '',
    tipo_usuario: 'professor' as TipoUsuario,
    disciplinas: [] as string[],
    escolas:     [] as string[],
    turmas:      [] as string[],
    status: 'ativo' as StatusGeral,
  }
}

const escolasOpts = computed(() =>
  escolas.value.map(e => ({ label: e.nome_escola, value: e.id }))
)

const escolasSelecionadas = computed(() =>
  form.value.escolas
    .map(id => escolas.value.find(e => e.id === id))
    .filter((e): e is EscolaResumo => !!e)
)

function turmasOpts(escolaId: string) {
  return turmas.value
    .filter(t => t.escola_id === escolaId)
    .map(t => ({
      label: `${t.nome}${t.turno ? ` · ${t.turno}` : ''}`,
      value: t.id,
    }))
}

function turmasSelContagem(escolaId: string): number {
  const ids = new Set(turmas.value.filter(t => t.escola_id === escolaId).map(t => t.id))
  return form.value.turmas.filter(t => ids.has(t)).length
}

// Quando o usuário desmarca uma escola, remove as turmas dela
watch(() => form.value.escolas, (novas) => {
  const validas = new Set(turmas.value.filter(t => novas.includes(t.escola_id)).map(t => t.id))
  form.value.turmas = form.value.turmas.filter(t => validas.has(t))
}, { deep: true })

// Quando o tipo de usuário sai de "professor", limpa disciplinas (turmas continuam aplicáveis a outros perfis)
watch(() => form.value.tipo_usuario, (novo) => {
  if (novo !== 'professor') {
    form.value.disciplinas = []
  }
})

function abrirNovo() {
  editId.value = null
  form.value   = novoForm()
  modalOpen.value = true
}

function abrirEdicao(u: UsuarioRecord) {
  editId.value = u.id
  form.value = {
    nome:         u.nome,
    cpf:          u.cpf ?? '',
    email:        u.email,
    telefone:     u.telefone ?? '',
    cargo:        u.cargo ?? '',
    tipo_usuario: u.tipo_usuario,
    disciplinas:  [...u.disciplinas],
    escolas:      u.escolas.map(e => e.id),
    turmas:       u.turmas.map(t => t.id),
    status:       u.status,
  }
  modalOpen.value = true
}

async function salvar() {
  if (!form.value.nome.trim())    return toast.error('Informe o nome.')
  if (!form.value.email.trim())   return toast.error('Informe o e-mail.')
  if (!form.value.escolas.length) return toast.error('Selecione pelo menos uma unidade.')

  if (!editId.value) {
    toast.info('Criação de novos usuários ainda depende de endpoint server-side com chave service role. Por enquanto, edite os usuários já cadastrados.')
    return
  }

  salvando.value = true
  try {
    await atualizar(
      editId.value,
      {
        nome:         form.value.nome.trim(),
        email:        form.value.email.trim(),
        telefone:     form.value.telefone || null,
        cpf:          form.value.cpf      || null,
        cargo:        form.value.cargo    || null,
        tipo_usuario: form.value.tipo_usuario,
        disciplinas:  form.value.disciplinas,
        status:       form.value.status,
      },
      form.value.escolas,
      form.value.turmas,
    )
    toast.success('Usuário atualizado com sucesso!')
    modalOpen.value = false
    await recarregar()
  } catch (err: any) {
    console.error(err)
    toast.error(`Erro ao salvar: ${err?.message ?? 'desconhecido'}`)
  } finally {
    salvando.value = false
  }
}

// ─── Matriz de Permissões ─────────────────────────────────────────────────────
const permissoesData = ref<Awaited<ReturnType<typeof listarPerm>>>([])
const permLoading    = ref(true)
const permSaving     = ref<string | null>(null)

async function recarregarPermissoes() {
  permLoading.value = true
  try {
    permissoesData.value = await listarPerm()
  } catch (err) {
    console.error(err)
    toast.error('Erro ao carregar permissões.')
  } finally {
    permLoading.value = false
  }
}

function nivelDe(modulo: string, tipo: TipoUsuario): Nivel {
  const p = permissoesData.value.find(x => x.modulo === modulo && x.tipo_usuario === tipo)
  return (p?.nivel ?? 'none') as Nivel
}

async function alternarPermissao(modulo: string, tipo: TipoUsuario) {
  const reg = permissoesData.value.find(x => x.modulo === modulo && x.tipo_usuario === tipo)
  if (!reg) {
    toast.error('Permissão não encontrada para este perfil/módulo.')
    return
  }
  const novo = proximoNivel((reg.nivel ?? 'none') as Nivel)
  const key  = `${modulo}-${tipo}`
  permSaving.value = key
  try {
    await atualizarNivel(reg.id, novo)
    reg.nivel = novo
  } catch (err: any) {
    console.error(err)
    toast.error(`Sem permissão para alterar (${err?.message ?? 'erro'}).`)
  } finally {
    permSaving.value = null
  }
}

function nivelLabel(n: Nivel): string {
  return n === 'full' ? 'Completo' : n === 'read' ? 'Leitura' : 'Bloqueado'
}

function nivelIcon(n: Nivel): string {
  return n === 'full' ? 'lucide:check-circle-2' : n === 'read' ? 'lucide:eye' : 'lucide:x-circle'
}

function nivelClasse(n: Nivel): string {
  if (n === 'full') return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50'
  if (n === 'read') return 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50'
  return 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  recarregar()
  recarregarPermissoes()
})
</script>
