<script lang="ts">
	import { getTheme, toggleTheme } from "$lib/theme.svelte";
	import Icon from "./Icon.svelte";

	let { compact = false }: { compact?: boolean } = $props();
	const theme = $derived(getTheme());
</script>

<button
	type="button"
	class="theme-toggle"
	class:compact
	aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
	title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
	onclick={toggleTheme}
>
	<span class="icon-wrap">
		{#if theme === "dark"}
			<Icon name="sun" size={16} />
		{:else}
			<Icon name="moon" size={16} />
		{/if}
	</span>
	{#if !compact}
		<span class="label mono">{theme === "dark" ? "Свет" : "Тьма"}</span>
	{/if}
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		height: 2.35rem;
		padding: 0 0.7rem;
		border: 1px solid currentColor;
		color: inherit;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out),
			opacity var(--dur-fast) var(--ease-out);
	}

	.theme-toggle:hover {
		background: currentColor;
	}

	.theme-toggle:hover .icon-wrap,
	.theme-toggle:hover .label {
		color: var(--toggle-hover-ink, var(--bp-bg));
	}

	.theme-toggle.compact {
		width: 2.35rem;
		padding: 0;
	}

	.icon-wrap {
		display: grid;
		place-items: center;
		line-height: 0;
		transition: color var(--dur-fast) var(--ease-out);
	}

	.label {
		font-size: 0.68rem;
		transition: color var(--dur-fast) var(--ease-out);
	}
</style>
