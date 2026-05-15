<template>
  <div class="flex flex-col gap-5">

    <!-- ═════ Dados biométricos ═════ -->
    <FormSection title="Dados biométricos">
      <FormGrid :cols="4">
        <BaseInput  :model-value="modelValue.altura"    @update:model-value="patch({ altura: $event })"    label="Altura (cm)" type="number" />
        <BaseInput  :model-value="modelValue.peso"      @update:model-value="patch({ peso: $event })"      label="Peso (kg)"  type="number" />
        <BaseSelect :model-value="modelValue.corOlhos"  @update:model-value="patch({ corOlhos: $event })"  label="Cor dos olhos"  placeholder="Selecione" :options="corOlhosOpts" />
        <BaseSelect :model-value="modelValue.corCabelo" @update:model-value="patch({ corCabelo: $event })" label="Cor do cabelo"  placeholder="Selecione" :options="corCabeloOpts" />
      </FormGrid>
    </FormSection>

    <!-- ═════ Autorizações ═════ -->
    <FormSection title="Autorizações">
      <BaseRadio
        :model-value="modelValue.autorizaEducFisica"
        @update:model-value="patch({ autorizaEducFisica: $event })"
        label="Autoriza aulas de Educação Física?"
        :options="simNaoOpts"
      />
      <BaseTextarea
        v-if="modelValue.autorizaEducFisica === 'Não'"
        :model-value="modelValue.detalheEducFisica"
        @update:model-value="patch({ detalheEducFisica: $event })"
        label="Detalhar motivo"
        :rows="2"
      />
      <BaseFileUpload
        :model-value="modelValue.atestadoEducFisica"
        @update:model-value="patch({ atestadoEducFisica: $event })"
        label="Anexar atestado médico de atividade física"
        accept="application/pdf,image/*"
      />

      <FormGrid :cols="2">
        <BaseRadio
          :model-value="modelValue.autorizaTylenol"
          @update:model-value="patch({ autorizaTylenol: $event })"
          label="Autorizado uso de Tylenol?"
          :options="simNaoOpts"
        />
        <BaseRadio
          :model-value="modelValue.autorizaMedicacaoFebre"
          @update:model-value="patch({ autorizaMedicacaoFebre: $event })"
          label="Em caso de febre alta, autoriza medicação?"
          :options="simNaoOpts"
        />
      </FormGrid>
    </FormSection>

    <!-- ═════ Doenças e histórico ═════ -->
    <FormSection title="Doenças e histórico clínico">
      <div class="space-y-3">
        <FormGrid :cols="2">
          <BaseRadio :model-value="modelValue.epileptico" @update:model-value="patch({ epileptico: $event })" label="Epilético?" :options="simNaoOpts" />
          <BaseRadio v-if="modelValue.epileptico === 'Sim'" :model-value="modelValue.tratamentoEpilepsia" @update:model-value="patch({ tratamentoEpilepsia: $event })" label="Faz tratamento? (epilepsia)" :options="simNaoOpts" />
        </FormGrid>
        <BaseTextarea v-if="modelValue.epileptico === 'Sim'" :model-value="modelValue.observacaoEpilepsia" @update:model-value="patch({ observacaoEpilepsia: $event })" label="Observação sobre epilepsia" :rows="2" />

        <FormGrid :cols="2">
          <BaseRadio :model-value="modelValue.asmatico" @update:model-value="patch({ asmatico: $event })" label="Asmático?" :options="simNaoOpts" />
          <BaseRadio v-if="modelValue.asmatico === 'Sim'" :model-value="modelValue.tratamentoAsma" @update:model-value="patch({ tratamentoAsma: $event })" label="Faz tratamento? (asma)" :options="simNaoOpts" />
        </FormGrid>
        <BaseTextarea v-if="modelValue.asmatico === 'Sim'" :model-value="modelValue.observacaoAsma" @update:model-value="patch({ observacaoAsma: $event })" label="Observação sobre asma" :rows="2" />

        <FormGrid :cols="2">
          <BaseRadio :model-value="modelValue.diabetico"  @update:model-value="patch({ diabetico: $event })"  label="Diabético?"           :options="simNaoOpts" />
          <BaseRadio :model-value="modelValue.convulsoes" @update:model-value="patch({ convulsoes: $event })" label="Apresenta convulsões?" :options="simNaoOpts" />
          <BaseRadio :model-value="modelValue.cardiacos"  @update:model-value="patch({ cardiacos: $event })"  label="Problemas cardíacos?" :options="simNaoOpts" />
          <BaseRadio :model-value="modelValue.desmaios"   @update:model-value="patch({ desmaios: $event })"   label="Desmaios?"             :options="simNaoOpts" />
        </FormGrid>
      </div>

      <BaseCheckboxGroup
        :model-value="modelValue.doencas"
        @update:model-value="patch({ doencas: $event })"
        label="Doenças do aluno"
        :options="doencasOpts"
      />

      <BaseCheckboxGroup
        :model-value="modelValue.doencasContagiosas"
        @update:model-value="patch({ doencasContagiosas: $event })"
        label="Doenças contagiosas"
        :options="doencasContagiosasOpts"
      />

      <FormGrid :cols="2">
        <BaseTextarea :model-value="modelValue.cirurgia"          @update:model-value="patch({ cirurgia: $event })"          label="Já fez cirurgia? Qual?" :rows="2" />
        <BaseTextarea :model-value="modelValue.acidente"          @update:model-value="patch({ acidente: $event })"          label="Já teve acidente grave?" :rows="2" />
        <BaseTextarea :model-value="modelValue.outroProblema"     @update:model-value="patch({ outroProblema: $event })"     label="Outro problema de saúde?" :rows="2" />
        <BaseTextarea :model-value="modelValue.tratamentoMedico"  @update:model-value="patch({ tratamentoMedico: $event })"  label="Faz tratamento médico?"   :rows="2" />
        <BaseTextarea :model-value="modelValue.temores"           @update:model-value="patch({ temores: $event })"           label="Possui temores?"          :rows="2" />
        <BaseTextarea :model-value="modelValue.medicamentoRegular" @update:model-value="patch({ medicamentoRegular: $event })" label="Toma medicamento regularmente?" :rows="2" />
      </FormGrid>

      <div>
        <h4 class="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Medicamentos adicionais autorizados</h4>
        <AlunoListaDinamica
          :model-value="modelValue.medicamentos"
          @update:model-value="patch({ medicamentos: $event })"
          item-label="Medicamento"
          add-label="Adicionar medicamento"
          empty-message="Nenhum medicamento autorizado cadastrado."
          :new-item="() => ({ nome: '', dosagem: '', observacao: '' })"
        >
          <template #default="{ item, update }">
            <FormGrid :cols="3">
              <BaseInput :model-value="item.nome"       @update:model-value="update({ nome: $event })"       label="Nome do medicamento" />
              <BaseInput :model-value="item.dosagem"    @update:model-value="update({ dosagem: $event })"    label="Dosagem" />
              <BaseInput :model-value="item.observacao" @update:model-value="update({ observacao: $event })" label="Observação" />
            </FormGrid>
          </template>
        </AlunoListaDinamica>
      </div>
    </FormSection>

    <!-- ═════ Alergias ═════ -->
    <FormSection title="Alergias">
      <BaseCheckboxGroup
        :model-value="modelValue.alergias"
        @update:model-value="patch({ alergias: $event })"
        label="Alergias do aluno"
        :options="alergiasOpts"
      />
      <BaseTextarea :model-value="modelValue.alergiaMedicamento" @update:model-value="patch({ alergiaMedicamento: $event })" label="Alérgico a algum medicamento? Detalhar" :rows="2" />
      <BaseTextarea :model-value="modelValue.outrasAlergias"     @update:model-value="patch({ outrasAlergias: $event })"     label="Outras alergias" :rows="2" />
    </FormSection>

    <!-- ═════ Vacinas ═════ -->
    <FormSection title="Vacinas">
      <FormGrid :cols="2">
        <BaseFileUpload
          :model-value="modelValue.anexoVacinacao"
          @update:model-value="patch({ anexoVacinacao: $event })"
          label="Anexar carteirinha de vacinação"
        />
        <BaseFileUpload
          :model-value="modelValue.declaracaoPediatra"
          @update:model-value="patch({ declaracaoPediatra: $event })"
          label="Anexar declaração do pediatra sobre vacinação"
        />
      </FormGrid>

      <BaseCheckboxGroup
        :model-value="modelValue.vacinas"
        @update:model-value="patch({ vacinas: $event })"
        label="Vacinas do aluno"
        :options="vacinasOpts"
      />

      <BaseSelect
        :model-value="modelValue.tipoSanguineo"
        @update:model-value="patch({ tipoSanguineo: $event })"
        label="Tipo sanguíneo"
        placeholder="Selecione"
        :options="tipoSanguineoOpts"
      />
    </FormSection>

    <!-- ═════ Restrições alimentares ═════ -->
    <FormSection title="Restrições alimentares">
      <BaseTextarea
        :model-value="modelValue.restricoesAlimentares"
        @update:model-value="patch({ restricoesAlimentares: $event })"
        label="Descrição das restrições alimentares"
        :rows="3"
      />
      <BaseRadio
        :model-value="modelValue.comeSozinho"
        @update:model-value="patch({ comeSozinho: $event })"
        label="Come sozinho?"
        :options="simNaoOpts"
      />
    </FormSection>

    <!-- ═════ Higiene ═════ -->
    <FormSection title="Higiene">
      <BaseRadio
        :model-value="modelValue.usaFraldas"
        @update:model-value="patch({ usaFraldas: $event })"
        label="Usa fraldas?"
        :options="usaFraldasOpts"
      />
      <BaseRadio
        :model-value="modelValue.pedeBanheiro"
        @update:model-value="patch({ pedeBanheiro: $event })"
        label="Pede para ir ao banheiro?"
        :options="simNaoOpts"
      />
      <BaseTextarea
        :model-value="modelValue.cuidadoExtra"
        @update:model-value="patch({ cuidadoExtra: $event })"
        label="Necessita de cuidado extra?"
        :rows="2"
      />
    </FormSection>

    <!-- ═════ Plano de saúde ═════ -->
    <FormSection title="Plano de saúde e hospital">
      <FormGrid :cols="2">
        <BaseInput :model-value="modelValue.operadoraPlano"     @update:model-value="patch({ operadoraPlano: $event })"     label="Operadora do plano" />
        <BaseInput :model-value="modelValue.tipoPlano"          @update:model-value="patch({ tipoPlano: $event })"          label="Tipo do plano" />
        <BaseInput :model-value="modelValue.numeroPlano"        @update:model-value="patch({ numeroPlano: $event })"        label="Nº do plano de saúde" />
        <BaseInput :model-value="modelValue.hospitalReferencia" @update:model-value="patch({ hospitalReferencia: $event })" label="Hospital de referência (remoção)" />
      </FormGrid>
    </FormSection>

  </div>
</template>

<script setup lang="ts">
import type { FichaMedicaData } from '~/composables/useAlunoForm'

const props = defineProps<{ modelValue: FichaMedicaData }>()
const emit  = defineEmits<{ 'update:modelValue': [value: FichaMedicaData] }>()

function patch(p: Partial<FichaMedicaData>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}
</script>
