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
        <div class="w-full max-w-[380px] flex flex-col gap-7">

          <!-- Logo mobile -->
          <div class="flex lg:hidden justify-center">
            <span class="text-slate-900 text-xl font-semibold tracking-tight">Eloos</span>
          </div>

          <!-- Cabeçalho -->
          <div class="flex flex-col gap-1.5">
            <h1 class="text-2xl font-semibold text-slate-900 tracking-tight">
              {{ tituloCabecalho }}
            </h1>
            <p class="text-sm text-slate-500">
              {{ subtituloCabecalho }}
            </p>
          </div>

          <!-- Stepper (visível apenas no cadastro) -->
          <div v-if="!isLogin" class="flex items-center gap-2 pt-1">
            <!-- Etapa 1 -->
            <div class="flex flex-col items-center gap-1.5 shrink-0">
              <div
                :class="[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  step === 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-700',
                ]"
              >
                <svg v-if="step > 1" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span v-else>1</span>
              </div>
              <span class="text-[10px] font-medium text-slate-600 whitespace-nowrap">Você</span>
            </div>

            <!-- Linha conectora -->
            <div class="flex-1 h-px bg-slate-200 mb-5 relative overflow-hidden">
              <div
                class="absolute inset-y-0 left-0 bg-indigo-600 transition-all duration-300"
                :class="step > 1 ? 'w-full' : 'w-0'"
              />
            </div>

            <!-- Etapa 2 -->
            <div class="flex flex-col items-center gap-1.5 shrink-0">
              <div
                :class="[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  step === 2
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-400',
                ]"
              >
                2
              </div>
              <span
                class="text-[10px] font-medium whitespace-nowrap"
                :class="step === 2 ? 'text-slate-600' : 'text-slate-400'"
              >
                Escola
              </span>
            </div>
          </div>

          <!-- Formulário -->
          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit" novalidate>

            <!-- ═════════ LOGIN ═════════ -->
            <template v-if="isLogin">
              <BaseInput
                v-model="form.email"
                label="E-mail institucional"
                type="email"
                placeholder="seu@escola.com.br"
                autocomplete="email"
              />

              <div class="flex flex-col gap-1">
                <BaseInput
                  v-model="form.senha"
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  autocomplete="current-password"
                />
                <div class="flex justify-end">
                  <NuxtLink to="/recuperar-senha" class="text-xs text-indigo-600 hover:underline focus-visible:outline-none">
                    Esqueceu a senha?
                  </NuxtLink>
                </div>
              </div>
            </template>

            <!-- ═════════ CADASTRO — ETAPA 1: ADMIN ═════════ -->
            <template v-if="!isLogin && step === 1">
              <BaseInput
                v-model="form.nome"
                label="Nome completo"
                placeholder="Ex: João Silva"
                autocomplete="name"
              />
              <BaseInput
                :model-value="form.whatsapp"
                @update:model-value="form.whatsapp = mascararTelefone($event)"
                label="WhatsApp"
                type="tel"
                placeholder="(11) 99999-0000"
                autocomplete="tel"
              />
              <BaseInput
                v-model="form.email"
                label="E-mail institucional"
                type="email"
                placeholder="seu@escola.com.br"
                autocomplete="email"
              />
              <BaseInput
                v-model="form.senha"
                label="Senha"
                type="password"
                placeholder="Mínimo 6 caracteres"
                autocomplete="new-password"
              />
              <BaseInput
                v-model="form.confirmar"
                label="Confirmar senha"
                type="password"
                placeholder="Digite novamente"
                autocomplete="new-password"
                :error="erroConfirmarSenha"
              />
            </template>

            <!-- ═════════ CADASTRO — ETAPA 2: ESCOLA ═════════ -->
            <template v-if="!isLogin && step === 2">
              <BaseInput
                v-model="form.nome_escola"
                label="Nome da escola"
                placeholder="Ex: Colégio Exemplo"
              />
              <BaseInput
                :model-value="form.cnpj"
                @update:model-value="form.cnpj = mascararCNPJ($event)"
                label="CNPJ"
                placeholder="00.000.000/0000-00"
                :error="erroCNPJ"
              />
              <BaseInput
                :model-value="form.telefone_escola"
                @update:model-value="form.telefone_escola = mascararTelefone($event)"
                label="Telefone comercial"
                type="tel"
                placeholder="(11) 3000-0000"
              />
              <BaseInput
                :model-value="form.cep"
                @update:model-value="form.cep = mascararCEP($event)"
                label="CEP"
                placeholder="00000-000"
                autocomplete="postal-code"
                :hint="buscandoCep
                  ? 'Buscando endereço…'
                  : 'Rua e bairro serão preenchidos automaticamente.'"
              />
              <div class="grid grid-cols-[1fr_90px] gap-3">
                <BaseInput
                  v-model="form.logradouro"
                  label="Rua / Logradouro"
                  placeholder="Av. Paulista"
                  autocomplete="address-line1"
                />
                <BaseInput
                  v-model="form.numero"
                  label="Número"
                  placeholder="1500"
                  autocomplete="address-line2"
                />
              </div>
              <BaseInput
                v-model="form.bairro"
                label="Bairro"
                placeholder="Centro"
                autocomplete="address-level3"
              />
            </template>

            <!-- Botões -->
            <div class="flex flex-col gap-2 mt-1">
              <!-- Login -->
              <BaseButton
                v-if="isLogin"
                type="submit"
                block
                :loading="submitting"
                :disabled="!loginValido"
                size="md"
              >
                Entrar
              </BaseButton>

              <!-- Cadastro etapa 1 — Continuar -->
              <BaseButton
                v-if="!isLogin && step === 1"
                type="submit"
                block
                :disabled="!step1Valido"
                size="md"
              >
                Continuar
              </BaseButton>

              <!-- Cadastro etapa 2 — Voltar + Criar conta -->
              <div v-if="!isLogin && step === 2" class="grid grid-cols-[auto_1fr] gap-2">
                <BaseButton
                  type="button"
                  variant="ghost"
                  size="md"
                  :disabled="submitting"
                  @click="step = 1"
                >
                  Voltar
                </BaseButton>
                <BaseButton
                  type="submit"
                  block
                  :loading="submitting"
                  :disabled="!step2Valido"
                  size="md"
                >
                  Criar conta
                </BaseButton>
              </div>
            </div>

          </form>

          <!-- Alternância -->
          <p class="text-center text-sm text-slate-500">
            {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
            <button
              type="button"
              class="text-indigo-600 hover:underline font-normal ml-1 focus-visible:outline-none"
              @click="trocarModo(!isLogin)"
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
import { toast } from 'vue-sonner'

definePageMeta({ auth: false, layout: false })

const supabase = useSupabaseClient()

const isLogin    = ref(true)
const step       = ref<1 | 2>(1)
const submitting = ref(false)

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
  // admin
  nome: '',
  whatsapp: '',
  email: '',
  senha: '',
  confirmar: '',
  // escola
  nome_escola: '',
  cnpj: '',
  telefone_escola: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
})

// Cidade/UF preenchidos pelo ViaCEP em background — enviados ao banco mas não exibidos
const cidadeEscola = ref('')
const estadoEscola = ref('')

const buscandoCep = ref(false)

// ────────────────────────── Máscaras ──────────────────────────
function mascararTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0)  return ''
  if (d.length <= 2)   return `(${d}`
  if (d.length <= 6)   return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10)  return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function mascararCNPJ(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 14)
  if (d.length === 0)  return ''
  if (d.length <= 2)   return d
  if (d.length <= 5)   return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8)   return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12)  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

function mascararCEP(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 5) return d
  return `${d.slice(0, 5)}-${d.slice(5)}`
}

// ─────────────────────── Validação real de CNPJ ───────────────────────
function validarCNPJ(cnpj: string): boolean {
  const d = cnpj.replace(/\D/g, '')
  if (d.length !== 14) return false
  if (/^(\d)\1+$/.test(d)) return false // rejeita 00000000000000, 11111111111111…

  const calcularDV = (base: string): number => {
    let soma = 0
    let peso = base.length - 7
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]!, 10) * peso
      peso = peso === 2 ? 9 : peso - 1
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const dv1 = calcularDV(d.slice(0, 12))
  if (dv1 !== parseInt(d[12]!, 10)) return false

  const dv2 = calcularDV(d.slice(0, 13))
  return dv2 === parseInt(d[13]!, 10)
}

// ─────────────────────── Integração ViaCEP ───────────────────────
async function buscarCep(cep: string) {
  const d = cep.replace(/\D/g, '')
  if (d.length !== 8) return

  buscandoCep.value = true
  try {
    const res = await fetch(`https://viacep.com.br/ws/${d}/json/`)
    if (!res.ok) throw new Error('Falha de rede')
    const data = await res.json()

    if (data.erro) {
      toast.error('CEP não encontrado. Preencha o endereço manualmente.')
      cidadeEscola.value = ''
      estadoEscola.value = ''
      return
    }

    form.logradouro    = data.logradouro ?? ''
    form.bairro        = data.bairro     ?? ''
    cidadeEscola.value = data.localidade ?? ''
    estadoEscola.value = data.uf         ?? ''
  } catch {
    toast.error('Erro ao consultar CEP. Preencha o endereço manualmente.')
    cidadeEscola.value = ''
    estadoEscola.value = ''
  } finally {
    buscandoCep.value = false
  }
}

// Dispara a busca quando o CEP estiver completo (8 dígitos)
watch(() => form.cep, (novo) => {
  if (novo.replace(/\D/g, '').length === 8) buscarCep(novo)
})

const tituloCabecalho = computed(() => {
  if (isLogin.value)   return 'Bem-vindo de volta'
  if (step.value === 1) return 'Crie seu acesso'
  return 'Sobre a sua escola'
})

const subtituloCabecalho = computed(() => {
  if (isLogin.value)    return 'Entre com suas credenciais para continuar.'
  if (step.value === 1) return 'Comece informando os dados do administrador.'
  return 'Agora os dados da escola que você vai gerenciar.'
})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const emailValido = computed(() => EMAIL_REGEX.test(form.email.trim()))

const loginValido = computed(() => emailValido.value && form.senha.length > 0)

const step1Valido = computed(() =>
  form.nome.trim().length                  >= 2 &&
  form.whatsapp.replace(/\D/g, '').length  >= 10 &&
  emailValido.value                              &&
  form.senha.length                        >= 6 &&
  form.senha === form.confirmar,
)

// Erro inline mostrado no input "Confirmar senha" enquanto o usuário digita
const erroConfirmarSenha = computed(() => {
  if (form.confirmar.length === 0) return ''
  if (form.senha === form.confirmar) return ''
  return 'As senhas não coincidem.'
})

const step2Valido = computed(() =>
  form.nome_escola.trim().length                  >= 2 &&
  validarCNPJ(form.cnpj)                                &&
  form.telefone_escola.replace(/\D/g, '').length  >= 10 &&
  form.cep.replace(/\D/g, '').length              === 8 &&
  form.logradouro.trim().length                   >= 2 &&
  form.numero.trim().length                       >= 1 &&
  form.bairro.trim().length                       >= 2,
)

// Erro inline mostrado no input CNPJ enquanto o usuário digita
const erroCNPJ = computed(() => {
  const d = form.cnpj.replace(/\D/g, '')
  if (d.length < 14) return ''
  return validarCNPJ(form.cnpj) ? '' : 'CNPJ inválido.'
})

function resetForm() {
  form.nome = ''
  form.whatsapp = ''
  form.email = ''
  form.senha = ''
  form.confirmar = ''
  form.nome_escola = ''
  form.cnpj = ''
  form.telefone_escola = ''
  form.cep = ''
  form.logradouro = ''
  form.numero = ''
  form.bairro = ''
  cidadeEscola.value = ''
  estadoEscola.value = ''
  step.value = 1
}

function trocarModo(login: boolean) {
  isLogin.value = login
  resetForm()
}

function traduzirErro(msg: string): string {
  if (msg.includes('Invalid login credentials'))  return 'E-mail ou senha incorretos.'
  if (msg.includes('Email not confirmed'))         return 'Confirme seu e-mail antes de entrar.'
  if (msg.includes('User already registered'))     return 'Este e-mail já está cadastrado.'
  if (msg.includes('already registered'))          return 'Este e-mail já está cadastrado.'
  if (msg.includes('Password should be'))          return 'A senha deve ter pelo menos 6 caracteres.'
  if (msg.includes('Unable to validate'))          return 'Credenciais inválidas. Tente novamente.'
  return 'Ocorreu um erro. Tente novamente.'
}

async function handleSubmit() {
  if (isLogin.value) {
    if (!loginValido.value) return
    submitting.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.senha,
      })
      if (error) throw error
      toast.success('Bem-vindo de volta!')
      await navigateTo('/')
    } catch (e: any) {
      toast.error(traduzirErro(e?.message ?? ''))
    } finally {
      submitting.value = false
    }
    return
  }

  // Cadastro — etapa 1: apenas avança
  if (step.value === 1) {
    if (!step1Valido.value) return
    step.value = 2
    return
  }

  // Cadastro — etapa 2: cria a conta (auth + profile + escola via trigger)
  if (!step2Valido.value) return
  submitting.value = true
  try {
    const { error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.senha,
      options: {
        data: {
          nome:            form.nome.trim(),
          whatsapp:        form.whatsapp.trim(),
          nome_escola:     form.nome_escola.trim(),
          cnpj:            form.cnpj.trim(),
          telefone_escola: form.telefone_escola.trim(),
          cep:             form.cep.trim(),
          logradouro:      form.logradouro.trim(),
          numero:          form.numero.trim(),
          bairro:          form.bairro.trim(),
          cidade:          cidadeEscola.value,
          estado:          estadoEscola.value,
        },
      },
    })
    if (error) throw error
    toast.success('Conta criada com sucesso!', {
      description: `Sua escola "${form.nome_escola.trim()}" já está pronta para uso.`,
    })
    await navigateTo('/')
  } catch (e: any) {
    toast.error(traduzirErro(e?.message ?? ''))
  } finally {
    submitting.value = false
  }
}
</script>
