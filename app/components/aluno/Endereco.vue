<template>
  <div class="flex flex-col gap-4">
    <div v-if="showCopiar || allowExterior" class="flex flex-wrap items-center gap-5">
      <BaseCheckbox
        v-if="showCopiar"
        :model-value="modelValue.copiarResponsavel"
        @update:model-value="patch({ copiarResponsavel: $event })"
        label="Copiar endereço do Responsável Financeiro"
      />
      <BaseCheckbox
        v-if="allowExterior"
        :model-value="modelValue.exterior"
        @update:model-value="patch({ exterior: $event })"
        label="Endereço no exterior"
      />
    </div>

    <FormGrid :cols="3">
      <BaseInput
        v-if="!modelValue.exterior"
        :model-value="modelValue.cep"
        @update:model-value="patch({ cep: applyCepMask($event) })"
        label="CEP"
        placeholder="00000-000"
        :required="required"
      >
        <template #suffix>
          <button type="button" @click="buscarCep" class="text-indigo-500 hover:text-indigo-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          </button>
        </template>
      </BaseInput>

      <BaseInput
        :model-value="modelValue.logradouro"
        @update:model-value="patch({ logradouro: $event })"
        label="Logradouro"
        :required="required"
        class="sm:col-span-2"
      />

      <BaseInput
        :model-value="modelValue.numero"
        @update:model-value="patch({ numero: $event })"
        label="Número"
        :required="required"
      />

      <BaseInput
        :model-value="modelValue.bairro"
        @update:model-value="patch({ bairro: $event })"
        label="Bairro"
        :required="required"
      />

      <BaseInput
        :model-value="modelValue.complemento"
        @update:model-value="patch({ complemento: $event })"
        label="Complemento"
      />

      <BaseInput
        :model-value="modelValue.municipio"
        @update:model-value="patch({ municipio: $event })"
        label="Município"
        :required="required"
      />

      <BaseInput
        :model-value="modelValue.uf"
        @update:model-value="patch({ uf: $event.toUpperCase().slice(0, 2) })"
        label="UF"
      />

      <BaseInput
        :model-value="modelValue.pais"
        @update:model-value="patch({ pais: $event })"
        label="País"
      />
    </FormGrid>

    <BaseTextarea
      :model-value="modelValue.observacao"
      @update:model-value="patch({ observacao: $event })"
      label="Observação"
      :rows="2"
    />
  </div>
</template>

<script setup lang="ts">
import type { EnderecoData } from '~/composables/useAlunoForm'

const props = withDefaults(defineProps<{
  modelValue: EnderecoData
  required?: boolean
  showCopiar?: boolean
  allowExterior?: boolean
}>(), { required: false, showCopiar: false, allowExterior: true })

const emit = defineEmits<{ 'update:modelValue': [value: EnderecoData] }>()

function patch(p: Partial<EnderecoData>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}

function applyCepMask(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

function buscarCep() {
  // Mock — no MVP frontend a busca real do CEP fica para a integração futura
}
</script>
