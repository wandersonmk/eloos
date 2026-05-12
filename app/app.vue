<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { isDark, applyClass } = useTheme()
onMounted(() => applyClass(isDark.value))
</script>

<style>
html.dark {
  background-color: #020617;
  color-scheme: dark;
}
</style>
