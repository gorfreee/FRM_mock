<script lang="ts">
  import type { PageData } from './$types';
  import FeatureList from '$lib/components/FeatureList.svelte';

  let { data }: { data: PageData } = $props();
  const quiz = $derived(data.quiz);

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  const cta = $derived(quiz.cta ?? {
    title: 'Unlock the Full FRM Question Bank',
    benefits: ['Unlimited quizzes', 'Full question bank', 'Mock exams', 'Lifetime access'],
    price: '€29 one-time payment',
    buttonLabel: 'Unlock Full Access'
  });

  const platformFeatures = $derived(quiz.platformFeatures ?? [
    '1200+ FRM-style practice questions',
    'Full mock exams simulating the real test',
    'Performance tracking by topic',
    'Detailed explanations for every question'
  ]);

  const performanceMessage = $derived(quiz.performanceMessage ?? 'The FRM exam is challenging. Most candidates need hundreds of practice questions before they feel confident.');
</script>

<div class="p-6 md:p-8 max-w-3xl mx-auto">
  <a
    href="/"
    class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
  >
    ← Back to dashboard
  </a>

  <header class="mb-8">
    <h1 class="text-2xl md:text-3xl font-bold text-slate-900">Free FRM Practice Quiz</h1>
    <p class="mt-1 text-slate-600">
      Try a short quiz with real FRM-style questions and detailed explanations. No account required.
    </p>
  </header>

  <!-- SECTION 1 — Score Summary -->
  <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
    <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
      Session complete
    </h2>
    <p class="text-slate-700 mb-6">
      You completed this study block.
    </p>

    <div class="flex flex-wrap items-baseline gap-x-6 gap-y-1 mb-4">
      <p class="text-3xl font-bold text-slate-900">
        {quiz.correctCount} / {quiz.totalQuestions} correct ({quiz.scorePercent}%)
      </p>
    </div>

    <dl class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-6">
      <div>
        <dt class="text-slate-500">Questions answered</dt>
        <dd class="font-medium text-slate-900">{quiz.totalQuestions}</dd>
      </div>
      <div>
        <dt class="text-slate-500">Correct answers</dt>
        <dd class="font-medium text-slate-900">{quiz.correctCount}</dd>
      </div>
      <div>
        <dt class="text-slate-500">Time spent</dt>
        <dd class="font-medium text-slate-900">{formatTime(quiz.timeSpentSeconds)}</dd>
      </div>
    </dl>

    <p class="text-sm text-slate-600 mb-6 leading-relaxed">
      {performanceMessage}
    </p>

    <div>
      <h3 class="text-sm font-semibold text-slate-700 mb-3">Performance by topic</h3>
      <ul class="space-y-3">
        {#each quiz.breakdown as item}
          {@const pct = item.total > 0 ? (item.correct / item.total) * 100 : 0}
          <li>
            <div class="flex items-center justify-between gap-4 mb-1">
              <span class="text-sm text-slate-900">{item.topic}</span>
              <span class="text-sm font-medium text-slate-600 shrink-0">
                {item.correct} / {item.total}
              </span>
            </div>
            <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                class="h-full rounded-full bg-blue-500 transition-all duration-300"
                style="width: {pct}%"
              ></div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- SECTION 2 — Platform Value -->
  <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
    <h2 class="text-lg font-semibold text-slate-900 mb-1">What the full platform includes</h2>
    <p class="text-sm text-slate-600 mb-4">
      Get more practice and track your progress across all FRM topics.
    </p>
    <FeatureList items={platformFeatures} icon="check" />
  </section>

  <!-- SECTION 4 — Conversion Block (MAIN CTA) -->
  <section
    class="rounded-xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md mb-8 ring-2 ring-blue-500/10"
  >
    <h2 class="text-xl font-bold text-slate-900 mb-2">{cta.title}</h2>
    <FeatureList items={cta.benefits} icon="check" />
    <p class="mt-4 text-lg font-semibold text-slate-900">{cta.price}</p>
    <a
      href="/"
      class="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {cta.buttonLabel}
    </a>
  </section>

  <!-- SECTION 5 — Secondary actions -->
  <section class="flex flex-wrap items-center gap-4 text-sm">
    <a
      href="/"
      class="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
    >
      Review answers
    </a>
    <span class="text-slate-300" aria-hidden="true">·</span>
    <a
      href="/"
      class="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2"
    >
      Restart quiz
    </a>
  </section>
</div>
