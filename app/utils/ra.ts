// RA (Registro do Aluno) — padrão: 000000000000-0/UF (ex.: 000125770806-5/SP).
// Derivado deterministicamente do CPF para garantir unicidade global sem expor o CPF.

const RA_VALID_RE = /^\d{12}-\d\/[A-Z]{2}$/

export function applyRaMask(v: string): string {
  if (!v) return ''
  const [numPart = '', ufPart = ''] = v.split('/')
  const d  = numPart.replace(/\D/g, '').slice(0, 13)
  const uf = ufPart.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()

  let out = d.length <= 12 ? d : `${d.slice(0, 12)}-${d.slice(12, 13)}`
  if (v.includes('/') || d.length === 13) out += `/${uf}`
  return out
}

export function isValidRa(v: string): boolean {
  return RA_VALID_RE.test(v.trim())
}

/**
 * Gera o RA determinístico a partir do CPF + UF.
 *
 * - Mesma entrada → mesmo RA (garante unicidade via `UNIQUE` no banco, já que CPF é único).
 * - Não expõe o CPF: aplica um hash multiplicativo nos 11 dígitos e mapeia em 12 dígitos.
 * - Dígito verificador: módulo 11 (com 10 → 0).
 *
 * Retorna string vazia se o CPF não tiver 11 dígitos.
 */
export function gerarRaPorCpf(cpf: string, uf: string): string {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return ''

  const ufUp = uf.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || 'SP'

  // Hash multiplicativo (Knuth) → BigInt para evitar perda de precisão.
  let h = 0n
  for (let i = 0; i < digits.length; i++) {
    h = (h * 2654435761n + BigInt(digits.charCodeAt(i))) & 0xFFFFFFFFFFFFFFFFn
  }
  // Mistura com o próprio CPF para diluir colisões em 12 dígitos.
  const cpfNum = BigInt(digits)
  const mixed  = (h ^ (cpfNum * 1000003n)) % 1000000000000n // 12 dígitos
  const num12  = mixed.toString().padStart(12, '0').slice(-12)

  // Dígito verificador mod 11 (10 → 0).
  let sum = 0
  for (let i = 0; i < 12; i++) sum += Number(num12[i]) * (i + 2)
  const dv = sum % 11 === 10 ? 0 : sum % 11

  return `${num12}-${dv}/${ufUp}`
}

/**
 * Gera o RM (Registro de Matrícula) determinístico a partir do CPF + ano letivo.
 * Padrão: AAAA-NNNNNN (ano + 6 dígitos derivados do CPF).
 * Mesmo CPF + mesmo ano → mesmo RM. UNIQUE no banco protege contra colisão.
 */
export function gerarRmPorCpf(cpf: string, ano: number): string {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return ''

  let h = 0n
  for (let i = 0; i < digits.length; i++) {
    h = (h * 1099511628211n + BigInt(digits.charCodeAt(i))) & 0xFFFFFFFFFFFFFFFFn
  }
  const cpfNum = BigInt(digits)
  const mixed  = (h ^ (cpfNum * 2654435761n)) % 1000000n // 6 dígitos
  const num6   = mixed.toString().padStart(6, '0')

  return `${ano}-${num6}`
}
