---
# 这是页面的图标
icon: page

# 这是文章的标题
title: 第十六章、CopyOnWrite容器

# 设置作者
author: lllllan

# 设置写作时间
# time: 2020-01-20

# 一个页面只能有一个分类
category: Java

# 一个页面可以有多个标签
tag:
- Java 多线程
- 深入浅出多线程

# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在首页的文章板块中
star: true

# 你可以自定义页脚
# footer: 
---



::: warning 转载声明

- [深入浅出多线程 - 第十六章 - GitHub](https://github.com/RedSpider1/concurrent/tree/develop/article/03/16.md)

:::





## 什么是CopyOnWrite容器
在说到 `CopyOnWrite` 容器之前我们先来谈谈什么是 `CopyOnWrite` 机制，CopyOnWrite是计算机设计领域中的一种优化策略，也是一种在并发场景下常用的设计思想——写入时复制思想。



::: info 写入时复制思想

就是当有多个调用者同时去请求一个资源数据的时候，有一个调用者出于某些原因需要对当前的数据源进行修改，这个时候系统将会复制一个当前数据源的副本给调用者修改。	

:::



`CopyOnWrite` 容器即 **写时复制的容器** ，当我们往一个容器中添加元素的时候，不直接往容器中添加，而是将当前容器进行copy，复制出来一个新的容器，然后向新容器中添加我们需要的元素，最后将原容器的引用指向新容器。

这样做的好处在于， ==我们可以在并发的场景下对容器进行"读操作"而不需要"加锁"，从而达到读写分离的目的== 。从JDK 1.5 开始Java并发包里提供了两个使用 `CopyOnWrite` 机制实现的并发容器 ，分别是 `CopyOnWriteArrayList` 和 `CopyOnWriteArraySet`  。



## CopyOnWriteArrayList



::: tip 优点
`CopyOnWriteArrayList` 经常被用于 “**读多写少**” 的并发场景，是因为 `CopyOnWriteArrayList` 无需任何同步措施，大大增强了读的性能。在Java中遍历线程非安全的 List (如：`ArrayList` 和 `LinkedList` )的时候，若中途有别的线程对 List 容器进行修改，那么会抛出 `ConcurrentModificationException` 异常。`CopyOnWriteArrayList` 由于其 "**读写分离**"，遍历和修改操作分别作用在不同的 List 容器，所以在使用迭代器遍历的时候，则不会抛出异常。

:::



::: tip 缺点

- `CopyOnWriteArrayList` 每次执行写操作都会将原容器进行拷贝一份，数据量大的时候，内存会存在较大的压力，可能会引起频繁 `Full GC`（ZGC因为没有使用Full GC）

- `CopyOnWriteArrayList` 由于实现的原因，写和读分别作用在不同新老容器上，在写操作执行过程中，读不会阻塞， **但读取到的却是老容器的数据**。

:::



现在我们来看一下 `CopyOnWriteArrayList` 的 `add` 操作源码，它的逻辑很清晰，就是先把原容器进行copy，然后在新的副本上进行“写操作”，最后再切换引用，在此过程中是加了锁的。

~~~java
public boolean add(E e) {

    // ReentrantLock加锁，保证线程安全
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object[] elements = getArray();
        int len = elements.length;
        // 拷贝原容器，长度为原容器长度加一
        Object[] newElements = Arrays.copyOf(elements, len + 1);
        // 在新副本上执行添加操作
        newElements[len] = e;
        // 将原容器引用指向新副本
        setArray(newElements);
        return true;
    } finally {
        // 解锁
        lock.unlock();
    }
}
~~~
我们再来看一下 `remove` 操作的源码，`remove` 的逻辑是将要 `remove` 元素之外的其他元素拷贝到新的副本中，然后再将原容器的引用指向新的副本中，因为remove操作也是 “写操作” 所以也是要加锁的。 
~~~java
public E remove(int index) {

    // 加锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object[] elements = getArray();
        int len = elements.length;
        E oldValue = get(elements, index);
        int numMoved = len - index - 1;
        if (numMoved == 0)
            // 如果要删除的是列表末端数据，拷贝前len-1个数据到新副本上，再切换引用
            setArray(Arrays.copyOf(elements, len - 1));
        else {
            // 否则，将要删除元素之外的其他元素拷贝到新副本中，并切换引用
            Object[] newElements = new Object[len - 1];
            System.arraycopy(elements, 0, newElements, 0, index);
            System.arraycopy(elements, index + 1, newElements, index, numMoved);
            setArray(newElements);
        }
        return oldValue;
    } finally {
        // 解锁
        lock.unlock();
    }
}
~~~
我们再来看看 `CopyOnWriteArrayList` 效率最高的读操作的源码
~~~java
public E get(int index) {
    return get(getArray(), index);
}
~~~
~~~java
 private E get(Object[] a, int index) {
     return (E) a[index];
 }
~~~
由上可见“读操作”是没有加锁，直接读取。



## CopyOnWrite 的业务中实现


接下来，我们结合具体业务场景来实现一个 `CopyOnWriteMap` 的并发容器并且使用它。

~~~java
import java.util.Collection;
import java.util.Map;
import java.util.Set;

public class CopyOnWriteMap<K, V> implements Map<K, V>, Cloneable {
    private volatile Map<K, V> internalMap;

    public CopyOnWriteMap() {
        internalMap = new HashMap<K, V>();
    }

    public V put(K key, V value) {
        synchronized (this) {
            Map<K, V> newMap = new HashMap<K, V>(internalMap);
            V val = newMap.put(key, value);
            internalMap = newMap;
            return val;
        }
    }

    public V get(Object key) {
        return internalMap.get(key);
    }

    public void putAll(Map<? extends K, ? extends V> newData) {
        synchronized (this) {
            Map<K, V> newMap = new HashMap<K, V>(internalMap);
            newMap.putAll(newData);
            internalMap = newMap;
        }
    }
}
~~~
上面就是参考 `CopyOnWriteArrayList` 实现的 `CopyOnWriteMap` ，我们可以用这个容器来做什么呢？结合我们之前说的CopyOnWrite的复制思想，它最适用于“读多写少”的并发场景。

**场景：**假如我们有一个搜索的网站需要屏蔽一些 “关键字”，“黑名单” 每晚定时更新，每当用户搜索的时候，“黑名单” 中的关键字不会出现在搜索结果当中，并且提示用户敏感字。

~~~java
// 黑名单服务
public class BlackListServiceImpl {
    //　减少扩容开销。根据实际需要，初始化CopyOnWriteMap的大小，避免写时CopyOnWriteMap扩容的开销。
    private static CopyOnWriteMap<String, Boolean> blackListMap = 
        new CopyOnWriteMap<String, Boolean>(1000);

    public static boolean isBlackList(String id) {
        return blackListMap.get(id) == null ? false : true;
    }

    public static void addBlackList(String id) {
        blackListMap.put(id, Boolean.TRUE);
    }

    /**
     * 批量添加黑名单
     * (使用批量添加。因为每次添加，容器每次都会进行复制，所以减少添加次数，可以减少容器的复制次数。
     * 如使用上面代码里的addBlackList方法)
     * @param ids
     */
    public static void addBlackList(Map<String,Boolean> ids) {
        blackListMap.putAll(ids);
    }

}
~~~
这里需要各位小伙伴特别特别注意一个问题，此处的场景是每晚凌晨 “黑名单” 定时更新，原因是 `CopyOnWrite` 容器有 **数据一致性** 的问题，它只能保证 **最终数据一致性**。

==所以如果我们希望写入的数据马上能准确地读取，请不要使用 `CopyOnWrite` 容器==

