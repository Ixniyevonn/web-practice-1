<script lang="ts">
	import { browser } from "$app/environment";
	import { profile } from "$lib/content";
	import { goToTop } from "$lib/portal-scroll";
	import Icon from "./Icon.svelte";
	import RuneRing from "./RuneRing.svelte";
	import ThemeToggle from "./ThemeToggle.svelte";

	let { open = $bindable(false) }: { open?: boolean } = $props();

	let panel = $state<HTMLDivElement | null>(null);

	const links = [
		{ href: "#top", label: "Главная", index: "00" },
		{ href: "#about", label: "О себе", index: "01" },
		{ href: "#chronicle", label: "Хроника", index: "02" },
		{ href: "#skills", label: "Навыки", index: "03" },
		{ href: "#works", label: "Работы", index: "04" },
		{ href: "#niheria", label: "Мир Нихерии", index: "05" },
		{ href: "#now", label: "Сейчас", index: "06" },
		{ href: "#web-contact", label: "Веб-контакт", index: "07" },
		{ href: "#contact", label: "Геймдев и музыка", index: "08" }
	];

	function close() {
		open = false;
		if (browser) {
			requestAnimationFrame(() => {
				document.querySelector<HTMLButtonElement>(".menu-btn")?.focus();
			});
		}
	}

	function onkeydown(event: KeyboardEvent) {
		if (!open) return;
		if (event.key === "Escape") {
			event.preventDefault();
			close();
			return;
		}
		if (event.key !== "Tab" || !panel) return;

		const focusable = Array.from(
			panel.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
			)
		).filter((el) => el.offsetParent !== null);

		if (!focusable.length) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (!open || !browser) return;
		const timer = window.setTimeout(() => {
			panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
		}, 40);
		return () => window.clearTimeout(timer);
	});
</script>

<svelte:window onkeydown={onkeydown} />

{#if open}
	<div
		class="menu-overlay"
		id="mobile-menu"
		role="dialog"
		aria-modal="true"
		aria-label="Навигация по сайту"
		bind:this={panel}
	>
		<div class="menu-bg" aria-hidden="true">
			<RuneRing runes={24} />
		</div>

		<div class="menu-top">
			<span class="menu-brand mono">{profile.monogram} / {profile.city}</span>
			<button
				type="button"
				class="menu-close"
				aria-label="Закрыть меню"
				data-autofocus
				onclick={close}
			>
				<Icon name="close" size={22} />
			</button>
		</div>

		<nav class="menu-nav" aria-label="Мобильная навигация">
			{#each links as link}
				<a
					href={link.href}
					onclick={(event) => {
						if (link.href === "#top") goToTop(event);
						close();
					}}
				>
					<span class="menu-index mono">{link.index}</span>
					<span class="menu-label">{link.label}</span>
					<Icon name="arrow-up-right" size={18} />
				</a>
			{/each}
		</nav>

		<div class="menu-bottom">
			<div class="menu-contacts">
				<a href={profile.telegramUrl} target="_blank" rel="noopener noreferrer">
					<Icon name="telegram" size={15} />
					@{profile.telegram}
				</a>
				<a href={`mailto:${profile.email}`}>
					<Icon name="mail" size={15} />
					{profile.email}
				</a>
			</div>
			<div class="menu-theme">
				<span class="mono">Тема</span>
				<ThemeToggle />
			</div>
		</div>
	</div>
{/if}

<style>
	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 140;
		display: flex;
		flex-direction: column;
		padding: 1.1rem var(--gutter) 1.6rem;
		overflow-x: hidden;
		overflow-y: auto;
		background: var(--cx-bg);
		color: var(--cx-ink);
		animation: menu-in 420ms var(--ease-out) both;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
		to {
			opacity: 1;
			clip-path: inset(0);
		}
	}

	.menu-bg {
		position: fixed;
		right: -24vw;
		bottom: -32vw;
		width: min(120vw, 860px);
		color: var(--cx-gold);
		opacity: 0.08;
		pointer-events: none;
		animation: slow-turn 90s linear infinite;
	}

	@keyframes slow-turn {
		to {
			transform: rotate(360deg);
		}
	}

	.menu-top {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--cx-line);
	}

	.menu-brand {
		color: var(--cx-gold);
		font-size: 0.72rem;
	}

	.menu-close {
		display: grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		border: 1px solid var(--cx-line-strong);
		color: var(--cx-gold);
	}

	.menu-nav {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		margin-block: auto;
		padding-block: 2rem;
	}

	.menu-nav a {
		display: grid;
		grid-template-columns: 2.2rem minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.8rem;
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--cx-line);
		color: var(--cx-ink);
		transition:
			color var(--dur-fast) var(--ease-out),
			padding-left var(--dur-fast) var(--ease-out);
	}

	.menu-nav a:first-child {
		border-top: 1px solid var(--cx-line);
	}

	.menu-nav a:hover,
	.menu-nav a:focus-visible {
		padding-left: 0.45rem;
		color: var(--cx-gold);
	}

	.menu-index {
		font-size: 0.72rem;
		color: var(--cx-gold);
		opacity: 0.75;
	}

	.menu-label {
		font-family: var(--f-serif);
		font-size: clamp(1.8rem, 7vw, 2.9rem);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.02em;
	}

	.menu-nav :global(svg) {
		opacity: 0.45;
	}

	.menu-bottom {
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.2rem;
		padding-top: 1.2rem;
		border-top: 1px solid var(--cx-line);
	}

	.menu-contacts {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.03em;
	}

	.menu-contacts a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--cx-muted);
	}

	.menu-contacts a:hover {
		color: var(--cx-gold);
	}

	.menu-theme {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		color: var(--cx-muted);
	}

	@media (min-width: 1041px) {
		.menu-overlay {
			display: none;
		}
	}
</style>
