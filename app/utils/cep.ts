// Utilitários de CEP — máscara visual + consulta no ViaCEP.
// Reutilizável em qualquer formulário que precise auto-preencher endereço.

export interface EnderecoViaCep {
  logradouro:  string
  bairro:      string
  cidade:      string
  estado:      string   // UF (2 letras)
  complemento: string
}

/** Aplica máscara visual "12345-678" no CEP enquanto o usuário digita. */
export function applyCepMask(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

/** Apenas dígitos do CEP (8 chars). Retorna '' se inválido. */
export function cepDigits(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.length === 8 ? d : ''
}

/**
 * Consulta o ViaCEP. Lança erro em falha de rede ou CEP não encontrado.
 * Retorna o endereço normalizado.
 */
export async function buscarCep(cep: string): Promise<EnderecoViaCep> {
  const d = cepDigits(cep)
  if (!d) throw new Error('CEP inválido')

  const res = await fetch(`https://viacep.com.br/ws/${d}/json/`)
  if (!res.ok) throw new Error('Falha de rede ao consultar CEP')

  const data = await res.json() as {
    erro?:        boolean
    logradouro?:  string
    bairro?:      string
    localidade?:  string
    uf?:          string
    complemento?: string
  }
  if (data.erro) throw new Error('CEP não encontrado')

  return {
    logradouro:  data.logradouro  ?? '',
    bairro:      data.bairro      ?? '',
    cidade:      data.localidade  ?? '',
    estado:      data.uf          ?? '',
    complemento: data.complemento ?? '',
  }
}
