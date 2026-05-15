<template>
  <div class="flex flex-col gap-6">

    <!-- ═════ Cabeçalho ═════ -->
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Cadastro de Turmas</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure turmas, turnos e tabelas de preço por unidade.</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Toggle modo de visualização -->
        <div class="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            @click="modo = 'cards'"
            :class="[
              'flex items-center gap-1.5 h-9 px-3 rounded-md text-[13px] transition-colors',
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
              'flex items-center gap-1.5 h-9 px-3 rounded-md text-[13px] transition-colors',
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

        <BaseSelect
          v-model="anoLetivo"
          :options="anosLetivosOpts"
          class="w-32"
        />
        <BaseButton size="md" @click="abrirNovaTurma">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Nova turma
        </BaseButton>
      </div>
    </div>

    <!-- ═════ Filtros ═════ -->
    <div class="flex items-center gap-2 flex-wrap">
      <BaseSelect
        v-model="filtroEscola"
        placeholder="Filtrar por unidade vinculada"
        :options="escolasOpts"
        class="w-64"
      />
      <button
        v-for="t in turnosFiltro"
        :key="t.value"
        @click="filtroTurno = t.value"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
        :class="filtroTurno === t.value
          ? 'bg-indigo-600 text-white'
          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'"
      >
        {{ t.label }}
        <span class="text-xs opacity-60">{{ contarTurmasPorTurno(t.value) }}</span>
      </button>
    </div>

    <!-- ═════ Loading / empty state ═════ -->
    <div v-if="loadingTurmas" class="text-center py-12 text-slate-500">
      <Icon name="lucide:loader-2" class="w-5 h-5 mx-auto mb-2 animate-spin" />
      Carregando turmas...
    </div>

    <div
      v-else-if="!turmasFiltradas.length"
      class="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-4 py-12 text-center"
    >
      <Icon name="lucide:layers" class="w-8 h-8 mx-auto mb-2 text-slate-300" />
      <p class="text-sm text-slate-700 dark:text-slate-200 font-medium">Nenhuma turma encontrada</p>
      <p class="text-[12px] text-slate-500 mt-1">Clique em "Nova turma" para cadastrar.</p>
    </div>

    <!-- ═════ Grid de turmas (modo Cards) ═════ -->
    <div v-else-if="modo === 'cards'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <article
        v-for="t in turmasFiltradas"
        :key="t.id"
        class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
      >
        <div class="h-1.5" :style="{ backgroundColor: t.cor ?? '#6366f1' }"></div>
        <div class="p-5 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <div class="min-w-0">
              <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">{{ t.nome }}</p>
              <p class="text-xs text-slate-500 mt-0.5 truncate">{{ t.serie || '— sem série' }} · {{ t.turno || '— sem turno' }}</p>
            </div>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 shrink-0">{{ t.modalidade || 'Regular' }}</span>
          </div>

          <!-- Escolas vinculadas -->
          <div>
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Unidades vinculadas ({{ t.escolas_count ?? 0 }})</p>
            <div v-if="(t.escolas?.length ?? 0) > 0" class="flex flex-wrap gap-1">
              <span
                v-for="e in t.escolas"
                :key="e.id"
                class="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                <Icon name="lucide:school" class="w-3 h-3" />
                {{ e.nome_escola }}
              </span>
            </div>
            <p v-else class="text-[11px] text-slate-400 italic">Esta turma ainda não está vinculada a nenhuma unidade. Vincule pela página de Unidades.</p>
          </div>

          <!-- Ocupação -->
          <div v-if="t.capacidade > 0">
            <div class="flex justify-between text-xs text-slate-600 dark:text-slate-300 mb-1.5">
              <span>{{ t.alunos_count ?? 0 }} / {{ t.capacidade }} alunos</span>
              <span class="font-medium">{{ percentual(t) }}%</span>
            </div>
            <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="corOcupacao(t)"
                :style="{ width: percentual(t) + '%' }"
              ></div>
            </div>
          </div>
          <p v-else class="text-[11px] text-slate-400 italic">Capacidade não definida</p>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-700">
            <p class="text-[10px] uppercase tracking-widest text-slate-400">Professor titular</p>
            <p class="text-xs font-medium text-slate-700 dark:text-slate-200 mt-1 truncate">{{ t.professor_titular_nome || '— sem titular' }}</p>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <BaseButton variant="outline" size="sm" block @click="verDetalhes(t)">
              <Icon name="lucide:eye" class="w-3.5 h-3.5" />
              Ver detalhes
            </BaseButton>
            <button
              @click="editarTurma(t)"
              class="w-9 h-9 flex items-center justify-center rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Editar"
            >
              <Icon name="lucide:pencil" class="w-4 h-4" />
            </button>
            <button
              @click="removerTurmaConfirm(t)"
              class="w-9 h-9 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              title="Remover"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- ═════ Modo Lista ═════ -->
    <div v-else class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-[13px]">
          <thead>
            <tr class="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40">
              <th class="font-medium px-4 py-2.5">Turma</th>
              <th class="font-medium px-3 py-2.5">Série / Turno</th>
              <th class="font-medium px-3 py-2.5">Modalidade</th>
              <th class="font-medium px-3 py-2.5">Ocupação</th>
              <th class="font-medium px-3 py-2.5">Professor titular</th>
              <th class="font-medium px-3 py-2.5">Unidades vinculadas</th>
              <th class="font-medium px-3 py-2.5 w-28 text-right pr-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="t in turmasFiltradas"
              :key="t.id"
              class="border-b border-slate-100 dark:border-slate-700/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors align-top"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-1 h-8 rounded-full shrink-0" :style="{ backgroundColor: t.cor ?? '#6366f1' }"></span>
                  <div class="min-w-0">
                    <p class="font-medium text-slate-800 dark:text-slate-100 truncate">{{ t.nome }}</p>
                    <p class="text-[11px] text-slate-400">Ano {{ t.ano_letivo ?? '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-3 py-3 text-slate-700 dark:text-slate-200">
                <p class="truncate">{{ t.serie || '—' }}</p>
                <p class="text-[11px] text-slate-500">{{ t.turno || '—' }}</p>
              </td>
              <td class="px-3 py-3">
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">{{ t.modalidade || 'Regular' }}</span>
              </td>
              <td class="px-3 py-3 min-w-[140px]">
                <template v-if="t.capacidade > 0">
                  <div class="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                    <span>{{ t.alunos_count ?? 0 }} / {{ t.capacidade }}</span>
                    <span class="font-medium">{{ percentual(t) }}%</span>
                  </div>
                  <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mt-1">
                    <div class="h-full rounded-full" :class="corOcupacao(t)" :style="{ width: percentual(t) + '%' }"></div>
                  </div>
                </template>
                <span v-else class="text-[11px] text-slate-400 italic">não definida</span>
              </td>
              <td class="px-3 py-3 text-slate-700 dark:text-slate-200 text-[12px] truncate max-w-[160px]">{{ t.professor_titular_nome || '—' }}</td>
              <td class="px-3 py-3">
                <div v-if="(t.escolas?.length ?? 0) > 0" class="flex flex-wrap gap-1">
                  <span
                    v-for="e in t.escolas"
                    :key="e.id"
                    class="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    <Icon name="lucide:school" class="w-3 h-3" />
                    {{ e.nome_escola }}
                  </span>
                </div>
                <span v-else class="text-[11px] text-slate-400 italic">—</span>
              </td>
              <td class="px-3 py-3 text-right">
                <div class="inline-flex items-center gap-1 justify-end">
                  <button @click="verDetalhes(t)" class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Detalhes">
                    <Icon name="lucide:eye" class="w-3.5 h-3.5" />
                  </button>
                  <button @click="editarTurma(t)" class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Editar">
                    <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
                  </button>
                  <button @click="removerTurmaConfirm(t)" class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" title="Remover">
                    <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═════ MODAL — Nova / Editar Turma ═════ -->
    <BaseModal
      v-model="modalTurmaAberto"
      :title="formTurma.id ? `Editar — ${formTurma.nome || 'Turma'}` : 'Nova turma'"
      subtitle="A turma pertence a uma unidade e pode receber alunos, professor titular e tabela de preço."
      size="lg"
    >
      <template #icon>
        <Icon :name="formTurma.id ? 'lucide:pencil' : 'lucide:layers'" class="w-4 h-4" />
      </template>

      <form class="flex flex-col gap-4" @submit.prevent="salvarTurma">
        <FormSection title="Dados da turma" subtitle="A turma é um molde da sua empresa. Em Unidades você define quais escolas oferecem esta turma." dense>
          <FormGrid :cols="2">
            <BaseInput v-model="formTurma.nome" label="Nome da turma" placeholder="Ex.: 1º Ano A" required />
            <div>
              <BaseSelect
                v-model="formTurma.serie"
                label="Série / Segmento"
                placeholder="Selecione"
                :options="seriesOpts"
              />
              <button
                type="button"
                @click="abrirGerenciarSeries"
                class="text-[11px] mt-1 text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <Icon name="lucide:settings-2" class="w-3 h-3" />
                Gerenciar séries / segmentos
              </button>
            </div>
            <BaseSelect
              v-model="formTurma.turno"
              label="Turno"
              placeholder="Selecione"
              :options="[...TURNOS]"
            />
            <BaseSelect
              v-model="formTurma.modalidade"
              label="Modalidade"
              placeholder="Selecione"
              :options="MODALIDADES"
            />
            <BaseInput
              :model-value="String(formTurma.ano_letivo ?? '')"
              @update:model-value="formTurma.ano_letivo = Number($event) || new Date().getFullYear()"
              label="Ano letivo"
              type="number"
            />
            <BaseInput
              :model-value="String(formTurma.capacidade)"
              @update:model-value="formTurma.capacidade = Math.max(0, Number($event) || 0)"
              label="Capacidade (quantidade máxima de alunos)"
              type="number"
            />
            <BaseSelect
              v-model="formTurma.status"
              label="Status"
              :options="[
                { label: 'Ativa',    value: 'ativo'    },
                { label: 'Inativa',  value: 'inativo'  },
                { label: 'Suspensa', value: 'suspenso' },
              ]"
            />
          </FormGrid>
        </FormSection>

        <FormSection title="Professor titular (opcional)" subtitle="Apenas informativo. Os professores que dão aula na turma são vinculados em Usuários." dense>
          <BaseSelect
            v-model="formTurma.professor_titular_id"
            label="Professor titular"
            placeholder="Sem professor titular"
            :options="professoresOpts"
          />
        </FormSection>

      </form>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalTurmaAberto = false">Cancelar</BaseButton>
        <BaseButton size="sm" :disabled="salvandoTurma" @click="salvarTurma">
          <Icon v-if="salvandoTurma" name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
          <Icon v-else                name="lucide:check"    class="w-3.5 h-3.5" />
          {{ formTurma.id ? 'Salvar alterações' : 'Cadastrar turma' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- ═════ MODAL — Ver detalhes da turma ═════ -->
    <BaseModal
      v-model="modalDetalhesAberto"
      :title="detalhes?.nome ?? 'Detalhes da turma'"
      :subtitle="detalhes ? `Ano letivo ${detalhes.ano_letivo ?? '—'}` : ''"
      size="md"
    >
      <template #icon>
        <Icon name="lucide:eye" class="w-4 h-4" />
      </template>

      <div v-if="detalhes" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Série</span>
            <span class="text-slate-800 dark:text-slate-200">{{ detalhes.serie || '—' }}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Turno</span>
            <span class="text-slate-800 dark:text-slate-200">{{ detalhes.turno || '—' }}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Modalidade</span>
            <span class="text-slate-800 dark:text-slate-200">{{ detalhes.modalidade || '—' }}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Status</span>
            <span class="text-slate-800 dark:text-slate-200 capitalize">{{ detalhes.status }}</span>
          </div>
          <div>
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Capacidade</span>
            <span class="text-slate-800 dark:text-slate-200">{{ detalhes.capacidade }} alunos</span>
          </div>
          <div>
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Alunos vinculados</span>
            <span class="text-slate-800 dark:text-slate-200">{{ detalhes.alunos_count ?? 0 }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block">Professor titular</span>
            <span class="text-slate-800 dark:text-slate-200">{{ detalhes.professor_titular_nome || '— sem titular designado' }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-[10px] uppercase tracking-widest text-slate-400 block mb-1.5">Unidades vinculadas</span>
            <div v-if="(detalhes.escolas?.length ?? 0) > 0" class="flex flex-wrap gap-1">
              <span
                v-for="e in detalhes.escolas"
                :key="e.id"
                class="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                <Icon name="lucide:school" class="w-3 h-3" />
                {{ e.nome_escola }}
              </span>
            </div>
            <span v-else class="text-xs text-slate-500 italic">Esta turma ainda não está vinculada a nenhuma unidade.</span>
          </div>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalDetalhesAberto = false">Fechar</BaseButton>
        <BaseButton size="sm" @click="editarTurmaDoDetalhe">
          <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
          Editar turma
        </BaseButton>
      </template>
    </BaseModal>

    <!-- ═════ MODAL — Gerenciar séries / segmentos ═════ -->
    <BaseModal
      v-model="modalSeriesAberto"
      title="Séries e segmentos"
      subtitle="Adicione, edite ou remova séries usadas em todas as suas turmas."
      size="md"
    >
      <template #icon>
        <Icon name="lucide:settings-2" class="w-4 h-4" />
      </template>

      <div class="flex flex-col gap-4">
        <!-- Adicionar nova -->
        <div class="rounded-lg bg-indigo-50/60 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3">
          <p class="text-[11px] uppercase tracking-widest text-indigo-700 dark:text-indigo-300 mb-2">Adicionar nova</p>
          <div class="flex gap-2">
            <BaseInput
              v-model="novaSerieNome"
              placeholder="Ex.: Ensino Técnico Profissionalizante"
              class="flex-1"
              @keydown.enter.prevent="adicionarSerie"
            />
            <BaseButton size="sm" :disabled="!novaSerieNome.trim() || salvandoSerie" @click="adicionarSerie">
              <Icon v-if="salvandoSerie" name="lucide:loader-2" class="w-3.5 h-3.5 animate-spin" />
              <Icon v-else                name="lucide:plus"     class="w-3.5 h-3.5" />
              Adicionar
            </BaseButton>
          </div>
        </div>

        <!-- Lista de séries existentes -->
        <div v-if="loadingSeries" class="text-center py-3 text-sm text-slate-500">
          <Icon name="lucide:loader-2" class="w-4 h-4 mx-auto animate-spin" />
          Carregando...
        </div>

        <p v-else-if="!series.length" class="text-[12px] text-slate-400 italic text-center py-3">
          Nenhuma série cadastrada ainda. Adicione a primeira acima.
        </p>

        <div v-else class="flex flex-col gap-1.5">
          <div
            v-for="s in series"
            :key="s.id"
            class="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 p-2"
          >
            <div class="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
              <Icon name="lucide:graduation-cap" class="w-3.5 h-3.5" />
            </div>

            <BaseInput
              v-if="editandoId === s.id"
              :model-value="editandoNome"
              @update:model-value="editandoNome = $event"
              class="flex-1"
              @keydown.enter.prevent="confirmarEdicaoSerie(s)"
            />
            <p v-else class="flex-1 text-sm text-slate-800 dark:text-slate-100 truncate">{{ s.nome }}</p>

            <button
              v-if="editandoId === s.id"
              type="button"
              @click="confirmarEdicaoSerie(s)"
              class="w-7 h-7 inline-flex items-center justify-center rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
              title="Confirmar"
            >
              <Icon name="lucide:check" class="w-3.5 h-3.5" />
            </button>
            <button
              v-if="editandoId === s.id"
              type="button"
              @click="cancelarEdicaoSerie"
              class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Cancelar"
            >
              <Icon name="lucide:x" class="w-3.5 h-3.5" />
            </button>
            <button
              v-if="editandoId !== s.id"
              type="button"
              @click="comecarEdicaoSerie(s)"
              class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Editar"
            >
              <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
            </button>
            <button
              v-if="editandoId !== s.id"
              type="button"
              @click="removerSerieConfirm(s)"
              class="w-7 h-7 inline-flex items-center justify-center rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              title="Remover"
            >
              <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p class="text-[11px] text-slate-400 leading-snug">
          As séries cadastradas aqui ficam disponíveis no select "Série / Segmento" de qualquer turma da sua empresa.
        </p>
      </div>

      <template #footer>
        <BaseButton size="sm" @click="modalSeriesAberto = false">
          <Icon name="lucide:check" class="w-3.5 h-3.5" />
          Concluído
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Database, StatusGeral } from '~/types/database.types'
import { useTurmas, TURNOS, MODALIDADES, type TurmaRecord } from '~/composables/useTurmas'
import { useSeries, type SerieRecord } from '~/composables/useSeries'

definePageMeta({ title: 'Turmas' })

const supabase = useSupabaseClient<Database>()
const { listar: listarTurmas, criar: criarTurma, atualizar: atualizarTurma, remover: removerTurma } = useTurmas()
const { listar: listarSeries, criar: criarSerie, atualizar: atualizarSerie, remover: removerSerie } = useSeries()

const anoAtual = new Date().getFullYear()

// ─── Estado ───────────────────────────────────────────────────────────────────
const anoLetivo    = ref(anoAtual)
const filtroEscola = ref('')
const filtroTurno  = ref<'todos' | 'Manhã' | 'Tarde' | 'Integral' | 'Noite'>('todos')

const escolas       = ref<{ id: string; nome_escola: string }[]>([])
const professores   = ref<{ id: string; nome: string }[]>([])
const turmas        = ref<TurmaRecord[]>([])
const series        = ref<SerieRecord[]>([])

const loadingTurmas  = ref(true)
const loadingSeries  = ref(true)
const modo           = ref<'cards' | 'lista'>('cards')

const seriesOpts = computed(() => series.value.map(s => ({ label: s.nome, value: s.nome })))

const anosLetivosOpts = computed(() => {
  const anos = new Set<number>([anoAtual, anoAtual - 1, anoAtual + 1])
  return Array.from(anos).sort((a, b) => b - a).map(a => ({ label: String(a), value: a }))
})

const escolasOpts = computed(() =>
  escolas.value.map(e => ({ label: e.nome_escola, value: e.id }))
)

const professoresOpts = computed(() =>
  professores.value.map(p => ({ label: p.nome, value: p.id }))
)

const turnosFiltro = [
  { value: 'todos' as const,    label: 'Todos'    },
  { value: 'Manhã' as const,    label: 'Manhã'    },
  { value: 'Tarde' as const,    label: 'Tarde'    },
  { value: 'Integral' as const, label: 'Integral' },
  { value: 'Noite' as const,    label: 'Noite'    },
]

const turmasFiltradas = computed(() =>
  turmas.value.filter(t => {
    if (filtroEscola.value && !t.escolas?.some(e => e.id === filtroEscola.value)) return false
    if (filtroTurno.value !== 'todos' && t.turno !== filtroTurno.value) return false
    return true
  }),
)

function contarTurmasPorTurno(turno: typeof filtroTurno.value): number {
  if (turno === 'todos') return turmas.value.length
  return turmas.value.filter(t => t.turno === turno).length
}

function percentual(t: TurmaRecord): number {
  if (!t.capacidade) return 0
  return Math.min(100, Math.round((t.alunos_count ?? 0) / t.capacidade * 100))
}

function corOcupacao(t: TurmaRecord): string {
  const p = percentual(t) / 100
  if (p >= 0.9) return 'bg-red-500'
  if (p >= 0.7) return 'bg-amber-500'
  return 'bg-emerald-500'
}

// ─── Recarga ──────────────────────────────────────────────────────────────────
async function recarregarTurmas() {
  loadingTurmas.value = true
  try {
    turmas.value = await listarTurmas({ anoLetivo: anoLetivo.value })
  } catch (e: any) {
    toast.error(`Erro ao carregar turmas: ${e?.message ?? ''}`)
  } finally {
    loadingTurmas.value = false
  }
}

async function recarregarEscolasEProfessores() {
  const [{ data: esc }, { data: profs }] = await Promise.all([
    supabase.from('escolas').select('id, nome_escola').order('nome_escola'),
    supabase.from('profiles').select('id, nome').eq('tipo_usuario', 'professor').order('nome'),
  ])
  escolas.value     = (esc   ?? []) as any
  professores.value = (profs ?? []) as any
}

async function recarregarSeries() {
  loadingSeries.value = true
  try {
    series.value = await listarSeries()
  } catch (e: any) {
    toast.error(`Erro ao carregar séries: ${e?.message ?? ''}`)
  } finally {
    loadingSeries.value = false
  }
}

watch(anoLetivo, () => {
  recarregarTurmas()
})

onMounted(async () => {
  await Promise.all([recarregarEscolasEProfessores(), recarregarSeries()])
  await recarregarTurmas()
})

// ─── Modal Turma ──────────────────────────────────────────────────────────────
const modalTurmaAberto = ref(false)
const salvandoTurma    = ref(false)
const formTurma        = ref(novaFormTurma())

function novaFormTurma() {
  return {
    id:                   '' as string,
    nome:                 '',
    serie:                '' as string | null,
    turno:                '' as string | null,
    modalidade:           'Regular' as string | null,
    ano_letivo:           anoLetivo.value,
    capacidade:           0,
    status:               'ativo' as StatusGeral,
    professor_titular_id: '' as string | null,
  }
}

function abrirNovaTurma() {
  formTurma.value = novaFormTurma()
  modalTurmaAberto.value = true
}

function editarTurma(t: TurmaRecord) {
  formTurma.value = {
    id:                   t.id,
    nome:                 t.nome,
    serie:                t.serie ?? '',
    turno:                t.turno ?? '',
    modalidade:           t.modalidade ?? '',
    ano_letivo:           t.ano_letivo ?? anoLetivo.value,
    capacidade:           t.capacidade,
    status:               t.status,
    professor_titular_id: t.professor_titular_id ?? '',
  }
  modalTurmaAberto.value = true
}

async function salvarTurma() {
  if (!formTurma.value.nome.trim()) return toast.error('Informe o nome da turma.')

  salvandoTurma.value = true
  try {
    const payload = {
      nome:                 formTurma.value.nome.trim(),
      serie:                formTurma.value.serie  || null,
      turno:                formTurma.value.turno  || null,
      modalidade:           formTurma.value.modalidade || null,
      ano_letivo:           formTurma.value.ano_letivo,
      capacidade:           formTurma.value.capacidade,
      status:               formTurma.value.status,
      professor_titular_id: formTurma.value.professor_titular_id || null,
    }
    if (formTurma.value.id) {
      await atualizarTurma(formTurma.value.id, payload)
      toast.success('Turma atualizada!')
    } else {
      await criarTurma(payload)
      toast.success('Turma cadastrada!')
    }
    modalTurmaAberto.value = false
    await recarregarTurmas()
  } catch (e: any) {
    toast.error(`Erro ao salvar: ${e?.message ?? ''}`)
  } finally {
    salvandoTurma.value = false
  }
}

async function removerTurmaConfirm(t: TurmaRecord) {
  if (!confirm(`Remover a turma "${t.nome}"? Esta ação não pode ser desfeita.`)) return
  try {
    await removerTurma(t.id)
    toast.success('Turma removida.')
    await recarregarTurmas()
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  }
}

// ─── Modal Detalhes ───────────────────────────────────────────────────────────
const modalDetalhesAberto = ref(false)
const detalhes            = ref<TurmaRecord | null>(null)

function verDetalhes(t: TurmaRecord) {
  detalhes.value = t
  modalDetalhesAberto.value = true
}

function editarTurmaDoDetalhe() {
  if (!detalhes.value) return
  modalDetalhesAberto.value = false
  editarTurma(detalhes.value)
}

// ─── Modal: Gerenciar séries/segmentos ───────────────────────────────────────
const modalSeriesAberto = ref(false)
const novaSerieNome     = ref('')
const salvandoSerie     = ref(false)
const editandoId        = ref<string | null>(null)
const editandoNome      = ref('')

function abrirGerenciarSeries() {
  novaSerieNome.value = ''
  editandoId.value    = null
  modalSeriesAberto.value = true
  // Recarrega caso tenha mudado por outra aba
  if (!loadingSeries.value) recarregarSeries()
}

async function adicionarSerie() {
  const nome = novaSerieNome.value.trim()
  if (!nome) return
  if (series.value.some(s => s.nome.toLowerCase() === nome.toLowerCase())) {
    toast.error(`Já existe uma série chamada "${nome}".`)
    return
  }
  salvandoSerie.value = true
  try {
    await criarSerie(nome, (series.value[series.value.length - 1]?.ordem ?? 0) + 1)
    novaSerieNome.value = ''
    await recarregarSeries()
    toast.success('Série adicionada.')
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  } finally {
    salvandoSerie.value = false
  }
}

function comecarEdicaoSerie(s: SerieRecord) {
  editandoId.value   = s.id
  editandoNome.value = s.nome
}

function cancelarEdicaoSerie() {
  editandoId.value   = null
  editandoNome.value = ''
}

async function confirmarEdicaoSerie(s: SerieRecord) {
  const nome = editandoNome.value.trim()
  if (!nome) {
    toast.error('Informe um nome.')
    return
  }
  if (nome === s.nome) {
    cancelarEdicaoSerie()
    return
  }
  if (series.value.some(x => x.id !== s.id && x.nome.toLowerCase() === nome.toLowerCase())) {
    toast.error(`Já existe outra série com esse nome.`)
    return
  }
  try {
    await atualizarSerie(s.id, { nome })
    cancelarEdicaoSerie()
    await recarregarSeries()
    toast.success('Série atualizada.')
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  }
}

async function removerSerieConfirm(s: SerieRecord) {
  if (!confirm(`Remover a série "${s.nome}"? Turmas existentes que usam essa série continuam com o nome salvo, mas ela não aparecerá mais no select.`)) return
  try {
    await removerSerie(s.id)
    await recarregarSeries()
    toast.success('Série removida.')
  } catch (e: any) {
    toast.error(`Erro: ${e?.message ?? ''}`)
  }
}
</script>
