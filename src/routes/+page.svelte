<script lang="ts">
	import { onMount } from "svelte";
	import AboutSection from "$lib/components/AboutSection.svelte";
	import ChronicleSection from "$lib/components/ChronicleSection.svelte";
	import ContactSection from "$lib/components/ContactSection.svelte";
	import Header from "$lib/components/Header.svelte";
	import Hero from "$lib/components/Hero.svelte";
	import NowSection from "$lib/components/NowSection.svelte";
	import RuneDivider from "$lib/components/RuneDivider.svelte";
	import RunePortal from "$lib/components/RunePortal.svelte";
	import SiteFooter from "$lib/components/SiteFooter.svelte";
	import SkillsSection from "$lib/components/SkillsSection.svelte";
	import WorksSection from "$lib/components/WorksSection.svelte";
	import WebContactSection from "$lib/components/WebContactSection.svelte";
	import WorldSection from "$lib/components/WorldSection.svelte";

	onMount(() => {
		const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduced) {
			for (const element of elements) element.classList.add("is-visible");
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
		);

		for (const element of elements) observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<a class="skip-link" href="#main">К содержанию</a>
<Header />
<RunePortal />
<main id="main" tabindex="-1">
	<Hero />
	<div class="lobby-stage">
		<WebContactSection />
	</div>
	<div class="portal-spacer" aria-hidden="true"></div>
	<div class="codex">
		<RuneDivider index={0} />
		<AboutSection />
		<RuneDivider index={3} />
		<ChronicleSection />
		<RuneDivider index={11} />
		<SkillsSection />
		<RuneDivider index={25} />
		<WorksSection />
		<RuneDivider index={33} />
		<WorldSection />
		<RuneDivider index={6} />
		<NowSection />
		<RuneDivider index={15} />
		<ContactSection />
	</div>
</main>
<SiteFooter />
