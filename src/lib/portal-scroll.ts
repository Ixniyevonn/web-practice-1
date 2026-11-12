/**
 * One source of truth for the lobby → portal → codex scroll range so the
 * header, the menu and the portal overlay never disagree about where the
 * transition is.
 *
 * Desktop pins the last lobby screen (`.lobby-stage` is taller than the
 * sticky `.web-contact`), so the transition runs while the old screen is
 * still visible. Small screens keep the normal flow and add a short dark
 * runway instead.
 *
 * Layout measurements are cached and only refreshed after a resize or a
 * layout change. Scroll handlers therefore read just `window.scrollY`, not
 * half a dozen `getBoundingClientRect()` calls on every frame.
 */

export type PortalMetrics = {
	begin: number;
	end: number;
	pinned: boolean;
	aboutTop: number;
	headerOffset: number;
	codexTop: number;
};

let cached: PortalMetrics | null = null;

function measure(): PortalMetrics {
	const vh = window.innerHeight;
	const header = document.querySelector<HTMLElement>(".site-header");
	const stage = document.querySelector<HTMLElement>(".lobby-stage");
	const spacer = document.querySelector<HTMLElement>(".portal-spacer");
	const web = document.querySelector<HTMLElement>("#web-contact");
	const about = document.querySelector<HTMLElement>("#about");

	const headerOffset = header?.offsetHeight ?? 74;
	const stageTop = stage ? stage.getBoundingClientRect().top + window.scrollY : 0;
	const spacerHeight =
		spacer && getComputedStyle(spacer).display !== "none" ? spacer.offsetHeight : 0;
	const webBottom = web ? web.getBoundingClientRect().bottom + window.scrollY : stageTop;
	const stageHeight = stage?.offsetHeight ?? 0;
	const codexTop = stageTop + stageHeight + spacerHeight;
	/* offsetTop is layout-only and ignores transforms. */
	const aboutOffset = about?.offsetTop ?? 0;
	const aboutTop = codexTop + aboutOffset;

	const pinned = Boolean(web && stageHeight > web.offsetHeight + vh * 0.2);
	const begin = pinned ? stageTop : Math.max(vh * 0.12, webBottom - vh * 0.75);
	const end = Math.max(begin + vh * 0.6, aboutTop - headerOffset - 8);

	return { begin, end, pinned, aboutTop, headerOffset, codexTop };
}

/** Forget the cached layout. The next read measures the page again. */
export function invalidatePortalScroll() {
	cached = null;
}

/** Re-measure now (mount, resize, font swap, image load). */
export function refreshPortalScroll(): PortalMetrics {
	cached = measure();
	return cached;
}

export function readPortalScroll() {
	const metrics = cached ?? (cached = measure());
	const progress = Math.min(
		1,
		Math.max(0, (window.scrollY - metrics.begin) / (metrics.end - metrics.begin))
	);
	return { ...metrics, progress };
}

/**
 * Anchor navigation that respects the fixed header. The browser's own
 * smooth scrolling moves the page through the portal; the portal is only a
 * function of `scrollY`, so this is the same motion a wheel or trackpad
 * produces — just uninterrupted.
 */
export function scrollToHash(hash: string) {
	if (typeof window === "undefined") return;

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
	const target = hash === "#top" ? null : document.querySelector<HTMLElement>(hash);

	if (!target) {
		window.scrollTo({ top: 0, left: 0, behavior });
	} else {
		target.scrollIntoView({ behavior, block: "start" });
	}

	if (window.location.hash !== hash) {
		history.pushState(null, "", hash);
	}
}
