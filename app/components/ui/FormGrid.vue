<template>
  <div :class="['grid gap-3', colClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ cols?: 1 | 2 | 3 | 4 | 6 }>(), { cols: 2 })

const colClass = computed(() => {
  switch (props.cols) {
    case 1: return 'grid-cols-1'
    case 2: return 'grid-cols-1 sm:grid-cols-2'
    case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    case 6: return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
  }
})
</script>
