<template>
  <div class="h-dvh flex items-center justify-center bg-white">
    <div class="flex flex-col items-center gap-3 text-center">
      <svg class="w-8 h-8 text-indigo-500 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <p class="text-sm text-slate-500">Verificando autenticação...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false })
</script>
