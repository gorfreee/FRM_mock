import adapter from '@sveltejs/adapter-static';

// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const base = isGitHubPages ? (process.env.BASE_PATH || '') : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base
    },
    prerender: {
      // With paths.base, prerender may request "/" which 404s; ignore so build continues
      handleHttpError: (details) => {
        if (base && details.path === '/' && details.status === 404) return;
        throw new Error(details.message);
      }
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};

export default config;
