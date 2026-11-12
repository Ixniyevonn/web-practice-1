<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "./Icon.svelte";
	import RuneRing from "./RuneRing.svelte";
	import {
		invalidatePortalScroll,
		readPortalScroll,
		refreshPortalScroll
	} from "$lib/portal-scroll";

	let overlay = $state<HTMLDivElement | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);
	let active = $state(false);
	let webglFailed = $state(false);

	const vertexSource = `
		attribute vec2 a_position;
		void main() {
			gl_Position = vec4(a_position, 0.0, 1.0);
		}
	`;

	/*
	 * The star field is deliberately cheap: a capped canvas resolution, one
	 * noise lookup and a small fixed particle count. The portal is decorative,
	 * so a 1440px-wide buffer upscaled by CSS looks identical and leaves the
	 * main thread alone.
	 */
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

			float glow = 0.0;
			for (int i = 0; i < 16; i++) {
				float fi = float(i);
				float seed = hash(vec2(fi, 7.13));
				float speed = 0.018 + seed * 0.055;
				vec2 pos = vec2(
					(seed - 0.5) * 2.15,
					fract(seed * 9.7 + t * speed) * 2.5 - 1.25
				);
				float d = length(p - pos);
				float twinkle = 0.45 + 0.55 * hash(vec2(fi, floor(t * 2.0)));
				glow += smoothstep(0.010, 0.0, d) * twinkle;
			}

			float radial = exp(-length(p) * 2.15);
			vec3 gold = mix(vec3(0.90, 0.62, 0.32), vec3(1.0, 0.82, 0.56), n);

			float fadeIn = smoothstep(0.0, 0.22, u_progress);
			float fadeOut = 1.0 - smoothstep(0.82, 1.0, u_progress) * 0.45;
			float alpha = (glow * 0.95 + radial * 0.07) * fadeIn * fadeOut;

			gl_FragColor = vec4(gold, alpha);
		}
	`;

	const smoothstep = (value: number) => {
		const t = Math.min(1, Math.max(0, value));
		return t * t * (3 - 2 * t);
	};

	/* 0 at both ends of the range, 1 at the peak. */
	const hump = (p: number, start: number, peak: number, end: number) => {
		if (p <= start || p >= end) return 0;
		const t = p < peak ? (p - start) / (peak - start) : (end - p) / (end - peak);
		return smoothstep(t);
	};

	onMount(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const root = document.documentElement;
		/* The portal value is written to the three affected sections instead of
		   <html>. Custom properties inherit, so a root-level write would force a
		   style recalculation for the entire 15 000px page on every frame. */
		const web = document.querySelector<HTMLElement>("#web-contact");
		const about = document.querySelector<HTMLElement>("#about");
		const targets = [
			document.querySelector<HTMLElement>(".hero"),
			web,
			about
		].filter((element): element is HTMLElement => Boolean(element));
		let frame = 0;
		let running = false;
		let startedAt = 0;
		let current = -1;
		let lastActive = false;
		let scrollFrame = 0;
		let settleFrame = 0;
		let settling = false;
		let savedScrollBehavior = "";
		let lastY = window.scrollY;
		let direction = 0;
		let sawScroll = false;
		let pointerActive = false;
		let navigationHoldUntil = 0;
		const SETTLE_MIN = 0.02;
		const SETTLE_MAX = 0.98;
		let gl: WebGLRenderingContext | null = null;
		let program: WebGLProgram | null = null;
		let uRes: WebGLUniformLocation | null = null;
		let uTime: WebGLUniformLocation | null = null;
		let uProgress: WebGLUniformLocation | null = null;
		let buffer: WebGLBuffer | null = null;

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
				premultipliedAlpha: false,
				depth: false,
				stencil: false
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
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			const width = Math.max(1, canvas.clientWidth);
			const height = Math.max(1, canvas.clientHeight);
			const scale = Math.min(1, 1440 / Math.max(width, height));
			const bufferWidth = Math.max(1, Math.round(width * dpr * scale));
			const bufferHeight = Math.max(1, Math.round(height * dpr * scale));
			if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
				canvas.width = bufferWidth;
				canvas.height = bufferHeight;
				gl.viewport(0, 0, bufferWidth, bufferHeight);
			}
		};

		const draw = (now: number) => {
			if (!running) return;
			frame = requestAnimationFrame(draw);
			if (!canvas || !gl || !program) return;
			if (document.visibilityState === "hidden") return;

			resize();
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.useProgram(program);
			if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
			if (uTime) gl.uniform1f(uTime, (now - startedAt) / 1000);
			if (uProgress) gl.uniform1f(uProgress, Math.max(0, current));
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};

		const startDraw = () => {
			if (running || !gl || reduced) return;
			running = true;
			if (!startedAt) startedAt = performance.now();
			frame = requestAnimationFrame(draw);
		};

		const stopDraw = () => {
			running = false;
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
		};

		/* Writes are limited to one custom property and a class that changes
		   only twice per crossing. Svelte state is not touched on every frame. */
		const setProgress = (next: number) => {
			const p = Math.min(1, Math.max(0, next));
			if (Math.abs(p - current) < 0.0001) return;
			current = p;
			const value = p.toFixed(4);
			for (const target of targets) target.style.setProperty("--portal-p", value);
			overlay?.style.setProperty("--p", value);

			/* Chromatic aberration belongs to the two frames that meet the
			   portal. Each one ramps up while it approaches the veil and back
			   down while it leaves, so the fringe is never on at rest. */
			web?.style.setProperty("--ca", hump(p, 0.02, 0.23, 0.43).toFixed(3));
			about?.style.setProperty("--ca", hump(p, 0.55, 0.76, 0.99).toFixed(3));
			overlay?.style.setProperty("--ca", Math.sin(Math.PI * p).toFixed(3));

			const nextActive = p > 0.001 && p < 0.999;
			if (nextActive !== lastActive) {
				lastActive = nextActive;
				active = nextActive;
				root.classList.toggle("portal-active", nextActive);
				if (nextActive) startDraw();
				else stopDraw();
			}
		};

		/*
		 * Once a scroll enters the portal we keep the crossing moving in the
		 * direction the user was already scrolling. The animation starts on
		 * the scroll event itself — there is no debounce and no scrollend
		 * wait. Any wheel / touch / key / pointer input stops it instantly;
		 * the next scroll event resumes from the new position, so input is
		 * never blocked or overridden.
		 */
		const stopSettle = () => {
			if (!settling) return;
			settling = false;
			if (settleFrame) cancelAnimationFrame(settleFrame);
			settleFrame = 0;
			root.style.scrollBehavior = savedScrollBehavior;
		};

		const settlePortal = (info: ReturnType<typeof readPortalScroll>) => {
			if (settling || reduced || pointerActive || document.visibilityState === "hidden") return;
			if (performance.now() < navigationHoldUntil) return;

			/* Continue the direction the user was scrolling instead of
			   reversing against their gesture. At a dead stop, pick the
			   nearest side. */
			const towardEnd = direction > 0 || (direction === 0 && info.progress >= 0.5);
			const target = towardEnd ? info.end : info.begin;
			const start = window.scrollY;
			const distance = target - start;

			if (Math.abs(distance) < 2) {
				window.scrollTo(0, target);
				setProgress(target === info.end ? 1 : 0);
				return;
			}

			settling = true;
			savedScrollBehavior = root.style.scrollBehavior;
			root.style.scrollBehavior = "auto";

			/* Starts at zero speed and accelerates the whole way, so the
			   hand-off from the user's gesture feels continuous. */
			const duration = Math.min(1300, Math.max(450, Math.abs(distance) * 0.8));
			let startedAt = 0;
			let expectedY = start;

			const tick = (now: number) => {
				if (!settling) return;

				/* If something outside this animation moved the page (scrollbar
				   drag, browser find, etc.), yield immediately. */
				if (Math.abs(window.scrollY - expectedY) > 3) {
					stopSettle();
					return;
				}

				if (!startedAt) startedAt = now;
				const t = Math.min(1, (now - startedAt) / duration);
				const eased = t * t * (1.5 - 0.5 * t);
				expectedY = start + distance * eased;
				window.scrollTo(0, expectedY);

				if (t < 1) {
					settleFrame = requestAnimationFrame(tick);
					return;
				}

				window.scrollTo(0, target);
				settleFrame = 0;
				settling = false;
				root.style.scrollBehavior = savedScrollBehavior;
				setProgress(target === info.end ? 1 : 0);
			};

			settleFrame = requestAnimationFrame(tick);
		};

		const update = () => {
			scrollFrame = 0;

			const y = window.scrollY;
			if (Math.abs(y - lastY) > 0.5) direction = y > lastY ? 1 : -1;
			lastY = y;

			if (reduced) {
				setProgress(0);
				return;
			}

			const info = readPortalScroll();
			setProgress(info.progress);

			if (
				sawScroll &&
				!settling &&
				!pointerActive &&
				performance.now() >= navigationHoldUntil &&
				info.progress > SETTLE_MIN &&
				info.progress < SETTLE_MAX
			) {
				settlePortal(info);
			}
		};

		const schedule = () => {
			if (!scrollFrame) scrollFrame = requestAnimationFrame(update);
		};

		const onScroll = () => {
			sawScroll = true;
			schedule();
		};

		const onUserInput = () => {
			navigationHoldUntil = 0;
			stopSettle();
		};

		const onPointerDown = () => {
			pointerActive = true;
			onUserInput();
		};

		const onPointerUp = () => {
			pointerActive = false;
		};

		/* Safety net for touch / scrollbar releases where no final scroll
		   event arrives. Wheel and keyboard input already starts the settle
		   from their scroll event, so this does not delay them. */
		const onScrollEnd = () => {
			if (!settling) schedule();
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (
				[" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)
			) {
				onUserInput();
			}
		};

		const onNavigationClick = (event: MouseEvent) => {
			const element = event.target as Element | null;
			if (!element?.closest?.('a[href^="#"]')) return;
			/* Let the browser's anchor scroll finish without the settle
			   animation trying to choose a portal side mid-flight. */
			navigationHoldUntil = performance.now() + 3000;
			stopSettle();
		};

		const onLayoutChange = () => {
			stopSettle();
			invalidatePortalScroll();
			schedule();
		};

		const onVisibility = () => {
			if (document.visibilityState === "hidden") {
				stopSettle();
				stopDraw();
			} else {
				if (lastActive) startDraw();
				schedule();
			}
		};

		const ok = initWebGL();
		webglFailed = !ok;

		refreshPortalScroll();
		update();

		const observer = new ResizeObserver(onLayoutChange);
		observer.observe(document.body);
		document.fonts?.ready.then(onLayoutChange);

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("scrollend", onScrollEnd, { passive: true });
		window.addEventListener("resize", onLayoutChange, { passive: true });
		window.addEventListener("wheel", onUserInput, { passive: true });
		window.addEventListener("touchstart", onPointerDown, { passive: true });
		window.addEventListener("touchmove", onUserInput, { passive: true });
		window.addEventListener("touchend", onPointerUp, { passive: true });
		window.addEventListener("touchcancel", onPointerUp, { passive: true });
		window.addEventListener("pointerdown", onPointerDown, { passive: true });
		window.addEventListener("pointerup", onPointerUp, { passive: true });
		window.addEventListener("pointercancel", onPointerUp, { passive: true });
		window.addEventListener("click", onNavigationClick, { passive: true });
		window.addEventListener("popstate", onUserInput, { passive: true });
		window.addEventListener("keydown", onKeyDown, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);
		if (ok) resize();

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("scrollend", onScrollEnd);
			window.removeEventListener("resize", onLayoutChange);
			window.removeEventListener("wheel", onUserInput);
			window.removeEventListener("touchstart", onPointerDown);
			window.removeEventListener("touchmove", onUserInput);
			window.removeEventListener("touchend", onPointerUp);
			window.removeEventListener("touchcancel", onPointerUp);
			window.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
			window.removeEventListener("click", onNavigationClick);
			window.removeEventListener("popstate", onUserInput);
			window.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("visibilitychange", onVisibility);
			if (scrollFrame) cancelAnimationFrame(scrollFrame);
			stopSettle();
			stopDraw();
			root.classList.remove("portal-active");
			for (const target of targets) {
				target.style.removeProperty("--portal-p");
				target.style.removeProperty("--ca");
			}
			overlay?.style.removeProperty("--ca");
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
	bind:this={overlay}
	aria-hidden={!active}
	inert={!active}
>
	<div class="portal-night" aria-hidden="true"></div>
	<canvas class="portal-canvas" class:failed={webglFailed} bind:this={canvas} aria-hidden="true"></canvas>
	<div class="portal-fallback" class:hidden={!webglFailed} aria-hidden="true"></div>

	<div class="portal-glow" aria-hidden="true"></div>

	<div class="portal-ring portal-ring-chroma portal-ring-red" aria-hidden="true">
		<RuneRing runes={28} />
	</div>
	<div class="portal-ring portal-ring-chroma portal-ring-cyan" aria-hidden="true">
		<RuneRing runes={28} />
	</div>

	<div class="portal-ring" aria-hidden="true">
		<RuneRing runes={28} />
	</div>
	<div class="portal-ring portal-ring-inner" aria-hidden="true">
		<RuneRing runes={16} />
	</div>
	<span class="portal-core" aria-hidden="true"></span>

	<a class="portal-skip mono" href="#about">
		Перейти к кодексу
		<Icon name="arrow-down" size={14} />
	</a>

	<span class="portal-edge" aria-hidden="true"></span>
</div>

<style>
	.portal-overlay {
		--q: min(1, calc(var(--p) * 2));
		--ring-in: clamp(0, calc((var(--p) - 0.04) * 6), 1);
		--in: clamp(0, calc(var(--p) * 12), 1);
		--out: clamp(0, calc((1 - var(--p)) * 7.14), 1);
		--night-in: min(0.5, clamp(0, calc((var(--p) - 0.08) * 4), 1));
		--night-out: clamp(0, calc((0.7 - var(--p)) * 4), 1);
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

	.portal-canvas,
	.portal-fallback {
		position: absolute;
		inset: 0;
		z-index: 3;
		width: 100%;
		height: 100%;
		pointer-events: none;
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

	.portal-glow {
		position: absolute;
		z-index: 2;
		top: 50%;
		left: 50%;
		width: min(96vmin, 1000px);
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(228, 180, 114, 0.14),
			rgba(228, 180, 114, 0.05) 38%,
			transparent 68%
		);
		opacity: calc(var(--ring-in) * (0.35 + var(--p) * 0.65));
		transform: translate(-50%, -50%) scale(calc(0.82 + var(--p) * 0.28));
		pointer-events: none;
	}

	.portal-ring {
		position: absolute;
		z-index: 4;
		top: 50%;
		left: 50%;
		width: min(112vmin, 1200px);
		aspect-ratio: 1;
		color: var(--portal-gold);
		opacity: calc(var(--ring-in) * (0.4 + var(--p) * 0.6));
		transform: translate(-50%, -50%) scale(calc(0.94 + var(--p) * 0.06))
			rotate(calc(var(--p) * 230deg));
		pointer-events: none;
	}

	.portal-ring-inner {
		z-index: 3;
		width: min(80vmin, 860px);
		color: var(--portal-gold);
		opacity: calc(var(--ring-in) * (0.18 + var(--p) * 0.5));
		transform: translate(-50%, -50%) scale(calc(0.96 + var(--p) * 0.04))
			rotate(calc(var(--p) * -170deg));
	}

	/* Two offset, tinted copies of the outer ring. Duplicated vector layers
	   are composited with a transform, which is much cheaper than a
	   full-screen SVG displacement/blend filter. */
	.portal-ring-chroma {
		z-index: 3;
		opacity: calc(var(--ring-in) * (0.25 + var(--ca, 0) * 0.45));
		mix-blend-mode: screen;
		transform: translate(calc(-50% + var(--split, 0px)), -50%)
			scale(calc(0.94 + var(--p) * 0.06)) rotate(calc(var(--p) * 230deg));
	}

	.portal-ring-red {
		--split: calc(var(--ca, 0) * -4px);
		color: #ff4b5c;
	}

	.portal-ring-cyan {
		--split: calc(var(--ca, 0) * 4px);
		color: #4fe8ff;
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
