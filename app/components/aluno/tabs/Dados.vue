<template>
  <div class="flex flex-col gap-5">

    <!-- ═════ Identificação ═════ -->
    <FormSection title="Identificação" subtitle="Dados gerais e cadastrais do aluno">
      <FormGrid :cols="2">
        <BaseCheckbox
          :model-value="modelValue.eResponsavelFinanceiro"
          @update:model-value="patch({ eResponsavelFinanceiro: $event })"
          label="O aluno é o responsável financeiro"
        />
        <BaseRadio
          :model-value="modelValue.autorizaImagem"
          @update:model-value="patch({ autorizaImagem: $event })"
          label="Autoriza uso de imagem"
          required
          :options="simNaoOpts"
        />
      </FormGrid>

      <FormGrid :cols="2">
        <BaseSelect
          :model-value="modelValue.unidade"
          @update:model-value="onUnidadeChange"
          label="Unidade de cadastro"
          required
          :placeholder="loadingEscolas ? 'Carregando unidades...' : 'Selecione a unidade'"
          :options="escolasOpts"
          :hint="!loadingEscolas && !escolasOpts.length ? 'Nenhuma escola cadastrada — crie em Configurações → Unidades' : ''"
        />
        <BaseSelect
          :model-value="modelValue.turma"
          @update:model-value="patch({ turma: $event })"
          label="Turma"
          :placeholder="placeholderTurma"
          :disabled="!modelValue.unidade || loadingTurmas"
          :options="turmasDaUnidadeOpts"
          :hint="modelValue.unidade && !loadingTurmas && !turmasDaUnidadeOpts.length ? 'Esta unidade ainda não tem turmas vinculadas' : ''"
        />
      </FormGrid>

      <FormGrid :cols="2">
        <BaseSelect
          :model-value="modelValue.tabela_preco_id"
          @update:model-value="patch({ tabela_preco_id: $event })"
          label="Tabela de preço"
          :placeholder="loadingTabelas ? 'Carregando tabelas...' : 'Selecione (opcional)'"
          :options="tabelasOpts"
          :hint="!loadingTabelas && !tabelasOpts.length ? 'Nenhuma tabela cadastrada — crie em Configurações → Tabelas de preço' : 'Aplica mensalidade, matrícula e material a este aluno'"
        />
        <BaseSelect
          :model-value="modelValue.forma_pagamento"
          @update:model-value="patch({ forma_pagamento: $event })"
          label="Forma de pagamento"
          placeholder="Selecione"
          :options="formaPagamentoOpts"
          hint="Forma de pagamento padrão para as mensalidades"
        />
      </FormGrid>

      <FormGrid :cols="2">
        <BaseInput
          :model-value="raAutoGerado"
          label="RA (Registro do Aluno)"
          disabled
          :placeholder="modelValue.cpf ? 'Aguardando CPF válido...' : 'Preencha o CPF abaixo para gerar'"
          hint="Gerado automaticamente a partir do CPF. Único em todo o sistema."
        />
        <div class="flex flex-col gap-1.5">
          <BaseInput
            :model-value="modelValue.rm"
            @update:model-value="patch({ rm: $event })"
            label="RM (Registro de Matrícula)"
            required
            :disabled="modelValue.gerarRmAutomatico"
            :placeholder="modelValue.gerarRmAutomatico ? 'Será gerado automaticamente' : ''"
          />
          <BaseCheckbox
            :model-value="modelValue.gerarRmAutomatico"
            @update:model-value="patch({ gerarRmAutomatico: $event, rm: $event ? '' : modelValue.rm })"
            label="Gerar RM automaticamente"
          />
        </div>
      </FormGrid>

      <BaseInput :model-value="modelValue.nome" @update:model-value="patch({ nome: $event })" label="Nome do aluno" required />

      <FormGrid :cols="2">
        <BaseRadio
          :model-value="modelValue.possuiNomeSocial"
          @update:model-value="patch({ possuiNomeSocial: $event })"
          label="Possui nome social"
          :options="['Não', 'Sim']"
        />
        <BaseInput
          v-if="modelValue.possuiNomeSocial === 'Sim'"
          :model-value="modelValue.nomeSocial"
          @update:model-value="patch({ nomeSocial: $event })"
          label="Nome social"
        />
      </FormGrid>

      <FormGrid :cols="4">
        <BaseInput
          :model-value="modelValue.dataNascimento"
          @update:model-value="patch({ dataNascimento: $event, idade: calcularIdade($event) })"
          label="Data de nascimento"
          required
          type="date"
        />
        <BaseInput :model-value="modelValue.idade" label="Idade" disabled hint="Calculada automaticamente" />
        <BaseSelect :model-value="modelValue.sexo"          @update:model-value="patch({ sexo: $event })"          label="Sexo"          placeholder="Selecione" :options="sexoOpts" />
        <BaseRadio  :model-value="modelValue.sairSozinho"   @update:model-value="patch({ sairSozinho: $event })"   label="Sair sozinho"                 :options="simNaoOpts" />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseInput :model-value="modelValue.cpf" @update:model-value="patch({ cpf: applyCpfMask($event) })" label="CPF" placeholder="000.000.000-00" />
        <BaseInput :model-value="modelValue.rg"  @update:model-value="patch({ rg: $event })"  label="RG" />
        <BaseInput :model-value="modelValue.idCenso" @update:model-value="patch({ idCenso: $event })" label="ID do Censo" />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseInput  :model-value="modelValue.numeroNis"     @update:model-value="patch({ numeroNis: $event })"     label="Número do NIS" />
        <BaseInput  :model-value="modelValue.dataCadastro"  label="Data de cadastro" type="date" disabled />
        <BaseInput  :model-value="modelValue.sistec"        @update:model-value="patch({ sistec: $event })"        label="SISTEC" />
      </FormGrid>

      <FormGrid :cols="2">
        <BaseSelect :model-value="modelValue.canhotoDestro" @update:model-value="patch({ canhotoDestro: $event })" label="Canhoto ou destro?" placeholder="Selecione" :options="canhotoDestroOpts" />
        <BaseSelect :model-value="modelValue.zona"          @update:model-value="patch({ zona: $event })"          label="Reside em zona"     placeholder="Selecione" :options="zonaOpts" />
      </FormGrid>

      <BasePhotoUpload
        :model-value="modelValue.foto"
        @update:model-value="patch({ foto: $event })"
        label="Foto do aluno"
      />
    </FormSection>

    <!-- ═════ Certidão de Nascimento ═════ -->
    <FormSection title="Certidão de nascimento">
      <FormGrid :cols="3">
        <BaseInput :model-value="modelValue.certidaoLivro"    @update:model-value="patch({ certidaoLivro: $event })"    label="Nº Livro" />
        <BaseInput :model-value="modelValue.certidaoFolha"    @update:model-value="patch({ certidaoFolha: $event })"    label="Número folha" />
        <BaseInput :model-value="modelValue.certidaoCartorio" @update:model-value="patch({ certidaoCartorio: $event })" label="Cartório" />
      </FormGrid>
      <FormGrid :cols="3">
        <BaseInput :model-value="modelValue.certidaoUf"       @update:model-value="patch({ certidaoUf: $event.toUpperCase().slice(0, 2) })" label="UF" />
        <BaseInput :model-value="modelValue.numeroCertidao"   @update:model-value="patch({ numeroCertidao: $event })"   label="Número certidão" />
        <BaseInput :model-value="modelValue.dataEmissaoCertidao" @update:model-value="patch({ dataEmissaoCertidao: $event })" label="Data emissão" type="date" />
      </FormGrid>
      <FormGrid :cols="2">
        <BaseInput :model-value="modelValue.novaCertidao"    @update:model-value="patch({ novaCertidao: $event })"    label="Nº nova certidão" />
        <BaseInput :model-value="modelValue.nomeMaeCertidao" @update:model-value="patch({ nomeMaeCertidao: $event })" label="Nome da mãe na certidão" />
      </FormGrid>
    </FormSection>

    <!-- ═════ Dados Complementares ═════ -->
    <FormSection title="Dados complementares">
      <FormGrid :cols="3">
        <BaseInput  :model-value="modelValue.religiao" @update:model-value="patch({ religiao: $event })" label="Religião" />
        <BaseInput  :model-value="modelValue.municipioNaturalidade" @update:model-value="patch({ municipioNaturalidade: $event })" label="Município naturalidade" />
        <BaseInput  :model-value="modelValue.uf"       @update:model-value="patch({ uf: $event.toUpperCase().slice(0, 2) })" label="UF" />
      </FormGrid>
      <FormGrid :cols="3">
        <BaseInput  :model-value="modelValue.pais"          @update:model-value="patch({ pais: $event })"          label="País" />
        <BaseInput  :model-value="modelValue.nacionalidade" @update:model-value="patch({ nacionalidade: $event })" label="Nacionalidade" required />
        <BaseSelect :model-value="modelValue.falecido"      @update:model-value="patch({ falecido: $event })"      label="Falecido?" required placeholder="Selecione" :options="simNaoOpts" />
      </FormGrid>

      <BaseSelect :model-value="modelValue.corRaca" @update:model-value="patch({ corRaca: $event })" label="Cor/Raça" placeholder="Selecione" :options="corRacaOpts" />

      <BaseSelect
        :model-value="modelValue.necessidadesEspeciais"
        @update:model-value="patch({ necessidadesEspeciais: $event })"
        label="Necessidades especiais"
        placeholder="Selecione"
        :options="necessidadesEspeciaisOpts"
      />

      <div class="flex flex-col gap-2">
        <BaseCheckbox
          :model-value="modelValue.outraNecessidade"
          @update:model-value="patch({ outraNecessidade: $event, outraNecessidadeDescricao: $event ? modelValue.outraNecessidadeDescricao : '' })"
          label="Outra necessidade"
        />
        <BaseInput
          v-if="modelValue.outraNecessidade"
          :model-value="modelValue.outraNecessidadeDescricao"
          @update:model-value="patch({ outraNecessidadeDescricao: $event })"
          placeholder="Descreva a necessidade"
        />
      </div>

      <FormGrid :cols="2">
        <BaseInput :model-value="modelValue.telefone1" @update:model-value="patch({ telefone1: applyPhoneMask($event) })" label="Telefone 1" placeholder="(00) 00000-0000" />
        <BaseInput :model-value="modelValue.telefone2" @update:model-value="patch({ telefone2: applyPhoneMask($event) })" label="Telefone 2" placeholder="(00) 00000-0000" />
      </FormGrid>

      <BaseTextarea :model-value="modelValue.observacoesGerais" @update:model-value="patch({ observacoesGerais: $event })" label="Observações gerais" :rows="3" />

      <BaseInput :model-value="modelValue.scoreEnem" @update:model-value="patch({ scoreEnem: $event })" label="Score ENEM" type="number" />
    </FormSection>

    <!-- ═════ Endereço Residencial ═════ -->
    <FormSection title="Endereço residencial" subtitle="Obrigatório">
      <AlunoEndereco
        :model-value="modelValue.enderecoResidencial"
        @update:model-value="patch({ enderecoResidencial: $event })"
        show-copiar
        required
      />
    </FormSection>

    <!-- ═════ Endereço Comercial ═════ -->
    <FormSection title="Endereço comercial" subtitle="Opcional">
      <AlunoEndereco
        :model-value="modelValue.enderecoComercial"
        @update:model-value="patch({ enderecoComercial: $event })"
      />
    </FormSection>

    <!-- ═════ Pessoas para Avisar em Emergência ═════ -->
    <FormSection title="Pessoas para avisar em emergência" subtitle="Lista de contatos de emergência">
      <AlunoListaDinamica
        :model-value="modelValue.emergencia"
        @update:model-value="patch({ emergencia: $event })"
        item-label="Contato"
        add-label="Adicionar contato"
        empty-message="Nenhum contato de emergência cadastrado."
        :new-item="() => ({ nome: '', parentesco: '', telefone: '', encaminhar: '' })"
      >
        <template #default="{ item, update }">
          <FormGrid :cols="2">
            <BaseInput :model-value="item.nome"       @update:model-value="update({ nome: $event })"       label="Nome" />
            <BaseInput :model-value="item.parentesco" @update:model-value="update({ parentesco: $event })" label="Grau de parentesco" />
            <BaseInput :model-value="item.telefone"   @update:model-value="update({ telefone: applyPhoneMask($event) })" label="Telefone" placeholder="(00) 00000-0000" />
            <BaseInput :model-value="item.encaminhar" @update:model-value="update({ encaminhar: $event })" label="Em caso de emergência, encaminhar para" />
          </FormGrid>
        </template>
      </AlunoListaDinamica>
    </FormSection>

    <!-- ═════ Autorizados a Retirar ═════ -->
    <FormSection title="Pessoas autorizadas a retirar o(a) aluno(a)">
      <AlunoListaDinamica
        :model-value="modelValue.autorizados"
        @update:model-value="patch({ autorizados: $event })"
        item-label="Pessoa autorizada"
        add-label="Adicionar pessoa autorizada"
        empty-message="Nenhuma pessoa autorizada cadastrada."
        :new-item="() => ({ nome: '', rg: '', parentesco: '', telefone: '', codIdentificacao: '' })"
      >
        <template #default="{ item, update }">
          <FormGrid :cols="3">
            <BaseInput :model-value="item.nome"             @update:model-value="update({ nome: $event })"             label="Nome" class="sm:col-span-2" />
            <BaseInput :model-value="item.rg"               @update:model-value="update({ rg: $event })"               label="RG" />
            <BaseInput :model-value="item.parentesco"       @update:model-value="update({ parentesco: $event })"       label="Grau de parentesco" />
            <BaseInput :model-value="item.telefone"         @update:model-value="update({ telefone: applyPhoneMask($event) })" label="Telefone" />
            <BaseInput :model-value="item.codIdentificacao" @update:model-value="update({ codIdentificacao: $event })" label="Cód. identificação" />
          </FormGrid>
        </template>
      </AlunoListaDinamica>
    </FormSection>

    <!-- ═════ Composição Familiar ═════ -->
    <FormSection title="Composição familiar">
      <AlunoListaDinamica
        :model-value="modelValue.familia"
        @update:model-value="patch({ familia: $event })"
        item-label="Membro"
        add-label="Adicionar membro da família"
        empty-message="Nenhum membro familiar cadastrado."
        :new-item="() => ({ nome: '', dataNascimento: '', parentesco: '', profissao: '', ocupacao: '', renda: '', fatorRiscoSocial: '' })"
      >
        <template #default="{ item, update }">
          <FormGrid :cols="3">
            <BaseInput :model-value="item.nome"             @update:model-value="update({ nome: $event })"             label="Nome" class="sm:col-span-2" />
            <BaseInput :model-value="item.dataNascimento"   @update:model-value="update({ dataNascimento: $event })"   label="Data de nascimento" type="date" />
            <BaseInput :model-value="item.parentesco"       @update:model-value="update({ parentesco: $event })"       label="Parentesco / Vínculo" />
            <BaseInput :model-value="item.profissao"        @update:model-value="update({ profissao: $event })"        label="Profissão" />
            <BaseInput :model-value="item.ocupacao"         @update:model-value="update({ ocupacao: $event })"         label="Ocupação" />
            <BaseInput :model-value="item.renda"            @update:model-value="update({ renda: $event })"            label="Renda" placeholder="R$ 0,00" />
            <BaseInput :model-value="item.fatorRiscoSocial" @update:model-value="update({ fatorRiscoSocial: $event })" label="Fator(es) de risco social" class="sm:col-span-2" />
          </FormGrid>
        </template>
      </AlunoListaDinamica>
    </FormSection>

    <!-- ═════ Parentes na Escola ═════ -->
    <FormSection title="Parentes do aluno na escola" dense>
      <BaseTextarea
        :model-value="modelValue.parentesNaEscola"
        @update:model-value="patch({ parentesNaEscola: $event })"
        label="O aluno tem irmãos ou parentes nesta escola? Quem? Em que série?"
        :rows="3"
      />
    </FormSection>

  </div>
</template>

<script setup lang="ts">
import type { AlunoFormData } from '~/composables/useAlunoForm'
import { useTabelasPreco, type TabelaPrecoRecord } from '~/composables/useTabelasPreco'
import type { Database } from '~/types/database.types'
import { gerarRaPorCpf } from '~/utils/ra'

const formaPagamentoOpts = [
  { label: 'Boleto mensal',   value: 'Boleto mensal'   },
  { label: 'PIX recorrente',  value: 'PIX recorrente'  },
  { label: 'Cartão de crédito', value: 'Cartão de crédito' },
  { label: 'Débito automático', value: 'Débito automático' },
  { label: 'Dinheiro',        value: 'Dinheiro'         },
]

const props = defineProps<{ modelValue: AlunoFormData }>()
const emit  = defineEmits<{ 'update:modelValue': [value: AlunoFormData] }>()

function patch(p: Partial<AlunoFormData>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}

// RA derivado do CPF + UF (certidão > naturalidade > endereço > SP).
const raAutoGerado = computed(() => {
  const uf = props.modelValue.certidaoUf
    || props.modelValue.uf
    || props.modelValue.enderecoResidencial?.uf
    || 'SP'
  return gerarRaPorCpf(props.modelValue.cpf, uf)
})

// Mantém modelValue.ra sincronizado com o RA gerado (para o save persistir o valor).
watch(raAutoGerado, (novo) => {
  if (novo !== props.modelValue.ra) patch({ ra: novo })
}, { immediate: true })

function onUnidadeChange(novaUnidade: string) {
  patch({ unidade: novaUnidade, turma: '' })
}

// ─── Escolas e turmas do Supabase ─────────────────────────────────────────────
const supabase = useSupabaseClient<Database>()

const escolas       = ref<{ id: string; nome_escola: string }[]>([])
const turmas        = ref<{ id: string; nome: string; turno: string | null }[]>([])
const escolaTurmas  = ref<{ escola_id: string; turma_id: string }[]>([])
const loadingEscolas = ref(true)
const loadingTurmas  = ref(true)

const escolasOpts = computed(() =>
  escolas.value.map(e => ({ label: e.nome_escola, value: e.id })),
)

const turmasDaUnidadeOpts = computed(() => {
  if (!props.modelValue.unidade) return [] as { label: string; value: string }[]
  const turmaIdsDaEscola = new Set(
    escolaTurmas.value
      .filter(et => et.escola_id === props.modelValue.unidade)
      .map(et => et.turma_id),
  )
  return turmas.value
    .filter(t => turmaIdsDaEscola.has(t.id))
    .map(t => ({
      label: t.turno ? `${t.nome} · ${t.turno}` : t.nome,
      value: t.id,
    }))
})

const placeholderTurma = computed(() => {
  if (!props.modelValue.unidade) return 'Selecione a unidade antes'
  if (loadingTurmas.value) return 'Carregando turmas...'
  return 'Selecione a turma'
})

// ─── Tabelas de preço do Supabase ─────────────────────────────────────────────
const { listar: listarTabelas } = useTabelasPreco()
const tabelas       = ref<TabelaPrecoRecord[]>([])
const loadingTabelas = ref(true)

const tabelasOpts = computed(() =>
  tabelas.value.map(t => ({
    label: `${t.nome} — R$ ${Number(t.mensalidade).toLocaleString('pt-BR')}/mês`,
    value: t.id,
  })),
)

async function carregarEscolasETurmas() {
  loadingEscolas.value = true
  loadingTurmas.value  = true
  try {
    const [escResp, turmasResp, etResp] = await Promise.all([
      supabase.from('escolas').select('id, nome_escola').eq('status', 'ativo').order('nome_escola'),
      supabase.from('turmas').select('id, nome, turno').eq('status', 'ativo').order('nome'),
      supabase.from('escola_turmas').select('escola_id, turma_id'),
    ])
    escolas.value      = escResp.data ?? []
    turmas.value       = (turmasResp.data ?? []) as any
    escolaTurmas.value = etResp.data ?? []
  } catch (e) {
    console.error('Erro ao carregar escolas/turmas:', e)
  } finally {
    loadingEscolas.value = false
    loadingTurmas.value  = false
  }
}

onMounted(async () => {
  loadingTabelas.value = true
  await Promise.all([
    (async () => {
      try { tabelas.value = await listarTabelas() }
      catch (e) { console.error('Erro ao carregar tabelas de preço:', e) }
      finally { loadingTabelas.value = false }
    })(),
    carregarEscolasETurmas(),
  ])
})
</script>
