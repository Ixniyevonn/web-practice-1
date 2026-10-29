<script lang="ts">
	import RuneImage from "./RuneImage.svelte";

	let {
		index,
		label,
		title,
		lead,
		align = "left",
		id,
		rune = 1
	}: {
		index: string;
		label: string;
		title: string;
		lead?: string;
		align?: "left" | "center";
		id?: string;
		rune?: number;
	} = $props();
</script>

<header class="section-head" class:center={align === "center"} data-reveal>
	<span class="chapter-mark" aria-hidden="true">{index}</span>
	<div class="section-kicker mono">
		<span class="kicker-seal" aria-hidden="true">
			<RuneImage index={rune} size={22} />
		</span>
		<span>{label}</span>
	</div>
	<h2 class="section-title" id={id}>{title}</h2>
	{#if lead}
		<p class="section-lead">{lead}</p>
	{/if}
</header>

<style>
	.section-head {
		position: relative;
		max-width: 74rem;
	}

	.chapter-mark {
		position: absolute;
		top: -2.4rem;
		right: 0;
		z-index: 0;
		color: var(--cx-gold);
		font-family: var(--f-serif);
		font-size: clamp(6.5rem, 14vw, 12rem);
		font-weight: 700;
		line-height: 0.78;
		opacity: 0.055;
		pointer-events: none;
		user-select: none;
	}

	.section-head > :not(.chapter-mark) {
		position: relative;
		z-index: 1;
	}

	.section-kicker {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: var(--cx-gold);
		font-size: 0.8rem;
		letter-spacing: 0.12em;
	}

	.kicker-seal {
		display: grid;
		place-items: center;
		width: 2.55rem;
		height: 2.55rem;
		border: 1px solid var(--cx-line-strong);
		color: var(--cx-gold);
		background:
			radial-gradient(circle, color-mix(in srgb, var(--cx-gold) 10%, transparent), transparent 72%),
			color-mix(in srgb, var(--cx-gold) 4%, transparent);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 5%, transparent);
	}

	.section-title {
		margin-top: 1rem;
		max-width: 17ch;
		font-size: clamp(2.35rem, 5.8vw, 4.9rem);
		text-wrap: balance;
	}

	.section-lead {
		margin-top: 1.35rem;
		max-width: 62ch;
		font-size: clamp(1rem, 1.15vw, 1.14rem);
		color: var(--cx-muted);
	}

	.center {
		margin-inline: auto;
		text-align: center;
	}

	.center .section-kicker {
		justify-content: center;
	}

	.center .section-title,
	.center .section-lead {
		margin-inline: auto;
	}

	.center .chapter-mark {
		right: 50%;
		transform: translateX(50%);
	}

	@media (max-width: 620px) {
		.chapter-mark {
			top: -1.2rem;
			font-size: 5.5rem;
			opacity: 0.045;
		}

		.section-kicker {
			font-size: 0.72rem;
		}

		.kicker-seal {
			width: 2.15rem;
			height: 2.15rem;
		}
	}
</style>
