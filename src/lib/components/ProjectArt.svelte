<script lang="ts">
	import RuneRing from "./RuneRing.svelte";

	let {
		variant,
		class: className = ""
	}: { variant: "niheria" | "portfolio" | "obsidian" | "gamejam"; class?: string } = $props();
</script>

<div class="art {variant} {className}" aria-hidden="true">
	{#if variant === "niheria"}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<defs>
				<radialGradient id="nih-glow" cx="50%" cy="44%" r="58%">
					<stop offset="0%" stop-color="#e4b472" stop-opacity="0.3" />
					<stop offset="48%" stop-color="#8d5a22" stop-opacity="0.1" />
					<stop offset="100%" stop-color="#080604" stop-opacity="0" />
				</radialGradient>
				<linearGradient id="nih-sky" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#0b0806" />
					<stop offset="100%" stop-color="#171008" />
				</linearGradient>
			</defs>
			<rect width="800" height="520" fill="url(#nih-sky)" />
			<rect width="800" height="520" fill="url(#nih-glow)" />
			<g opacity="0.22" stroke="#e4b472" stroke-width="0.6">
				<path d="M0 80h800M0 160h800M0 240h800M0 320h800M0 400h800M0 480h800" />
				<path d="M80 0v520M160 0v520M240 0v520M320 0v520M400 0v520M480 0v520M560 0v520M640 0v520M720 0v520" />
			</g>
			<path
				d="M0 420 92 368l68 24 96-82 72 42 74-70 86 58 70-30 74 38 78-18 90 44v146H0Z"
				fill="#0a0705"
				opacity="0.9"
			/>
			<path
				d="M0 452 94 416l72 18 86-42 88 36 76-30 92 26 82-16 84 36 76-20 50 20v76H0Z"
				fill="#050403"
			/>
			<g fill="#e4b472" opacity="0.7">
				<circle cx="154" cy="118" r="1.4" />
				<circle cx="248" cy="72" r="1" />
				<circle cx="604" cy="96" r="1.6" />
				<circle cx="682" cy="158" r="1" />
				<circle cx="130" cy="238" r="1" />
				<circle cx="698" cy="268" r="1.2" />
			</g>
		</svg>
		<div class="niheria-rune-ring" aria-hidden="true">
			<RuneRing runes={18} />
		</div>
	{:else if variant === "portfolio"}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<rect width="800" height="520" fill="var(--bp-bg)" />
			<g stroke="var(--bp-line)" stroke-width="1">
				<path d="M0 52h800M0 104h800M0 156h800M0 208h800M0 260h800M0 312h800M0 364h800M0 416h800M0 468h800" />
				<path d="M52 0v520M104 0v520M156 0v520M208 0v520M260 0v520M312 0v520M364 0v520M416 0v520M468 0v520M520 0v520M572 0v520M624 0v520M676 0v520M728 0v520M780 0v520" />
			</g>
			<g stroke="var(--bp-blue)" fill="none">
				<rect x="88" y="82" width="624" height="356" stroke-width="1" opacity="0.55" />
				<path d="M88 118h624M88 402h624" opacity="0.22" />
				<circle cx="604" cy="236" r="116" opacity="0.55" />
				<circle cx="604" cy="236" r="84" opacity="0.3" stroke-dasharray="3 8" />
				<circle cx="604" cy="236" r="42" opacity="0.6" />
				<path d="M604 92v48M604 332v48M460 236h48M700 236h48" opacity="0.7" />
				<path d="M604 208l28 28-28 28-28-28Z" fill="var(--bp-blue)" fill-opacity="0.16" />
				<path d="M128 118v284M112 118h32M112 402h32" opacity="0.5" />
				<path d="M672 118v284M656 118h32M656 402h32" opacity="0.5" />
			</g>
			<g fill="var(--bp-ink)" font-family="monospace">
				<text x="108" y="378" font-size="62" font-weight="700" letter-spacing="-4" opacity="0.92">СК</text>
			</g>
			<g fill="var(--bp-blue)">
				<circle cx="604" cy="236" r="3" />
				<circle cx="604" cy="120" r="2" opacity="0.7" />
				<circle cx="720" cy="236" r="2" opacity="0.7" />
				<circle cx="488" cy="236" r="2" opacity="0.7" />
			</g>
			<path d="M0 520 800 0" stroke="var(--bp-blue)" stroke-width="1" opacity="0.08" />
		</svg>
	{:else if variant === "obsidian"}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<defs>
				<linearGradient id="obs-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="var(--cx-panel)" />
					<stop offset="100%" stop-color="var(--cx-bg-deep)" />
				</linearGradient>
				<radialGradient id="obs-glow" cx="68%" cy="30%" r="50%">
					<stop offset="0%" stop-color="#8b7cf6" stop-opacity="0.28" />
					<stop offset="100%" stop-color="#8b7cf6" stop-opacity="0" />
				</radialGradient>
			</defs>
			<rect width="800" height="520" fill="url(#obs-bg)" />
			<rect width="800" height="520" fill="url(#obs-glow)" />
			<g stroke="var(--cx-line)" stroke-width="1" opacity="0.8">
				<path d="M0 104h800M0 416h800" />
				<path d="M120 0v520M680 0v520" />
			</g>
			<g stroke="#8b7cf6" stroke-width="1" opacity="0.5" fill="none">
				<path d="M196 152 342 236 196 324 470 268 612 168 516 360 342 236 470 268M342 236 196 152M612 168 516 360" />
			</g>
			<g fill="#8b7cf6">
				<circle cx="196" cy="152" r="7" />
				<circle cx="342" cy="236" r="10" />
				<circle cx="196" cy="324" r="5" opacity="0.8" />
				<circle cx="470" cy="268" r="7" />
				<circle cx="612" cy="168" r="5" />
				<circle cx="516" cy="360" r="8" />
			</g>
			<g fill="var(--cx-ink)" font-family="monospace">
				<text x="36" y="86" font-size="28" font-weight="700" letter-spacing="-1">OBSIDIAN</text>
			</g>
			<g fill="none" stroke="var(--cx-gold)" opacity="0.65">
				<path d="M656 58h94v94" />
				<path d="M50 462h94v-94" />
			</g>
			<g stroke="var(--cx-gold)" opacity="0.25">
				<path d="M196 152v-24M342 236h24M612 168v-24M516 360v24" />
			</g>
		</svg>
	{:else}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<defs>
				<linearGradient id="gj-sky" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#0b1012" />
					<stop offset="100%" stop-color="#17140d" />
				</linearGradient>
				<linearGradient id="gj-ground" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#1d2b29" />
					<stop offset="100%" stop-color="#0a0d0c" />
				</linearGradient>
			</defs>
			<rect width="800" height="520" fill="url(#gj-sky)" />
			<circle cx="612" cy="128" r="58" fill="var(--cx-gold)" opacity="0.16" />
			<circle cx="612" cy="128" r="28" fill="var(--cx-gold)" opacity="0.72" />
			<path d="M0 330 120 276l92 34 108-52 96 38 132-60 108 46 144-28v266H0Z" fill="url(#gj-ground)" />
			<path d="M0 384 96 350l114 22 92-34 122 30 94-20 116 24 166-34v182H0Z" fill="#090c0b" />
			<g stroke="var(--cx-gold)" fill="none" opacity="0.5">
				<path d="M400 132v256M272 260h256" />
				<circle cx="400" cy="260" r="82" stroke-dasharray="4 10" />
				<path d="M400 196l64 64-64 64-64-64Z" fill="var(--cx-gold)" fill-opacity="0.12" />
			</g>
			<g fill="#57c6b2" opacity="0.85">
				<rect x="620" y="356" width="8" height="8" />
				<rect x="638" y="356" width="8" height="8" opacity="0.5" />
				<rect x="656" y="356" width="8" height="8" opacity="0.25" />
				<rect x="620" y="374" width="8" height="8" opacity="0.35" />
			</g>
			<g stroke="var(--cx-gold)" opacity="0.35">
				<path d="M64 112h112M64 128h68M624 112h112M668 128h68" />
			</g>
			<g fill="#d46655" opacity="0.75">
				<rect x="520" y="72" width="46" height="2" />
				<rect x="548" y="80" width="18" height="2" opacity="0.5" />
			</g>
		</svg>
	{/if}
</div>

<style>
	.art {
		position: relative;
		height: 100%;
		min-height: 16rem;
		overflow: hidden;
		background: var(--cx-panel);
	}

	.art svg {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 900ms var(--ease-out);
	}

	.art::after {
		content: "";
		position: absolute;
		inset: 0;
		z-index: 2;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.36), transparent 42%);
		pointer-events: none;
	}

	.niheria-rune-ring {
		position: absolute;
		z-index: 1;
		top: 47%;
		left: 50%;
		width: 50%;
		color: #e4b472;
		opacity: 0.55;
		transform: translate(-50%, -50%);
		filter: drop-shadow(0 0 20px rgba(228, 180, 114, 0.22));
		pointer-events: none;
	}

	.niheria svg {
		transform: scale(1.02);
	}


</style>
