<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster
      position="top-right"
      :theme="isDark ? 'dark' : 'light'"
      rich-colors
      close-button
      :duration="4000"
    />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const { isDark, applyClass } = useTheme()
onMounted(() => applyClass(isDark.value))
</script>

<style>
html.dark {
  background-color: #020617;
  color-scheme: dark;
}

/* ════════════════════════════════════════════════════════
   Toasts (vue-sonner) — barra de progresso + X interno
   ════════════════════════════════════════════════════════ */

/* Container do toast: reserva espaço pro X e esconde overflow da barra */
[data-sonner-toaster] [data-sonner-toast] {
  position: relative;
  overflow: hidden;
  padding-right: 36px !important;
}

/* Barra de progresso animada na base do toast */
[data-sonner-toaster] [data-sonner-toast]::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: rgb(99, 102, 241);
  transform-origin: left center;
  animation: toast-progress 4000ms linear forwards;
  pointer-events: none;
}

[data-sonner-toaster] [data-sonner-toast][data-type='success']::after { background: rgb(34, 197, 94); }
[data-sonner-toaster] [data-sonner-toast][data-type='error']::after   { background: rgb(239, 68, 68); }
[data-sonner-toaster] [data-sonner-toast][data-type='info']::after    { background: rgb(59, 130, 246); }
[data-sonner-toaster] [data-sonner-toast][data-type='warning']::after { background: rgb(234, 179, 8); }

/* Pausa a barra quando o usuário passa o mouse (sonner também pausa o auto-close) */
[data-sonner-toaster] [data-sonner-toast]:hover::after,
[data-sonner-toaster][data-expanded='true'] [data-sonner-toast]::after {
  animation-play-state: paused;
}

@keyframes toast-progress {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

/* Botão de fechar: tira do canto externo, coloca dentro do toast à direita */
[data-sonner-toaster] [data-sonner-toast] [data-close-button] {
  position: absolute !important;
  top: 50% !important;
  right: 10px !important;
  left: auto !important;
  transform: translateY(-50%) !important;
  width: 22px !important;
  height: 22px !important;
  padding: 0 !important;
  border-radius: 6px !important;
  background: transparent !important;
  border: none !important;
  color: inherit !important;
  opacity: 0.45;
  box-shadow: none !important;
  transition: opacity 150ms ease, background-color 150ms ease;
}

[data-sonner-toaster] [data-sonner-toast] [data-close-button]:hover {
  opacity: 1;
  background: color-mix(in srgb, currentColor 12%, transparent) !important;
}

[data-sonner-toaster] [data-sonner-toast] [data-close-button] svg {
  width: 14px;
  height: 14px;
}
</style>
