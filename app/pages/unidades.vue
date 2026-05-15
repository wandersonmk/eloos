<template>
  <div class="flex flex-col gap-6">

    <!-- ═════ Cabeçalho ═════ -->
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Gestão de Unidades</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Gerencie as escolas vinculadas à sua conta e as turmas de cada uma.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton size="md" @click="abrirNova">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Nova unidade
        </BaseButton>
      </div>
    </div>

    <!-- ═════ KPIs ═════ -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="rounded-xl border p-5 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p class="text-xs text-slate-500 dark:text-slate-400">Unidades ativas</p>
        <p class="text-2xl font-semibold text-slate-900 dark:text-white mt-1">{{ unidadesAtivas }}</p>
      </div>
      <div class="rounded-xl border p-5 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p class="text-xs text-slate-500 dark:text-slate-400">Alunos totais</p>
        <p class="text-2xl font-semibold text-slate-900 dark:text-white mt-1">{{ totalAlunos.toLocaleString('pt-BR') }}</p>
      </div>
      <div class="rounded-xl border p-5 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p class="text-xs text-slate-500 dark:text-slate-400">Vínculos turma-unidade</p>
        <p class="text-2xl font-semibold text-slate-900 dark:text-white mt-1">{{ totalVinculos }}</p>
        <p class="text-[11px] text-slate-400 mt-1">em {{ unidades.length }} {{ unidades.length === 1 ? 'unidade' : 'unidades' }}</p>
      </div>
    </div>

    <!-- ═════ Loading / empty ═════ -->
    <div v-if="loading" class="text-center py-12 text-slate-500">
      <Icon name="lucide:loader-2" class="w-5 h-5 mx-auto mb-2 animate-spin" />
      Carregando unidades...
    </div>

    <!-- ═════ Cards de unidades ═════ -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <article
        v-for="u in unidades"
        :key="u.id"
        class="rounded-xl border p-5 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 flex flex-col gap-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shrink-0" :style="{ backgroundColor: corDe(u.id) }">
              {{ siglaDe(u.nome_escola) }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">{{ u.nome_escola }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ u.cnpj || '— sem CNPJ' }}</p>
            </div>
          </div>
          <span
            class="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
            :class="u.status === 'ativo'
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'"
          >
            {{ u.status === 'ativo' ? 'Ativa' : 'Inativa' }}
          </span>
        </div>

        <div class="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
          <Icon name="lucide:map-pin" class="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
          <span class="leading-snug">{{ enderecoFormatado(u) || '— endereço não cadastrado' }}</span>
        </div>

        <div v-if="u.telefone || u.email" class="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-1">
          <div v-if="u.telefone" class="flex items-center gap-2">
            <Icon name="lucide:phone" class="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span>{{ u.telefone }}</span>
          </div>
          <div v-if="u.email" class="flex items-center gap-2 min-w-0">
            <Icon name="lucide:mail" class="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span class="truncate">{{ u.email }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
          <div>
            <p class="text-[10px] uppercase tracking-widest text-slate-400">Alunos</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{{ u.alunos_count ?? 0 }}</p>
          </div>
          <div>
            <p class="text-[10px] uppercase tracking-widest text-slate-400">Turmas</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{{ u.turmaIds?.length ?? 0 }}</p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-700">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Turmas vinculadas</p>
          <div v-if="turmasDaUnidade(u).length" class="flex flex-wrap gap-1.5">
            <span
              v-for="t in turmasDaUnidade(u)"
              :key="t.id"
              class="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              <Icon name="lucide:layers" class="w-3 h-3" />
              {{ t.nome }}<span v-if="t.turno" class="opacity-70"> · {{ t.turno }}</span>
            </span>
          </div>
          <p v-else class="text-[11px] text-slate-400 italic">Nenhuma turma vinculada.</p>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <BaseButton variant="outline" size="sm" block @click="editar(u)">
            <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
            Editar
          </BaseButton>
          <button
            @click="removerUnidade(u)"
            class="w-9 h-9 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Remover"
            title="Remover unidade"
          >
            <Icon name="lucide:trash-2" class="w-4 h-4" />
          </button>
        </div>
      </article>

      <button
        type="button"
        @click="abrirNova"
        class="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-5 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors min-h-[260px]"
      >
        <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Icon name="lucide:plus" class="w-6 h-6" />
        </div>
        <p class="text-sm font-medium">Adicionar nova unidade</p>
        <p class="text-xs text-slate-400 max-w-[200px] text-center">Cadastre uma nova escola e suas turmas em poucos minutos.</p>
      </button>
    </div>

    <!-- ═════ MODAL — Nova / editar unidade ═════ -->
    <BaseModal
      v-model="modalAberto"
      :title="modal.modo === 'novo' ? 'Nova unidade' : `Editar — ${modal.form.nome_escola || 'Unidade'}`"
      subtitle="Preencha os dados da unidade, endereço e turmas vinculadas."
      size="lg"
    >
      <template #icon>
        <Icon :name="modal.modo === 'novo' ? 'lucide:school' : 'lucide:pencil'" class="w-4 h-4" />
      </template>

      <form class="flex flex-col gap-4" @submit.prevent="salvar">
        <FormSection title="Dados da unidade" dense>
          <BaseInput v-model="modal.form.nome_escola" label="Nome da escola" placeholder="Colégio Eloos — Unidade X" required />
          <FormGrid :cols="2">
            <div>
              <BaseInput
                :model-value="modal.form.cnpj"
                @update:model-value="onCnpjInput"
                label="CNPJ"
                placeholder="00.000.000/0000-00"
                :class="cnpjErro ? 'has-error' : ''"
              />
              <p v-if="cnpjErro" class="text-[11px] text-red-600 mt-1">{{ cnpjErro }}</p>
            </div>
            <BaseInput
              :model-value="modal.form.telefone"
              @update:model-value="modal.form.telefone = applyPhoneMask($event)"
              label="Telefone"
              placeholder="(11) 3000-0000"
            />
          </FormGrid>
          <BaseInput v-model="modal.form.email" label="E-mail" type="email" placeholder="contato@escola.com.br" />
        </FormSection>

        <FormSection
          title="Endereço"
          subtitle="Informe o CEP primeiro — os demais campos são preenchidos automaticamente."
          dense
        >
          <FormGrid :cols="3">
            <div class="relative">
              <BaseInput
                :model-value="modal.form.cep"
                @update:model-value="onCepInput"
                label="CEP"
                placeholder="00000-000"
              />
              <div v-if="buscandoCep" class="absolute right-2 top-7 text-indigo-500">
                <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              </div>
            </div>
            <div class="col-span-2">
              <BaseInput v-model="modal.form.logradouro" label="Logradouro" placeholder="Rua, avenida..." />
            </div>
          </FormGrid>

          <FormGrid :cols="3">
            <BaseInput v-model="modal.form.numero" label="Número" placeholder="123" />
            <BaseInput v-model="modal.form.bairro" label="Bairro" placeholder="Bairro" />
            <BaseInput
              :model-value="modal.form.estado"
              @update:model-value="modal.form.estado = $event.toUpperCase().slice(0, 2)"
              label="UF"
              placeholder="SP"
              maxlength="2"
            />
          </FormGrid>

          <BaseInput v-model="modal.form.cidade" label="Cidade" placeholder="Cidade" />
        </FormSection>

        <FormSection title="Situação" dense>
          <BaseSelect
            v-model="modal.form.status"
            label="Status"
            :options="[
              { label: 'Ativa',    value: 'ativo'    },
              { label: 'Inativa',  value: 'inativo'  },
              { label: 'Suspensa', value: 'suspenso' },
            ]"
          />
        </FormSection>

        <FormSection
          title="Turmas vinculadas"
          subtitle="Selecione as turmas (cadastradas em Turmas) que esta unidade oferece. A mesma turma pode estar em mais de uma unidade."
          dense
        >
          <div v-if="loadingTurmas" class="text-center py-3 text-sm text-slate-500">
            <Icon name="lucide:loader-2" class="w-4 h-4 mx-auto animate-spin" />
            Carregando turmas...
          </div>

          <div v-else-if="!turmasOpts.length" class="rounded-lg bg-amber-50/60 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-3 py-3 flex items-start gap-2">
            <Icon name="lucide:triangle-alert" class="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-[12px] text-amber-700 dark:text-amber-300 leading-snug">
                Você ainda não tem turmas cadastradas. Cadastre as turmas primeiro para vinculá-las às unidades.
              </p>
              <NuxtLink to="/turmas" class="inline-flex items-center gap-1 mt-2 text-[12px] font-medium text-amber-700 dark:text-amber-300 hover:underline">
                <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
                Ir para Turmas
              </NuxtLink>
            </div>
          </div>

          <div v-else>
            <BaseCheckboxGroup
              v-model="modal.form.turmaIds"
              :options="turmasOpts"
              :cols="2"
              :label="`${modal.form.turmaIds.length} de ${turmasOpts.length} selecionadas`"
              hint="Escolha as turmas que esta unidade vai oferecer"
            />
            <div class="mt-3 text-right">
              <NuxtLink to="/turmas" class="text-[12px] text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                <Icon name="lucide:plus" class="w-3 h-3" />
                Cadastrar nova turma
              </NuxtLink>
            </div>
          </div>
        </FormSection>
      </form>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalAberto = false">Cancelar</BaseButton>
        <BaseButton size="sm" :disabled="salvando" @click="salvar">
          <Icon v-if="salvando" name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
          <Icon v-else          name="lucide:check"    class="w-3.5 h-3.5" />
          {{ modal.modo === 'novo' ? 'Cadastrar unidade' : 'Salvar alterações' }}
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { StatusGeral } from '~/types/database.types'
import { applyCepMask, cepDigits, buscarCep } from '~/utils/cep'
import { applyCnpjMask, cnpjDigits, isCnpjValido } from '~/utils/cnpj'
import { applyPhoneMask } from '~/utils/phone'
import { useEscolas, siglaDe, corDe, type EscolaRecord } from '~/composables/useEscolas'
import { useTurmas, type TurmaRecord } from '~/composables/useTurmas'

definePageMeta({ title: 'Unidades' })

const { listar: listarEscolas, criar: criarEscola, atualizar: atualizarEscola, remover: removerEscola } = useEscolas()
const { listar: listarTurmas, definirTurmasDaEscola } = useTurmas()

// ─── Estado ───────────────────────────────────────────────────────────────────
const unidades      = ref<EscolaRecord[]>([])
const todasTurmas   = ref<TurmaRecord[]>([])
const loading       = ref(true)
const loadingTurmas = ref(true)

const totalAlunos    = computed(() => unidades.value.reduce((s, u) => s + (u.alunos_count ?? 0), 0))
const totalVinculos  = computed(() => unidades.value.reduce((s, u) => s + (u.turmaIds?.length ?? 0), 0))
const unidadesAtivas = computed(() => unidades.value.filter(u => u.status === 'ativo').length)

const turmasOpts = computed(() =>
  todasTurmas.value.map(t => {
    const partes = [t.nome]
    if (t.turno) partes.push(t.turno)
    if (t.serie) partes.push(t.serie)
    return { label: partes.join(' · '), value: t.id }
  })
)

function turmasDaUnidade(u: EscolaRecord): TurmaRecord[] {
  const ids = new Set(u.turmaIds ?? [])
  return todasTurmas.value.filter(t => ids.has(t.id))
}

function enderecoFormatado(u: EscolaRecord): string {
  const partes: string[] = []
  if (u.logradouro) partes.push(u.logradouro + (u.numero ? `, ${u.numero}` : ''))
  if (u.bairro)     partes.push(u.bairro)
  if (u.cidade || u.estado) {
    partes.push([u.cidade, u.estado].filter(Boolean).join(' - '))
  }
  return partes.join(' — ')
}

async function recarregar() {
  loading.value       = true
  loadingTurmas.value = true
  try {
    const [unis, turmas] = await Promise.all([listarEscolas(), listarTurmas()])
    unidades.value    = unis
    todasTurmas.value = turmas
  } catch (e: any) {
    toast.error(`Erro ao carregar: ${e?.message ?? ''}`)
  } finally {
    loading.value       = false
    loadingTurmas.value = false
  }
}

onMounted(recarregar)

// ─── Modal ────────────────────────────────────────────────────────────────────
const modalAberto = ref(false)
const buscandoCep = ref(false)
const salvando    = ref(false)
const cnpjErro    = ref('')

function onCnpjInput(valor: string) {
  modal.form.cnpj = applyCnpjMask(valor)
  cnpjErro.value = ''
  const d = cnpjDigits(modal.form.cnpj)
  if (!d) return
  if (!isCnpjValido(modal.form.cnpj)) {
    cnpjErro.value = 'CNPJ inválido — verifique os dígitos.'
    return
  }
  // Checa duplicidade (ignora a própria escola em modo edição)
  const duplicada = unidades.value.find(u => {
    const dOutra = cnpjDigits(u.cnpj ?? '')
    return dOutra && dOutra === d && u.id !== modal.editId
  })
  if (duplicada) {
    cnpjErro.value = `Esta escola já está cadastrada (${duplicada.nome_escola}).`
  }
}

const modal = reactive({
  modo:    'novo' as 'novo' | 'editar',
  editId:  null as string | null,
  form:    formVazio(),
})

function formVazio() {
  return {
    nome_escola: '',
    cnpj: '',
    telefone: '',
    email: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    status:   'ativo' as StatusGeral,
    turmaIds: [] as string[],
  }
}

function abrirNova() {
  modal.modo   = 'novo'
  modal.editId = null
  modal.form   = formVazio()
  cnpjErro.value = ''
  modalAberto.value = true
}

function editar(u: EscolaRecord) {
  modal.modo   = 'editar'
  modal.editId = u.id
  modal.form = {
    nome_escola: u.nome_escola,
    cnpj:        u.cnpj       ?? '',
    telefone:    u.telefone   ?? '',
    email:       u.email      ?? '',
    cep:         u.cep        ?? '',
    logradouro:  u.logradouro ?? '',
    numero:      u.numero     ?? '',
    bairro:      u.bairro     ?? '',
    cidade:      u.cidade     ?? '',
    estado:      u.estado     ?? '',
    status:      u.status,
    turmaIds:    [...(u.turmaIds ?? [])],
  }
  cnpjErro.value = ''
  modalAberto.value = true
}

// ─── ViaCEP ───────────────────────────────────────────────────────────────────
async function onCepInput(valor: string) {
  modal.form.cep = applyCepMask(valor)
  if (cepDigits(modal.form.cep)) {
    await consultarViaCep()
  }
}

async function consultarViaCep() {
  buscandoCep.value = true
  try {
    const dados = await buscarCep(modal.form.cep)
    modal.form.logradouro = dados.logradouro || modal.form.logradouro
    modal.form.bairro     = dados.bairro     || modal.form.bairro
    modal.form.cidade     = dados.cidade     || modal.form.cidade
    modal.form.estado     = dados.estado     || modal.form.estado
    toast.success('Endereço preenchido pelo CEP.')
  } catch (e: any) {
    toast.error(e?.message === 'CEP não encontrado'
      ? 'CEP não encontrado. Preencha o endereço manualmente.'
      : 'Erro ao consultar CEP.')
  } finally {
    buscandoCep.value = false
  }
}

// ─── Salvar ───────────────────────────────────────────────────────────────────
async function salvar() {
  if (!modal.form.nome_escola.trim()) {
    toast.error('Informe o nome da unidade.')
    return
  }
  if (modal.form.cnpj && !isCnpjValido(modal.form.cnpj)) {
    toast.error('CNPJ inválido — verifique os dígitos.')
    return
  }
  if (cnpjErro.value) {
    toast.error(cnpjErro.value)
    return
  }

  salvando.value = true
  try {
    const payload = {
      nome_escola: modal.form.nome_escola.trim(),
      cnpj:        modal.form.cnpj       || null,
      telefone:    modal.form.telefone   || null,
      email:       modal.form.email      || null,
      cep:         modal.form.cep        || null,
      logradouro:  modal.form.logradouro || null,
      numero:      modal.form.numero     || null,
      bairro:      modal.form.bairro     || null,
      cidade:      modal.form.cidade     || null,
      estado:      modal.form.estado     || null,
      status:      modal.form.status,
    }

    let escolaId: string
    if (modal.modo === 'novo') {
      const nova = await criarEscola(payload)
      escolaId = nova.id
      toast.success('Unidade cadastrada!')
    } else if (modal.editId) {
      await atualizarEscola(modal.editId, payload)
      escolaId = modal.editId
      toast.success('Unidade atualizada!')
    } else {
      throw new Error('Estado inválido')
    }

    // Persiste os vínculos turma-escola (replace transacional)
    await definirTurmasDaEscola(escolaId, modal.form.turmaIds)

    modalAberto.value = false
    await recarregar()
  } catch (e: any) {
    console.error(e)
    toast.error(`Erro ao salvar: ${e?.message ?? 'desconhecido'}`)
  } finally {
    salvando.value = false
  }
}

async function removerUnidade(u: EscolaRecord) {
  if (!confirm(`Remover a unidade "${u.nome_escola}"? Turmas e alunos vinculados não serão apagados, mas perderão a vinculação.`)) return
  try {
    await removerEscola(u.id)
    toast.success('Unidade removida.')
    await recarregar()
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  }
}
</script>
