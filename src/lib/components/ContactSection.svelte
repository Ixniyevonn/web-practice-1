<script lang="ts">
	import { profile } from "$lib/content";
	import ContactForm from "./ContactForm.svelte";
	import Icon from "./Icon.svelte";
	import RuneImage from "./RuneImage.svelte";
	import RuneRing from "./RuneRing.svelte";
	import SectionHeader from "./SectionHeader.svelte";

	let copied = $state(false);

	const reasons = [
		"Собираете команду на геймджем или игровой прототип",
		"Нужна музыка или звук для проекта",
		"Хотите обсудить игровой код, мир или музыку"
	];

	async function copyEmail() {
		let ok = false;
		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(profile.email);
				ok = true;
			}
		} catch {
			ok = false;
		}

		if (!ok) {
			try {
				const area = document.createElement("textarea");
				area.value = profile.email;
				area.setAttribute("readonly", "");
				area.style.position = "fixed";
				area.style.opacity = "0";
				document.body.appendChild(area);
				area.select();
				ok = document.execCommand("copy");
				area.remove();
			} catch {
				ok = false;
			}
		}

		copied = ok;
		if (ok) window.setTimeout(() => (copied = false), 2200);
	}
</script>

<section class="section contact" id="contact" aria-labelledby="contact-title">
	<div class="contact-sigil" aria-hidden="true">
		<RuneRing runes={24} />
	</div>

	<div class="container">
		<SectionHeader
			index="VII"
			label="Сигил"
			title="Геймдев и музыка"
			id="contact-title"
			rune={14}
			lead="Дальше портала — только игры, музыка и звук. Для веб-задач — быстрая форма в начале страницы. Срочные вопросы — в Telegram."
		/>

		<div class="contact-grid">
			<div class="contact-left" data-reveal>
				<ul class="reasons">
					{#each reasons as reason, i}
						<li>
							<span class="reason-rune" aria-hidden="true"><RuneImage index={i + 2} size={14} /></span>
							{reason}
						</li>
					{/each}
				</ul>

				<div class="contact-links">
					<a
						class="contact-link"
						href={profile.telegramUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="contact-icon"><Icon name="telegram" size={18} /></span>
						<span class="contact-text">
							<span class="mono">Telegram</span>
							<span class="contact-value">@{profile.telegram}</span>
						</span>
						<Icon name="arrow-up-right" size={16} />
					</a>

					<div class="contact-link email-row">
						<span class="contact-icon"><Icon name="mail" size={18} /></span>
						<span class="contact-text">
							<span class="mono">Email</span>
							<a class="contact-value" href={`mailto:${profile.email}`}>{profile.email}</a>
						</span>
						<button
							type="button"
							class="copy-btn"
							aria-label={copied ? "Email скопирован" : "Скопировать email"}
							title={copied ? "Скопировано" : "Скопировать email"}
							onclick={copyEmail}
						>
							<Icon name={copied ? "check" : "copy"} size={15} />
						</button>
					</div>

					<a
						class="contact-link"
						href={profile.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="contact-icon"><Icon name="github" size={18} /></span>
						<span class="contact-text">
							<span class="mono">GitHub</span>
							<span class="contact-value">{profile.github}</span>
						</span>
						<Icon name="arrow-up-right" size={16} />
					</a>
				</div>

				<p class="contact-note mono">
					Локация: {profile.city} · формат: обсуждается · язык: русский, английский ·
					<a href="#web-contact">веб-контакт в начале страницы</a>
				</p>
			</div>

			<div class="contact-form-wrap" data-reveal style="--reveal-delay: 100ms">
				<div class="form-head">
					<span class="mono">Демо-форма / без сервера</span>
					<h3>Коротко о задаче</h3>
					<p>
						Форма для геймдева и музыки. Проверяет поля, но не отправляет письмо;
						после проверки появятся прямые ссылки. Для веба — форма в начале.
					</p>
				</div>
				<ContactForm topics={["Геймдев", "Музыка"]} />
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		position: relative;
		background:
			radial-gradient(ellipse 50% 50% at 100% 50%, var(--cx-glow), transparent 65%),
			var(--cx-bg-deep);
		overflow: hidden;
	}

	.contact-sigil {
		position: absolute;
		right: -10rem;
		bottom: -14rem;
		width: min(92vw, 760px);
		color: var(--cx-gold);
		opacity: 0.07;
		pointer-events: none;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: start;
	}

	.reasons {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.8rem;
	}

	.reasons li {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 0.62rem 0;
		border-bottom: 1px solid var(--cx-line);
		color: var(--cx-muted);
		font-size: 0.92rem;
		line-height: 1.45;
	}

	.reasons li:first-child {
		border-top: 1px solid var(--cx-line);
	}

	.reason-rune {
		flex: none;
		margin-top: 0.15rem;
		color: var(--cx-gold);
		opacity: 0.8;
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--cx-line-strong);
	}

	.contact-link {
		display: grid;
		grid-template-columns: 2.2rem minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.8rem;
		padding: 0.9rem 0;
		border-bottom: 1px solid var(--cx-line);
		color: var(--cx-ink);
		transition:
			color var(--dur-fast) var(--ease-out),
			padding-left var(--dur-fast) var(--ease-out);
	}

	.contact-link:hover {
		padding-left: 0.3rem;
		color: var(--cx-gold);
	}

	.contact-icon {
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-gold);
	}

	.contact-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.contact-text .mono {
		color: var(--cx-faint);
		font-size: 0.62rem;
	}

	.contact-value {
		overflow: hidden;
		color: var(--cx-ink);
		font-size: 0.92rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.contact-link:hover .contact-value {
		color: var(--cx-gold);
	}

	.email-row:hover {
		padding-left: 0;
		color: var(--cx-ink);
	}

	.copy-btn {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-gold);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.copy-btn:hover {
		background: var(--cx-gold);
		color: var(--cx-bg);
	}

	.contact-note {
		margin: 1rem 0 0;
		color: var(--cx-faint);
		font-size: 0.64rem;
		line-height: 1.7;
	}

	.contact-note a {
		color: var(--cx-gold);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.contact-form-wrap {
		position: relative;
		padding: clamp(1.2rem, 2.6vw, 1.8rem);
		border: 1px solid var(--cx-line);
		background:
			linear-gradient(145deg, color-mix(in srgb, var(--cx-gold) 6%, transparent), transparent 40%),
			var(--cx-panel);
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 5%, transparent),
			0 20px 55px color-mix(in srgb, var(--cx-shadow) 50%, transparent);
	}

	.contact-form-wrap::before {
		content: "";
		position: absolute;
		top: -1px;
		left: 8%;
		right: 8%;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--cx-gold), transparent);
		opacity: 0.45;
	}

	.form-head {
		margin-bottom: 1.2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--cx-line);
	}

	.form-head .mono {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--cx-gold);
		font-size: 0.66rem;
	}

	.form-head h3 {
		margin-bottom: 0.4rem;
		font-size: clamp(1.4rem, 2.2vw, 1.8rem);
	}

	.form-head p {
		margin: 0;
		color: var(--cx-muted);
		font-size: 0.88rem;
		line-height: 1.55;
	}

	@media (max-width: 900px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
