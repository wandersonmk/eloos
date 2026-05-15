<template>
  <div class="flex flex-col gap-4">
    <BaseRadio
      :model-value="modelValue.trabalha"
      @update:model-value="patch({ trabalha: $event })"
      label="Trabalha?"
      :options="[{ label: 'Sim', value: true }, { label: 'Não', value: false }]"
    />

    <div v-if="modelValue.trabalha" class="flex flex-col gap-4">
      <FormGrid :cols="2">
        <BaseInput :model-value="modelValue.local"        @update:model-value="patch({ local: $event })"        label="Local de trabalho" />
        <BaseInput :model-value="modelValue.cargo"        @update:model-value="patch({ cargo: $event })"        label="Cargo / Função" />
        <BaseInput :model-value="modelValue.horaInicio"   @update:model-value="patch({ horaInicio: $event })"   label="Hora início" type="time" />
        <BaseInput :model-value="modelValue.horaFim"      @update:model-value="patch({ horaFim: $event })"      label="Hora fim"    type="time" />
        <BaseInput :model-value="modelValue.telefone"     @update:model-value="patch({ telefone: $event })"     label="Telefone"    placeholder="(00) 0000-0000" />
      </FormGrid>
      <BaseTextarea :model-value="modelValue.observacao" @update:model-value="patch({ observacao: $event })" label="Observação" :rows="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrabalhoData } from '~/composables/useAlunoForm'

const props = defineProps<{ modelValue: TrabalhoData }>()
const emit  = defineEmits<{ 'update:modelValue': [value: TrabalhoData] }>()

function patch(p: Partial<TrabalhoData>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}
</script>
