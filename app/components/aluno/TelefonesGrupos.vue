<template>
  <div class="flex flex-col gap-4">
    <div v-for="grupo in grupos" :key="grupo.key" class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
        </div>
        <h4 class="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">{{ grupo.label }}</h4>
      </div>

      <div class="space-y-2">
        <FormGrid v-for="(_, i) in 3" :key="i" :cols="2">
          <BaseInput
            :model-value="modelValue[grupo.key][i].telefone"
            @update:model-value="updatePhone(grupo.key, i, 'telefone', $event)"
            :label="`Telefone ${i + 1}`"
            placeholder="(00) 00000-0000"
          />
          <BaseInput
            :model-value="modelValue[grupo.key][i].observacao"
            @update:model-value="updatePhone(grupo.key, i, 'observacao', $event)"
            label="Observação"
            placeholder="Ex.: recados, WhatsApp"
          />
        </FormGrid>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TelefonesData, PhoneEntry } from '~/composables/useAlunoForm'

const props = defineProps<{ modelValue: TelefonesData }>()
const emit  = defineEmits<{ 'update:modelValue': [value: TelefonesData] }>()

const grupos = [
  { key: 'residencial' as const, label: 'Tel. Residencial' },
  { key: 'comercial'   as const, label: 'Tel. Comercial'   },
  { key: 'contato'     as const, label: 'Tel. Contato'     },
]

function updatePhone(group: keyof TelefonesData, idx: number, field: keyof PhoneEntry, value: string) {
  const next = { ...props.modelValue, [group]: props.modelValue[group].map((p, i) => i === idx ? { ...p, [field]: value } : p) }
  emit('update:modelValue', next)
}
</script>
