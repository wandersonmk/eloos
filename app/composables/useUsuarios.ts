import type { Database, TipoUsuario, StatusGeral } from '~/types/database.types'

export interface EscolaResumo {
  id: string
  nome_escola: string
}

export interface TurmaResumo {
  id: string
  nome: string
  turno: string | null
  ano_letivo: number | null
  escola_id: string
}

export interface UsuarioRecord {
  id: string
  nome: string
  email: string
  telefone: string | null
  whatsapp: string | null
  cpf: string | null
  cargo: string | null
  disciplinas: string[]
  tipo_usuario: TipoUsuario
  status: StatusGeral
  cor: string | null
  atualizado_em: string
  escolas: EscolaResumo[]
  turmas: TurmaResumo[]
}

export interface UsuarioPatch {
  nome?: string
  email?: string
  telefone?: string | null
  whatsapp?: string | null
  cpf?: string | null
  cargo?: string | null
  disciplinas?: string[]
  tipo_usuario?: TipoUsuario
  status?: StatusGeral
  cor?: string | null
}

export function useUsuarios() {
  const supabase = useSupabaseClient<Database>()

  async function listar(): Promise<UsuarioRecord[]> {
    const [{ data: profiles, error: pErr }, { data: ue, error: ueErr }, { data: pt, error: ptErr }] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, nome, email, telefone, whatsapp, cpf, cargo, disciplinas, tipo_usuario, status, cor, atualizado_em')
        .order('nome'),
      supabase
        .from('usuario_escolas')
        .select('usuario_id, escolas(id, nome_escola)'),
      supabase
        .from('professor_turmas')
        .select('professor_id, turmas(id, nome, turno, ano_letivo, escola_id)'),
    ])

    if (pErr)  throw pErr
    if (ueErr) throw ueErr
    if (ptErr) throw ptErr
    if (!profiles) return []

    const escolasByUser = new Map<string, EscolaResumo[]>()
    for (const row of ue ?? []) {
      const e = row.escolas as unknown as EscolaResumo | null
      if (!e) continue
      const arr = escolasByUser.get(row.usuario_id) ?? []
      arr.push(e)
      escolasByUser.set(row.usuario_id, arr)
    }

    const turmasByUser = new Map<string, TurmaResumo[]>()
    for (const row of pt ?? []) {
      const t = row.turmas as unknown as TurmaResumo | null
      if (!t) continue
      const arr = turmasByUser.get(row.professor_id) ?? []
      arr.push(t)
      turmasByUser.set(row.professor_id, arr)
    }

    return profiles.map(p => ({
      ...p,
      escolas: escolasByUser.get(p.id) ?? [],
      turmas:  turmasByUser.get(p.id)  ?? [],
    }))
  }

  async function atualizar(
    id: string,
    patch: UsuarioPatch,
    escolaIds: string[],
    turmaIds: string[],
  ) {
    const profilePatch: UsuarioPatch = { ...patch }
    if (profilePatch.tipo_usuario !== 'professor') {
      profilePatch.disciplinas = []
    }
    const { error: pErr } = await supabase.from('profiles').update(profilePatch).eq('id', id)
    if (pErr) throw pErr

    const { error: dErr } = await supabase.from('usuario_escolas').delete().eq('usuario_id', id)
    if (dErr) throw dErr
    if (escolaIds.length) {
      const rows = escolaIds.map(escola_id => ({ usuario_id: id, escola_id }))
      const { error: iErr } = await supabase.from('usuario_escolas').insert(rows)
      if (iErr) throw iErr
    }

    const { error: dtErr } = await supabase.from('professor_turmas').delete().eq('professor_id', id)
    if (dtErr) throw dtErr
    if (turmaIds.length && profilePatch.tipo_usuario === 'professor') {
      const rows = turmaIds.map(turma_id => ({ professor_id: id, turma_id }))
      const { error: itErr } = await supabase.from('professor_turmas').insert(rows)
      if (itErr) throw itErr
    }
  }

  async function listarEscolas(): Promise<EscolaResumo[]> {
    const { data, error } = await supabase
      .from('escolas')
      .select('id, nome_escola')
      .order('nome_escola')
    if (error) throw error
    return (data ?? []) as EscolaResumo[]
  }

  async function listarTurmas(): Promise<TurmaResumo[]> {
    const { data, error } = await supabase
      .from('turmas')
      .select('id, nome, turno, ano_letivo, escola_id')
      .eq('status', 'ativo')
      .order('nome')
    if (error) throw error
    return (data ?? []) as TurmaResumo[]
  }

  return { listar, atualizar, listarEscolas, listarTurmas }
}

export const TIPOS_USUARIO: { value: TipoUsuario; label: string }[] = [
  { value: 'admin_escola', label: 'Administrador' },
  { value: 'coordenador',  label: 'Coordenador'   },
  { value: 'professor',    label: 'Professor'     },
  { value: 'secretaria',   label: 'Secretaria'    },
]

export const DISCIPLINAS_OPTS = [
  'Matemática', 'Português', 'Literatura', 'Inglês', 'Espanhol',
  'História', 'Geografia', 'Filosofia', 'Sociologia',
  'Física', 'Química', 'Biologia', 'Ciências',
  'Artes', 'Música', 'Educação Física', 'Informática', 'Religião',
]

export function tipoUsuarioLabel(t: TipoUsuario): string {
  return TIPOS_USUARIO.find(x => x.value === t)?.label ?? t
}

export function tipoUsuarioStyle(t: TipoUsuario): string {
  return {
    super_admin:  'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    admin_escola: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    coordenador:  'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    professor:    'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    secretaria:   'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  }[t] ?? 'bg-slate-100 text-slate-600'
}
