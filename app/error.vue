<template>
  <div class="min-h-screen flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
    <div class="max-w-md w-full text-center">
      <div class="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-6">
        <Icon name="lucide:alert-triangle" class="w-8 h-8" />
      </div>

      <p class="text-[11px] uppercase tracking-widest text-slate-400 mb-1">{{ statusCode }}</p>
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ titulo }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ descricao }}</p>

      <details v-if="error?.message" class="mt-5 text-left">
        <summary class="text-[12px] text-slate-400 hover:text-slate-600 cursor-pointer">Detalhes técnicos</summary>
        <pre class="mt-2 text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">{{ error.message }}</pre>
      </details>

      <div class="mt-8 flex items-center justify-center gap-2">
        <button
          type="button"
          @click="voltar"
          class="inline-flex items-center gap-1.5 h-10 px-4 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Voltar
        </button>
        <button
          type="button"
          @click="irHome"
          class="inline-flex items-center gap-1.5 h-10 px-4 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          <Icon name="lucide:home" class="w-4 h-4" />
          Ir para o início
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error?.statusCode ?? 500)

const titulo = computed(() => {
  if (statusCode.value === 404) return 'Página não encontrada'
  if (statusCode.value === 403) return 'Acesso negado'
  if (statusCode.value === 401) return 'Você precisa fazer login'
  return 'Algo deu errado'
})

const descricao = computed(() => {
  if (statusCode.value === 404) return 'A página que você procura não existe ou foi movida.'
  if (statusCode.value === 403) return 'Você não tem permissão para acessar este recurso.'
  if (statusCode.value === 401) return 'Sua sessão expirou. Faça login novamente para continuar.'
  return 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
})

function voltar() {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    window.history.back()
  } else {
    irHome()
  }
}

async function irHome() {
  await clearError({ redirect: '/' })
}
</script>
