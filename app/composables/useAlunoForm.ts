// ─── Endereço ─────────────────────────────────────────────────────────────────

export interface EnderecoData {
  cep: string
  exterior: boolean
  copiarResponsavel: boolean
  logradouro: string
  numero: string
  bairro: string
  municipio: string
  uf: string
  pais: string
  complemento: string
  observacao: string
}

// ─── Telefones ────────────────────────────────────────────────────────────────

export interface PhoneEntry { telefone: string; observacao: string }
export interface TelefonesData {
  residencial: PhoneEntry[]
  comercial:   PhoneEntry[]
  contato:     PhoneEntry[]
}

// ─── Local de trabalho ────────────────────────────────────────────────────────

export interface TrabalhoData {
  trabalha: boolean
  local: string
  cargo: string
  horaInicio: string
  horaFim: string
  telefone: string
  observacao: string
}

// ─── Dados do aluno ────────────────────────────────────────────────────────────

export interface EmergenciaContato {
  nome: string
  parentesco: string
  telefone: string
  encaminhar: string
}

export interface AutorizadoRetirar {
  nome: string
  rg: string
  parentesco: string
  telefone: string
  codIdentificacao: string
}

export interface FamiliaMembro {
  nome: string
  dataNascimento: string
  parentesco: string
  profissao: string
  ocupacao: string
  renda: string
  fatorRiscoSocial: string
}

export interface MedicamentoAutorizado {
  nome: string
  dosagem: string
  observacao: string
}

// ─── Responsável (Mãe, Pai, Outro, Pedagógico) ─────────────────────────────────

export type TipoResponsavel = 'fisica' | 'juridica'

export interface ResponsavelMoradia {
  tipo: string
  construcao: string
  comodos: string
  valor: string
}

export interface ResponsavelData {
  responsavelFinanceiro: boolean
  responsavelPedagogico: boolean
  tipo: TipoResponsavel
  nome: string
  semCpf: boolean
  cpf: string
  dataNascimento: string
  sexo: string
  parentesco: string
  rg: string
  orgaoEmissor: string
  dataExpRg: string
  municipioNaturalidade: string
  uf: string
  pais: string
  nacionalidade: string
  falecido: string
  escolaridade: string
  estadoCivil: string
  corRaca: string
  profissao: string
  religiao: string
  emails: string[]
  telefones: TelefonesData
  endereco: EnderecoData
  copiarEnderecoFinanceiro: boolean
  trabalho: TrabalhoData
  moradia: ResponsavelMoradia
}

export interface FichaMedicaData {
  altura: string
  peso: string
  corOlhos: string
  corCabelo: string
  autorizaEducFisica: string
  detalheEducFisica: string
  atestadoEducFisica: string | null
  autorizaTylenol: string
  autorizaMedicacaoFebre: string
  epileptico: string
  tratamentoEpilepsia: string
  observacaoEpilepsia: string
  asmatico: string
  tratamentoAsma: string
  observacaoAsma: string
  diabetico: string
  convulsoes: string
  cardiacos: string
  desmaios: string
  doencas: string[]
  doencasContagiosas: string[]
  cirurgia: string
  acidente: string
  outroProblema: string
  tratamentoMedico: string
  temores: string
  medicamentoRegular: string
  medicamentos: MedicamentoAutorizado[]
  alergias: string[]
  alergiaMedicamento: string
  outrasAlergias: string
  anexoVacinacao: string | null
  declaracaoPediatra: string | null
  vacinas: string[]
  tipoSanguineo: string
  restricoesAlimentares: string
  comeSozinho: string
  usaFraldas: string
  pedeBanheiro: string
  cuidadoExtra: string
  operadoraPlano: string
  tipoPlano: string
  numeroPlano: string
  hospitalReferencia: string
}

// ─── Documentação ─────────────────────────────────────────────────────────────

export interface DocumentoPendente {
  id: string
  nome: string
  pendente: boolean
  customizado?: boolean
}

export interface ArquivoAnexado {
  id: string
  nome: string
  tipo: string
  tamanhoKb: number
  uploadedAt: string
}

// ─── Histórico/listas ─────────────────────────────────────────────────────────

export interface MatriculaItem {
  id: string
  turma: string
  periodo: string
  status: 'Ativa' | 'Concluída' | 'Cancelada' | 'Trancada'
  inicio: string
  fim: string
}

export interface OcorrenciaItem {
  id: string
  data: string
  assunto: string
  descricao: string
  gravidade: 'baixa' | 'media' | 'alta'
  status: 'Aberta' | 'Em andamento' | 'Resolvida'
  registradoPor: string
}

export interface TransporteData {
  modos: string[]
  esperarFora: string
}

export interface RegistroContato {
  id: string
  data: string
  hora: string
  assunto: string
  usuario: string
  descricao: string
  pediuAtendimento: string
  jaExecutado: string
}

export interface AgendamentoAcao {
  id: string
  tipoAcao: string
  data: string
  usuario: string
  descricao: string
  jaExecutado: string
  pediuAtendimento: string
  foiChamado: string
}

export interface AlunoFormData {
  // Identificação
  eResponsavelFinanceiro: boolean
  autorizaImagem: string
  unidade: string
  turma: string
  tabela_preco_id: string
  forma_pagamento: string
  ra: string
  rm: string
  gerarRmAutomatico: boolean
  nome: string
  possuiNomeSocial: string
  nomeSocial: string
  dataNascimento: string
  idade: string
  sexo: string
  sairSozinho: string
  cpf: string
  rg: string
  idCenso: string
  numeroNis: string
  dataCadastro: string
  sistec: string
  canhotoDestro: string
  zona: string
  foto: string | null

  // Certidão
  certidaoLivro: string
  certidaoFolha: string
  certidaoCartorio: string
  certidaoUf: string
  numeroCertidao: string
  dataEmissaoCertidao: string
  novaCertidao: string
  nomeMaeCertidao: string

  // Dados complementares
  religiao: string
  municipioNaturalidade: string
  uf: string
  pais: string
  nacionalidade: string
  falecido: string
  corRaca: string
  necessidadesEspeciais: string
  outraNecessidade: boolean
  outraNecessidadeDescricao: string
  telefone1: string
  telefone2: string
  observacoesGerais: string
  scoreEnem: string

  enderecoResidencial: EnderecoData
  enderecoComercial:   EnderecoData

  emergencia: EmergenciaContato[]
  autorizados: AutorizadoRetirar[]
  familia: FamiliaMembro[]
  parentesNaEscola: string

  mae: ResponsavelData
  pai: ResponsavelData

  ficha: FichaMedicaData

  // Abas 7–14
  documentosPendentes: DocumentoPendente[]
  arquivos: ArquivoAnexado[]
  matriculas: MatriculaItem[]
  ocorrencias: OcorrenciaItem[]
  transporte: TransporteData
  registrosContato: RegistroContato[]
  agendamentos: AgendamentoAcao[]
}

// ─── Factories ────────────────────────────────────────────────────────────────

export function emptyEndereco(): EnderecoData {
  return {
    cep: '', exterior: false, copiarResponsavel: false,
    logradouro: '', numero: '', bairro: '', municipio: '',
    uf: '', pais: 'Brasil', complemento: '', observacao: '',
  }
}

export function emptyTelefones() {
  const e = () => ({ telefone: '', observacao: '' })
  return {
    residencial: [e(), e(), e()],
    comercial:   [e(), e(), e()],
    contato:     [e(), e(), e()],
  }
}

export function emptyTrabalho(): TrabalhoData {
  return { trabalha: false, local: '', cargo: '', horaInicio: '', horaFim: '', telefone: '', observacao: '' }
}

export function emptyResponsavel(): ResponsavelData {
  return {
    responsavelFinanceiro: false,
    responsavelPedagogico: false,
    tipo: 'fisica',
    nome: '',
    semCpf: false,
    cpf: '',
    dataNascimento: '',
    sexo: '',
    parentesco: '',
    rg: '',
    orgaoEmissor: '',
    dataExpRg: '',
    municipioNaturalidade: '',
    uf: '',
    pais: 'Brasil',
    nacionalidade: 'Brasileira',
    falecido: 'Não',
    escolaridade: '',
    estadoCivil: 'Não informado',
    corRaca: '',
    profissao: '',
    religiao: '',
    emails: ['', '', '', ''],
    telefones: emptyTelefones(),
    endereco: emptyEndereco(),
    copiarEnderecoFinanceiro: false,
    trabalho: emptyTrabalho(),
    moradia: { tipo: '', construcao: '', comodos: '', valor: '' },
  }
}

export function emptyFicha(): FichaMedicaData {
  return {
    altura: '', peso: '', corOlhos: '', corCabelo: '',
    autorizaEducFisica: '', detalheEducFisica: '', atestadoEducFisica: null,
    autorizaTylenol: '', autorizaMedicacaoFebre: '',
    epileptico: '', tratamentoEpilepsia: '', observacaoEpilepsia: '',
    asmatico: '', tratamentoAsma: '', observacaoAsma: '',
    diabetico: '', convulsoes: '', cardiacos: '', desmaios: '',
    doencas: [], doencasContagiosas: [],
    cirurgia: '', acidente: '', outroProblema: '', tratamentoMedico: '',
    temores: '', medicamentoRegular: '', medicamentos: [],
    alergias: [], alergiaMedicamento: '', outrasAlergias: '',
    anexoVacinacao: null, declaracaoPediatra: null, vacinas: [],
    tipoSanguineo: '', restricoesAlimentares: '', comeSozinho: '',
    usaFraldas: '', pedeBanheiro: '', cuidadoExtra: '',
    operadoraPlano: '', tipoPlano: '', numeroPlano: '', hospitalReferencia: '',
  }
}

export function emptyAlunoForm(): AlunoFormData {
  const hoje = new Date().toISOString().slice(0, 10)
  return {
    eResponsavelFinanceiro: false,
    autorizaImagem: '',
    unidade: '',
    turma: '',
    tabela_preco_id: '',
    forma_pagamento: '',
    ra: '',
    rm: '',
    gerarRmAutomatico: true,
    nome: '',
    possuiNomeSocial: 'Não',
    nomeSocial: '',
    dataNascimento: '',
    idade: '',
    sexo: '',
    sairSozinho: '',
    cpf: '',
    rg: '',
    idCenso: '',
    numeroNis: '',
    dataCadastro: hoje,
    sistec: '',
    canhotoDestro: '',
    zona: '',
    foto: null,
    certidaoLivro: '', certidaoFolha: '', certidaoCartorio: '',
    certidaoUf: '', numeroCertidao: '', dataEmissaoCertidao: '',
    novaCertidao: '', nomeMaeCertidao: '',
    religiao: '', municipioNaturalidade: '', uf: '', pais: 'Brasil',
    nacionalidade: 'Brasileira', falecido: 'Não',
    corRaca: '', necessidadesEspeciais: 'Nenhuma',
    outraNecessidade: false, outraNecessidadeDescricao: '',
    telefone1: '', telefone2: '', observacoesGerais: '', scoreEnem: '',
    enderecoResidencial: emptyEndereco(),
    enderecoComercial:   emptyEndereco(),
    emergencia: [],
    autorizados: [],
    familia: [],
    parentesNaEscola: '',
    mae:        emptyResponsavel(),
    pai:        emptyResponsavel(),
    ficha:      emptyFicha(),
    documentosPendentes: defaultDocumentosPendentes(),
    arquivos: [],
    matriculas: [],
    ocorrencias: [],
    transporte: { modos: [], esperarFora: '' },
    registrosContato: [],
    agendamentos: [],
  }
}

export function defaultDocumentosPendentes(): DocumentoPendente[] {
  return [
    { id: 'certidao',      nome: 'Certidão de Nascimento',     pendente: false },
    { id: 'cpf',           nome: 'CPF',                         pendente: false },
    { id: 'declaracao',    nome: 'Declaração de Transferência', pendente: false },
    { id: 'historico',     nome: 'Histórico Escolar',           pendente: false },
    { id: 'rg',            nome: 'RG',                          pendente: false },
  ]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function calcularIdade(dataIso: string): string {
  if (!dataIso) return ''
  const nasc = new Date(dataIso)
  if (Number.isNaN(nasc.getTime())) return ''
  const hoje = new Date()
  let anos = hoje.getFullYear() - nasc.getFullYear()
  const m = hoje.getMonth() - nasc.getMonth()
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) anos--
  return anos >= 0 ? `${anos} anos` : ''
}

export function applyCpfMask(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11)
  return d
    .replace(/^(\d{3})(\d)/,        '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/,   '.$1-$2')
}

export function applyPhoneMask(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 10) {
    return d.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) => {
      let out = ''
      if (a) out  = `(${a}`
      if (a && a.length === 2) out += ') '
      if (b) out += b
      if (c) out += `-${c}`
      return out
    })
  }
  return d.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}
