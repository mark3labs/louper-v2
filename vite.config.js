import { sveltekit } from '@sveltejs/kit/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    alias: {
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      // buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
  plugins: [sveltekit()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
}

export default config
