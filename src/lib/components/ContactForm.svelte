<script lang="ts">
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";

	type Errors = { topic?: string; name?: string; contact?: string; message?: string };

	let { topics = [] }: { topics?: string[] } = $props();

	let topic = $state("");
	let name = $state("");
	let contact = $state("");
	let message = $state("");
	let errors = $state<Errors>({});
	let submitted = $state(false);

	$effect.pre(() => {
		if (!topics.includes(topic)) topic = topics[0] ?? "";
	});

	function validate(): boolean {
		const next: Errors = {};
		if (topics.length && !topic) next.topic = "Выберите тему: геймдев или музыка.";
		if (!name.trim()) next.name = "Напишите, как к вам обращаться.";
		if (!contact.trim()) next.contact = "Оставьте Telegram или email для ответа.";
		if (message.trim().length < 10) next.message = "Добавьте хотя бы пару предложений о задаче.";
		errors = next;
		return Object.keys(next).length === 0;
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = false;
		if (!validate()) return;
		submitted = true;
	}

	function reset() {
		topic = topics[0] ?? "";
		name = "";
		contact = "";
		message = "";
		errors = {};
		submitted = false;
	}

	const mailBody = $derived(
		`Тема: ${topic || "—"}\nИмя: ${name || "—"}\nКонтакт: ${contact || "—"}\n\n${message || ""}`
	);
</script>

<form class="contact-form" novalidate onsubmit={onSubmit}>
	<div class="field-row">
		<div class="field">
			<label for="cf-name" class="mono">Имя</label>
			<input
				id="cf-name"
				name="name"
				type="text"
				autocomplete="name"
				placeholder="Как к вам обращаться"
				bind:value={name}
				aria-invalid={errors.name ? "true" : undefined}
				aria-describedby={errors.name ? "cf-name-error" : undefined}
			/>
			{#if errors.name}
				<p class="field-error mono" id="cf-name-error">{errors.name}</p>
			{/if}
		</div>

		<div class="field">
			<label for="cf-contact" class="mono">Контакт</label>
			<input
				id="cf-contact"
				name="contact"
				type="text"
				autocomplete="email"
				placeholder="Telegram или email"
				bind:value={contact}
				aria-invalid={errors.contact ? "true" : undefined}
				aria-describedby={errors.contact ? "cf-contact-error" : undefined}
			/>
			{#if errors.contact}
				<p class="field-error mono" id="cf-contact-error">{errors.contact}</p>
			{/if}
		</div>
	</div>

	{#if topics.length}
		<fieldset class="topics">
			<legend class="mono">Тема</legend>
			{#each topics as item}
				<label class="topic" class:active={topic === item}>
					<input type="radio" name="cf-topic" bind:group={topic} value={item} />
					<span>{item}</span>
				</label>
			{/each}
		</fieldset>
	{/if}

	<div class="field">
		<label for="cf-message" class="mono">Сообщение</label>
		<textarea
			id="cf-message"
			name="message"
			rows="5"
			placeholder="Что нужно сделать, в какие сроки и какой контекст важен"
			bind:value={message}
			aria-invalid={errors.message ? "true" : undefined}
			aria-describedby={errors.message ? "cf-message-error" : undefined}
		></textarea>
		{#if errors.message}
			<p class="field-error mono" id="cf-message-error">{errors.message}</p>
		{/if}
	</div>

	<div class="form-actions">
		<button class="btn btn-gold" type="submit">
			Проверить форму
			<Icon name="arrow-right" size={15} />
		</button>
		<button class="reset" type="button" onclick={reset}>Очистить</button>
		<p class="form-note mono">
			Это демо без сервера. Письмо не отправляется — после проверки напишите напрямую.
		</p>
	</div>

	<div class="form-result" aria-live="polite">
		{#if submitted}
			<div class="result-box">
				<p class="result-title">
					<Icon name="check" size={18} />
					Проверка пройдена. Письмо не отправлено.
				</p>
				<p class="result-text">
					Тема: «{topic}». Это демонстрационная форма. Скопируйте текст или напишите
					напрямую в Telegram / на почту — так сообщение точно дойдёт.
				</p>
				<div class="result-actions">
					<a
						class="btn btn-gold"
						href={`https://t.me/${profile.telegram}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Telegram
						<Icon name="arrow-up-right" size={14} />
					</a>
					<a
						class="btn btn-outline"
						href={`mailto:${profile.email}?subject=${encodeURIComponent("С портфолио")}&body=${encodeURIComponent(mailBody)}`}
					>
						Email
						<Icon name="mail" size={14} />
					</a>
				</div>
			</div>
		{/if}
	</div>
</form>

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.field-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		border: 0;
	}

	.topics legend {
		float: left;
		width: 100%;
		margin-bottom: 0.3rem;
		color: var(--cx-gold);
		font-size: 0.64rem;
	}

	.topic {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-height: 2.3rem;
		padding: 0.4rem 0.9rem;
		border: 1px solid var(--cx-line);
		color: var(--cx-muted);
		font-family: var(--f-body);
		font-size: 0.74rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.topic input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.topic:focus-within {
		outline: 2px solid var(--cx-gold-bright);
		outline-offset: 3px;
	}

	.topic:hover {
		border-color: var(--cx-line-strong);
		color: var(--cx-gold);
	}

	.topic.active {
		border-color: var(--cx-gold);
		background: var(--cx-gold);
		color: var(--cx-bg);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field label {
		color: var(--cx-gold);
		font-size: 0.64rem;
	}

	.field input,
	.field textarea {
		width: 100%;
		padding: 0.8rem 0.9rem;
		border: 1px solid var(--cx-line);
		border-radius: 0;
		background: color-mix(in srgb, var(--cx-bg) 55%, transparent);
		color: var(--cx-ink);
		font-family: var(--f-body);
		font-size: 0.92rem;
		line-height: 1.5;
		transition:
			border-color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.field textarea {
		resize: vertical;
		min-height: 8rem;
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: var(--cx-faint);
		opacity: 0.65;
	}

	.field input:hover,
	.field textarea:hover {
		border-color: var(--cx-line-strong);
	}

	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--cx-gold);
		background: var(--cx-panel);
		box-shadow: 0 0 0 1px var(--cx-gold);
	}

	.field input[aria-invalid="true"],
	.field textarea[aria-invalid="true"] {
		border-color: #c45b4a;
	}

	.field-error {
		margin: 0;
		color: #d47866;
		font-size: 0.6rem;
		letter-spacing: 0.02em;
		text-transform: none;
	}

	.form-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1rem;
		margin-top: 0.2rem;
	}

	.reset {
		padding: 0.4rem 0;
		color: var(--cx-faint);
		font-family: var(--f-mono);
		font-size: 0.64rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.reset:hover {
		color: var(--cx-gold);
	}

	.form-note {
		flex: 1;
		min-width: 12rem;
		margin: 0;
		color: var(--cx-faint);
		font-size: 0.6rem;
		line-height: 1.6;
	}

	.form-result {
		min-height: 0;
	}

	.result-box {
		padding: 1rem 1.1rem;
		border: 1px solid var(--cx-line-strong);
		background:
			linear-gradient(120deg, color-mix(in srgb, var(--cx-gold) 8%, transparent), transparent 55%),
			var(--cx-panel);
		animation: result-in 420ms var(--ease-out) both;
	}

	@keyframes result-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.result-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 0.4rem;
		color: var(--cx-gold);
		font-family: var(--f-serif);
		font-size: 1.1rem;
		font-weight: 700;
	}

	.result-text {
		margin: 0 0 0.8rem;
		color: var(--cx-muted);
		font-size: 0.9rem;
		line-height: 1.55;
	}

	.result-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.result-actions .btn {
		min-height: 2.5rem;
		font-size: 0.6rem;
	}

	@media (max-width: 620px) {
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
