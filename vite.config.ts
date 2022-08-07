import { sveltekit } from '@sveltejs/kit/vite'
import { UserConfig } from 'vite'

const config: UserConfig = {
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
