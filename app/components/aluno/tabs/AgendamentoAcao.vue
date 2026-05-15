<template>
  <div class="flex flex-col gap-5">

    <FormSection title="Filtrar agendamentos" dense>
      <FormGrid :cols="3">
        <BaseSelect v-model="filtro.tipoAcao"   label="Tipo de ação"        placeholder="Todos" :options="tiposAcao" />
        <BaseInput  v-model="filtro.dataInicio" label="Data início"         type="date" />
        <BaseInput  v-model="filtro.dataFim"    label="Data fim"            type="date" />
        <BaseSelect v-model="filtro.usuario"    label="Usuário responsável" placeholder="Todos" :options="usuariosMock" />
      </FormGrid>

      <FormGrid :cols="3">
        <BaseRadio v-model="filtro.jaExecutado"      label="Já executado?"    :options="['Todos', 'Sim', 'Não']" />
        <BaseRadio v-model="filtro.pediuAtendimento" label="Pediu atendimento" :options="['Todos', 'Sim', 'Não']" />
        <BaseRadio v-model="filtro.foiChamado"       label="Foi chamado?"     :options="['Todos', 'Sim', 'Não']" />
      </FormGrid>

      <div class="flex items-center justify-end gap-2">
        <BaseButton variant="ghost"   @click="limparFiltro">Limpar</BaseButton>
        <BaseButton variant="primary" @click="aplicarFiltro">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          Localizar
        </BaseButton>
      </div>
    </FormSection>

    <FormSection title="Agendamentos">
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

      <div v-if="!filtrados.length" class="flex flex-col items-center justify-center py-8 gap-2">
        <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
        </div>
        <p class="text-[13px] text-slate-500 dark:text-slate-400">Nenhum agendamento encontrado</p>
      </div>

      <div v-else class="flex flex-col gap-2">
        <div
          v-for="a in filtrados"
          :key="a.id"
          class="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2.5 bg-white dark:bg-slate-800/40"
        >
          <div class="flex items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{{ a.tipoAcao || '—' }}</span>
              <span class="text-[11px] text-slate-400 dark:text-slate-500">{{ formatar(a.data) }}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-md', a.jaExecutado === 'Sim' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300']">
                {{ a.jaExecutado === 'Sim' ? 'EXECUTADO' : 'PENDENTE' }}
              </span>
              <button type="button" @click="remover(a.id)" class="w-6 h-6 flex items-center justify-center rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" aria-label="Remover">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <p class="text-[12px] text-slate-600 dark:text-slate-300">{{ a.descricao }}</p>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-1">por {{ a.usuario }}</p>
        </div>
      </div>
    </FormSection>

    <BaseModal v-model="modalAberto" title="Novo agendamento de ação" size="md">
      <div class="flex flex-col gap-3">
        <FormGrid :cols="2">
          <BaseSelect v-model="rascunho.tipoAcao" label="Tipo de ação"        required placeholder="Selecione" :options="tiposAcao" />
          <BaseInput  v-model="rascunho.data"     label="Data"                required type="date" />
          <BaseSelect v-model="rascunho.usuario"  label="Usuário responsável" required placeholder="Selecione" :options="usuariosMock" />
        </FormGrid>
        <BaseTextarea v-model="rascunho.descricao" label="Descrição da ação" required :rows="3" />
        <FormGrid :cols="3">
          <BaseRadio v-model="rascunho.jaExecutado"      label="Já executado?"     required :options="['Sim', 'Não']" />
          <BaseRadio v-model="rascunho.pediuAtendimento" label="Pediu atendimento" required :options="['Sim', 'Não']" />
          <BaseRadio v-model="rascunho.foiChamado"       label="Foi chamado?"      required :options="['Sim', 'Não']" />
        </FormGrid>
      </div>
      <template #footer>
        <BaseButton variant="ghost"   @click="modalAberto = false">Cancelar</BaseButton>
        <BaseButton variant="primary" :disabled="!rascunhoValido" @click="salvar">Salvar agendamento</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import type { AgendamentoAcao } from '~/composables/useAlunoForm'
import { toast } from 'vue-sonner'

const props = defineProps<{ modelValue: AgendamentoAcao[] }>()
const emit  = defineEmits<{ 'update:modelValue': [value: AgendamentoAcao[]] }>()

const tiposAcao    = ['Atendimento Pedagógico', 'Conversa com responsáveis', 'Encaminhamento médico', 'Reunião familiar', 'Visita domiciliar', 'Outro']
const usuariosMock = ['Ana Clara Mendes', 'Marcos Silva', 'Beatriz Oliveira', 'Coordenação Geral']

const filtro = ref({
  tipoAcao: '', dataInicio: '', dataFim: '', usuario: '',
  jaExecutado: 'Todos', pediuAtendimento: 'Todos', foiChamado: 'Todos',
})
const filtroAtivo = ref({ ...filtro.value })

const modalAberto = ref(false)
const rascunho    = ref<Omit<AgendamentoAcao, 'id'>>(emptyRascunho())

function emptyRascunho() {
  return {
    tipoAcao: '',
    data: new Date().toISOString().slice(0, 10),
    usuario: '',
    descricao: '',
    jaExecutado: '',
    pediuAtendimento: '',
    foiChamado: '',
  }
}

const rascunhoValido = computed(() =>
  rascunho.value.tipoAcao &&
  rascunho.value.data &&
  rascunho.value.usuario &&
  rascunho.value.descricao.trim() &&
  rascunho.value.jaExecutado &&
  rascunho.value.pediuAtendimento &&
  rascunho.value.foiChamado
)

const filtrados = computed(() => {
  const f = filtroAtivo.value
  return props.modelValue.filter(a => {
    if (f.tipoAcao   && a.tipoAcao !== f.tipoAcao)        return false
    if (f.dataInicio && a.data < f.dataInicio)            return false
    if (f.dataFim    && a.data > f.dataFim)               return false
    if (f.usuario    && a.usuario !== f.usuario)          return false
    if (f.jaExecutado      !== 'Todos' && a.jaExecutado      !== f.jaExecutado)      return false
    if (f.pediuAtendimento !== 'Todos' && a.pediuAtendimento !== f.pediuAtendimento) return false
    if (f.foiChamado       !== 'Todos' && a.foiChamado       !== f.foiChamado)       return false
    return true
  })
})

function abrirNovo() {
  rascunho.value = emptyRascunho()
  modalAberto.value = true
}

function salvar() {
  if (!rascunhoValido.value) return
  const novo: AgendamentoAcao = { id: `ag-${Date.now()}`, ...rascunho.value }
  emit('update:modelValue', [novo, ...props.modelValue])
  modalAberto.value = false
  toast.success('Agendamento adicionado.')
}

function remover(id: string) {
  emit('update:modelValue', props.modelValue.filter(a => a.id !== id))
}

function aplicarFiltro() { filtroAtivo.value = { ...filtro.value } }
function limparFiltro() {
  filtro.value = {
    tipoAcao: '', dataInicio: '', dataFim: '', usuario: '',
    jaExecutado: 'Todos', pediuAtendimento: 'Todos', foiChamado: 'Todos',
  }
  filtroAtivo.value = { ...filtro.value }
}

function formatar(iso: string): string {
  return iso ? new Date(iso).toLocaleDateString('pt-BR') : ''
}
</script>
