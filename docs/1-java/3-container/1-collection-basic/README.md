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

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning 本文转载自一下文章，略有改动

- [主页 | JavaGuide](https://javaguide.cn/)

:::



## 一、集合概述



### 1.0 Java集合概览

![img](README.assets/java-collection-hierarchy.71519bdb.png)



### 1.1 集合框架底层数据结构

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



### 1.2 集合的选择

![image-20220118101609300](README.assets/image-20220118101609300.png)



### 1.3 Collection 和 Collections

- Collection是集合类的上级接口，子接口有 Set、List、LinkedList、ArrayList、Vector、Stack、 Set； 
- Collections是集合类的一个帮助类， 它包含有各种有关集合操作的静态多态方法，用于实现对各种 集合的搜索、排序、线程安全化等操作。此类不能实例化，就像一个工具类，服务于Java的 Collection框架。



### 1.3 fail-fast

fail-fast 机制是 Java 集合（Collection）中的一种错误机制。当多个线程对同一个集合的内容进行 操作时，就可能会产生 fail-fast 事件。

例如：当某一个线程 A 通过 iterator 去遍历某集合的过程中，若该集合的内容被其他线程所改变 了，那么线程 A 访问集合时，就会抛出 ConcurrentModificationException 异常，产生 fail-fast 事 件。这里的操作主要是指 add、remove 和 clear，对集合元素个数进行修改。

解决办法：建议使用“java.util.concurrent 包下的类”去取代“java.util 包下的类”。

可以这么理解：在遍历之前，把 modCount 记下来 expectModCount，后面 expectModCount 去 和 modCount 进行比较，如果不相等了，证明已并发了，被修改了，于是抛出 `ConcurrentModificationException` 异常。

## 二、List



### 2.1 ArrayList 和 Vector 的区别

`ArrayList` 是 `List` 的主要实现类，底层使用 `Object[]`存储，适用于频繁的查找工作，线程不安全 ；

`Vector` 是 `List` 的古老实现类，底层使用`Object[]` 存储，线程安全的（代价就是效率差一些）。



### 2.2 ArrayList  和 LinkedList 的区别

**是否保证线程安全：** `ArrayList` 和 `LinkedList` 都是不同步的，也就是不保证线程安全；

**底层数据结构：** `Arraylist` 底层使用的是 **`Object` 数组**；`LinkedList` 底层使用的是 **双向链表** 数据结构（JDK1.6 之前为循环链表，JDK1.7 取消了循环。注意双向链表和双向循环链表的区别，下面有介绍到！）

**插入和删除是否受元素位置的影响：**

- `ArrayList` 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响。 比如：执行`add(E e)`方法的时候， `ArrayList` 会默认在将指定的元素追加到此列表的末尾，这种情况时间复杂度就是 O(1)。但是如果要在指定位置 i 插入和删除元素的话（`add(int index, E element)`）时间复杂度就为 O(n-i)。因为在进行上述操作的时候集合中第 i 和第 i 个元素之后的(n-i)个元素都要执行向后位/向前移一位的操作。
- `LinkedList` 采用链表存储，所以，如果是在头尾插入或者删除元素不受元素位置的影响（`add(E e)`、`addFirst(E e)`、`addLast(E e)`、`removeFirst()` 、 `removeLast()`），近似 O(1)，如果是要在指定位置 `i` 插入和删除元素的话（`add(int index, E element)`，`remove(Object o)`） 时间复杂度近似为 O(n) ，因为需要先移动到指定位置再插入。

**是否支持快速随机访问：** `LinkedList` 不支持高效的随机元素访问，而 `ArrayList` 支持。快速随机访问就是通过元素的序号快速获取元素对象(对应于`get(int index)`方法)。

**内存空间占用：** ArrayList 的空 间浪费主要体现在在 list 列表的结尾会预留一定的容量空间，而 LinkedList 的空间花费则体现在它的每一个元素都需要消耗比 ArrayList 更多的空间（因为要存放直接后继和直接前驱以及数据）。



### 2.3 RandomAccess 接口

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



### 2.4 ArrayList 扩容机制

详见另一篇 [ArrayList 源码解读](../2-source-code/1-arraylist)



## 三、Set



### 3.1 comparable 和 Comparator 的区别

- `comparable` 接口实际上是出自`java.lang`包 它有一个 `compareTo(Object obj)`方法用来排序
- `comparator`接口实际上是出自 java.util 包它有一个`compare(Object obj1, Object obj2)`方法用来排序



#### 3.1.1 Comparator 定制排序

```java
ArrayList<Integer> arrayList = new ArrayList<Integer>();
arrayList.add(-1);
arrayList.add(3);
arrayList.add(3);
arrayList.add(-5);
arrayList.add(7);
arrayList.add(4);
arrayList.add(-9);
arrayList.add(-7);
System.out.println("原始数组:");
System.out.println(arrayList);
// void reverse(List list)：反转
Collections.reverse(arrayList);
System.out.println("Collections.reverse(arrayList):");
System.out.println(arrayList);

// void sort(List list),按自然排序的升序排序
Collections.sort(arrayList);
System.out.println("Collections.sort(arrayList):");
System.out.println(arrayList);
// 定制排序的用法
Collections.sort(arrayList, new Comparator<Integer>() {

    @Override
    public int compare(Integer o1, Integer o2) {
        return o2.compareTo(o1);
    }
});
System.out.println("定制排序后：");
System.out.println(arrayList);
```



Output:

```text
原始数组:
[-1, 3, 3, -5, 7, 4, -9, -7]
Collections.reverse(arrayList):
[-7, -9, 4, 7, -5, 3, 3, -1]
Collections.sort(arrayList):
[-9, -7, -5, -1, 3, 3, 4, 7]
定制排序后：
[7, 4, 3, 3, -1, -5, -7, -9]
```



#### 3.1.2 重写 compareTo 方法

```java
// person对象没有实现Comparable接口，所以必须实现，这样才不会出错，才可以使treemap中的数据按顺序排列
// 前面一个例子的String类已经默认实现了Comparable接口，详细可以查看String类的API文档，另外其他
// 像Integer类等都已经实现了Comparable接口，所以不需要另外实现了
public  class Person implements Comparable<Person> {
    private String name;
    private int age;

    public Person(String name, int age) {
        super();
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    /**
     * T重写compareTo方法实现按年龄来排序
     */
    @Override
    public int compareTo(Person o) {
        if (this.age > o.getAge()) {
            return 1;
        }
        if (this.age < o.getAge()) {
            return -1;
        }
        return 0;
    }
}
```

```java
public static void main(String[] args) {
    TreeMap<Person, String> pdata = new TreeMap<Person, String>();
    pdata.put(new Person("张三", 30), "zhangsan");
    pdata.put(new Person("李四", 20), "lisi");
    pdata.put(new Person("王五", 10), "wangwu");
    pdata.put(new Person("小红", 5), "xiaohong");
    // 得到key的值的同时得到key所对应的值
    Set<Person> keys = pdata.keySet();
    for (Person key : keys) {
        System.out.println(key.getAge() + "-" + key.getName());
    }
}
```



Output：

```text
5-小红
10-王五
20-李四
30-张三
```



## 四、Map



### 4.1 HashMap 和 HashTable 的区别

1. 两者父类不同
   1. HashMap 继承自 AbstractMap，HashTable 继承自 Dictionary
   2. 他们都实现了 map、Cloneable（可复制）、Serializable（可序列化）三个接口
2. 对外提供接口不同
   1. HashTable 中提供方法 elements()：返回 value 的枚举
   2. HashTable 中提供方法 contains()：实际上就是 containsValue()
3. 对 null 的支持不同
   1. HashTable：key 和 value 都不能为 null
   2. HashMap：key 和 value 都可以为 null
4. 安全性不同
   1. HashMap 是线程不安全的，但是效率更高
   2. HashTable 是线程安全的
   3. ConcurrentHashMap 是线程安全的，效率比 HashTable 高，比 HashMap 低
5. 初始容量大小、扩充容量大小不同
6. 计算 hash 值的方法不同
