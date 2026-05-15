<template>
  <div class="flex flex-col gap-5">
    <FormSection title="Documentos pendentes" subtitle="Marque os documentos que ainda não foram entregues">
      <template #actions>
        <button
          type="button"
          @click="abrirNovo = true"
          class="flex items-center gap-1.5 h-8 px-3 text-[12px] rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
          Novo tipo
        </button>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label
          v-for="doc in modelValue"
          :key="doc.id"
          :class="[
            'flex items-center justify-between gap-2 px-3 py-2 rounded-lg border transition-colors cursor-pointer',
            doc.pendente
              ? 'border-amber-300 bg-amber-50/70 dark:bg-amber-900/15'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/40',
          ]"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              :class="[
                'relative shrink-0 w-[18px] h-[18px] rounded-md border-2 transition-all flex items-center justify-center',
                doc.pendente
                  ? 'bg-amber-500 border-amber-500'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500',
              ]"
            >
              <svg v-if="doc.pendente" class="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6.5l2.5 2.5L10 3" /></svg>
            </span>
            <input
              type="checkbox"
              :checked="doc.pendente"
              @change="togglePendente(doc.id, ($event.target as HTMLInputElement).checked)"
              class="sr-only"
            />
            <span class="text-[13px] text-slate-700 dark:text-slate-200 truncate uppercase">{{ doc.nome }}</span>
          </div>
          <span
            v-if="doc.pendente"
            class="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-200/70 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 shrink-0"
          >PENDENTE</span>
          <button
            v-if="doc.customizado"
            type="button"
            @click.prevent="remover(doc.id)"
            class="w-6 h-6 flex items-center justify-center rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
            aria-label="Remover"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </label>
      </div>
    </FormSection>

    <BaseModal v-model="abrirNovo" title="Novo tipo de documento" size="sm">
      <FormGrid :cols="1">
        <BaseInput v-model="novoNome" label="Nome do documento" placeholder="Ex.: Carteira de Vacinação" />
        <BaseCheckbox v-model="novoPendente" label="Já marcar como pendente" />
      </FormGrid>
      <template #footer>
        <BaseButton variant="ghost" @click="abrirNovo = false">Cancelar</BaseButton>
        <BaseButton variant="primary" :disabled="!novoNome.trim()" @click="adicionarTipo">Adicionar</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import type { DocumentoPendente } from '~/composables/useAlunoForm'

const props = defineProps<{ modelValue: DocumentoPendente[] }>()
const emit  = defineEmits<{ 'update:modelValue': [value: DocumentoPendente[]] }>()

const abrirNovo    = ref(false)
const novoNome     = ref('')
const novoPendente = ref(false)

function togglePendente(id: string, pendente: boolean) {
  emit('update:modelValue', props.modelValue.map(d => d.id === id ? { ...d, pendente } : d))
}

function remover(id: string) {
  emit('update:modelValue', props.modelValue.filter(d => d.id !== id))
}

function adicionarTipo() {
  const nome = novoNome.value.trim()
  if (!nome) return
  const id = `custom-${Date.now()}`
  emit('update:modelValue', [...props.modelValue, { id, nome, pendente: novoPendente.value, customizado: true }])
  novoNome.value = ''
  novoPendente.value = false
  abrirNovo.value = false
}
</script>
