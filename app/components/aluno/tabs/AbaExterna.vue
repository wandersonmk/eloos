<template>
  <FormSection :title="title" :subtitle="subtitle">
    <div class="flex flex-col items-center justify-center py-10 gap-4 text-center max-w-md mx-auto">
      <div class="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath" />
        </svg>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-[14px] font-semibold text-slate-800 dark:text-slate-100">{{ message }}</p>
        <p class="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">{{ description }}</p>
      </div>

      <BaseButton v-if="alunoSalvo && targetRoute" variant="primary" @click="$router.push(targetRoute)">
        Acessar {{ buttonLabel }}
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
      </BaseButton>

      <div v-else class="flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>
        Salve o aluno primeiro para habilitar esta aba
      </div>
    </div>
  </FormSection>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  message: string
  description: string
  buttonLabel: string
  iconPath: string
  alunoSalvo: boolean
  targetRoute?: string
}>(), { alunoSalvo: false })
</script>
