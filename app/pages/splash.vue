<template>
  <div class="min-h-dvh flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
    <TechBackground />

    <div class="relative z-10 flex flex-col items-center gap-8">
      <!-- Logo animado -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(99,102,241,.35)] animate-pulse-soft">
          <svg class="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
        </div>
        <h1 class="text-white text-3xl font-semibold tracking-tight">Eloos</h1>
        <p class="text-white/50 text-sm">Gestão escolar inteligente</p>
      </div>

      <!-- Spinner -->
      <div class="flex flex-col items-center gap-3 mt-4">
        <svg class="w-7 h-7 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
        <p class="text-white/40 text-xs uppercase tracking-[0.25em]">Carregando ambiente…</p>
      </div>
    </div>

    <p class="absolute bottom-8 text-white/20 text-xs">© 2026 Eloos · Todos os direitos reservados</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false, layout: false })

// Simula tempo mínimo de splash e direciona para o destino apropriado
const supabase = useSupabaseClient()
const user     = useSupabaseUser()

onMounted(async () => {
  await new Promise(r => setTimeout(r, 1600))
  await supabase.auth.getSession()
  await navigateTo(user.value ? '/' : '/login')
})
</script>

<style scoped>
@keyframes pulse-soft {
  0%, 100% { transform: scale(1);   box-shadow: 0 8px 32px rgba(99,102,241,.35); }
  50%      { transform: scale(1.05); box-shadow: 0 12px 48px rgba(99,102,241,.55); }
}
.animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
</style>
