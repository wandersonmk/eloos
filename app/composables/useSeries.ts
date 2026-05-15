import type { Database } from '~/types/database.types'

export interface SerieRecord {
  id: string
  usuario_id: string
  nome: string
  ordem: number
  criado_em: string
  atualizado_em: string
}

export function useSeries() {
  const supabase = useSupabaseClient<Database>()
  const user     = useSupabaseUser()

  async function listar(): Promise<SerieRecord[]> {
    const { data, error } = await supabase
      .from('series')
      .select('*')
      .order('ordem')
      .order('nome')
    if (error) throw error
    return data ?? []
  }

  async function criar(nome: string, ordem?: number): Promise<SerieRecord> {
    if (!user.value?.id) throw new Error('Usuário não autenticado.')
    const payload = {
      usuario_id: user.value.id,
      nome: nome.trim(),
      ordem: ordem ?? 0,
    }
    const { data, error } = await supabase
      .from('series')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data as SerieRecord
  }

  async function atualizar(id: string, patch: Partial<{ nome: string; ordem: number }>) {
    const { error } = await supabase.from('series').update(patch).eq('id', id)
    if (error) throw error
  }

  async function remover(id: string) {
    const { error } = await supabase.from('series').delete().eq('id', id)
    if (error) throw error
  }

  return { listar, criar, atualizar, remover }
}
