<script lang="ts">
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";
	import RuneImage from "./RuneImage.svelte";
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-top" data-reveal>
			<div class="footer-brand">
				<span class="footer-monogram" aria-hidden="true">{profile.monogram}</span>
				<div>
					<p class="footer-name">{profile.name}</p>
					<p class="footer-role mono">Веб-разработчик · Геймдев · Музыка и звук</p>
				</div>
			</div>

			<nav class="footer-nav" aria-label="Ссылки в подвале">
				<a href="#about">О себе</a>
				<a href="#chronicle">Хроника</a>
				<a href="#skills">Навыки</a>
				<a href="#works">Работы</a>
				<a href="#web-contact">Веб-контакт</a>
				<a href="#contact">Геймдев и музыка</a>
			</nav>

			<div class="footer-links">
				<a href={profile.telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
					<Icon name="telegram" size={16} />
				</a>
				<a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<Icon name="github" size={16} />
				</a>
				<a href={`mailto:${profile.email}`} aria-label="Email">
					<Icon name="mail" size={16} />
				</a>
				<a class="to-top" href="#top" aria-label="Наверх">
					<Icon name="arrow-up" size={16} />
				</a>
			</div>
		</div>

		<div class="footer-rule" aria-hidden="true">
			<span></span>
			<RuneImage index={8} size={14} />
			<span></span>
		</div>

		<div class="footer-bottom">
			<div class="footer-meta">
				<p class="mono">Создано с помощью DeepSeek</p>
				<p class="mono">
					Реализовано на JavaScript: фильтр проектов, тема с localStorage, мобильное
					меню, WebGL-переход, демо-форма, копирование email.
				</p>
			</div>
			<div class="footer-tech mono">
				<span>SvelteKit / adapter-static / SSG</span>
				<span>© 2026 {profile.name}</span>
				<a href={profile.repoUrl} target="_blank" rel="noopener noreferrer">
					Исходный код
					<Icon name="arrow-up-right" size={12} />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding-block: clamp(2.5rem, 5vw, 4rem) 2rem;
		border-top: 1px solid var(--cx-line);
		background: var(--cx-bg-deep);
		color: var(--cx-muted);
	}

	.footer-top {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) auto minmax(0, 0.7fr);
		align-items: center;
		gap: 1.5rem;
	}

	.footer-brand {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.footer-monogram {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border: 1px solid var(--cx-line-strong);
		color: var(--cx-gold);
		font-family: var(--f-sans);
		font-size: 0.7rem;
		font-weight: 800;
	}

	.footer-name {
		margin: 0;
		color: var(--cx-ink);
		font-family: var(--f-serif);
		font-size: 1.15rem;
		font-weight: 700;
		line-height: 1.2;
	}

	.footer-role {
		margin: 0.2rem 0 0;
		color: var(--cx-faint);
		font-size: 0.62rem;
	}

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.7rem 1.2rem;
	}

	.footer-nav a {
		color: var(--cx-muted);
		font-family: var(--f-mono);
		font-size: 0.66rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		transition: color var(--dur-fast) var(--ease-out);
	}

	.footer-nav a:hover {
		color: var(--cx-gold);
	}

	.footer-links {
		display: flex;
		justify-content: flex-end;
		gap: 0.4rem;
	}

	.footer-links a {
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-gold);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.footer-links a:hover {
		background: var(--cx-gold);
		color: var(--cx-bg);
	}

	.footer-links .to-top {
		color: var(--cx-muted);
	}

	.footer-rule {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		margin-block: 2rem 1.4rem;
		color: var(--cx-gold);
		opacity: 0.55;
	}

	.footer-rule span {
		flex: 1;
		height: 1px;
		background: var(--cx-line);
	}

	.footer-bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.4rem;
	}

	.footer-meta {
		max-width: 44rem;
	}

	.footer-meta p {
		margin: 0 0 0.3rem;
		color: var(--cx-faint);
		font-size: 0.6rem;
		line-height: 1.7;
	}

	.footer-meta p:first-child {
		color: var(--cx-gold);
	}

	.footer-tech {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.3rem;
		color: var(--cx-faint);
		font-size: 0.58rem;
		text-align: right;
	}

	.footer-tech a {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--cx-gold);
	}

	.footer-tech a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 900px) {
		.footer-top {
			grid-template-columns: 1fr auto;
		}

		.footer-nav {
			grid-column: 1 / -1;
			justify-content: flex-start;
			order: 3;
		}
	}

	@media (max-width: 560px) {
		.footer-top {
			grid-template-columns: 1fr;
		}

		.footer-links {
			justify-content: flex-start;
		}

		.footer-tech {
			align-items: flex-start;
			text-align: left;
		}
	}
</style>
