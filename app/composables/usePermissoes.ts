import type { Database, Permissao, TipoUsuario } from '~/types/database.types'

export type Nivel = 'full' | 'read' | 'none'

export const MODULOS: { key: string; label: string }[] = [
  { key: 'gestao_unidades',       label: 'Gestão de unidades'   },
  { key: 'gestao_usuarios',       label: 'Gestão de usuários'   },
  { key: 'turmas',                label: 'Turmas'               },
  { key: 'cadastro_alunos',       label: 'Cadastro de alunos'   },
  { key: 'cadastro_responsaveis', label: 'Cadastro de responsáveis' },
  { key: 'matriculas',            label: 'Matrículas'           },
  { key: 'diario_classe',         label: 'Diário de classe'     },
  { key: 'lancamento_notas',      label: 'Lançamento de notas'  },
  { key: 'financeiro_receber',    label: 'Financeiro — receber' },
  { key: 'financeiro_pagar',      label: 'Financeiro — pagar'   },
  { key: 'relatorios',            label: 'Relatórios'           },
  { key: 'configuracoes',         label: 'Configurações'        },
]

export const PERFIS_EDITAVEIS: { value: TipoUsuario; label: string }[] = [
  { value: 'admin_escola', label: 'Administrador' },
  { value: 'coordenador',  label: 'Coordenador'   },
  { value: 'professor',    label: 'Professor'     },
  { value: 'secretaria',   label: 'Secretaria'    },
]

export function usePermissoes() {
  const supabase = useSupabaseClient<Database>()

  async function listar(): Promise<Permissao[]> {
    const { data, error } = await supabase.from('permissoes').select('*').order('tipo_usuario').order('modulo')
    if (error) throw error
    return data ?? []
  }

  async function atualizarNivel(id: string, nivel: Nivel) {
    const { error } = await supabase.from('permissoes').update({ nivel }).eq('id', id)
    if (error) throw error
  }

  return { listar, atualizarNivel }
}

export function proximoNivel(atual: Nivel): Nivel {
  return atual === 'full' ? 'read' : atual === 'read' ? 'none' : 'full'
}
