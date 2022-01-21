---
# 这是页面的图标
icon: page

# 这是文章的标题
title: Java 集合框架基础知识

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- 集合

# 此页面会在文章列表指定
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning

本文转载自 [Java集合框架基础知识&面试题总结 | JavaGuide](https://javaguide.cn/java/collection/java集合框架基础知识&面试题总结/)，略有改动

:::



# 一、集合概述



## 1.0 Java集合概览

![img](README.assets/java-collection-hierarchy.71519bdb.png)



## 1.1 集合框架底层数据结构

- `Collection`
  - `List`
    - `ArrayList`: Object[] 数组
    - `Vector`: Object[] 数组
    - `LinkedList`: 双向链表
  - `Set`
    - `HashSet`（无序）: 基于 `HashMap` 实现
    - `LinkedHashSet`: `HashSet` 的子类，基于 `LinkedHashMap` 实现
    - `TreeSet`（有序）: 红黑树（自平衡的排序二叉树）
  - `Queue`
    - `PriorityQueue` : Object[] 数组实现二叉堆
    - `ArrayQueue` : Object[] 数组 + 双指针
- `Map`
  - `HashMap` : 数组 + 链表 + 红黑树（链表根据大小和阈值进行扩容，扩容到一定大小转换为红黑树）
  - `LinkedMap` : 继承自 `HashMap`，增加一条双向链表以保持插入顺序
  - `Hashtable` : 数组 + 链表
  - `TreeMap` : 红黑树



## 1.2 集合的选择

![image-20220118101609300](README.assets/image-20220118101609300.png)



# 二、List



## 2.1 ArrayList 和 Vector 的区别

`ArrayList` 是 `List` 的主要实现类，底层使用 `Object[]`存储，适用于频繁的查找工作，线程不安全 ；

`Vector` 是 `List` 的古老实现类，底层使用`Object[]` 存储，线程安全的（代价就是效率差一些）。



## 2.2 ArrayList  和 LinkedList 的区别

**是否保证线程安全：** `ArrayList` 和 `LinkedList` 都是不同步的，也就是不保证线程安全；

**底层数据结构：** `Arraylist` 底层使用的是 **`Object` 数组**；`LinkedList` 底层使用的是 **双向链表** 数据结构（JDK1.6 之前为循环链表，JDK1.7 取消了循环。注意双向链表和双向循环链表的区别，下面有介绍到！）

**插入和删除是否受元素位置的影响：**

- `ArrayList` 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响。 比如：执行`add(E e)`方法的时候， `ArrayList` 会默认在将指定的元素追加到此列表的末尾，这种情况时间复杂度就是 O(1)。但是如果要在指定位置 i 插入和删除元素的话（`add(int index, E element)`）时间复杂度就为 O(n-i)。因为在进行上述操作的时候集合中第 i 和第 i 个元素之后的(n-i)个元素都要执行向后位/向前移一位的操作。
- `LinkedList` 采用链表存储，所以，如果是在头尾插入或者删除元素不受元素位置的影响（`add(E e)`、`addFirst(E e)`、`addLast(E e)`、`removeFirst()` 、 `removeLast()`），近似 O(1)，如果是要在指定位置 `i` 插入和删除元素的话（`add(int index, E element)`，`remove(Object o)`） 时间复杂度近似为 O(n) ，因为需要先移动到指定位置再插入。

**是否支持快速随机访问：** `LinkedList` 不支持高效的随机元素访问，而 `ArrayList` 支持。快速随机访问就是通过元素的序号快速获取元素对象(对应于`get(int index)`方法)。

**内存空间占用：** ArrayList 的空 间浪费主要体现在在 list 列表的结尾会预留一定的容量空间，而 LinkedList 的空间花费则体现在它的每一个元素都需要消耗比 ArrayList 更多的空间（因为要存放直接后继和直接前驱以及数据）。



## 2.3 RandomAccess 接口

```java
public interface RandomAccess {
}
```

查看源码我们发现实际上 `RandomAccess` 接口中什么都没有定义。所以，在我看来 `RandomAccess` 接口不过是一个标识罢了。标识什么？ 标识实现这个接口的类具有随机访问功能。

在 `binarySearch()`方法中，它要判断传入的 list 是否 `RamdomAccess`的实例，如果是，调用`indexedBinarySearch()`方法，如果不是，那么调用`iteratorBinarySearch()`方法



```java
public static <T>
    int binarySearch(List<? extends Comparable<? super T>> list, T key) {
    if (list instanceof RandomAccess || list.size()<BINARYSEARCH_THRESHOLD)
        return Collections.indexedBinarySearch(list, key);
    else
        return Collections.iteratorBinarySearch(list, key);
}
```



`ArrayList` 实现了 `RandomAccess` 接口， 而 `LinkedList` 没有实现。为什么呢？我觉得还是和底层数据结构有关！`ArrayList` 底层是数组，而 `LinkedList` 底层是链表。数组天然支持随机访问，时间复杂度为 O(1)，所以称为快速随机访问。链表需要遍历到特定位置才能访问特定位置的元素，时间复杂度为 O(n)，所以不支持快速随机访问。，`ArrayList` 实现了 `RandomAccess` 接口，就表明了他具有快速随机访问功能。 `RandomAccess` 接口只是标识，并不是说 `ArrayList` 实现 `RandomAccess` 接口才具有快速随机访问功能的！

