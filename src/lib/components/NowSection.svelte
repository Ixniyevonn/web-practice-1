<script lang="ts">
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";
	import RuneImage from "./RuneImage.svelte";
	import SectionHeader from "./SectionHeader.svelte";

	const nowCards = [
		{
			rune: 3,
			label: "Учу",
			title: "Jai, движки, внутренности веба",
			text: "Разбираюсь в Jai и игровых движках, углубляюсь в SvelteKit и Obsidian API. Учусь не коллекционировать технологии, а доводить вещи до состояния, которым хочется пользоваться."
		},
		{
			rune: 7,
			label: "Делаю",
			title: "Нихерия, плагины, этот сайт",
			text: "Развиваю личную вики-платформу, собираю плагины для Obsidian, экспериментирую с визуальными переходами и анимациями. Иногда — прототипы для геймджемов."
		},
		{
			rune: 11,
			label: "Слушаю",
			title: "Рок, электроника, оркестр",
			text: "От гитарного рока и электроники до оркестровых партитур. Музыка для меня — не фон, а ещё один способ думать о структуре, ритме и напряжении."
		},
		{
			rune: 14,
			label: "Читаю",
			title: "Фантастика, фэнтези, драма",
			text: "Люблю миры, где глубокая вселенная важнее декораций, и драму, где решения имеют вес. На заказ тексты не пишу — это личная территория."
		}
	];

	const soundtrackUrl = `https://t.me/${profile.telegram}?text=${encodeURIComponent(
		"Привет! Хочу обсудить музыку или звук для проекта."
	)}`;
</script>

<section class="section now" id="now" aria-labelledby="now-title">
	<div class="now-watermark" aria-hidden="true">
		<RuneImage index={6} size="100%" />
	</div>
	<div class="container">
		<SectionHeader
			index="VI"
			label="Вне кода"
			title="Что происходит сейчас"
			id="now-title"
			rune={5}
			lead="Не резюме, а рабочая область: что изучаю, что делаю, что слушаю и читаю. Музыка вынесена отдельно — это другая услуга и другая ответственность."
		/>

		<div class="now-grid">
			{#each nowCards as card, i}
				<article class="now-card" data-reveal style={`--reveal-delay: ${i * 70}ms`}>
					<div class="now-card-head">
						<span class="now-rune" aria-hidden="true"><RuneImage index={card.rune} size={16} /></span>
						<span class="now-label mono">{card.label}</span>
					</div>
					<h3>{card.title}</h3>
					<p>{card.text}</p>
				</article>
			{/each}
		</div>

		<article class="soundtrack" data-reveal>
			<div class="soundtrack-copy">
				<p class="soundtrack-kicker mono">Отдельный запрос · не веб-разработка</p>
				<h3>Музыка и звук</h3>
				<p>
					Пишу музыку в Ableton: рок, электроника, оркестровые аранжировки. Могу
					собрать тему для игры, ролика или атмосферного проекта — от наброска до
					финальной аранжировки. Это отдельная история, и обсуждать её лучше отдельно
					от кода.
				</p>
				<div class="soundtrack-actions">
					<a class="btn btn-gold" href={soundtrackUrl} target="_blank" rel="noopener noreferrer">
						Обсудить музыку
						<Icon name="arrow-up-right" size={15} />
					</a>
				</div>
			</div>

			<div class="wave" aria-hidden="true">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</article>
	</div>
</section>

<style>
	.now {
		overflow: hidden;
		background:
			radial-gradient(ellipse 50% 40% at 0% 100%, var(--cx-glow), transparent 65%),
			var(--cx-bg);
	}

	.now-watermark {
		position: absolute;
		top: 12%;
		right: 3%;
		width: clamp(160px, 22vw, 300px);
		aspect-ratio: 1;
		color: var(--cx-gold);
		opacity: 0.035;
		transform: rotate(-10deg);
		pointer-events: none;
	}

	.now-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.now-card {
		position: relative;
		padding: clamp(1.2rem, 2.5vw, 1.7rem);
		border: 1px solid var(--cx-line);
		background:
			linear-gradient(145deg, color-mix(in srgb, var(--cx-gold) 5%, transparent), transparent 42%),
			var(--cx-panel);
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 4%, transparent),
			0 16px 44px color-mix(in srgb, var(--cx-shadow) 45%, transparent);
		transition:
			border-color var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-out),
			box-shadow var(--dur) var(--ease-out);
	}

	.now-card::before {
		content: "";
		position: absolute;
		top: -1px;
		left: 10%;
		right: 10%;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--cx-gold), transparent);
		opacity: 0.4;
	}

	.now-card:hover {
		border-color: var(--cx-line-strong);
		transform: translateY(-2px);
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 6%, transparent),
			0 24px 60px color-mix(in srgb, var(--cx-shadow) 60%, transparent);
	}

	.now-card-head {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.8rem;
	}

	.now-rune {
		display: grid;
		place-items: center;
		width: 1.8rem;
		height: 1.8rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-gold);
	}

	.now-label {
		color: var(--cx-gold);
		font-size: 0.7rem;
	}

	.now-card h3 {
		margin-bottom: 0.5rem;
		font-size: clamp(1.15rem, 1.7vw, 1.45rem);
		line-height: 1.2;
	}

	.now-card p {
		margin: 0;
		color: var(--cx-muted);
		font-size: 0.92rem;
		line-height: 1.65;
	}

	.soundtrack {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
		margin-top: 1rem;
		padding: clamp(1.4rem, 3vw, 2.2rem);
		border: 1px solid var(--cx-line-strong);
		background:
			linear-gradient(120deg, color-mix(in srgb, var(--cx-gold) 8%, transparent), transparent 48%),
			var(--cx-panel-2);
	}

	.soundtrack-kicker {
		margin: 0 0 0.5rem;
		color: var(--cx-gold);
		font-size: 0.68rem;
	}

	.soundtrack h3 {
		margin-bottom: 0.6rem;
		font-size: clamp(1.8rem, 3.2vw, 2.6rem);
	}

	.soundtrack p {
		max-width: 48ch;
		margin: 0 0 1.1rem;
		color: var(--cx-muted);
		font-size: 0.9rem;
		line-height: 1.65;
	}

	.soundtrack-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1.2rem;
	}

	.wave {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.28rem;
		height: 8rem;
		padding: 1rem;
		border-left: 1px solid var(--cx-line);
	}

	.wave span {
		width: 0.18rem;
		height: calc(12% + (var(--i, 1) * 3%));
		max-height: 72%;
		background: var(--cx-gold);
		opacity: 0.55;
		animation: wave-pulse 1.8s var(--ease-in-out) infinite alternate;
		animation-delay: calc(var(--i, 1) * -90ms);
	}

	.wave span:nth-child(1) { --i: 2; height: 18%; }
	.wave span:nth-child(2) { --i: 5; height: 42%; }
	.wave span:nth-child(3) { --i: 8; height: 28%; }
	.wave span:nth-child(4) { --i: 11; height: 64%; }
	.wave span:nth-child(5) { --i: 3; height: 22%; }
	.wave span:nth-child(6) { --i: 7; height: 52%; }
	.wave span:nth-child(7) { --i: 9; height: 36%; }
	.wave span:nth-child(8) { --i: 4; height: 70%; }
	.wave span:nth-child(9) { --i: 12; height: 48%; }
	.wave span:nth-child(10) { --i: 6; height: 30%; }
	.wave span:nth-child(11) { --i: 10; height: 60%; }
	.wave span:nth-child(12) { --i: 2; height: 24%; }
	.wave span:nth-child(13) { --i: 8; height: 44%; }
	.wave span:nth-child(14) { --i: 5; height: 18%; }
	.wave span:nth-child(15) { --i: 11; height: 58%; }
	.wave span:nth-child(16) { --i: 3; height: 34%; }
	.wave span:nth-child(17) { --i: 9; height: 66%; }
	.wave span:nth-child(18) { --i: 6; height: 26%; }
	.wave span:nth-child(19) { --i: 12; height: 50%; }
	.wave span:nth-child(20) { --i: 4; height: 38%; }
	.wave span:nth-child(21) { --i: 7; height: 20%; }
	.wave span:nth-child(22) { --i: 10; height: 56%; }
	.wave span:nth-child(23) { --i: 2; height: 32%; }
	.wave span:nth-child(24) { --i: 8; height: 68%; }
	.wave span:nth-child(25) { --i: 5; height: 24%; }
	.wave span:nth-child(26) { --i: 11; height: 46%; }
	.wave span:nth-child(27) { --i: 3; height: 62%; }
	.wave span:nth-child(28) { --i: 9; height: 28%; }
	.wave span:nth-child(29) { --i: 6; height: 40%; }
	.wave span:nth-child(30) { --i: 12; height: 18%; }

	@keyframes wave-pulse {
		from {
			transform: scaleY(0.55);
			opacity: 0.35;
		}
		to {
			transform: scaleY(1);
			opacity: 0.75;
		}
	}

	@media (max-width: 820px) {
		.now-grid {
			grid-template-columns: 1fr;
		}

		.soundtrack {
			grid-template-columns: 1fr;
		}

		.wave {
			border-left: 0;
			border-top: 1px solid var(--cx-line);
			height: 6rem;
			order: -1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.wave span {
			animation: none;
		}
	}
</style>
