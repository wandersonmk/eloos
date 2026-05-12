<template>
  <form
    :class="[
      'bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5',
      fullWidth ? 'w-full' : 'w-full max-w-md',
    ]"
    @submit.prevent="$emit('submit')"
    v-bind="$attrs"
  >
    <div v-if="title || description" class="flex flex-col gap-1">
      <h2 v-if="title" class="text-xl font-bold text-slate-800">{{ title }}</h2>
      <p v-if="description" class="text-sm text-slate-500">{{ description }}</p>
    </div>

    <slot />

    <div v-if="$slots.actions" class="flex items-center justify-end gap-3 pt-2">
      <slot name="actions" />
    </div>
  </form>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  fullWidth?: boolean
}>(), {
  fullWidth: false,
})

defineEmits<{ submit: [] }>()
</script>
