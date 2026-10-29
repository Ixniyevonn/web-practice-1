<script lang="ts">
	import { mainSkills, skillGroups } from "$lib/content";
	import RuneImage from "./RuneImage.svelte";
	import SectionHeader from "./SectionHeader.svelte";
	import SkillPips from "./SkillPips.svelte";

	const webMain = mainSkills.slice(0, 5);
	const gameMain = mainSkills.slice(5, 9);
	const toolMain = mainSkills.slice(9);

	const totalSkills = skillGroups.reduce((sum, group) => sum + group.skills.length, 0);
</script>

<section class="section skills" id="skills" aria-labelledby="skills-title">
	<div class="skills-watermark" aria-hidden="true">
		<RuneImage index={18} size="100%" />
	</div>
	<div class="container">
		<SectionHeader
			index="III"
			label="Гримуар"
			title="Навыки"
			id="skills-title"
			rune={22}
			lead="Не проценты, а честные роли: что-то — основной стек, что-то — рабочий инструмент, что-то — в процессе изучения. Уровни субъективны и не заменяют тестовое задание."
		/>

		<div class="legend" data-reveal>
			<span class="mono legend-title">Легенда</span>
			<span class="legend-item mono"><SkillPips level="core" /> ядро</span>
			<span class="legend-item mono"><SkillPips level="working" /> рабочий</span>
			<span class="legend-item mono"><SkillPips level="learning" /> изучаю</span>
		</div>

		<div class="main-skills">
			<article class="skill-panel web-panel" data-reveal>
				<header class="panel-head">
					<span class="panel-rune" aria-hidden="true"><RuneImage index={5} size={20} /></span>
					<div>
						<h3>Веб и фулстек</h3>
					</div>
				</header>
				<ul class="skill-list">
					{#each webMain as skill}
						<li>
							<span class="skill-name">{skill.name}</span>
							<SkillPips level={skill.level} />
						</li>
					{/each}
				</ul>
			</article>

			<article class="skill-panel game-panel" data-reveal style="--reveal-delay: 90ms">
				<header class="panel-head">
					<span class="panel-rune" aria-hidden="true"><RuneImage index={9} size={20} /></span>
					<div>
						<h3>Игры и движки</h3>
					</div>
				</header>
				<ul class="skill-list">
					{#each gameMain as skill}
						<li>
							<span class="skill-name">{skill.name}</span>
							<SkillPips level={skill.level} />
						</li>
					{/each}
				</ul>
			</article>

			<article class="tool-strip" data-reveal style="--reveal-delay: 140ms">
				<span class="strip-label mono">Инструменты</span>
				<ul>
					{#each toolMain as skill}
						<li>
							<span>{skill.name}</span>
							<SkillPips level={skill.level} />
						</li>
					{/each}
					<li>
						<span>Ableton Live</span>
						<SkillPips level="working" />
					</li>
					<li>
						<span>Figma</span>
						<SkillPips level="working" />
					</li>
					<li>
						<span>Obsidian API</span>
						<SkillPips level="working" />
					</li>
				</ul>
			</article>
		</div>

		<details class="grimoire" data-reveal>
			<summary>
				<span class="summary-title">Открыть весь гримуар</span>
				<span class="summary-count mono">{totalSkills} навыков / 4 раздела</span>
				<span class="summary-icon" aria-hidden="true"><RuneImage index={7} size={18} /></span>
			</summary>

			<div class="grimoire-grid">
				{#each skillGroups as group}
					<article class="grimoire-group" style={`--accent: ${group.accent}`}>
						<header>
							<span class="group-label mono">{group.label}</span>
							<h4>{group.title}</h4>
						</header>
						<ul>
							{#each group.skills as skill}
								<li>
									<span>{skill.name}</span>
									<SkillPips level={skill.level} />
								</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>

			<p class="grimoire-note mono">
				Языки: русский — родной; английский — очень хороший уровень. Мягкие навыки
				добавлены в раздел «Творчество»: продуктовое мышление, документация,
				командная работа, самостоятельность и креативность.
			</p>
		</details>
	</div>
</section>

<style>
	.skills {
		overflow: hidden;
		background:
			radial-gradient(ellipse 40% 40% at 100% 20%, var(--cx-glow), transparent 70%),
			var(--cx-bg-deep);
	}

	.skills-watermark {
		position: absolute;
		top: 16%;
		right: 3%;
		width: clamp(180px, 27vw, 380px);
		aspect-ratio: 1;
		color: var(--cx-gold);
		opacity: 0.045;
		transform: rotate(-14deg);
		pointer-events: none;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.65rem 1.1rem;
		margin-bottom: 1.4rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--cx-line);
		color: var(--cx-faint);
	}

	.legend-title {
		color: var(--cx-gold);
		font-size: 0.66rem;
	}

	.legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.66rem;
	}

	.main-skills {
		display: grid;
		grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
		gap: 1rem;
	}

	.skill-panel {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: clamp(1.1rem, 2.4vw, 1.8rem);
		border: 1px solid var(--cx-line);
		background:
			linear-gradient(145deg, color-mix(in srgb, var(--cx-gold) 6%, transparent), transparent 38%),
			var(--cx-panel);
		box-shadow:
			inset 0 0 0 1px color-mix(in srgb, var(--cx-gold) 5%, transparent),
			0 18px 50px color-mix(in srgb, var(--cx-shadow) 55%, transparent);
	}

	.skill-panel::before {
		content: "";
		position: absolute;
		top: -1px;
		left: 8%;
		right: 8%;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--cx-gold), transparent);
		opacity: 0.45;
		pointer-events: none;
	}

	.web-panel {
		border-top-color: var(--cx-line-strong);
	}

	.panel-head {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin-bottom: 1.2rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--cx-line);
	}

	.panel-rune {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border: 1px solid var(--cx-line-strong);
		color: var(--cx-gold);
		flex: none;
	}

	.panel-head h3 {
		font-size: clamp(1.3rem, 2.1vw, 1.65rem);
	}

	.skill-list {
		display: flex;
		flex-direction: column;
	}

	.skill-list li {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.8rem;
		padding: 0.55rem 0;
		border-bottom: 1px solid var(--cx-line);
	}

	.skill-list li:last-child {
		border-bottom: 0;
	}

	.skill-name {
		font-size: 0.98rem;
		color: var(--cx-ink);
	}

	.tool-strip {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1.4rem;
		padding: 0.9rem 1.1rem;
		border: 1px solid var(--cx-line);
		background: var(--cx-panel);
	}

	.strip-label {
		color: var(--cx-gold);
		font-size: 0.68rem;
	}

	.tool-strip ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem 1.4rem;
	}

	.tool-strip li {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--cx-muted);
		font-size: 0.86rem;
	}

	/* Grimoire details */
	.grimoire {
		margin-top: 1.4rem;
		border: 1px solid var(--cx-line);
		background: var(--cx-panel);
	}

	.grimoire summary {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		align-items: center;
		gap: 0.8rem;
		padding: 1rem 1.1rem;
		cursor: pointer;
		list-style: none;
		color: var(--cx-gold);
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.grimoire summary::-webkit-details-marker {
		display: none;
	}

	.grimoire summary:hover {
		background: var(--cx-glow);
	}

	.summary-title {
		font-family: var(--f-serif);
		font-size: clamp(1.12rem, 1.9vw, 1.4rem);
		font-weight: 700;
	}

	.summary-count {
		font-size: 0.64rem;
		color: var(--cx-faint);
	}

	.summary-icon {
		transition: transform var(--dur) var(--ease-out);
	}

	.grimoire[open] .summary-icon {
		transform: rotate(180deg);
	}

	.grimoire-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1px;
		border-top: 1px solid var(--cx-line);
		background: var(--cx-line);
	}

	.grimoire-group {
		padding: 1.1rem;
		background: var(--cx-panel);
		box-shadow: inset 0 2px 0 var(--accent);
	}

	.group-label {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--accent);
		font-size: 0.64rem;
	}

	.grimoire-group h4 {
		margin-bottom: 0.7rem;
		font-size: 1.1rem;
	}

	.grimoire-group ul {
		display: flex;
		flex-direction: column;
	}

	.grimoire-group li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		padding: 0.28rem 0;
		border-bottom: 1px solid var(--cx-line);
		color: var(--cx-muted);
		font-size: 0.86rem;
	}

	.grimoire-group li:last-child {
		border-bottom: 0;
	}

	.grimoire-note {
		margin: 0;
		padding: 1rem 1.1rem;
		border-top: 1px solid var(--cx-line);
		color: var(--cx-faint);
		font-size: 0.64rem;
		line-height: 1.7;
	}

	@media (max-width: 820px) {
		.main-skills {
			grid-template-columns: 1fr;
		}

		.grimoire-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.grimoire summary {
			grid-template-columns: minmax(0, 1fr) auto;
		}

		.summary-count {
			display: none;
		}
	}
</style>
