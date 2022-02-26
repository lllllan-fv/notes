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
      "/1-java": [
        "/1-java/",
        {
          title: "java 基础",
          icon: "",
          prefix: "1-java/1-basic/",
          children: [
            "1-r2coding-basic/",
            "2-java-guide-basic/",
            {
              title: "重要知识点",
              icon: "",
              prefix: "3-important-points/",
              children: [
                "1-java-value-passed/",
                "2-reflection/",
                "3-agent/"
              ],
            },
            {
              title: "常见面试题",
              icon: "",
              prefix: "4-interview-questions/",
              children: [
                "1-basic/",
                "2-generics-and-reflection/",
                "3-string/",
                "4-abnormal/",
                "5-io/"
              ],
            },
          ],
        },
        {
          title: "JVM",
          icon: "",
          prefix: "1-java/2-jvm/",
          children: [
            "1-memory-area-details/",
            "2-garbage-collection/",
            "3-know-the-jvm/"
          ],
        },
        {
          title: "容器",
          icon: "",
          prefix: "1-java/3-container/",
          children: [
            "1-collection-basic/",
            {
              title: "源码解读",
              icon: "",
              prefix: "2-source-code/",
              children: [
                "1-arraylist/"
              ]
            },
          ],
        },
      ],

      "/3-cs-basic": [
        "/3-cs-basic/",
        {
          title: "计算机网络",
          icon: "",
          prefix: "3-cs-basic/1-network/",
          children: [
            "2-interview-questions/",
            "3-url-to-page/",
            {
              title: "网络是怎样连接的",
              icon: "",
              prefix: "1-how-is-the-network-connected/",
              children: [
                "1-browser-generated-messages/",
                "2-transmission-of-electrical-signal/",
                "3-network-cables-to-network-devices/",
              ],
            },
            {
              title: "图解HTTP",
              icon: "",
              prefix: "4-diagram-http/",
              children: [
                "1-visit-web/",
              ],
            },
          ],
        },
        {
          title: "操作系统",
          icon: "",
          prefix: "3-cs-basic/2-operating-system/",
          children: [
            "1-interview-questions/"
          ],
        },
      ],

      "/4-practice": [
        "/4-practice/",
        {
          title: "题型分类",
          icon: "",
          prefix: "4-practice/",
          children: [
            "1-array/"
          ],
        }
      ],

      "/5-interview": [
        "/5-interview/",
      ],
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
