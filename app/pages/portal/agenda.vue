<template>
  <div class="flex flex-col gap-6">

    <div class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Agenda e Comunicados</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Eventos, reuniões, cardápio e avisos da escola.</p>
      </div>
      <BaseButton variant="outline" size="md">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"/></svg>
        Inscrever no Google Agenda
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

      <!-- Calendário -->
      <article class="xl:col-span-2 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Maio 2026</h2>
          <div class="flex items-center gap-1">
            <button class="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            </button>
            <button class="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-widest text-slate-400 mb-2">
          <span v-for="d in ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']" :key="d">{{ d }}</span>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <button v-for="d in dias" :key="d.label"
            class="aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors relative"
            :class="[
              d.fora ? 'text-slate-300 dark:text-slate-600' :
              d.hoje ? 'bg-indigo-600 text-white font-semibold' :
              'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            ]"
          >
            {{ d.label }}
            <span v-if="d.evento && !d.hoje" class="absolute bottom-1 w-1 h-1 rounded-full" :class="d.cor"></span>
          </button>
        </div>

        <div class="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center gap-4 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-indigo-500"></span>Acadêmico</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500"></span>Reunião</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>Evento</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-rose-500"></span>Feriado</span>
        </div>
      </article>

      <!-- Próximos eventos -->
      <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Próximos eventos</h2>
        <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
          <div v-for="e in eventos" :key="e.id" class="py-3 flex items-start gap-3">
            <div class="text-center shrink-0 w-12">
              <p class="text-[10px] uppercase tracking-widest text-slate-400">{{ e.mes }}</p>
              <p class="text-xl font-semibold" :class="e.corTexto">{{ e.dia }}</p>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 dark:text-white">{{ e.titulo }}</p>
              <p class="text-xs text-slate-500 mt-0.5">{{ e.hora }} · {{ e.local }}</p>
              <span class="inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full" :class="e.tipoClass">{{ e.tipo }}</span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Comunicados -->
    <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Comunicados</h2>
        <div class="flex items-center gap-1">
          <button v-for="f in ['Todos','Não lidos','Importantes']" :key="f" class="text-xs px-2.5 py-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">{{ f }}</button>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <article v-for="c in comunicados" :key="c.id" class="rounded-lg border border-slate-200 dark:border-slate-700 p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
          <div class="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0 text-xs font-semibold">{{ c.autorIni }}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ c.titulo }}</p>
              <span v-if="c.importante" class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600">Importante</span>
              <span v-if="!c.lido" class="w-2 h-2 rounded-full bg-indigo-500"></span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">{{ c.autor }} · {{ c.tempo }}</p>
            <p class="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{{ c.preview }}</p>
            <div class="flex items-center gap-3 mt-3">
              <button class="text-xs font-medium text-indigo-600 hover:underline">Ler comunicado</button>
              <button v-if="c.confirmar" class="text-xs text-slate-500 hover:text-slate-700">Confirmar leitura</button>
            </div>
          </div>
        </article>
      </div>
    </article>

    <!-- Cardápio da semana -->
    <article class="rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-5">
      <h2 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Cardápio da semana</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div v-for="d in cardapio" :key="d.dia" class="rounded-lg bg-slate-50 dark:bg-slate-900/40 p-4">
          <p class="text-[10px] uppercase tracking-widest text-slate-400">{{ d.dia }}</p>
          <p class="text-xs text-slate-400 mt-0.5">{{ d.data }}</p>
          <div class="mt-3 flex flex-col gap-2 text-xs">
            <div>
              <p class="text-[10px] text-slate-400 uppercase">Lanche manhã</p>
              <p class="text-slate-700 dark:text-slate-200">{{ d.manha }}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase">Almoço</p>
              <p class="text-slate-700 dark:text-slate-200">{{ d.almoco }}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
// Calendário fake
const dias = [
  ...Array.from({ length: 5 }, (_, i) => ({ label: 26 + i, fora: true, hoje: false, evento: false, cor: '' })),
  { label: 1, fora: false, hoje: false, evento: true, cor: 'bg-emerald-500' },
  { label: 2, fora: false, hoje: false, evento: false, cor: '' },
  { label: 3, fora: false, hoje: false, evento: false, cor: '' },
  { label: 4, fora: false, hoje: false, evento: false, cor: '' },
  { label: 5, fora: false, hoje: false, evento: true, cor: 'bg-indigo-500' },
  { label: 6, fora: false, hoje: false, evento: false, cor: '' },
  { label: 7, fora: false, hoje: false, evento: false, cor: '' },
  { label: 8, fora: false, hoje: false, evento: false, cor: '' },
  { label: 9, fora: false, hoje: false, evento: true, cor: 'bg-emerald-500' },
  { label: 10, fora: false, hoje: false, evento: false, cor: '' },
  { label: 11, fora: false, hoje: false, evento: false, cor: '' },
  { label: 12, fora: false, hoje: false, evento: true, cor: 'bg-indigo-500' },
  { label: 13, fora: false, hoje: false, evento: false, cor: '' },
  { label: 14, fora: false, hoje: true, evento: true, cor: 'bg-amber-500' },
  { label: 15, fora: false, hoje: false, evento: false, cor: '' },
  { label: 16, fora: false, hoje: false, evento: false, cor: '' },
  { label: 17, fora: false, hoje: false, evento: false, cor: '' },
  { label: 18, fora: false, hoje: false, evento: false, cor: '' },
  { label: 19, fora: false, hoje: false, evento: false, cor: '' },
  { label: 20, fora: false, hoje: false, evento: true, cor: 'bg-amber-500' },
  { label: 21, fora: false, hoje: false, evento: false, cor: '' },
  { label: 22, fora: false, hoje: false, evento: false, cor: '' },
  { label: 23, fora: false, hoje: false, evento: false, cor: '' },
  { label: 24, fora: false, hoje: false, evento: false, cor: '' },
  { label: 25, fora: false, hoje: false, evento: true, cor: 'bg-rose-500' },
  { label: 26, fora: false, hoje: false, evento: false, cor: '' },
  { label: 27, fora: false, hoje: false, evento: false, cor: '' },
  { label: 28, fora: false, hoje: false, evento: false, cor: '' },
  { label: 29, fora: false, hoje: false, evento: false, cor: '' },
  { label: 30, fora: false, hoje: false, evento: true, cor: 'bg-emerald-500' },
  { label: 31, fora: false, hoje: false, evento: false, cor: '' },
  ...Array.from({ length: 6 }, (_, i) => ({ label: i + 1, fora: true, hoje: false, evento: false, cor: '' })),
]

const eventos = [
  { id: 1, dia: 20, mes: 'mai', titulo: 'Reunião de pais — 3º Ano A', hora: '19h00', local: 'Auditório', tipo: 'Reunião', tipoClass: 'bg-amber-50 text-amber-600',  corTexto: 'text-amber-600' },
  { id: 2, dia: 25, mes: 'mai', titulo: 'Feriado — Corpus Christi',    hora: 'Dia inteiro', local: '—',  tipo: 'Feriado', tipoClass: 'bg-rose-50 text-rose-600',     corTexto: 'text-rose-600'  },
  { id: 3, dia: 30, mes: 'mai', titulo: 'Festa Junina',                 hora: '14h00', local: 'Pátio principal', tipo: 'Evento', tipoClass: 'bg-emerald-50 text-emerald-600', corTexto: 'text-emerald-600' },
  { id: 4, dia: 5,  mes: 'jun', titulo: 'Avaliações — Início',          hora: 'Manhã',  local: 'Salas regulares', tipo: 'Acadêmico', tipoClass: 'bg-indigo-50 text-indigo-600', corTexto: 'text-indigo-600' },
]

const comunicados = [
  { id: 1, autor: 'Direção',      autorIni: 'DR', titulo: 'Cuidados com a chegada antecipada', tempo: 'Há 2 horas', importante: true,  lido: false, confirmar: true, preview: 'A partir desta semana, a escola recomenda que os alunos não cheguem antes das 7h30 devido a obras no estacionamento...' },
  { id: 2, autor: 'Coordenação',  autorIni: 'CO', titulo: 'Reunião de pais — confirme presença', tempo: 'Ontem',     importante: false, lido: false, confirmar: true, preview: 'A reunião do dia 20/05 abordará o desempenho do bimestre. Sua presença é fundamental.' },
  { id: 3, autor: 'Profª. Ana',   autorIni: 'AC', titulo: 'Trabalho de Português adiado',         tempo: 'Há 2 dias', importante: false, lido: true,  confirmar: false, preview: 'A entrega do trabalho sobre crônicas foi adiada para 30/05 a pedido dos próprios alunos.' },
]

const cardapio = [
  { dia: 'Seg', data: '12/05', manha: 'Fruta + iogurte natural',          almoco: 'Arroz, feijão, frango grelhado, salada' },
  { dia: 'Ter', data: '13/05', manha: 'Pão integral + queijo branco',     almoco: 'Macarrão integral ao molho de tomate, carne moída magra' },
  { dia: 'Qua', data: '14/05', manha: 'Suco natural + biscoito caseiro',  almoco: 'Arroz, lentilha, peixe assado, legumes' },
  { dia: 'Qui', data: '15/05', manha: 'Vitamina de banana + aveia',       almoco: 'Risoto de frango, salada colorida' },
  { dia: 'Sex', data: '16/05', manha: 'Bolo integral + leite',            almoco: 'Arroz, feijão, omelete de espinafre, salada' },
]
</script>
