<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	let { data }: { data: PageData } = $props();
	const quiz = $derived(data.quiz);

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}m ${s.toString().padStart(2, '0')}s`;
	}

	const cta = $derived(
		quiz.cta ?? {
			title: 'Unlock the Full FRM Question Bank',
			benefits: ['Unlimited quizzes', 'Full question bank', 'Mock exams', 'Lifetime access'],
			price: '€29 one-time payment',
			buttonLabel: 'Unlock Full Access'
		}
	);

	const platformFeatures = $derived(
		quiz.platformFeatures ?? [
			'1200+ FRM-style practice questions',
			'Full mock exams simulating the real test',
			'Performance tracking by topic',
			'Detailed explanations for every question'
		]
	);

	const performanceMessage = $derived(
		quiz.performanceMessage ??
			'The FRM exam is challenging. Most candidates need hundreds of practice questions before they feel confident.'
	);

	const radius = 58;
	const circumference = 2 * Math.PI * radius;
	const dashOffset = $derived(circumference * (1 - quiz.scorePercent / 100));

	const scoreColor = $derived(
		quiz.scorePercent >= 70
			? 'text-emerald-400'
			: quiz.scorePercent >= 50
				? 'text-amber-400'
				: 'text-rose-400'
	);

	const scoreStroke = $derived(
		quiz.scorePercent >= 70
			? 'stroke-emerald-400'
			: quiz.scorePercent >= 50
				? 'stroke-amber-400'
				: 'stroke-rose-400'
	);

	const scoreGlow = $derived(
		quiz.scorePercent >= 70
			? 'drop-shadow(0 0 12px rgba(52,211,153,0.4))'
			: quiz.scorePercent >= 50
				? 'drop-shadow(0 0 12px rgba(251,191,36,0.4))'
				: 'drop-shadow(0 0 12px rgba(251,113,133,0.4))'
	);

	const featureIcons = [
		`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>`,
		`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"/></svg>`
	];

	function barColor(pct: number): string {
		if (pct >= 70) return 'bg-emerald-500';
		if (pct >= 50) return 'bg-amber-500';
		return 'bg-rose-500';
	}

	function barBg(pct: number): string {
		if (pct >= 70) return 'bg-emerald-500/10';
		if (pct >= 50) return 'bg-amber-500/10';
		return 'bg-rose-500/10';
	}

	function labelColor(pct: number): string {
		if (pct >= 70) return 'text-emerald-600';
		if (pct >= 50) return 'text-amber-600';
		return 'text-rose-600';
	}
</script>

<div class="min-h-screen">
	<!-- ─── HERO: Score Section ─── -->
	<section class="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.03]"
			style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 32px 32px;"
		></div>
		<div
			class="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full opacity-20 blur-3xl"
			style="background: radial-gradient(ellipse, rgba(99,102,241,0.5), transparent 70%);"
		></div>

		<div class="relative mx-auto max-w-4xl px-6 pb-14 pt-8 md:px-8">
			<a
				href="{base}/"
				class="group mb-8 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
			>
				<svg class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
				Back to dashboard
			</a>

			<div class="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-12">
				<!-- Progress Ring -->
				<div class="relative mb-8 flex-shrink-0 md:mb-0">
					<svg
						width="152"
						height="152"
						viewBox="0 0 152 152"
						class="rotate-[-90deg]"
						style="filter: {scoreGlow};"
					>
						<circle
							cx="76"
							cy="76"
							r={radius}
							fill="none"
							stroke="currentColor"
							stroke-width="8"
							class="text-slate-700/50"
						/>
						<circle
							cx="76"
							cy="76"
							r={radius}
							fill="none"
							stroke-width="8"
							stroke-linecap="round"
							class={scoreStroke}
							stroke-dasharray={circumference}
							stroke-dashoffset={dashOffset}
							style="transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1);"
						/>
					</svg>
					<div class="absolute inset-0 flex flex-col items-center justify-center">
						<span class="text-4xl font-bold tracking-tight {scoreColor}">
							{quiz.scorePercent}%
						</span>
					</div>
				</div>

				<!-- Score Details -->
				<div class="flex-1">
					<div class="mb-1 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
						Session complete
					</div>
					<h1 class="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
						{quiz.correctCount} / {quiz.totalQuestions} correct
					</h1>
					<p class="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
						{performanceMessage}
					</p>

					<!-- Stat Chips -->
					<div class="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
						<div class="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/40 px-4 py-2.5 backdrop-blur-sm">
							<svg class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
							</svg>
							<div>
								<p class="text-xs text-slate-500">Questions</p>
								<p class="text-sm font-semibold text-white">{quiz.totalQuestions}</p>
							</div>
						</div>
						<div class="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/40 px-4 py-2.5 backdrop-blur-sm">
							<svg class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							<div>
								<p class="text-xs text-slate-500">Correct</p>
								<p class="text-sm font-semibold text-white">{quiz.correctCount}</p>
							</div>
						</div>
						<div class="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/40 px-4 py-2.5 backdrop-blur-sm">
							<svg class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							<div>
								<p class="text-xs text-slate-500">Time</p>
								<p class="text-sm font-semibold text-white">{formatTime(quiz.timeSpentSeconds)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ─── MAIN CONTENT ─── -->
	<div class="mx-auto max-w-4xl px-6 md:px-8">

		<!-- ─── Topic Performance ─── -->
		<section class="-mt-6 relative z-10 mb-10">
			<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-900/[0.04] md:p-8">
				<div class="mb-6 flex items-center justify-between">
					<div>
						<h2 class="text-lg font-semibold text-slate-900">Topic Performance</h2>
						<p class="mt-0.5 text-sm text-slate-500">Accuracy breakdown by subject area</p>
					</div>
					<div class="hidden items-center gap-4 text-xs text-slate-400 sm:flex">
						<span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> ≥ 70%</span>
						<span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-amber-500"></span> ≥ 50%</span>
						<span class="flex items-center gap-1.5"><span class="h-2 w-2 rounded-full bg-rose-500"></span> &lt; 50%</span>
					</div>
				</div>

				<div class="space-y-4">
					{#each quiz.breakdown as item}
						{@const pct = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0}
						<div class="rounded-xl {barBg(pct)} p-4 transition-colors">
							<div class="mb-2.5 flex items-center justify-between">
								<span class="text-sm font-medium text-slate-800">{item.topic}</span>
								<div class="flex items-center gap-2">
									<span class="text-xs text-slate-500">{item.correct}/{item.total}</span>
									<span class="rounded-md px-2 py-0.5 text-xs font-semibold {labelColor(pct)} {barBg(pct)}">
										{pct}%
									</span>
								</div>
							</div>
							<div class="h-1.5 overflow-hidden rounded-full bg-slate-200/60">
								<div
									class="h-full rounded-full {barColor(pct)} transition-all duration-700 ease-out"
									style="width: {pct}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ─── Platform Features ─── -->
		<section class="mb-10">
			<div class="mb-6 text-center">
				<h2 class="text-lg font-semibold text-slate-900">Built for serious FRM candidates</h2>
				<p class="mt-1 text-sm text-slate-500">Everything you need to pass on your first attempt</p>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each platformFeatures as feature, i}
					<div class="group relative rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
						<div class="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
							{@html featureIcons[i % featureIcons.length]}
						</div>
						<p class="text-sm font-medium leading-relaxed text-slate-700">{feature}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- ─── CTA Block ─── -->
		<section class="mb-10">
			<div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 md:p-10">
				<div
					class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
					style="background: radial-gradient(circle, rgba(99,102,241,0.6), transparent 70%);"
				></div>
				<div
					class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
					style="background: radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%);"
				></div>

				<div class="relative">
					<div class="mb-1 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
						<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
						Limited offer
					</div>
					<h2 class="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
						{cta.title}
					</h2>

					<div class="mt-6 flex flex-wrap gap-2">
						{#each cta.benefits as benefit}
							<span class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200 backdrop-blur-sm">
								<svg class="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>
								{benefit}
							</span>
						{/each}
					</div>

					<div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
						<a
							href="{base}/"
							class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition-all hover:bg-slate-100 hover:shadow-xl hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900"
						>
							{cta.buttonLabel}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
							</svg>
						</a>
						<span class="text-lg font-semibold text-white">
							{cta.price}
						</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ─── Secondary Actions ─── -->
		<section class="mb-12 flex items-center justify-center gap-6 text-sm">
			<a
				href="{base}/"
				class="group inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-slate-900"
			>
				<svg class="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
				</svg>
				Review answers
			</a>
			<span class="h-4 w-px bg-slate-200" aria-hidden="true"></span>
			<a
				href="{base}/"
				class="group inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-slate-900"
			>
				<svg class="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/>
				</svg>
				Restart quiz
			</a>
		</section>
	</div>
</div>
