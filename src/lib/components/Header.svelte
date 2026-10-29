<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";
	import MobileMenu from "./MobileMenu.svelte";
	import ThemeToggle from "./ThemeToggle.svelte";
	import { initTheme } from "$lib/theme.svelte";
	import { profile } from "$lib/content";
	import { goToTop, readPortalScroll } from "$lib/portal-scroll";

	let menuOpen = $state(false);
	let scrolled = $state(false);
	let codex = $state(false);
	let portalMode = $state(false);
	let worldMode = $state(false);
	let scrollProgress = $state(0);
	const contactHref = $derived(codex || worldMode ? "#contact" : "#web-contact");

	onMount(() => {
		initTheme();
		let frame = 0;

		const update = () => {
			frame = 0;
			const y = window.scrollY;
			scrolled = y > 18;
			const { progress: portalProgress, end } = readPortalScroll();
			portalMode = portalProgress > 0.04 && portalProgress < 0.995;
			const world = document.querySelector<HTMLElement>("#niheria");
			const worldRect = world?.getBoundingClientRect();
			worldMode = Boolean(worldRect && worldRect.top <= 76 && worldRect.bottom > 76);
			codex = !portalMode && !worldMode && y > end * 0.82;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	});

	const nav = [
		{ href: "#top", label: "Главная" },
		{ href: "#about", label: "О себе" },
		{ href: "#chronicle", label: "Хроника" },
		{ href: "#skills", label: "Навыки" },
		{ href: "#works", label: "Работы" },
		{ href: "#contact", label: "Контакты" }
	];

	$effect(() => {
		if (!browser) return;
		document.body.classList.toggle("menu-open", menuOpen);
		return () => document.body.classList.remove("menu-open");
	});
</script>

<header
	class="site-header"
	class:is-scrolled={scrolled}
	class:is-codex={codex}
	class:is-portal={portalMode}
	class:is-world={worldMode}
>
	<div class="header-inner">
		<a class="brand" href="#top" aria-label="{profile.name} — на главную" onclick={goToTop}>
			<span class="monogram" aria-hidden="true">{profile.monogram}</span>
			<span class="brand-text">
				<span class="brand-name">{profile.name}</span>
				<span class="brand-role mono">веб-разработчик · геймдев</span>
			</span>
		</a>

		<nav class="desktop-nav" aria-label="Основная навигация">
			{#each nav as item}
				<a
					href={item.href === "#contact" ? contactHref : item.href}
					onclick={(event) => {
						if (item.href === "#top") goToTop(event);
					}}>{item.label}</a
				>
			{/each}
		</nav>

		<div class="header-actions">
			<ThemeToggle compact />
			<a class="header-cta mono" href={contactHref}>Написать</a>
			<button
				type="button"
				class="menu-btn"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? "close" : "menu"} size={20} />
			</button>
		</div>
	</div>
	<div class="progress" aria-hidden="true">
		<span style={`transform: scaleX(${scrollProgress})`}></span>
	</div>
</header>

<MobileMenu bind:open={menuOpen} />

<style>
	.site-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 120;
		color: var(--bp-ink);
		transition:
			color var(--dur) var(--ease-out),
			background-color var(--dur) var(--ease-out),
			border-color var(--dur) var(--ease-out);
	}

	.site-header::before {
		content: "";
		position: absolute;
		inset: 0;
		z-index: -1;
		border-bottom: 1px solid transparent;
		background: transparent;
		transition:
			background-color var(--dur) var(--ease-out),
			border-color var(--dur) var(--ease-out),
			backdrop-filter var(--dur) var(--ease-out);
	}

	.site-header.is-scrolled::before {
		border-color: var(--bp-line);
		background: color-mix(in srgb, var(--bp-bg) 82%, transparent);
		backdrop-filter: blur(14px);
	}

	.site-header.is-codex {
		color: var(--cx-gold);
	}

	.site-header.is-codex::before {
		border-color: var(--cx-line);
		background: color-mix(in srgb, var(--cx-bg) 84%, transparent);
		backdrop-filter: blur(16px);
	}

	.site-header.is-portal,
	.site-header.is-world {
		color: var(--portal-gold);
	}

	.site-header.is-portal::before,
	.site-header.is-world::before {
		border-color: rgba(228, 180, 114, 0.24);
		background: rgba(8, 6, 4, 0.78);
		backdrop-filter: blur(16px);
	}

	.header-inner {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: clamp(1rem, 3vw, 3rem);
		width: min(100% - 2 * var(--gutter), var(--maxw-wide));
		height: 4.65rem;
		margin-inline: auto;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
	}

	.monogram {
		display: grid;
		place-items: center;
		width: 2.15rem;
		height: 2.15rem;
		border: 1px solid currentColor;
		font-family: var(--f-sans);
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		line-height: 1;
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.brand:hover .monogram {
		background: var(--bp-blue-soft);
	}

	.is-codex .brand:hover .monogram,
	.is-portal .brand:hover .monogram,
	.is-world .brand:hover .monogram {
		background: var(--cx-glow);
	}

	.brand-text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.brand-name {
		font-family: var(--f-sans);
		font-size: 0.82rem;
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}

	.brand-role {
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		opacity: 0.7;
		white-space: nowrap;
	}

	.desktop-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 2.4vw, 2.2rem);
	}

	.desktop-nav a {
		position: relative;
		padding: 0.4rem 0;
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.82;
		transition: opacity var(--dur-fast) var(--ease-out);
	}

	.desktop-nav a::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--dur-fast) var(--ease-out);
	}

	.desktop-nav a:hover {
		opacity: 1;
	}

	.desktop-nav a:hover::after {
		transform: scaleX(1);
	}

	.header-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.55rem;
	}

	.header-cta {
		display: inline-flex;
		align-items: center;
		height: 2.35rem;
		padding: 0 0.85rem;
		border: 1px solid currentColor;
		font-size: 0.7rem;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.header-cta:hover {
		background: currentColor;
		color: var(--bp-bg);
	}

	.is-codex .header-cta:hover {
		color: var(--cx-bg);
	}

	.menu-btn {
		display: none;
		place-items: center;
		width: 2.35rem;
		height: 2.35rem;
		border: 1px solid currentColor;
	}

	.progress {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 1px;
		overflow: hidden;
		pointer-events: none;
	}

	.progress span {
		display: block;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, var(--bp-blue), var(--cx-gold));
		transform-origin: left;
		transition: transform 80ms linear;
	}

	@media (max-width: 1040px) {
		.desktop-nav {
			display: none;
		}

		.menu-btn {
			display: grid;
		}

		.header-inner {
			grid-template-columns: minmax(0, 1fr) auto;
		}
	}

	@media (max-width: 640px) {
		.header-inner {
			height: 3.9rem;
			gap: 0.6rem;
		}

		.brand-role {
			display: none;
		}

		.brand-name {
			font-size: 0.74rem;
		}

		.header-cta {
			display: none;
		}
	}
</style>
