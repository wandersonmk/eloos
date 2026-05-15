<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-950">

    <!-- ══════════════════════════════════
         SIDEBAR
    ══════════════════════════════════ -->
    <aside class="hidden lg:flex flex-col w-64 shrink-0 bg-slate-900 h-screen sticky top-0 border-r border-transparent dark:border-slate-700/60">
      <NuxtLink to="/" class="flex items-center gap-2.5 px-5 h-16 border-b border-slate-800 shrink-0">
        <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
        </div>
        <span class="text-white text-base font-semibold tracking-tight">Eloos</span>
      </NuxtLink>

      <nav class="sidebar-scroll flex flex-col gap-0.5 px-3 py-4 flex-1 overflow-y-auto">

        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">Principal</p>

        <!-- Dashboard -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
          :class="isActive('/') ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
          Dashboard
        </NuxtLink>

        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mt-5 mb-2">Cadastros</p>

        <!-- Grupo: Alunos -->
        <div>
          <button
            type="button"
            @click="toggle('alunos')"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
            :class="isGroupActive(['/alunos', '/responsaveis', '/matriculas']) ? 'text-white' : ''"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
            <span class="flex-1 text-left">Alunos</span>
            <svg class="w-3.5 h-3.5 transition-transform" :class="open.alunos ? 'rotate-90' : ''" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
          <div v-if="open.alunos" class="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l border-slate-800 pl-3">
            <NuxtLink to="/alunos" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/alunos') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Listagem</NuxtLink>
            <NuxtLink to="/alunos/novo" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/alunos/novo') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Novo aluno</NuxtLink>
            <NuxtLink to="/responsaveis" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/responsaveis') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Responsáveis</NuxtLink>
            <NuxtLink to="/matriculas" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/matriculas') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Matrículas</NuxtLink>
          </div>
        </div>

        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mt-5 mb-2">Operações</p>

        <!-- Grupo: Financeiro -->
        <div>
          <button
            type="button"
            @click="toggle('financeiro')"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
            :class="isGroupActive(['/financeiro']) ? 'text-white' : ''"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg>
            <span class="flex-1 text-left">Financeiro</span>
            <svg class="w-3.5 h-3.5 transition-transform" :class="open.financeiro ? 'rotate-90' : ''" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
          <div v-if="open.financeiro" class="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l border-slate-800 pl-3">
            <NuxtLink to="/financeiro/receber" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/financeiro/receber') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Contas a receber</NuxtLink>
            <NuxtLink to="/financeiro/pagar" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/financeiro/pagar') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Contas a pagar</NuxtLink>
            <NuxtLink to="/financeiro/caixa" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/financeiro/caixa') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Caixa e bancos</NuxtLink>
          </div>
        </div>

        <!-- Grupo: Acadêmico -->
        <div>
          <button
            type="button"
            @click="toggle('academico')"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
            :class="isGroupActive(['/academico']) ? 'text-white' : ''"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
            <span class="flex-1 text-left">Acadêmico</span>
            <svg class="w-3.5 h-3.5 transition-transform" :class="open.academico ? 'rotate-90' : ''" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
          <div v-if="open.academico" class="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l border-slate-800 pl-3">
            <NuxtLink to="/academico/diario" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/academico/diario') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Diário de classe</NuxtLink>
            <NuxtLink to="/academico/chamada" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/academico/chamada') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Chamada</NuxtLink>
            <NuxtLink to="/academico/notas" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/academico/notas') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Lançamento de notas</NuxtLink>
            <NuxtLink to="/academico/boletim" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/academico/boletim') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Boletim</NuxtLink>
          </div>
        </div>

        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mt-5 mb-2">Portais</p>

        <!-- Grupo: Portal (Aluno/Responsável) -->
        <div>
          <button
            type="button"
            @click="toggle('portal')"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
            :class="isGroupActive(['/portal']) ? 'text-white' : ''"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
            <span class="flex-1 text-left">Aluno / Responsável</span>
            <svg class="w-3.5 h-3.5 transition-transform" :class="open.portal ? 'rotate-90' : ''" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
          <div v-if="open.portal" class="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l border-slate-800 pl-3">
            <NuxtLink to="/portal" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/portal') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Dashboard portal</NuxtLink>
            <NuxtLink to="/portal/financeiro" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/portal/financeiro') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Extrato financeiro</NuxtLink>
            <NuxtLink to="/portal/boletim" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/portal/boletim') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Boletim</NuxtLink>
            <NuxtLink to="/portal/agenda" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/portal/agenda') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Agenda e comunicados</NuxtLink>
          </div>
        </div>

        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mt-5 mb-2">Sistema</p>

        <!-- Grupo: Configurações -->
        <div>
          <button
            type="button"
            @click="toggle('configuracoes')"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
            :class="isGroupActive(['/unidades', '/usuarios', '/turmas']) ? 'text-white' : ''"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span class="flex-1 text-left">Configurações</span>
            <svg class="w-3.5 h-3.5 transition-transform" :class="open.configuracoes ? 'rotate-90' : ''" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
          <div v-if="open.configuracoes" class="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l border-slate-800 pl-3">
            <NuxtLink to="/unidades" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/unidades') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Unidades</NuxtLink>
            <NuxtLink to="/usuarios" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/usuarios') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Usuários</NuxtLink>
            <NuxtLink to="/turmas" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/turmas') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Turmas</NuxtLink>
            <NuxtLink to="/tabelas-preco" class="px-3 py-1.5 rounded-md text-[13px] transition-colors" :class="isActive('/tabelas-preco') ? 'text-indigo-400 bg-slate-800/60' : 'text-slate-500 hover:text-white'">Tabelas de preço</NuxtLink>
          </div>
        </div>
      </nav>

      <div class="flex items-center gap-3 px-4 py-4 border-t border-slate-800 shrink-0">
        <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">{{ userInitials }}</div>
        <div class="flex flex-col min-w-0 flex-1">
          <span class="text-white text-xs font-medium truncate">{{ userName }}</span>
          <span class="text-slate-500 text-[11px] truncate">{{ userEmail }}</span>
        </div>
        <button
          @click="logout"
          :disabled="loggingOut"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
          aria-label="Sair da conta"
          title="Sair"
        >
          <svg v-if="!loggingOut" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <svg v-else class="w-[18px] h-[18px] animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8H4z" />
          </svg>
        </button>
      </div>
    </aside>

    <!-- ══════════════════════════════════
         CONTEÚDO
    ══════════════════════════════════ -->
    <div class="flex flex-col flex-1 min-w-0">

      <!-- Topbar -->
      <header class="flex items-center justify-between px-6 h-16 border-b sticky top-0 z-10 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <div>
          <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ greeting }}, {{ userFirstName }}</p>
          <p class="text-xs capitalize text-slate-400 dark:text-slate-500">{{ currentDate }}</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 w-48 transition-colors duration-200 bg-slate-100 dark:bg-slate-700">
            <svg class="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
            <span class="text-sm text-slate-400 dark:text-slate-500">Buscar...</span>
          </div>

          <button
            @click="toggleTheme"
            class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 text-slate-500 hover:bg-slate-100 dark:text-amber-400 dark:hover:bg-slate-700"
            :aria-label="isDark ? 'Modo claro' : 'Modo escuro'"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"/>
              <path stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
          </button>

          <button class="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <main class="flex-1 px-6 py-6 pb-16">
        <slot />
      </main>

      <!-- ══════════════════════════════════
           FOOTER — fixo na base
      ══════════════════════════════════ -->
      <footer class="fixed bottom-0 left-0 right-0 lg:left-64 z-20 h-12 border-t border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900">
        <div class="h-full px-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[11px] text-slate-500 dark:text-slate-400 text-center">
          <p>© {{ new Date().getFullYear() }} Todos os direitos reservados — <span class="font-medium text-slate-700 dark:text-slate-200">Eloos</span></p>
          <span class="hidden sm:inline text-slate-300 dark:text-slate-600">·</span>
          <p>
            Criado por
            <span class="font-medium text-slate-700 dark:text-slate-200">Agzap Systems</span>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const { isDark, toggle: toggleTheme } = useTheme()
const route = useRoute()

const supabase = useSupabaseClient()
const user     = useSupabaseUser()

const loggingOut = ref(false)

const open = reactive<Record<'configuracoes' | 'alunos' | 'financeiro' | 'academico' | 'portal', boolean>>({
  configuracoes: false,
  alunos:        false,
  financeiro:    false,
  academico:     false,
  portal:        false,
})

function toggle(key: keyof typeof open) {
  open[key] = !open[key]
}

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path === path
}

function isGroupActive(paths: string[]): boolean {
  return paths.some(p => route.path === p || route.path.startsWith(p + '/'))
}

// Abre o grupo correspondente à rota ativa ao carregar / navegar
watchEffect(() => {
  const p = route.path
  if (p.startsWith('/unidades') || p.startsWith('/usuarios') || p.startsWith('/turmas') || p.startsWith('/tabelas-preco')) open.configuracoes = true
  if (p.startsWith('/alunos') || p.startsWith('/responsaveis') || p.startsWith('/matriculas')) open.alunos = true
  if (p.startsWith('/financeiro')) open.financeiro = true
  if (p.startsWith('/academico')) open.academico = true
  if (p.startsWith('/portal')) open.portal = true
})

const { data: profile } = await useAsyncData(
  'user-profile',
  async () => {
    if (!user.value) return null
    const { data, error } = await supabase
      .from('profiles')
      .select('nome, email')
      .eq('id', user.value.id)
      .maybeSingle()
    if (error) {
      console.error('Erro ao carregar perfil:', error)
      return null
    }
    return data as { nome: string; email: string } | null
  },
  { watch: [user] },
)

const userName  = computed(
  () => profile.value?.nome
     ?? (user.value?.user_metadata?.nome as string | undefined)
     ?? 'Usuário',
)
const userEmail = computed(() => profile.value?.email ?? user.value?.email ?? '')
const userFirstName = computed(() => userName.value.trim().split(/\s+/)[0] || 'Usuário')

const userInitials = computed(() => {
  const partes = userName.value.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return 'U'
  if (partes.length === 1) return partes[0]!.slice(0, 2).toUpperCase()
  return (partes[0]![0]! + partes[partes.length - 1]![0]!).toUpperCase()
})

async function logout() {
  if (loggingOut.value) return
  loggingOut.value = true
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    toast.success('Você saiu da sua conta.')
    await navigateTo('/login')
  } catch (e: any) {
    toast.error('Não foi possível sair. Tente novamente.')
    console.error(e)
  } finally {
    loggingOut.value = false
  }
}

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
})

const currentDate = computed(() =>
  new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
)
</script>

<style scoped>
/* Scrollbar combinando com o fundo escuro da sidebar (slate-900) */
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgb(51 65 85) transparent; /* thumb slate-700 / track transparent */
}
.sidebar-scroll::-webkit-scrollbar {
  width: 6px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(51 65 85); /* slate-700 */
  border-radius: 9999px;
}
.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgb(71 85 105); /* slate-600 */
}
</style>
