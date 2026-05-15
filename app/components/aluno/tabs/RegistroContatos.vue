<template>
  <div class="flex flex-col gap-5">

    <!-- Filtros -->
    <FormSection title="Filtrar registros" dense>
      <FormGrid :cols="3">
        <BaseInput  v-model="filtro.dataInicio" label="Data início" type="date" />
        <BaseInput  v-model="filtro.dataFim"    label="Data fim"    type="date" />
        <BaseSelect v-model="filtro.assunto"    label="Assunto"     placeholder="Todos" :options="assuntoOpts" />
        <BaseSelect v-model="filtro.usuario"    label="Usuário responsável" placeholder="Todos" :options="usuariosMock" />
        <BaseTextarea v-model="filtro.descricao" label="Descrição contém" :rows="1" class="sm:col-span-2" />
      </FormGrid>
      <div class="flex items-center justify-end gap-2">
        <BaseButton variant="ghost"   @click="limparFiltro">Limpar</BaseButton>
        <BaseButton variant="primary" @click="aplicarFiltro">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          Localizar
        </BaseButton>
      </div>
    </FormSection>

    <!-- Lista -->
    <FormSection title="Histórico de contatos">
      <template #actions>
        <button
          type="button"
          @click="abrirNovo"
          class="flex items-center gap-1.5 h-8 px-3 text-[12px] rounded-md bg-emerald-600 text-white hover:bg-emerald-700 font-medium"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
          Incluir novo
        </button>
      </template>

      <div v-if="!registrosFiltrados.length" class="flex flex-col items-center justify-center py-8 gap-2">
        <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
        </div>
        <p class="text-[13px] text-slate-500 dark:text-slate-400">Nenhum registro de contato encontrado</p>
      </div>

      <div v-else class="flex flex-col gap-2">
        <div
          v-for="reg in registrosFiltrados"
          :key="reg.id"
          class="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-white dark:bg-slate-800/40"
        >
          <div class="flex items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{{ reg.assunto || '—' }}</span>
              <span class="text-[11px] text-slate-400 dark:text-slate-500">{{ formatar(reg.data) }} {{ reg.hora }}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span v-if="reg.pediuAtendimento === 'Sim'" class="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">PEDIU ATENDIMENTO</span>
              <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-md', reg.jaExecutado === 'Sim' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300']">
                {{ reg.jaExecutado === 'Sim' ? 'EXECUTADO' : 'PENDENTE' }}
              </span>
              <button type="button" @click="remover(reg.id)" class="w-6 h-6 flex items-center justify-center rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" aria-label="Remover">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <p class="text-[12px] text-slate-600 dark:text-slate-300">{{ reg.descricao }}</p>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">por {{ reg.usuario }}</p>
        </div>
      </div>
    </FormSection>

    <!-- Modal de novo registro -->
    <BaseModal v-model="modalAberto" title="Novo registro de contato" size="md">
      <div class="flex flex-col gap-3">
        <FormGrid :cols="2">
          <BaseInput  v-model="rascunho.data" label="Data" type="date" required />
          <BaseInput  v-model="rascunho.hora" label="Hora" type="time" />
        </FormGrid>
        <FormGrid :cols="2">
          <BaseSelect v-model="rascunho.assunto" label="Assunto"             required placeholder="Selecione" :options="assuntoOpts" />
          <BaseSelect v-model="rascunho.usuario" label="Usuário responsável" required placeholder="Selecione" :options="usuariosMock" />
        </FormGrid>
        <BaseTextarea v-model="rascunho.descricao" label="Histórico / descrição" required :rows="4" />

        <FormGrid :cols="2">
          <BaseRadio v-model="rascunho.pediuAtendimento" label="Pediu atendimento?" required :options="['Sim', 'Não']" />
          <BaseRadio v-model="rascunho.jaExecutado"      label="Já executado?"     required :options="['Sim', 'Não']" />
        </FormGrid>
      </div>

      <template #footer>
        <BaseButton variant="ghost"   @click="modalAberto = false">Cancelar</BaseButton>
        <BaseButton variant="primary" :disabled="!rascunhoValido" @click="salvar">Salvar registro</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import type { RegistroContato } from '~/composables/useAlunoForm'
import { toast } from 'vue-sonner'

const props = defineProps<{ modelValue: RegistroContato[] }>()
const emit  = defineEmits<{ 'update:modelValue': [value: RegistroContato[]] }>()

const assuntoOpts  = ['Pedagógico', 'Disciplinar', 'Financeiro', 'Saúde', 'Família', 'Outro']
const usuariosMock = ['Ana Clara Mendes', 'Marcos Silva', 'Beatriz Oliveira', 'Coordenação Geral']

const filtro = ref({ dataInicio: '', dataFim: '', assunto: '', usuario: '', descricao: '' })
const filtroAtivo = ref({ ...filtro.value })

const modalAberto = ref(false)
const rascunho    = ref<Omit<RegistroContato, 'id'>>(emptyRascunho())

function emptyRascunho() {
  return {
    data: new Date().toISOString().slice(0, 10),
    hora: '',
    assunto: '',
    usuario: '',
    descricao: '',
    pediuAtendimento: '',
    jaExecutado: '',
  }
}

const rascunhoValido = computed(() =>
  rascunho.value.data &&
  rascunho.value.assunto &&
  rascunho.value.usuario &&
  rascunho.value.descricao.trim() &&
  rascunho.value.pediuAtendimento &&
  rascunho.value.jaExecutado
)

const registrosFiltrados = computed(() => {
  const f = filtroAtivo.value
  return props.modelValue.filter(r => {
    if (f.dataInicio && r.data < f.dataInicio) return false
    if (f.dataFim    && r.data > f.dataFim)    return false
    if (f.assunto    && r.assunto !== f.assunto) return false
    if (f.usuario    && r.usuario !== f.usuario) return false
    if (f.descricao  && !r.descricao.toLowerCase().includes(f.descricao.toLowerCase())) return false
    return true
  })
})

function abrirNovo() {
  rascunho.value = emptyRascunho()
  modalAberto.value = true
}

function salvar() {
  if (!rascunhoValido.value) return
  const novo: RegistroContato = { id: `reg-${Date.now()}`, ...rascunho.value }
  emit('update:modelValue', [novo, ...props.modelValue])
  modalAberto.value = false
  toast.success('Registro de contato adicionado.')
}

function remover(id: string) {
  emit('update:modelValue', props.modelValue.filter(r => r.id !== id))
}

function aplicarFiltro() {
  filtroAtivo.value = { ...filtro.value }
}

function limparFiltro() {
  filtro.value      = { dataInicio: '', dataFim: '', assunto: '', usuario: '', descricao: '' }
  filtroAtivo.value = { ...filtro.value }
}

function formatar(iso: string): string {
  return iso ? new Date(iso).toLocaleDateString('pt-BR') : ''
}
</script>
