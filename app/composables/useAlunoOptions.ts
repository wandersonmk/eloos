// Opções compartilhadas entre as abas do cadastro de aluno (Mãe, Pai, Outro, Pedagógico…)
export const corRacaOpts = [
  'Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não declarada',
]

export const escolaridadeOpts = [
  'Doutorado',
  'Ensino Fundamental I Completo',
  'Ensino Fundamental I Incompleto',
  'Ensino Fundamental II Completo',
  'Ensino Fundamental II Incompleto',
  'Ensino Fundamental Incompleto',
  'Ensino Médio Completo',
  'Ensino Médio Incompleto',
  'Ensino Superior Completo',
  'Ensino Superior Incompleto',
  'Ensino Técnico',
  'Mestrado',
  'Pós-Graduação',
]

export const estadoCivilOpts = [
  'Casado(a)', 'Divorciado(a)', 'Não informado', 'Separado(a)',
  'Solteiro(a)', 'União Estável', 'Viúvo(a)',
]

export const necessidadesEspeciaisOpts = [
  'Nenhuma',
  'Alta habilidade',
  'Deficiência auditiva parcial',
  'Deficiência auditiva total',
  'Deficiência física',
  'Deficiência intelectual',
  'Deficiência múltipla',
  'Deficiência visual parcial',
  'Deficiência visual total',
  'Outras necessidades',
  'Transtorno específico',
  'Transtorno global de desenvolvimento',
]

export const parentescoOpts = [
  'A mesma pessoa', 'Avô(ó)', 'Irmão(ã)', 'Madrasta', 'Mãe',
  'Outro', 'Padrasto', 'Pai', 'Primo(a)', 'Tio(a)',
]

export const moradiaTipoOpts        = ['Própria', 'Alugada', 'Cedida']
export const construcaoTipoOpts     = ['Alvenaria', 'Madeira', 'Mista']

export const sexoOpts          = ['Feminino', 'Masculino']
export const simNaoOpts        = ['Sim', 'Não']
export const canhotoDestroOpts = ['Canhoto', 'Destro']
export const zonaOpts          = ['Urbana', 'Rural']

export const simNaoBoolOpts: Array<{ label: string; value: boolean }> = [
  { label: 'Sim', value: true  },
  { label: 'Não', value: false },
]

export const corOlhosOpts           = ['Âmbar', 'Azul', 'Avelã', 'Castanho', 'Cinza', 'Preto', 'Verde', 'Vermelho/Violeta', 'Outro']
export const corCabeloOpts          = ['Preto', 'Castanho', 'Louro', 'Ruivo', 'Outro']

export const tipoSanguineoOpts      = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-']

export const doencasOpts            = ['Asma', 'Bronquite', 'Diabetes', 'Epilepsia', 'Hipertensão', 'Reumatismo', 'Nenhuma']
export const doencasContagiosasOpts = ['Catapóra', 'Caxumba', 'Coqueluche', 'Escarlatina', 'Rubéola', 'Sarampo', 'Nenhuma']
export const alergiasOpts           = ['Alergia a Alimentos', 'Alergia a Medicamentos', 'Alergia ao Látex', 'Dermatite de Contato', 'Eczema', 'Picadas de Insetos', 'Urticária', 'Nenhuma']
export const vacinasOpts            = ['Anti-Tifoide', 'BCG Intra-dérmica', 'BCG Oral', 'Sabim', 'Sarampo', 'Tríplice', 'Varíola']

export const usaFraldasOpts         = ['Sim', 'Não', 'Só para dormir']

// Mock — em produção isso virá do backend
export const unidadesMock = [
  { label: 'Eloos — Unidade Centro',    value: 'centro' },
  { label: 'Eloos — Unidade Zona Sul',  value: 'zona-sul' },
  { label: 'Eloos — Unidade Vila Nova', value: 'vila-nova' },
]

// Turmas por unidade — mock. Cada turma tem id global (prefixado pela unidade)
// para evitar colisão entre unidades.
export interface TurmaMock {
  id: string
  label: string
  turno: 'Manhã' | 'Tarde' | 'Integral' | 'Noite'
}

export const turmasPorUnidade: Record<string, TurmaMock[]> = {
  'centro': [
    { id: 'centro-1a',  label: '1º Ano A',   turno: 'Manhã'    },
    { id: 'centro-1b',  label: '1º Ano B',   turno: 'Tarde'    },
    { id: 'centro-2a',  label: '2º Ano A',   turno: 'Manhã'    },
    { id: 'centro-2b',  label: '2º Ano B',   turno: 'Tarde'    },
    { id: 'centro-3a',  label: '3º Ano A',   turno: 'Manhã'    },
    { id: 'centro-3b',  label: '3º Ano B',   turno: 'Tarde'    },
    { id: 'centro-em',  label: 'Ensino Médio', turno: 'Manhã' },
  ],
  'zona-sul': [
    { id: 'zona-sul-1a',  label: '1º Ano A',  turno: 'Manhã'    },
    { id: 'zona-sul-2a',  label: '2º Ano A',  turno: 'Manhã'    },
    { id: 'zona-sul-3a',  label: '3º Ano A',  turno: 'Manhã'    },
    { id: 'zona-sul-int', label: 'Período Integral', turno: 'Integral' },
  ],
  'vila-nova': [
    { id: 'vila-nova-1a', label: '1º Ano A', turno: 'Tarde'    },
    { id: 'vila-nova-2a', label: '2º Ano A', turno: 'Tarde'    },
    { id: 'vila-nova-3a', label: '3º Ano A', turno: 'Tarde'    },
    { id: 'vila-nova-em', label: 'Ensino Médio', turno: 'Noite' },
  ],
}

export function getTurmasDaUnidade(unidadeValue: string): TurmaMock[] {
  return turmasPorUnidade[unidadeValue] ?? []
}

export function turmaLabel(turmaId: string): string {
  for (const turmas of Object.values(turmasPorUnidade)) {
    const t = turmas.find(x => x.id === turmaId)
    if (t) return `${t.label} · ${t.turno}`
  }
  return turmaId
}

export function unidadeDaTurma(turmaId: string): string | null {
  for (const [unidade, turmas] of Object.entries(turmasPorUnidade)) {
    if (turmas.some(t => t.id === turmaId)) return unidade
  }
  return null
}
