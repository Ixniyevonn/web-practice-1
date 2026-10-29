<script lang="ts">
	import { base } from "$app/paths";
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";

	const imageBase = `${base}/images/savva`;

	/** Keeps the long surname inside the copy column at every viewport width. */
	function fitTitle(node: HTMLElement) {
		let frame = 0;

		const fit = () => {
			node.style.removeProperty("font-size");
			const available = node.clientWidth;
			const lines = Array.from(node.querySelectorAll<HTMLElement>(".line-inner"));
			if (!available || !lines.length) return;

			const widest = Math.max(...lines.map((line) => line.getBoundingClientRect().width));
			const target = available * 0.94;
			if (widest > target) {
				const size = parseFloat(getComputedStyle(node).fontSize);
				node.style.fontSize = `${Math.max(24, size * (target / widest))}px`;
			}
		};

		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(fit);
		};

		const observer = new ResizeObserver(schedule);
		observer.observe(node.parentElement ?? node);
		schedule();
		document.fonts?.ready.then(schedule);

		return {
			destroy() {
				observer.disconnect();
				cancelAnimationFrame(frame);
			}
		};
	}
</script>

<section class="hero" id="top" aria-labelledby="hero-title">
	<div class="hero-grid-bg" aria-hidden="true"></div>
	<div class="hero-glow" aria-hidden="true"></div>

	<div class="hero-inner">
		<div class="hero-copy">
			<div class="eyebrow mono">
				<span>Портфолио / 2026</span>
				<span class="eyebrow-line" aria-hidden="true"></span>
				<span>{profile.city}</span>
			</div>

			<h1 class="hero-title" id="hero-title" use:fitTitle>
				<span class="line"><span class="line-inner">Савва</span></span>
				<span class="line line-accent"><span class="line-inner">Крупницкий</span></span>
			</h1>

			<p class="hero-role">Веб-разработчик <span aria-hidden="true">·</span> Геймдев <span aria-hidden="true">·</span> Музыка и звук</p>

			<p class="hero-lead">
				С 14 лет пишу код. Сейчас — фулстек на SvelteKit, прототипы на Unity и Godot,
				музыка в Ableton. Учусь на 5 курсе СПбГУПТД.
			</p>

			<div class="hero-actions">
				<a class="btn btn-blue" href="#works">
					Смотреть работы
					<Icon name="arrow-right" size={16} />
				</a>
				<a class="btn btn-ghost" href="#web-contact">
					Обсудить проект
					<Icon name="arrow-up-right" size={15} />
				</a>
			</div>

			<p class="hero-status">
				<span class="status-dot" aria-hidden="true"></span>
				{profile.status}
			</p>
		</div>

		<figure class="hero-portrait">
			<div class="portrait-offset" aria-hidden="true"></div>
			<div class="portrait-frame">
				<picture>
					<source
						type="image/webp"
						srcset={`${imageBase}-480.webp 480w, ${imageBase}-720.webp 720w, ${imageBase}-960.webp 960w, ${imageBase}-1280.webp 1280w`}
						sizes="(max-width: 900px) 88vw, 42vw"
					/>
					<img
						src={`${imageBase}-1280.jpg`}
						alt="Савва Крупницкий в лесу с борзой"
						width="1280"
						height="1920"
						fetchpriority="high"
						loading="eager"
					/>
				</picture>
				<span class="portrait-tint" aria-hidden="true"></span>
				<span class="portrait-shade" aria-hidden="true"></span>
				<span class="corner tl" aria-hidden="true"></span>
				<span class="corner tr" aria-hidden="true"></span>
				<span class="corner bl" aria-hidden="true"></span>
				<span class="corner br" aria-hidden="true"></span>
			</div>
			<figcaption class="portrait-caption">
				<span>Савва / Санкт-Петербург</span>
				<span>2026</span>
			</figcaption>
		</figure>
	</div>

	<div class="hero-footer">
		<a class="scroll-cue" href="#web-contact" aria-label="Прокрутить к контакту">
			<span class="mono">Листайте</span>
			<span class="scroll-track" aria-hidden="true"><span></span></span>
		</a>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100svh;
		padding-top: 4.65rem;
		overflow: hidden;
		background: var(--bp-bg);
		color: var(--bp-ink);
		transition:
			background-color var(--dur) var(--ease-out),
			color var(--dur) var(--ease-out),
			filter 900ms var(--ease-out),
			transform 1100ms var(--ease-out),
			opacity 800ms var(--ease-out);
		transform-origin: 50% 50%;
	}

	.hero ::selection {
		color: #fff;
		background: var(--bp-blue);
	}

	.hero-grid-bg {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--bp-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--bp-line) 1px, transparent 1px);
		background-size: 48px 48px;
		mask-image: radial-gradient(ellipse 90% 80% at 50% 38%, #000 20%, transparent 78%);
		opacity: 0.72;
		pointer-events: none;
	}

	.hero-glow {
		position: absolute;
		top: -20%;
		right: -10%;
		width: min(70vw, 900px);
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, var(--bp-blue-soft) 0%, transparent 66%);
		pointer-events: none;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1.06fr) minmax(280px, 0.78fr);
		align-items: center;
		gap: clamp(2.4rem, 6vw, 6.5rem);
		width: min(100% - 2 * var(--gutter), var(--maxw-wide));
		margin-inline: auto;
		padding-block: clamp(2rem, 5vh, 4.5rem);
		flex: 1;
	}

	.hero-copy {
		max-width: 50rem;
		animation: hero-copy-in 900ms var(--ease-out) both;
	}

	@keyframes hero-copy-in {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--bp-muted);
		font-size: 0.7rem;
		animation: hero-fade 900ms 80ms var(--ease-out) both;
	}

	.eyebrow-line {
		width: clamp(1rem, 3vw, 3rem);
		height: 1px;
		background: var(--bp-blue);
	}

	.hero-title {
		max-width: 100%;
		margin: 1.2rem 0 1.35rem;
		font-family: var(--f-sans);
		font-size: clamp(2.7rem, 7.8vw, 7.1rem);
		font-weight: 800;
		line-height: 0.84;
		letter-spacing: -0.065em;
		color: var(--bp-ink);
	}

	.hero-title .line {
		display: block;
		white-space: nowrap;
		animation: hero-title-in 1000ms 80ms var(--ease-out) both;
	}

	.hero-title .line-inner {
		display: inline-block;
		white-space: nowrap;
	}

	.hero-title .line-accent {
		color: var(--bp-blue);
		animation-delay: 150ms;
	}

	@keyframes hero-title-in {
		from {
			opacity: 0;
			transform: translateY(40px);
			clip-path: inset(0 0 100% 0);
		}
		to {
			opacity: 1;
			transform: none;
			clip-path: inset(0);
		}
	}

	@keyframes hero-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.hero-role {
		margin: 0 0 1.25rem;
		color: var(--bp-blue);
		font-family: var(--f-sans);
		font-size: clamp(1rem, 1.35vw, 1.18rem);
		font-weight: 650;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		animation: hero-fade 900ms 220ms var(--ease-out) both;
	}

	.hero-role span {
		opacity: 0.45;
		padding-inline: 0.2rem;
	}

	.hero-lead {
		max-width: 40rem;
		margin: 0 0 1.8rem;
		color: var(--bp-muted);
		font-size: clamp(1rem, 1.25vw, 1.15rem);
		line-height: 1.6;
		animation: hero-fade 900ms 300ms var(--ease-out) both;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		animation: hero-fade 900ms 380ms var(--ease-out) both;
	}

	.hero-status {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin: 1.5rem 0 0;
		color: var(--bp-muted);
		font-size: 0.86rem;
		line-height: 1.4;
		animation: hero-fade 900ms 460ms var(--ease-out) both;
	}

	.status-dot {
		position: relative;
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 50%;
		background: var(--bp-blue);
		box-shadow: 0 0 0 3px var(--bp-blue-soft);
	}

	.status-dot::after {
		content: "";
		position: absolute;
		inset: -3px;
		border: 1px solid var(--bp-blue);
		border-radius: 50%;
		animation: status-pulse 2.4s var(--ease-out) infinite;
	}

	@keyframes status-pulse {
		0% {
			opacity: 0.7;
			transform: scale(0.7);
		}
		70%,
		100% {
			opacity: 0;
			transform: scale(1.9);
		}
	}

	.hero-portrait {
		position: relative;
		justify-self: end;
		width: min(100%, 27rem);
		margin: 0;
		animation: portrait-in 1100ms 200ms var(--ease-out) both;
	}

	@keyframes portrait-in {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.portrait-offset {
		position: absolute;
		inset: 1.1rem -1.1rem -1.1rem 1.1rem;
		border: 1px solid var(--bp-blue-line);
		pointer-events: none;
	}

	.portrait-frame {
		position: relative;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		border: 1px solid var(--bp-line-strong);
		background: var(--bp-bg-deep);
		cursor: crosshair;
	}

	.portrait-frame picture,
	.portrait-frame img {
		width: 100%;
		height: 100%;
	}

	.portrait-frame img {
		object-fit: cover;
		object-position: 50% 31%;
		filter: grayscale(1) contrast(1.06) brightness(0.94);
		transform: scale(1.01);
		transition:
			filter 900ms var(--ease-out),
			transform 1200ms var(--ease-out);
	}

	.portrait-frame:hover img {
		filter: grayscale(0.15) contrast(1.02) brightness(1);
		transform: scale(1.035);
	}

	.portrait-tint {
		position: absolute;
		inset: 0;
		background: linear-gradient(155deg, rgba(29, 79, 255, 0.74), rgba(29, 79, 255, 0.1) 56%, rgba(6, 12, 24, 0.6));
		mix-blend-mode: color;
		opacity: 0.9;
		transition: opacity 700ms var(--ease-out);
		pointer-events: none;
	}

	.portrait-frame:hover .portrait-tint {
		opacity: 0.12;
	}

	.portrait-shade {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, rgba(5, 9, 16, 0.66), transparent 35%),
			linear-gradient(to bottom, rgba(5, 9, 16, 0.2), transparent 24%);
		pointer-events: none;
	}

	.corner {
		position: absolute;
		width: 0.8rem;
		height: 0.8rem;
		border-color: var(--bp-blue);
		border-style: solid;
		pointer-events: none;
	}

	.corner.tl {
		top: 0.45rem;
		left: 0.45rem;
		border-width: 1px 0 0 1px;
	}

	.corner.tr {
		top: 0.45rem;
		right: 0.45rem;
		border-width: 1px 1px 0 0;
	}

	.corner.bl {
		bottom: 0.45rem;
		left: 0.45rem;
		border-width: 0 0 1px 1px;
	}

	.corner.br {
		bottom: 0.45rem;
		right: 0.45rem;
		border-width: 0 1px 1px 0;
	}

	.portrait-caption {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1.25rem;
		color: var(--bp-muted);
		font-size: 0.78rem;
	}

	.hero-footer {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1.5rem;
		width: min(100% - 2 * var(--gutter), var(--maxw-wide));
		margin-inline: auto;
		padding-block: 1.1rem 1.4rem;
		border-top: 1px solid var(--bp-line);
	}

	.scroll-cue {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--bp-muted);
		font-size: 0.72rem;
		transition: color var(--dur-fast) var(--ease-out);
	}

	.scroll-cue:hover {
		color: var(--bp-blue);
	}

	.scroll-track {
		position: relative;
		width: 3.4rem;
		height: 1px;
		overflow: hidden;
		background: var(--bp-line-strong);
	}

	.scroll-track span {
		position: absolute;
		inset: 0;
		background: var(--bp-blue);
		transform: translateX(-100%);
		animation: scroll-line 2.2s var(--ease-in-out) infinite;
	}

	@keyframes scroll-line {
		0% {
			transform: translateX(-100%);
		}
		55%,
		100% {
			transform: translateX(100%);
		}
	}

	@media (max-width: 1280px) {
		.hero-inner {
			padding-block: 2rem;
		}

		.hero-portrait {
			width: min(100%, 25rem);
		}
	}

	@media (max-width: 980px) {
		.hero-inner {
			grid-template-columns: minmax(0, 1fr) minmax(220px, 0.55fr);
			gap: 2rem;
		}

		.hero-title {
			font-size: clamp(2.8rem, 7.6vw, 5.4rem);
		}
	}

	@media (max-width: 760px) {
		.hero {
			padding-top: 3.9rem;
		}

		.hero-inner {
			grid-template-columns: 1fr;
			align-content: center;
			gap: 1.7rem;
			padding-block: 1.4rem 1rem;
		}

		.hero-copy {
			display: contents;
		}

		.hero-copy > * {
			position: relative;
			z-index: 1;
		}

		.eyebrow {
			order: 1;
		}

		.hero-title {
			order: 2;
			margin: 0.4rem 0 0.7rem;
			font-size: clamp(2.35rem, 10.9vw, 4.2rem);
			line-height: 0.86;
			letter-spacing: -0.055em;
		}

		.hero-role {
			order: 3;
			margin-bottom: 0.8rem;
			font-size: 0.9rem;
			line-height: 1.35;
		}

		.hero-lead {
			order: 4;
			margin-bottom: 1rem;
			font-size: 0.96rem;
			line-height: 1.5;
		}

		.hero-actions {
			order: 5;
		}

		.hero-status {
			order: 6;
			margin-top: 0.9rem;
			font-size: 0.78rem;
		}

		.hero-portrait {
			order: 7;
			justify-self: stretch;
			width: 100%;
			max-width: none;
			margin-top: 0.2rem;
		}

		.portrait-frame {
			aspect-ratio: 16 / 9;
		}

		.portrait-frame img {
			object-position: 50% 36%;
		}

		.portrait-offset {
			display: none;
		}

		.portrait-caption {
			margin-top: 0.55rem;
			font-size: 0.7rem;
		}

		.hero-footer {
			display: none;
		}
	}

	@media (max-width: 420px) {
		.hero-title {
			font-size: clamp(2.2rem, 10.4vw, 3.6rem);
		}

		.hero-actions .btn {
			min-height: 2.65rem;
			padding-inline: 0.85rem;
			font-size: 0.6rem;
		}
	}

	@media (max-width: 360px) {
		.hero-inner {
			gap: 1.1rem;
		}

		.eyebrow .eyebrow-line,
		.eyebrow span:last-child {
			display: none;
		}

		.hero-lead {
			font-size: 0.92rem;
			line-height: 1.45;
		}

		.portrait-frame {
			aspect-ratio: 2.2 / 1;
		}

		.portrait-caption {
			display: none;
		}

		.hero-status {
			display: none;
		}
	}
</style>
