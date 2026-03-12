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
      // With paths.base, prerender may request paths without base prefix (e.g. /, /quiz-result); ignore those 404s
      handleHttpError: (details) => {
        if (base && details.status === 404 && !details.path.startsWith(base)) return;
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
