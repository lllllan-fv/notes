---
# 这是页面的图标
icon: page

# 这是文章的标题
title: Vector 源码解读

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- 集合
- 源码解读

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer:
---



::: warning 转载声明

- [Java集合 Vector的底层详解_Dre丿的博客-CSDN博客_java vector底层](https://blog.csdn.net/yt_19940616/article/details/90183781)

:::



类似 ArrayList，底层都是维护一个数组，只是大部分方法前用 synchronized 修饰，实现线程安全。

扩容机制上，vector 可以指定增长系数 increment，每次扩容容量增加一个 increment；若不指定则每次双倍扩容
