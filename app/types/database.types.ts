export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      aluno_responsaveis: {
        Row: {
          aluno_id: string
          autorizado_buscar: boolean
          contato_emergencia: boolean
          criado_em: string
          id: string
          parentesco: Database["public"]["Enums"]["parentesco_enum"]
          responsavel_financeiro: boolean
          responsavel_id: string
          responsavel_pedagogico: boolean
          responsavel_principal: boolean
        }
        Insert: {
          aluno_id: string
          autorizado_buscar?: boolean
          contato_emergencia?: boolean
          criado_em?: string
          id?: string
          parentesco?: Database["public"]["Enums"]["parentesco_enum"]
          responsavel_financeiro?: boolean
          responsavel_id: string
          responsavel_pedagogico?: boolean
          responsavel_principal?: boolean
        }
        Update: {
          aluno_id?: string
          autorizado_buscar?: boolean
          contato_emergencia?: boolean
          criado_em?: string
          id?: string
          parentesco?: Database["public"]["Enums"]["parentesco_enum"]
          responsavel_financeiro?: boolean
          responsavel_id?: string
          responsavel_pedagogico?: boolean
          responsavel_principal?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "aluno_responsaveis_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aluno_responsaveis_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "responsaveis"
            referencedColumns: ["id"]
          },
        ]
      }
      alunos: {
        Row: {
          atualizado_em: string
          bairro: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          criado_em: string
          data_nascimento: string | null
          documento: string | null
          escola_id: string
          estado: string | null
          forma_pagamento: string | null
          id: string
          logradouro: string | null
          matricula: string | null
          nome: string
          numero: string | null
          pais: string | null
          ra: string | null
          status: Database["public"]["Enums"]["status_geral_enum"]
          tabela_preco_id: string | null
          turma_id: string | null
        }
        Insert: {
          atualizado_em?: string
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          criado_em?: string
          data_nascimento?: string | null
          documento?: string | null
          escola_id: string
          estado?: string | null
          forma_pagamento?: string | null
          id?: string
          logradouro?: string | null
          matricula?: string | null
          nome: string
          numero?: string | null
          pais?: string | null
          ra?: string | null
          status?: Database["public"]["Enums"]["status_geral_enum"]
          tabela_preco_id?: string | null
          turma_id?: string | null
        }
        Update: {
          atualizado_em?: string
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          criado_em?: string
          data_nascimento?: string | null
          documento?: string | null
          escola_id?: string
          estado?: string | null
          forma_pagamento?: string | null
          id?: string
          logradouro?: string | null
          matricula?: string | null
          nome?: string
          numero?: string | null
          pais?: string | null
          ra?: string | null
          status?: Database["public"]["Enums"]["status_geral_enum"]
          tabela_preco_id?: string | null
          turma_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alunos_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alunos_tabela_preco_id_fkey"
            columns: ["tabela_preco_id"]
            isOneToOne: false
            referencedRelation: "tabelas_preco"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alunos_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      atividades: {
        Row: {
          atualizado_em: string
          criado_em: string
          data_atividade: string | null
          descricao: string | null
          escola_id: string
          id: string
          professor_id: string | null
          status: string
          titulo: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          data_atividade?: string | null
          descricao?: string | null
          escola_id: string
          id?: string
          professor_id?: string | null
          status?: string
          titulo: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          data_atividade?: string | null
          descricao?: string | null
          escola_id?: string
          id?: string
          professor_id?: string | null
          status?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "atividades_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      cobrancas: {
        Row: {
          aluno_id: string
          atualizado_em: string
          codigo_fatura: string | null
          criado_em: string
          data_vencimento: string
          descricao: string
          escola_id: string
          forma_pagamento: string | null
          id: string
          observacoes: string | null
          status: Database["public"]["Enums"]["status_cobranca_enum"]
          valor: number
        }
        Insert: {
          aluno_id: string
          atualizado_em?: string
          codigo_fatura?: string | null
          criado_em?: string
          data_vencimento: string
          descricao: string
          escola_id: string
          forma_pagamento?: string | null
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_cobranca_enum"]
          valor: number
        }
        Update: {
          aluno_id?: string
          atualizado_em?: string
          codigo_fatura?: string | null
          criado_em?: string
          data_vencimento?: string
          descricao?: string
          escola_id?: string
          forma_pagamento?: string | null
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_cobranca_enum"]
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "cobrancas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cobrancas_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
        ]
      }
      escola_turmas: {
        Row: {
          criado_em: string
          escola_id: string
          id: string
          turma_id: string
        }
        Insert: {
          criado_em?: string
          escola_id: string
          id?: string
          turma_id: string
        }
        Update: {
          criado_em?: string
          escola_id?: string
          id?: string
          turma_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "escola_turmas_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escola_turmas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      escolas: {
        Row: {
          atualizado_em: string
          bairro: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          criado_em: string
          email: string | null
          estado: string | null
          id: string
          logradouro: string | null
          nome_escola: string
          numero: string | null
          status: Database["public"]["Enums"]["status_geral_enum"]
          telefone: string | null
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          criado_em?: string
          email?: string | null
          estado?: string | null
          id?: string
          logradouro?: string | null
          nome_escola: string
          numero?: string | null
          status?: Database["public"]["Enums"]["status_geral_enum"]
          telefone?: string | null
          usuario_id: string
        }
        Update: {
          atualizado_em?: string
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          criado_em?: string
          email?: string | null
          estado?: string | null
          id?: string
          logradouro?: string | null
          nome_escola?: string
          numero?: string | null
          status?: Database["public"]["Enums"]["status_geral_enum"]
          telefone?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "escolas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matriculas: {
        Row: {
          aluno_id: string
          ano_letivo: number
          atualizado_em: string
          criado_em: string
          data_inicio: string | null
          escola_id: string
          forma_pagamento: string | null
          id: string
          numero: string | null
          observacoes: string | null
          status_contrato: Database["public"]["Enums"]["status_contrato_enum"]
          status_matricula: Database["public"]["Enums"]["status_matricula_enum"]
          tabela_preco_id: string | null
          turma_id: string | null
          usuario_id: string
        }
        Insert: {
          aluno_id: string
          ano_letivo?: number
          atualizado_em?: string
          criado_em?: string
          data_inicio?: string | null
          escola_id: string
          forma_pagamento?: string | null
          id?: string
          numero?: string | null
          observacoes?: string | null
          status_contrato?: Database["public"]["Enums"]["status_contrato_enum"]
          status_matricula?: Database["public"]["Enums"]["status_matricula_enum"]
          tabela_preco_id?: string | null
          turma_id?: string | null
          usuario_id: string
        }
        Update: {
          aluno_id?: string
          ano_letivo?: number
          atualizado_em?: string
          criado_em?: string
          data_inicio?: string | null
          escola_id?: string
          forma_pagamento?: string | null
          id?: string
          numero?: string | null
          observacoes?: string | null
          status_contrato?: Database["public"]["Enums"]["status_contrato_enum"]
          status_matricula?: Database["public"]["Enums"]["status_matricula_enum"]
          tabela_preco_id?: string | null
          turma_id?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matriculas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_tabela_preco_id_fkey"
            columns: ["tabela_preco_id"]
            isOneToOne: false
            referencedRelation: "tabelas_preco"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matriculas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      permissoes: {
        Row: {
          atualizado_em: string
          criado_em: string
          id: string
          modulo: string
          nivel: string
          tipo_usuario: Database["public"]["Enums"]["tipo_usuario_enum"]
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          modulo: string
          nivel: string
          tipo_usuario: Database["public"]["Enums"]["tipo_usuario_enum"]
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          modulo?: string
          nivel?: string
          tipo_usuario?: Database["public"]["Enums"]["tipo_usuario_enum"]
        }
        Relationships: []
      }
      professor_turmas: {
        Row: {
          criado_em: string
          id: string
          professor_id: string
          turma_id: string
        }
        Insert: {
          criado_em?: string
          id?: string
          professor_id: string
          turma_id: string
        }
        Update: {
          criado_em?: string
          id?: string
          professor_id?: string
          turma_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "professor_turmas_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professor_turmas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          atualizado_em: string
          cargo: string | null
          cor: string | null
          cpf: string | null
          criado_em: string
          disciplinas: string[]
          email: string
          id: string
          nome: string
          pode_criar_multiplas_escolas: boolean
          status: Database["public"]["Enums"]["status_geral_enum"]
          telefone: string | null
          tipo_usuario: Database["public"]["Enums"]["tipo_usuario_enum"]
          whatsapp: string | null
        }
        Insert: {
          atualizado_em?: string
          cargo?: string | null
          cor?: string | null
          cpf?: string | null
          criado_em?: string
          disciplinas?: string[]
          email: string
          id: string
          nome: string
          pode_criar_multiplas_escolas?: boolean
          status?: Database["public"]["Enums"]["status_geral_enum"]
          telefone?: string | null
          tipo_usuario?: Database["public"]["Enums"]["tipo_usuario_enum"]
          whatsapp?: string | null
        }
        Update: {
          atualizado_em?: string
          cargo?: string | null
          cor?: string | null
          cpf?: string | null
          criado_em?: string
          disciplinas?: string[]
          email?: string
          id?: string
          nome?: string
          pode_criar_multiplas_escolas?: boolean
          status?: Database["public"]["Enums"]["status_geral_enum"]
          telefone?: string | null
          tipo_usuario?: Database["public"]["Enums"]["tipo_usuario_enum"]
          whatsapp?: string | null
        }
        Relationships: []
      }
      responsaveis: {
        Row: {
          atualizado_em: string
          cpf: string | null
          criado_em: string
          email: string | null
          endereco: Json | null
          id: string
          nome: string
          status: Database["public"]["Enums"]["status_geral_enum"]
          telefone: string | null
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string
          cpf?: string | null
          criado_em?: string
          email?: string | null
          endereco?: Json | null
          id?: string
          nome: string
          status?: Database["public"]["Enums"]["status_geral_enum"]
          telefone?: string | null
          usuario_id: string
        }
        Update: {
          atualizado_em?: string
          cpf?: string | null
          criado_em?: string
          email?: string | null
          endereco?: Json | null
          id?: string
          nome?: string
          status?: Database["public"]["Enums"]["status_geral_enum"]
          telefone?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "responsaveis_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      series: {
        Row: {
          atualizado_em: string
          criado_em: string
          id: string
          nome: string
          ordem: number
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          nome: string
          ordem?: number
          usuario_id: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          nome?: string
          ordem?: number
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "series_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tabelas_preco: {
        Row: {
          ano_letivo: number
          atualizado_em: string
          criado_em: string
          descricao: string | null
          id: string
          material: number
          matricula: number
          mensalidade: number
          nome: string
          status: Database["public"]["Enums"]["status_geral_enum"]
          usuario_id: string
        }
        Insert: {
          ano_letivo?: number
          atualizado_em?: string
          criado_em?: string
          descricao?: string | null
          id?: string
          material?: number
          matricula?: number
          mensalidade?: number
          nome: string
          status?: Database["public"]["Enums"]["status_geral_enum"]
          usuario_id: string
        }
        Update: {
          ano_letivo?: number
          atualizado_em?: string
          criado_em?: string
          descricao?: string | null
          id?: string
          material?: number
          matricula?: number
          mensalidade?: number
          nome?: string
          status?: Database["public"]["Enums"]["status_geral_enum"]
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tabelas_preco_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      turmas: {
        Row: {
          ano_letivo: number | null
          atualizado_em: string
          capacidade: number
          cor: string | null
          criado_em: string
          id: string
          modalidade: string | null
          nome: string
          professor_titular_id: string | null
          serie: string | null
          status: Database["public"]["Enums"]["status_geral_enum"]
          turno: string | null
          usuario_id: string
        }
        Insert: {
          ano_letivo?: number | null
          atualizado_em?: string
          capacidade?: number
          cor?: string | null
          criado_em?: string
          id?: string
          modalidade?: string | null
          nome: string
          professor_titular_id?: string | null
          serie?: string | null
          status?: Database["public"]["Enums"]["status_geral_enum"]
          turno?: string | null
          usuario_id: string
        }
        Update: {
          ano_letivo?: number | null
          atualizado_em?: string
          capacidade?: number
          cor?: string | null
          criado_em?: string
          id?: string
          modalidade?: string | null
          nome?: string
          professor_titular_id?: string | null
          serie?: string | null
          status?: Database["public"]["Enums"]["status_geral_enum"]
          turno?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "turmas_professor_titular_id_fkey"
            columns: ["professor_titular_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turmas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario_escolas: {
        Row: {
          criado_em: string
          escola_id: string
          id: string
          usuario_id: string
        }
        Insert: {
          criado_em?: string
          escola_id: string
          id?: string
          usuario_id: string
        }
        Update: {
          criado_em?: string
          escola_id?: string
          id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_escolas_escola_id_fkey"
            columns: ["escola_id"]
            isOneToOne: false
            referencedRelation: "escolas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuario_escolas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      parentesco_enum: "pai" | "mae" | "avo" | "ava" | "tutor" | "outro"
      status_cobranca_enum: "pendente" | "pago" | "vencido" | "cancelado"
      status_contrato_enum: "nao_enviado" | "enviado" | "assinado"
      status_geral_enum: "ativo" | "inativo" | "suspenso"
      status_matricula_enum:
        | "em_analise"
        | "docs_pendentes"
        | "confirmada"
        | "cancelada"
      tipo_usuario_enum:
        | "super_admin"
        | "admin_escola"
        | "professor"
        | "coordenador"
        | "secretaria"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

export type TipoUsuario      = Database["public"]["Enums"]["tipo_usuario_enum"]
export type StatusGeral      = Database["public"]["Enums"]["status_geral_enum"]
export type StatusMatricula  = Database["public"]["Enums"]["status_matricula_enum"]
export type StatusContrato   = Database["public"]["Enums"]["status_contrato_enum"]
export type Profile          = Database["public"]["Tables"]["profiles"]["Row"]
export type Escola           = Database["public"]["Tables"]["escolas"]["Row"]
export type Turma            = Database["public"]["Tables"]["turmas"]["Row"]
export type TabelaPreco      = Database["public"]["Tables"]["tabelas_preco"]["Row"]
export type Permissao        = Database["public"]["Tables"]["permissoes"]["Row"]
export type Matricula        = Database["public"]["Tables"]["matriculas"]["Row"]
