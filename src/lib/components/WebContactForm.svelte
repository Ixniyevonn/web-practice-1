<script lang="ts">
	import { profile } from "$lib/content";
	import Icon from "./Icon.svelte";

	type Errors = { name?: string; contact?: string; message?: string };

	let name = $state("");
	let contact = $state("");
	let message = $state("");
	let topic = $state<"Веб" | "Геймдев">("Веб");
	let errors = $state<Errors>({});
	let submitted = $state(false);

	function validate(): boolean {
		const next: Errors = {};
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
		name = "";
		contact = "";
		message = "";
		topic = "Веб";
		errors = {};
		submitted = false;
	}

	const mailBody = $derived(
		`Тема: ${topic}\nИмя: ${name || "—"}\nКонтакт: ${contact || "—"}\n\n${message || ""}`
	);
</script>

<form class="web-form" novalidate onsubmit={onSubmit}>
	<fieldset class="topics">
		<legend class="mono">Тема запроса</legend>
		{#each ["Веб", "Геймдев"] as item}
			<label class="topic" class:active={topic === item}>
				<input type="radio" name="wf-topic" bind:group={topic} value={item} />
				<span>{item}</span>
			</label>
		{/each}
	</fieldset>

	<div class="field-row">
		<div class="field">
			<label for="wf-name" class="mono">Имя</label>
			<input
				id="wf-name"
				name="name"
				type="text"
				autocomplete="name"
				placeholder="Как к вам обращаться"
				bind:value={name}
				aria-invalid={errors.name ? "true" : undefined}
				aria-describedby={errors.name ? "wf-name-error" : undefined}
			/>
			{#if errors.name}
				<p class="field-error mono" id="wf-name-error">{errors.name}</p>
			{/if}
		</div>

		<div class="field">
			<label for="wf-contact" class="mono">Контакт</label>
			<input
				id="wf-contact"
				name="contact"
				type="text"
				autocomplete="email"
				placeholder="Telegram или email"
				bind:value={contact}
				aria-invalid={errors.contact ? "true" : undefined}
				aria-describedby={errors.contact ? "wf-contact-error" : undefined}
			/>
			{#if errors.contact}
				<p class="field-error mono" id="wf-contact-error">{errors.contact}</p>
			{/if}
		</div>
	</div>

	<div class="field">
		<label for="wf-message" class="mono">Сообщение</label>
		<textarea
			id="wf-message"
			name="message"
			rows="4"
			placeholder="Что нужно сделать: сайт, интерфейс, прототип, игра?"
			bind:value={message}
			aria-invalid={errors.message ? "true" : undefined}
			aria-describedby={errors.message ? "wf-message-error" : undefined}
		></textarea>
		{#if errors.message}
			<p class="field-error mono" id="wf-message-error">{errors.message}</p>
		{/if}
	</div>

	<div class="actions">
		<button class="btn btn-blue" type="submit">
			Проверить форму
			<Icon name="arrow-right" size={15} />
		</button>
		<button class="reset" type="button" onclick={reset}>Очистить</button>
		<p class="note mono">Демо без сервера: письмо не отправляется.</p>
	</div>

	<div class="result" aria-live="polite">
		{#if submitted}
			<div class="result-box">
				<p class="result-title">
					<Icon name="check" size={17} />
					Проверка пройдена. Письмо не отправлено.
				</p>
				<p class="result-text">
					Это демонстрационная форма. Напишите напрямую в Telegram или на почту —
					сообщение с темой «{topic}» уже готово в ссылках ниже.
				</p>
				<div class="result-actions">
					<a
						class="btn btn-blue"
						href={`https://t.me/${profile.telegram}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Telegram
						<Icon name="arrow-up-right" size={14} />
					</a>
					<a
						class="btn btn-ghost"
						href={`mailto:${profile.email}?subject=${encodeURIComponent(`Портфолио: ${topic}`)}&body=${encodeURIComponent(mailBody)}`}
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
	.web-form {
		display: flex;
		flex-direction: column;
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
		margin-bottom: 0.35rem;
		color: var(--bp-blue);
		font-size: 0.7rem;
	}

	.topic {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-height: 2.35rem;
		padding: 0.4rem 0.9rem;
		border: 1px solid var(--bp-line-strong);
		color: var(--bp-ink);
		font-family: var(--f-mono);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.06em;
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
		outline: 2px solid var(--bp-blue);
		outline-offset: 3px;
	}

	.topic:hover {
		border-color: var(--bp-blue);
		color: var(--bp-blue);
	}

	.topic.active {
		border-color: var(--bp-blue);
		background: var(--bp-blue);
		color: #fff;
	}

	.field-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field label {
		color: var(--bp-blue);
		font-size: 0.68rem;
	}

	.field input,
	.field textarea {
		width: 100%;
		padding: 0.8rem 0.9rem;
		border: 1px solid var(--bp-line-strong);
		border-radius: 0;
		background: var(--bp-panel);
		color: var(--bp-ink);
		font-family: var(--f-body);
		font-size: 0.94rem;
		line-height: 1.5;
		transition:
			border-color var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}

	.field textarea {
		resize: vertical;
		min-height: 7rem;
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: var(--bp-muted);
		opacity: 0.7;
	}

	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--bp-blue);
		box-shadow: 0 0 0 1px var(--bp-blue);
	}

	.field input[aria-invalid="true"],
	.field textarea[aria-invalid="true"] {
		border-color: #c44f43;
	}

	.field-error {
		margin: 0;
		color: #c44f43;
		font-size: 0.6rem;
		text-transform: none;
		letter-spacing: 0.02em;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1rem;
	}

	.reset {
		padding: 0.4rem 0;
		color: var(--bp-muted);
		font-family: var(--f-mono);
		font-size: 0.64rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.reset:hover {
		color: var(--bp-blue);
	}

	.note {
		flex: 1;
		min-width: 12rem;
		margin: 0;
		color: var(--bp-muted);
		font-size: 0.6rem;
		line-height: 1.6;
	}

	.result-box {
		padding: 1rem 1.1rem;
		border: 1px solid var(--bp-blue-line);
		background:
			linear-gradient(120deg, var(--bp-blue-soft), transparent 60%),
			var(--bp-panel);
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
		color: var(--bp-blue);
		font-family: var(--f-sans);
		font-size: 1rem;
		font-weight: 700;
	}

	.result-text {
		margin: 0 0 0.8rem;
		color: var(--bp-muted);
		font-size: 0.86rem;
		line-height: 1.55;
	}

	.result-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.result-actions .btn {
		min-height: 2.5rem;
		font-size: 0.64rem;
	}

	@media (max-width: 620px) {
		.field-row {
			grid-template-columns: 1fr;
		}
	}
</style>
