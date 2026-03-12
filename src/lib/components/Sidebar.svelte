<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
</script>

<aside
  class="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col"
  aria-label="Main navigation"
>
  <div class="p-4 border-b border-slate-100">
    <a href="{base}/" class="block font-semibold text-slate-900 tracking-tight">
      FRM Prep Lab
    </a>
    <p class="text-xs text-slate-500 mt-0.5">Part I · Mockups</p>
  </div>
  <nav class="flex-1 p-3 space-y-0.5">
    <a
      href="{base}/"
      class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        {$page.url.pathname === base + '/' || $page.url.pathname === base ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
    >
      <span aria-hidden="true">🏠</span>
      Dashboard
    </a>
    <a
      href="{base}/quiz-result"
      class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        {$page.url.pathname === base + '/quiz-result' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
    >
      <span aria-hidden="true">📋</span>
      Quiz result
    </a>
    <a
      href="{base}/quiz-result-v2"
      class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        {$page.url.pathname === base + '/quiz-result-v2' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
    >
      <span aria-hidden="true">✨</span>
      Quiz result v2
    </a>
    <a
      href="{base}/quiz-result-v3"
      class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        {$page.url.pathname === base + '/quiz-result-v3' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
    >
      <span aria-hidden="true">📰</span>
      Quiz result v3
    </a>
    <div class="pt-4 mt-4 border-t border-slate-100">
      <p class="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
        Sections (mock)
      </p>
      <a
        href="{base}/"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >Foundations of Risk</a>
      <a
        href="{base}/"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >Quantitative Analysis</a>
      <a
        href="{base}/"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >Financial Markets</a>
      <a
        href="{base}/"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >Valuation & Risk</a>
    </div>
  </nav>
</aside>
