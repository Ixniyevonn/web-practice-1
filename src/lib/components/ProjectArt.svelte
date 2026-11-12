<script lang="ts">
	import RuneRing from "./RuneRing.svelte";

	let {
		variant,
		class: className = ""
	}: { variant: "niheria" | "portfolio" | "obsidian" | "mermaid" | "dieget" | "ethos"; class?: string } = $props();
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
	{:else if variant === "mermaid"}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<defs>
				<linearGradient id="mm-bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="var(--cx-panel)" />
					<stop offset="100%" stop-color="var(--cx-bg-deep)" />
				</linearGradient>
				<radialGradient id="mm-glow" cx="62%" cy="34%" r="55%">
					<stop offset="0%" stop-color="#57c6b2" stop-opacity="0.2" />
					<stop offset="100%" stop-color="#57c6b2" stop-opacity="0" />
				</radialGradient>
			</defs>
			<rect width="800" height="520" fill="url(#mm-bg)" />
			<rect width="800" height="520" fill="url(#mm-glow)" />
			<g stroke="var(--cx-line)" stroke-width="1" opacity="0.55">
				<path d="M0 104h800M0 416h800" />
				<path d="M120 0v520M680 0v520" />
			</g>
			<g fill="none" stroke="#57c6b2" stroke-width="1.2" opacity="0.55">
				<rect x="112" y="86" width="238" height="150" stroke-dasharray="5 7" />
				<rect x="438" y="264" width="250" height="158" stroke-dasharray="5 7" />
				<path d="M350 148h70l58 58M350 188h118l32 32M350 224h64l58 40" />
				<path d="M564 264v-46h118" />
			</g>
			<g fill="#57c6b2">
				<rect x="156" y="124" width="58" height="30" rx="2" />
				<rect x="238" y="124" width="74" height="30" rx="2" opacity="0.72" />
				<rect x="156" y="184" width="92" height="26" rx="2" opacity="0.55" />
				<rect x="482" y="312" width="72" height="28" rx="2" />
				<rect x="574" y="312" width="78" height="28" rx="2" opacity="0.7" />
			</g>
			<g fill="var(--cx-ink)" font-family="monospace">
				<text x="36" y="68" font-size="24" font-weight="700" letter-spacing="-1">MERMAID</text>
				<text x="36" y="88" font-size="11" opacity="0.55">COLLAPSE / FOCUS / ZOOM</text>
			</g>
			<g fill="none" stroke="var(--cx-gold)" opacity="0.6">
				<path d="M664 58h92v86" />
				<path d="M52 462h92v-86" />
			</g>
		</svg>
	{:else if variant === "dieget"}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<defs>
				<linearGradient id="dg-bg" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="var(--cx-panel)" />
					<stop offset="100%" stop-color="var(--cx-bg-deep)" />
				</linearGradient>
				<radialGradient id="dg-glow" cx="74%" cy="26%" r="52%">
					<stop offset="0%" stop-color="#8b7cf6" stop-opacity="0.24" />
					<stop offset="100%" stop-color="#8b7cf6" stop-opacity="0" />
				</radialGradient>
			</defs>
			<rect width="800" height="520" fill="url(#dg-bg)" />
			<rect width="800" height="520" fill="url(#dg-glow)" />
			<g fill="none" stroke="var(--cx-gold)" opacity="0.5">
				<rect x="92" y="66" width="616" height="388" />
				<path d="M92 118h616M92 402h616" />
				<path d="M136 154h312M136 180h246M136 206h286M136 232h210" opacity="0.45" />
				<path d="M136 286h378M136 312h318M136 338h344M136 364h264" opacity="0.3" />
			</g>
			<g fill="var(--cx-ink)" font-family="serif">
				<text x="136" y="102" font-size="34" font-weight="700" letter-spacing="-1">Dieget</text>
				<text x="496" y="100" font-size="11" font-family="monospace" opacity="0.55">JAI · SOKOL · WASM</text>
			</g>
			<g stroke="#8b7cf6" stroke-width="1" fill="none" opacity="0.75">
				<path d="M590 226v128M620 206v148M650 250v104" />
				<circle cx="620" cy="280" r="62" stroke-dasharray="4 10" opacity="0.5" />
				<circle cx="620" cy="280" r="34" opacity="0.75" />
			</g>
			<g fill="#8b7cf6">
				<circle cx="620" cy="280" r="5" />
				<circle cx="590" cy="226" r="3" opacity="0.7" />
				<circle cx="650" cy="250" r="3" opacity="0.7" />
				<circle cx="590" cy="354" r="3" opacity="0.5" />
			</g>
			<g fill="var(--cx-gold)" opacity="0.7">
				<rect x="136" y="430" width="54" height="2" />
				<rect x="200" y="430" width="24" height="2" opacity="0.5" />
				<rect x="234" y="430" width="12" height="2" opacity="0.3" />
			</g>
		</svg>
	{:else}
		<svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
			<defs>
				<linearGradient id="et-bg" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#0b1012" />
					<stop offset="100%" stop-color="#17140d" />
				</linearGradient>
				<radialGradient id="et-glow" cx="72%" cy="28%" r="48%">
					<stop offset="0%" stop-color="#e4b472" stop-opacity="0.24" />
					<stop offset="100%" stop-color="#e4b472" stop-opacity="0" />
				</radialGradient>
			</defs>
			<rect width="800" height="520" fill="url(#et-bg)" />
			<rect width="800" height="520" fill="url(#et-glow)" />
			<path d="M0 336 112 286l96 32 104-54 92 42 116-58 104 44 130-28 46 18v238H0Z" fill="#0a0d0c" />
			<path d="M0 390 90 358l116 20 96-32 120 30 96-20 118 24 164-32v172H0Z" fill="#080a09" />
			<g fill="none" stroke="var(--cx-gold)" opacity="0.55">
				<circle cx="278" cy="252" r="104" stroke-dasharray="5 9" />
				<circle cx="278" cy="252" r="62" />
				<path d="M278 148v208M174 252h208M204 178l148 148M352 178 204 326" opacity="0.5" />
			</g>
			<g stroke="#57c6b2" stroke-width="1" opacity="0.7">
				<path d="M278 252 420 186 548 232 612 146M420 186 470 310 548 232M278 252 176 352M470 310 620 362" />
			</g>
			<g fill="#57c6b2">
				<circle cx="278" cy="252" r="7" />
				<circle cx="420" cy="186" r="5" opacity="0.8" />
				<circle cx="548" cy="232" r="4" opacity="0.6" />
				<circle cx="612" cy="146" r="5" opacity="0.9" />
				<circle cx="470" cy="310" r="6" />
				<circle cx="176" cy="352" r="4" opacity="0.5" />
				<circle cx="620" cy="362" r="4" opacity="0.5" />
			</g>
			<g fill="var(--cx-ink)" font-family="monospace">
				<text x="36" y="72" font-size="24" font-weight="700" letter-spacing="-1">ETHOS</text>
				<text x="36" y="92" font-size="11" opacity="0.55">WITHIN ARCS / ETHNOGENESIS</text>
			</g>
			<g stroke="var(--cx-gold)" opacity="0.35">
				<path d="M616 62h120M676 76h60M64 458h112M64 472h68" />
			</g>
			<g fill="#d46655" opacity="0.7">
				<rect x="520" y="78" width="46" height="2" />
				<rect x="548" y="86" width="18" height="2" opacity="0.5" />
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
