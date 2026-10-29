/**
 * One source of truth for the lobby → portal → codex scroll range so the
 * header and the portal overlay never disagree about where the transition is.
 *
 * Desktop pins the last lobby screen (`.lobby-stage` is taller than the
 * sticky `.web-contact`), so the transition runs while the old screen is
 * still visible. Small screens keep the normal flow and add a short dark
 * runway instead.
 */
export function readPortalScroll() {
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
	/* offsetTop is layout-only and ignores the reveal transform. */
	const aboutOffset = about?.offsetTop ?? 0;
	const aboutTop = codexTop + aboutOffset;

	const pinned = Boolean(web && stageHeight > web.offsetHeight + vh * 0.2);
	const begin = pinned ? stageTop : Math.max(vh * 0.12, webBottom - vh * 0.75);
	const end = Math.max(begin + vh * 0.6, aboutTop - headerOffset - 8);
	const progress = Math.min(1, Math.max(0, (window.scrollY - begin) / (end - begin)));

	return { progress, begin, end, pinned, aboutTop, aboutOffset, codexTop, headerOffset };
}

/**
 * Home / brand navigation. Below the portal we replay the portal in reverse
 * instead of teleporting; at the top the default anchor behaviour is fine.
 */
export function goToTop(event?: Event) {
	if (typeof window === "undefined") return;
	if (readPortalScroll().progress > 0.02) {
		event?.preventDefault();
		window.dispatchEvent(new Event("portal:rewind"));
	}
}
