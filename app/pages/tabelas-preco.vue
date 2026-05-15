<template>
  <div class="flex flex-col gap-6">

    <!-- ═════ Cabeçalho ═════ -->
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Tabelas de Preço</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Gerencie tabelas de mensalidade, matrícula e material da sua empresa. Aplicáveis a cada aluno individualmente no cadastro.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <BaseSelect
          v-model="anoLetivo"
          :options="anosLetivosOpts"
          class="w-32"
        />
        <BaseButton size="md" @click="abrirNova">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Nova tabela
        </BaseButton>
      </div>
    </div>

    <!-- ═════ Loading / empty ═════ -->
    <div v-if="loading" class="text-center py-12 text-slate-500">
      <Icon name="lucide:loader-2" class="w-5 h-5 mx-auto mb-2 animate-spin" />
      Carregando tabelas...
    </div>

    <div
      v-else-if="!tabelas.length"
      class="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-4 py-12 text-center"
    >
      <Icon name="lucide:tag" class="w-8 h-8 mx-auto mb-2 text-slate-300" />
      <p class="text-sm text-slate-700 dark:text-slate-200 font-medium">Nenhuma tabela cadastrada</p>
      <p class="text-[12px] text-slate-500 mt-1">Clique em "Nova tabela" para cadastrar a primeira.</p>
    </div>

    <!-- ═════ Tabela ═════ -->
    <div v-else class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr class="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <th class="text-left font-semibold px-4 py-3">Tabela</th>
              <th class="text-right font-semibold px-3 py-3">Mensalidade</th>
              <th class="text-right font-semibold px-3 py-3">Matrícula</th>
              <th class="text-right font-semibold px-3 py-3">Material</th>
              <th class="text-left font-semibold px-3 py-3">Alunos vinculados</th>
              <th class="text-left font-semibold px-3 py-3">Status</th>
              <th class="px-3 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="p in tabelas" :key="p.id" class="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors">
              <td class="px-4 py-3">
                <p class="font-medium text-slate-800 dark:text-slate-100">{{ p.nome }}</p>
                <p v-if="p.descricao" class="text-[11px] text-slate-500 truncate max-w-[300px]">{{ p.descricao }}</p>
              </td>
              <td class="px-3 py-3 tabular-nums text-right text-slate-700 dark:text-slate-200">R$ {{ Number(p.mensalidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
              <td class="px-3 py-3 tabular-nums text-right text-slate-700 dark:text-slate-200">R$ {{ Number(p.matricula).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
              <td class="px-3 py-3 tabular-nums text-right text-slate-700 dark:text-slate-200">R$ {{ Number(p.material).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
              <td class="px-3 py-3 text-xs text-slate-500">{{ p.alunos_count ?? 0 }} aluno(s)</td>
              <td class="px-3 py-3">
                <span class="inline-flex items-center gap-1.5 text-xs">
                  <span class="w-1.5 h-1.5 rounded-full" :class="p.status === 'ativo' ? 'bg-emerald-500' : p.status === 'suspenso' ? 'bg-amber-500' : 'bg-slate-300'"></span>
                  {{ p.status === 'ativo' ? 'Ativa' : p.status === 'suspenso' ? 'Suspensa' : 'Inativa' }}
                </span>
              </td>
              <td class="px-3 py-3 text-right">
                <div class="inline-flex items-center gap-1">
                  <button @click="editar(p)" class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Editar">
                    <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
                  </button>
                  <button @click="removerConfirm(p)" class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" title="Remover">
                    <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═════ MODAL — Nova / editar tabela ═════ -->
    <BaseModal
      v-model="modalAberto"
      :title="form.id ? `Editar — ${form.nome || 'Tabela'}` : 'Nova tabela de preço'"
      subtitle="Defina mensalidade, matrícula e material. A tabela pode ser aplicada a qualquer aluno da empresa."
      size="md"
    >
      <template #icon>
        <Icon :name="form.id ? 'lucide:pencil' : 'lucide:tag'" class="w-4 h-4" />
      </template>

      <form class="flex flex-col gap-4" @submit.prevent="salvar">
        <FormSection title="Identificação" dense>
          <BaseInput v-model="form.nome" label="Nome da tabela" placeholder="Ex.: Fundamental I — Regular" required />
          <BaseInput v-model="form.descricao" label="Descrição (opcional)" placeholder="Anotações internas, observações..." />
          <FormGrid :cols="2">
            <BaseInput
              :model-value="String(form.ano_letivo)"
              @update:model-value="form.ano_letivo = Number($event) || new Date().getFullYear()"
              label="Ano letivo"
              type="number"
            />
            <BaseSelect
              v-model="form.status"
              label="Status"
              :options="[
                { label: 'Ativa',    value: 'ativo'    },
                { label: 'Inativa',  value: 'inativo'  },
                { label: 'Suspensa', value: 'suspenso' },
              ]"
            />
          </FormGrid>
        </FormSection>

        <FormSection title="Valores" dense>
          <FormGrid :cols="3">
            <BaseInput
              :model-value="mensalidadeMasc"
              @update:model-value="onValorChange('mensalidade', $event)"
              label="Mensalidade"
              placeholder="R$ 0,00"
            />
            <BaseInput
              :model-value="matriculaMasc"
              @update:model-value="onValorChange('matricula', $event)"
              label="Matrícula"
              placeholder="R$ 0,00"
            />
            <BaseInput
              :model-value="materialMasc"
              @update:model-value="onValorChange('material', $event)"
              label="Material"
              placeholder="R$ 0,00"
            />
          </FormGrid>
        </FormSection>
      </form>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalAberto = false">Cancelar</BaseButton>
        <BaseButton size="sm" :disabled="salvando" @click="salvar">
          <Icon v-if="salvando" name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
          <Icon v-else          name="lucide:check"    class="w-3.5 h-3.5" />
          {{ form.id ? 'Salvar alterações' : 'Cadastrar tabela' }}
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { StatusGeral } from '~/types/database.types'
import { useTabelasPreco, type TabelaPrecoRecord } from '~/composables/useTabelasPreco'
import { parseBRL, formatBRL } from '~/utils/currency'

definePageMeta({ title: 'Tabelas de Preço' })

const { listar, criar, atualizar, remover } = useTabelasPreco()

const anoAtual = new Date().getFullYear()

const anoLetivo = ref(anoAtual)
const tabelas   = ref<TabelaPrecoRecord[]>([])
const loading   = ref(true)

const anosLetivosOpts = computed(() => {
  const anos = new Set<number>([anoAtual, anoAtual - 1, anoAtual + 1])
  return Array.from(anos).sort((a, b) => b - a).map(a => ({ label: String(a), value: a }))
})

async function recarregar() {
  loading.value = true
  try {
    tabelas.value = await listar({ anoLetivo: anoLetivo.value })
  } catch (e: any) {
    toast.error(`Erro ao carregar tabelas: ${e?.message ?? ''}`)
  } finally {
    loading.value = false
  }
}

watch(anoLetivo, recarregar)
onMounted(recarregar)

// ─── Modal ────────────────────────────────────────────────────────────────────
const modalAberto = ref(false)
const salvando    = ref(false)
const form        = ref(formVazio())

// Máscaras BRL — mostra "R$ 1.234,56" no input mas guarda number em form.*
const mensalidadeMasc = computed(() => formatBRL(form.value.mensalidade))
const matriculaMasc   = computed(() => formatBRL(form.value.matricula))
const materialMasc    = computed(() => formatBRL(form.value.material))

function onValorChange(campo: 'mensalidade' | 'matricula' | 'material', valor: string) {
  form.value[campo] = parseBRL(valor)
}

function formVazio() {
  return {
    id:          '' as string,
    nome:        '',
    descricao:   '',
    mensalidade: 0,
    matricula:   0,
    material:    0,
    ano_letivo:  anoLetivo.value,
    status:      'ativo' as StatusGeral,
  }
}

function abrirNova() {
  form.value = formVazio()
  modalAberto.value = true
}

function editar(t: TabelaPrecoRecord) {
  form.value = {
    id:          t.id,
    nome:        t.nome,
    descricao:   t.descricao ?? '',
    mensalidade: Number(t.mensalidade),
    matricula:   Number(t.matricula),
    material:    Number(t.material),
    ano_letivo:  t.ano_letivo,
    status:      t.status,
  }
  modalAberto.value = true
}

async function salvar() {
  if (!form.value.nome.trim()) return toast.error('Informe o nome da tabela.')
  salvando.value = true
  try {
    const payload = {
      nome:        form.value.nome.trim(),
      descricao:   form.value.descricao || null,
      mensalidade: form.value.mensalidade,
      matricula:   form.value.matricula,
      material:    form.value.material,
      ano_letivo:  form.value.ano_letivo,
      status:      form.value.status,
    }
    if (form.value.id) {
      await atualizar(form.value.id, payload)
      toast.success('Tabela atualizada!')
    } else {
      await criar(payload)
      toast.success('Tabela cadastrada!')
    }
    modalAberto.value = false
    await recarregar()
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  } finally {
    salvando.value = false
  }
}

async function removerConfirm(t: TabelaPrecoRecord) {
  if (t.alunos_count && t.alunos_count > 0) {
    if (!confirm(`A tabela "${t.nome}" está vinculada a ${t.alunos_count} aluno(s). Ao remover, eles ficarão sem tabela. Deseja continuar?`)) return
  } else {
    if (!confirm(`Remover a tabela "${t.nome}"?`)) return
  }
  try {
    await remover(t.id)
    toast.success('Tabela removida.')
    await recarregar()
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  }
}
</script>
