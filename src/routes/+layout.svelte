<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>Савва Крупницкий — веб-разработчик, геймдев, музыка и звук</title>
	<meta
		name="description"
		content="Портфолио Саввы Крупницкого: SvelteKit и TypeScript, Unity и Godot, Jai, Obsidian, музыка и звук. Санкт-Петербург, СПбГУПТД."
	/>
	<meta name="author" content="Савва Крупницкий" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:site_name" content="Савва Крупницкий" />
	<meta property="og:title" content="Савва Крупницкий — веб-разработчик, геймдев, музыка и звук" />
	<meta
		property="og:description"
		content="Портфолио на стыке кода, формы и звука: SvelteKit, Unity/Godot, Jai, Obsidian, музыка и звук."
	/>
	<meta property="og:url" content="https://ixniyevonn.github.io/practice1/" />
	<meta property="og:image" content="https://ixniyevonn.github.io/practice1/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Савва Крупницкий — портфолио: чертёж и кодекс" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://ixniyevonn.github.io/practice1/og.png" />
	<link rel="canonical" href="https://ixniyevonn.github.io/practice1/" />
</svelte:head>

{@render children()}
