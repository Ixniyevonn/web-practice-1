<script lang="ts">
	import type { SkillLevel } from "$lib/content";

	let { level }: { level: SkillLevel } = $props();

	const value = $derived(level === "core" ? 3 : level === "working" ? 2 : 1);
	const label = $derived(
		level === "core" ? "ядро" : level === "working" ? "рабочий уровень" : "изучаю"
	);
</script>

<span class="pips" role="img" aria-label={`Уровень: ${label}`} title={label}>
	{#each [1, 2, 3] as pip}
		<span class="pip" class:filled={pip <= value} aria-hidden="true"></span>
	{/each}
</span>

<style>
	.pips {
		display: inline-flex;
		align-items: center;
		gap: 0.22rem;
		flex: none;
	}

	.pip {
		width: 0.34rem;
		height: 0.34rem;
		border: 1px solid var(--cx-line-strong);
		transform: rotate(45deg);
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.pip.filled {
		border-color: var(--cx-gold);
		background: var(--cx-gold);
		box-shadow: 0 0 6px var(--cx-glow);
	}
</style>
