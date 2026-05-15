// Utilitários de moeda — máscara BRL "R$ 1.234,56" para inputs.
// Armazena internamente como number (valor em reais, com 2 casas decimais).

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Aplica máscara BRL enquanto o usuário digita (recebe string ou number). */
export function applyBRLMask(input: string | number | null | undefined): string {
  if (input === null || input === undefined || input === '') return ''
  const digits = String(input).replace(/\D/g, '') || '0'
  const cents  = parseInt(digits, 10)
  const reais  = cents / 100
  return BRL.format(reais)
}

/** Extrai o valor numérico (reais com 2 casas) a partir de uma string mascarada. */
export function parseBRL(masked: string | null | undefined): number {
  if (!masked) return 0
  const digits = String(masked).replace(/\D/g, '') || '0'
  return parseInt(digits, 10) / 100
}

/** Formata um number como BRL para exibição (sem ser usado em input). */
export function formatBRL(value: number | null | undefined): string {
  return BRL.format(value ?? 0)
}
