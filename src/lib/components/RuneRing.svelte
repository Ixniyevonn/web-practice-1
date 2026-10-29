<script lang="ts">
	import RuneImage from "./RuneImage.svelte";

	let {
		runes = 24,
		class: className = "",
		label
	}: { runes?: number; class?: string; label?: string } = $props();
</script>

<div
	class="rune-ring {className}"
	role={label ? "img" : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : "true"}
>
	<svg class="guides" viewBox="0 0 400 400" fill="none" aria-hidden="true">
		<circle cx="200" cy="200" r="190" opacity="0.22" />
		<circle cx="200" cy="200" r="170" opacity="0.55" />
		<circle cx="200" cy="200" r="120" opacity="0.22" stroke-dasharray="2 7" />
		<circle cx="200" cy="200" r="74" opacity="0.34" />
		<path d="M200 2v44M200 354v44M2 200h44M354 200h44" opacity="0.35" />
		<path d="M200 86v228M86 200h228" opacity="0.1" />
	</svg>

	{#each Array.from({ length: runes }) as _, i}
		<span class="slot" style={`--a: ${(i * 360) / runes}deg`}>
			<span class="glyph">
				<RuneImage index={i} size="100%" />
			</span>
		</span>
	{/each}
</div>

<style>
	.rune-ring {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		color: inherit;
	}

	.guides {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		stroke: currentColor;
		stroke-width: 1;
	}

	.slot {
		position: absolute;
		inset: 0;
		transform: rotate(var(--a));
	}

	.glyph {
		position: absolute;
		top: 3.2%;
		left: 50%;
		width: 7.6%;
		height: 7.6%;
		transform: translateX(-50%) rotate(calc(-1 * var(--a)));
		color: currentColor;
	}
</style>
