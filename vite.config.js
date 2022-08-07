import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig}
const config = {
  plugins: [sveltekit()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
  },
}

export default config
