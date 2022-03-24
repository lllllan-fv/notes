const { config } = require("vuepress-theme-hope");

module.exports = config({
	title: "lllllan",
	// description: "lllllan 的自学笔记",

	base: '/',
	dest: "./dist",

	head: [
		["script", { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },],
		["script", { src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js", },],
		["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
		["script", { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },],
	],

	locales: {
		"/": {
			lang: "zh",
		},
		// "/zh/": {
		//   title: "Theme Demo",
		//   description: "vuepress-theme-hope 的 demo",
		// },
	},

	themeConfig: {
		logo: "/logo.png",
		hostname: "https://vue-blog.lllllan.cn",

		author: "lllllan",
		repo: "https://github.com/lllllan-fv/blog",

		nav: [
			{ text: "Blog Home", link: "/", icon: "home" },
			// {
			//   text: "Guide",
			//   icon: "creative",
			//   link: "/guide/",
			// },
			// {
			//   text: "Docs",
			//   link: "https://vuepress-theme-hope.github.io/",
			//   icon: "note",
			// },
		],

		sidebar: {

			// Java 基础
			"/java/basic/": [
				"",
				"1-concept/",
				"2-grammar/",
				"3-data/",
				"4-object/",
				"5-reflection/",
				"6-annotation/",
				"7-exception/",
				"8-io/",
				"9-agent/",
			],

			// Java 多线程
			"/java/concurrent/": [
				"",
				{
					title: "深入浅出多线程 - 基础篇",
					icon: "",
					prefix: "1/",
					children: ["1/", "2/", "3/", "4/", "5/"],
				},
				{
					title: "深入浅出多线程 - 原理篇",
					icon: "",
					prefix: "2/",
					children: ["6/", "7/", "8/", "9/", "10/", "11/"],
				},
				{
					title: "深入浅出多线程 - 工具篇",
					icon: "",
					prefix: "3/",
					children: ["12/", "13/", "14/", "15/", "16/", "17/", "18/", "19/", "20/"],
				},
				{
					title: "补充",
					icon: "",
					prefix: "def/",
					children: ["sequential-consistency/"],
				}
			],

			// Java 容器
			"/java/container/": [
				"",
				"collection-basic/",
				{
					title: "源码解读",
					icon: "",
					prefix: "source-code/",
					children: ["arraylist/",]
				}
			],

			// Java 虚拟机
			"/java/jvm/": [
				"",
				{
					title: "Java内存区域与内存溢出异常",
					icon: "",
					prefix: "2/",
					children: ["1/", "2/"],
				},
				{
					title: "垃圾收集器与内存分配策略",
					icon: "",
					prefix: "3/",
					children: ["1/", "2/", "3/", "4/", "5/", "6/", "7/", "8/"]
				},
				{
					title: "类文件结构",
					icon: "",
					prefix: "6/",
					children: ["2/", "3/", "4/"],
				},
				{
					title: "虚拟机类加载机制",
					icon: "",
					prefix: "7/",
					children: ["2/", "3/", "4/"],
				}
			],


			// 计算机网络
			"/cs-basic/network/": [
				"",
				"interview-questions/",
				"url-to-page/",
				{
					title: "网络是怎样连接的",
					incon: "",
					prefix: "how-is-the-network-connected/",
					children: ["1/", "2/", "3/", "4/", "5/", "6/"],
				},
				{
					title: "图解HTTP",
					icon: "",
					prefix: "diagram-http/",
					children: [
						"1/", "2/", "3/", "4/", "5/", "6/",
						"7/", "8/", "9/", "10/", "11/",
					],
				}
			],

			// 操作系统
			"/cs-basic/os/": [
				"",
				"interview-questions/",
				{
					title: "王道-操作系统",
					icon: "",
					prefix: "wangdao/",
					children: [
						{
							title: "计算机系统概述",
							icon: "",
							prefix: "1/",
							children: ["1/", "2/", "3/", "4/", "5/", "6/"],
						},
						{
							title: "进程与线程",
							icon: "",
							prefix: "2/",
							children: ["1/", "2/", "3/", "4/"],
						},
						{
							title: "内存管理",
							icon: "",
							prefix: "3/",
							children: ["1/", "2/"],
						},
						{
							title: "文件管理",
							icon: "",
							prefix: "4/",
							children: ["1/", "2/", "3/"],
						},
						{
							title: "IO管理",
							icon: "",
							prefix: "5/",
							children: ["1/", "2/", "3/"],
						},
					]
				}
			],

			// 数据库
			"/db/": [
				"",
				"mysql/",
				{
					title: "MySQL 重要知识点",
					icon: "",
					prefix: "mysql/",
					children: [
						"architecture/",
						"log-system/",
						"transaction/",
						"mvcc/",
					],
				},
			],

			// 数据结构和算法
			"/ds-and-algorithms/": [
				"",
				{
					title: "数据结构",
					icon: "",
					prefix: "data-structures/",
					children: [],
				},
				{
					title: "算法",
					icon: "",
					prefix: "algorithms/",
					children: [
						"sort/",
					]
				}
			],

			// 框架技术
			"/framework/": [
				"",
				{
					title: "框架模式",
					icon: "",
					prefix: "frame-mode/",
					children: ["mvc/", "mvvm/"],
				}
			]
		},

		locales: {
			"/zh/": {
				nav: [
					{ text: "博客主页", link: "/zh/", icon: "home" },
					{ text: "项目主页", link: "/zh/home/", icon: "home" },
					{
						text: "如何使用",
						icon: "creative",
						link: "/zh/guide/",
					},
					{
						text: "主题文档",
						icon: "note",
						link: "https://vuepress-theme-hope.github.io/zh/",
					},
				],
				sidebar: {
					"/zh/": [
						"",
						"home",
						"slides",
						"layout",
						{
							title: "如何使用",
							icon: "creative",
							prefix: "guide/",
							children: ["", "page", "markdown", "disable", "encrypt"],
						},
					],
				},
			},
		},

		// blog: {
		//   intro: "/intro/",
		//   sidebarDisplay: "mobile",
		//   links: {
		//     Zhihu: "https://zhihu.com",
		//     Baidu: "https://baidu.com",
		//     Github: "https://github.com",
		//   },
		// },

		footer: {
			display: true,
			content: '<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021095794号</a>',
		},

		copyright: true,
		// copyright: {
		//   status: "global",
		// },

		git: {
			timezone: "Asia/Shanghai",
		},

		mdEnhance: {
			mark: true,
			enableAll: true,
			container: true,
			presentation: {
				plugins: [
					"highlight",
					"math",
					"search",
					"notes",
					"zoom",
					"anything",
					"audio",
					"chalkboard",
				],
			},
		},

		pwa: {
			favicon: "/logo.png",
			cachePic: true,
			apple: {
				icon: "/logo.png",
				statusBarColor: "black",
			},
			msTile: {
				image: "/logo.png",
				color: "#ffffff",
			},
			manifest: {
				icons: [
					{
						src: "/logo.png",
						sizes: "512x512",
						purpose: "maskable",
						type: "image/png",
					},
					{
						src: "/logo.png",
						sizes: "192x192",
						purpose: "maskable",
						type: "image/png",
					},
					{
						src: "/logo.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/logo.png",
						sizes: "192x192",
						type: "image/png",
					},
				],
				shortcuts: [
					{
						name: "",
						short_name: "",
						url: "/",
						icons: [
							{
								src: "/assets/icon/guide-maskable.png",
								sizes: "192x192",
								purpose: "maskable",
								type: "image/png",
							},
							{
								src: "/assets/icon/guide-monochrome.png",
								sizes: "192x192",
								purpose: "monochrome",
								type: "image/png",
							},
						],
					},
				],
			},
		},
	},
});
