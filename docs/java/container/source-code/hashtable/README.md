---
# 这是页面的图标
icon: page

# 这是文章的标题
title: HashTable 源码解读

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



## 构成

一对映射关系保存在一个 `Entry<K, V>` 中，继承自 `Map.Entry<K, V>`。

HashTable 底层维护一个数组，数组中的元素就是由节点组成的链表。



## 索引

> 这里的索引指一个节点在数组中存放的下标

HashTable 的索引计算方式和 HashMap 有所不同。



```java
index = (hash & 0x7FFFFFFF) % tab.length
```



## 扩容

HashTable 也采取了双倍扩容的策略，在每次扩容之后，会将原来数组中节点重新分布到新的数组中。



扩容时机：当总的节点数量不小于扩容阈值时 。



## 添加

因为只有链表的存在，HashTable 的节点添加会更加简单。

另外一个区别在于 HashTable 的节点时添加在链表头，而 HashMap 的节点添加在链表末尾。



## 线程安全

HashTable 的线程安全是由 synchronized 保证的。



大部分的方法都由 synchronized 修饰，当某个线程在操作时，需要获取并占有该对象，其他线程想要操作只能等待。代价就是效率会低很多。
