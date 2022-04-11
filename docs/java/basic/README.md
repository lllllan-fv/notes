---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 常见面试题

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-22 16:07

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java基础

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer:
---



::: warning 转载声明

- [什么是fail-fast - 程序员自由之路 - 博客园 (cnblogs.com)](https://www.cnblogs.com/54chensongxia/p/12470446.html)

:::



## Java程序是如何执行的



1. Java 代码编译成字节码。Java 源代码 → 词法分析器 → 语义分析器 → 字节码
2. Java 虚拟机使用类加载器装在 class 文件
3. 字节码校验，解释器翻译成机器码

![img](README.assets/5-1ZZ41409331Y.png)



## fail-fast 机制

**fail-fast是一种错误检测机制，一旦检测到可能发生错误，就立马抛出异常，程序不继续往下执行。**



在集合当中，会维护一个 `modCount`值，当使用 add、remove 等涉及改变集合元素个数的方法时就会修改这个值；而集合在遍历过程中，发现这个值和原先不同，表示可能有另一个线程在对这个集合进行操作（只是可能，因为自己也可以操作）。又因为很多集合是不保证线程安全的（保证线程安全代表着效率降低，这是一种取舍），于是通过 fail-fast 这种机制，检测到有可能出现错误，就抛出异常，不让程序继续往下执行。



[什么是fail-fast - 程序员自由之路 - 博客园 (cnblogs.com)](https://www.cnblogs.com/54chensongxia/p/12470446.html)

[Java提高篇（三四）-----fail-fast机制_Java 技术驿站的博客-CSDN博客_fail fast](https://blog.csdn.net/chenssy/article/details/38151189)

