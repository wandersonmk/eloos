<template>
  <div class="flex flex-col gap-5">

    <!-- ═════ Buscar responsável existente ═════ -->
    <div
      v-if="parentescoBusca"
      class="rounded-lg border p-4 transition-colors"
      :class="vinculadoRec
        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-900/10'
        : 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/10'"
    >
      <!-- Estado: vinculado a um existente -->
      <div v-if="vinculadoRec" class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" :style="{ backgroundColor: vinculadoRec.cor }">{{ iniciaisDe(vinculadoRec.nome) }}</div>
        <div class="flex-1 min-w-0">
          <p class="text-[11px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
            <Icon name="lucide:check-circle-2" class="w-3.5 h-3.5" />
            Vinculado a responsável existente
          </p>
          <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ vinculadoRec.nome }}</p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            {{ vinculadoRec.parentesco }} · {{ vinculadoRec.cpf }} · já vinculado a {{ vinculadoRec.alunos.length }} {{ vinculadoRec.alunos.length === 1 ? 'aluno' : 'alunos' }}
            <template v-if="vinculadoRec.alunos.length"> ({{ vinculadoRec.alunos.map(a => a.nome).join(', ') }})</template>
          </p>
          <p class="text-[12px] text-emerald-700 dark:text-emerald-400 mt-2">
            Os dados abaixo foram preenchidos automaticamente. Você ainda pode editar e marcar os papéis (financeiro/pedagógico) para este aluno.
          </p>
        </div>
        <button
          type="button"
          @click="desvincular"
          class="text-[12px] font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 inline-flex items-center gap-1 shrink-0"
        >
          <Icon name="lucide:x" class="w-3.5 h-3.5" />
          Criar novo cadastro
        </button>
      </div>

      <!-- Estado: buscando -->
      <div v-else>
        <div class="flex items-start gap-2 mb-3">
          <Icon name="lucide:search" class="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" />
          <div class="flex-1">
            <p class="text-[13px] font-semibold text-slate-800 dark:text-slate-100">{{ parentescoBusca === 'Mãe' ? 'Já existe cadastro dessa mãe?' : 'Já existe cadastro desse pai?' }}</p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Busque por nome ou CPF para vincular um {{ parentescoBusca === 'Mãe' ? 'responsável' : 'responsável' }} já cadastrado em outro aluno. Caso não exista, basta preencher o formulário abaixo.
            </p>
          </div>
        </div>

        <div class="relative">
          <input
            v-model="busca"
            type="text"
            :placeholder="`Buscar ${parentescoBusca?.toLowerCase()} por nome ou CPF...`"
            class="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            @focus="buscaAtiva = true"
            @blur="onBlurBusca"
          />

          <!-- Dropdown de resultados -->
          <Transition name="dropdown">
            <div
              v-if="buscaAtiva && busca.trim().length >= 1 && candidatosFiltrados.length"
              class="absolute z-20 left-0 right-0 top-full mt-1 max-h-72 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg"
            >
              <button
                v-for="c in candidatosFiltrados"
                :key="c.id"
                type="button"
                @mousedown.prevent="selecionar(c)"
                class="w-full text-left px-3 py-2 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 border-b border-slate-100 dark:border-slate-700/60 last:border-b-0 transition-colors"
              >
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0" :style="{ backgroundColor: c.cor }">{{ iniciaisDe(c.nome) }}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{{ c.nome }}</p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">{{ c.cpf }} · {{ c.email }}</p>
                  <p class="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                    Vinculado a {{ c.alunos.length }} {{ c.alunos.length === 1 ? 'aluno' : 'alunos' }}<template v-if="c.alunos.length">: {{ c.alunos.map(a => a.nome).join(', ') }}</template>
                  </p>
                </div>
              </button>
            </div>
          </Transition>

          <!-- Sem resultados -->
          <div
            v-if="buscaAtiva && busca.trim().length >= 1 && !candidatosFiltrados.length"
            class="absolute z-20 left-0 right-0 top-full mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg px-3 py-3"
          >
            <p class="text-[12px] text-slate-500 dark:text-slate-400 text-center">
              Nenhum {{ parentescoBusca?.toLowerCase() }} encontrado com esse termo. Preencha o formulário abaixo para cadastrar um novo.
            </p>
          </div>
        </div>
      </div>
    </div>

    <FormSection title="Papéis no aluno" dense>
      <FormGrid :cols="2">
        <BaseCheckbox
          v-if="!hidePapelFinanceiro"
          :model-value="modelValue.responsavelFinanceiro"
          @update:model-value="patch({ responsavelFinanceiro: $event })"
          label="Responsável Financeiro do Aluno"
          hint="Apenas um responsável pode ser o financeiro"
        />
        <BaseCheckbox
          :model-value="modelValue.responsavelPedagogico"
          @update:model-value="patch({ responsavelPedagogico: $event })"
          label="Responsável Pedagógico do Aluno"
        />
      </FormGrid>
    </FormSection>

    <FormSection :title="`Identificação — ${tituloLabel}`">
      <BaseRadio
        v-if="showTipoPessoa"
        :model-value="modelValue.tipo"
        @update:model-value="patch({ tipo: $event })"
        label="Tipo"
        :options="[{ label: 'Pessoa Física', value: 'fisica' }, { label: 'Pessoa Jurídica', value: 'juridica' }]"
      />

      <FormGrid :cols="2">
        <BaseInput :model-value="modelValue.nome" @update:model-value="patch({ nome: $event })" :label="nomeLabel" />
        <BaseSelect
          v-if="showParentesco"
          :model-value="modelValue.parentesco"
          @update:model-value="patch({ parentesco: $event })"
          label="Grau de parentesco"
          placeholder="Selecione"
          :options="parentescoOpts"
        />
      </FormGrid>

      <BaseCheckbox
        :model-value="modelValue.semCpf"
        @update:model-value="patch({ semCpf: $event, cpf: $event ? '' : modelValue.cpf })"
        :label="`${tituloLabel} sem CPF`"
      />

      <FormGrid :cols="3">
        <BaseInput
          v-if="!modelValue.semCpf"
          :model-value="modelValue.cpf"
          @update:model-value="patch({ cpf: applyCpfMask($event) })"
          label="CPF"
          placeholder="000.000.000-00"
        />
        <BaseInput
          :model-value="modelValue.dataNascimento"
          @update:model-value="patch({ dataNascimento: $event })"
          label="Data de nascimento"
          type="date"
        />
        <BaseSelect
          v-if="showSexo"
          :model-value="modelValue.sexo"
          @update:model-value="patch({ sexo: $event })"
          label="Sexo"
          placeholder="Selecione"
          :options="sexoOpts"
        />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseInput :model-value="modelValue.rg"           @update:model-value="patch({ rg: $event })"           label="RG" />
        <BaseInput :model-value="modelValue.orgaoEmissor" @update:model-value="patch({ orgaoEmissor: $event })" label="Órgão emissor" />
        <BaseInput :model-value="modelValue.dataExpRg"    @update:model-value="patch({ dataExpRg: $event })"    label="Data exp. (RG)" type="date" />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseInput :model-value="modelValue.municipioNaturalidade" @update:model-value="patch({ municipioNaturalidade: $event })" label="Município naturalidade" />
        <BaseInput :model-value="modelValue.uf"   @update:model-value="patch({ uf: $event.toUpperCase().slice(0, 2) })" label="UF" />
        <BaseInput :model-value="modelValue.pais" @update:model-value="patch({ pais: $event })" label="País" />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseInput  :model-value="modelValue.nacionalidade" @update:model-value="patch({ nacionalidade: $event })" label="Nacionalidade" />
        <BaseSelect :model-value="modelValue.falecido"      @update:model-value="patch({ falecido: $event })"      label="Falecido?"     :options="simNaoOpts"      placeholder="Selecione" />
        <BaseSelect :model-value="modelValue.estadoCivil"   @update:model-value="patch({ estadoCivil: $event })"   label="Estado civil"  :options="estadoCivilOpts" placeholder="Selecione" />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseSelect :model-value="modelValue.escolaridade" @update:model-value="patch({ escolaridade: $event })" label="Escolaridade" :options="escolaridadeOpts" placeholder="Selecione" />
        <BaseSelect :model-value="modelValue.corRaca"      @update:model-value="patch({ corRaca: $event })"      label="Cor/Raça"     :options="corRacaOpts"      placeholder="Selecione" />
        <BaseInput  :model-value="modelValue.profissao"    @update:model-value="patch({ profissao: $event })"    label="Profissão" />
      </FormGrid>

      <BaseInput :model-value="modelValue.religiao" @update:model-value="patch({ religiao: $event })" label="Religião" />
    </FormSection>

    <FormSection title="E-mails" subtitle="Até 4 endereços de e-mail">
      <FormGrid :cols="2">
        <BaseInput
          v-for="(_, i) in 4"
          :key="i"
          :model-value="modelValue.emails[i]"
          @update:model-value="updateEmail(i, $event)"
          :label="`E-mail ${i + 1}`"
          type="email"
          placeholder="exemplo@email.com"
        />
      </FormGrid>
    </FormSection>

    <FormSection title="Telefones" subtitle="Residencial, comercial e contato">
      <AlunoTelefonesGrupos
        :model-value="modelValue.telefones"
        @update:model-value="patch({ telefones: $event })"
      />
    </FormSection>

    <FormSection :title="`Endereço — ${tituloLabel}`">
      <AlunoEndereco
        :model-value="modelValue.endereco"
        @update:model-value="patch({ endereco: $event })"
        show-copiar
      />
    </FormSection>

    <FormSection v-if="showMoradia" title="Moradia">
      <FormGrid :cols="2">
        <BaseSelect :model-value="modelValue.moradia.tipo"       @update:model-value="patchMoradia({ tipo: $event })"       label="Moradia"            :options="moradiaTipoOpts"    placeholder="Selecione" />
        <BaseSelect :model-value="modelValue.moradia.construcao" @update:model-value="patchMoradia({ construcao: $event })" label="Tipo de construção" :options="construcaoTipoOpts" placeholder="Selecione" />
        <BaseInput  :model-value="modelValue.moradia.comodos"    @update:model-value="patchMoradia({ comodos: $event })"    label="Nº de cômodos"      type="number" />
        <BaseInput  :model-value="modelValue.moradia.valor"      @update:model-value="patchMoradia({ valor: $event })"      label="Valor (aluguel / financiamento)" placeholder="R$ 0,00" />
      </FormGrid>
    </FormSection>

    <FormSection title="Local de trabalho">
      <AlunoLocalTrabalho
        :model-value="modelValue.trabalho"
        @update:model-value="patch({ trabalho: $event })"
      />
    </FormSection>

  </div>
</template>

<script setup lang="ts">
import type { ResponsavelData } from '~/composables/useAlunoForm'
import { montarResponsavelDataAPartirDoRecord, type ResponsavelRecord } from '~/composables/useResponsaveis'

const props = withDefaults(defineProps<{
  modelValue: ResponsavelData
  tituloLabel: string
  nomeLabel?: string
  showTipoPessoa?: boolean
  showParentesco?: boolean
  showSexo?: boolean
  showMoradia?: boolean
  hidePapelFinanceiro?: boolean
  // Quando definido, exibe um painel de busca por responsável já cadastrado
  // filtrado por parentesco. Útil para mãe/pai no cadastro de aluno.
  parentescoBusca?: 'Mãe' | 'Pai'
}>(), {
  nomeLabel: 'Nome',
  showTipoPessoa: false,
  showParentesco: false,
  showSexo: false,
  showMoradia: false,
  hidePapelFinanceiro: false,
  parentescoBusca: undefined,
})

const emit = defineEmits<{ 'update:modelValue': [value: ResponsavelData] }>()

function patch(p: Partial<ResponsavelData>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}

function patchMoradia(p: Partial<ResponsavelData['moradia']>) {
  patch({ moradia: { ...props.modelValue.moradia, ...p } })
}

function updateEmail(idx: number, value: string) {
  const emails = [...props.modelValue.emails]
  emails[idx] = value
  patch({ emails })
}

// ─── Busca de responsável existente ──────────────────────────────────────────
const { responsaveis } = useResponsaveis()

const busca       = ref('')
const buscaAtiva  = ref(false)
const vinculadoId = ref<string | null>(null)

const vinculadoRec = computed<ResponsavelRecord | null>(() => {
  if (!vinculadoId.value) return null
  return responsaveis.value.find(r => r.id === vinculadoId.value) ?? null
})

// Candidatos: responsáveis com o mesmo parentesco e que correspondem à busca
const candidatosFiltrados = computed<ResponsavelRecord[]>(() => {
  if (!props.parentescoBusca) return []
  const q = busca.value.trim().toLowerCase()
  return responsaveis.value
    .filter(r => r.parentesco === props.parentescoBusca)
    .filter(r => {
      if (!q) return true
      return r.nome.toLowerCase().includes(q)
          || r.cpf.toLowerCase().includes(q)
          || r.email.toLowerCase().includes(q)
    })
    .slice(0, 8)
})

function selecionar(r: ResponsavelRecord) {
  const dados = montarResponsavelDataAPartirDoRecord(r)
  // Preserva flags de papel que o usuário já tinha marcado (caso tenha começado a preencher)
  dados.responsavelFinanceiro = props.modelValue.responsavelFinanceiro
  dados.responsavelPedagogico = props.modelValue.responsavelPedagogico
  emit('update:modelValue', dados)
  vinculadoId.value = r.id
  busca.value = ''
  buscaAtiva.value = false
}

function desvincular() {
  vinculadoId.value = null
  // Não limpa os campos automaticamente — usuário pode querer aproveitar parte dos dados
  // como ponto de partida. Se quiser zerar, basta editar manualmente.
}

function onBlurBusca() {
  // Pequeno delay para permitir o click no item antes do dropdown sumir
  setTimeout(() => { buscaAtiva.value = false }, 120)
}

function iniciaisDe(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: opacity .12s ease, transform .12s ease; }
.dropdown-enter-from,   .dropdown-leave-to    { opacity: 0; transform: translateY(-4px); }
</style>
