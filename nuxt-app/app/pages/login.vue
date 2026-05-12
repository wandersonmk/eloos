<template>
  <div class="h-dvh overflow-hidden flex bg-white">

    <!-- ══════════════════════════════════════
         LADO ESQUERDO — Animação + Conteúdo
    ══════════════════════════════════════ -->
    <div class="hidden lg:block relative w-[52%] shrink-0 overflow-hidden">
      <TechBackground />

      <div class="relative z-10 h-full flex flex-col justify-between p-12">

        <!-- Logo -->
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center">
            <svg class="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <span class="text-white text-lg font-semibold tracking-tight">Eloos</span>
        </div>

        <!-- Pitch principal -->
        <div class="flex flex-col gap-10 max-w-sm">

          <div class="flex flex-col gap-5">
            <h2 class="text-white text-[2rem] font-semibold leading-[1.25] tracking-tight">
              Gestão escolar que<br />simplifica seu dia a dia.
            </h2>
            <p class="text-white/50 text-sm leading-relaxed">
              Da matrícula à nota final, tudo em uma plataforma pensada para diretores, coordenadores e professores.
            </p>
          </div>

          <!-- Stats em linha — sem cards/bordas -->
          <div class="flex items-start gap-0">
            <div
              v-for="(stat, i) in stats"
              :key="stat.label"
              class="flex flex-col gap-1 flex-1"
              :class="i > 0 ? 'pl-6 border-l border-white/10' : ''"
            >
              <span class="text-white text-2xl font-semibold tracking-tight">{{ stat.value }}</span>
              <span class="text-white/40 text-xs leading-snug">{{ stat.label }}</span>
            </div>
          </div>

          <!-- Divisor -->
          <div class="h-px bg-white/10" />

          <!-- Features -->
          <div class="flex flex-col gap-3.5">
            <div
              v-for="feat in features"
              :key="feat.text"
              class="flex items-center gap-3"
            >
              <svg class="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span class="text-white/55 text-sm">{{ feat.text }}</span>
            </div>
          </div>

        </div>

        <p class="text-white/20 text-xs">© 2026 Eloos. Todos os direitos reservados.</p>
      </div>
    </div>

    <!-- ══════════════════════════════════════
         LADO DIREITO — Formulário
    ══════════════════════════════════════ -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <div class="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div class="w-full max-w-[360px] flex flex-col gap-7">

          <!-- Logo mobile -->
          <div class="flex lg:hidden justify-center">
            <span class="text-slate-900 text-xl font-semibold tracking-tight">Eloos</span>
          </div>

          <!-- Cabeçalho -->
          <div class="flex flex-col gap-1.5">
            <h1 class="text-2xl font-semibold text-slate-900 tracking-tight">
              {{ isLogin ? 'Bem-vindo de volta' : 'Criar sua conta' }}
            </h1>
            <p class="text-sm text-slate-500">
              {{ isLogin
                ? 'Entre com suas credenciais para continuar.'
                : 'Preencha os dados abaixo para começar.' }}
            </p>
          </div>

          <!-- Tabs -->
          <div class="flex rounded-lg bg-slate-100 p-1 gap-1">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              type="button"
              @click="isLogin = tab.key === 'login'"
              :class="[
                'flex-1 py-2 text-sm rounded-md font-normal transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
                (isLogin && tab.key === 'login') || (!isLogin && tab.key === 'register')
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Formulário -->
          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit" novalidate>

            <!-- Nome (cadastro) -->
            <div
              class="grid transition-all duration-200 ease-out"
              :class="isLogin ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'"
            >
              <div class="overflow-hidden">
                <div class="pb-1">
                  <BaseInput v-model="form.nome" label="Nome completo" placeholder="Ex: João Silva" autocomplete="name" />
                </div>
              </div>
            </div>

            <BaseInput
              v-model="form.email"
              label="E-mail institucional"
              type="email"
              placeholder="seu@escola.com.br"
              required
              autocomplete="email"
            />

            <div class="flex flex-col gap-1">
              <BaseInput
                v-model="form.senha"
                label="Senha"
                type="password"
                placeholder="••••••••"
                required
                :autocomplete="isLogin ? 'current-password' : 'new-password'"
              />
              <div v-if="isLogin" class="flex justify-end">
                <button type="button" class="text-xs text-indigo-600 hover:underline focus-visible:outline-none">
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            <!-- Confirmar senha (cadastro) -->
            <div
              class="grid transition-all duration-200 ease-out"
              :class="isLogin ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'"
            >
              <div class="overflow-hidden">
                <div class="pb-1">
                  <BaseInput v-model="form.confirmar" label="Confirmar senha" type="password" placeholder="••••••••" autocomplete="new-password" />
                </div>
              </div>
            </div>

            <!-- Termos (cadastro) -->
            <div
              class="grid transition-all duration-200 ease-out"
              :class="isLogin ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'"
            >
              <div class="overflow-hidden">
                <label class="flex items-start gap-2.5 cursor-pointer select-none pb-1">
                  <input
                    v-model="form.termos"
                    type="checkbox"
                    class="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
                  />
                  <span class="text-xs text-slate-500 leading-snug">
                    Li e concordo com os
                    <a href="#" class="text-indigo-600 hover:underline">Termos de uso</a>
                    e a
                    <a href="#" class="text-indigo-600 hover:underline">Política de privacidade</a>.
                  </span>
                </label>
              </div>
            </div>

            <BaseButton type="submit" block :loading="submitting" size="md" class="mt-1">
              {{ isLogin ? 'Entrar' : 'Criar conta' }}
            </BaseButton>

          </form>

          <!-- Alternância -->
          <p class="text-center text-sm text-slate-500">
            {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
            <button
              type="button"
              class="text-indigo-600 hover:underline font-normal ml-1 focus-visible:outline-none"
              @click="switchMode"
            >
              {{ isLogin ? 'Cadastre-se' : 'Entrar' }}
            </button>
          </p>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const isLogin = ref(true)
const submitting = ref(false)

const tabs = [
  { key: 'login',    label: 'Entrar'    },
  { key: 'register', label: 'Cadastrar' },
]

const stats = [
  { value: '500+',  label: 'Escolas cadastradas' },
  { value: '80k+',  label: 'Alunos gerenciados'  },
  { value: '99,9%', label: 'Uptime garantido'     },
]

const features = [
  { text: 'Controle de frequência e notas em tempo real' },
  { text: 'Gestão de turmas, professores e horários'     },
  { text: 'Comunicação integrada com responsáveis'       },
  { text: 'Relatórios e indicadores pedagógicos'         },
]

const form = reactive({
  nome: '',
  email: '',
  senha: '',
  confirmar: '',
  termos: false,
})

function resetForm() {
  form.nome = ''
  form.email = ''
  form.senha = ''
  form.confirmar = ''
  form.termos = false
}

function switchMode() {
  isLogin.value = !isLogin.value
  resetForm()
}

function handleSubmit() {
  submitting.value = true
  setTimeout(() => { submitting.value = false }, 2000)
}
</script>
