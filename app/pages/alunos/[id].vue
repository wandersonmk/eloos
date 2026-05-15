<template>
  <!-- Loading -->
  <div v-if="loadingAluno" class="flex flex-col items-center justify-center py-24 text-slate-500">
    <Icon name="lucide:loader-2" class="w-6 h-6 mb-3 animate-spin" />
    Carregando aluno...
  </div>

  <!-- Aluno não encontrado -->
  <div v-else-if="alunoNaoEncontrado" class="flex flex-col items-center justify-center py-24 text-center">
    <Icon name="lucide:user-x" class="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
    <p class="text-base font-medium text-slate-700 dark:text-slate-200">Aluno não encontrado</p>
    <p class="text-sm text-slate-500 mt-1">O ID informado não corresponde a nenhum aluno cadastrado.</p>
    <NuxtLink to="/alunos">
      <BaseButton size="md" class="mt-5">
        <Icon name="lucide:arrow-left" class="w-4 h-4" /> Voltar para alunos
      </BaseButton>
    </NuxtLink>
  </div>

  <div v-else class="flex flex-col gap-6">

    <!-- Breadcrumb / botão voltar -->
    <div class="flex items-center gap-2 text-sm">
      <button
        type="button"
        @click="$router.push('/alunos')"
        class="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
        title="Voltar para a lista de alunos"
        aria-label="Voltar"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
      </button>
      <NuxtLink to="/alunos" class="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Alunos</NuxtLink>
      <Icon name="lucide:chevron-right" class="w-3.5 h-3.5 text-slate-400" />
      <span class="text-slate-700 dark:text-slate-200 font-medium truncate">{{ aluno.nome }}</span>
    </div>

    <!-- Cabeçalho do perfil — header corrigido -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div class="p-6 flex items-start gap-5 flex-wrap">
        <!-- Avatar do aluno (clicável para trocar foto) -->
        <div class="relative -mt-16 shrink-0 group">
          <button
            type="button"
            @click="abrirSeletorFoto"
            class="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg flex items-center justify-center transition-transform hover:scale-[1.02]"
            :style="!aluno.foto ? { backgroundColor: aluno.cor } : {}"
            :title="aluno.foto ? 'Trocar foto' : 'Adicionar foto'"
          >
            <img
              v-if="aluno.foto"
              :src="aluno.foto"
              :alt="aluno.nome"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-white text-2xl font-semibold">{{ iniciais }}</span>
          </button>

          <!-- Overlay com ícone de câmera ao hover -->
          <button
            type="button"
            @click="abrirSeletorFoto"
            class="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
            title="Trocar foto"
          >
            <Icon name="lucide:camera" class="w-3.5 h-3.5" />
          </button>

          <!-- Botão de remover (só quando há foto) -->
          <button
            v-if="aluno.foto"
            type="button"
            @click="removerFoto"
            class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
            title="Remover foto"
          >
            <Icon name="lucide:x" class="w-3 h-3" />
          </button>

          <!-- Input de arquivo escondido -->
          <input
            ref="inputFotoEl"
            type="file"
            accept="image/*"
            class="sr-only"
            @change="onArquivoFotoSelecionado"
          />
        </div>
        <div class="flex-1 min-w-0 pt-1">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-white truncate">{{ aluno.nome }}</h1>
            <span
              v-if="matriculaCorrente"
              class="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              :class="{
                'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400': matriculaCorrente.status_matricula === 'confirmada',
                'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400':         matriculaCorrente.status_matricula === 'docs_pendentes',
                'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400':     matriculaCorrente.status_matricula === 'em_analise',
                'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300':           matriculaCorrente.status_matricula === 'cancelada',
              }"
              :title="`Matrícula ${matriculaCorrente.ano_letivo}`"
            >
              Matrícula: {{ STATUS_MATRICULA_LABEL[matriculaCorrente.status_matricula] }}
            </span>
            <span v-else class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300">Sem matrícula</span>
          </div>
          <p class="text-sm text-slate-500 mt-1">
            Matrícula {{ aluno.matricula || '—' }} ·
            RA {{ aluno.ra || '—' }} ·
            {{ aluno.idade ? `${aluno.idade} anos` : 'idade não informada' }} ·
            {{ aluno.escola || '—' }}
          </p>
          <div class="mt-2 inline-flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
              <Icon name="lucide:layers" class="w-3 h-3" />
              Turma: {{ turmaAtualLabel || 'sem turma' }}
            </span>
            <button
              type="button"
              @click="abrirEditarTurma"
              class="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <Icon name="lucide:pencil" class="w-3 h-3" />
              Trocar
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <BaseButton variant="outline" size="sm">Imprimir ficha</BaseButton>
          <BaseButton variant="outline" size="sm" @click="$router.push('/alunos')">Cancelar</BaseButton>
          <BaseButton size="sm" @click="salvarAlteracoes">Salvar alterações</BaseButton>
        </div>
      </div>
    </div>

    <!-- Alerta financeiro -->
    <div v-if="aluno.pendenciaFinanceira" class="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
      </div>
      <div class="flex-1">
        <p class="text-base font-semibold text-red-700 dark:text-red-300">Atenção!</p>
        <p class="text-sm text-red-600 dark:text-red-400 mt-0.5">Esse aluno possui pendências financeiras!</p>
      </div>
      <button
        type="button"
        @click="abaAtiva = 'financeiro'"
        class="inline-flex items-center gap-2 h-10 px-4 rounded-md text-sm font-medium bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors shrink-0"
      >
        <span class="font-semibold">$</span> Verificar Financeiro
      </button>
    </div>

    <!-- Abas -->
    <div class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div class="relative border-b border-slate-200 dark:border-slate-700">

        <!-- Seta esquerda + fade -->
        <Transition name="tabs-fade">
          <div
            v-if="canScrollLeft"
            class="pointer-events-none absolute left-0 top-0 bottom-0 w-14 z-10 flex items-center bg-gradient-to-r from-white via-white/90 to-transparent dark:from-slate-800 dark:via-slate-800/90"
          >
            <button
              type="button"
              @click="scrollByStep(-1)"
              class="pointer-events-auto ml-1 w-6 h-6 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
              aria-label="Rolar abas para a esquerda"
            >
              <Icon name="lucide:chevron-left" class="w-4 h-4" />
            </button>
          </div>
        </Transition>

        <!-- Seta direita + fade -->
        <Transition name="tabs-fade">
          <div
            v-if="canScrollRight"
            class="pointer-events-none absolute right-0 top-0 bottom-0 w-14 z-10 flex items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent dark:from-slate-800 dark:via-slate-800/90"
          >
            <button
              type="button"
              @click="scrollByStep(1)"
              class="pointer-events-auto mr-1 w-6 h-6 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors animate-pulse-hint"
              aria-label="Rolar abas para a direita"
            >
              <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </Transition>

        <div
          ref="tabsNav"
          @wheel="onWheel"
          @scroll.passive="updateScrollState"
          class="tabs-scroller flex items-center gap-0.5 px-2 overflow-x-auto overflow-y-hidden scroll-smooth"
        >
          <button
            v-for="t in tabs"
            :key="t.id"
            @click="abaAtiva = t.id"
            class="px-3 py-2.5 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap inline-flex items-center gap-1.5 -mb-px"
            :class="abaAtiva === t.id
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'"
          >
            <Icon :name="t.icon" class="w-4 h-4 shrink-0" />
            {{ t.label }}
            <span v-if="t.badge" class="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full leading-none font-semibold tabular-nums">{{ t.badge }}</span>
          </button>
        </div>
      </div>

      <!-- ════════════════ DADOS DO ALUNO ════════════════ -->
      <div v-if="abaAtiva === 'dados'" class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2 flex flex-col gap-4">
          <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <p class="text-[11px] uppercase tracking-widest text-slate-400 mb-3">Dados pessoais</p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="f in dadosPessoais" :key="f.label">
                <span class="text-[10px] uppercase tracking-widest text-slate-400 block">{{ f.label }}</span>
                <span class="text-sm text-slate-800 dark:text-slate-200">{{ f.val || '—' }}</span>
              </div>
            </div>
          </section>
          <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
            <p class="text-[11px] uppercase tracking-widest text-slate-400 mb-3">Endereço</p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="f in dadosEndereco" :key="f.label">
                <span class="text-[10px] uppercase tracking-widest text-slate-400 block">{{ f.label }}</span>
                <span class="text-sm text-slate-800 dark:text-slate-200">{{ f.val || '—' }}</span>
              </div>
            </div>
          </section>
        </div>
        <div class="flex flex-col gap-4">
          <div class="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Frequência (bimestre)</p>
            <p class="text-2xl font-semibold text-slate-900 dark:text-white">96%</p>
            <p class="text-xs text-slate-500 mt-1">3 faltas em 75 aulas</p>
          </div>
          <div class="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Média geral</p>
            <p class="text-2xl font-semibold text-slate-900 dark:text-white">8,4</p>
            <p class="text-xs text-emerald-600 mt-1">+0,3 vs. bimestre anterior</p>
          </div>
          <div class="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Status financeiro</p>
            <p class="text-base font-semibold text-red-600">Em atraso</p>
            <p class="text-xs text-slate-500 mt-1">2 cobranças pendentes</p>
          </div>
        </div>
      </div>

      <!-- ════════════════ MÃE / PAI ════════════════ -->
      <div v-if="['mae','pai'].includes(abaAtiva)" class="p-6">
        <!-- Estado vazio: responsável não cadastrado -->
        <div v-if="contatoAtual.vazio" class="rounded-lg border border-dashed border-slate-200 dark:border-slate-700 p-10 text-center">
          <Icon name="lucide:user-x" class="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ contatoAtual.titulo }} não cadastrado(a)</p>
          <p class="text-xs text-slate-500 mt-1">Este aluno ainda não possui {{ contatoAtual.titulo.toLowerCase() }} vinculado(a) como responsável.</p>
          <NuxtLink to="/responsaveis" class="text-xs text-indigo-600 hover:underline mt-3 inline-block">Gerenciar responsáveis →</NuxtLink>
        </div>

        <template v-else>
          <div class="flex items-start gap-5 mb-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold shrink-0" :style="{ backgroundColor: contatoAtual.cor }">
              {{ iniciaisContato(contatoAtual.nome) }}
            </div>
            <div>
              <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ contatoAtual.nome }}</p>
              <p class="text-sm text-slate-500 mt-0.5">{{ contatoAtual.titulo }} · {{ contatoAtual.parentesco }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span v-if="contatoAtual.financeiro" class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Responsável financeiro</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="f in contatoAtual.dados" :key="f.label">
              <BaseInput :model-value="f.val" :label="f.label" :placeholder="f.label" disabled />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-6 pt-5 border-t border-slate-200 dark:border-slate-700">
            <NuxtLink to="/responsaveis">
              <BaseButton variant="outline" size="md">Ver em responsáveis</BaseButton>
            </NuxtLink>
          </div>
        </template>
      </div>

      <!-- ════════════════ FICHA MÉDICA ════════════════ -->
      <div v-if="abaAtiva === 'medica'" class="p-6 flex flex-col gap-5">

        <!-- Dados básicos -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Dados básicos</p>
          <FormGrid :cols="2">
            <BaseSelect
              v-model="fichaMedica.tipoSanguineo"
              label="Tipo sanguíneo"
              placeholder="Selecione"
              :options="['O+','O-','A+','A-','B+','B-','AB+','AB-','Não sei']"
            />
            <BaseInput v-model="fichaMedica.medicoResponsavel" label="Médico responsável" placeholder="Dr. Marcos Silva (CRM 12345)" />
            <BaseInput v-model="fichaMedica.planoSaude"   label="Plano de saúde" placeholder="Operadora — número da carteirinha" />
            <BaseInput v-model="fichaMedica.hospitalReferencia" label="Hospital de referência" />
          </FormGrid>
        </section>

        <!-- Restrições / alergias / condições -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Alergias, medicamentos e condições</p>
          <BaseTextarea
            v-model="fichaMedica.alergias"
            label="Alergias"
            :rows="2"
            placeholder="Ex.: Amendoim, frutos do mar, látex..."
          />
          <BaseTextarea
            v-model="fichaMedica.medicamentos"
            label="Medicamentos de uso contínuo"
            :rows="2"
            placeholder="Nome, dosagem, horários..."
          />
          <BaseTextarea
            v-model="fichaMedica.condicoesEspeciais"
            label="Condições especiais / observações"
            :rows="2"
            placeholder="Asma, epilepsia, diabetes, restrições alimentares..."
          />
          <FormGrid :cols="2">
            <BaseSelect
              v-model="fichaMedica.autorizaMedicacao"
              label="Autoriza medicação simples em emergência?"
              :options="['Sim', 'Não', 'Apenas com autorização prévia']"
            />
            <BaseSelect
              v-model="fichaMedica.autorizaEducFisica"
              label="Autoriza educação física?"
              :options="['Sim', 'Não', 'Com restrições']"
            />
          </FormGrid>
        </section>

        <!-- Contato de emergência -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Contato de emergência</p>
          <FormGrid :cols="3">
            <BaseInput v-model="fichaMedica.contatoEmergenciaNome"     label="Nome" placeholder="Ex.: Roberta Silva" />
            <BaseInput v-model="fichaMedica.contatoEmergenciaParentesco" label="Parentesco" placeholder="Ex.: Mãe" />
            <BaseInput
              :model-value="fichaMedica.contatoEmergenciaTelefone"
              @update:model-value="fichaMedica.contatoEmergenciaTelefone = applyPhoneMask($event)"
              label="Telefone"
              placeholder="(00) 00000-0000"
            />
          </FormGrid>
        </section>

        <!-- Aviso confidencialidade -->
        <div class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 flex gap-3">
          <Icon name="lucide:triangle-alert" class="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <p class="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            Informações confidenciais — usadas apenas em emergências ou pela equipe pedagógica/de enfermagem.
          </p>
        </div>

        <!-- Última atualização + ações -->
        <div class="flex items-center justify-between gap-3 flex-wrap pt-1">
          <p class="text-[11px] text-slate-500 inline-flex items-center gap-1">
            <Icon name="lucide:clock" class="w-3 h-3" />
            Última atualização: <strong>{{ fichaMedica.ultimaAtualizacao || '—' }}</strong>
          </p>
          <div class="flex items-center gap-2">
            <BaseButton variant="outline" size="md" @click="resetarFichaMedica">Cancelar</BaseButton>
            <BaseButton size="md" @click="salvarFichaMedica">
              <Icon name="lucide:check" class="w-4 h-4" />
              Salvar ficha médica
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- ════════════════ DOC. PENDENTES ════════════════ -->
      <div v-if="abaAtiva === 'docPend'" class="p-6 flex flex-col gap-3">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Documentos pendentes ({{ docsPendentes.length }})</h3>
          <BaseButton size="sm" variant="outline">+ Solicitar documento</BaseButton>
        </div>
        <div v-for="d in docsPendentes" :key="d.id" class="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-900 dark:text-white">{{ d.titulo }}</p>
            <p class="text-xs text-slate-500 mt-0.5">Solicitado em {{ d.solicitado }} · Prazo {{ d.prazo }}</p>
          </div>
          <BaseButton size="sm" variant="outline">Anexar</BaseButton>
        </div>
      </div>

      <!-- ════════════════ ARQUIVAR DOCS ════════════════ -->
      <div v-if="abaAtiva === 'docArq'" class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Documentos arquivados</h3>
          <BaseButton size="sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
            Enviar documento
          </BaseButton>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="d in docsArq" :key="d.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/30">
            <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ d.titulo }}</p>
              <p class="text-xs text-slate-500">{{ d.tipo }} · {{ d.tamanho }} · {{ d.data }}</p>
            </div>
            <button class="text-xs text-indigo-600 hover:underline">Baixar</button>
          </div>
        </div>
      </div>

      <!-- ════════════════ OCORRÊNCIAS ════════════════ -->
      <div v-if="abaAtiva === 'ocorrencias'" class="p-6 flex flex-col gap-3">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Ocorrências registradas</h3>
          <BaseButton size="sm" variant="outline">+ Nova ocorrência</BaseButton>
        </div>
        <article v-for="o in ocorrencias" :key="o.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex gap-3">
          <span class="w-1 rounded-full shrink-0" :class="o.cor"></span>
          <div class="flex-1">
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium text-slate-900 dark:text-white">{{ o.titulo }}</p>
              <span class="text-xs text-slate-500">{{ o.data }}</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{{ o.descricao }}</p>
            <p class="text-[11px] text-slate-400 mt-2">Registrada por {{ o.autor }}</p>
          </div>
        </article>
      </div>

      <!-- ════════════════ CLIENTE ════════════════ -->
      <div v-if="abaAtiva === 'cliente'" class="p-6 flex flex-col gap-5">
        <p class="text-xs text-slate-500">Dados de faturamento do responsável financeiro</p>

        <!-- Identificação -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Identificação</p>
          <FormGrid :cols="2">
            <BaseInput v-model="cliente.nome" label="Razão social / Nome" />
            <BaseInput v-model="cliente.cpfCnpj" label="CPF / CNPJ" />
            <BaseInput v-model="cliente.email" label="E-mail de cobrança" type="email" />
            <BaseInput
              :model-value="cliente.telefone"
              @update:model-value="cliente.telefone = applyPhoneMask($event)"
              label="Telefone"
              placeholder="(00) 00000-0000"
            />
          </FormGrid>
        </section>

        <!-- Endereço (CEP primeiro + ViaCEP) -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
          <div>
            <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Endereço de cobrança</p>
            <p class="text-[11px] text-slate-500 mt-0.5">Informe o CEP — os demais campos são preenchidos automaticamente.</p>
          </div>

          <FormGrid :cols="3">
            <div class="relative">
              <BaseInput
                :model-value="cliente.endereco.cep"
                @update:model-value="onClienteCepInput"
                label="CEP"
                placeholder="00000-000"
              />
              <div v-if="buscandoCepCliente" class="absolute right-2 top-7 text-indigo-500">
                <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              </div>
            </div>
            <div class="col-span-2">
              <BaseInput v-model="cliente.endereco.logradouro" label="Logradouro" placeholder="Rua, avenida..." />
            </div>
          </FormGrid>

          <FormGrid :cols="3">
            <BaseInput v-model="cliente.endereco.numero"      label="Número"      placeholder="123" />
            <BaseInput v-model="cliente.endereco.complemento" label="Complemento" placeholder="Apto 102, bloco B..." />
            <BaseInput v-model="cliente.endereco.bairro"      label="Bairro" />
          </FormGrid>

          <FormGrid :cols="3">
            <div class="col-span-2">
              <BaseInput v-model="cliente.endereco.cidade" label="Cidade" />
            </div>
            <BaseInput
              :model-value="cliente.endereco.estado"
              @update:model-value="cliente.endereco.estado = $event.toUpperCase().slice(0, 2)"
              label="UF"
              maxlength="2"
              placeholder="SP"
            />
          </FormGrid>
        </section>

        <!-- Pagamento -->
        <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
          <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Pagamento</p>
          <FormGrid :cols="2">
            <BaseSelect
              v-model="cliente.formaPagamento"
              label="Forma de pagamento padrão"
              :options="['Boleto mensal', 'PIX', 'Cartão de crédito', 'Débito automático', 'Dinheiro']"
            />
            <BaseSelect
              v-model="cliente.diaVencimento"
              label="Dia de vencimento"
              :options="['5', '10', '15', '20', '25', '28']"
            />
          </FormGrid>
        </section>

        <div class="flex justify-end gap-2">
          <BaseButton variant="outline" size="md" @click="resetarCliente">Cancelar</BaseButton>
          <BaseButton size="md" @click="salvarCliente">
            <Icon name="lucide:check" class="w-4 h-4" />
            Salvar dados de faturamento
          </BaseButton>
        </div>
      </div>

      <!-- ════════════════ CONTRATOS ════════════════ -->
      <div v-if="abaAtiva === 'contratos'" class="p-6 flex flex-col gap-3">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Contratos</h3>
          <BaseButton size="sm">+ Gerar contrato</BaseButton>
        </div>
        <div v-for="c in contratos" :key="c.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/></svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-900 dark:text-white">{{ c.titulo }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ c.vigencia }} · {{ c.status }}</p>
          </div>
          <button class="text-xs text-indigo-600 hover:underline">Ver PDF</button>
        </div>
      </div>

      <!-- ════════════════ PORTAL DO ALUNO ════════════════ -->
      <div v-if="abaAtiva === 'portal'" class="p-6">
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-1">Acesso ao portal</h3>
        <p class="text-xs text-slate-500 mb-5">Credenciais e configurações de acesso do aluno ao portal.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput :model-value="aluno.matricula" label="Usuário (matrícula)" disabled />
          <BaseInput model-value="••••••••••" label="Senha" type="password" />
          <BaseInput :model-value="aluno.emailPortal" label="E-mail vinculado" type="email" />
          <div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Status do acesso</span>
            <div class="mt-1.5 flex items-center gap-3 h-11">
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="rounded" />
                <span class="text-sm text-slate-700 dark:text-slate-300">Acesso ativo</span>
              </label>
            </div>
          </div>
        </div>
        <div class="mt-6 rounded-lg bg-slate-50 dark:bg-slate-900/40 p-4 flex items-center gap-3">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v4l3 2"/></svg>
          <p class="text-xs text-slate-600 dark:text-slate-300">Último acesso: <strong>13/05/2026 às 19:42</strong> · IP 187.45.122.89</p>
        </div>
      </div>

      <!-- ════════════════ FINANCEIRO ════════════════ -->
      <div v-if="abaAtiva === 'financeiro'" class="p-6 flex flex-col gap-4">

        <!-- Tabela de preço atual do aluno -->
        <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-start gap-4">
          <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Icon name="lucide:tag" class="w-5 h-5" />
          </div>

          <div v-if="tabelaAtual" class="flex-1 min-w-0">
            <p class="text-[10px] uppercase tracking-widest text-slate-400">Tabela de preço atual</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ tabelaAtual.nome }}</p>
            <p v-if="tabelaAtual.descricao" class="text-[11px] text-slate-500 mt-0.5">{{ tabelaAtual.descricao }}</p>
            <div class="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600 dark:text-slate-300">
              <span class="inline-flex items-center gap-1"><Icon name="lucide:calendar" class="w-3 h-3 text-slate-400" />{{ tabelaAtual.ano_letivo }}</span>
              <span>Mensalidade: <strong class="text-slate-800 dark:text-slate-100">{{ formatBRL(Number(tabelaAtual.mensalidade)) }}</strong></span>
              <span>Matrícula: <strong class="text-slate-800 dark:text-slate-100">{{ formatBRL(Number(tabelaAtual.matricula)) }}</strong></span>
              <span>Material: <strong class="text-slate-800 dark:text-slate-100">{{ formatBRL(Number(tabelaAtual.material)) }}</strong></span>
            </div>
          </div>

          <div v-else class="flex-1 min-w-0">
            <p class="text-[10px] uppercase tracking-widest text-slate-400">Tabela de preço atual</p>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">— Nenhuma tabela vinculada</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Vincule uma tabela para aplicar os valores às cobranças deste aluno.</p>
          </div>

          <BaseButton variant="outline" size="sm" @click="abrirAlterarTabela">
            <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
            {{ tabelaAtual ? 'Alterar tabela' : 'Vincular tabela' }}
          </BaseButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

          <!-- Pago no ano -->
          <div class="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Icon name="lucide:check-circle-2" class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">Pago no ano</p>
              <p class="text-2xl font-bold text-emerald-700 dark:text-emerald-300 leading-tight tabular-nums">R$ 6.080</p>
              <p class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">4 cobranças quitadas</p>
            </div>
          </div>

          <!-- Em atraso -->
          <div class="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 flex items-center justify-center shrink-0">
              <Icon name="lucide:alert-triangle" class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] uppercase tracking-widest text-red-700 dark:text-red-400 font-semibold">Em atraso</p>
              <p class="text-2xl font-bold text-red-700 dark:text-red-300 leading-tight tabular-nums">R$ 3.040</p>
              <p class="text-[11px] text-red-600 dark:text-red-400 mt-1">2 cobranças em atraso</p>
            </div>
          </div>

          <!-- Próx. vencimento -->
          <div class="rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 p-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
              <Icon name="lucide:calendar-clock" class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[10px] uppercase tracking-widest text-sky-700 dark:text-sky-400 font-semibold">Próx. vencimento</p>
              <template v-if="proximaCobranca">
                <p class="text-2xl font-bold text-sky-700 dark:text-sky-300 leading-tight tabular-nums">R$ {{ proximaCobranca.valor.toLocaleString('pt-BR') }}</p>
                <p class="text-[11px] text-sky-600 dark:text-sky-400 mt-1 truncate">
                  <span class="font-semibold">{{ formatarDataCurta(proximaCobranca.venc) }}</span>
                  <span class="opacity-75"> · {{ proximaCobranca.desc }}</span>
                </p>
              </template>
              <template v-else>
                <p class="text-2xl font-bold text-sky-700 dark:text-sky-300 leading-tight">—</p>
                <p class="text-[11px] text-sky-600 dark:text-sky-400 mt-1">Sem cobranças pendentes</p>
              </template>
            </div>
          </div>

        </div>
        <div class="rounded-xl border border-slate-200 dark:border-slate-700 overflow-visible">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <tr class="text-[11px] uppercase tracking-widest text-slate-500">
                <th class="text-left font-semibold px-4 py-2.5">Descrição</th>
                <th class="text-left font-semibold px-4 py-2.5">Vencimento</th>
                <th class="text-right font-semibold px-4 py-2.5">Valor</th>
                <th class="text-right font-semibold px-4 py-2.5">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr
                v-for="c in cobrancasAluno"
                :key="c.id"
                :class="{
                  'bg-emerald-50/40 dark:bg-emerald-900/10': c.status === 'pago',
                  'bg-amber-50/40 dark:bg-amber-900/10':    c.status === 'pendente',
                  'bg-red-50/40 dark:bg-red-900/10':        c.status === 'atrasado',
                }"
              >
                <td class="px-4 py-2.5 text-slate-700 dark:text-slate-200">{{ c.desc }}</td>
                <td class="px-4 py-2.5 text-slate-600 dark:text-slate-300 text-xs">{{ c.venc }}</td>
                <td class="px-4 py-2.5 text-right font-medium tabular-nums">R$ {{ c.valor.toLocaleString('pt-BR') }}</td>
                <td class="px-4 py-2.5">
                  <div class="flex items-center gap-1.5 justify-end">
                    <!-- Status (largura fixa) -->
                    <div class="w-[88px] flex justify-end">
                      <span
                        v-if="c.status === 'pago'"
                        class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      >
                        <Icon name="lucide:check-circle-2" class="w-3 h-3" />
                        Quitado
                      </span>
                      <span
                        v-else-if="c.status === 'atrasado'"
                        class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                      >
                        <Icon name="lucide:alert-circle" class="w-3 h-3" />
                        Vencido
                      </span>
                      <span
                        v-else
                        class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      >
                        <Icon name="lucide:clock" class="w-3 h-3" />
                        Pendente
                      </span>
                    </div>

                    <!-- NFS-e (largura fixa) -->
                    <div class="w-[68px] relative">
                      <button
                        type="button"
                        @click.stop="toggleDropdown(c.id, 'nfse')"
                        class="w-full inline-flex items-center justify-center gap-1 h-7 px-2 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors"
                      >
                        NFS-e
                        <Icon name="lucide:chevron-down" class="w-3 h-3" />
                      </button>
                      <div
                        v-if="dropdownAberto === `${c.id}-nfse`"
                        class="absolute right-0 mt-1 z-20 w-44 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1"
                      >
                        <button
                          type="button"
                          @click="executarAcao(c, 'gerar-nfse')"
                          class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2"
                        >
                          <Icon name="lucide:file-plus" class="w-3.5 h-3.5 text-indigo-600" />
                          Gerar NFS-e
                        </button>
                      </div>
                    </div>

                    <!-- Slot: Pagar ($) -->
                    <div class="w-7 h-7 flex items-center justify-center">
                      <button
                        v-if="c.status !== 'pago'"
                        type="button"
                        @click="executarAcao(c, 'pagar')"
                        class="w-7 h-7 inline-flex items-center justify-center rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition-colors"
                        title="Receber pagamento"
                      >
                        <Icon name="lucide:dollar-sign" class="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <!-- Slot: Cartão -->
                    <div class="w-7 h-7 flex items-center justify-center">
                      <button
                        v-if="c.status === 'atrasado'"
                        type="button"
                        @click="executarAcao(c, 'cartao')"
                        class="w-7 h-7 inline-flex items-center justify-center rounded-md bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50 transition-colors"
                        title="Pagar com cartão de crédito"
                      >
                        <Icon name="lucide:credit-card" class="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <!-- Slot: Baixar parcela -->
                    <div class="w-7 h-7 flex items-center justify-center">
                      <button
                        v-if="c.status === 'atrasado'"
                        type="button"
                        @click="executarAcao(c, 'baixar-parcela')"
                        class="w-7 h-7 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Baixar parcela"
                      >
                        <Icon name="lucide:download" class="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <!-- Outras ações dropdown (largura fixa) -->
                    <div class="w-[110px] relative">
                      <button
                        type="button"
                        @click.stop="toggleDropdown(c.id, 'outras')"
                        class="w-full inline-flex items-center justify-center gap-1 h-7 px-2 rounded-md text-[11px] font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                      >
                        Outras ações
                        <Icon name="lucide:chevron-down" class="w-3 h-3" />
                      </button>
                      <div
                        v-if="dropdownAberto === `${c.id}-outras`"
                        class="absolute right-0 mt-1 z-20 w-64 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1 max-h-80 overflow-y-auto"
                      >
                        <button v-if="c.status === 'pago'" type="button" @click="executarAcao(c, 'imprimir')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:printer" class="w-3.5 h-3.5 text-slate-400" />
                          Imprimir recibo
                        </button>
                        <button v-if="c.status === 'pago'" type="button" @click="executarAcao(c, 'enviar-recibo')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:mail" class="w-3.5 h-3.5 text-slate-400" />
                          Enviar recibo por e-mail
                        </button>

                        <button v-if="c.status !== 'pago'" type="button" @click="executarAcao(c, 'cancelar')" class="w-full text-left px-3 py-2 text-[12px] text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2">
                          <Icon name="lucide:x-circle" class="w-3.5 h-3.5" />
                          Cancelar cobrança
                        </button>
                        <button v-if="c.status !== 'pago'" type="button" @click="executarAcao(c, 'enviar-cobranca')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:send" class="w-3.5 h-3.5 text-slate-400" />
                          Enviar cobrança por e-mail
                        </button>
                        <div v-if="c.status !== 'pago'" class="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                        <button v-if="c.status !== 'pago'" type="button" @click="executarAcao(c, 'gerar-boleto')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:barcode" class="w-3.5 h-3.5 text-slate-400" />
                          Gerar boleto
                        </button>
                        <button v-if="c.status !== 'pago'" type="button" @click="executarAcao(c, 'gerar-boleto-email')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:mail" class="w-3.5 h-3.5 text-slate-400" />
                          Gerar boleto e enviar por e-mail
                        </button>
                        <div v-if="c.status !== 'pago'" class="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                        <p v-if="c.status !== 'pago'" class="px-3 py-1 text-[10px] uppercase tracking-widest text-slate-400">Gerar carnê</p>
                        <button v-if="c.status !== 'pago'" type="button" @click="executarAcao(c, 'carne-padrao')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:file-text" class="w-3.5 h-3.5 text-slate-400" />
                          Padrão
                        </button>
                        <button v-if="c.status !== 'pago'" type="button" @click="executarAcao(c, 'carne-canhoto')" class="w-full text-left px-3 py-2 text-[12px] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center gap-2">
                          <Icon name="lucide:file-check" class="w-3.5 h-3.5 text-slate-400" />
                          Talão com canhoto
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ════════════════ TRANSPORTE ════════════════ -->
      <div v-if="abaAtiva === 'transporte'" class="p-6 flex flex-col gap-5">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Transporte escolar</h3>
            <p class="text-xs text-slate-500 mt-0.5">Marque a opção e preencha os dados do fornecedor, da rota e dos pontos de embarque/desembarque.</p>
          </div>
          <label class="inline-flex items-center gap-2 cursor-pointer select-none">
            <span
              :class="['relative w-9 h-5 rounded-full transition-colors',
                transporte.utiliza ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600']"
            >
              <span
                :class="['absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all',
                  transporte.utiliza ? 'left-[18px]' : 'left-0.5']"
              />
            </span>
            <span class="text-sm text-slate-700 dark:text-slate-300">Aluno utiliza transporte</span>
            <input v-model="transporte.utiliza" type="checkbox" class="sr-only" />
          </label>
        </div>

        <div
          v-if="!transporte.utiliza"
          class="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-6 text-sm text-slate-500 text-center"
        >
          <Icon name="lucide:bus" class="w-7 h-7 mx-auto mb-2 text-slate-300" />
          Aluno não utiliza serviço de transporte escolar atualmente.<br/>
          Ative a opção acima para cadastrar fornecedor, rota e pontos.
        </div>

        <template v-else>
          <!-- Fornecedor + Modalidade -->
          <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
            <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Fornecedor</p>
            <FormGrid :cols="2">
              <BaseInput v-model="transporte.fornecedor.nome"     label="Nome do fornecedor / empresa" placeholder="Ex.: Transporte Alegre Ltda." />
              <BaseInput v-model="transporte.fornecedor.cnpj"     label="CNPJ"                          placeholder="00.000.000/0000-00" />
              <BaseInput v-model="transporte.fornecedor.responsavel" label="Pessoa responsável"        placeholder="Ex.: João Silva" />
              <BaseInput v-model="transporte.fornecedor.telefone" label="Telefone"                      placeholder="(00) 00000-0000" />
            </FormGrid>
            <FormGrid :cols="3">
              <BaseSelect
                v-model="transporte.modalidade"
                label="Modalidade"
                placeholder="Selecione"
                :options="['Ida e volta', 'Apenas ida', 'Apenas volta']"
              />
              <BaseSelect
                v-model="transporte.tipoVeiculo"
                label="Tipo de veículo"
                placeholder="Selecione"
                :options="['Van', 'Micro-ônibus', 'Ônibus', 'Carro de aplicativo', 'Outro']"
              />
              <BaseInput v-model="transporte.placa" label="Placa do veículo" placeholder="ABC-1D23" />
            </FormGrid>
          </section>

          <!-- Pontos de embarque / desembarque -->
          <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Pontos de embarque e desembarque</p>
              <BaseButton size="sm" variant="outline" @click="adicionarPontoTransporte">
                <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                Adicionar ponto
              </BaseButton>
            </div>

            <p v-if="!transporte.pontos.length" class="text-[12px] text-slate-400 italic text-center py-3">
              Nenhum ponto cadastrado. Clique em "Adicionar ponto" para começar.
            </p>

            <div v-for="(p, idx) in transporte.pontos" :key="p.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-3 flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <p class="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Ponto {{ idx + 1 }}</p>
                <button
                  type="button"
                  @click="removerPontoTransporte(idx)"
                  class="w-7 h-7 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  title="Remover ponto"
                >
                  <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                </button>
              </div>
              <FormGrid :cols="3">
                <BaseSelect
                  :model-value="p.tipo"
                  @update:model-value="p.tipo = $event"
                  label="Tipo"
                  placeholder="Selecione"
                  :options="['Embarque', 'Desembarque', 'Embarque e desembarque']"
                />
                <BaseInput v-model="p.endereco" label="Endereço (rua, número)" placeholder="Av. Paulista, 1500" />
                <BaseInput v-model="p.referencia" label="Ponto de referência" placeholder="Em frente ao Bradesco" />
              </FormGrid>
              <FormGrid :cols="2">
                <BaseInput v-model="p.bairro" label="Bairro" />
                <BaseInput v-model="p.horario" label="Horário" type="time" />
              </FormGrid>
            </div>
          </section>

          <!-- Rota + observações -->
          <section class="rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
            <p class="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Rota e cobrança</p>
            <FormGrid :cols="2">
              <BaseInput v-model="transporte.rota"        label="Rota / linha"      placeholder="Rota Zona Sul – Centro" />
              <BaseInput v-model="transporte.valorMensal" label="Valor mensal (R$)" placeholder="0,00" />
            </FormGrid>
            <BaseTextarea v-model="transporte.observacoes" label="Observações" :rows="3" placeholder="Restrições, autorizações, contato adicional..." />
          </section>

          <div class="flex justify-end gap-2 pt-1">
            <BaseButton variant="outline" size="md" @click="cancelarTransporte">Cancelar</BaseButton>
            <BaseButton size="md" @click="salvarTransporte">
              <Icon name="lucide:check" class="w-4 h-4" />
              Salvar transporte
            </BaseButton>
          </div>
        </template>
      </div>

      <!-- ════════════════ REGISTRO DE CONTATOS ════════════════ -->
      <div v-if="abaAtiva === 'contatos'" class="p-6 flex flex-col gap-3">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Registro de contatos com o aluno</h3>
          <BaseButton size="sm" variant="outline">+ Novo registro</BaseButton>
        </div>
        <article v-for="c in registroContatos" :key="c.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="c.canalBg">
                <span class="text-[10px] font-bold" :class="c.canalText">{{ c.canalIni }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-slate-900 dark:text-white">{{ c.assunto }}</p>
                <p class="text-xs text-slate-500 mt-0.5">{{ c.canal }} · {{ c.autor }}</p>
              </div>
            </div>
            <span class="text-xs text-slate-500">{{ c.data }}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{{ c.resumo }}</p>
        </article>
      </div>

      <!-- ════════════════ AGENDAMENTO DE AÇÃO ════════════════ -->
      <div v-if="abaAtiva === 'agendamento'" class="p-6 flex flex-col gap-3">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Agendamento de ações com o aluno</h3>
          <BaseButton size="sm">+ Agendar ação</BaseButton>
        </div>
        <article v-for="a in agendamentos" :key="a.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex items-start gap-4">
          <div class="text-center shrink-0 w-12">
            <p class="text-[10px] uppercase tracking-widest text-slate-400">{{ a.mes }}</p>
            <p class="text-xl font-semibold text-indigo-600">{{ a.dia }}</p>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-900 dark:text-white">{{ a.titulo }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ a.hora }} · {{ a.responsavel }}</p>
            <p class="text-xs text-slate-600 dark:text-slate-400 mt-2">{{ a.descricao }}</p>
          </div>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
            :class="a.status === 'agendada' ? 'bg-indigo-50 text-indigo-600' : a.status === 'concluída' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'">{{ a.status }}</span>
        </article>
      </div>
    </div>

    <!-- ═════ MODAL — Trocar turma do aluno ═════ -->
    <BaseModal
      v-model="modalTurmaOpen"
      title="Trocar turma do aluno"
      :subtitle="`Aluno: ${aluno.nome}`"
      size="md"
    >
      <template #icon>
        <Icon name="lucide:layers" class="w-4 h-4" />
      </template>

      <form class="flex flex-col gap-4" @submit.prevent="salvarTurma">
        <BaseSelect
          v-model="formTurma.unidade"
          label="Unidade"
          placeholder="Selecione a unidade"
          :options="unidadesMock"
          required
        />
        <BaseSelect
          v-model="formTurma.turmaId"
          label="Turma"
          :placeholder="formTurma.unidade ? 'Selecione a turma' : 'Selecione a unidade antes'"
          :disabled="!formTurma.unidade"
          :options="turmasOptsModal"
        />
        <p v-if="formTurma.unidade && !turmasOptsModal.length" class="text-[12px] text-amber-700 dark:text-amber-400">
          Esta unidade não tem turmas cadastradas.
        </p>
      </form>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalTurmaOpen = false">Cancelar</BaseButton>
        <BaseButton size="sm" @click="salvarTurma">
          <Icon name="lucide:check" class="w-3.5 h-3.5" />
          Salvar turma
        </BaseButton>
      </template>
    </BaseModal>

    <!-- ═════ MODAL — Alterar tabela de preço ═════ -->
    <BaseModal
      v-model="modalTabelaOpen"
      title="Alterar tabela de preço"
      :subtitle="`Aluno: ${aluno.nome}`"
      size="md"
    >
      <template #icon>
        <Icon name="lucide:tag" class="w-4 h-4" />
      </template>

      <div class="flex flex-col gap-4">
        <p v-if="tabelaAtual" class="text-[12px] text-slate-500 dark:text-slate-400">
          Tabela atual: <strong>{{ tabelaAtual.nome }}</strong> · {{ formatBRL(Number(tabelaAtual.mensalidade)) }}/mês
        </p>

        <BaseSelect
          v-model="tabelaSelecionada"
          label="Nova tabela de preço"
          :placeholder="loadingTabelas ? 'Carregando tabelas...' : 'Selecione (deixe vazio para desvincular)'"
          :options="tabelasOpts"
        />

        <div v-if="!loadingTabelas && !tabelasOpts.length" class="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-3 py-2 flex items-start gap-2">
          <Icon name="lucide:triangle-alert" class="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p class="text-[12px] text-amber-700 dark:text-amber-300 leading-snug">
            Nenhuma tabela cadastrada. Crie em <NuxtLink to="/tabelas-preco" class="underline">Configurações → Tabelas de preço</NuxtLink>.
          </p>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="outline" size="sm" @click="modalTabelaOpen = false">Cancelar</BaseButton>
        <BaseButton size="sm" @click="salvarTabela">
          <Icon name="lucide:check" class="w-3.5 h-3.5" />
          Salvar tabela
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { unidadesMock, getTurmasDaUnidade, turmaLabel, unidadeDaTurma } from '~/composables/useAlunoOptions'
import { useTabelasPreco, type TabelaPrecoRecord } from '~/composables/useTabelasPreco'
import {
  useMatriculas,
  STATUS_MATRICULA_LABEL,
  type MatriculaRecord,
} from '~/composables/useMatriculas'
import { formatBRL } from '~/utils/currency'
import { applyCepMask, cepDigits, buscarCep } from '~/utils/cep'
import { applyPhoneMask } from '~/utils/phone'

const route = useRoute()

function salvarAlteracoes() {
  toast.success('Alterações salvas com sucesso! (mock)')
}

// ─── Transporte escolar ──────────────────────────────────────────────────────
interface PontoTransporte {
  id: string
  tipo: string
  endereco: string
  bairro: string
  referencia: string
  horario: string
}

const transporte = ref({
  utiliza: false,
  fornecedor: {
    nome: '',
    cnpj: '',
    responsavel: '',
    telefone: '',
  },
  modalidade: '' as string,
  tipoVeiculo: '' as string,
  placa: '',
  rota: '',
  valorMensal: '',
  observacoes: '',
  pontos: [] as PontoTransporte[],
})

function adicionarPontoTransporte() {
  transporte.value.pontos.push({
    id: `pt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    tipo: 'Embarque e desembarque',
    endereco: '',
    bairro: '',
    referencia: '',
    horario: '',
  })
}

function removerPontoTransporte(idx: number) {
  transporte.value.pontos.splice(idx, 1)
}

function cancelarTransporte() {
  transporte.value.utiliza = false
  toast.info('Transporte cancelado para este aluno.')
}

function salvarTransporte() {
  if (!transporte.value.fornecedor.nome.trim()) {
    toast.error('Informe o nome do fornecedor.')
    return
  }
  if (!transporte.value.pontos.length) {
    toast.error('Adicione ao menos um ponto de embarque/desembarque.')
    return
  }
  const semEndereco = transporte.value.pontos.filter(p => !p.endereco.trim())
  if (semEndereco.length) {
    toast.error(`Há ${semEndereco.length} ponto(s) sem endereço preenchido.`)
    return
  }
  toast.success(`Transporte salvo — ${transporte.value.pontos.length} ponto(s). (mock)`)
}

// ─── Próxima cobrança a vencer ───────────────────────────────────────────────
function parseDataBr(s: string): Date {
  const [d, m, y] = s.split('/').map(Number)
  return new Date(y!, (m ?? 1) - 1, d ?? 1)
}

const MESES_CURTOS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
function formatarDataCurta(s: string): string {
  const dt = parseDataBr(s)
  return `${dt.getDate().toString().padStart(2, '0')}/${MESES_CURTOS[dt.getMonth()]}`
}

const proximaCobranca = computed(() => {
  return cobrancasAluno
    .filter(c => c.status === 'pendente' || c.status === 'atrasado')
    .sort((a, b) => parseDataBr(a.venc).getTime() - parseDataBr(b.venc).getTime())[0]
})

// ─── Dropdown de ações no financeiro ─────────────────────────────────────────
const dropdownAberto = ref<string | null>(null)

function toggleDropdown(id: number | string, tipo: 'nfse' | 'outras') {
  const key = `${id}-${tipo}`
  dropdownAberto.value = dropdownAberto.value === key ? null : key
}

function executarAcao(c: { desc: string; status: string }, acao: string) {
  dropdownAberto.value = null
  const labels: Record<string, string> = {
    'gerar-nfse':         'NFS-e gerada (mock)',
    'pagar':              `Cobrança "${c.desc}" baixada como paga (mock)`,
    'cartao':             'Cobrança paga com cartão de crédito (mock)',
    'baixar-parcela':     'Parcela baixada (mock)',
    'imprimir':           'Recibo enviado para impressão (mock)',
    'enviar-recibo':      'Recibo enviado por e-mail (mock)',
    'cancelar':           'Cobrança cancelada (mock)',
    'enviar-cobranca':    'Cobrança enviada por e-mail (mock)',
    'gerar-boleto':       'Boleto gerado (mock)',
    'gerar-boleto-email': 'Boleto gerado e enviado por e-mail (mock)',
    'carne-padrao':       'Carnê padrão gerado (mock)',
    'carne-canhoto':      'Carnê com canhoto gerado (mock)',
  }
  toast.success(labels[acao] ?? 'Ação executada (mock)')
}

if (typeof window !== 'undefined') {
  onMounted(() => {
    document.addEventListener('click', () => { dropdownAberto.value = null })
  })
}

// ─── Modal: trocar turma do aluno ────────────────────────────────────────────
const modalTurmaOpen = ref(false)
const formTurma = ref({ unidade: '', turmaId: '' })

const turmaAtualLabel = computed(() => aluno.value.turmaId ? turmaLabel(aluno.value.turmaId) : '')

const turmasOptsModal = computed(() =>
  getTurmasDaUnidade(formTurma.value.unidade).map(t => ({
    label: `${t.label} · ${t.turno}`,
    value: t.id,
  })),
)

function abrirEditarTurma() {
  formTurma.value = {
    unidade: aluno.value.turmaId ? (unidadeDaTurma(aluno.value.turmaId) ?? '') : '',
    turmaId: aluno.value.turmaId ?? '',
  }
  modalTurmaOpen.value = true
}

// Ao trocar a unidade no modal, limpa turma selecionada
watch(() => formTurma.value.unidade, () => {
  formTurma.value.turmaId = ''
})

function salvarTurma() {
  if (!formTurma.value.unidade) return toast.error('Selecione a unidade.')
  aluno.value.turmaId = formTurma.value.turmaId || null
  modalTurmaOpen.value = false
  toast.success(formTurma.value.turmaId
    ? `Turma atualizada para ${turmaLabel(formTurma.value.turmaId)} (mock)`
    : 'Aluno desvinculado da turma (mock)')
}

// ─── Scroll horizontal das abas (wheel + setas) ───────────────────────────────
const tabsNav        = ref<HTMLElement>()
const canScrollLeft  = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = tabsNav.value
  if (!el) return
  const tolerance = 2
  canScrollLeft.value  = el.scrollLeft > tolerance
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance
}

function scrollByStep(direction: -1 | 1) {
  const el = tabsNav.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' })
}

function onWheel(e: WheelEvent) {
  const el = tabsNav.value
  if (!el) return
  if (el.scrollWidth <= el.clientWidth) return
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
  e.preventDefault()
  el.scrollLeft += e.deltaY
}

onMounted(() => {
  nextTick(updateScrollState)
  window.addEventListener('resize', updateScrollState)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScrollState)
})

interface AlunoView {
  id: string | string[]
  nome: string
  matricula: string
  ra: string
  documento: string
  turmaId: string | null
  tabelaPrecoId: string | null
  escola: string
  escolaId: string | null
  idade: number
  cor: string
  foto: string | null
  emailPortal: string
  pendenciaFinanceira: boolean
  dataNascimento: string | null
  status: 'ativo' | 'inativo' | 'suspenso'
  forma_pagamento: string | null
}

const aluno = ref<AlunoView>({
  id: route.params.id,
  nome: '',
  matricula: '',
  ra: '',
  documento: '',
  turmaId: null,
  tabelaPrecoId: null,
  escola: '',
  escolaId: null,
  idade: 0,
  cor: '#6366f1',
  foto: null,
  emailPortal: '',
  pendenciaFinanceira: false,
  dataNascimento: null,
  status: 'ativo',
  forma_pagamento: null,
})

// ─── Carrega aluno real do banco ──────────────────────────────────────────────
import { useAlunos } from '~/composables/useAlunos'
const { obterPorId: obterAlunoPorId } = useAlunos()

const loadingAluno = ref(true)
const alunoNaoEncontrado = ref(false)
const responsaveisDoBanco = ref<Awaited<ReturnType<typeof obterAlunoPorId>>['responsaveis']>([])

async function carregarAluno() {
  const id = typeof route.params.id === 'string' ? route.params.id : null
  if (!id) { alunoNaoEncontrado.value = true; loadingAluno.value = false; return }

  loadingAluno.value = true
  try {
    const { aluno: a, responsaveis } = await obterAlunoPorId(id)
    if (!a) { alunoNaoEncontrado.value = true; return }

    aluno.value = {
      id: a.id,
      nome: a.nome,
      matricula: a.matricula ?? '',
      ra: a.ra ?? '',
      documento: a.documento ?? '',
      turmaId: a.turma_id,
      tabelaPrecoId: a.tabela_preco_id,
      escola: a.escola_nome ?? '—',
      escolaId: a.escola_id,
      idade: a.idade ?? 0,
      cor: a.cor,
      foto: null,
      emailPortal: '',
      pendenciaFinanceira: false,
      dataNascimento: a.data_nascimento,
      status: a.status,
      forma_pagamento: a.forma_pagamento,
    }
    responsaveisDoBanco.value = responsaveis
  } catch (e: any) {
    toast.error(`Erro ao carregar aluno: ${e?.message ?? ''}`)
    alunoNaoEncontrado.value = true
  } finally {
    loadingAluno.value = false
  }
}

onMounted(carregarAluno)

// ─── Edição de foto do aluno ──────────────────────────────────────────────────
const inputFotoEl = ref<HTMLInputElement | null>(null)

function abrirSeletorFoto() {
  inputFotoEl.value?.click()
}

function onArquivoFotoSelecionado(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    toast.error('Selecione um arquivo de imagem (jpg, png, webp).')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Imagem muito grande. Máximo 5 MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    aluno.value.foto = reader.result as string
    toast.success('Foto atualizada! (mock — salve para persistir)')
  }
  reader.onerror = () => toast.error('Falha ao ler o arquivo.')
  reader.readAsDataURL(file)

  // limpa o input para permitir reselecionar o mesmo arquivo
  if (inputFotoEl.value) inputFotoEl.value.value = ''
}

function removerFoto() {
  if (!confirm('Remover a foto do aluno?')) return
  aluno.value.foto = null
  toast.info('Foto removida.')
}

// ─── Tabelas de preço (carrega do Supabase) ──────────────────────────────────
const { listar: listarTabelas } = useTabelasPreco()
const tabelas        = ref<TabelaPrecoRecord[]>([])
const loadingTabelas = ref(true)

const tabelaAtual = computed<TabelaPrecoRecord | null>(() => {
  if (!aluno.value.tabelaPrecoId) return null
  return tabelas.value.find(t => t.id === aluno.value.tabelaPrecoId) ?? null
})

const tabelasOpts = computed(() =>
  tabelas.value.map(t => ({
    label: `${t.nome} — ${formatBRL(Number(t.mensalidade))}/mês`,
    value: t.id,
  })),
)

onMounted(async () => {
  loadingTabelas.value = true
  try {
    tabelas.value = await listarTabelas()
    // Se ainda não há tabela vinculada e existe ao menos uma, sugere a primeira
    if (!aluno.value.tabelaPrecoId && tabelas.value.length) {
      aluno.value.tabelaPrecoId = tabelas.value[0]!.id
    }
  } catch (e) {
    console.error('Erro ao carregar tabelas:', e)
  } finally {
    loadingTabelas.value = false
  }
})

// ─── Modal: alterar tabela de preço ──────────────────────────────────────────
const modalTabelaOpen   = ref(false)
const tabelaSelecionada = ref<string>('')

function abrirAlterarTabela() {
  tabelaSelecionada.value = aluno.value.tabelaPrecoId ?? ''
  modalTabelaOpen.value = true
}

function salvarTabela() {
  aluno.value.tabelaPrecoId = tabelaSelecionada.value || null
  modalTabelaOpen.value = false
  toast.success(tabelaSelecionada.value
    ? `Tabela atualizada para ${tabelaAtual.value?.nome ?? ''} (mock)`
    : 'Tabela de preço desvinculada (mock)')
}

const iniciais = computed(() => {
  const p = aluno.value.nome.split(/\s+/).filter(Boolean)
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
})

const abaAtiva = ref<string>('dados')

const tabs = [
  { id: 'dados',        label: 'Dados do aluno',    badge: '',  icon: 'lucide:user-round'        },
  { id: 'mae',          label: 'Mãe',               badge: '',  icon: 'lucide:venus'             },
  { id: 'pai',          label: 'Pai',               badge: '',  icon: 'lucide:mars'              },
  { id: 'medica',       label: 'Ficha médica',      badge: '',  icon: 'lucide:heart-pulse'       },
  { id: 'docPend',      label: 'Doc. pendentes',    badge: '3', icon: 'lucide:file-warning'      },
  { id: 'docArq',       label: 'Arquivar docs',     badge: '',  icon: 'lucide:folder-archive'    },
  { id: 'ocorrencias',  label: 'Ocorrências',       badge: '2', icon: 'lucide:triangle-alert'    },
  { id: 'cliente',      label: 'Cliente',           badge: '',  icon: 'lucide:contact-round'     },
  { id: 'contratos',    label: 'Contratos',         badge: '',  icon: 'lucide:file-signature'    },
  { id: 'portal',       label: 'Portal do aluno',   badge: '',  icon: 'lucide:globe'             },
  { id: 'financeiro',   label: 'Financeiro',        badge: '2', icon: 'lucide:wallet'            },
  { id: 'transporte',   label: 'Transporte',        badge: '',  icon: 'lucide:bus'               },
  { id: 'contatos',     label: 'Reg. contatos',     badge: '',  icon: 'lucide:message-square-text' },
  { id: 'agendamento',  label: 'Agend. ação',       badge: '',  icon: 'lucide:calendar-clock'    },
]

function formatarDataBR(iso: string | null): string {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  if (!ano || !mes || !dia) return iso
  return `${dia}/${mes}/${ano}`
}

const dadosPessoais = computed(() => [
  { label: 'CPF',           val: aluno.value.documento || '' },
  { label: 'RG',            val: '' },
  { label: 'Nascimento',    val: formatarDataBR(aluno.value.dataNascimento) },
  { label: 'Nacionalidade', val: '' },
  { label: 'Naturalidade',  val: '' },
  { label: 'Sexo',          val: '' },
])

const dadosEndereco = [
  { label: 'Rua',    val: '' },
  { label: 'Bairro', val: '' },
  { label: 'Cidade', val: '' },
  { label: 'Estado', val: '' },
  { label: 'CEP',    val: '' },
  { label: 'País',   val: '' },
]

// ─── Ficha médica (editável) ─────────────────────────────────────────────────
function fichaMedicaInicial() {
  return {
    tipoSanguineo: 'O+',
    planoSaude: 'Unimed Central — 123456789',
    medicoResponsavel: 'Dr. Marcos Silva (CRM 12345)',
    hospitalReferencia: 'Hospital Sírio-Libanês',
    alergias: 'Amendoim, frutos do mar',
    medicamentos: 'Nenhum de uso contínuo',
    condicoesEspeciais: 'Nenhuma registrada',
    autorizaMedicacao: 'Apenas com autorização prévia',
    autorizaEducFisica: 'Sim',
    contatoEmergenciaNome: 'Roberta',
    contatoEmergenciaParentesco: 'Mãe',
    contatoEmergenciaTelefone: '(11) 99999-0000',
    ultimaAtualizacao: '15/01/2026',
  }
}

const fichaMedica = ref(fichaMedicaInicial())

function resetarFichaMedica() {
  fichaMedica.value = fichaMedicaInicial()
  toast.info('Alterações descartadas.')
}

function salvarFichaMedica() {
  fichaMedica.value.ultimaAtualizacao = new Date().toLocaleDateString('pt-BR')
  toast.success('Ficha médica salva! (mock)')
}

// Cor estável a partir de uma seed (nome)
function corPorNome(nome: string): string {
  const palette = ['#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#f43f5e']
  if (!nome) return palette[0]!
  let h = 0
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) >>> 0
  return palette[h % palette.length]!
}

const contatoAtual = computed(() => {
  const parentescoAlvo: 'mae' | 'pai' = abaAtiva.value === 'pai' ? 'pai' : 'mae'
  const titulo = parentescoAlvo === 'pai' ? 'Pai' : 'Mãe'

  const r = responsaveisDoBanco.value.find(x => x.parentesco === parentescoAlvo)
  if (!r) {
    return {
      vazio: true,
      nome: `${titulo} não cadastrado(a)`,
      titulo,
      parentesco: titulo,
      cor: '#94a3b8',
      financeiro: false,
      dados: [],
    }
  }

  return {
    vazio: false,
    nome: r.nome,
    titulo,
    parentesco: titulo,
    cor: corPorNome(r.nome),
    financeiro: r.responsavel_financeiro,
    dados: [
      { label: 'Nome completo', val: r.nome },
      { label: 'CPF',           val: r.cpf      ?? '' },
      { label: 'Telefone',      val: r.telefone ?? '' },
      { label: 'E-mail',        val: r.email    ?? '' },
    ],
  }
})

function iniciaisContato(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}

const docsPendentes = [
  { id: 1, titulo: 'Cópia da Certidão de Nascimento atualizada', solicitado: '01/03/2026', prazo: '30/05/2026' },
  { id: 2, titulo: 'Comprovante de residência (últimos 90 dias)', solicitado: '15/03/2026', prazo: '30/05/2026' },
  { id: 3, titulo: 'Carteira de vacinação atualizada',           solicitado: '20/03/2026', prazo: '15/06/2026' },
]

const docsArq = [
  { id: 1, titulo: 'Histórico escolar 2025',     tipo: 'PDF', tamanho: '480 KB', data: '12/01/2026' },
  { id: 2, titulo: 'RG do aluno',                tipo: 'JPG', tamanho: '2,1 MB', data: '15/01/2026' },
  { id: 3, titulo: 'CPF',                        tipo: 'PDF', tamanho: '120 KB', data: '15/01/2026' },
  { id: 4, titulo: 'Foto 3x4',                   tipo: 'JPG', tamanho: '180 KB', data: '20/01/2026' },
  { id: 5, titulo: 'Contrato 2026 (assinado)',   tipo: 'PDF', tamanho: '1,3 MB', data: '20/01/2026' },
  { id: 6, titulo: 'Cartão de vacinação 2024',   tipo: 'PDF', tamanho: '650 KB', data: '15/01/2026' },
]

// ─── Matrículas do aluno (carregadas do Supabase) ────────────────────────────
const { listar: listarMatriculas } = useMatriculas()
const matriculasHist  = ref<MatriculaRecord[]>([])
const loadingMatriculas = ref(true)

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function recarregarMatriculasDoAluno() {
  const id = typeof route.params.id === 'string' ? route.params.id : null
  // Acessos via IDs mockados (ex.: /alunos/1) não consultam o banco — exibe vazio.
  if (!id || !UUID_RE.test(id)) {
    matriculasHist.value = []
    loadingMatriculas.value = false
    return
  }
  loadingMatriculas.value = true
  try {
    matriculasHist.value = await listarMatriculas({ alunoId: id })
  } catch (e: any) {
    toast.error(`Erro ao carregar matrículas: ${e?.message ?? ''}`)
  } finally {
    loadingMatriculas.value = false
  }
}

// Matrícula corrente = a mais recente (não cancelada) ou, se só houver canceladas, a primeira.
const matriculaCorrente = computed<MatriculaRecord | null>(() => {
  const ativas = matriculasHist.value.filter(m => m.status_matricula !== 'cancelada')
  return ativas[0] ?? matriculasHist.value[0] ?? null
})

onMounted(() => { recarregarMatriculasDoAluno() })

const ocorrencias = [
  { id: 1, titulo: 'Indisciplina em sala',  descricao: 'Aluno conversou excessivamente durante a aula de matemática e foi orientado pela professora.', data: '12/05/2026', autor: 'Ana Clara Mendes', cor: 'bg-amber-400' },
  { id: 2, titulo: 'Elogio — Liderança',     descricao: 'Demonstrou iniciativa ao ajudar colegas com dificuldade no trabalho em grupo.',                  data: '03/05/2026', autor: 'Carlos E. Souza', cor: 'bg-emerald-500' },
]

// ─── Dados do cliente / responsável financeiro ───────────────────────────────
function clienteInicial() {
  return {
    nome: 'Roberta Fernandes Silva',
    cpfCnpj: '987.654.321-00',
    email: 'roberta.silva@gmail.com',
    telefone: '(11) 99876-5432',
    endereco: {
      cep: '04101-000',
      logradouro: 'R. das Acácias',
      numero: '234',
      complemento: 'Ap 102',
      bairro: 'Vila Mariana',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    formaPagamento: 'Boleto mensal',
    diaVencimento: '10',
  }
}

const cliente = ref(clienteInicial())
const buscandoCepCliente = ref(false)

async function onClienteCepInput(valor: string) {
  cliente.value.endereco.cep = applyCepMask(valor)
  if (cepDigits(cliente.value.endereco.cep)) {
    buscandoCepCliente.value = true
    try {
      const dados = await buscarCep(cliente.value.endereco.cep)
      cliente.value.endereco.logradouro = dados.logradouro || cliente.value.endereco.logradouro
      cliente.value.endereco.bairro     = dados.bairro     || cliente.value.endereco.bairro
      cliente.value.endereco.cidade     = dados.cidade     || cliente.value.endereco.cidade
      cliente.value.endereco.estado     = dados.estado     || cliente.value.endereco.estado
      toast.success('Endereço preenchido pelo CEP.')
    } catch (e: any) {
      toast.error(e?.message === 'CEP não encontrado'
        ? 'CEP não encontrado. Preencha o endereço manualmente.'
        : 'Erro ao consultar CEP.')
    } finally {
      buscandoCepCliente.value = false
    }
  }
}

function resetarCliente() {
  cliente.value = clienteInicial()
  toast.info('Alterações descartadas.')
}

function salvarCliente() {
  toast.success('Dados de faturamento salvos! (mock)')
}

const contratos = [
  { id: 1, titulo: 'Contrato de prestação de serviços 2026', vigencia: '01/02/2026 — 31/12/2026', status: 'assinado digitalmente' },
  { id: 2, titulo: 'Contrato 2025',                           vigencia: '01/02/2025 — 31/12/2025', status: 'concluído' },
  { id: 3, titulo: 'Aditivo — material didático 2026',        vigencia: '01/02/2026 — 31/12/2026', status: 'assinado digitalmente' },
]

const cobrancasAluno = [
  { id: 1, desc: 'Mensalidade — Junho/2026',   venc: '10/06/2026', valor: 1520, status: 'pendente' },
  { id: 2, desc: 'Mensalidade — Abril/2026',   venc: '10/04/2026', valor: 1520, status: 'atrasado' },
  { id: 3, desc: 'Material didático — 1º sem', venc: '15/04/2026', valor: 620,  status: 'atrasado' },
  { id: 4, desc: 'Mensalidade — Maio/2026',    venc: '10/05/2026', valor: 1520, status: 'pago' },
  { id: 5, desc: 'Mensalidade — Março/2026',   venc: '10/03/2026', valor: 1520, status: 'pago' },
]

const registroContatos = [
  { id: 1, assunto: 'Conversa sobre desempenho em Matemática', canal: 'Presencial', canalIni: 'PR', canalBg: 'bg-indigo-50 dark:bg-indigo-900/30', canalText: 'text-indigo-600', autor: 'Ana Clara Mendes (Coord.)', data: '10/05/2026', resumo: 'Conversa breve com o aluno após a aula sobre a dificuldade com frações. Combinamos atividades extras.' },
  { id: 2, assunto: 'Telefonema para mãe — atraso',             canal: 'Telefone',   canalIni: 'TE', canalBg: 'bg-emerald-50 dark:bg-emerald-900/30', canalText: 'text-emerald-600', autor: 'Secretaria',                  data: '02/05/2026', resumo: 'Mãe contatada para informar sobre cobranças em atraso. Comprometeu-se a regularizar até 20/05.' },
  { id: 3, assunto: 'WhatsApp — atestado médico',                canal: 'WhatsApp',   canalIni: 'WP', canalBg: 'bg-green-50 dark:bg-green-900/30',     canalText: 'text-green-600',  autor: 'Secretaria',                  data: '08/04/2026', resumo: 'Recebido atestado médico via WhatsApp referente ao período de 08/04 a 10/04.' },
]

const agendamentos = [
  { id: 1, dia: 20, mes: 'mai', titulo: 'Reunião com mãe sobre desempenho', hora: '14h00', responsavel: 'Ana Clara Mendes',  descricao: 'Conversar sobre o desempenho em Matemática e plano de recuperação.', status: 'agendada' },
  { id: 2, dia: 27, mes: 'mai', titulo: 'Acompanhamento pedagógico',          hora: '10h00', responsavel: 'Felipe Andrade',   descricao: 'Aula de reforço individual.',                                       status: 'agendada' },
  { id: 3, dia: 15, mes: 'abr', titulo: 'Conversa sobre comportamento',       hora: '11h00', responsavel: 'Ana Clara Mendes', descricao: 'Conversa após ocorrência registrada em sala.',                       status: 'concluída' },
]
</script>

<style scoped>
/* Esconde a scrollbar horizontal das abas mantendo a funcionalidade.
   A roda do mouse é redirecionada para scroll horizontal via onWheel(). */
.tabs-scroller {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.tabs-scroller::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* Transição das setas */
.tabs-fade-enter-active,
.tabs-fade-leave-active { transition: opacity .18s ease, transform .18s ease; }
.tabs-fade-enter-from   { opacity: 0; transform: translateX(-4px); }
.tabs-fade-leave-to     { opacity: 0; transform: translateX(-4px); }

/* Pulso para chamar atenção */
@keyframes pulse-hint {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  50%      { box-shadow: 0 0 0 5px rgba(99, 102, 241, .18); }
}
.animate-pulse-hint { animation: pulse-hint 1.8s ease-in-out 0s 3; }
</style>
