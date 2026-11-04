import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const { LOCAL_PREVIEW_STYLE_URL } = loadEnv(mode, '.', 'LOCAL_');
  return {
    base: '/web-effects-archive/',
    build: { target: 'es2022' },
    // Optional, ignored local styles can load licensed fonts for design review.
    // This plugin runs only in development; private assets never enter the build.
    plugins: LOCAL_PREVIEW_STYLE_URL ? [{
      name: 'local-preview-style',
      apply: 'serve',
      transformIndexHtml: () => [{
        tag: 'link',
        attrs: { rel: 'stylesheet', href: LOCAL_PREVIEW_STYLE_URL },
        injectTo: 'head',
      }],
    }] : [],
  };
});
