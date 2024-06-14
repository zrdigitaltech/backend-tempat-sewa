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
        input: [
          // css
          'resources/app/styles//bootstrap/css/bootstrap.min.css',
          'resources/app/styles/linearicons/css/icon-font.min.css',
          'resources/app/styles/font-awesome/css/font-awesome.min.css',
          'resources/app/styles/animate/animate.css',
          'resources/app/styles/owl-carousel/css/owl.carousel.css',
          'resources/app/styles/owl-carousel/css/owl.theme.css',
          'resources/app/styles/scss/style.scss',
          'resources/app/index.jsx',
          'resources/js/app.js'
        ],
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
          // includePaths: ["resources/app/images"],
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/app')
      }
    }
  };
});
