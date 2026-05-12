<template>
  <div
    class="w-full h-full flex flex-col"
    :style="{ background: isDark ? '#1e293b' : '#ffffff' }"
  >
    <!-- Cabeçalho -->
    <div class="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
      <div>
        <p class="text-sm font-semibold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">Visão Financeira</p>
        <p class="text-xs mt-0.5" :style="{ color: isDark ? '#475569' : '#94a3b8' }">Receitas vs. Despesas — 2026</p>
      </div>
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5 text-xs" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">
          <span class="w-2.5 h-2.5 rounded-sm inline-block" :style="{ background: isDark ? '#818cf8' : '#6366f1' }"></span>
          Receitas
        </span>
        <span class="flex items-center gap-1.5 text-xs" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">
          <span class="w-2.5 h-2.5 rounded-sm inline-block" :style="{ background: isDark ? '#c4b5fd' : '#a78bfa' }"></span>
          Despesas
        </span>
      </div>
    </div>

    <!-- SVG -->
    <div class="flex-1 min-h-0 px-1 pb-2">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bGradR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   :stop-color="isDark ? '#818cf8' : '#6366f1'" stop-opacity="1"/>
            <stop offset="100%" :stop-color="isDark ? '#6366f1' : '#4f46e5'" stop-opacity="0.8"/>
          </linearGradient>
          <linearGradient id="bGradD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   :stop-color="isDark ? '#c4b5fd' : '#a78bfa'" stop-opacity="1"/>
            <stop offset="100%" :stop-color="isDark ? '#a78bfa' : '#8b5cf6'" stop-opacity="0.8"/>
          </linearGradient>
        </defs>

        <!-- Gridlines -->
        <line
          v-for="tick in yTicks" :key="'g' + tick.v"
          :x1="PAD_L" :y1="sy(tick.v)"
          :x2="W - PAD_R" :y2="sy(tick.v)"
          :stroke="isDark ? 'rgba(148,163,184,0.08)' : 'rgba(100,116,139,0.1)'"
          stroke-width="1"
        />

        <!-- Y Labels -->
        <text
          v-for="tick in yTicks" :key="'ly' + tick.v"
          :x="PAD_L - 7" :y="sy(tick.v) + 4"
          text-anchor="end"
          :style="{ fontSize: '10px', fill: isDark ? '#475569' : '#94a3b8' }"
        >{{ tick.label }}</text>

        <!-- Barras por mês -->
        <template v-for="(d, i) in chartData" :key="'m' + i">
          <rect
            v-if="d.receita !== null"
            :x="barX(i, 0)" :y="sy(d.receita)"
            :width="BAR_W" :height="barH(d.receita)"
            rx="3" fill="url(#bGradR)"
            class="bar"
            :style="{ animationDelay: `${0.1 + i * 0.055}s` }"
          />
          <rect
            v-if="d.despesa !== null"
            :x="barX(i, 1)" :y="sy(d.despesa)"
            :width="BAR_W" :height="barH(d.despesa)"
            rx="3" fill="url(#bGradD)"
            class="bar"
            :style="{ animationDelay: `${0.13 + i * 0.055}s` }"
          />
        </template>

        <!-- X Labels — meses futuros aparecem mais apagados -->
        <text
          v-for="(m, i) in months" :key="'lx' + m"
          :x="slotCenter(i)" :y="H - 6"
          text-anchor="middle"
          :style="{
            fontSize: '10px',
            fill: i < receitaData.length
              ? (isDark ? '#94a3b8' : '#64748b')
              : (isDark ? '#334155'  : '#e2e8f0')
          }"
        >{{ m }}</text>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDark } = useTheme()

const W = 560, H = 190
const PAD_L = 44, PAD_R = 14, PAD_T = 14, PAD_B = 28
const CW = W - PAD_L - PAD_R
const CH = H - PAD_T - PAD_B
const MAX_Y = 55000
const SLOT_W = CW / 12
const BAR_W = 13
const BAR_GAP = 2

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const receitaData = [41200, 46800, 43500, 47900, 48750]
const despesaData  = [26400, 29800, 27500, 31400, 31200]

type MonthBar = { receita: number | null; despesa: number | null }

const chartData: MonthBar[] = months.map((_, i) => ({
  receita: receitaData[i] ?? null,
  despesa: despesaData[i] ?? null,
}))

const yTicks = [
  { v: 0,     label: '0'   },
  { v: 15000, label: '15k' },
  { v: 30000, label: '30k' },
  { v: 45000, label: '45k' },
]

const sy    = (v: number) => PAD_T + CH - (v / MAX_Y) * CH
const barH  = (v: number) => (v / MAX_Y) * CH

function barX(monthIdx: number, barIdx: number) {
  const slotStart = PAD_L + monthIdx * SLOT_W
  const groupW    = 2 * BAR_W + BAR_GAP
  const pad       = (SLOT_W - groupW) / 2
  return slotStart + pad + barIdx * (BAR_W + BAR_GAP)
}

function slotCenter(i: number) {
  return PAD_L + (i + 0.5) * SLOT_W
}
</script>

<style scoped>
.bar {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: barGrow 0.6s cubic-bezier(.4, 0, .2, 1) both;
}
@keyframes barGrow {
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
}
</style>
