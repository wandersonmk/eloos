import type { Database, StatusGeral } from '~/types/database.types'

export interface AlunoRecord {
  id: string
  escola_id: string
  nome: string
  data_nascimento: string | null
  documento: string | null
  matricula: string | null
  ra: string | null
  forma_pagamento: string | null
  turma_id: string | null
  tabela_preco_id: string | null
  status: StatusGeral
  criado_em: string
  // joins
  turma_nome: string | null
  escola_nome: string | null
  responsavel_nome: string | null
  // derivados
  idade: number | null
  cor: string
}

const PALETTE = [
  '#6366f1', '#ec4899', '#10b981', '#f59e0b',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#f43f5e',
  '#84cc16', '#06b6d4', '#a855f7', '#0ea5e9',
]

function corPorSeed(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}

function calcIdade(dataNasc: string | null): number | null {
  if (!dataNasc) return null
  const nasc = new Date(dataNasc)
  if (Number.isNaN(nasc.getTime())) return null
  const hoje = new Date()
  let idade = hoje.getFullYear() - nasc.getFullYear()
  const m = hoje.getMonth() - nasc.getMonth()
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--
  return idade
}

export function useAlunos() {
  const supabase = useSupabaseClient<Database>()

  async function listar(filtros?: { escolaId?: string; status?: StatusGeral }): Promise<AlunoRecord[]> {
    let q = supabase
      .from('alunos')
      .select(`
        id, escola_id, nome, data_nascimento, documento, matricula, ra, forma_pagamento,
        turma_id, tabela_preco_id, status, criado_em,
        escola:escola_id ( id, nome_escola ),
        turma:turma_id ( id, nome )
      `)
      .order('nome')

    if (filtros?.escolaId) q = q.eq('escola_id', filtros.escolaId)
    if (filtros?.status)   q = q.eq('status',    filtros.status)

    const { data, error } = await q
    if (error) throw error
    if (!data) return []

    // Responsável principal por aluno (via aluno_responsaveis)
    const ids = data.map(a => a.id)
    const responsavelByAluno = new Map<string, string>()
    if (ids.length) {
      const { data: vinc } = await supabase
        .from('aluno_responsaveis')
        .select('aluno_id, responsavel_principal, responsavel_financeiro, responsaveis:responsavel_id ( nome )')
        .in('aluno_id', ids)
        .order('responsavel_principal', { ascending: false })
        .order('responsavel_financeiro', { ascending: false })
      for (const row of vinc ?? []) {
        if (responsavelByAluno.has(row.aluno_id)) continue
        const resp = row.responsaveis as unknown as { nome: string } | null
        if (resp?.nome) responsavelByAluno.set(row.aluno_id, resp.nome)
      }
    }

    return data.map(a => {
      const escola = (a.escola ?? null) as unknown as { id: string; nome_escola: string } | null
      const turma  = (a.turma  ?? null) as unknown as { id: string; nome: string }        | null
      return {
        id: a.id,
        escola_id: a.escola_id,
        nome: a.nome,
        data_nascimento: a.data_nascimento,
        documento: a.documento,
        matricula: a.matricula,
        ra: a.ra,
        forma_pagamento: a.forma_pagamento,
        turma_id: a.turma_id,
        tabela_preco_id: a.tabela_preco_id,
        status: a.status,
        criado_em: a.criado_em,
        turma_nome:       turma?.nome        ?? null,
        escola_nome:      escola?.nome_escola ?? null,
        responsavel_nome: responsavelByAluno.get(a.id) ?? null,
        idade:            calcIdade(a.data_nascimento),
        cor:              corPorSeed(a.nome),
      }
    })
  }

  // ─── Detalhe ───────────────────────────────────────────────────────────────
  async function obterPorId(id: string): Promise<{
    aluno: AlunoRecord | null
    responsaveis: Array<{
      id: string
      nome: string
      cpf: string | null
      telefone: string | null
      email: string | null
      parentesco: 'pai' | 'mae' | 'avo' | 'ava' | 'tutor' | 'outro'
      responsavel_principal: boolean
      responsavel_financeiro: boolean
      responsavel_pedagogico: boolean
    }>
  }> {
    const { data, error } = await supabase
      .from('alunos')
      .select(`
        id, escola_id, nome, data_nascimento, documento, matricula, ra, forma_pagamento,
        turma_id, tabela_preco_id, status, criado_em,
        escola:escola_id ( id, nome_escola ),
        turma:turma_id ( id, nome )
      `)
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    if (!data) return { aluno: null, responsaveis: [] }

    // Responsáveis vinculados
    const { data: vinc } = await supabase
      .from('aluno_responsaveis')
      .select(`
        parentesco, responsavel_principal, responsavel_financeiro, responsavel_pedagogico,
        responsaveis:responsavel_id ( id, nome, cpf, telefone, email )
      `)
      .eq('aluno_id', id)
      .order('responsavel_principal', { ascending: false })

    const responsaveis = (vinc ?? []).flatMap(row => {
      const r = row.responsaveis as unknown as { id: string; nome: string; cpf: string | null; telefone: string | null; email: string | null } | null
      if (!r) return []
      return [{
        id: r.id,
        nome: r.nome,
        cpf: r.cpf,
        telefone: r.telefone,
        email: r.email,
        parentesco: row.parentesco,
        responsavel_principal: row.responsavel_principal,
        responsavel_financeiro: row.responsavel_financeiro,
        responsavel_pedagogico: row.responsavel_pedagogico,
      }]
    })

    const escola = (data.escola ?? null) as unknown as { id: string; nome_escola: string } | null
    const turma  = (data.turma  ?? null) as unknown as { id: string; nome: string }        | null
    const aluno: AlunoRecord = {
      id: data.id,
      escola_id: data.escola_id,
      nome: data.nome,
      data_nascimento: data.data_nascimento,
      documento: data.documento,
      matricula: data.matricula,
      ra: data.ra,
      forma_pagamento: data.forma_pagamento,
      turma_id: data.turma_id,
      tabela_preco_id: data.tabela_preco_id,
      status: data.status,
      criado_em: data.criado_em,
      turma_nome:       turma?.nome        ?? null,
      escola_nome:      escola?.nome_escola ?? null,
      responsavel_nome: responsaveis[0]?.nome ?? null,
      idade:            calcIdade(data.data_nascimento),
      cor:              corPorSeed(data.nome),
    }

    return { aluno, responsaveis }
  }

  return { listar, obterPorId }
}
