import type { Database, StatusGeral } from '~/types/database.types'

export interface EscolaRecord {
  id: string
  usuario_id: string
  nome_escola: string
  cnpj: string | null
  email: string | null
  telefone: string | null
  cep: string | null
  logradouro: string | null
  numero: string | null
  bairro: string | null
  cidade: string | null
  estado: string | null
  status: StatusGeral
  atualizado_em: string
  alunos_count?: number
  turmaIds?:     string[]
}

export interface EscolaInput {
  nome_escola: string
  cnpj?: string | null
  email?: string | null
  telefone?: string | null
  cep?: string | null
  logradouro?: string | null
  numero?: string | null
  bairro?: string | null
  cidade?: string | null
  estado?: string | null
  status?: StatusGeral
}

export function useEscolas() {
  const supabase = useSupabaseClient<Database>()
  const user     = useSupabaseUser()

  async function listar(): Promise<EscolaRecord[]> {
    const { data, error } = await supabase
      .from('escolas')
      .select(`
        id, usuario_id, nome_escola, cnpj, email, telefone,
        cep, logradouro, numero, bairro, cidade, estado, status, atualizado_em
      `)
      .order('nome_escola')
    if (error) throw error
    if (!data) return []

    const ids = data.map(e => e.id)

    // alunos count
    const alunosByEscola = new Map<string, number>()
    if (ids.length) {
      const { data: alunos } = await supabase
        .from('alunos')
        .select('escola_id')
        .in('escola_id', ids)
      for (const row of alunos ?? []) {
        alunosByEscola.set(row.escola_id, (alunosByEscola.get(row.escola_id) ?? 0) + 1)
      }
    }

    // turmaIds via escola_turmas
    const turmasByEscola = new Map<string, string[]>()
    if (ids.length) {
      const { data: ets } = await supabase
        .from('escola_turmas')
        .select('escola_id, turma_id')
        .in('escola_id', ids)
      for (const row of ets ?? []) {
        const arr = turmasByEscola.get(row.escola_id) ?? []
        arr.push(row.turma_id)
        turmasByEscola.set(row.escola_id, arr)
      }
    }

    return data.map(e => ({
      ...e,
      alunos_count: alunosByEscola.get(e.id) ?? 0,
      turmaIds:     turmasByEscola.get(e.id) ?? [],
    }))
  }

  async function criar(input: EscolaInput): Promise<EscolaRecord> {
    if (!user.value?.id) throw new Error('Usuário não autenticado.')
    const payload = {
      usuario_id:  user.value.id,
      nome_escola: input.nome_escola,
      cnpj:        input.cnpj       ?? null,
      email:       input.email      ?? null,
      telefone:    input.telefone   ?? null,
      cep:         input.cep        ?? null,
      logradouro:  input.logradouro ?? null,
      numero:      input.numero     ?? null,
      bairro:      input.bairro     ?? null,
      cidade:      input.cidade     ?? null,
      estado:      input.estado     ?? null,
      status:      input.status     ?? 'ativo',
    }
    const { data, error } = await supabase
      .from('escolas')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data as EscolaRecord
  }

  async function atualizar(id: string, patch: Partial<EscolaInput>) {
    const { error } = await supabase.from('escolas').update(patch).eq('id', id)
    if (error) throw error
  }

  async function remover(id: string) {
    const { error } = await supabase.from('escolas').delete().eq('id', id)
    if (error) throw error
  }

  return { listar, criar, atualizar, remover }
}

// Gera sigla a partir do nome (sem persistência).
export function siglaDe(nome: string): string {
  const p = nome.split(/\s+/).filter(Boolean)
  if (!p.length) return '??'
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase()
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
}

// Cor estável a partir de uma seed (id da escola).
export function corDe(seed: string): string {
  const PALETTE = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6', '#14b8a6', '#f43f5e']
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]!
}
