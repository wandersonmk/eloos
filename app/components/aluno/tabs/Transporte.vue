<template>
  <div class="flex flex-col gap-5">
    <FormSection title="Forma de transporte" subtitle="Selecione todas as formas que se aplicam">
      <BaseCheckboxGroup
        :model-value="modelValue.modos"
        @update:model-value="patch({ modos: $event })"
        :options="modosTransporte"
      />
    </FormSection>

    <FormSection title="Autorização de espera">
      <div class="rounded-lg bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 px-3 py-3 mb-1">
        <p class="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed">
          A escola recomenda aos alunos que esperem por seus pais ou transporte escolar
          <strong class="text-slate-800 dark:text-slate-100">dentro da escola</strong>.
          O aluno está autorizado a esperá-los em outro lugar?
        </p>
      </div>

      <BaseRadio
        :model-value="modelValue.esperarFora"
        @update:model-value="patch({ esperarFora: $event })"
        :options="['Sim', 'Não']"
      />
    </FormSection>
  </div>
</template>

<script setup lang="ts">
import type { TransporteData } from '~/composables/useAlunoForm'

const props = defineProps<{ modelValue: TransporteData }>()
const emit  = defineEmits<{ 'update:modelValue': [value: TransporteData] }>()

const modosTransporte = [
  'A pé e sozinho',
  'De ônibus e sozinho',
  'Transporte escolar',
  'Sempre acompanhado por um responsável',
]

function patch(p: Partial<TransporteData>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}
</script>
