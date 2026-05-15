<template>
  <div class="flex flex-col gap-6">

    <!-- ═════ Cabeçalho ═════ -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink to="/alunos" class="w-9 h-9 flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" aria-label="Voltar">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Cadastro de aluno
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Preencha os dados em todas as abas. Campos com <span class="text-red-500">*</span> são obrigatórios.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <BaseButton variant="ghost" @click="$router.push('/alunos')">Cancelar</BaseButton>
        <BaseButton variant="ghost" @click="salvar(true)">Salvar rascunho</BaseButton>
        <BaseButton variant="primary" @click="salvar(false)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Salvar aluno
        </BaseButton>
      </div>
    </div>

    <!-- ═════ Tabs ═════ -->
    <div class="sticky top-16 z-[5] -mx-6 px-6 pb-1.5 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-700/60">
      <div class="relative">

        <!-- Fade + seta esquerda -->
        <Transition name="tabs-fade">
          <div
            v-if="canScrollLeft"
            class="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 flex items-center bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90"
          >
            <button
              type="button"
              @click="scrollByStep(-1)"
              class="pointer-events-auto w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
              aria-label="Rolar abas para a esquerda"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            </button>
          </div>
        </Transition>

        <!-- Fade + seta direita -->
        <Transition name="tabs-fade">
          <div
            v-if="canScrollRight"
            class="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 flex items-center justify-end bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90"
          >
            <button
              type="button"
              @click="scrollByStep(1)"
              class="pointer-events-auto w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors animate-pulse-hint"
              aria-label="Rolar abas para a direita"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </button>
          </div>
        </Transition>

      <nav
        ref="tabsNav"
        @wheel="onWheel"
        @scroll.passive="updateScrollState"
        class="tabs-scroller flex items-center gap-0.5 overflow-x-auto overflow-y-hidden scroll-smooth"
        role="tablist"
      >
        <template v-for="(tab, idx) in tabs" :key="tab.id">
          <span
            v-if="idx > 0 && tabs[idx - 1]!.group !== tab.group"
            class="mx-1 h-4 w-px bg-slate-300 dark:bg-slate-600 shrink-0"
            aria-hidden="true"
          />
          <button
            @click="setAba(tab.id)"
            :class="[
              'flex items-center gap-1.5 px-2.5 h-8 rounded-md text-[13px] font-normal whitespace-nowrap transition-colors relative',
              abaAtiva === tab.id
                ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
            ]"
            role="tab"
            :aria-selected="abaAtiva === tab.id"
          >
            <span
              :class="[
                'w-4 h-4 rounded text-[10px] font-semibold flex items-center justify-center shrink-0',
                abaAtiva === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
              ]"
            >{{ tab.numero }}</span>
            {{ tab.label }}
            <span
              v-if="abaAtiva === tab.id"
              class="absolute -bottom-1.5 left-2 right-2 h-[2px] bg-indigo-600 rounded-full"
            />
          </button>
        </template>
      </nav>

      </div>
    </div>

    <!-- ═════ Conteúdo da aba ═════ -->
    <div role="tabpanel">
      <AlunoTabsDados
        v-if="abaAtiva === 'dados'"
        v-model="form"
      />

      <AlunoResponsavelForm
        v-else-if="abaAtiva === 'mae'"
        v-model="form.mae"
        titulo-label="Mãe"
        nome-label="Nome da mãe"
        parentesco-busca="Mãe"
      />

      <AlunoResponsavelForm
        v-else-if="abaAtiva === 'pai'"
        v-model="form.pai"
        titulo-label="Pai"
        nome-label="Nome do pai"
        parentesco-busca="Pai"
      />

      <AlunoTabsFichaMedica
        v-else-if="abaAtiva === 'medica'"
        v-model="form.ficha"
      />

      <AlunoTabsDocPendentes
        v-else-if="abaAtiva === 'docs-pendentes'"
        v-model="form.documentosPendentes"
      />

      <AlunoTabsArquivarDocs
        v-else-if="abaAtiva === 'arquivar'"
        v-model="form.arquivos"
        :aluno-salvo="alunoSalvo"
      />

      <AlunoTabsOcorrencias
        v-else-if="abaAtiva === 'ocorrencias'"
        :ocorrencias="form.ocorrencias"
      />

      <AlunoTabsAbaExterna
        v-else-if="abaAtiva === 'contratos'"
        title="Contratos do aluno"
        subtitle="Contratos de prestação de serviço vinculados ao responsável financeiro"
        message="Contratos disponíveis após salvar"
        description="Esta seção lista os contratos de prestação de serviço vinculados ao responsável financeiro do aluno."
        button-label="contratos"
        icon-path="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        :aluno-salvo="alunoSalvo"
      />

      <AlunoTabsTransporte
        v-else-if="abaAtiva === 'transporte'"
        v-model="form.transporte"
      />

      <AlunoTabsRegistroContatos
        v-else-if="abaAtiva === 'contatos'"
        v-model="form.registrosContato"
      />

      <AlunoTabsAgendamentoAcao
        v-else-if="abaAtiva === 'agendamentos'"
        v-model="form.agendamentos"
      />

      <AlunoTabsAbaExterna
        v-else-if="abaAtiva === 'catraca'"
        title="Cartões de acesso da catraca"
        subtitle="Gerenciamento de cartões de acesso vinculados ao aluno"
        message="Cartões disponíveis após salvar"
        description="Após salvar o cadastro, você poderá vincular cartões de acesso da catraca a este aluno."
        button-label="cartões"
        icon-path="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        :aluno-salvo="alunoSalvo"
      />
    </div>

    <!-- ═════ Navegação inferior — sticky logo acima do footer ═════ -->
    <div class="sticky bottom-12 z-30 -mx-6 px-6 py-3 mt-4 border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
      <div class="flex items-center justify-between gap-3">
        <BaseButton variant="ghost" :disabled="!hasAnterior" @click="anterior">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
          Aba anterior
        </BaseButton>

        <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
          <span class="font-medium text-slate-700 dark:text-slate-200">{{ tabAtivaInfo?.numero }} de {{ tabs.length }}</span>
          <span class="text-slate-400 dark:text-slate-500"> — {{ tabAtivaInfo?.label }}</span>
        </p>

        <BaseButton v-if="hasProxima" variant="primary" @click="proxima">
          Próxima aba
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
        </BaseButton>
        <BaseButton v-else variant="primary" :disabled="salvando" @click="salvar(false)">
          <svg v-if="salvando" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-opacity="0.25"/><path stroke-linecap="round" d="M21 12a9 9 0 00-9-9"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Salvar aluno
        </BaseButton>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ title: 'Novo aluno' })

const supabase = useSupabaseClient<import('~/types/database.types').Database>()
const { vincularResponsavelDoAluno } = useResponsaveis()

type AbaId =
  | 'dados' | 'mae' | 'pai' | 'medica'
  | 'docs-pendentes' | 'arquivar' | 'ocorrencias'
  | 'contratos' | 'transporte' | 'contatos' | 'agendamentos' | 'catraca'

const tabs: { id: AbaId; numero: number; label: string; group: 'cadastro' | 'documentos' | 'historico' | 'rotina' }[] = [
  { id: 'dados',          numero: 1,  label: 'Dados do aluno',          group: 'cadastro' },
  { id: 'mae',            numero: 2,  label: 'Mãe',                     group: 'cadastro' },
  { id: 'pai',            numero: 3,  label: 'Pai',                     group: 'cadastro' },
  { id: 'medica',         numero: 4,  label: 'Ficha médica',            group: 'cadastro' },
  { id: 'docs-pendentes', numero: 5,  label: 'Doc. pendentes',          group: 'documentos' },
  { id: 'arquivar',       numero: 6,  label: 'Arquivar docs',           group: 'documentos' },
  { id: 'ocorrencias',    numero: 7,  label: 'Ocorrências',             group: 'historico' },
  { id: 'contratos',      numero: 8,  label: 'Contratos',               group: 'historico' },
  { id: 'transporte',     numero: 9,  label: 'Transporte',              group: 'rotina' },
  { id: 'contatos',       numero: 10, label: 'Registro de contatos',    group: 'rotina' },
  { id: 'agendamentos',   numero: 11, label: 'Agendamento de ação',     group: 'rotina' },
  { id: 'catraca',        numero: 12, label: 'Cartões da catraca',      group: 'rotina' },
]

const abaAtiva   = ref<AbaId>('dados')
const form       = ref(emptyAlunoForm())
const alunoSalvo = ref(false) // ativa abas dependentes (Arquivar Docs, Contratos, Catraca)

const tabsNav        = ref<HTMLElement>()
const canScrollLeft  = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = tabsNav.value
  if (!el) return
  const tolerance = 2 // evita oscilar por arredondamento
  canScrollLeft.value  = el.scrollLeft > tolerance
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance
}

function scrollByStep(direction: -1 | 1) {
  const el = tabsNav.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' })
}

// Converte scroll vertical do mouse em scroll horizontal nas abas
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

const tabAtivaInfo = computed(() => tabs.find(t => t.id === abaAtiva.value))
const indiceAtual  = computed(() => tabs.findIndex(t => t.id === abaAtiva.value))
const hasAnterior  = computed(() => indiceAtual.value > 0)
const hasProxima   = computed(() => indiceAtual.value < tabs.length - 1)

function setAba(id: AbaId) {
  abaAtiva.value = id
  scrollToTop()
}

function anterior() {
  if (hasAnterior.value) {
    abaAtiva.value = tabs[indiceAtual.value - 1]!.id
    scrollToTop()
  }
}

function proxima() {
  if (hasProxima.value) {
    abaAtiva.value = tabs[indiceAtual.value + 1]!.id
    scrollToTop()
  }
}

function scrollToTop() {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
}

const salvando = ref(false)
import { gerarRmPorCpf, gerarRaPorCpf } from '~/utils/ra'

function pegarPrimeiroTelefone(resp: import('~/composables/useAlunoForm').ResponsavelData): string | null {
  const grupos = [resp.telefones.contato, resp.telefones.residencial, resp.telefones.comercial]
  for (const g of grupos) for (const p of g) if (p.telefone.trim()) return p.telefone
  return null
}

type ParentescoEnum = 'pai' | 'mae' | 'avo' | 'ava' | 'tutor' | 'outro'

/**
 * Cria (ou reusa por CPF) um responsável no banco e vincula ao aluno via aluno_responsaveis.
 * Retorna true se vínculo foi criado.
 */
async function persistirResponsavel(
  alunoId: string,
  resp: import('~/composables/useAlunoForm').ResponsavelData,
  parentesco: ParentescoEnum,
  userId: string,
): Promise<boolean> {
  if (!resp.nome.trim()) return false
  if (!resp.responsavelFinanceiro && !resp.responsavelPedagogico) return false

  const cpfDigits = (resp.cpf || '').replace(/\D/g, '')
  let responsavelId: string | null = null

  // Reusa responsável existente por CPF
  if (cpfDigits.length === 11) {
    const { data: existing } = await supabase
      .from('responsaveis')
      .select('id')
      .eq('cpf', resp.cpf)
      .eq('usuario_id', userId)
      .maybeSingle()
    if (existing) responsavelId = existing.id
  }

  // Cria responsável se não existe
  if (!responsavelId) {
    const { data: novo, error: rErr } = await supabase
      .from('responsaveis')
      .insert({
        usuario_id: userId,
        nome:       resp.nome,
        cpf:        resp.cpf      || null,
        telefone:   pegarPrimeiroTelefone(resp),
        email:      (resp.emails || []).find(e => e.trim()) || null,
        endereco:   resp.endereco as any || null,
        status:     'ativo',
      })
      .select('id')
      .single()
    if (rErr) throw rErr
    responsavelId = novo.id
  }

  // Cria vínculo
  const { error: vErr } = await supabase
    .from('aluno_responsaveis')
    .insert({
      aluno_id:               alunoId,
      responsavel_id:         responsavelId,
      parentesco,
      responsavel_financeiro: resp.responsavelFinanceiro,
      responsavel_pedagogico: resp.responsavelPedagogico,
      responsavel_principal:  resp.responsavelFinanceiro,
    })
  if (vErr) throw vErr

  return true
}

async function salvar(rascunho: boolean) {
  if (rascunho) {
    toast.success('Rascunho salvo localmente.')
    return
  }

  // Busca o usuário atual diretamente do Supabase (mais confiável que useSupabaseUser()
  // durante hidratação/SSR — evita falso positivo de "sessão expirada").
  const { data: { user: currentUser }, error: authErr } = await supabase.auth.getUser()
  if (authErr || !currentUser?.id) {
    toast.error('Sessão expirada. Faça login novamente.')
    await navigateTo('/login')
    return
  }

  // Validação mínima dos campos obrigatórios
  const cpfDigits = (form.value.cpf || '').replace(/\D/g, '')
  const obrigatorios = [
    { v: form.value.autorizaImagem,  nome: 'Autoriza uso de imagem' },
    { v: form.value.unidade,         nome: 'Unidade de cadastro' },
    { v: form.value.turma,           nome: 'Turma' },
    { v: form.value.tabela_preco_id, nome: 'Tabela de preço' },
    { v: form.value.forma_pagamento, nome: 'Forma de pagamento' },
    { v: form.value.nome,            nome: 'Nome do aluno' },
    { v: cpfDigits.length === 11 ? '1' : '', nome: 'CPF (válido — 11 dígitos)' },
    { v: form.value.dataNascimento,  nome: 'Data de nascimento' },
    { v: form.value.nacionalidade,   nome: 'Nacionalidade' },
    { v: form.value.falecido,        nome: 'Falecido?' },
    { v: form.value.enderecoResidencial.cep || form.value.enderecoResidencial.exterior, nome: 'CEP do endereço residencial' },
    { v: form.value.enderecoResidencial.logradouro, nome: 'Logradouro do endereço residencial' },
    { v: form.value.enderecoResidencial.numero,     nome: 'Número do endereço residencial' },
    { v: form.value.enderecoResidencial.bairro,     nome: 'Bairro do endereço residencial' },
    { v: form.value.enderecoResidencial.municipio,  nome: 'Município do endereço residencial' },
  ]
  const faltando = obrigatorios.filter(o => !o.v).map(o => o.nome)
  if (faltando.length) {
    toast.error(`Campos obrigatórios faltando: ${faltando.slice(0, 3).join(', ')}${faltando.length > 3 ? '…' : ''}`)
    abaAtiva.value = 'dados'
    return
  }

  salvando.value = true
  try {
    const f = form.value
    const anoAtual = new Date().getFullYear()
    const rm = gerarRmPorCpf(f.cpf, anoAtual) // sempre deterministico via CPF
    const ra = gerarRaPorCpf(f.cpf, 'SP')      // mesmo padrão

    // 1. INSERT em alunos (campos da identificação que existem na coluna do banco)
    const { data: aluno, error: alunoErr } = await supabase
      .from('alunos')
      .insert({
        escola_id:       f.unidade,
        nome:            f.nome,
        data_nascimento: f.dataNascimento || null,
        documento:       f.cpf,
        matricula:       rm,
        ra:              ra,
        turma_id:        f.turma,
        tabela_preco_id: f.tabela_preco_id,
        forma_pagamento: f.forma_pagamento,
        status:          'ativo',
        cep:             f.enderecoResidencial.cep         || null,
        logradouro:      f.enderecoResidencial.logradouro  || null,
        numero:          f.enderecoResidencial.numero      || null,
        complemento:     f.enderecoResidencial.complemento || null,
        bairro:          f.enderecoResidencial.bairro      || null,
        cidade:          f.enderecoResidencial.municipio   || null,
        estado:          f.enderecoResidencial.uf          || null,
        pais:            f.enderecoResidencial.pais        || null,
      })
      .select('id')
      .single()
    if (alunoErr) throw alunoErr
    if (!aluno) throw new Error('Não foi possível obter o ID do aluno criado.')

    // 2. Cria matrícula automaticamente (status inicial em_analise).
    // Insert direto para passar usuario_id explicitamente (evita dependência
    // de useSupabaseUser, que pode demorar a hidratar).
    try {
      const { error: matErr } = await supabase
        .from('matriculas')
        .insert({
          usuario_id:       currentUser.id,
          aluno_id:         aluno.id,
          escola_id:        f.unidade,
          turma_id:         f.turma           || null,
          tabela_preco_id:  f.tabela_preco_id || null,
          forma_pagamento:  f.forma_pagamento || null,
          ano_letivo:       new Date().getFullYear(),
          data_inicio:      new Date().toISOString().slice(0, 10),
          status_matricula: 'em_analise',
          status_contrato:  'nao_enviado',
          numero:           rm || null,
        })
      if (matErr) throw matErr
    } catch (mErr: any) {
      // Aluno foi salvo mas matrícula falhou — avisa sem reverter
      console.error('Erro ao criar matrícula:', mErr)
      toast.warning('Aluno cadastrado, mas a matrícula não pôde ser criada.', {
        description: mErr?.message ?? 'Crie-a manualmente em /matriculas se necessário.',
      })
    }

    // 3. Persiste Mãe/Pai no banco (responsaveis + aluno_responsaveis).
    //    Também mantém o vínculo na store de Responsáveis (em memória) até
    //    a página /responsaveis ser refatorada para carregar do banco.
    let vinculados = 0
    const alunoInfo = { nome: f.nome, escola: f.nome }
    try {
      if (await persistirResponsavel(aluno.id, f.mae, 'mae', currentUser.id)) {
        vincularResponsavelDoAluno(f.mae, 'Mãe', alunoInfo); vinculados++
      }
      if (await persistirResponsavel(aluno.id, f.pai, 'pai', currentUser.id)) {
        vincularResponsavelDoAluno(f.pai, 'Pai', alunoInfo); vinculados++
      }
    } catch (rErr: any) {
      console.error('Erro ao vincular responsáveis:', rErr)
      toast.warning('Aluno salvo, mas houve falha em vincular algum responsável.', {
        description: rErr?.message ?? 'Você pode vincular manualmente em /responsaveis.',
      })
    }

    alunoSalvo.value = true
    const sufixo = vinculados ? ` · ${vinculados} responsável(is) vinculado(s)` : ''
    toast.success(`Aluno cadastrado e matrícula criada!${sufixo}`, {
      description: 'Você será redirecionado para o perfil do aluno.',
    })
    setTimeout(() => navigateTo(`/alunos/${aluno.id}`), 800)
  } catch (e: any) {
    const msg = e?.message ?? 'Erro desconhecido'
    if (msg.includes('alunos_ra_unique') || msg.includes('duplicate key') && msg.includes('ra')) {
      toast.error('Este RA já existe no sistema. Verifique o CPF informado.')
    } else {
      toast.error(`Erro ao salvar aluno: ${msg}`)
    }
  } finally {
    salvando.value = false
  }
}
</script>

<style scoped>
/* Esconde a scrollbar horizontal das abas mas mantém a funcionalidade.
   A roda do mouse já é redirecionada para scroll horizontal via onWheel(). */
.tabs-scroller {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.tabs-scroller::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* Transição das setas de scroll */
.tabs-fade-enter-active,
.tabs-fade-leave-active { transition: opacity .18s ease, transform .18s ease; }
.tabs-fade-enter-from   { opacity: 0; transform: translateX(-4px); }
.tabs-fade-leave-to     { opacity: 0; transform: translateX(-4px); }

/* Pulso sutil para chamar atenção do usuário na primeira vez */
@keyframes pulse-hint {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  50%      { box-shadow: 0 0 0 5px rgba(99, 102, 241, .18); }
}
.animate-pulse-hint { animation: pulse-hint 1.8s ease-in-out 0s 3; }
</style>
