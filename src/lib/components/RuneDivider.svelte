<script lang="ts">
	import RuneImage from "./RuneImage.svelte";

	let { index = 0 }: { index?: number } = $props();
</script>

<div class="rune-divider" aria-hidden="true">
	<span class="line"></span>
	<span class="seal">
		<RuneImage {index} size={18} />
	</span>
	<span class="line"></span>
</div>

<style>
	.rune-divider {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		width: min(100% - 2 * var(--gutter), var(--maxw));
		margin-inline: auto;
		padding-block: 0.75rem;
		color: var(--cx-gold);
		opacity: 0.8;
	}

	.line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--cx-line-strong));
	}

	.line:last-child {
		background: linear-gradient(90deg, var(--cx-line-strong), transparent);
	}

	.seal {
		display: grid;
		place-items: center;
		width: 2.9rem;
		height: 2.9rem;
		border: 1px solid var(--cx-line-strong);
		background:
			radial-gradient(circle, color-mix(in srgb, var(--cx-gold) 12%, transparent), transparent 70%),
			var(--cx-bg);
		transform: rotate(45deg);
	}

	.seal :global(.rune-image) {
		transform: rotate(-45deg);
	}

	@media (max-width: 620px) {
		.rune-divider {
			padding-block: 0.2rem;
		}

		.seal {
			width: 2.3rem;
			height: 2.3rem;
		}
	}
</style>
