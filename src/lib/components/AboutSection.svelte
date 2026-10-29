<script lang="ts">
	import { base } from "$app/paths";
	import { principles, profile } from "$lib/content";
	import RuneImage from "./RuneImage.svelte";
	import SectionHeader from "./SectionHeader.svelte";

	const imageBase = `${base}/images/savva`;

	const facts = [
		{ label: "Локация", value: profile.city },
		{ label: "Учёба", value: `${profile.university}, ${profile.course}` },
		{ label: "Направление", value: profile.program },
		{ label: "Работа", value: `${profile.workplace} — веб-разработчик` },
		{ label: "Языки", value: profile.languages },
		{ label: "Статус", value: profile.status }
	];
</script>

<section class="section about" id="about" aria-labelledby="about-title">
	<div class="about-rune" aria-hidden="true">
		<RuneImage index={8} size={220} />
	</div>

	<div class="container">
		<SectionHeader
			index="I"
			label="Кодекс"
			title="Код, форма, звук"
			id="about-title"
			rune={0}
			lead="Меня зовут Савва. Я веб-разработчик и геймдев-энтузиаст из Санкт-Петербурга. Учусь на пятом курсе СПбГУПТД по направлению «Прикладная информатика в дизайне»."
		/>

		<div class="about-grid">
			<figure class="about-portrait" data-reveal>
				<div class="portrait-frame">
					<picture>
						<source
							type="image/webp"
							srcset={`${imageBase}-480.webp 480w, ${imageBase}-720.webp 720w, ${imageBase}-960.webp 960w`}
							sizes="(max-width: 860px) 84vw, 34vw"
						/>
						<img
							src={`${imageBase}-960.webp`}
							alt="Савва Крупницкий на прогулке в лесу"
							width="960"
							height="1440"
							loading="lazy"
						/>
					</picture>
					<span class="corner tl" aria-hidden="true"></span>
					<span class="corner tr" aria-hidden="true"></span>
					<span class="corner bl" aria-hidden="true"></span>
					<span class="corner br" aria-hidden="true"></span>
				</div>
				<figcaption class="mono">
					<span>Санкт-Петербург</span>
					<span>личный архив</span>
				</figcaption>
			</figure>

			<div class="about-copy" data-reveal style="--reveal-delay: 100ms">
				<p class="about-lead">
					Разработка для меня началась в 14 лет и с тех пор остаётся способом строить
					миры: от интерфейсов и вики-платформ до игровых прототипов и музыки.
				</p>
				<p>
					Мне интересны проекты на стыке инженерии и художественной формы — там, где
					техническое решение должно быть не только правильным, но и уместным. Я люблю
					чистые системы, которые можно менять без страха, и интерфейсы, в которые
					хочется возвращаться.
				</p>
				<p>
					Работаю веб-разработчиком в ЦТ1520. Участвовал в геймджемах; люблю
					ограниченное время, командную работу и необходимость довести идею до
					играбельного состояния. В личных проектах исследую SvelteKit, Jai,
					Obsidian и визуальные эффекты. Принимаю предложения по веб- и
					геймдев-проектам; музыка — отдельная история.
				</p>

				<blockquote class="about-quote">
					<p>
						«Хороший интерфейс — это портал. Он не объясняет, что за ним мир; он его
						открывает.»
					</p>
					<cite class="mono">— из заметок к этому сайту</cite>
				</blockquote>
			</div>
		</div>

		<dl class="facts" data-reveal>
			{#each facts as fact}
				<div class="fact">
					<dt class="mono">{fact.label}</dt>
					<dd>{fact.value}</dd>
				</div>
			{/each}
		</dl>

		<div class="principles">
			{#each principles as principle, i}
				<article
					class="principle"
					data-reveal
					style={`--reveal-delay: ${i * 80}ms`}
				>
					<span class="principle-index mono">{principle.index}</span>
					<h3>{principle.title}</h3>
					<p>{principle.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.about {
		position: relative;
		background:
			radial-gradient(ellipse 50% 40% at 0% 0%, var(--cx-glow), transparent 70%),
			var(--cx-bg);
	}

	.about-rune {
		position: absolute;
		top: 7rem;
		right: 4rem;
		color: var(--cx-gold);
		opacity: 0.06;
		pointer-events: none;
		transform: rotate(12deg);
	}

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
		gap: clamp(2rem, 6vw, 6rem);
		align-items: start;
		margin-top: clamp(2rem, 4vw, 3.5rem);
	}

	.about-portrait {
		position: sticky;
		top: 6.5rem;
		margin: 0;
	}

	.portrait-frame {
		position: relative;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		border: 1px solid var(--cx-line-strong);
		background: var(--cx-panel);
	}

	.portrait-frame picture,
	.portrait-frame img {
		width: 100%;
		height: 100%;
	}

	.portrait-frame img {
		object-fit: cover;
		object-position: 50% 30%;
		filter: saturate(0.78) contrast(1.04) sepia(0.12);
		transition:
			filter 700ms var(--ease-out),
			transform 900ms var(--ease-out);
	}

	.about-portrait:hover img {
		filter: saturate(1) contrast(1.02) sepia(0.04);
		transform: scale(1.025);
	}

	.portrait-frame::after {
		content: "";
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, rgba(12, 10, 8, 0.5), transparent 34%),
			linear-gradient(140deg, rgba(228, 180, 114, 0.18), transparent 45%);
		pointer-events: none;
	}

	.corner {
		position: absolute;
		z-index: 2;
		width: 0.7rem;
		height: 0.7rem;
		border-color: var(--cx-gold);
		border-style: solid;
		pointer-events: none;
	}

	.corner.tl {
		top: 0.4rem;
		left: 0.4rem;
		border-width: 1px 0 0 1px;
	}
	.corner.tr {
		top: 0.4rem;
		right: 0.4rem;
		border-width: 1px 1px 0 0;
	}
	.corner.bl {
		bottom: 0.4rem;
		left: 0.4rem;
		border-width: 0 0 1px 1px;
	}
	.corner.br {
		bottom: 0.4rem;
		right: 0.4rem;
		border-width: 0 1px 1px 0;
	}

	.about-portrait figcaption {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 0.8rem;
		color: var(--cx-faint);
		font-size: 0.66rem;
	}

	.about-copy {
		max-width: 48rem;
		padding-top: 0.4rem;
	}

	.about-copy p {
		color: var(--cx-muted);
		font-size: clamp(0.98rem, 1.1vw, 1.08rem);
		line-height: 1.72;
	}

	.about-lead {
		color: var(--cx-ink) !important;
		font-family: var(--f-serif);
		font-size: clamp(1.35rem, 2.1vw, 1.85rem) !important;
		line-height: 1.35 !important;
	}

	.about-lead::first-letter {
		float: left;
		margin: 0.12rem 0.55rem 0 0;
		color: var(--cx-gold);
		font-family: var(--f-serif);
		font-size: 3.8rem;
		line-height: 0.78;
	}

	.about-quote {
		margin: 2rem 0 0;
		padding: 1.4rem 0 0 1.4rem;
		border-left: 1px solid var(--cx-gold);
	}

	.about-quote p {
		margin: 0 0 0.7rem;
		color: var(--cx-gold) !important;
		font-family: var(--f-serif);
		font-size: clamp(1.15rem, 1.8vw, 1.45rem) !important;
		font-style: italic;
		line-height: 1.45 !important;
	}

	.about-quote cite {
		color: var(--cx-faint);
		font-size: 0.64rem;
		font-style: normal;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0;
		margin: clamp(2.5rem, 5vw, 4rem) 0 0;
		border-top: 1px solid var(--cx-line);
		border-left: 1px solid var(--cx-line);
	}

	.fact {
		padding: 1rem 1.1rem;
		border-right: 1px solid var(--cx-line);
		border-bottom: 1px solid var(--cx-line);
	}

	.fact dt {
		margin-bottom: 0.35rem;
		color: var(--cx-gold);
		font-size: 0.66rem;
		opacity: 0.85;
	}

	.fact dd {
		margin: 0;
		color: var(--cx-ink);
		font-size: 0.9rem;
		line-height: 1.45;
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		margin-top: clamp(2.5rem, 5vw, 4rem);
		background: var(--cx-line);
		border: 1px solid var(--cx-line);
	}

	.principle {
		padding: clamp(1.2rem, 2.5vw, 1.8rem);
		background: var(--cx-bg);
	}

	.principle-index {
		display: block;
		margin-bottom: 1.1rem;
		color: var(--cx-gold);
		font-size: 0.68rem;
	}

	.principle h3 {
		margin-bottom: 0.6rem;
		font-size: clamp(1.1rem, 1.6vw, 1.35rem);
		line-height: 1.2;
	}

	.principle p {
		margin: 0;
		color: var(--cx-muted);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	@media (max-width: 860px) {
		.about-grid {
			grid-template-columns: 1fr;
		}

		.about-portrait {
			position: relative;
			top: 0;
			max-width: 26rem;
		}

		.facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.principles {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.facts {
			grid-template-columns: 1fr;
		}
	}
</style>
