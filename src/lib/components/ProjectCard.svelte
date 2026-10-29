<script lang="ts">
	import type { Project } from "$lib/content";
	import Icon from "./Icon.svelte";
	import ProjectArt from "./ProjectArt.svelte";
	import RuneImage from "./RuneImage.svelte";

	let { project, wide = false }: { project: Project; wide?: boolean } = $props();

	const isInternal = $derived(project.href.startsWith("#"));
	const categoryLabel = $derived(
		project.category === "web" ? "Веб-платформа" : "Инструмент / игра"
	);
</script>

<article class="project" class:featured={project.featured} class:wide>
	{#if project.featured}
		<span class="featured-corner tl" aria-hidden="true"></span>
		<span class="featured-corner tr" aria-hidden="true"></span>
		<span class="featured-corner bl" aria-hidden="true"></span>
		<span class="featured-corner br" aria-hidden="true"></span>
	{/if}

	<a
		class="project-art"
		href={project.href}
		target={isInternal ? undefined : "_blank"}
		rel={isInternal ? undefined : "noopener noreferrer"}
		aria-label={`${project.title} — ${project.linkLabel}`}
	>
		<ProjectArt variant={project.cover} />
		<span class="art-open" aria-hidden="true">
			<Icon name="arrow-up-right" size={18} />
		</span>
	</a>

	<div class="project-body">
		<div class="project-meta">
			<span class="tag tag-gold">{categoryLabel}</span>
			<span class="project-status mono">{project.status}</span>
		</div>

		<h3 class="project-title">
			<a
				href={project.href}
				target={isInternal ? undefined : "_blank"}
				rel={isInternal ? undefined : "noopener noreferrer"}
			>
				{project.title}
			</a>
		</h3>

		<p class="project-subtitle">{project.subtitle}</p>
		<p class="project-desc">{project.description}</p>

		<ul class="project-stack" aria-label="Стек">
			{#each project.stack as item}
				<li class="mono">{item}</li>
			{/each}
		</ul>

		<div class="project-foot">
			<a
				class="project-link"
				href={project.href}
				target={isInternal ? undefined : "_blank"}
				rel={isInternal ? undefined : "noopener noreferrer"}
			>
				{project.linkLabel}
				<Icon name="arrow-right" size={14} />
			</a>
		</div>

		{#if project.hint}
			<p class="project-hint">
				<span class="hint-rune" aria-hidden="true">
					<RuneImage index={8} size={14} />
				</span>
				{project.hint}
			</p>
		{/if}
	</div>
</article>

<style>
	.project {
		position: relative;
		display: flex;
		flex-direction: column;
		min-width: 0;
		border: 1px solid var(--cx-line);
		background:
			linear-gradient(145deg, color-mix(in srgb, var(--cx-gold) 5%, transparent), transparent 42%),
			var(--cx-panel);
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 4%, transparent),
			0 16px 44px color-mix(in srgb, var(--cx-shadow) 35%, transparent);
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out),
			box-shadow var(--dur) var(--ease-out);
	}

	.project::before {
		content: "";
		position: absolute;
		top: -1px;
		left: 8%;
		right: 8%;
		height: 1px;
		z-index: 2;
		background: linear-gradient(90deg, transparent, var(--cx-gold), transparent);
		opacity: 0.35;
		pointer-events: none;
	}

	.project:hover {
		border-color: var(--cx-line-strong);
		transform: translateY(-3px);
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 6%, transparent),
			0 22px 60px var(--cx-shadow);
	}

	.project-art {
		position: relative;
		display: block;
		overflow: hidden;
		border-bottom: 1px solid var(--cx-line);
	}

	.project:not(.featured) .project-art {
		aspect-ratio: 16 / 9;
	}

	.project-art :global(.art) {
		height: 100%;
	}

	.project:hover .project-art :global(.art svg) {
		transform: scale(1.035);
	}

	.project.featured .project-art :global(.art svg) {
		transform: scale(1.02);
	}

	.project.featured:hover .project-art :global(.art svg) {
		transform: scale(1.06);
	}

	.project.wide:hover .project-art :global(.art svg) {
		transform: scale(1.045);
	}

	.art-open {
		position: absolute;
		right: 0.8rem;
		top: 0.8rem;
		display: grid;
		place-items: center;
		width: 2.1rem;
		height: 2.1rem;
		border: 1px solid var(--cx-line-strong);
		background: color-mix(in srgb, var(--cx-bg) 60%, transparent);
		color: var(--cx-gold);
		backdrop-filter: blur(5px);
		opacity: 0;
		transform: translate(-4px, 4px);
		transition:
			opacity var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.project:hover .art-open,
	.project-art:focus-visible .art-open {
		opacity: 1;
		transform: none;
	}

	.project-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: clamp(1.1rem, 2.2vw, 1.7rem);
	}

	.project-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.85rem;
	}

	.project-status {
		color: var(--cx-muted);
		font-size: 0.68rem;
		letter-spacing: 0.04em;
	}

	.project-title {
		margin-bottom: 0.25rem;
		font-size: clamp(1.4rem, 2.2vw, 1.9rem);
		line-height: 1.1;
	}

	.project-title a {
		transition: color var(--dur-fast) var(--ease-out);
	}

	.project-title a:hover {
		color: var(--cx-gold-bright);
	}

	.project-subtitle {
		margin: 0 0 0.85rem;
		color: var(--cx-gold);
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.project-desc {
		margin: 0 0 1.1rem;
		color: var(--cx-muted);
		font-size: 0.87rem;
		line-height: 1.6;
	}

	.project-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: auto;
	}

	.project-stack li {
		padding: 0.2rem 0.48rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-muted);
		font-size: 0.63rem;
		letter-spacing: 0.03em;
	}

	.project-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 0.7rem;
		margin-top: 1rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--cx-line);
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--cx-gold);
		font-family: var(--f-mono);
		font-size: 0.68rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		transition:
			gap var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.project-link:hover {
		gap: 0.7rem;
		color: var(--cx-gold-bright);
	}

	.project-hint {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0.9rem 0 0;
		padding-top: 0.75rem;
		border-top: 1px dashed var(--cx-line);
		color: var(--cx-gold);
		font-family: var(--f-serif);
		font-size: 1.02rem;
		font-style: italic;
		line-height: 1.35;
	}

	.hint-rune {
		flex: none;
		opacity: 0.8;
	}

	/* Featured and wide portal cards */
	.project.featured,
	.project.wide {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
		border-color: var(--cx-line-strong);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 7%, transparent);
	}

	.project.featured {
		background:
			radial-gradient(ellipse 70% 90% at 0% 50%, rgba(228, 180, 114, 0.1), transparent 60%),
			var(--cx-panel);
	}

	.project.featured .project-art,
	.project.wide .project-art {
		min-height: 24rem;
		border-bottom: 0;
		border-right: 1px solid var(--cx-line);
	}

	.project.wide .project-art {
		min-height: 20rem;
	}

	.project.featured .project-body,
	.project.wide .project-body {
		justify-content: center;
	}

	.project.featured .project-title {
		font-size: clamp(2rem, 3.4vw, 3.4rem);
		letter-spacing: -0.03em;
	}

	.project.featured .project-subtitle {
		font-size: 0.9rem;
	}

	.project.featured .project-desc {
		font-size: 0.98rem;
	}

	.featured-corner {
		position: absolute;
		z-index: 2;
		width: 0.7rem;
		height: 0.7rem;
		border-color: var(--cx-gold);
		border-style: solid;
		pointer-events: none;
	}

	.featured-corner.tl {
		top: 0.35rem;
		left: 0.35rem;
		border-width: 1px 0 0 1px;
	}
	.featured-corner.tr {
		top: 0.35rem;
		right: 0.35rem;
		border-width: 1px 1px 0 0;
	}
	.featured-corner.bl {
		bottom: 0.35rem;
		left: 0.35rem;
		border-width: 0 0 1px 1px;
	}
	.featured-corner.br {
		bottom: 0.35rem;
		right: 0.35rem;
		border-width: 0 1px 1px 0;
	}

	@media (max-width: 860px) {
		.project.featured,
		.project.wide {
			grid-template-columns: 1fr;
		}

		.project.featured .project-art,
		.project.wide .project-art {
			min-height: 0;
			aspect-ratio: 16 / 9;
			border-right: 0;
			border-bottom: 1px solid var(--cx-line);
		}
	}
</style>
