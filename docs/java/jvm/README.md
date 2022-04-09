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
- [【JVM】JVM加载class文件的原理机制_FAIRY哦的博客-CSDN博客_jvm加载类文件原理机制](https://blog.csdn.net/renjingjingya0429/article/details/88525915)

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



## JVM加载class文件的原理机制

JVM中类的装在是由类加载器和它的子类来实现的，Java中的类加载器是一个重要的Java运行时系统组件，它负责在运行时查找和装入类文件中的类。

> 由于Java的跨平台性，经过编译的Java源程序并不是一个可执行程序，而是一个或多个类文件。



当Java程序需要使用某个类时，JVM会确保这个类已经被加载、连接（验证、准备、解析）和初始化。

1. 类的加载是把类的class文件中的数据读入到内存中，通常是创建一个字节数组读入class文件，然后产生于所加载类对应的Class对象。加载完成之后，Class对象还不完整，所以此时的类还不可用。

2. 当类被加载后就进入连接阶段，这一阶段包括验证、准备（为静态变量分配内存并设置默认的初始值）和解析（将符号引用替换为直接引用）。

3. 最后JVM对类进行初始化，包括：

    1. 如果类存在直接的父类并且这个类还没有被初始化，那么就先初始化父类

    1. 如果类中存在初始化语句，就依次执行这些初始化语句



### 类加载器

类的加载是由加载器完成的，类加载器包括

- 根加载器，BootStap Class Loader
- 扩展加载器，Extension Class Loader
- 应用程序类加载器，Application Class Loader



### 类装载方式

1. 隐式装载：程序在运行过程中当碰到通过new等方式生成类或者子类对象、使用类或者子类的静态域时，隐式调用类加载器加载对应的的类到JVM中。
2. 显式装载：通过调用Class.forName()或者ClassLoader.loadClass(className)等方法，显式加载需要的类。



### 类加载的动态性体现

一个应用程序总是由n多个类组成，Java程序启动时，并不是一次把所有的类全部加载再运行，他总是把保证程序运行的基础类一次性加载到JVM中，其他类等到JVM用到的时候再加载，这样是为了节省内存的开销，因为Java最早就是为嵌入式系统而设计的，内存宝贵，而用到时再加载这也是Java动态性的一种体现。
