<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";
	import RuneRing from "./RuneRing.svelte";
	import { readPortalScroll } from "$lib/portal-scroll";

	let overlay = $state<HTMLDivElement | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);
	let progress = $state(0);
	let active = $state(false);
	let webglFailed = $state(false);
	let rewinding = $state(false);

	const vertexSource = `
		attribute vec2 a_position;
		void main() {
			gl_Position = vec4(a_position, 0.0, 1.0);
		}
	`;

	const fragmentSource = `
		precision mediump float;

		uniform vec2 u_res;
		uniform float u_time;
		uniform float u_progress;

		float hash(vec2 p) {
			p = fract(p * vec2(123.34, 456.21));
			p += dot(p, p + 45.32);
			return fract(p.x * p.y);
		}

		float noise(vec2 p) {
			vec2 i = floor(p);
			vec2 f = fract(p);
			f = f * f * (3.0 - 2.0 * f);
			float a = hash(i);
			float b = hash(i + vec2(1.0, 0.0));
			float c = hash(i + vec2(0.0, 1.0));
			float d = hash(i + vec2(1.0, 1.0));
			return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / u_res;
			vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
			float t = u_time;

			float n = noise(uv * 4.0 + vec2(0.0, -t * 0.025));
			float n2 = noise(uv * 9.0 + vec2(t * 0.018, 0.0));

			float glow = 0.0;
			for (int i = 0; i < 30; i++) {
				float fi = float(i);
				float seed = hash(vec2(fi, 7.13));
				float speed = 0.018 + seed * 0.055;
				vec2 pos = vec2(
					(seed - 0.5) * 2.15,
					fract(seed * 9.7 + t * speed) * 2.5 - 1.25
				);
				float d = length(p - pos);
				float twinkle = 0.4 + 0.6 * hash(vec2(fi, floor(t * 2.4)));
				float spark = smoothstep(0.010, 0.0, d) * twinkle;
				glow += spark;
			}

			float radial = exp(-length(p) * 2.15);
			vec3 gold = vec3(0.90, 0.62, 0.32);
			vec3 lightGold = vec3(1.0, 0.82, 0.56);
			vec3 col = mix(gold, lightGold, n2) * (glow * 1.8 + radial * 0.05 * (0.3 + n * 0.7));

			float fadeIn = smoothstep(0.0, 0.22, u_progress);
			float fadeOut = 1.0 - smoothstep(0.82, 1.0, u_progress) * 0.45;
			float alpha = (glow * 0.95 + radial * 0.07) * fadeIn * fadeOut;

			gl_FragColor = vec4(col, alpha);
		}
	`;

	onMount(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const root = document.documentElement;
		let frame = 0;
		let rewindFrame = 0;
		let finishFrame = 0;
		let finishing = false;
		let finishDone = false;
		let lastProgress = -1;
		let lensStep = -1;
		let assemblyTimer = 0;
		let assembled = false;
		let gl: WebGLRenderingContext | null = null;
		let program: WebGLProgram | null = null;
		let uRes: WebGLUniformLocation | null = null;
		let uTime: WebGLUniformLocation | null = null;
		let uProgress: WebGLUniformLocation | null = null;
		let buffer: WebGLBuffer | null = null;
		let start = performance.now();

		/* A real radial displacement map for the fish-eye. It is generated once
		   and stretched by feImage to the filtered section. */
		const lensMap = document.getElementById("portal-lens-map") as SVGImageElement | null;
		const lensDisp = ["portal-lens-r", "portal-lens-b"].map((id) => document.getElementById(id));
		const lensBase = {
			lobby: [230, 350],
			codex: [70, 110]
		};
		let lensTarget: "lobby" | "codex" = "lobby";
		let viewportMapUrl = "";
		let codexMapUrl = "";

		const makeLensMap = (centerY: number) => {
			const size = 160;
			const canvasMap = document.createElement("canvas");
			canvasMap.width = size;
			canvasMap.height = size;
			const context = canvasMap.getContext("2d");
			if (!context) return "";
			const image = context.createImageData(size, size);
			for (let y = 0; y < size; y++) {
				for (let x = 0; x < size; x++) {
					const u = (x / (size - 1)) * 2 - 1;
					const yNorm = y / (size - 1);
					const v =
						yNorm < centerY
							? (yNorm - centerY) / Math.max(centerY, 0.001)
							: (yNorm - centerY) / Math.max(1 - centerY, 0.001);
					const r = Math.sqrt(u * u + v * v);
					const falloff = r >= 1 ? 0 : Math.pow(1 - r, 1.35);
					const dx = -u * falloff;
					const dy = -v * falloff;
					const i = (y * size + x) * 4;
					image.data[i] = Math.round((dx * 0.5 + 0.5) * 255);
					image.data[i + 1] = Math.round((dy * 0.5 + 0.5) * 255);
					image.data[i + 2] = 128;
					image.data[i + 3] = 255;
				}
			}
			context.putImageData(image, 0, 0);
			return canvasMap.toDataURL("image/png");
		};

		const applyLensMap = (target: "lobby" | "codex") => {
			if (!lensMap) return;
			lensTarget = target;
			const codexHead = document.querySelector<HTMLElement>(".about .section-head");
			const width =
				target === "codex" && codexHead ? codexHead.offsetWidth : window.innerWidth;
			const height =
				target === "codex" && codexHead ? codexHead.offsetHeight : window.innerHeight;
			lensMap.setAttribute("href", target === "codex" ? codexMapUrl : viewportMapUrl);
			lensMap.setAttribute("width", String(width));
			lensMap.setAttribute("height", String(height));
		};

		const buildLensMap = () => {
			viewportMapUrl = makeLensMap(0.5);
			codexMapUrl = makeLensMap(0.5);
			applyLensMap("lobby");
		};

		const setLens = (p: number) => {
			const lobbyOn = p > 0.07 && p < 0.45;
			const formLens = lobbyOn && !rewinding;
			const heroLens = lobbyOn && rewinding;
			const codexOn = !rewinding && p > 0.58 && p < 0.97;
			root.classList.toggle("portal-lensing", formLens);
			root.classList.toggle("portal-hero-lens", heroLens);
			root.classList.toggle("portal-emerging", codexOn);

			let strength = 0;
			if (lobbyOn) strength = Math.min(1, Math.max(0, (p - 0.08) / 0.17));
			else if (codexOn) strength = Math.min(1, Math.max(0, (0.96 - p) / 0.2));

			const target = codexOn ? "codex" : "lobby";
			if ((lobbyOn || codexOn) && target !== lensTarget) {
				applyLensMap(target);
				lensStep = -1;
			}

			const step = Math.round(strength * 10) / 10;
			if (step === lensStep) return;
			lensStep = step;
			const base = lensBase[target];
			lensDisp.forEach((element, index) => {
				element?.setAttribute("scale", String(base[index] * step));
			});
		};

		buildLensMap();

		const playAssembly = () => {
			if (assembled) return;
			assembled = true;
			const codex = document.querySelector<HTMLElement>(".codex");
			if (!codex) return;
			document
				.querySelectorAll<HTMLElement>("#about [data-reveal]")
				.forEach((element) => element.classList.add("is-visible"));
			codex.classList.add("is-assembling");
			window.clearTimeout(assemblyTimer);
			assemblyTimer = window.setTimeout(() => {
				codex.classList.remove("is-assembling");
			}, 1800);
		};

		const setProgress = (next: number) => {
			progress = next;
			active = next > 0.001 && next < 0.999;
			root.classList.toggle("portal-active", active);
			root.style.setProperty("--portal-p", String(next));
			overlay?.style.setProperty("--p", String(next));
			setLens(next);

			if (next > 0.95) playAssembly();
			if (next < 0.08 && assembled) {
				assembled = false;
				document.querySelector<HTMLElement>(".codex")?.classList.remove("is-assembling");
			}
		};

		const blockScroll = (event: Event) => event.preventDefault();
		const blockKeys = (event: KeyboardEvent) => {
			if ([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
				event.preventDefault();
			}
		};
		const unlockScroll = () => {
			window.removeEventListener("wheel", blockScroll);
			window.removeEventListener("touchmove", blockScroll);
			window.removeEventListener("keydown", blockKeys);
		};

		/* Once the portal reaches the new world, freeze the page and play the
		   reveal on a clock. The codex section is pinned with one fixed
		   transform, so nothing can jitter while the user's scroll is blocked. */
		const finishReveal = (info: ReturnType<typeof readPortalScroll>) => {
			if (finishing || rewinding || reduced) return;
			finishing = true;
			const startP = Math.min(0.92, Math.max(0.55, info.progress));
			const naturalTop = info.aboutTop - window.scrollY;
			const target = info.headerOffset + 8;
			root.classList.add("portal-revealing", "portal-finishing");
			root.style.setProperty("--about-shift", `${target - naturalTop}px`);
			root.style.setProperty("--reveal", "0");
			document
				.querySelectorAll<HTMLElement>("#about [data-reveal]")
				.forEach((element) => element.classList.add("is-visible"));
			window.addEventListener("wheel", blockScroll, { passive: false });
			window.addEventListener("touchmove", blockScroll, { passive: false });
			window.addEventListener("keydown", blockKeys, { passive: false });

			const duration = 1200;
			const started = { at: 0 };
			const tick = (now: number) => {
				if (!finishing) {
					unlockScroll();
					return;
				}
				if (!started.at) started.at = now;
				const t = Math.min(1, (now - started.at) / duration);
				const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
				setProgress(startP + (1 - startP) * eased);
				root.style.setProperty("--reveal", String(Math.min(1, t / 0.55)));
				if (t < 1) {
					finishFrame = requestAnimationFrame(tick);
					return;
				}
				window.scrollTo({ top: info.end, left: 0, behavior: "instant" });
				root.classList.remove("portal-revealing", "portal-finishing");
				root.style.setProperty("--about-shift", "0px");
				root.style.setProperty("--reveal", "1");
				finishing = false;
				finishDone = true;
				lastProgress = 1;
				setProgress(1);
				unlockScroll();
			};
			finishFrame = requestAnimationFrame(tick);
		};

		const updateScroll = () => {
			if (rewinding || finishing) return;
			if (reduced) {
				setProgress(0);
				return;
			}
			const info = readPortalScroll();
			setProgress(info.progress);
			if (lastProgress < 0) {
				lastProgress = info.progress;
				return;
			}
			if (info.progress < 0.5) finishDone = false;
			if (!finishDone && info.progress >= 0.55 && info.progress > lastProgress) {
				finishReveal(info);
			}
			lastProgress = info.progress;
		};

		const playRewind = () => {
			if (reduced) {
				window.scrollTo({ top: 0, left: 0, behavior: "instant" });
				return;
			}
			if (rewinding || finishing) return;
			rewinding = true;
			overlay?.classList.add("rewinding");
			setProgress(1);
			window.scrollTo({ top: 0, left: 0, behavior: "instant" });
			const started = { at: 0 };
			const duration = 1500;
			const tick = (now: number) => {
				if (!rewinding) return;
				if (!started.at) started.at = now;
				const t = Math.min(1, (now - started.at) / duration);
				const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
				setProgress(1 - eased);
				if (t < 1) {
					rewindFrame = requestAnimationFrame(tick);
				} else {
					rewinding = false;
					overlay?.classList.remove("rewinding");
					setProgress(0);
					updateScroll();
				}
			};
			// Let the jump to the top paint under the opaque veil first.
			rewindFrame = requestAnimationFrame(() => {
				rewindFrame = requestAnimationFrame(tick);
			});
		};

		const cancelRewind = () => {
			if (!rewinding) return;
			cancelAnimationFrame(rewindFrame);
			rewinding = false;
			overlay?.classList.remove("rewinding");
			updateScroll();
		};

		const compile = (type: number, source: string) => {
			if (!gl) return null;
			const shader = gl.createShader(type);
			if (!shader) return null;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		};

		const initWebGL = () => {
			if (!canvas || reduced) return false;
			gl = (canvas.getContext("webgl", {
				alpha: true,
				antialias: false,
				premultipliedAlpha: false
			}) ?? canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
			if (!gl) return false;

			const vertex = compile(gl.VERTEX_SHADER, vertexSource);
			const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
			if (!vertex || !fragment) return false;

			program = gl.createProgram();
			if (!program) return false;
			gl.attachShader(program, vertex);
			gl.attachShader(program, fragment);
			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
			gl.useProgram(program);

			buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(
				gl.ARRAY_BUFFER,
				new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
				gl.STATIC_DRAW
			);
			const position = gl.getAttribLocation(program, "a_position");
			gl.enableVertexAttribArray(position);
			gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

			uRes = gl.getUniformLocation(program, "u_res");
			uTime = gl.getUniformLocation(program, "u_time");
			uProgress = gl.getUniformLocation(program, "u_progress");
			gl.clearColor(0, 0, 0, 0);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			return true;
		};

		const resize = () => {
			if (!canvas || !gl) return;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
			const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
				gl.viewport(0, 0, width, height);
			}
		};

		const draw = (now: number) => {
			frame = requestAnimationFrame(draw);
			if (!active || !canvas || !gl || !program) return;
			if (document.visibilityState === "hidden") return;
			resize();
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.useProgram(program);
			if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
			if (uTime) gl.uniform1f(uTime, (now - start) / 1000);
			if (uProgress) gl.uniform1f(uProgress, progress);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};

		const onRewind = () => playRewind();
		const onResize = () => {
			applyLensMap(lensTarget);
			updateScroll();
		};

		const ok = initWebGL();
		webglFailed = !ok;

		updateScroll();
		window.addEventListener("scroll", updateScroll, { passive: true });
		window.addEventListener("resize", onResize, { passive: true });
		window.addEventListener("portal:rewind", onRewind);
		window.addEventListener("wheel", cancelRewind, { passive: true });
		window.addEventListener("touchstart", cancelRewind, { passive: true });
		if (ok && !reduced) frame = requestAnimationFrame(draw);
		if (ok) resize();

		return () => {
			window.removeEventListener("scroll", updateScroll);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("portal:rewind", onRewind);
			window.removeEventListener("wheel", cancelRewind);
			window.removeEventListener("touchstart", cancelRewind);
			if (frame) cancelAnimationFrame(frame);
			if (rewindFrame) cancelAnimationFrame(rewindFrame);
			if (finishFrame) cancelAnimationFrame(finishFrame);
			unlockScroll();
			window.clearTimeout(assemblyTimer);
			root.classList.remove(
				"portal-crumbling",
				"portal-lensing",
				"portal-hero-lens",
				"portal-emerging",
				"portal-revealing"
			);
			document.querySelector<HTMLElement>(".codex")?.classList.remove("is-assembling");
			if (gl) {
				if (buffer) gl.deleteBuffer(buffer);
				if (program) gl.deleteProgram(program);
			}
		};
	});
</script>

<div
	class="portal-overlay"
	class:active
	class:rewinding
	bind:this={overlay}
	style={`--p:${progress}`}
	aria-hidden={!active}
	inert={!active}
>
	<div class="portal-night" aria-hidden="true"></div>
	<canvas class="portal-canvas" class:failed={webglFailed} bind:this={canvas} aria-hidden="true"></canvas>
	<div class="portal-fallback" class:hidden={!webglFailed} aria-hidden="true"></div>

	<div class="portal-ring" aria-hidden="true">
		<RuneRing runes={28} />
	</div>
	<div class="portal-ring portal-ring-inner" aria-hidden="true">
		<RuneRing runes={16} />
	</div>
	<span class="portal-core" aria-hidden="true"></span>

	<a class="portal-skip mono" href="#about">
		Пропустить переход
		<Icon name="arrow-down" size={14} />
	</a>

	<span class="portal-edge" aria-hidden="true"></span>
</div>

<svg class="portal-lens-defs" aria-hidden="true" focusable="false">
	<defs>
		<filter
			id="portal-fisheye"
			x="0"
			y="0"
			width="100%"
			height="100%"
			color-interpolation-filters="sRGB"
		>
			<feImage
				id="portal-lens-map"
				result="map"
				x="0"
				y="0"
				preserveAspectRatio="none"
			/>
			<feColorMatrix
				in="SourceGraphic"
				type="matrix"
				values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
				result="chR"
			/>
			<feColorMatrix
				in="SourceGraphic"
				type="matrix"
				values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
				result="chG"
			/>
			<feColorMatrix
				in="SourceGraphic"
				type="matrix"
				values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
				result="chB"
			/>
			<feDisplacementMap
				id="portal-lens-r"
				in="chR"
				in2="map"
				scale="0"
				xChannelSelector="R"
				yChannelSelector="G"
				result="dR"
			/>
			<feDisplacementMap
				id="portal-lens-b"
				in="chB"
				in2="map"
				scale="0"
				xChannelSelector="R"
				yChannelSelector="G"
				result="dB"
			/>
			<feBlend mode="screen" in="dR" in2="chG" result="rg" />
			<feBlend mode="screen" in="rg" in2="dB" />
		</filter>
	</defs>
</svg>

<style>
	.portal-overlay {
		--q: min(1, calc(var(--p) * 2));
		--ring-in: clamp(0, calc((var(--p) - 0.06) * 5), 1);
		--in: clamp(0, calc(var(--p) * 12), 1);
		--out: clamp(0, calc((1 - var(--p)) * 7.14), 1);
		--night-in: min(0.5, clamp(0, calc((var(--p) - 0.08) * 4), 1));
		--night-out: clamp(0, calc((0.7 - var(--p)) * 4), 1);
		--night-rewind: clamp(0, calc((var(--p) - 0.06) * 3), 1);
		position: fixed;
		inset: 0;
		z-index: 115;
		overflow: hidden;
		opacity: min(var(--in), var(--out));
		visibility: hidden;
		pointer-events: none;
	}

	.portal-overlay.active {
		visibility: visible;
	}

	/* While the reverse animation runs the overlay is fully opaque, even at
	   p = 1 where the normal fade-out would hide it. */
	.portal-overlay.rewinding {
		visibility: visible;
		opacity: 1;
	}

	.portal-overlay.rewinding .portal-night {
		opacity: var(--night-rewind);
	}

	.portal-overlay.rewinding .portal-skip {
		opacity: 0;
		pointer-events: none;
	}

	.portal-night {
		position: absolute;
		inset: 0;
		z-index: 1;
		opacity: min(var(--night-in), var(--night-out));
		background:
			radial-gradient(ellipse 60% 55% at 50% 50%, rgba(228, 180, 114, 0.16), transparent 70%),
			radial-gradient(ellipse 100% 100% at 50% 120%, rgba(80, 45, 15, 0.58), transparent 62%),
			linear-gradient(to bottom, #070504, #0c0906 48%, #070504);
		pointer-events: none;
	}

	.portal-night::after {
		content: "";
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(228, 180, 114, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(228, 180, 114, 0.04) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 5%, transparent 72%);
		opacity: var(--p);
	}

	.portal-lens-defs {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.portal-canvas,
	.portal-fallback {
		position: absolute;
		inset: 0;
		z-index: 3;
		width: 100%;
		height: 100%;
		pointer-events: none;
		mix-blend-mode: screen;
	}

	.portal-canvas.failed {
		display: none;
	}

	.portal-fallback {
		opacity: calc(var(--p) * 0.75);
		background:
			radial-gradient(circle at 50% 50%, rgba(228, 180, 114, 0.22), transparent 34%),
			radial-gradient(circle at 28% 62%, rgba(255, 201, 157, 0.16), transparent 18%),
			radial-gradient(circle at 72% 28%, rgba(228, 180, 114, 0.15), transparent 22%);
	}

	.portal-fallback.hidden {
		display: none;
	}

	.portal-ring {
		position: absolute;
		z-index: 4;
		top: 50%;
		left: 50%;
		width: min(112vmin, 1200px);
		aspect-ratio: 1;
		color: rgb(
			calc(109 + 119 * var(--q)) calc(148 + 32 * var(--q)) calc(255 - 141 * var(--q))
		);
		opacity: calc(var(--ring-in) * (0.4 + var(--p) * 0.6));
		transform: translate(-50%, -50%) scale(calc(0.94 + var(--p) * 0.06))
			rotate(calc(var(--p) * 230deg));
		filter: drop-shadow(0 0 calc(8px + var(--p) * 32px) rgba(228, 180, 114, 0.45));
		pointer-events: none;
	}

	.portal-ring-inner {
		z-index: 3;
		width: min(80vmin, 860px);
		color: var(--portal-gold);
		opacity: calc(var(--ring-in) * (0.18 + var(--p) * 0.5));
		transform: translate(-50%, -50%) scale(calc(0.96 + var(--p) * 0.04))
			rotate(calc(var(--p) * -170deg));
		filter: drop-shadow(0 0 calc(6px + var(--p) * 16px) rgba(228, 180, 114, 0.3));
	}

	.portal-core {
		position: absolute;
		z-index: 5;
		top: 50%;
		left: 50%;
		width: clamp(80px, 11vmin, 130px);
		aspect-ratio: 1;
		border: 1px solid currentColor;
		background: radial-gradient(circle, rgba(255, 201, 157, 0.22), transparent 66%);
		box-shadow:
			0 0 30px rgba(228, 180, 114, 0.3),
			inset 0 0 40px rgba(228, 180, 114, 0.2);
		color: var(--portal-gold);
		transform: translate(-50%, -50%) rotate(calc(45deg + var(--p) * 120deg))
			scale(calc(0.7 + var(--p) * 0.3));
		opacity: calc(var(--ring-in) * 0.75);
		pointer-events: none;
	}

	.portal-skip {
		position: absolute;
		z-index: 6;
		right: var(--gutter);
		bottom: 1.6rem;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.65rem 0.85rem;
		border: 1px solid rgba(228, 180, 114, 0.32);
		background: rgba(8, 6, 4, 0.38);
		backdrop-filter: blur(8px);
		color: #e4b472;
		font-size: 0.68rem;
		opacity: 0.85;
		pointer-events: auto;
		transition:
			opacity var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.portal-skip:hover,
	.portal-skip:focus-visible {
		opacity: 1;
		background: rgba(228, 180, 114, 0.1);
	}

	.portal-edge {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 7;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--portal-gold), transparent);
		opacity: calc(var(--p) * 2);
		box-shadow: 0 0 18px rgba(228, 180, 114, 0.5);
		pointer-events: none;
	}

	@media (max-width: 900px) {
		/* On small screens the lobby is not pinned, so the portal waits until
		   the form has almost left the viewport. */
		.portal-overlay {
			--in: clamp(0, calc((var(--p) - 0.18) * 8), 1);
		}
	}

	@media (max-width: 760px) {
		.portal-skip {
			right: 50%;
			bottom: 1.2rem;
			transform: translateX(50%);
			white-space: nowrap;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.portal-overlay {
			display: none;
		}
	}
</style>
