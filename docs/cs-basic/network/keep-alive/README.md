---
# 这是页面的图标
icon: page

# 这是文章的标题
title: HTTP的keep-alive和TCP的keepalive

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

- [HTTP keep-alive和TCP keepalive的区别，你了解吗？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/224595048)
- [keepalive 原理讲解 - salami-china - 博客园 (cnblogs.com)](https://www.cnblogs.com/wangjq19920210/p/8440824.html)

:::



TCP连接往往就是我们广义理解上的长连接，一位内它具备双端来纳许收发报文的能力。

开启了 keep-alive 的 HTTP 连接也是一种长连接，但是它由于协议本身的限制，服务端无法主动发起应用报文。

----



TCP中的 keepalive 是用来保鲜、保活的。

HTTP中的 keep-alive 机制主要是为了让支撑它的TCP连接活的更久



更具体的直接看 [HTTP keep-alive和TCP keepalive的区别，你了解吗？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/224595048)

