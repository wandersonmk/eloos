<template>
  <div class="flex flex-col gap-5">

    <!-- Aviso quando aluno ainda não foi salvo -->
    <div
      v-if="!alunoSalvo"
      class="rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 flex items-start gap-3"
    >
      <div class="w-7 h-7 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
      </div>
      <div class="flex flex-col gap-0.5 min-w-0">
        <p class="text-[13px] font-medium text-amber-800 dark:text-amber-200">Salve o aluno primeiro</p>
        <p class="text-[12px] text-amber-700/80 dark:text-amber-300/80">Para anexar documentos/arquivos é necessário salvar o aluno. Após salvar, esta aba será habilitada para upload sem limite de arquivos.</p>
      </div>
    </div>

    <FormSection title="Arquivar documentação" subtitle="Sem limite de arquivos">
      <!-- Dropzone -->
      <div
        :class="[
          'relative rounded-xl border-2 border-dashed transition-colors px-4 py-8 text-center',
          alunoSalvo
            ? 'border-indigo-300 dark:border-indigo-500/40 hover:border-indigo-400 cursor-pointer bg-indigo-50/30 dark:bg-indigo-900/10'
            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 opacity-60 cursor-not-allowed',
        ]"
        @click="alunoSalvo && fileInput?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*,application/pdf"
          class="hidden"
          @change="onFileChange"
          :disabled="!alunoSalvo"
        />
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"/></svg>
          </div>
          <p class="text-[13px] font-medium text-slate-700 dark:text-slate-200">Clique para selecionar arquivos</p>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">PDF, JPG ou PNG — múltiplos arquivos</p>
        </div>
      </div>

      <!-- Lista de arquivos -->
      <div v-if="modelValue.length === 0" class="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-4 py-6 text-center">
        <p class="text-[12px] text-slate-500 dark:text-slate-400">Nenhum arquivo anexado ainda.</p>
      </div>

      <div v-else class="flex flex-col gap-2">
        <div
          v-for="arq in modelValue"
          :key="arq.id"
          class="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800/40"
        >
          <div class="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
          </div>
          <div class="flex flex-col flex-1 min-w-0">
            <span class="text-[13px] text-slate-800 dark:text-slate-100 truncate">{{ arq.nome }}</span>
            <span class="text-[11px] text-slate-400 dark:text-slate-500">
              {{ arq.tipo }} • {{ formatarTamanho(arq.tamanhoKb) }} • {{ formatarData(arq.uploadedAt) }}
            </span>
          </div>
          <button
            type="button"
            @click="remover(arq.id)"
            class="w-7 h-7 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
            aria-label="Remover"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M5.79 5.79l.518 13.882a2.25 2.25 0 002.244 2.077h7.388a2.25 2.25 0 002.244-2.077L18.21 5.79"/></svg>
          </button>
        </div>
      </div>
    </FormSection>
  </div>
</template>

<script setup lang="ts">
import type { ArquivoAnexado } from '~/composables/useAlunoForm'

const props = defineProps<{
  modelValue: ArquivoAnexado[]
  alunoSalvo: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [value: ArquivoAnexado[]] }>()

const fileInput = ref<HTMLInputElement>()

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const novos: ArquivoAnexado[] = Array.from(files).map(f => ({
    id: `arq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nome: f.name,
    tipo: f.type || 'arquivo',
    tamanhoKb: Math.round(f.size / 1024),
    uploadedAt: new Date().toISOString(),
  }))
  emit('update:modelValue', [...props.modelValue, ...novos])
  if (fileInput.value) fileInput.value.value = ''
}

function remover(id: string) {
  emit('update:modelValue', props.modelValue.filter(a => a.id !== id))
}

function formatarTamanho(kb: number): string {
  if (kb < 1024) return `${kb} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>
