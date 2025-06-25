import { defineConfig, loadEnv } from 'vite';
import laravel, { refreshPaths } from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(config => {
  // Load env file based on `mode` in the current working directory.
  // https://main.vitejs.dev/config/#using-environment-variables-in-config
  const env = loadEnv(config.mode, process.cwd(), '');

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    plugins: [
      laravel({
        input: ['resources/js/app.js'],
        refresh: [...refreshPaths, 'app/Livewire/**'],
        // @ts-ignore
        postcss: [autoprefixer()]
      }),
      react()
    ],
    commonjsOptions: {
      esmExternals: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Optionally turn off warnings
          sourceMap: true // Enable source map for easier debugging
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources'),
        bootstrap: path.resolve(__dirname, 'node_modules/bootstrap')
      }
    }
  };
});
