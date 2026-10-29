<script lang="ts">
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";
	import RuneImage from "./RuneImage.svelte";
	import RuneRing from "./RuneRing.svelte";

	const features = [
		{
			rune: 1,
			title: "Кодекс",
			color: "#e4b472",
			text: "Статьи, связи, поиск и версии. Мир, в котором можно заблудиться — и найтись."
		},
		{
			rune: 5,
			title: "Персонажи",
			color: "#57c6b2",
			text: "Листы героев, навыки, инвентарь и история изменений."
		},
		{
			rune: 9,
			title: "Карты",
			color: "#b98cff",
			text: "География, навигация и слои мира — от континентов до комнат."
		},
		{
			rune: 13,
			title: "Инструменты",
			color: "#d46655",
			text: "Календарь, калькуляторы, генераторы и мастерские панели."
		}
	];

	const requestUrl = `https://t.me/${profile.telegram}?text=${encodeURIComponent(
		"Привет! Хочу узнать больше о «Злорадстве Нихерии» — это про портфолио."
	)}`;
</script>

<section class="world" id="niheria" aria-labelledby="niheria-title">
	<div class="world-shell">
		<div class="world-bg" aria-hidden="true">
			<RuneRing runes={32} class="world-ring" />
			<span class="world-glow"></span>
		</div>

		<div class="world-inner">
			<header class="world-head" data-reveal>
				<p class="world-kicker mono">V / Мир <span aria-hidden="true">·</span> личный проект</p>
				<h2 class="world-title" id="niheria-title">Нихерия</h2>
				<p class="world-subtitle serif">Мир, который вырос из вики</p>
			</header>

			<div class="world-content">
				<div class="world-text" data-reveal style="--reveal-delay: 80ms">
					<p class="world-lead">
						Нихерия — мой личный проект на стыке литературы, ролевой игры и
						веб-разработки. Это исследование: как устроить большой мир так, чтобы в
						нём было удобно жить — и людям, и данным.
					</p>
					<p>
						Платформа собирает статьи, персонажей, карты, календарь и инструменты
						мастера. SvelteKit держит всё это вместе; за интерфейсами — PostgreSQL,
						TypeScript и много ручной работы с деталями. Это тот самый проект, где
						код, текст и звук перестают быть отдельными задачами.
					</p>
					<p class="world-quote">
						«Мир начинается с вопроса, на который хочется ответить.»
					</p>
				</div>

				<div class="world-features" data-reveal style="--reveal-delay: 140ms">
					{#each features as feature}
						<article class="world-feature" style={`--feature: ${feature.color}`}>
							<span class="feature-rune" aria-hidden="true">
								<RuneImage index={feature.rune} size={18} />
							</span>
							<h3>{feature.title}</h3>
							<p>{feature.text}</p>
						</article>
					{/each}
				</div>
			</div>

			<div class="world-foot" data-reveal style="--reveal-delay: 180ms">
				<p class="world-note mono">
					Проект в развитии · личный архив · детали по запросу
				</p>
				<div class="world-actions">
					<a class="btn btn-gold" href={requestUrl} target="_blank" rel="noopener noreferrer">
						Спросить о проекте
						<Icon name="arrow-up-right" size={15} />
					</a>
					<a class="btn btn-outline" href="#works">
						Вернуться к работам
						<Icon name="arrow-up-right" size={15} />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.world {
		position: relative;
		padding-block: clamp(3rem, 6vw, 6rem);
		background: #080604;
		color: #d8d0c5;
		overflow: hidden;
		scroll-margin-top: 4.65rem;
	}

	.world-shell {
		position: relative;
		width: min(100% - 2 * var(--gutter), var(--maxw-wide));
		margin-inline: auto;
		border: 1px solid rgba(228, 180, 114, 0.46);
		background:
			radial-gradient(ellipse 70% 80% at 50% 40%, rgba(228, 180, 114, 0.08), transparent 68%),
			#0b0806;
		box-shadow:
			inset 0 0 0 1px rgba(228, 180, 114, 0.08),
			inset 0 0 80px rgba(0, 0, 0, 0.8);
		isolation: isolate;
	}

	.world-shell::before,
	.world-shell::after {
		content: "";
		position: absolute;
		width: 1.1rem;
		height: 1.1rem;
		border-color: #e4b472;
		border-style: solid;
		z-index: 3;
		pointer-events: none;
	}

	.world-shell::before {
		top: 0.45rem;
		left: 0.45rem;
		border-width: 1px 0 0 1px;
	}

	.world-shell::after {
		right: 0.45rem;
		bottom: 0.45rem;
		border-width: 0 1px 1px 0;
	}

	.world-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		display: grid;
		place-items: center;
		overflow: hidden;
		pointer-events: none;
	}

	.world-bg::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: var(--cx-noise);
		opacity: 0.32;
		mix-blend-mode: soft-light;
	}

	.world-bg::after {
		content: "";
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 70% 60% at 50% 42%, transparent 30%, rgba(0, 0, 0, 0.42) 100%),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.25), transparent 18%, transparent 82%, rgba(0, 0, 0, 0.35));
	}

	.world-bg :global(.world-ring) {
		width: min(88vw, 920px);
		height: auto;
		color: #e4b472;
		opacity: 0.14;
		animation: world-turn 120s linear infinite;
	}

	@keyframes world-turn {
		to {
			transform: rotate(360deg);
		}
	}

	.world-glow {
		position: absolute;
		width: 54%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(228, 180, 114, 0.12), transparent 66%);
		filter: blur(20px);
	}

	.world-inner {
		position: relative;
		z-index: 1;
		padding: clamp(2rem, 5vw, 5rem);
	}

	.world-head {
		text-align: center;
	}

	.world-kicker {
		margin: 0 0 0.8rem;
		color: #e4b472;
		font-size: 0.74rem;
	}

	.world-kicker span {
		opacity: 0.45;
		padding-inline: 0.2rem;
	}

	.world-title {
		margin: 0;
		font-size: clamp(3.4rem, 11vw, 9rem);
		font-weight: 700;
		line-height: 0.8;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #e4b472;
		background: linear-gradient(180deg, #ffd7a6 8%, #e4b472 46%, #9a652d 92%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: drop-shadow(0 4px 30px rgba(228, 180, 114, 0.16));
	}

	.world-subtitle {
		margin: 1rem 0 0;
		color: #c9b79e;
		font-size: clamp(1rem, 1.8vw, 1.3rem);
		font-style: italic;
	}

	.world-content {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
		gap: clamp(2rem, 5vw, 4.5rem);
		margin-top: clamp(2.2rem, 5vw, 4rem);
	}

	.world-text {
		max-width: 42rem;
	}

	.world-text p {
		color: #b8aa9a;
		font-size: 0.96rem;
		line-height: 1.72;
	}

	.world-lead {
		color: #e4d6c2 !important;
		font-family: var(--f-serif);
		font-size: clamp(1.2rem, 1.9vw, 1.5rem) !important;
		line-height: 1.5 !important;
	}

	.world-lead::first-letter {
		float: left;
		margin: 0.15rem 0.5rem 0 0;
		color: #e4b472;
		font-family: var(--f-serif);
		font-size: 3.6rem;
		line-height: 0.78;
	}

	.world-quote {
		margin-top: 1.6rem !important;
		padding-top: 1.1rem;
		border-top: 1px solid rgba(228, 180, 114, 0.25);
		color: #e4b472 !important;
		font-family: var(--f-serif);
		font-size: 1.2rem !important;
		font-style: italic;
		line-height: 1.45 !important;
	}

	.world-features {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.7rem;
		align-content: start;
	}

	.world-feature {
		padding: 1rem;
		border: 1px solid color-mix(in srgb, var(--feature, #e4b472) 28%, transparent);
		background:
			linear-gradient(150deg, color-mix(in srgb, var(--feature, #e4b472) 8%, transparent), transparent 55%),
			rgba(228, 180, 114, 0.025);
		transition:
			border-color var(--dur) var(--ease-out),
			background-color var(--dur) var(--ease-out);
	}

	.world-feature:hover {
		border-color: color-mix(in srgb, var(--feature, #e4b472) 65%, transparent);
		background: color-mix(in srgb, var(--feature, #e4b472) 9%, transparent);
	}

	.feature-rune {
		display: inline-block;
		margin-bottom: 0.7rem;
		color: var(--feature, #e4b472);
		opacity: 0.9;
	}

	.world-feature h3 {
		margin-bottom: 0.35rem;
		color: var(--feature, #e4b472);
		font-size: 1.12rem;
	}

	.world-feature p {
		margin: 0;
		color: #a99b8b;
		font-size: 0.84rem;
		line-height: 1.55;
	}

	.world-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.2rem;
		margin-top: clamp(2rem, 4vw, 3.5rem);
		padding-top: 1.2rem;
		border-top: 1px solid rgba(228, 180, 114, 0.25);
	}

	.world-note {
		margin: 0;
		color: #8a7d6e;
		font-size: 0.64rem;
	}

	.world-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.world-actions .btn-gold {
		background: #e4b472;
		border-color: #e4b472;
		color: #0b0806;
	}

	.world-actions .btn-outline {
		border-color: rgba(228, 180, 114, 0.55);
		color: #e4b472;
	}

	.world-actions .btn-outline:hover {
		background: rgba(228, 180, 114, 0.1);
		border-color: #e4b472;
	}

	@media (max-width: 900px) {
		.world-content {
			grid-template-columns: 1fr;
		}

		.world-features {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.world-inner {
			padding: 1.4rem;
		}

		.world-title {
			font-size: clamp(2.8rem, 15vw, 4.4rem);
			letter-spacing: 0.04em;
		}

		.world-features {
			grid-template-columns: 1fr;
		}

		.world-foot {
			align-items: flex-start;
			flex-direction: column;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.world-bg :global(.world-ring) {
			animation: none;
		}
	}
</style>
