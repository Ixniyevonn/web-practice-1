export type ProjectCategory = "web" | "tools";
export type SkillLevel = "core" | "working" | "learning";

export interface Project {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	stack: string[];
	role: string;
	status: string;
	category: ProjectCategory;
	cover: "niheria" | "portfolio" | "obsidian" | "gamejam";
	href: string;
	linkLabel: string;
	featured?: boolean;
	hint?: string;
}

export interface Skill {
	name: string;
	level: SkillLevel;
	note?: string;
}

export interface SkillGroup {
	id: string;
	label: string;
	title: string;
	accent: string;
	skills: Skill[];
}

export interface TimelineEntry {
	index: string;
	kicker: string;
	title: string;
	text: string;
	tags: string[];
}

export const profile = {
	name: "Савва Крупницкий",
	shortName: "Савва",
	monogram: "СК",
	city: "Санкт-Петербург",
	role: "Веб-разработчик · Геймдев · Музыка и звук",
	tagline: "Собираю интерфейсы, миры и звук на стыке кода и формы.",
	status: "Принимаю предложения по веб- и геймдев-проектам",
	email: "ixniy.evonniy@gmail.com",
	telegram: "ixniyevonn",
	telegramUrl: "https://t.me/ixniyevonn",
	github: "Ixniyevonn",
	githubUrl: "https://github.com/Ixniyevonn",
	repoUrl: "https://github.com/Ixniyevonn/practice1",
	university: "СПбГУПТД",
	program: "Прикладная информатика в дизайне",
	course: "5 курс",
	workplace: "ЦТ1520",
	languages: "Русский · Английский — очень хороший уровень"
} as const;

export const categories: { id: "all" | ProjectCategory; label: string }[] = [
	{ id: "all", label: "Все" },
	{ id: "web", label: "Веб-платформы" },
	{ id: "tools", label: "Инструменты и игры" }
];

export const projects: Project[] = [
	{
		id: "niheria",
		title: "Злорадство Нихерии",
		subtitle: "Вики и инструменты для ролевого мира",
		description:
			"Многостраничная платформа для ролевого проекта: статьи, персонажи, карты, календарь и мастерские инструменты. SvelteKit, TypeScript, PostgreSQL, Drizzle ORM. Роль — фулстек: от схемы данных до интерфейсов и анимаций.",
		stack: ["SvelteKit", "TypeScript", "PostgreSQL", "Drizzle"],
		role: "фулстек",
		status: "личный проект / в развитии",
		category: "web",
		cover: "niheria",
		href: "#niheria",
		linkLabel: "Войти в кодекс",
		featured: true,
		hint: "Следующий раздел уже смотрит на вас"
	},
	{
		id: "portfolio",
		title: "Этот сайт",
		subtitle: "Портфолио-кодекс на SvelteKit",
		description:
			"Статический сайт-визитка: чертёжный первый экран, WebGL-переход через рунический портал, тёмный кодекс, фильтр проектов, две темы и мобильное меню. SvelteKit, TypeScript, adapter-static, WebGL. Роль — дизайн и разработка.",
		stack: ["SvelteKit", "TypeScript", "WebGL", "adapter-static"],
		role: "дизайн + разработка",
		status: "учебный проект",
		category: "web",
		cover: "portfolio",
		href: "https://github.com/Ixniyevonn/practice1",
		linkLabel: "Репозиторий"
	},
	{
		id: "obsidian",
		title: "Obsidian: личные плагины",
		subtitle: "Инструменты для собственной вики",
		description:
			"Экспериментальные плагины для Obsidian: инструменты для личной вики и заметок. TypeScript, Obsidian API, CodeMirror 6. Роль — разработка и UX. Публичные ссылки появятся позже.",
		stack: ["TypeScript", "Obsidian API", "CodeMirror 6"],
		role: "разработка",
		status: "пет-проект / в разработке",
		category: "tools",
		cover: "obsidian",
		href: "https://github.com/Ixniyevonn",
		linkLabel: "GitHub"
	},
	{
		id: "gamejam",
		title: "Game Jam Prototype",
		subtitle: "Играбельный прототип за выходные",
		description:
			"Командные прототипы для геймджемов. Unity / C# и Godot / GDScript. Названия, роли и ссылки появятся после публикации.",
		stack: ["Unity", "C#", "Godot", "GDScript"],
		role: "командная работа",
		status: "командный / учебный",
		category: "tools",
		cover: "gamejam",
		href: "https://github.com/Ixniyevonn",
		linkLabel: "GitHub"
	}
];

export const mainSkills: Skill[] = [
	{ name: "SvelteKit", level: "core", note: "основной веб-стек" },
	{ name: "TypeScript", level: "core", note: "основной язык" },
	{ name: "Next.js", level: "working" },
	{ name: "Node.js / Bun", level: "working" },
	{ name: "PostgreSQL", level: "working" },
	{ name: "Unity / C#", level: "working", note: "геймдев" },
	{ name: "Godot / GDScript", level: "working", note: "геймдев" },
	{ name: "Jai", level: "learning", note: "изучаю" },
	{ name: "Game design", level: "working", note: "геймдев" },
	{ name: "Git / GitHub", level: "working" }
];

export const skillGroups: SkillGroup[] = [
	{
		id: "web",
		label: "WEB",
		title: "Веб и фулстек",
		accent: "#6d94ff",
		skills: [
			{ name: "HTML5 / CSS3", level: "core" },
			{ name: "JavaScript", level: "core" },
			{ name: "TypeScript", level: "core" },
			{ name: "SvelteKit", level: "core" },
			{ name: "Next.js", level: "working" },
			{ name: "React", level: "working" },
			{ name: "Node.js / Bun", level: "working" },
			{ name: "REST / API", level: "working" },
			{ name: "PostgreSQL / SQL", level: "working" },
			{ name: "Drizzle ORM", level: "working" },
			{ name: "Tailwind / CSS-архитектура", level: "working" },
			{ name: "CSS / SVG / Canvas / WebGL", level: "working" },
			{ name: "Доступность", level: "working" },
			{ name: "Тесты", level: "learning" },
			{ name: "Git / GitHub Actions", level: "working" },
			{ name: "Docker", level: "learning" },
			{ name: "Linux", level: "working" },
			{ name: "Vite", level: "working" }
		]
	},
	{
		id: "game",
		label: "GAME",
		title: "Игры и движки",
		accent: "#e4b472",
		skills: [
			{ name: "Unity / C#", level: "working" },
			{ name: "Godot / GDScript", level: "working" },
			{ name: "Jai", level: "learning" },
			{ name: "Гейм-дизайн", level: "working" },
			{ name: "Level design", level: "working" },
			{ name: "Шейдеры HLSL / GLSL", level: "learning" },
			{ name: "Blender", level: "learning" },
			{ name: "Прототипирование", level: "working" }
		]
	},
	{
		id: "tools",
		label: "TOOLS",
		title: "Инструменты",
		accent: "#9b8f80",
		skills: [
			{ name: "Git / GitHub", level: "working" },
			{ name: "Figma", level: "working" },
			{ name: "Photoshop", level: "working" },
			{ name: "Obsidian API / TypeScript", level: "working" },
			{ name: "VS Code / Zed", level: "working" },
			{ name: "Ableton Live", level: "working" }
		]
	},
	{
		id: "creative",
		label: "CREATIVE",
		title: "Творчество",
		accent: "#c58c3a",
		skills: [
			{ name: "Музыка / звук", level: "working" },
			{ name: "Гейм-дизайн", level: "working" },
			{ name: "Визуальная композиция", level: "working" },
			{ name: "Нарратив / worldbuilding", level: "working" },
			{ name: "Продуктовое мышление", level: "working" },
			{ name: "Документация", level: "working" },
			{ name: "Командная работа", level: "working" },
			{ name: "Самостоятельность", level: "working" },
			{ name: "Креативность", level: "working" }
		]
	}
];

export const timeline: TimelineEntry[] = [
	{
		index: "01",
		kicker: "НАЧАЛО",
		title: "Первые строки",
		text: "Начал разрабатывать в 14 лет. Первые сайты, эксперименты с графикой и играми; с тех пор код стал основным способом делать идеи осязаемыми.",
		tags: ["HTML / CSS", "JavaScript", "игры"]
	},
	{
		index: "02",
		kicker: "ОБРАЗОВАНИЕ",
		title: "СПбГУПТД",
		text: "5 курс, «Прикладная информатика в дизайне». Учусь соединять инженерное мышление с визуальной культурой: от алгоритмов и баз данных до типографики и интерфейсов.",
		tags: ["5 курс", "информатика", "дизайн"]
	},
	{
		index: "03",
		kicker: "РАБОТА",
		title: "ЦТ1520",
		text: "Веб-разработчик. Конкретные продукты и детали проектов не раскрываю; в портфолио остаются роль, стек и общий контекст.",
		tags: ["веб", "продакшн", "NDA"]
	},
	{
		index: "04",
		kicker: "ИГРЫ",
		title: "Геймджемы",
		text: "Несколько раз участвовал в геймджемах. Командная работа, ограниченное время, прототипы — без публичных названий и ссылок. Главное — успеть довести идею до играбельного состояния.",
		tags: ["прототипы", "команда", "дедлайн"]
	},
	{
		index: "05",
		kicker: "ИНСТРУМЕНТЫ",
		title: "Obsidian",
		text: "Разрабатываю личные плагины для Obsidian: небольшие инструменты для своей вики и заметок. TypeScript, Obsidian API, CodeMirror 6 — маленькие вещи, которые делают большую вики удобнее.",
		tags: ["TypeScript", "Obsidian API", "плагины"]
	},
	{
		index: "06",
		kicker: "СЕЙЧАС",
		title: "Настоящее",
		text: "SvelteKit и TypeScript для веба, Unity / Godot и Jai для игр, Obsidian для собственных инструментов, Ableton для музыки. Открыт к интересным предложениям.",
		tags: ["SvelteKit", "Jai", "Ableton"]
	}
];

export const principles = [
	{
		index: "01",
		title: "Смысл раньше эффекта",
		text: "Красиво то, что помогает понять и сделать. Сначала задача и структура, потом — свет, звук и движение."
	},
	{
		index: "02",
		title: "Код как материал",
		text: "Люблю чистые системы, которые можно менять без страха: понятные данные, предсказуемые компоненты, честные ограничения."
	},
	{
		index: "03",
		title: "Мир важнее фичи",
		text: "Собираю опыт целиком — интерфейс, нарратив, музыку. Хороший проект не разваливается на отдельные экраны."
	}
];
