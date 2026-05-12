<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-slate-950">

    <!-- ══════════════════════════════════
         SIDEBAR
    ══════════════════════════════════ -->
    <aside class="hidden lg:flex flex-col w-60 shrink-0 bg-slate-900 min-h-screen sticky top-0 border-r border-transparent dark:border-slate-700/60">
      <div class="flex items-center gap-2.5 px-5 h-16 border-b border-slate-800 shrink-0">
        <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
        </div>
        <span class="text-white text-base font-semibold tracking-tight">Eloos</span>
      </div>

      <nav class="flex flex-col gap-1 px-3 py-4 flex-1">
        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">Principal</p>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-indigo-600 text-white">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
          Dashboard
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
          Alunos
          <span class="ml-auto text-[10px] font-semibold bg-red-500 text-white rounded-full px-1.5 py-0.5 leading-none">12</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
          Acadêmico
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg>
          Financeiro
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
          Comunicação
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
          Agenda
        </a>
        <p class="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-2 mt-5 mb-2">Sistema</p>
        <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Configurações
        </a>
      </nav>

      <div class="flex items-center gap-3 px-4 py-4 border-t border-slate-800 shrink-0">
        <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">AD</div>
        <div class="flex flex-col min-w-0 flex-1">
          <span class="text-white text-xs font-medium truncate">Administrador</span>
          <span class="text-slate-500 text-[11px] truncate">admin@escola.com.br</span>
        </div>
        <button class="text-slate-500 hover:text-white transition-colors shrink-0" aria-label="Sair">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
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
          <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ greeting }}, Administrador</p>
          <p class="text-xs capitalize text-slate-400 dark:text-slate-500">{{ currentDate }}</p>
        </div>

        <div class="flex items-center gap-2">
          <!-- Busca -->
          <div class="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 w-48 transition-colors duration-200 bg-slate-100 dark:bg-slate-700">
            <svg class="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
            <span class="text-sm text-slate-400 dark:text-slate-500">Buscar...</span>
          </div>

          <!-- Toggle dark/light -->
          <button
            @click="toggle"
            class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 text-slate-500 hover:bg-slate-100 dark:text-amber-400 dark:hover:bg-slate-700"
            :aria-label="isDark ? 'Modo claro' : 'Modo escuro'"
          >
            <!-- Sol (dark → light) -->
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"/>
              <path stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <!-- Lua (light → dark) -->
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
            </svg>
          </button>

          <!-- Notificações -->
          <button class="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      <!-- Main -->
      <main class="flex-1 px-6 py-6">
        <div class="flex flex-col gap-6">

          <!-- KPI Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <div class="rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <div class="flex items-start justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Total de Alunos</span>
                <div class="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
                </div>
              </div>
              <div>
                <p class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">342</p>
                <p class="text-xs text-emerald-500 mt-0.5">↑ 12 novos este mês</p>
              </div>
            </div>

            <div class="rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <div class="flex items-start justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Receita do Mês</span>
                <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg>
                </div>
              </div>
              <div>
                <p class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">R$ 48.750</p>
                <p class="text-xs text-emerald-500 mt-0.5">↑ 3,2% vs. mês anterior</p>
              </div>
            </div>

            <div class="rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <div class="flex items-start justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Despesas</span>
                <div class="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
                </div>
              </div>
              <div>
                <p class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">R$ 31.200</p>
                <p class="text-xs text-red-500 mt-0.5">↑ 1,8% vs. mês anterior</p>
              </div>
            </div>

            <div class="rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <div class="flex items-start justify-between">
                <span class="text-sm text-slate-500 dark:text-slate-400">Inadimplentes</span>
                <div class="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
                </div>
              </div>
              <div>
                <p class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">23 alunos</p>
                <p class="text-xs mt-0.5 text-slate-400 dark:text-slate-500">— 6,7% da base total</p>
              </div>
            </div>

          </div>

          <!-- Gráfico + Alertas -->
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

            <div class="xl:col-span-2 rounded-xl overflow-hidden border transition-colors duration-200 border-slate-200 dark:border-slate-700" style="height: 260px;">
              <ChartArea />
            </div>

            <!-- Alertas -->
            <div class="rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">Alertas do Sistema</p>
              <div class="flex flex-col gap-4">
                <div class="flex items-start gap-3">
                  <span class="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                  <div>
                    <p class="text-xs leading-snug text-slate-700 dark:text-slate-200">23 alunos com mensalidade em atraso há mais de 15 dias.</p>
                    <p class="text-[10px] mt-0.5 text-slate-400 dark:text-slate-500">Agora</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                  <div>
                    <p class="text-xs leading-snug text-slate-700 dark:text-slate-200">5 matrículas aguardam aprovação de documentação.</p>
                    <p class="text-[10px] mt-0.5 text-slate-400 dark:text-slate-500">Há 2 horas</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  <div>
                    <p class="text-xs leading-snug text-slate-700 dark:text-slate-200">Reunião de pais agendada para 20/05.</p>
                    <p class="text-[10px] mt-0.5 text-slate-400 dark:text-slate-500">Há 1 dia</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <div>
                    <p class="text-xs leading-snug text-slate-700 dark:text-slate-200">Backup do sistema realizado com sucesso.</p>
                    <p class="text-[10px] mt-0.5 text-slate-400 dark:text-slate-500">Há 3 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Visão Geral + Atividade -->
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

            <div class="rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">Visão Geral</p>
              <div class="flex flex-col gap-3">

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center"><svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg></div>
                    <span class="text-sm text-slate-600 dark:text-slate-300">Turmas Ativas</span>
                  </div>
                  <span class="text-sm font-semibold text-slate-900 dark:text-white">18</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg></div>
                    <span class="text-sm text-slate-600 dark:text-slate-300">Professores</span>
                  </div>
                  <span class="text-sm font-semibold text-slate-900 dark:text-white">24</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center"><svg class="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg></div>
                    <span class="text-sm text-slate-600 dark:text-slate-300">Novos este mês</span>
                  </div>
                  <span class="text-sm font-semibold text-slate-900 dark:text-white">12</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center"><svg class="w-4 h-4 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg></div>
                    <span class="text-sm text-slate-600 dark:text-slate-300">Eventos na semana</span>
                  </div>
                  <span class="text-sm font-semibold text-slate-900 dark:text-white">3</span>
                </div>
              </div>
            </div>

            <!-- Atividade recente -->
            <div class="xl:col-span-2 rounded-xl border p-5 flex flex-col gap-4 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">Atividade Recente</p>
                <button class="text-xs text-indigo-500 hover:underline">Ver tudo</button>
              </div>
              <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">

                <div class="flex items-center gap-3 py-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-xs truncate text-slate-700 dark:text-slate-200">Matrícula de Lucas Fernandes realizada — 3º Ano A</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500">Há 15 min</span>
                  </div>
                  <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 shrink-0">Matrícula</span>
                </div>

                <div class="flex items-center gap-3 py-3">
                  <div class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg></div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-xs truncate text-slate-700 dark:text-slate-200">Mensalidade de R$ 850 recebida — Maria Souza</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500">Há 42 min</span>
                  </div>
                  <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 shrink-0">Financeiro</span>
                </div>

                <div class="flex items-center gap-3 py-3">
                  <div class="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg></div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-xs truncate text-slate-700 dark:text-slate-200">Ocorrência registrada — João Pedro, 2º Ano B</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500">Há 1 hora</span>
                  </div>
                  <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">Ocorrência</span>
                </div>

                <div class="flex items-center gap-3 py-3">
                  <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg></div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-xs truncate text-slate-700 dark:text-slate-200">Novo professor cadastrado — Ana Clara Mendes</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500">Há 3 horas</span>
                  </div>
                  <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">Usuário</span>
                </div>

                <div class="flex items-center gap-3 py-3">
                  <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg></div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <span class="text-xs truncate text-slate-700 dark:text-slate-200">Comunicado enviado para responsáveis do 1º Ano</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500">Ontem</span>
                  </div>
                  <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 shrink-0">Comunicado</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()

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
