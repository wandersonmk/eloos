<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" aria-hidden="true" />
</template>

<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement>()

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

onMounted(() => {
  const canvas = canvasRef.value!
  const ctx = canvas.getContext('2d')!

  let raf: number
  let particles: Particle[] = []

  const CONFIG = {
    count: 90,
    maxDistance: 130,
    speed: 0.35,
    minRadius: 1.2,
    maxRadius: 3,
    // Paleta azul/índigo
    colors: [
      'rgba(99,102,241,',   // indigo-500
      'rgba(129,140,248,',  // indigo-400
      'rgba(59,130,246,',   // blue-500
      'rgba(147,197,253,',  // blue-300
      'rgba(165,180,252,',  // indigo-300
    ],
  }

  function resize() {
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  function createParticle(): Particle {
    const angle = Math.random() * Math.PI * 2
    const speed = (Math.random() * 0.5 + 0.1) * CONFIG.speed
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius,
      opacity: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }
  }

  function init() {
    particles = Array.from({ length: CONFIG.count }, createParticle)
  }

  function drawParticle(p: Particle) {
    const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))
    const color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)]

    // Brilho (glow)
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
    glow.addColorStop(0, color + pulsedOpacity + ')')
    glow.addColorStop(1, color + '0)')

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()

    // Núcleo
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = color + (pulsedOpacity * 1.4).toFixed(2) + ')'
    ctx.fill()
  }

  function drawLine(a: Particle, b: Particle, dist: number) {
    const alpha = (1 - dist / CONFIG.maxDistance) * 0.25
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
    grad.addColorStop(0, `rgba(129,140,248,${alpha})`)
    grad.addColorStop(1, `rgba(59,130,246,${alpha})`)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = grad
    ctx.lineWidth = 0.6
    ctx.stroke()
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Fundo escuro azulado
    ctx.fillStyle = 'rgba(10,14,40,1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grade sutil de fundo
    ctx.strokeStyle = 'rgba(99,102,241,0.04)'
    ctx.lineWidth = 1
    const gridSize = 60
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
    }

    // Atualiza e desenha partículas
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.pulse += p.pulseSpeed

      // Rebound nas bordas
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      drawParticle(p)
    }

    // Linhas entre partículas próximas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONFIG.maxDistance) drawLine(particles[i], particles[j], dist)
      }
    }

    raf = requestAnimationFrame(tick)
  }

  const ro = new ResizeObserver(() => { resize(); init() })
  ro.observe(canvas)
  resize()
  init()
  tick()

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    ro.disconnect()
  })
})
</script>
