<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const quiz = $derived(data.quiz);

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
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
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300;1,9..144,400&family=Instrument+Sans:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="v3">
	<a href="/" class="v3-back" style="--i:0">
		<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
		</svg>
		Back to dashboard
	</a>

	<!-- Masthead -->
	<header class="v3-masthead" style="--i:1">
		<span class="v3-eyebrow">Session Report</span>
		<span class="v3-datestamp">{formatDate(quiz.completedAt)}</span>
	</header>

	<hr class="v3-rule" style="--i:2" />

	<!-- Score Hero -->
	<section class="v3-hero" style="--i:3">
		<h1 class="v3-headline">{quiz.title}</h1>
		<div class="v3-hero-row">
			<div class="v3-score-display">
				<span class="v3-score-number">{quiz.scorePercent}</span><span class="v3-score-percent">%</span>
			</div>
			<div class="v3-score-aside">
				<dl class="v3-meta-list">
					<div class="v3-meta-pair">
						<dt>Result</dt>
						<dd>{quiz.correctCount} of {quiz.totalQuestions} correct</dd>
					</div>
					<div class="v3-meta-pair">
						<dt>Duration</dt>
						<dd>{formatTime(quiz.timeSpentSeconds)}</dd>
					</div>
				</dl>
				<span class="v3-verdict" class:v3-verdict--pass={quiz.passed}>
					{#if quiz.passed}Passed{:else}Not yet passing{/if}
				</span>
			</div>
		</div>
	</section>

	<hr class="v3-rule" style="--i:4" />

	<!-- Topic Breakdown -->
	<section style="--i:5" class="v3-section">
		<h2 class="v3-eyebrow">Topic Analysis</h2>
		<div class="v3-topic-grid">
			{#each quiz.breakdown as item, idx}
				{@const pct = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0}
				<div class="v3-topic" style="--j:{idx}">
					<span class="v3-topic-name">{item.topic}</span>
					<div class="v3-specimen">
						{#each Array(item.total) as _, k}
							<span
								class="v3-chip"
								class:v3-chip--on={k < item.correct}
								style="--k:{k}"
							></span>
						{/each}
					</div>
					<span class="v3-topic-stat">{item.correct}/{item.total}</span>
					<span class="v3-topic-pct" class:v3-topic-pct--good={pct >= 70} class:v3-topic-pct--mid={pct >= 50 && pct < 70}>{pct}%</span>
				</div>
			{/each}
		</div>
	</section>

	<hr class="v3-rule" style="--i:6" />

	<!-- Pull Quote -->
	<section class="v3-pullquote" style="--i:7">
		<p>{performanceMessage}</p>
	</section>

	<hr class="v3-rule" style="--i:8" />

	<!-- Platform Features -->
	<section style="--i:9" class="v3-section">
		<h2 class="v3-eyebrow">The Full Platform</h2>
		<ol class="v3-numbered-list">
			{#each platformFeatures as feature, i}
				<li class="v3-numbered-item" style="--j:{i}">
					<span class="v3-item-index">{String(i + 1).padStart(2, '0')}</span>
					<span>{feature}</span>
				</li>
			{/each}
		</ol>
	</section>

	<!-- CTA Band -->
	<section class="v3-cta-band" style="--i:10">
		<div class="v3-cta-layout">
			<div>
				<h2 class="v3-cta-heading">{cta.title}</h2>
				<p class="v3-cta-price">{cta.price}</p>
				<ul class="v3-cta-perks">
					{#each cta.benefits as benefit}
						<li>{benefit}</li>
					{/each}
				</ul>
			</div>
			<a href="/" class="v3-cta-action">
				{cta.buttonLabel}
				<span class="v3-arrow">→</span>
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="v3-foot" style="--i:11">
		<a href="/" class="v3-foot-link">Review answers</a>
		<span class="v3-foot-dot" aria-hidden="true">·</span>
		<a href="/" class="v3-foot-link">Restart quiz</a>
	</footer>
</div>

<style>
	/* ══════════════════════════════════════════════
	   V3 — EDITORIAL / SWISS REPORT
	   ══════════════════════════════════════════════ */

	.v3 {
		--ink: oklch(18% 0.01 55);
		--ink-mid: oklch(42% 0.01 55);
		--ink-faint: oklch(62% 0.008 55);
		--paper: oklch(95.5% 0.015 75);
		--paper-warm: oklch(92% 0.02 70);
		--accent: oklch(45% 0.18 25);
		--accent-light: oklch(92% 0.04 25);
		--rule: oklch(82% 0.01 70);
		--pad-x: clamp(1.5rem, 4vw, 3rem);

		font-family: 'Instrument Sans', system-ui, sans-serif;
		background: var(--paper);
		color: var(--ink);
		max-width: 54rem;
		margin: 0 auto;
		padding: clamp(1.5rem, 5vw, 3.5rem) var(--pad-x) 2rem;
		min-height: 100vh;
		font-kerning: normal;
	}

	/* ── Stagger entrance ── */
	.v3-back, .v3-masthead, .v3-rule, .v3-hero,
	.v3-section, .v3-pullquote, .v3-cta-band, .v3-foot {
		animation: v3-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(var(--i, 0) * 55ms + 60ms);
	}

	@keyframes v3-up {
		from { opacity: 0; transform: translateY(14px); }
	}

	@media (prefers-reduced-motion: reduce) {
		.v3-back, .v3-masthead, .v3-rule, .v3-hero,
		.v3-section, .v3-pullquote, .v3-cta-band, .v3-foot {
			animation: v3-simple 200ms ease-out both;
			animation-delay: calc(var(--i, 0) * 25ms);
		}
		.v3-topic, .v3-numbered-item { animation: none !important; }
		.v3-chip { animation: none !important; }
	}

	@keyframes v3-simple {
		from { opacity: 0; }
	}

	/* ── Back ── */
	.v3-back {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		color: var(--ink-faint);
		text-decoration: none;
		margin-bottom: 2.5rem;
		transition: color 150ms;
	}
	.v3-back:hover { color: var(--ink); }
	.v3-back svg { flex-shrink: 0; }

	/* ── Masthead ── */
	.v3-masthead {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.v3-eyebrow {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.13em;
		color: var(--ink-faint);
	}

	.v3-datestamp {
		font-size: 0.8125rem;
		color: var(--ink-faint);
		font-variant-numeric: tabular-nums;
	}

	/* ── Rules ── */
	.v3-rule {
		border: none;
		border-top: 1px solid var(--rule);
		margin: 1.25rem 0;
	}

	/* ── Hero Score ── */
	.v3-headline {
		font-family: 'Fraunces', Georgia, serif;
		font-optical-sizing: auto;
		font-size: clamp(1.375rem, 3vw, 1.875rem);
		font-weight: 500;
		line-height: 1.25;
		margin: 0 0 clamp(1rem, 3vw, 2rem);
		letter-spacing: -0.01em;
	}

	.v3-hero-row {
		display: flex;
		align-items: baseline;
		gap: clamp(1.5rem, 5vw, 3.5rem);
		flex-wrap: wrap;
	}

	.v3-score-display {
		line-height: 0.85;
		position: relative;
	}

	.v3-score-number {
		font-family: 'Fraunces', Georgia, serif;
		font-optical-sizing: auto;
		font-size: clamp(5.5rem, 14vw, 9rem);
		font-weight: 300;
		letter-spacing: -0.04em;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}

	.v3-score-percent {
		font-family: 'Fraunces', Georgia, serif;
		font-optical-sizing: auto;
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		font-weight: 300;
		color: var(--accent);
		vertical-align: super;
		margin-left: 0.05em;
	}

	.v3-score-aside {
		padding-bottom: 1rem;
		flex: 1;
		min-width: 180px;
	}

	.v3-meta-list {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.v3-meta-pair {
		display: flex;
		gap: 0.75rem;
		font-size: 0.9375rem;
		line-height: 1.7;
	}

	.v3-meta-pair dt {
		color: var(--ink-faint);
		min-width: 4.5rem;
	}

	.v3-meta-pair dd {
		margin: 0;
		color: var(--ink);
		font-weight: 500;
	}

	.v3-verdict {
		display: inline-block;
		margin-top: 0.875rem;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		padding: 0.3rem 0.75rem;
		border: 1.5px solid var(--accent);
		border-radius: 2px;
	}

	.v3-verdict--pass {
		color: oklch(45% 0.14 155);
		border-color: oklch(45% 0.14 155);
	}

	/* ── Topics ── */
	.v3-section h2 {
		margin: 0 0 1.5rem;
	}

	.v3-topic-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.v3-topic {
		display: grid;
		grid-template-columns: 1fr auto auto auto;
		align-items: center;
		gap: 1.25rem;
		padding: 0.875rem 0;
		border-bottom: 1px solid var(--rule);
		animation: v3-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(5 * 55ms + var(--j, 0) * 75ms + 120ms);
	}

	.v3-topic:last-child { border-bottom: none; }

	.v3-topic-name {
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.v3-specimen {
		display: flex;
		gap: 4px;
	}

	.v3-chip {
		width: 20px;
		height: 20px;
		border: 1.5px solid var(--rule);
		border-radius: 3px;
		background: transparent;
		animation: v3-chip-pop 350ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(5 * 55ms + var(--j, 0) * 75ms + var(--k, 0) * 90ms + 200ms);
	}

	.v3-chip--on {
		background: var(--ink);
		border-color: var(--ink);
	}

	@keyframes v3-chip-pop {
		from { opacity: 0; transform: scale(0.4); }
	}

	.v3-topic-stat {
		font-size: 0.8125rem;
		font-variant-numeric: tabular-nums;
		color: var(--ink-faint);
		text-align: right;
		min-width: 1.75rem;
	}

	.v3-topic-pct {
		font-size: 0.75rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--accent);
		background: var(--accent-light);
		padding: 0.125rem 0.5rem;
		border-radius: 2px;
		min-width: 2.5rem;
		text-align: center;
	}

	.v3-topic-pct--good {
		color: oklch(40% 0.14 155);
		background: oklch(94% 0.04 155);
	}

	.v3-topic-pct--mid {
		color: oklch(42% 0.12 80);
		background: oklch(93% 0.04 80);
	}

	/* ── Pull Quote ── */
	.v3-pullquote {
		padding: 0.75rem 0;
	}

	.v3-pullquote p {
		font-family: 'Fraunces', Georgia, serif;
		font-optical-sizing: auto;
		font-style: italic;
		font-weight: 300;
		font-size: clamp(1.0625rem, 2.2vw, 1.3125rem);
		line-height: 1.7;
		color: var(--ink-mid);
		max-width: 48ch;
		margin: 0;
	}

	/* ── Numbered List ── */
	.v3-numbered-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.v3-numbered-item {
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		padding: 0.8125rem 0;
		border-bottom: 1px solid var(--rule);
		animation: v3-up 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(9 * 55ms + var(--j, 0) * 65ms + 100ms);
		font-size: 0.9375rem;
		line-height: 1.55;
	}

	.v3-numbered-item:last-child { border-bottom: none; }

	.v3-item-index {
		font-family: 'Fraunces', Georgia, serif;
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--ink-faint);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
		min-width: 1.5rem;
	}

	/* ── CTA Band ── */
	.v3-cta-band {
		margin: 2rem calc(-1 * var(--pad-x)) 0;
	}

	.v3-cta-layout {
		background: var(--accent);
		padding: clamp(2rem, 5vw, 3rem) var(--pad-x);
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.v3-cta-heading {
		font-family: 'Fraunces', Georgia, serif;
		font-optical-sizing: auto;
		font-size: clamp(1.375rem, 3vw, 1.875rem);
		font-weight: 500;
		color: oklch(96% 0.02 25);
		line-height: 1.25;
		margin: 0;
		letter-spacing: -0.01em;
	}

	.v3-cta-price {
		font-size: 1.0625rem;
		font-weight: 600;
		color: oklch(85% 0.06 25);
		margin: 0.875rem 0 0;
	}

	.v3-cta-perks {
		list-style: none;
		padding: 0;
		margin: 1.125rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem 1.5rem;
	}

	.v3-cta-perks li {
		font-size: 0.8125rem;
		color: oklch(85% 0.04 25);
		padding-left: 1.125rem;
		position: relative;
	}

	.v3-cta-perks li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: oklch(72% 0.08 25);
	}

	.v3-cta-action {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		align-self: flex-start;
		background: var(--paper);
		color: var(--accent);
		font-family: 'Instrument Sans', sans-serif;
		font-size: 0.9375rem;
		font-weight: 600;
		padding: 0.875rem 1.75rem;
		border-radius: 2px;
		text-decoration: none;
		transition: background-color 150ms, transform 100ms;
	}

	.v3-cta-action:hover {
		background: oklch(97% 0.01 75);
		transform: translateX(2px);
	}

	.v3-arrow {
		transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.v3-cta-action:hover .v3-arrow {
		transform: translateX(4px);
	}

	/* ── Footer ── */
	.v3-foot {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.75rem 0 0.5rem;
	}

	.v3-foot-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--ink-mid);
		text-decoration: none;
		padding-bottom: 1px;
		border-bottom: 1px solid transparent;
		transition: color 150ms, border-color 150ms;
	}

	.v3-foot-link:hover {
		color: var(--ink);
		border-bottom-color: var(--ink);
	}

	.v3-foot-dot {
		color: var(--ink-faint);
	}

	/* ── Responsive ── */
	@media (max-width: 560px) {
		.v3-hero-row {
			flex-direction: column;
			gap: 1rem;
		}

		.v3-topic {
			grid-template-columns: 1fr auto;
			gap: 0.5rem 1rem;
		}

		.v3-topic-name {
			grid-column: 1 / -1;
		}

		.v3-specimen { order: 0; }
		.v3-topic-stat { order: 1; }
		.v3-topic-pct { order: 2; }

		.v3-cta-perks {
			flex-direction: column;
			gap: 0.25rem;
		}
	}
</style>
