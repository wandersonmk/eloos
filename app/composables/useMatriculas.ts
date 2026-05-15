import type {
  Database,
  Matricula,
  StatusMatricula,
  StatusContrato,
} from '~/types/database.types'

export interface MatriculaInput {
  aluno_id: string
  escola_id: string
  turma_id?: string | null
  tabela_preco_id?: string | null
  ano_letivo?: number
  data_inicio?: string | null
  status_matricula?: StatusMatricula
  status_contrato?: StatusContrato
  forma_pagamento?: string | null
  observacoes?: string | null
  numero?: string | null
}

export interface MatriculaRecord extends Matricula {
  aluno_nome?: string | null
  aluno_matricula?: string | null
  turma_nome?: string | null
  tabela_preco_nome?: string | null
  tabela_preco_mensalidade?: number | null
  responsavel_nome?: string | null
  escola_nome?: string | null
  cor?: string
}

const PALETTE = [
  '#6366f1', '#ec4899', '#10b981', '#f59e0b',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#f43f5e',
  '#84cc16', '#06b6d4',
]

function corPorSeed(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}

export function useMatriculas() {
  const supabase = useSupabaseClient<Database>()
  const user     = useSupabaseUser()

  async function listar(filtros?: {
    anoLetivo?: number
    escolaId?: string
    alunoId?: string
    status?: StatusMatricula
  }): Promise<MatriculaRecord[]> {
    let q = supabase
      .from('matriculas')
      .select(`
        *,
        aluno:aluno_id ( id, nome, matricula ),
        turma:turma_id ( id, nome ),
        tabela:tabela_preco_id ( id, nome, mensalidade ),
        escola:escola_id ( id, nome_escola )
      `)
      .order('ano_letivo', { ascending: false })
      .order('criado_em',  { ascending: false })

    if (filtros?.anoLetivo) q = q.eq('ano_letivo', filtros.anoLetivo)
    if (filtros?.escolaId)  q = q.eq('escola_id',  filtros.escolaId)
    if (filtros?.alunoId)   q = q.eq('aluno_id',   filtros.alunoId)
    if (filtros?.status)    q = q.eq('status_matricula', filtros.status)

    const { data, error } = await q
    if (error) throw error
    if (!data) return []

    // Responsavel financeiro principal de cada aluno (via aluno_responsaveis)
    const alunoIds = Array.from(new Set(data.map(m => m.aluno_id)))
    const responsavelByAluno = new Map<string, string>()
    if (alunoIds.length) {
      const { data: vinc } = await supabase
        .from('aluno_responsaveis')
        .select('aluno_id, responsavel_financeiro, responsavel_principal, responsaveis:responsavel_id ( nome )')
        .in('aluno_id', alunoIds)
        .order('responsavel_principal', { ascending: false })
        .order('responsavel_financeiro', { ascending: false })
      for (const row of vinc ?? []) {
        if (responsavelByAluno.has(row.aluno_id)) continue
        const resp = row.responsaveis as unknown as { nome: string } | null
        if (resp?.nome) responsavelByAluno.set(row.aluno_id, resp.nome)
      }
    }

    return data.map(m => {
      const aluno  = (m.aluno  ?? null) as unknown as { id: string; nome: string; matricula: string | null } | null
      const turma  = (m.turma  ?? null) as unknown as { id: string; nome: string } | null
      const tabela = (m.tabela ?? null) as unknown as { id: string; nome: string; mensalidade: number } | null
      const escola = (m.escola ?? null) as unknown as { id: string; nome_escola: string } | null
      return {
        ...m,
        aluno_nome:               aluno?.nome ?? null,
        aluno_matricula:          aluno?.matricula ?? m.numero ?? null,
        turma_nome:               turma?.nome ?? null,
        tabela_preco_nome:        tabela?.nome ?? null,
        tabela_preco_mensalidade: tabela?.mensalidade ?? null,
        responsavel_nome:         responsavelByAluno.get(m.aluno_id) ?? null,
        escola_nome:              escola?.nome_escola ?? null,
        cor: corPorSeed(aluno?.nome ?? m.aluno_id),
      }
    })
  }

  /** Retorna a matricula mais recente do aluno (ou null). */
  async function obterPorAluno(alunoId: string): Promise<MatriculaRecord | null> {
    const lista = await listar({ alunoId })
    return lista[0] ?? null
  }

  async function criar(input: MatriculaInput): Promise<Matricula> {
    if (!user.value?.id) throw new Error('Usuário não autenticado.')
    const payload = {
      usuario_id: user.value.id,
      aluno_id: input.aluno_id,
      escola_id: input.escola_id,
      turma_id: input.turma_id ?? null,
      tabela_preco_id: input.tabela_preco_id ?? null,
      ano_letivo: input.ano_letivo ?? new Date().getFullYear(),
      data_inicio: input.data_inicio ?? null,
      status_matricula: input.status_matricula ?? 'em_analise',
      status_contrato:  input.status_contrato  ?? 'nao_enviado',
      forma_pagamento: input.forma_pagamento ?? null,
      observacoes: input.observacoes ?? null,
      numero: input.numero ?? null,
    }
    const { data, error } = await supabase
      .from('matriculas')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  }

  async function atualizar(id: string, patch: Partial<MatriculaInput>) {
    const { error } = await supabase.from('matriculas').update(patch).eq('id', id)
    if (error) throw error
  }

  /** Confirma a matricula e propaga turma_id + tabela_preco_id para o aluno. */
  async function confirmar(id: string) {
    const { data: m, error: e1 } = await supabase
      .from('matriculas')
      .select('aluno_id, turma_id, tabela_preco_id')
      .eq('id', id)
      .single()
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('matriculas')
      .update({
        status_matricula: 'confirmada',
        status_contrato:  'assinado',
      })
      .eq('id', id)
    if (e2) throw e2

    if (m?.aluno_id) {
      const { error: e3 } = await supabase
        .from('alunos')
        .update({
          turma_id:        m.turma_id        ?? null,
          tabela_preco_id: m.tabela_preco_id ?? null,
        })
        .eq('id', m.aluno_id)
      if (e3) throw e3
    }
  }

  async function cancelar(id: string) {
    const { error } = await supabase
      .from('matriculas')
      .update({ status_matricula: 'cancelada' })
      .eq('id', id)
    if (error) throw error
  }

  async function remover(id: string) {
    const { error } = await supabase.from('matriculas').delete().eq('id', id)
    if (error) throw error
  }

  return { listar, obterPorAluno, criar, atualizar, confirmar, cancelar, remover }
}

// ─── Labels para a UI ────────────────────────────────────────────────────────

export const STATUS_MATRICULA_LABEL: Record<StatusMatricula, string> = {
  em_analise:     'em análise',
  docs_pendentes: 'docs pendentes',
  confirmada:     'confirmada',
  cancelada:      'cancelada',
}

export const STATUS_CONTRATO_LABEL: Record<StatusContrato, string> = {
  nao_enviado: 'Não enviado',
  enviado:     'Aguardando assinatura',
  assinado:    'Assinado',
}
