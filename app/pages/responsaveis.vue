<template>
  <div class="flex flex-col gap-5">

    <!-- ═════ Cabeçalho ═════ -->
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Responsáveis</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Visualização dos responsáveis (mãe e pai) vinculados a cada aluno. O cadastro é feito a partir do <NuxtLink to="/alunos" class="text-indigo-600 dark:text-indigo-400 hover:underline">cadastro do aluno</NuxtLink>.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Toggle modo de visualização -->
        <div class="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            @click="modo = 'cards'"
            :class="[
              'flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] transition-colors',
              modo === 'cards'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ]"
            aria-label="Modo cards"
          >
            <Icon name="lucide:layout-grid" class="w-3.5 h-3.5" />
            Cards
          </button>
          <button
            type="button"
            @click="modo = 'lista'"
            :class="[
              'flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] transition-colors',
              modo === 'lista'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ]"
            aria-label="Modo lista"
          >
            <Icon name="lucide:list" class="w-3.5 h-3.5" />
            Lista
          </button>
        </div>
      </div>
    </div>

    <!-- ═════ Filtros ═════ -->
    <div class="rounded-lg border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-3">
      <FormGrid :cols="4">
        <BaseInput
          v-model="filtros.aluno"
          label="Nome do aluno"
          placeholder="Buscar por aluno..."
        >
          <template #prefix>
            <Icon name="lucide:search" class="w-3.5 h-3.5" />
          </template>
        </BaseInput>

        <BaseInput
          v-model="filtros.responsavel"
          label="Nome do responsável"
          placeholder="Buscar por mãe / pai..."
        >
          <template #prefix>
            <Icon name="lucide:search" class="w-3.5 h-3.5" />
          </template>
        </BaseInput>

        <BaseSelect
          v-model="filtros.escola"
          label="Escola"
          placeholder="Todas as escolas"
          :options="escolasFiltro"
        />

        <BaseSelect
          v-model="filtros.tipo"
          label="Tipo de vínculo"
          placeholder="Todos"
          :options="['Financeiro', 'Pedagógico']"
        />
      </FormGrid>

      <div v-if="hasFiltro" class="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
        <p class="text-[12px] text-slate-500 dark:text-slate-400">
          <span class="font-semibold text-slate-700 dark:text-slate-200">{{ filtrados.length }}</span>
          {{ filtrados.length === 1 ? 'resultado' : 'resultados' }} encontrados
        </p>
        <button
          type="button"
          @click="limparFiltros"
          class="text-[12px] text-indigo-600 dark:text-indigo-400 hover:underline"
        >Limpar filtros</button>
      </div>
    </div>

    <!-- ═════ Empty state ═════ -->
    <div
      v-if="!filtrados.length"
      class="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-4 py-12 text-center"
    >
      <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-400 mx-auto mb-3">
        <Icon name="lucide:users-round" class="w-6 h-6" />
      </div>
      <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Nenhum responsável encontrado</p>
      <p class="text-[12px] text-slate-500 dark:text-slate-400 mt-1">
        Ajuste os filtros ou cadastre um aluno em <NuxtLink to="/alunos" class="text-indigo-600 dark:text-indigo-400 hover:underline">Alunos</NuxtLink> para vincular responsáveis.
      </p>
    </div>

    <!-- ═════ Modo CARDS ═════ -->
    <div v-else-if="modo === 'cards'" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <article
        v-for="c in filtrados"
        :key="c.alunoId"
        class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
      >
        <!-- Aluno -->
        <div class="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0" :style="{ backgroundColor: c.alunoCor }">{{ iniciais(c.alunoNome) }}</div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-0.5">Aluno</p>
            <p class="text-base font-semibold text-slate-900 dark:text-white truncate">{{ c.alunoNome }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ c.turma }} · {{ c.escola }}</p>
          </div>
          <NuxtLink
            :to="`/alunos/${c.alunoId}`"
            class="w-8 h-8 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
            title="Ver perfil do aluno"
          >
            <Icon name="lucide:external-link" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <!-- Responsáveis (mãe e/ou pai) -->
        <div class="flex flex-col gap-3">
          <p class="text-[10px] uppercase tracking-widest text-slate-400">
            Responsáveis ({{ c.responsaveis.length }})
          </p>
          <div
            v-for="r in c.responsaveis"
            :key="r.id"
            class="rounded-lg bg-slate-50 dark:bg-slate-900/40 p-3 flex flex-col gap-3"
          >
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" :style="{ backgroundColor: r.cor }">{{ iniciais(r.nome) }}</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ r.nome }}</span>
                  <span
                    v-for="t in r.tipos"
                    :key="t"
                    :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', t === 'Financeiro'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400']"
                  >{{ t }}</span>
                  <span
                    v-if="r.origem === 'cadastro-aluno'"
                    class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    title="Vinculado automaticamente pelo cadastro do aluno"
                  >auto</span>
                </div>
                <p class="text-[11px] text-slate-500 mt-0.5">{{ r.parentesco }} · {{ r.cpf }}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2 text-xs text-slate-600 dark:text-slate-300">
                  <span class="flex items-center gap-1.5 min-w-0">
                    <Icon name="lucide:phone" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span class="truncate">{{ r.telefone }}</span>
                  </span>
                  <span class="flex items-center gap-1.5 min-w-0">
                    <Icon name="lucide:mail" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span class="truncate">{{ r.email }}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <button
                type="button"
                @click="abrirPerfil(r)"
                class="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-[12px] font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <Icon name="lucide:user-round-search" class="w-3.5 h-3.5" />
                Ver perfil completo
              </button>
              <button
                type="button"
                @click="abrirEdicao(r)"
                class="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                title="Editar responsável"
              >
                <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
                Editar
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- ═════ Modo LISTA ═════ -->
    <div v-else class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-[13px]">
          <thead>
            <tr class="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40">
              <th class="font-medium px-4 py-2.5">Aluno</th>
              <th class="font-medium px-3 py-2.5">Turma / Escola</th>
              <th class="font-medium px-3 py-2.5">Responsáveis</th>
              <th class="font-medium px-3 py-2.5 w-32 text-right pr-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="c in filtrados"
              :key="c.alunoId"
              class="border-b border-slate-100 dark:border-slate-700/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors align-top"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0" :style="{ backgroundColor: c.alunoCor }">{{ iniciais(c.alunoNome) }}</div>
                  <span class="font-medium text-slate-800 dark:text-slate-100 truncate">{{ c.alunoNome }}</span>
                </div>
              </td>

              <td class="px-3 py-3 text-slate-600 dark:text-slate-300">
                <div class="flex flex-col leading-tight">
                  <span>{{ c.turma }}</span>
                  <span class="text-[11px] text-slate-400">{{ c.escola }}</span>
                </div>
              </td>

              <td class="px-3 py-3">
                <div class="flex flex-col gap-2">
                  <div
                    v-for="r in c.responsaveis"
                    :key="r.id"
                    class="flex items-start gap-2 min-w-0"
                  >
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0" :style="{ backgroundColor: r.cor }">{{ iniciais(r.nome) }}</div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1.5 flex-wrap">
                        <span class="text-slate-800 dark:text-slate-100 font-medium truncate">{{ r.nome }}</span>
                        <span class="text-[10px] text-slate-400">({{ r.parentesco }})</span>
                        <span
                          v-for="t in r.tipos"
                          :key="t"
                          :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded', t === 'Financeiro'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300']"
                        >{{ t }}</span>
                      </div>
                      <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {{ r.telefone }} · {{ r.email }}
                      </p>
                      <div class="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          @click="abrirPerfil(r)"
                          class="text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                        >Ver perfil</button>
                        <span class="text-slate-300">·</span>
                        <button
                          type="button"
                          @click="abrirEdicao(r)"
                          class="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                        >Editar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <td class="px-3 py-3 text-right">
                <NuxtLink
                  :to="`/alunos/${c.alunoId}`"
                  class="inline-flex items-center gap-1 h-7 px-2 rounded text-[11px] font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
                  Perfil do aluno
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═════ MODAL — Ver perfil completo ═════ -->
    <BaseModal
      v-model="perfilOpen"
      :title="perfilAtual ? perfilAtual.nome : ''"
      :subtitle="perfilAtual ? `${perfilAtual.parentesco} · ${perfilAtual.cpf}` : ''"
      size="lg"
    >
      <template #icon>
        <Icon name="lucide:user-round" class="w-4 h-4" />
      </template>

      <div v-if="perfilAtual" class="flex flex-col gap-5">

        <!-- Resumo -->
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold shrink-0" :style="{ backgroundColor: perfilAtual.cor }">{{ iniciais(perfilAtual.nome) }}</div>
          <div class="flex-1 min-w-0">
            <p class="text-base font-semibold text-slate-900 dark:text-white">{{ perfilAtual.nome }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ perfilAtual.parentesco }}</p>
            <div class="flex items-center gap-1.5 mt-2 flex-wrap">
              <span
                v-for="t in perfilAtual.tipos"
                :key="t"
                :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', t === 'Financeiro'
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400']"
              >Responsável {{ t }}</span>
              <span
                v-if="perfilAtual.origem === 'cadastro-aluno'"
                class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              >vinculado via cadastro do aluno</span>
            </div>
          </div>
        </div>

        <!-- Dados pessoais -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 mb-3">Dados pessoais</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Nome completo</span>
              <span class="text-sm text-slate-800 dark:text-slate-200">{{ perfilAtual.nome }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Parentesco</span>
              <span class="text-sm text-slate-800 dark:text-slate-200">{{ perfilAtual.parentesco }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase tracking-widest text-slate-400 block">CPF</span>
              <span class="text-sm text-slate-800 dark:text-slate-200">{{ perfilAtual.cpf }}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Origem do cadastro</span>
              <span class="text-sm text-slate-800 dark:text-slate-200">{{ perfilAtual.origem === 'cadastro-aluno' ? 'Cadastro do aluno' : 'Cadastro manual' }}</span>
            </div>
          </div>
        </section>

        <!-- Contato -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 mb-3">Contato</p>
          <div class="grid grid-cols-2 gap-3">
            <div class="flex items-start gap-2">
              <Icon name="lucide:phone" class="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Telefone</span>
                <span class="text-sm text-slate-800 dark:text-slate-200">{{ perfilAtual.telefone }}</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <Icon name="lucide:mail" class="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span class="text-[10px] uppercase tracking-widest text-slate-400 block">E-mail</span>
                <span class="text-sm text-slate-800 dark:text-slate-200">{{ perfilAtual.email }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Alunos vinculados -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 mb-3">Alunos vinculados ({{ perfilAtualRecord?.alunos.length ?? 0 }})</p>
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="a in perfilAtualRecord?.alunos ?? []"
              :key="a.id"
              :to="`/alunos/${a.id}`"
              class="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-900/40 p-3 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
            >
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" :style="{ backgroundColor: a.cor }">{{ iniciais(a.nome) }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ a.nome }}</p>
                <p class="text-[11px] text-slate-500 truncate">{{ a.turma }} · {{ a.escola }}</p>
              </div>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-slate-400 shrink-0" />
            </NuxtLink>
          </div>
        </section>
      </div>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="perfilOpen = false">Fechar</BaseButton>
        <BaseButton size="sm" @click="perfilParaEdicao">
          <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
          Editar
        </BaseButton>
      </template>
    </BaseModal>

    <!-- ═════ MODAL — Editar responsável ═════ -->
    <BaseModal
      v-model="editOpen"
      :title="`Editar — ${editForm.nome || 'Responsável'}`"
      subtitle="Atualize os dados do responsável. As alterações são salvas localmente (mockup)."
      size="lg"
    >
      <template #icon>
        <Icon name="lucide:pencil" class="w-4 h-4" />
      </template>

      <form class="flex flex-col gap-4" @submit.prevent="salvarEdicao">
        <FormSection title="Identificação" dense>
          <FormGrid :cols="2">
            <BaseInput v-model="editForm.nome"        label="Nome completo" />
            <BaseSelect
              v-model="editForm.parentesco"
              label="Parentesco"
              :options="['Mãe', 'Pai', 'Avó', 'Avô', 'Tio', 'Tia', 'Tutor', 'Outro']"
              placeholder="Selecione"
            />
            <BaseInput v-model="editForm.cpf"         label="CPF" placeholder="000.000.000-00" />
          </FormGrid>
        </FormSection>

        <FormSection title="Contato" dense>
          <FormGrid :cols="2">
            <BaseInput v-model="editForm.telefone" label="Telefone" placeholder="(00) 00000-0000" />
            <BaseInput v-model="editForm.email"    label="E-mail"   type="email" placeholder="exemplo@email.com" />
          </FormGrid>
        </FormSection>

        <FormSection title="Vínculo com o aluno" dense>
          <FormGrid :cols="2">
            <BaseCheckbox
              v-model="editForm.financeiro"
              label="Responsável Financeiro"
              hint="Receberá cobranças e contratos"
            />
            <BaseCheckbox
              v-model="editForm.pedagogico"
              label="Responsável Pedagógico"
              hint="Receberá comunicados sobre o aluno"
            />
          </FormGrid>
        </FormSection>
      </form>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="editOpen = false">Cancelar</BaseButton>
        <BaseButton size="sm" @click="salvarEdicao">
          <Icon name="lucide:check" class="w-3.5 h-3.5" />
          Salvar alterações
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { ResponsavelTipo } from '~/composables/useResponsaveis'

const { responsaveis, atualizar } = useResponsaveis()

const modo = ref<'cards' | 'lista'>('cards')

const filtros = ref({
  aluno: '',
  responsavel: '',
  escola: '',
  tipo: '',
})

interface ResponsavelInfo {
  id: string
  nome: string
  parentesco: string
  cor: string
  cpf: string
  telefone: string
  email: string
  tipos: ResponsavelTipo[]
  origem: 'manual' | 'cadastro-aluno'
}

interface CardAluno {
  alunoId: string
  alunoNome: string
  alunoCor: string
  turma: string
  escola: string
  responsaveis: ResponsavelInfo[]
}

// Agrupa responsáveis por aluno: cada card representa 1 aluno + mãe/pai
const cards = computed<CardAluno[]>(() => {
  const map = new Map<string, CardAluno>()
  for (const r of responsaveis.value) {
    for (const a of r.alunos) {
      if (!map.has(a.id)) {
        map.set(a.id, {
          alunoId: a.id,
          alunoNome: a.nome,
          alunoCor: a.cor,
          turma: a.turma,
          escola: a.escola,
          responsaveis: [],
        })
      }
      map.get(a.id)!.responsaveis.push({
        id: r.id,
        nome: r.nome,
        parentesco: r.parentesco,
        cor: r.cor,
        cpf: r.cpf,
        telefone: r.telefone,
        email: r.email,
        tipos: r.tipos,
        origem: r.origem,
      })
    }
  }
  // Ordena: Mãe primeiro, depois Pai, depois outros
  const ord = (p: string) => p === 'Mãe' ? 0 : p === 'Pai' ? 1 : 2
  for (const c of map.values()) {
    c.responsaveis.sort((a, b) => ord(a.parentesco) - ord(b.parentesco))
  }
  return Array.from(map.values()).sort((a, b) => a.alunoNome.localeCompare(b.alunoNome))
})

const escolasFiltro = computed(() => {
  const set = new Set<string>()
  for (const c of cards.value) if (c.escola) set.add(c.escola)
  return Array.from(set).sort()
})

const hasFiltro = computed(() =>
  !!(filtros.value.aluno || filtros.value.responsavel || filtros.value.escola || filtros.value.tipo)
)

const filtrados = computed<CardAluno[]>(() => {
  const q = (s: string) => s.trim().toLowerCase()
  const fAluno = q(filtros.value.aluno)
  const fResp  = q(filtros.value.responsavel)
  const fEsc   = filtros.value.escola
  const fTipo  = filtros.value.tipo

  return cards.value.filter(c => {
    if (fAluno && !q(c.alunoNome).includes(fAluno)) return false
    if (fEsc   && c.escola !== fEsc) return false
    if (fResp  && !c.responsaveis.some(r => q(r.nome).includes(fResp))) return false
    if (fTipo  && !c.responsaveis.some(r => r.tipos.includes(fTipo as ResponsavelTipo))) return false
    return true
  })
})

function limparFiltros() {
  filtros.value = { aluno: '', responsavel: '', escola: '', tipo: '' }
}

function iniciais(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}

// ─── Modal: Ver perfil completo ───────────────────────────────────────────────
const perfilOpen  = ref(false)
const perfilAtual = ref<ResponsavelInfo | null>(null)

const perfilAtualRecord = computed(() => {
  if (!perfilAtual.value) return null
  return responsaveis.value.find(r => r.id === perfilAtual.value!.id) ?? null
})

function abrirPerfil(r: ResponsavelInfo) {
  perfilAtual.value = r
  perfilOpen.value = true
}

function perfilParaEdicao() {
  if (!perfilAtual.value) return
  const r = perfilAtual.value
  perfilOpen.value = false
  abrirEdicao(r)
}

// ─── Modal: Editar responsável ────────────────────────────────────────────────
const editOpen = ref(false)
const editId   = ref<string | null>(null)
const editForm = ref({
  nome: '',
  parentesco: '',
  cpf: '',
  telefone: '',
  email: '',
  financeiro: false,
  pedagogico: false,
})

function abrirEdicao(r: ResponsavelInfo) {
  editId.value = r.id
  editForm.value = {
    nome: r.nome,
    parentesco: r.parentesco,
    cpf: r.cpf,
    telefone: r.telefone,
    email: r.email,
    financeiro: r.tipos.includes('Financeiro'),
    pedagogico: r.tipos.includes('Pedagógico'),
  }
  editOpen.value = true
}

function salvarEdicao() {
  if (!editId.value) return
  if (!editForm.value.nome.trim()) {
    toast.error('Informe o nome do responsável.')
    return
  }
  const tipos: ResponsavelTipo[] = []
  if (editForm.value.financeiro) tipos.push('Financeiro')
  if (editForm.value.pedagogico) tipos.push('Pedagógico')

  atualizar(editId.value, {
    nome:       editForm.value.nome.trim(),
    parentesco: editForm.value.parentesco,
    cpf:        editForm.value.cpf || '—',
    telefone:   editForm.value.telefone || '—',
    email:      editForm.value.email || '—',
    tipos,
  })

  editOpen.value = false
  toast.success('Responsável atualizado com sucesso! (mock)')
}
</script>
