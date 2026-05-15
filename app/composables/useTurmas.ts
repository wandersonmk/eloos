import type { Database, StatusGeral } from '~/types/database.types'

export interface TurmaRecord {
  id: string
  usuario_id: string
  nome: string
  serie: string | null
  turno: string | null
  modalidade: string | null
  ano_letivo: number | null
  capacidade: number
  cor: string | null
  status: StatusGeral
  professor_titular_id: string | null
  atualizado_em: string
  // joins (preenchidos em listar):
  professor_titular_nome?: string | null
  escolas?:               { id: string; nome_escola: string }[]
  escolas_count?:         number
  alunos_count?:          number
}

export interface TurmaInput {
  nome: string
  serie?: string | null
  turno?: string | null
  modalidade?: string | null
  ano_letivo?: number | null
  capacidade?: number
  cor?: string | null
  status?: StatusGeral
  professor_titular_id?: string | null
}

const PALETTE = [
  '#6366f1', '#10b981', '#f59e0b', '#ec4899',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#f43f5e',
]

function corPorIndice(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}

export function useTurmas() {
  const supabase = useSupabaseClient<Database>()
  const user     = useSupabaseUser()

  async function listar(filtros?: { anoLetivo?: number; escolaId?: string }): Promise<TurmaRecord[]> {
    let q = supabase
      .from('turmas')
      .select(`
        id, usuario_id, nome, serie, turno, modalidade, ano_letivo, capacidade, cor, status,
        professor_titular_id, atualizado_em,
        professor:professor_titular_id ( nome )
      `)
      .order('ano_letivo', { ascending: false })
      .order('nome')

    if (filtros?.anoLetivo) q = q.eq('ano_letivo', filtros.anoLetivo)

    const { data, error } = await q
    if (error) throw error
    if (!data) return []

    const ids = data.map(t => t.id)

    // Escolas vinculadas a cada turma (via escola_turmas)
    const escolasByTurma = new Map<string, { id: string; nome_escola: string }[]>()
    if (ids.length) {
      const { data: ets } = await supabase
        .from('escola_turmas')
        .select('turma_id, escolas:escola_id ( id, nome_escola )')
        .in('turma_id', ids)
      for (const row of ets ?? []) {
        const e = row.escolas as unknown as { id: string; nome_escola: string } | null
        if (!e) continue
        const arr = escolasByTurma.get(row.turma_id) ?? []
        arr.push(e)
        escolasByTurma.set(row.turma_id, arr)
      }
    }

    // Contagem de alunos por turma
    const alunosCountByTurma = new Map<string, number>()
    if (ids.length) {
      const { data: cs } = await supabase
        .from('alunos')
        .select('turma_id')
        .in('turma_id', ids)
      for (const row of cs ?? []) {
        if (row.turma_id) alunosCountByTurma.set(row.turma_id, (alunosCountByTurma.get(row.turma_id) ?? 0) + 1)
      }
    }

    let result = data.map(t => {
      const profJoin = (t.professor ?? null) as unknown as { nome: string } | null
      const escolas  = escolasByTurma.get(t.id) ?? []
      return {
        id: t.id, usuario_id: t.usuario_id, nome: t.nome,
        serie: t.serie, turno: t.turno, modalidade: t.modalidade,
        ano_letivo: t.ano_letivo, capacidade: t.capacidade, cor: t.cor,
        status: t.status, professor_titular_id: t.professor_titular_id,
        atualizado_em: t.atualizado_em,
        professor_titular_nome: profJoin?.nome ?? null,
        escolas,
        escolas_count:          escolas.length,
        alunos_count:           alunosCountByTurma.get(t.id) ?? 0,
      }
    })

    if (filtros?.escolaId) {
      result = result.filter(t => t.escolas?.some(e => e.id === filtros.escolaId))
    }

    return result
  }

  async function criar(input: TurmaInput) {
    if (!user.value?.id) throw new Error('Usuário não autenticado.')
    const payload = {
      usuario_id: user.value.id,
      nome: input.nome,
      serie: input.serie ?? null,
      turno: input.turno ?? null,
      modalidade: input.modalidade ?? null,
      ano_letivo: input.ano_letivo ?? null,
      capacidade: input.capacidade ?? 0,
      cor: input.cor ?? corPorIndice(input.nome),
      status: input.status ?? 'ativo',
      professor_titular_id: input.professor_titular_id ?? null,
    }
    const { data, error } = await supabase
      .from('turmas')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  }

  async function atualizar(id: string, patch: Partial<TurmaInput>) {
    const { error } = await supabase.from('turmas').update(patch).eq('id', id)
    if (error) throw error
  }

  async function remover(id: string) {
    const { error } = await supabase.from('turmas').delete().eq('id', id)
    if (error) throw error
  }

  /** Substitui as escolas vinculadas a uma turma (delete-then-insert). */
  async function definirEscolasDaTurma(turmaId: string, escolaIds: string[]) {
    const { error: dErr } = await supabase.from('escola_turmas').delete().eq('turma_id', turmaId)
    if (dErr) throw dErr
    if (escolaIds.length) {
      const rows = escolaIds.map(escola_id => ({ turma_id: turmaId, escola_id }))
      const { error: iErr } = await supabase.from('escola_turmas').insert(rows)
      if (iErr) throw iErr
    }
  }

  /** Substitui as turmas vinculadas a uma escola (usado pelo modal de /unidades). */
  async function definirTurmasDaEscola(escolaId: string, turmaIds: string[]) {
    const { error: dErr } = await supabase.from('escola_turmas').delete().eq('escola_id', escolaId)
    if (dErr) throw dErr
    if (turmaIds.length) {
      const rows = turmaIds.map(turma_id => ({ escola_id: escolaId, turma_id }))
      const { error: iErr } = await supabase.from('escola_turmas').insert(rows)
      if (iErr) throw iErr
    }
  }

  return {
    listar, criar, atualizar, remover,
    definirEscolasDaTurma, definirTurmasDaEscola,
  }
}

export const TURNOS = ['Manhã', 'Tarde', 'Integral', 'Noite'] as const
export const SERIES = [
  'Berçário', 'Educação Infantil', 'Ensino Fundamental I',
  'Ensino Fundamental II', 'Ensino Médio', 'EJA', 'Curso Técnico',
]
export const MODALIDADES = ['Regular', 'Bilíngue', 'Integral', 'EaD', 'Híbrido']
