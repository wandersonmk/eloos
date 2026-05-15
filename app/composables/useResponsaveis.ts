import { emptyResponsavel, type ResponsavelData } from '~/composables/useAlunoForm'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ResponsavelTipo = 'Financeiro' | 'Pedagógico'

export interface AlunoVinculo {
  id: string
  nome: string
  turma: string
  escola: string
  cor: string
}

export interface ResponsavelRecord {
  id: string
  nome: string
  parentesco: string
  cpf: string
  telefone: string
  email: string
  cor: string
  tipos: ResponsavelTipo[]
  alunos: AlunoVinculo[]
  origem: 'manual' | 'cadastro-aluno'
  // Snapshot completo do cadastro feito pelo aluno — usado para pré-preencher
  // o formulário ao vincular um aluno novo a um responsável já existente.
  dadosCompletos?: ResponsavelData
}

// ─── Paleta de cores para avatares ────────────────────────────────────────────

const palette = [
  '#ec4899', '#6366f1', '#10b981', '#8b5cf6',
  '#f59e0b', '#3b82f6', '#f43f5e', '#14b8a6',
  '#a855f7', '#0ea5e9',
]

function pickColor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return palette[hash % palette.length]!
}

// ─── Seed inicial (mock) ──────────────────────────────────────────────────────

function seed(): ResponsavelRecord[] {
  return [
    {
      id: 'seed-1', nome: 'Roberta Fernandes Silva', parentesco: 'Mãe',
      cpf: '987.654.321-00', telefone: '(11) 99876-5432', email: 'roberta.silva@gmail.com',
      cor: '#ec4899', tipos: ['Financeiro', 'Pedagógico'], origem: 'manual',
      alunos: [{ id: 'a-1', nome: 'Lucas Fernandes Silva', turma: '3º Ano A', escola: 'Eloos — Unidade Centro', cor: '#6366f1' }],
    },
    {
      id: 'seed-2', nome: 'Paulo Souza', parentesco: 'Pai',
      cpf: '123.456.789-00', telefone: '(11) 98765-4321', email: 'paulo.souza@empresa.com.br',
      cor: '#6366f1', tipos: ['Financeiro'], origem: 'manual',
      alunos: [
        { id: 'a-2', nome: 'Maria Eduarda Souza', turma: '2º Ano A', escola: 'Eloos — Unidade Centro',   cor: '#ec4899' },
        { id: 'a-3', nome: 'Henrique Souza',       turma: '1º Ano A', escola: 'Eloos — Unidade Zona Sul', cor: '#f59e0b' },
      ],
    },
    {
      id: 'seed-3', nome: 'Patrícia Costa Almeida', parentesco: 'Mãe',
      cpf: '321.654.987-00', telefone: '(11) 97777-1234', email: 'patricia@gmail.com',
      cor: '#10b981', tipos: ['Financeiro', 'Pedagógico'], origem: 'manual',
      alunos: [{ id: 'a-4', nome: 'Heitor Costa', turma: '2º Ano A', escola: 'Eloos — Unidade Vila Nova', cor: '#3b82f6' }],
    },
    {
      id: 'seed-4', nome: 'Sérgio Cardoso', parentesco: 'Pai',
      cpf: '456.789.123-00', telefone: '(11) 95555-9876', email: 'sergio.cardoso@gmail.com',
      cor: '#8b5cf6', tipos: ['Financeiro'], origem: 'manual',
      alunos: [{ id: 'a-5', nome: 'Beatriz Almeida Cardoso', turma: '3º Ano A', escola: 'Eloos — Unidade Centro', cor: '#f43f5e' }],
    },
  ]
}

// ─── Store ────────────────────────────────────────────────────────────────────

export function useResponsaveis() {
  // useState garante estado compartilhado entre páginas durante a sessão SPA
  const responsaveis = useState<ResponsavelRecord[]>('responsaveis', seed)

  function vincularResponsavelDoAluno(
    resp: ResponsavelData,
    parentescoLabel: 'Mãe' | 'Pai',
    aluno: { nome: string; turma?: string; escola: string },
  ) {
    if (!resp.responsavelFinanceiro && !resp.responsavelPedagogico) return
    if (!resp.nome.trim()) return

    const tipos: ResponsavelTipo[] = []
    if (resp.responsavelFinanceiro) tipos.push('Financeiro')
    if (resp.responsavelPedagogico) tipos.push('Pedagógico')

    const novoVinculo: AlunoVinculo = {
      id: `aluno-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      nome: aluno.nome,
      turma: aluno.turma || '—',
      escola: aluno.escola,
      cor: pickColor(aluno.nome),
    }

    // Matching: prioriza CPF; cai para nome + parentesco
    const list  = responsaveis.value
    const matchIdx = list.findIndex(r => {
      if (resp.cpf && r.cpf === resp.cpf) return true
      return r.nome.trim().toLowerCase() === resp.nome.trim().toLowerCase()
          && r.parentesco === parentescoLabel
    })

    if (matchIdx >= 0) {
      const existing = list[matchIdx]!
      const tiposMesclados = Array.from(new Set([...existing.tipos, ...tipos])) as ResponsavelTipo[]
      const jaTemAluno = existing.alunos.some(
        a => a.nome.trim().toLowerCase() === aluno.nome.trim().toLowerCase(),
      )

      responsaveis.value = list.map((r, i) => i === matchIdx ? {
        ...r,
        tipos: tiposMesclados,
        alunos: jaTemAluno ? r.alunos : [...r.alunos, novoVinculo],
        telefone: r.telefone || pegaTelefone(resp),
        email:    r.email    || pegaEmail(resp),
        cpf:      r.cpf      || resp.cpf || '—',
        // Atualiza snapshot com os dados mais recentes preenchidos no cadastro
        dadosCompletos: { ...resp },
      } : r)
    } else {
      responsaveis.value = [
        ...list,
        {
          id: `resp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          nome: resp.nome,
          parentesco: parentescoLabel,
          cpf: resp.cpf || '—',
          telefone: pegaTelefone(resp),
          email: pegaEmail(resp),
          cor: pickColor(resp.nome),
          tipos,
          alunos: [novoVinculo],
          origem: 'cadastro-aluno',
          dadosCompletos: { ...resp },
        },
      ]
    }
  }

  function remover(id: string) {
    responsaveis.value = responsaveis.value.filter(r => r.id !== id)
  }

  function atualizar(id: string, patch: Partial<Omit<ResponsavelRecord, 'id' | 'alunos' | 'origem'>>) {
    responsaveis.value = responsaveis.value.map(r => r.id === id ? { ...r, ...patch } : r)
  }

  return { responsaveis, vincularResponsavelDoAluno, remover, atualizar }
}

function pegaTelefone(resp: ResponsavelData): string {
  const grupos = [resp.telefones.contato, resp.telefones.residencial, resp.telefones.comercial]
  for (const g of grupos) for (const p of g) if (p.telefone.trim()) return p.telefone
  return '—'
}

function pegaEmail(resp: ResponsavelData): string {
  const e = resp.emails.find(x => x.trim())
  return e || '—'
}

// Helper utilizado pelo cadastro de aluno (auto-import via composables/)
export function pickAvatarColor(seed: string) { return pickColor(seed) }

// Converte um ResponsavelRecord em ResponsavelData para preencher o formulário
// quando o usuário vincula um aluno novo a um responsável já existente.
export function montarResponsavelDataAPartirDoRecord(r: ResponsavelRecord): ResponsavelData {
  // Se temos snapshot completo do último cadastro, é o ideal — devolve cópia profunda
  if (r.dadosCompletos) {
    const d = r.dadosCompletos
    return {
      ...d,
      emails:    [...d.emails],
      telefones: {
        residencial: d.telefones.residencial.map(p => ({ ...p })),
        comercial:   d.telefones.comercial.map(p => ({ ...p })),
        contato:     d.telefones.contato.map(p => ({ ...p })),
      },
      endereco: { ...d.endereco },
      trabalho: { ...d.trabalho },
      moradia:  { ...d.moradia },
      // Mantém as flags de papel fechadas — o usuário marca de novo para o novo aluno
      responsavelFinanceiro: false,
      responsavelPedagogico: false,
    }
  }

  // Caso só tenhamos o registro resumido (ex.: seed): preenche o mínimo
  const base = emptyResponsavel()
  base.nome  = r.nome
  base.cpf   = r.cpf && r.cpf !== '—' ? r.cpf : ''
  if (r.email && r.email !== '—') base.emails[0] = r.email
  if (r.telefone && r.telefone !== '—') base.telefones.contato[0]!.telefone = r.telefone
  return base
}
