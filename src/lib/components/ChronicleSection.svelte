<script lang="ts">
	import { timeline } from "$lib/content";
	import RuneImage from "./RuneImage.svelte";
	import SectionHeader from "./SectionHeader.svelte";
</script>

<section class="section chronicle" id="chronicle" aria-labelledby="chronicle-title">
	<div class="chronicle-watermark" aria-hidden="true">
		<RuneImage index={11} size="100%" />
	</div>
	<div class="container">
		<SectionHeader
			index="II"
			label="Хроника"
			title="Путь"
			id="chronicle-title"
			rune={8}
			lead="Шесть этапов без точных дат: от первых строк в 14 лет до фулстека, геймдева, инструментов и музыки. Важен порядок и смысл, а не цифры в резюме."
		/>

		<div class="timeline">
			{#each timeline as entry, i}
				<article
					class="timeline-entry"
					data-reveal
					style={`--reveal-delay: ${i * 70}ms`}
				>
					<div class="timeline-node" aria-hidden="true">
						<RuneImage index={i + 1} size={14} />
					</div>
					<div class="timeline-head">
						<span class="timeline-index mono">{entry.index}</span>
						<span class="timeline-kicker mono">{entry.kicker}</span>
					</div>
					<h3 class="timeline-title">{entry.title}</h3>
					<p class="timeline-text">{entry.text}</p>
					<ul class="timeline-tags" aria-label="Ключевые слова">
						{#each entry.tags as tag}
							<li class="mono">{tag}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>

		<div class="timeline-end" data-reveal>
			<span class="end-line" aria-hidden="true"></span>
			<span class="end-rune" aria-hidden="true"><RuneImage index={8} size={18} /></span>
			<p class="mono">Хроника продолжается — следующий этап пишется сейчас</p>
		</div>
	</div>
</section>

<style>
	.chronicle {
		overflow: hidden;
		background:
			linear-gradient(180deg, var(--cx-bg), var(--cx-bg-deep) 55%, var(--cx-bg)),
			var(--cx-bg);
	}

	.chronicle-watermark {
		position: absolute;
		top: 18%;
		right: 4%;
		width: clamp(180px, 24vw, 330px);
		aspect-ratio: 1;
		color: var(--cx-gold);
		opacity: 0.04;
		transform: rotate(9deg);
		pointer-events: none;
	}

	.timeline {
		position: relative;
		max-width: 62rem;
		margin-top: clamp(2rem, 4vw, 3.5rem);
		padding-left: 4.2rem;
	}

	.timeline::before {
		content: "";
		position: absolute;
		top: 0.4rem;
		bottom: 0;
		left: 1.32rem;
		width: 2px;
		background: repeating-linear-gradient(
			to bottom,
			var(--cx-line-strong) 0 10px,
			transparent 10px 16px
		);
		box-shadow: 4px 0 0 var(--cx-line);
	}

	.timeline-entry {
		position: relative;
		padding: 0 0 clamp(2rem, 4vw, 3.2rem);
	}

	.timeline-entry:last-child {
		padding-bottom: 0;
	}

	.timeline-node {
		position: absolute;
		top: 0.2rem;
		left: -3.3rem;
		display: grid;
		place-items: center;
		width: 1.25rem;
		height: 1.25rem;
		border: 1px solid var(--cx-gold);
		background: var(--cx-bg);
		color: var(--cx-gold);
		transform: rotate(45deg);
		box-shadow: 0 0 0 0.3rem var(--cx-bg);
	}

	.timeline-node :global(.rune-image) {
		transform: rotate(-45deg);
	}

	.timeline-entry:hover .timeline-node {
		background: var(--cx-gold);
		color: var(--cx-bg);
	}

	.timeline-head {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		margin-bottom: 0.4rem;
	}

	.timeline-index {
		color: var(--cx-gold);
		font-size: 0.78rem;
	}

	.timeline-kicker {
		color: var(--cx-faint);
		font-size: 0.7rem;
	}

	.timeline-title {
		margin-bottom: 0.55rem;
		font-size: clamp(1.7rem, 3vw, 2.4rem);
		line-height: 1.08;
	}

	.timeline-text {
		max-width: 52rem;
		margin-bottom: 0.8rem;
		color: var(--cx-muted);
		font-size: 0.96rem;
		line-height: 1.68;
	}

	.timeline-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.timeline-tags li {
		padding: 0.2rem 0.46rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-faint);
		font-size: 0.62rem;
		letter-spacing: 0.03em;
	}

	.timeline-end {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		max-width: 62rem;
		margin-top: 2.2rem;
		padding-left: 0.85rem;
		color: var(--cx-faint);
	}

	.end-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--cx-line-strong), transparent);
	}

	.end-rune {
		color: var(--cx-gold);
		opacity: 0.8;
	}

	.timeline-end p {
		margin: 0;
		font-size: 0.66rem;
		text-align: right;
	}

	@media (max-width: 620px) {
		.timeline {
			padding-left: 2.7rem;
		}

		.timeline::before {
			left: 0.72rem;
		}

		.timeline-node {
			left: -2.55rem;
			width: 1.05rem;
			height: 1.05rem;
		}

		.timeline-text {
			font-size: 0.9rem;
		}

		.timeline-end {
			padding-left: 0;
		}
	}
</style>
