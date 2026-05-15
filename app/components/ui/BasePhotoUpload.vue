<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-[12px] font-medium text-slate-600 dark:text-slate-300 leading-none">{{ label }}</label>

    <div class="flex items-center gap-3">
      <div
        :class="[
          'relative w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden shrink-0',
          preview ? 'border-transparent' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800',
        ]"
      >
        <img v-if="preview" :src="preview" class="w-full h-full object-cover" alt="Foto do aluno" />
        <svg v-else class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
        </svg>
        <button
          v-if="preview"
          type="button"
          @click="clear"
          class="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="flex flex-col gap-1.5">
        <div class="flex gap-1.5">
          <button
            type="button"
            @click="openFileDialog"
            class="px-2.5 h-8 text-[12px] rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
            Carregar
          </button>
          <button
            type="button"
            @click="openCamera"
            class="px-2.5 h-8 text-[12px] rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.822 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/></svg>
            Câmera
          </button>
        </div>
        <p class="text-[11px] text-slate-400 dark:text-slate-500">JPG ou PNG, até 5MB</p>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onFileChange"
    />
    <input
      ref="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | null
  label?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const fileInput   = ref<HTMLInputElement>()
const cameraInput = ref<HTMLInputElement>()

const preview = computed(() => props.modelValue ?? null)

function openFileDialog() { fileInput.value?.click() }
function openCamera()     { cameraInput.value?.click() }

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => emit('update:modelValue', reader.result as string)
  reader.readAsDataURL(file)
}

function clear() {
  emit('update:modelValue', null)
  if (fileInput.value)   fileInput.value.value = ''
  if (cameraInput.value) cameraInput.value.value = ''
}
</script>
