import { browser } from "$app/environment";

export type Theme = "light" | "dark";

const STORAGE_KEY = "sk-theme";

let current = $state<Theme>("light");
let ready = $state(false);

export function initTheme(): void {
	if (!browser || ready) return;
	const attr = document.documentElement.dataset.theme;
	current = attr === "dark" ? "dark" : "light";
	ready = true;
}

export function getTheme(): Theme {
	return current;
}

export function setTheme(next: Theme): void {
	current = next;
	if (!browser) return;
	document.documentElement.dataset.theme = next;
	document.documentElement.style.colorScheme = next;
	document
		.querySelectorAll('meta[name="theme-color"]')
		.forEach((meta) => meta.setAttribute("content", next === "dark" ? "#0c0a08" : "#f2f3ef"));
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		/* Storage can be unavailable — the toggle still works. */
	}
}

export function toggleTheme(): void {
	setTheme(current === "dark" ? "light" : "dark");
}

if (browser) {
	initTheme();
}
