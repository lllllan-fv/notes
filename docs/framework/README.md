---
# 这是页面的图标
icon: info

# 这是文章的标题
title: 框架技术概览

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: 

# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning 转载声明

- [java常用的框架介绍 - 诸葛文斌](https://www.cnblogs.com/byqh/p/5595384.html)
- [MVC框架_百度百科 (baidu.com)](https://baike.baidu.com/item/MVC框架/9241230)

:::



1. Spring MVC，[SpringMVC简介](https://blog.csdn.net/evankaka/article/details/45501811)
2. Spring，[Spring AOP 实现原理](https://blog.csdn.net/moreevan/article/details/11977115)、[Spring IOC容器基本原理](https://www.cnblogs.com/linjiqin/archive/2013/11/04/3407126.html)
3. MyBatis，[mybaits入门](https://blog.csdn.net/u013142781/article/details/50388204)
4. Dubbo，[Dubbo分布式服务框架入门](https://blog.csdn.net/u013142781/article/details/50387583)
5. Maven，[Maven入门](https://blog.csdn.net/u013142781/article/details/50316383)
6. RabbitMQ，[RabbitMQ消息队列入门篇](https://blog.csdn.net/u013142781/article/details/50487028)
7. Log4j，[Log4j日志在java项目中的使用](https://blog.csdn.net/u013142781/article/details/50405684)
8. Ehcache，[Spring+EhCache缓存实例](https://blog.csdn.net/u013142781/article/details/50507607)
9. Redis，[Redis+Spring缓存实例](https://blog.csdn.net/u013142781/article/details/50515320)
10. Shiro，[Shiro安全框架入门篇](https://blog.csdn.net/u013142781/article/details/50629708)



## 框架和设计模式

框架、设计模式这两个概念总容易被混淆，其实它们之间还是有区别的。框架通常是代码重用，而设计模式是设计重用，架构则介于两者之间，部分代码重用，部分设计重用，有时分析也可重用。在软件生产中有三种级别的重用：内部重用，即在同一应用中能公共使用的抽象块；代码重用，即将通用模块组合成库或工具集，以便在多个应用和领域都能使用；应用框架的重用，即为专用领域提供通用的或现成的基础结构，以获得最高级别的重用性。

框架与设计模式虽然相似，但却有着根本的不同。设计模式是对在某种环境中反复出现的问题以及解决该问题的方案的描述，它比框架更抽象；框架可以用代码表示，也能直接执行或复用，而对模式而言只有实例才能用代码表示;设计模式是比框架更小的元素，一个框架中往往含有一个或多个设计模式，框架总是针对某一特定应用领域，但同一模式却可适用于各种应用。可以说，框架是软件，而设计模式是软件的知识。



常见的框架模式有：

- [MVC](frame-mode/mvc/)
- [MVVM](frame-mode/mvvm/)
- MTV
- MVP
- CBD
- ORM
