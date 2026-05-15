// Utilitários de CNPJ — máscara visual + validação dos dígitos verificadores.

/** Aplica máscara "00.000.000/0000-00" enquanto o usuário digita. */
export function applyCnpjMask(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/,                  '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/,         '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/,                 '.$1/$2')
    .replace(/(\d{4})(\d{1,2})$/,             '$1-$2')
}

/** Retorna apenas os 14 dígitos ou string vazia se inválido. */
export function cnpjDigits(v: string): string {
  const d = v.replace(/\D/g, '')
  return d.length === 14 ? d : ''
}

/**
 * Valida CNPJ via dígitos verificadores (módulo 11).
 * Rejeita sequências repetidas (00000000000000, 11111111111111, etc).
 */
export function isCnpjValido(v: string): boolean {
  const d = v.replace(/\D/g, '')
  if (d.length !== 14) return false
  if (/^(\d)\1{13}$/.test(d)) return false

  const calcDV = (base: string, pesos: number[]): number => {
    let soma = 0
    for (let i = 0; i < pesos.length; i++) {
      soma += parseInt(base[i]!, 10) * pesos[i]!
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const dv1 = calcDV(d.slice(0, 12), pesos1)
  if (dv1 !== parseInt(d[12]!, 10)) return false

  const dv2 = calcDV(d.slice(0, 13), pesos2)
  if (dv2 !== parseInt(d[13]!, 10)) return false

  return true
}
