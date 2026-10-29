<script lang="ts">
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";
	import WebContactForm from "./WebContactForm.svelte";
</script>

<section class="web-contact" id="web-contact" aria-labelledby="web-contact-title">
	<div class="web-grid-bg" aria-hidden="true"></div>
	<div class="container">
		<div class="web-grid">
			<div class="web-copy" data-reveal>
				<p class="web-eyebrow mono">Прямой контакт / до портала</p>
				<h2 id="web-contact-title">Веб и геймдев</h2>
				<p class="web-lead">
					Портал ниже ведёт в Нихерию — тёмный мир, музыку и геймдев. Если нужен
					сайт, интерфейс, фулстек-разработка или игровой прототип — напишите
					здесь, не проходя портал.
				</p>

				<ul class="web-list">
					<li>
						<span class="list-mark" aria-hidden="true"></span>
						Сайты и интерфейсы: SvelteKit, Next.js, TypeScript
					</li>
					<li>
						<span class="list-mark" aria-hidden="true"></span>
						Фулстек, API, базы данных, интеграции
					</li>
					<li>
						<span class="list-mark" aria-hidden="true"></span>
						Геймдев-прототипы: Unity, Godot, Jai
					</li>
				</ul>

				<div class="web-links">
					<a href={profile.telegramUrl} target="_blank" rel="noopener noreferrer">
						<Icon name="telegram" size={16} />
						@{profile.telegram}
					</a>
					<a href={`mailto:${profile.email}`}>
						<Icon name="mail" size={16} />
						{profile.email}
					</a>
				</div>

				<p class="web-note mono">
					Геймдев и музыка после портала — отдельная форма внизу.
				</p>
			</div>

			<div class="web-form-wrap" data-reveal style="--reveal-delay: 100ms">
				<div class="form-head">
					<span class="mono">Демо-форма / без сервера</span>
					<h3>Коротко о задаче</h3>
					<p>
						Проверьте поля — форма честно скажет, что письмо не отправлено, и
						предложит прямые контакты.
					</p>
				</div>
				<WebContactForm />
			</div>
		</div>
	</div>
</section>

<style>
	.web-contact {
		position: relative;
		padding-block: clamp(3.5rem, 7vw, 6rem);
		overflow: hidden;
		border-top: 1px solid var(--bp-line);
		border-bottom: 1px solid var(--bp-line);
		background: var(--bp-bg);
		color: var(--bp-ink);
		scroll-margin-top: 5rem;
	}

	.web-grid-bg {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--bp-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--bp-line) 1px, transparent 1px);
		background-size: 48px 48px;
		mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, #000 12%, transparent 82%);
		opacity: 0.6;
		pointer-events: none;
	}

	.web-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: start;
	}

	.web-eyebrow {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		margin: 0 0 1rem;
		color: var(--bp-blue);
		font-size: 0.7rem;
	}

	.web-eyebrow::before {
		content: "";
		width: 2rem;
		height: 1px;
		background: currentColor;
	}

	.web-copy h2 {
		margin: 0 0 1.1rem;
		font-family: var(--f-sans);
		font-size: clamp(2.3rem, 4.8vw, 4.2rem);
		font-weight: 800;
		line-height: 0.95;
		letter-spacing: -0.05em;
		color: var(--bp-ink);
	}

	.web-lead {
		max-width: 42rem;
		margin: 0 0 1.4rem;
		color: var(--bp-muted);
		font-size: 1rem;
		line-height: 1.65;
	}

	.web-list {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		margin: 0 0 1.5rem;
	}

	.web-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		color: var(--bp-ink);
		font-size: 0.88rem;
		line-height: 1.45;
	}

	.list-mark {
		flex: none;
		width: 0.38rem;
		height: 0.38rem;
		margin-top: 0.45rem;
		background: var(--bp-blue);
		transform: rotate(45deg);
	}

	.web-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.4rem;
		padding-top: 1rem;
		border-top: 1px solid var(--bp-line);
	}

	.web-links a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--bp-ink);
		font-size: 0.85rem;
		transition: color var(--dur-fast) var(--ease-out);
	}

	.web-links a:hover {
		color: var(--bp-blue);
	}

	.web-note {
		margin: 1rem 0 0;
		color: var(--bp-muted);
		font-size: 0.62rem;
		line-height: 1.7;
	}

	.web-form-wrap {
		padding: clamp(1.2rem, 2.6vw, 1.8rem);
		border: 1px solid var(--bp-line-strong);
		background: var(--bp-panel);
		box-shadow:
			inset 0 0 0 1px var(--bp-line),
			0 18px 50px var(--bp-shadow);
	}

	.form-head {
		margin-bottom: 1.2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--bp-line);
	}

	.form-head .mono {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--bp-blue);
		font-size: 0.68rem;
	}

	.form-head h3 {
		margin: 0 0 0.4rem;
		font-family: var(--f-sans);
		font-size: clamp(1.25rem, 2vw, 1.55rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--bp-ink);
	}

	.form-head p {
		margin: 0;
		color: var(--bp-muted);
		font-size: 0.85rem;
		line-height: 1.55;
	}

	@media (min-width: 901px) and (min-height: 720px) {
		/* The lobby stays on screen while the portal opens over it. */
		.web-contact {
			position: sticky;
			top: 0;
			display: grid;
			align-content: center;
			min-height: 100svh;
		}
	}

	@media (max-width: 900px) {
		.web-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 620px) {
		.web-contact {
			scroll-margin-top: 4.2rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.web-contact {
			position: relative;
			display: block;
			min-height: 0;
		}
	}
</style>
