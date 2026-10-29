<script lang="ts">
	import { base } from "$app/paths";
	import { niheriaRunes } from "$lib/runes";

	let {
		index = 0,
		size = 24,
		class: className = "",
		label
	}: { index?: number; size?: number | string; class?: string; label?: string } = $props();

	const file = $derived(niheriaRunes[Math.abs(index) % niheriaRunes.length]);
	const src = $derived(`${base}/runes/${file}`);
	const dimension = $derived(typeof size === "number" ? `${size}px` : size);
</script>

<span
	class="rune-image {className}"
	style={`--rune-src: url('${src}'); --rune-size: ${dimension};`}
	role={label ? "img" : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : "true"}
></span>

<style>
	.rune-image {
		display: inline-block;
		flex: none;
		width: var(--rune-size);
		height: var(--rune-size);
		background: currentColor;
		-webkit-mask-image: var(--rune-src);
		-webkit-mask-position: center;
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-image: var(--rune-src);
		mask-position: center;
		mask-size: contain;
		mask-repeat: no-repeat;
	}
</style>
