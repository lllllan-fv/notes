---
# 这是页面的图标
icon: page

# 这是文章的标题
title: JVM 常见问题

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

- [面试官 | JVM 为什么使用元空间替换了永久代？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/111809384)

:::



## 永久代和元空间

[面试官 | JVM 为什么使用元空间替换了永久代？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/111809384)

[JVM年轻代，老年代，永久代详解 - 经典鸡翅 - 博客园 (cnblogs.com)](https://www.cnblogs.com/jichi/p/12580906.html)



方法区是一种规范，永久代和元空间都是对方法区的一种实现。



JDK1.8 以前，采用的是永久代。当时的堆和方法区在逻辑上是两个概念，但是物理地址是连续的。

JDK1.8 之后，取消了永久代，改用元空间。元空间不再和堆连续，而是 ==存在于本地内存== 。这么做的好处是，只要本地内存足够，他就不会像永久代一样出现OOM：`java.lang.OutOfMemoryError: PermGen space`



## 什么时候触发 Full GC



1. 老年代空间不足。老年代只有在新生代对象转入及创建大对象、大数组是2才会出现不足的现象；当执行 Full GC 之后空间仍然得不到满足，则抛出 `java.lang.OutOfMemoryError: Java heap space`
2. 方法区空间不足。当系统中要加载、反射的类和调用的方法较多时，方法区可能会被占满；当执行 Full GC 之后空间仍然得不到满足，则抛出 `java.lang.OutOfMemoryError: PermGen space`
3. 对于采用CMS进行老年代GC的程序而言，尤其要注意GC日志中是否有promotion failed和concurrent mode failure两种状况，当这两种状况出现时可能会触发Full GC。
4. 统计得到的Minor GC晋升到旧生代的平均大小大于旧生代的剩余空间。[空间担保机制](3/8/#五、空间分配担保)
