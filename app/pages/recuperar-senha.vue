<template>
  <div class="min-h-dvh flex bg-white">
    <!-- Lado esquerdo (igual ao login) -->
    <div class="hidden lg:block relative w-[52%] shrink-0 overflow-hidden">
      <TechBackground />
      <div class="relative z-10 h-full flex flex-col justify-between p-12">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center">
            <svg class="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
          </div>
          <span class="text-white text-lg font-semibold tracking-tight">Eloos</span>
        </div>

        <div class="flex flex-col gap-6 max-w-sm">
          <h2 class="text-white text-[2rem] font-semibold leading-[1.25] tracking-tight">
            Recupere o acesso<br />em poucos minutos.
          </h2>
          <p class="text-white/50 text-sm leading-relaxed">
            Enviaremos um link seguro para o seu e-mail institucional. Basta abrir e definir uma nova senha.
          </p>
          <div class="h-px bg-white/10" />
          <div class="flex flex-col gap-3.5">
            <div class="flex items-center gap-3"><span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center justify-center">1</span><span class="text-white/55 text-sm">Informe seu e-mail cadastrado</span></div>
            <div class="flex items-center gap-3"><span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center justify-center">2</span><span class="text-white/55 text-sm">Receba o link de redefinição</span></div>
            <div class="flex items-center gap-3"><span class="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center justify-center">3</span><span class="text-white/55 text-sm">Crie uma senha nova e segura</span></div>
          </div>
        </div>

        <p class="text-white/20 text-xs">© 2026 Eloos. Todos os direitos reservados.</p>
      </div>
    </div>

    <!-- Lado direito -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <div class="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div class="w-full max-w-[380px] flex flex-col gap-7">

          <div class="flex flex-col gap-1.5">
            <h1 class="text-2xl font-semibold text-slate-900 tracking-tight">
              {{ etapa === 'solicitar' ? 'Esqueceu sua senha?' : etapa === 'enviado' ? 'E-mail enviado' : 'Defina uma nova senha' }}
            </h1>
            <p class="text-sm text-slate-500">
              {{
                etapa === 'solicitar'
                  ? 'Informe o e-mail vinculado à sua conta e enviaremos um link de recuperação.'
                  : etapa === 'enviado'
                  ? `Enviamos as instruções para ${email}. Verifique sua caixa de entrada e spam.`
                  : 'Escolha uma senha forte que não use em outros lugares.'
              }}
            </p>
          </div>

          <!-- Estado: solicitar link -->
          <form v-if="etapa === 'solicitar'" class="flex flex-col gap-4" @submit.prevent="enviarLink" novalidate>
            <BaseInput
              v-model="email"
              label="E-mail institucional"
              type="email"
              placeholder="seu@escola.com.br"
              autocomplete="email"
            />
            <BaseButton type="submit" block size="md" :loading="enviando" :disabled="!emailValido">
              Enviar link de recuperação
            </BaseButton>
          </form>

          <!-- Estado: enviado -->
          <div v-else-if="etapa === 'enviado'" class="flex flex-col gap-4">
            <div class="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p class="text-sm text-emerald-700 leading-snug">O link é válido por 30 minutos. Se não receber em alguns minutos, verifique a pasta de spam.</p>
            </div>
            <BaseButton variant="outline" block size="md" @click="etapa = 'redefinir'">
              Já recebi — definir nova senha
            </BaseButton>
            <button type="button" class="text-xs text-slate-500 hover:text-slate-700 self-center" @click="enviarLink">Reenviar e-mail</button>
          </div>

          <!-- Estado: redefinir -->
          <form v-else class="flex flex-col gap-4" @submit.prevent="redefinir" novalidate>
            <BaseInput
              v-model="novaSenha"
              label="Nova senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              autocomplete="new-password"
              :hint="forcaSenha"
            />
            <BaseInput
              v-model="confirmar"
              label="Confirmar nova senha"
              type="password"
              placeholder="Digite novamente"
              autocomplete="new-password"
              :error="erroConfirmar"
            />
            <BaseButton type="submit" block size="md" :loading="enviando" :disabled="!redefinirValido">
              Salvar nova senha
            </BaseButton>
          </form>

          <p class="text-center text-sm text-slate-500">
            <NuxtLink to="/login" class="text-indigo-600 hover:underline">Voltar para o login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ auth: false, layout: false })

const etapa = ref<'solicitar' | 'enviado' | 'redefinir'>('solicitar')
const email = ref('')
const novaSenha = ref('')
const confirmar = ref('')
const enviando = ref(false)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const emailValido = computed(() => EMAIL_REGEX.test(email.value.trim()))

const forcaSenha = computed(() => {
  const s = novaSenha.value
  if (!s) return 'Use ao menos 8 caracteres, com letras e números.'
  if (s.length < 8) return 'Muito curta — use 8 caracteres ou mais.'
  if (!/[A-Z]/.test(s)) return 'Boa — adicione uma letra maiúscula para deixar mais forte.'
  if (!/\d/.test(s))    return 'Boa — adicione um número para deixar mais forte.'
  return 'Senha forte. ✓'
})

const erroConfirmar = computed(() => {
  if (confirmar.value.length === 0) return ''
  return novaSenha.value === confirmar.value ? '' : 'As senhas não coincidem.'
})

const redefinirValido = computed(() =>
  novaSenha.value.length >= 8 && novaSenha.value === confirmar.value,
)

async function enviarLink() {
  if (!emailValido.value) return
  enviando.value = true
  try {
    await new Promise(r => setTimeout(r, 900)) // mock
    toast.success('Link enviado!', { description: email.value })
    etapa.value = 'enviado'
  } finally {
    enviando.value = false
  }
}

async function redefinir() {
  if (!redefinirValido.value) return
  enviando.value = true
  try {
    await new Promise(r => setTimeout(r, 900)) // mock
    toast.success('Senha redefinida com sucesso!')
    await navigateTo('/login')
  } finally {
    enviando.value = false
  }
}
</script>
