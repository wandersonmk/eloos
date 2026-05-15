import type { Database, StatusGeral, TabelaPreco } from '~/types/database.types'

export interface TabelaPrecoInput {
  nome: string
  descricao?: string | null
  mensalidade: number
  matricula: number
  material: number
  ano_letivo?: number
  status?: StatusGeral
}

export interface TabelaPrecoRecord extends TabelaPreco {
  alunos_count?: number
}

export function useTabelasPreco() {
  const supabase = useSupabaseClient<Database>()
  const user     = useSupabaseUser()

  async function listar(filtros?: { anoLetivo?: number }): Promise<TabelaPrecoRecord[]> {
    let q = supabase
      .from('tabelas_preco')
      .select('*')
      .order('nome')

    if (filtros?.anoLetivo) q = q.eq('ano_letivo', filtros.anoLetivo)

    const { data, error } = await q
    if (error) throw error
    if (!data) return []

    // Conta alunos por tabela
    const ids = data.map(t => t.id)
    const counts = new Map<string, number>()
    if (ids.length) {
      const { data: alunos } = await supabase
        .from('alunos')
        .select('tabela_preco_id')
        .in('tabela_preco_id', ids)
      for (const row of alunos ?? []) {
        if (row.tabela_preco_id) counts.set(row.tabela_preco_id, (counts.get(row.tabela_preco_id) ?? 0) + 1)
      }
    }

    return data.map(t => ({ ...t, alunos_count: counts.get(t.id) ?? 0 }))
  }

  async function criar(input: TabelaPrecoInput) {
    if (!user.value?.id) throw new Error('Usuário não autenticado.')
    const payload = {
      usuario_id: user.value.id,
      nome: input.nome,
      descricao: input.descricao ?? null,
      mensalidade: input.mensalidade,
      matricula: input.matricula,
      material: input.material,
      ano_letivo: input.ano_letivo ?? new Date().getFullYear(),
      status: input.status ?? 'ativo',
    }
    const { data, error } = await supabase
      .from('tabelas_preco')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  }

  async function atualizar(id: string, patch: Partial<TabelaPrecoInput>) {
    const { error } = await supabase.from('tabelas_preco').update(patch).eq('id', id)
    if (error) throw error
  }

  async function remover(id: string) {
    const { error } = await supabase.from('tabelas_preco').delete().eq('id', id)
    if (error) throw error
  }

  return { listar, criar, atualizar, remover }
}
