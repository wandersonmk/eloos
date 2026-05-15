// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@nuxt/icon'],

  // Auto-imports de componentes:
  //   ui/, shared/, layout/  → sem prefixo  (ex.: <BaseButton/>, <FormGrid/>)
  //   demais subpastas       → com prefixo  (ex.: aluno/Endereco → <AlunoEndereco/>)
  components: [
    { path: '~/components/ui',     pathPrefix: false },
    { path: '~/components/shared', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    '~/components',
  ],

  icon: {
    serverBundle: { collections: ['lucide'] }, // bundle do conjunto Lucide (mais legível e moderno)
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/splash', '/recuperar-senha'],
    },
  },
})