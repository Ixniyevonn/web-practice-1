<script lang="ts">
	import { categories, projects, type ProjectCategory } from "$lib/content";
	import ProjectCard from "./ProjectCard.svelte";
	import RuneImage from "./RuneImage.svelte";
	import SectionHeader from "./SectionHeader.svelte";

	type Filter = "all" | ProjectCategory;

	let active = $state<Filter>("all");

	const filtered = $derived(
		active === "all" ? projects : projects.filter((project) => project.category === active)
	);

	const countLabel = $derived(
		`${String(filtered.length).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`
	);

	function isWide(project: (typeof projects)[number]): boolean {
		if (active === "web") return !project.featured;
		if (active === "all") return project.id === "gamejam";
		return false;
	}
</script>

<section class="section works" id="works" aria-labelledby="works-title">
	<div class="works-watermark" aria-hidden="true">
		<RuneImage index={29} size="100%" />
	</div>
	<div class="container">
		<SectionHeader
			index="IV"
			label="Артефакты"
			title="Работы"
			id="works-title"
			rune={32}
			lead="Четыре карточки: два веб-проекта и два инструмента / игровых прототипа. Часть описаний — честные заготовки: проекты ещё в разработке, ссылки появятся позже."
		/>

		<div class="works-toolbar" data-reveal>
			<div class="filters" role="group" aria-label="Фильтр проектов по категории">
				{#each categories as category}
					<button
						type="button"
						class="filter"
						class:active={active === category.id}
						aria-pressed={active === category.id}
						onclick={() => (active = category.id)}
					>
						<span class="filter-mark" aria-hidden="true"></span>
						{category.label}
					</button>
				{/each}
			</div>
			<p class="works-count mono" aria-live="polite">
				Показано {countLabel}
			</p>
		</div>

		{#key active}
			<div class="works-grid">
				{#each filtered as project (project.id)}
					<ProjectCard {project} wide={isWide(project)} />
				{/each}
			</div>
		{/key}

		{#if filtered.length === 0}
			<p class="works-empty">
				В этой категории пока нет работ. Попробуйте «Все» — там уже что-то есть.
			</p>
		{/if}

		<p class="works-note mono" data-reveal>
			<span aria-hidden="true">✳</span>
			Некоторые карточки — учебные и находящиеся в разработке. Это подписано в статусе,
			без выдуманных ссылок и достижений.
		</p>
	</div>
</section>

<style>
	.works {
		overflow: hidden;
		background:
			radial-gradient(ellipse 60% 40% at 100% 0%, var(--cx-glow), transparent 65%),
			var(--cx-bg);
	}

	.works-watermark {
		position: absolute;
		top: 22%;
		left: 2%;
		width: clamp(180px, 25vw, 360px);
		aspect-ratio: 1;
		color: var(--cx-gold);
		opacity: 0.04;
		transform: rotate(12deg);
		pointer-events: none;
	}

	.works-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--cx-line);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.filter {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 2.45rem;
		padding: 0.4rem 0.9rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-muted);
		font-family: var(--f-mono);
		font-size: 0.68rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		transition:
			color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.filter:hover {
		border-color: var(--cx-line-strong);
		color: var(--cx-gold);
	}

	.filter.active {
		border-color: var(--cx-gold);
		background: var(--cx-gold);
		color: var(--cx-bg);
	}

	.filter-mark {
		width: 0.32rem;
		height: 0.32rem;
		border: 1px solid currentColor;
		transform: rotate(45deg);
		opacity: 0.65;
	}

	.filter.active .filter-mark {
		background: currentColor;
	}

	.works-count {
		margin: 0;
		color: var(--cx-muted);
		font-size: 0.66rem;
	}

	.works-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.15rem;
		animation: works-in 420ms var(--ease-out) both;
	}

	@keyframes works-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.works-empty {
		padding: 2rem 0;
		color: var(--cx-muted);
		font-family: var(--f-serif);
		font-size: 1.2rem;
		font-style: italic;
	}

	.works-note {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		max-width: 70ch;
		margin: 1.6rem 0 0;
		color: var(--cx-faint);
		font-size: 0.64rem;
		line-height: 1.7;
	}

	.works-note span {
		color: var(--cx-gold);
	}

	@media (max-width: 760px) {
		.works-grid {
			grid-template-columns: 1fr;
		}

		.works-toolbar {
			align-items: flex-start;
		}
	}
</style>
