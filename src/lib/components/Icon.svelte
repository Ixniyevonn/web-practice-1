<script lang="ts">
	type IconName =
		| "arrow-right"
		| "arrow-down"
		| "arrow-up"
		| "arrow-up-right"
		| "sun"
		| "moon"
		| "menu"
		| "close"
		| "mail"
		| "telegram"
		| "github"
		| "copy"
		| "check"
		| "chevron-down"
		| "plus"
		| "spark";

	let {
		name,
		size = 18,
		strokeWidth = 1.6,
		class: className = ""
	}: { name: IconName; size?: number; strokeWidth?: number; class?: string } = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="square"
	stroke-linejoin="miter"
	aria-hidden="true"
	focusable="false"
>
	{#if name === "arrow-right"}
		<path d="M4 12h15M13 6l6 6-6 6" />
	{:else if name === "arrow-down"}
		<path d="M12 4v15M6 13l6 6 6-6" />
	{:else if name === "arrow-up"}
		<path d="M12 20V5M6 11l6-6 6 6" />
	{:else if name === "arrow-up-right"}
		<path d="M6 18 18 6M8 6h10v10" />
	{:else if name === "sun"}
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
	{:else if name === "moon"}
		<path d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z" />
	{:else if name === "menu"}
		<path d="M3 6h18M3 12h18M3 18h18" />
	{:else if name === "close"}
		<path d="M5 5l14 14M19 5 5 19" />
	{:else if name === "mail"}
		<path d="M3 5h18v14H3zM3 6l9 7 9-7" />
	{:else if name === "telegram"}
		<path d="M21 4 3 11l6 2 2 6 3-4 5 3 2-14Z" />
	{:else if name === "github"}
		<path
			d="M9 19c-4 1-4-2-6-3m12 6v-4.2c0-1.1.1-1.5-.5-2.1 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.4 11.4 0 0 0-6 0C5.9 1.9 4.9 2.2 4.9 2.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 8.7c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2.1V21"
		/>
	{:else if name === "copy"}
		<path d="M8 8h11v12H8zM5 16H4V4h11v1" />
	{:else if name === "check"}
		<path d="m4 12 5 5L20 6" />
	{:else if name === "chevron-down"}
		<path d="m6 9 6 6 6-6" />
	{:else if name === "plus"}
		<path d="M12 4v16M4 12h16" />
	{:else if name === "spark"}
		<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
	{/if}
</svg>
