if(!self.define){let e,a={};const s=(s,f)=>(s=new URL(s+".js",f).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(f,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(a[d])return;let c={};const r=e=>s(e,d),b={module:{uri:d},exports:c,require:r};a[d]=Promise.all(f.map((e=>b[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-ebf2f394"],(function(e){"use strict";e.setCacheNameDetails({prefix:"mr-hope"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/css/0.styles.fe5e2315.css",revision:"b4638f5c5e07c7a511eb068c1b02d540"},{url:"assets/img/danger-dark.7b1d6aa1.svg",revision:"7b1d6aa1bdcf013d0edfe316ab770f8e"},{url:"assets/img/danger.b143eda2.svg",revision:"b143eda243548a9982491dca4c81eed5"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/info-dark.f8a43cf6.svg",revision:"f8a43cf67fa96a27a078530a3a43253c"},{url:"assets/img/info.88826912.svg",revision:"88826912d81d91c9e2d03164cd1481a1"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/img/tip-dark.075a244c.svg",revision:"075a244c83d1403c167defe81b4d7fe7"},{url:"assets/img/tip.a2b80aa5.svg",revision:"a2b80aa50b769a26da12fe352322a657"},{url:"assets/img/warning-dark.aac7e30c.svg",revision:"aac7e30c5fafc6748e21f7a9ef546698"},{url:"assets/img/warning.ec428b6d.svg",revision:"ec428b6d6d45ac5d0c610f08d757f40f"},{url:"assets/js/29.dc082924.js",revision:"64b5e71a28f8122a85054b558cb09e16"},{url:"assets/js/30.48a23c18.js",revision:"72d270f2eb6440ed80867b24d89891ba"},{url:"assets/js/31.5c6a023d.js",revision:"93d86ffca4a5aa19c207f37295d3df1a"},{url:"assets/js/32.0517a4e0.js",revision:"a37f8fb83fef53e619b7438701c6ed5c"},{url:"assets/js/33.3f34fb07.js",revision:"4285212201803c01c4715e78e9bd381f"},{url:"assets/js/34.8c245ae7.js",revision:"30bac84084c6931983a2168712f5d47d"},{url:"assets/js/app.3c26dbe0.js",revision:"5bc8a0b3678c736c059d65c40da10f49"},{url:"assets/js/layout-Blog.4bcebec7.js",revision:"dd53e53e1df304df3d70594176220a5b"},{url:"assets/js/layout-Layout.28148f81.js",revision:"0cf1b11bbd9697ae452cfc486e426068"},{url:"assets/js/layout-NotFound.f09ee6b5.js",revision:"6da36d879e26bc8274d8bfa86203272c"},{url:"assets/js/layout-Slide.19dc7a56.js",revision:"8a80a23148c182baa43c4ac6f4deb1d7"},{url:"assets/js/page--2fce9e18.f7615e31.js",revision:"40941b1bf26cbcea2e04660e4d6c49ac"},{url:"assets/js/page-JavaGuide-Java基础知识.ddc63671.js",revision:"fb2b82a8ac6ff4c2c2dea91e761f983a"},{url:"assets/js/page-java内存区域详解.5cdd19b9.js",revision:"fbbf34c800816f2fbab666227552d8cd"},{url:"assets/js/page-Java垃圾回收.70700cef.js",revision:"df88b1db4e0eb8f5a28aeba9eafd5de2"},{url:"assets/js/page-java是值传递.fa10cd82.js",revision:"4471633697f298bf2d602d1f20f03769"},{url:"assets/js/page-Java笔记.fddb36ad.js",revision:"6d294fb2209b446d61fe369ca8e4c50c"},{url:"assets/js/page-Markdown增强.5e5d6dc7.js",revision:"a96790450f20f9ccb171f34fdaa406f4"},{url:"assets/js/page-R2Coding-Java基础核心总结.5a1951dd.js",revision:"9fc3b7b2ed1334448c7a01eb9c155b95"},{url:"assets/js/page-主要功能与配置演示.369cfc0d.js",revision:"93e9d490e46cd6f501d0904a3aca7142"},{url:"assets/js/page-代理详解.68a2e028.js",revision:"26a48f0e4ff4b27b3959dca1d6f316fd"},{url:"assets/js/page-博客主页.ffcc915b.js",revision:"146801413dfba413357580660f33ed39"},{url:"assets/js/page-反射机制.38fecf31.js",revision:"fcd183e94f2592e23821d5cd5d89f507"},{url:"assets/js/page-密码加密的文章.4ebaba79.js",revision:"4157b3a8bd79bdf2745ddd38fa773b30"},{url:"assets/js/page-幻灯片页.8542d80b.js",revision:"661f3342d53552ecb7c22c6a72b0a912"},{url:"assets/js/page-组件禁用.a5a4e54b.js",revision:"04bbcdc87294da729beb34ed13be2acf"},{url:"assets/js/page-页面配置.a13a3331.js",revision:"68ee68ca802797514404a8b7fc55f531"},{url:"assets/js/page-项目主页.1a3856ba.js",revision:"064d0455e1057b1479d66fb30a426d26"},{url:"assets/js/vendors~flowchart.d3d2e1eb.js",revision:"6bfc4970ef077acd95b89dcdab0dcc89"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.509fb8ae.js",revision:"8e06592d565b30ebb7eeb1256c761d86"},{url:"assets/js/vendors~layout-Layout.d7b3e87d.js",revision:"2c129af2d6332a4d3d9f9e71b2955cf4"},{url:"assets/js/vendors~mermaid.703d9363.js",revision:"b11e1daf61b1cb14396917ecf0801032"},{url:"assets/js/vendors~photo-swipe.c49feb38.js",revision:"a6fddc969f8ee9a186f74ba82db15b16"},{url:"assets/js/vendors~reveal.39dbff24.js",revision:"744237afc9af409d9d8b6a6caf8a36e0"},{url:"logo.svg",revision:"1a8e6bd1f66927a7dcfeb4b22f33ffde"},{url:"assets/fonts/KaTeX_AMS-Regular.10824af7.woff",revision:"10824af77e9961cfd548c8a458f10851"},{url:"assets/fonts/KaTeX_AMS-Regular.56573229.ttf",revision:"56573229753fad48910bda2ea1a6dd54"},{url:"assets/fonts/KaTeX_AMS-Regular.66c67820.woff2",revision:"66c678209ce93b6e2b583f02ce41529e"},{url:"assets/fonts/KaTeX_Caligraphic-Bold.497bf407.ttf",revision:"497bf407c4c609c6cf1f1ad38f437f7f"},{url:"assets/fonts/KaTeX_Caligraphic-Regular.e6fb499f.ttf",revision:"e6fb499fc8f9925eea3138cccba17fff"},{url:"assets/fonts/KaTeX_Fraktur-Bold.40934fc0.woff",revision:"40934fc076960bb989d590db044fef62"},{url:"assets/fonts/KaTeX_Fraktur-Bold.796f3797.woff2",revision:"796f3797cdf36fcaea18c3070a608378"},{url:"assets/fonts/KaTeX_Fraktur-Bold.b9d7c449.ttf",revision:"b9d7c4497cab3702487214651ab03744"},{url:"assets/fonts/KaTeX_Fraktur-Regular.97a699d8.ttf",revision:"97a699d83318e9334a0deaea6ae5eda2"},{url:"assets/fonts/KaTeX_Fraktur-Regular.e435cda5.woff",revision:"e435cda5784e21b26ab2d03fbcb56a99"},{url:"assets/fonts/KaTeX_Fraktur-Regular.f9e6a99f.woff2",revision:"f9e6a99f4a543b7d6cad1efb6cf1e4b1"},{url:"assets/fonts/KaTeX_Main-Bold.4cdba646.woff",revision:"4cdba6465ab9fac5d3833c6cdba7a8c3"},{url:"assets/fonts/KaTeX_Main-Bold.8e431f7e.ttf",revision:"8e431f7ece346b6282dae3d9d0e7a970"},{url:"assets/fonts/KaTeX_Main-Bold.a9382e25.woff2",revision:"a9382e25bcf75d856718fcef54d7acdb"},{url:"assets/fonts/KaTeX_Main-BoldItalic.52fb39b0.ttf",revision:"52fb39b0434c463d5df32419608ab08a"},{url:"assets/fonts/KaTeX_Main-BoldItalic.5f875f98.woff",revision:"5f875f986a9bce1264e8c42417b56f74"},{url:"assets/fonts/KaTeX_Main-BoldItalic.d8737343.woff2",revision:"d873734390c716d6e18ff3f71ac6eb8b"},{url:"assets/fonts/KaTeX_Main-Italic.39349e0a.ttf",revision:"39349e0a2b366f38e2672b45aded2030"},{url:"assets/fonts/KaTeX_Main-Italic.65297062.woff2",revision:"652970624cde999882102fa2b6a8871f"},{url:"assets/fonts/KaTeX_Main-Italic.8ffd28f6.woff",revision:"8ffd28f6390231548ead99d7835887fa"},{url:"assets/fonts/KaTeX_Main-Regular.818582da.ttf",revision:"818582dae57e6fac46202cfd844afabb"},{url:"assets/fonts/KaTeX_Main-Regular.f1cdb692.woff",revision:"f1cdb692ee31c10b37262caffced5271"},{url:"assets/fonts/KaTeX_Main-Regular.f8a7f19f.woff2",revision:"f8a7f19f45060f7a177314855b8c7aa3"},{url:"assets/fonts/KaTeX_Math-BoldItalic.1320454d.woff2",revision:"1320454d951ec809a7dbccb4f23fccf0"},{url:"assets/fonts/KaTeX_Math-BoldItalic.48155e43.woff",revision:"48155e43d9a284b54753e50e4ba586dc"},{url:"assets/fonts/KaTeX_Math-BoldItalic.6589c4f1.ttf",revision:"6589c4f1f587f73f0ad0af8ae35ccb53"},{url:"assets/fonts/KaTeX_Math-Italic.d8b7a801.woff2",revision:"d8b7a801bd87b324efcbae7394119c24"},{url:"assets/fonts/KaTeX_Math-Italic.ed7aea12.woff",revision:"ed7aea12d765f9e2d0f9bc7fa2be626c"},{url:"assets/fonts/KaTeX_Math-Italic.fe5ed587.ttf",revision:"fe5ed5875d95b18c98546cb4f47304ff"},{url:"assets/fonts/KaTeX_SansSerif-Bold.0e897d27.woff",revision:"0e897d27f063facef504667290e408bd"},{url:"assets/fonts/KaTeX_SansSerif-Bold.ad546b47.woff2",revision:"ad546b4719bcf690a3604944b90b7e42"},{url:"assets/fonts/KaTeX_SansSerif-Bold.f2ac7312.ttf",revision:"f2ac73121357210d91e5c3eaa42f72ea"},{url:"assets/fonts/KaTeX_SansSerif-Italic.e934cbc8.woff2",revision:"e934cbc86e2d59ceaf04102c43dc0b50"},{url:"assets/fonts/KaTeX_SansSerif-Italic.ef725de5.woff",revision:"ef725de572b71381dccf53918e300744"},{url:"assets/fonts/KaTeX_SansSerif-Italic.f60b4a34.ttf",revision:"f60b4a34842bb524b562df092917a542"},{url:"assets/fonts/KaTeX_SansSerif-Regular.1ac3ed6e.woff2",revision:"1ac3ed6ebe34e473519ca1da86f7a384"},{url:"assets/fonts/KaTeX_SansSerif-Regular.3243452e.ttf",revision:"3243452ee6817acd761c9757aef93c29"},{url:"assets/fonts/KaTeX_SansSerif-Regular.5f8637ee.woff",revision:"5f8637ee731482c44a37789723f5e499"},{url:"assets/fonts/KaTeX_Script-Regular.a189c37d.ttf",revision:"a189c37d73ffce63464635dc12cbbc96"},{url:"assets/fonts/KaTeX_Script-Regular.a82fa2a7.woff",revision:"a82fa2a7e18b8c7a1a9f6069844ebfb9"},{url:"assets/fonts/KaTeX_Size1-Regular.0d8d9204.ttf",revision:"0d8d9204004bdf126342605f7bbdffe6"},{url:"assets/fonts/KaTeX_Size2-Regular.1fdda0e5.ttf",revision:"1fdda0e59ed35495ebac28badf210574"},{url:"assets/fonts/KaTeX_Size4-Regular.27a23ee6.ttf",revision:"27a23ee69999affa55491c7dab8e53bf"},{url:"assets/fonts/KaTeX_Typewriter-Regular.0e046058.woff",revision:"0e0460587676d22eae09accd6dcfebc6"},{url:"assets/fonts/KaTeX_Typewriter-Regular.6bf42875.ttf",revision:"6bf4287568e1d3004b54d5d60f9f08f9"},{url:"assets/fonts/KaTeX_Typewriter-Regular.b8b8393d.woff2",revision:"b8b8393d2e65fcebda5fa99fa3264f41"},{url:"1-java/1-base/1-java-base-core-summary/index.html",revision:"11aac3990c0e2c07e0ce79b38526dc71"},{url:"1-java/1-base/2-java-guide-base/index.html",revision:"49d6cd6ea56e9e3a951541e8b714855e"},{url:"1-java/1-base/3-important-points/1-java-value-passed/index.html",revision:"e9674deaf2567ac0dcea7add65e641e6"},{url:"1-java/1-base/3-important-points/2-reflection/index.html",revision:"8dec79075399856f8a57aab1d8fb81db"},{url:"1-java/1-base/3-important-points/3-agent/index.html",revision:"84a007a543516faee3c3e0d1c4128131"},{url:"1-java/2-jvm/1-memory-area-details/index.html",revision:"8695f928d4abf3b6273e5127ff338799"},{url:"1-java/2-jvm/2-garbage-collection/index.html",revision:"bc2bcd621cbf7b270b12f7ac216ab16d"},{url:"1-java/3-container/1-collection-base/index.html",revision:"726955794abba6a9459b9cb5447eb6f7"},{url:"1-java/index.html",revision:"eb64125b86fc0be9350d70ce200429bd"},{url:"404.html",revision:"6cd937e6f57898cbbda69ddfbd0c5fd8"},{url:"article/index.html",revision:"a6bdf9085dd0f0bd06fa6f0ee6f4988a"},{url:"category/index.html",revision:"bcd9aebc1cd30e402bf69ea36cb3c613"},{url:"category/Java/index.html",revision:"ccdc8639d0e9e982ef33704d7236ff28"},{url:"category/使用指南/index.html",revision:"2c51be93c2166e128c39ce3ac5523066"},{url:"encrypt/index.html",revision:"a71a30575e0f9da3fa5dfef827f53823"},{url:"guide/disable/index.html",revision:"bbc5d1e729188f0f8032462c4dd59029"},{url:"guide/encrypt/index.html",revision:"03e387a97998e8966cab8a4042047df3"},{url:"guide/index.html",revision:"80fc9ede4471fe7c3ba30a86bf280f4c"},{url:"guide/markdown/index.html",revision:"7c08bc766093dae6caa703f9f237f4b1"},{url:"guide/page/index.html",revision:"323cd1917c713d20b2712c342439f60f"},{url:"home/index.html",revision:"f0ccf64de1f48449aecbc70de807365a"},{url:"index.html",revision:"b719185cd4223ad06087fc568784a979"},{url:"slide/index.html",revision:"9825d2bcfc574b6000ca7dd410d8036e"},{url:"slides/index.html",revision:"8401d66b7459faddfbedb84fb281245b"},{url:"star/index.html",revision:"a911afdffe8bee98ae0343d338a9a997"},{url:"tag/index.html",revision:"e6ca07f1df5ec960dbcfeeeabbb6758e"},{url:"tag/Java基础/index.html",revision:"2e4ceb2a95f983ef9de9bce6a4820870"},{url:"tag/JVM/index.html",revision:"0c10ab2cc3c8ebada610515334eba5db"},{url:"tag/markdown/index.html",revision:"5a78d0462c82766cc0ec96a53a754355"},{url:"tag/代理/index.html",revision:"c2d7a25b60ce76657045b1c2a6ae9b53"},{url:"tag/使用指南/index.html",revision:"7d3028510af8f69413620967a0a08292"},{url:"tag/反射/index.html",revision:"614271c57567c0531a930ade9845af3b"},{url:"tag/文章加密/index.html",revision:"0f26180bc72b0e64c5292671f8251494"},{url:"tag/页面配置/index.html",revision:"5af1391a598786de62bd31282cf3778b"},{url:"timeline/index.html",revision:"1c6596cc399dfafb76f3998480390fd3"},{url:"assets/icon/apple-icon-152.png",revision:"8b700cd6ab3f7ff38a82ee491bf3c994"},{url:"assets/icon/chrome-192.png",revision:"6d4cd350c650faaed8da00eb05a2a966"},{url:"assets/icon/chrome-512.png",revision:"b08fe93ce982da9d3b0c7e74e0c4e359"},{url:"assets/icon/chrome-mask-192.png",revision:"a05b03eeb7b69dc96355f36f0766b310"},{url:"assets/icon/chrome-mask-512.png",revision:"3c4d57a60277792c6c005494657e1dce"},{url:"assets/icon/guide-maskable.png",revision:"99cc77cf2bc792acd6b847b5e3e151e9"},{url:"assets/icon/guide-monochrome.png",revision:"699fa9b069f7f09ce3d52be1290ede20"},{url:"assets/icon/ms-icon-144.png",revision:"2fe199405e0366e50ac0442cc4f33a34"},{url:"assets/img/《深入理解虚拟机》第三版的第2章-虚拟机栈.5cc9c70c.5cc9c70c.png",revision:"5cc9c70c61cd1111584a9d525dd89891"},{url:"assets/img/01d330d8-2710-4fad-a91c-7bbbfaaefc0e.fac41c8a.fac41c8a.png",revision:"fac41c8a4d101bb2f3eb326806a3d30c"},{url:"assets/img/0cc3f4a15d3184391a98a7b1c58f6e5f_720w.4fbe8754.jpg",revision:"4fbe875428c95c25ae54e272137b9be4"},{url:"assets/img/1DjWCgTFm-xqbhbNQVsaWQw.12dd1650.png",revision:"12dd1650a544d43346e1a89228624434"},{url:"assets/img/20210313164740893.a951c078.png",revision:"a951c078d53b1a23e7a16b962f0a3fae"},{url:"assets/img/20210425134508117.425a630e.png",revision:"425a630edf8543525c6de245b03231c2"},{url:"assets/img/hero.b62ddd9c.jpg",revision:"b62ddd9c4a72085202b5218e4c98fd68"},{url:"assets/img/image-20210817123252441.79762346.png",revision:"79762346392d2375fb2a133bdf9713b6"},{url:"assets/img/image-20211213090952974.f8e4c12e.png",revision:"f8e4c12eb25f745ac6f3bdccd8ed0c0b"},{url:"assets/img/image-20211213091134933.b23bd866.png",revision:"b23bd866b7520d3b5e7c5b434bf2ed1d"},{url:"assets/img/image-20211217184906894.5f82810e.png",revision:"5f82810e1930a80fcfe7e1518f8ca5ad"},{url:"assets/img/image-20211217193021056.6385507e.png",revision:"6385507e9e0a83ac543b85d1b76917a7"},{url:"assets/img/image-20211217194119016.7c1c6734.png",revision:"7c1c6734fd26686ed168c2aab52a9ca6"},{url:"assets/img/image-20211217195521425.8f776b64.png",revision:"8f776b64e471a465215b97fcda810931"},{url:"assets/img/image-20211217195726947.7697302d.png",revision:"7697302da01f405ddb6adef7808b12f6"},{url:"assets/img/image-20211218142929505.cab9b9f8.png",revision:"cab9b9f8a68b9e92d4b8e6262d1300a8"},{url:"assets/img/image-20211218182136734.0511829b.png",revision:"0511829bef19e96a2bd0d2f333daaf15"},{url:"assets/img/image-20211224112354940.d1de2a34.png",revision:"d1de2a34b52ddc6e33de7a522a160c8f"},{url:"assets/img/image-20211224185753390.6cd59dbf.png",revision:"6cd59dbf0cf0eb05473950707fef3133"},{url:"assets/img/image-20211224191321306.215740ae.png",revision:"215740aef035b62e5da906af2efb96ca"},{url:"assets/img/image-20211224191353166.617561a2.png",revision:"617561a2f4b505b7c5e6dd19f6956dfa"},{url:"assets/img/image-20211224191614348.db8d3531.png",revision:"db8d3531527b5c2d41d79cad2ebf15b3"},{url:"assets/img/image-20211224191724340.e3025c26.png",revision:"e3025c269d4247da33b46deecee981ef"},{url:"assets/img/image-20211224191752947.c13ea7af.png",revision:"c13ea7afa01c3f9745d8c03c49c469fe"},{url:"assets/img/image-20211224191816351.d9de032a.png",revision:"d9de032aafea5865374dc7ccfb61ab5c"},{url:"assets/img/image-20211224191839037.f81179c4.png",revision:"f81179c4e0b341d11cc7082bc30e3952"},{url:"assets/img/image-20220116180214826.391d4b8b.png",revision:"391d4b8b85ee8a7a4a4f1250af04857d"},{url:"assets/img/image-20220118101609300.0511829b.png",revision:"0511829bef19e96a2bd0d2f333daaf15"},{url:"assets/img/image-20220118102736004.63d0a8d6.png",revision:"63d0a8d67f50bce9bada3d0828bb7ef6"},{url:"assets/img/IO-操作对象分类.31a17a45.png",revision:"31a17a459d836f889cd8047eaddc0abf"},{url:"assets/img/IO-操作方式分类.97167675.png",revision:"97167675291de6e8bf44a5f5c2a01571"},{url:"assets/img/java-collection-hierarchy.71519bdb.71519bdb.png",revision:"71519bdb8535c5ecab407de3126cb762"},{url:"assets/img/java-value-passing-01.ab88fb01.ab88fb01.png",revision:"ab88fb017d9ce70f9eef839c6e4fe4d5"},{url:"assets/img/java-value-passing-02.ff1b76c9.ff1b76c9.png",revision:"ff1b76c9f3ff19ed27b4ad9958bee44e"},{url:"assets/img/java-value-passing-03.da4d0422.da4d0422.png",revision:"da4d042238c9799c05f18604244420e5"},{url:"assets/img/Java创建对象的过程.dbe33c41.dbe33c41.png",revision:"dbe33c41523fb292a5c4e6554bd192fd"},{url:"assets/img/Java异常类层次结构图.dbbf6d63.png",revision:"dbbf6d63a3e1da962c6180d4df8ebc90"},{url:"assets/img/Java异常类层次结构图2.0b9496d3.png",revision:"0b9496d3902212448918c1fc8210fc2c"},{url:"assets/img/java程序转变为机器代码的过程.3dbbbc5a.3dbbbc5a.png",revision:"3dbbbc5a5fc92d720c7970f68fbeb2af"},{url:"assets/img/Java运行时数据区域JDK1.8.37016205.37016205.png",revision:"3701620584c3d417b60a0d6e071654a6"},{url:"assets/img/JVM堆内存结构-JDK7.7d9166eb.7d9166eb.png",revision:"7d9166eb0379e729fcaddaa22b387f21"},{url:"assets/img/JVM堆内存结构-jdk8.919b9959.919b9959.png",revision:"919b99590593f8a92fc4f018cc7d593f"},{url:"assets/img/JVM运行时数据区域.150c33e1.150c33e1.png",revision:"150c33e1cfb878f7c971671ecda9fc21"},{url:"assets/img/shallow&deep-copy.64ee0760.64ee0760.png",revision:"64ee07600a80c840cedb2a38b3800083"},{url:"assets/img/字符串拼接-常量池.17865368.png",revision:"178653689ea873e4484420e8442f7273"},{url:"assets/img/对象的访问定位-使用句柄.53859387.53859387.png",revision:"53859387e58ed8635ef1bb19abd8aca5"},{url:"assets/img/对象的访问定位-直接指针.c3bbe790.c3bbe790.png",revision:"c3bbe7904c66267d567119c916d29cf2"},{url:"avatar.png",revision:"4ea02ccc61d9175b6182eef57a165828"},{url:"lllllan.png",revision:"4ea02ccc61d9175b6182eef57a165828"},{url:"logo-lllllan.png",revision:"e3aea26c828644acb6cf4ac895dc7adb"},{url:"logo.png",revision:"aa7f29af2f8682567040efe7dad91da7"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map
addEventListener("message", (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === "skip-waiting")
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        (error) => replyPort.postMessage({ error })
      )
    );
});
